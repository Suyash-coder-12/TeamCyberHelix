# Aegis Auth Core - Zero-Trust Identity & Access Management

Aegis Auth Core is Team CyberHelix's secure, zero-trust token issuance and RBAC verification framework built in Python.

---

## 🔒 Security Principles
1. **PBKDF2-HMAC-SHA256 Password Hashing:** Salted, multi-iteration cryptographically secure password verification.
2. **Stateless JWTs with HMAC-SHA256 Signatures:** Tamper-proof session tokens with strict expiry and role claims.
3. **Role-Based Access Control (RBAC):** Strict hierarchy: `admin` > `researcher` > `analyst` > `member`.
4. **Token Revocation & Expiration Guards:** Zero grace window for expired claims.

---

## 🚀 Quick Start

```bash
# Run unit tests
python -m unittest tests/test_auth.py
```

---

## 👥 Contributors
- **Lead Developer:** Darshan Tripadwar
- **Systems & API Architect:** Suyash Rathod
- **Database & Persistence:** Aniket Chavhan
- **Crypto Reviewer:** Sharvi Date
