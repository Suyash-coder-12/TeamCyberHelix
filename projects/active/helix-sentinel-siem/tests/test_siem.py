import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))
from log_parser import parse_syslog_line, extract_ip
from threat_detector import ThreatDetector

class TestHelixSentinel(unittest.TestCase):
    def test_ip_extraction(self):
        line = "Connection from 192.168.1.50 port 8080"
        self.assertEqual(extract_ip(line), "192.168.1.50")

    def test_syslog_parsing(self):
        raw = "Oct 25 10:00:00 firewall-gw kernel: Drop packet from 10.0.0.15"
        event = parse_syslog_line(raw)
        self.assertIsNotNone(event)
        self.assertEqual(event["hostname"], "firewall-gw")
        self.assertEqual(event["source_ip"], "10.0.0.15")

    def test_threat_detector_sqli(self):
        detector = ThreatDetector()
        event = {
            "message": "GET /api/user?id=1 UNION SELECT null, username, password FROM users--",
            "source_ip": "203.0.113.99"
        }
        alerts = detector.evaluate_event(event)
        self.assertTrue(any(a["rule_id"] == "RULE-002" for a in alerts))

if __name__ == "__main__":
    unittest.main()
