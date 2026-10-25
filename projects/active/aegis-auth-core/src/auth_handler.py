"""
Aegis Auth Core - Cryptographic Authentication & Password Handler
Author: Team CyberHelix (Darshan Tripadwar & Sharvi Date)
"""

import os
import hashlib
import hmac
import base64
from typing import Tuple

ITERATIONS = 100_000

def hash_password(password: str) -> str:
    """Hashes a password with a fresh random 16-byte salt using PBKDF2-HMAC-SHA256."""
    salt = os.urandom(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, ITERATIONS)
    return f"{base64.b64encode(salt).decode('utf-8')}:{base64.b64encode(dk).decode('utf-8')}"

def verify_password(stored_hash: str, password_attempt: str) -> bool:
    """Verifies a password against the stored salt:hash string in constant time."""
    try:
        salt_b64, hash_b64 = stored_hash.split(":")
        salt = base64.b64decode(salt_b64)
        expected_hash = base64.b64decode(hash_b64)
        calculated_hash = hashlib.pbkdf2_hmac("sha256", password_attempt.encode("utf-8"), salt, ITERATIONS)
        return hmac.compare_digest(expected_hash, calculated_hash)
    except Exception:
        return False

if __name__ == "__main__":
    hashed = hash_password("CyberHelix@2026")
    print("Generated Hash:", hashed)
    print("Verify correct:", verify_password(hashed, "CyberHelix@2026"))
    print("Verify incorrect:", verify_password(hashed, "WrongPass"))
