"""
Helix Sentinel - Threat Detector Engine
Evaluates normalized log events against detection rules and emits alerts.
Author: Team CyberHelix (Shivam Rathod & Suyash Rathod)
"""

import json
import os
import re
from collections import defaultdict
from datetime import datetime, timezone
from typing import List, Dict, Any

class ThreatDetector:
    def __init__(self, rules_path: str = None):
        if rules_path is None:
            rules_path = os.path.join(os.path.dirname(__file__), "..", "config", "rules.json")
        self.rules = self._load_rules(rules_path)
        self.event_windows = defaultdict(list)  # Key: (rule_id, ip), Val: list of timestamps

    def _load_rules(self, path: str) -> List[Dict[str, Any]]:
        if not os.path.exists(path):
            return []
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    def evaluate_event(self, event: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Evaluate a single log event against all active SIEM rules."""
        alerts = []
        if not event:
            return alerts

        message = event.get("message", "")
        source_ip = event.get("source_ip", "unknown")

        for rule in self.rules:
            pattern = rule.get("pattern", "")
            if re.search(pattern, message, re.IGNORECASE):
                rule_id = rule["id"]
                track_key = f"{rule_id}:{source_ip}"
                now = datetime.now(timezone.utc).timestamp()
                
                # Maintain sliding window
                time_window = rule.get("timeWindowSeconds", 60)
                self.event_windows[track_key] = [
                    t for t in self.event_windows[track_key] if now - t <= time_window
                ]
                self.event_windows[track_key].append(now)

                if len(self.event_windows[track_key]) >= rule.get("threshold", 1):
                    alert = {
                        "alert_id": f"ALT-{int(now * 1000)}",
                        "rule_id": rule_id,
                        "rule_name": rule["name"],
                        "severity": rule["severity"],
                        "source_ip": source_ip,
                        "action": rule.get("action", "ALERT"),
                        "description": rule.get("description"),
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                        "trigger_count": len(self.event_windows[track_key]),
                        "raw_message": message
                    }
                    alerts.append(alert)
                    # Reset counter after alert dispatch
                    self.event_windows[track_key].clear()

        return alerts

if __name__ == "__main__":
    from log_parser import parse_syslog_line
    detector = ThreatDetector()
    
    sample_logs = [
        "Oct 25 14:00:01 web-server-1 sshd[123]: Failed password for root from 198.51.100.44 port 22",
        "Oct 25 14:00:02 web-server-1 sshd[124]: Failed password for admin from 198.51.100.44 port 22",
        "Oct 25 14:00:04 web-server-1 sshd[125]: Failed password for user from 198.51.100.44 port 22",
        "Oct 25 14:00:10 web-server-1 nginx[500]: GET /search?q=1' UNION SELECT * FROM users-- 200 OK from 203.0.113.12"
    ]

    print("--- [ Helix Sentinel SIEM Live Detection Feed ] ---")
    for raw in sample_logs:
        ev = parse_syslog_line(raw)
        alerts = detector.evaluate_event(ev)
        for alt in alerts:
            print(f"🚨 [{alt['severity']}] {alt['rule_name']} | Source: {alt['source_ip']} -> Action: {alt['action']}")
