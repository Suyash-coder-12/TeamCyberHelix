import unittest
import sys
import os
import time

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "src")))
from auth_handler import hash_password, verify_password
from jwt_validator import JWTService

class TestAegisAuth(unittest.TestCase):
    def test_password_hashing(self):
        pwd = "SafePassword#2026"
        hashed = hash_password(pwd)
        self.assertTrue(verify_password(hashed, pwd))
        self.assertFalse(verify_password(hashed, "wrong"))

    def test_jwt_lifecycle(self):
        service = JWTService("secret-token-key-helix-992")
        token = service.create_token({"user": "shivam", "role": "lead"}, ttl_seconds=5)
        self.assertIsNotNone(token)

        payload = service.verify_token(token)
        self.assertIsNotNone(payload)
        self.assertEqual(payload["user"], "shivam")
        self.assertEqual(payload["role"], "lead")

    def test_jwt_tampering(self):
        service = JWTService("secret-token-key-helix-992")
        token = service.create_token({"user": "aniket", "role": "dev"}, ttl_seconds=60)
        tampered = token[:-4] + "abcd"
        self.assertIsNone(service.verify_token(tampered))

if __name__ == "__main__":
    unittest.main()
