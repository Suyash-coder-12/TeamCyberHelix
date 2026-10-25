import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))
from cve_tracker import CVETracker

class TestCVETracker(unittest.TestCase):
    def test_cve_filtering(self):
        records = [
            {"id": "CVE-2026-1101", "cvss": 9.8, "component": "OpenSSH", "summary": "Pre-auth RCE"},
            {"id": "CVE-2026-1102", "cvss": 5.3, "component": "Nginx", "summary": "Minor info disclosure"},
            {"id": "CVE-2026-1103", "cvss": 8.8, "component": "Redis", "summary": "Auth bypass flaw"}
        ]
        tracker = CVETracker(min_cvss=8.0)
        critical = tracker.filter_critical_cves(records)
        self.assertEqual(len(critical), 2)
        self.assertEqual(critical[0]["id"], "CVE-2026-1101")

    def test_markdown_generation(self):
        records = [
            {"id": "CVE-2026-1101", "cvss": 9.8, "component": "OpenSSH", "summary": "Pre-auth RCE"}
        ]
        tracker = CVETracker()
        brief = tracker.generate_markdown_brief(records)
        self.assertIn("CVE-2026-1101", brief)
        self.assertIn("Team CyberHelix", brief)

if __name__ == "__main__":
    unittest.main()
