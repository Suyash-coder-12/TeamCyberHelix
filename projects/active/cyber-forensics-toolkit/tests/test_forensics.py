import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))
from memory_dump_analyzer import calculate_shannon_entropy, extract_strings, scan_for_indicators
from pcap_inspector import inspect_stream_text

class TestCyberForensics(unittest.TestCase):
    def test_entropy_pure_zeros(self):
        zeros = b"\x00" * 1024
        self.assertEqual(calculate_shannon_entropy(zeros), 0.0)

    def test_entropy_random_data(self):
        random_bytes = bytes(range(256)) * 4
        entropy = calculate_shannon_entropy(random_bytes)
        self.assertGreater(entropy, 7.9)

    def test_ioc_indicator_scanning(self):
        payload = b"powershell -enc SUVYKE5ldy1PYmplY3QgTmV0LldlYkNsaWVudCkuRG93bmxvYWRTdHJpbmc="
        strings = extract_strings(payload)
        findings = scan_for_indicators(strings)
        self.assertTrue(len(findings) > 0)

    def test_pcap_inspector(self):
        stream = "GET /admin HTTP/1.1\r\nHost: cdn-auth.cyberhelix.io\r\nAuthorization: Basic YWRtaW46c2VjcmV0MTIz\r\n\r\n"
        results = inspect_stream_text(stream)
        self.assertIn("YWRtaW46c2VjcmV0MTIz", results["cleartext_basic_auth"])
        self.assertIn("cyberhelix.io", results["extracted_domains"])

if __name__ == "__main__":
    unittest.main()
