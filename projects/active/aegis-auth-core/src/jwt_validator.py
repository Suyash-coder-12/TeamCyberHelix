"""
Aegis Auth Core - JWT Generator and Validator
Zero-dependency JSON Web Token generator using HMAC-SHA256 signatures.
Author: Team CyberHelix (Darshan Tripadwar & Suyash Rathod)
"""

import json
import base64
import hmac
import hashlib
import time
from typing import Dict, Any, Optional

def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("utf-8").rstrip("=")

def _b64url_decode(s: str) -> bytes:
    padding = 4 - (len(s) % 4)
    if padding < 4:
        s += "=" * padding
    return base64.urlsafe_b64decode(s.encode("utf-8"))

class JWTService:
    def __init__(self, secret_key: str):
        self.secret = secret_key.encode("utf-8")

    def create_token(self, payload: Dict[str, Any], ttl_seconds: int = 3600) -> str:
        """Create signed JWT token with expiry."""
        header = {"alg": "HS256", "typ": "JWT"}
        claims = dict(payload)
        now = int(time.time())
        claims["iat"] = now
        claims["exp"] = now + ttl_seconds

        hdr_b64 = _b64url_encode(json.dumps(header).encode("utf-8"))
        pay_b64 = _b64url_encode(json.dumps(claims).encode("utf-8"))
        signature_input = f"{hdr_b64}.{pay_b64}".encode("utf-8")
        sig = hmac.new(self.secret, signature_input, hashlib.sha256).digest()
        sig_b64 = _b64url_encode(sig)

        return f"{hdr_b64}.{pay_b64}.{sig_b64}"

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify signature and expiration of JWT token."""
        try:
            parts = token.split(".")
            if len(parts) != 3:
                return None
            hdr_b64, pay_b64, sig_b64 = parts
            signature_input = f"{hdr_b64}.{pay_b64}".encode("utf-8")
            expected_sig = hmac.new(self.secret, signature_input, hashlib.sha256).digest()
            actual_sig = _b64url_decode(sig_b64)

            if not hmac.compare_digest(expected_sig, actual_sig):
                return None

            payload = json.loads(_b64url_decode(pay_b64).decode("utf-8"))
            # Check expiration
            if payload.get("exp", 0) < time.time():
                return None

            return payload
        except Exception:
            return None

if __name__ == "__main__":
    jwt = JWTService("helix-super-secret-key-32bytes!!")
    token = jwt.create_token({"sub": "suyash-rathod", "role": "admin"})
    print("Generated Token:", token)
    verified = jwt.verify_token(token)
    print("Verified Payload:", verified)
