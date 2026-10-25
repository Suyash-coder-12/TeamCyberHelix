"""
Helix Sentinel - Log Parser Module
Parses unstructured raw log lines into normalized event dictionaries.
Author: Team CyberHelix (Suyash Rathod & Mohini Baghele)
"""

import re
from datetime import datetime, timezone
from typing import Optional, Dict, Any

# Common regex patterns for log parsing
SYSLOG_PATTERN = re.compile(
    r'^(?P<timestamp>\w{3}\s+\d+\s+\d{2}:\d{2}:\d{2})\s+(?P<hostname>\S+)\s+(?P<process>\S+?)(?:\[(?P<pid>\d+)\])?:\s+(?P<message>.*)$'
)

IP_EXTRACTOR = re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b')

def parse_syslog_line(line: str) -> Optional[Dict[str, Any]]:
    """Parse standard RFC 3164 Syslog format into structured dictionary."""
    line = line.strip()
    if not line:
        return None
    
    match = SYSLOG_PATTERN.match(line)
    if not match:
        # Fallback raw line
        return {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "hostname": "localhost",
            "process": "unknown",
            "pid": None,
            "message": line,
            "source_ip": extract_ip(line)
        }
    
    data = match.groupdict()
    data["source_ip"] = extract_ip(data.get("message", ""))
    return data

def extract_ip(text: str) -> Optional[str]:
    """Extract first IP address if present in the text."""
    found = IP_EXTRACTOR.findall(text)
    return found[0] if found else None

if __name__ == "__main__":
    sample = "Oct 25 14:22:01 server-01 sshd[4012]: Failed password for root from 192.168.1.105 port 42810 ssh2"
    parsed = parse_syslog_line(sample)
    print("Parsed Event:", parsed)
