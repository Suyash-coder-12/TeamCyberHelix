# OAuth2, JWT & Zero-Trust Auth Best Practices
**Author:** Darshan Tripadwar & Sharvi Date | **Category:** Authentication & Cryptography

---

## 🔑 Token Strategy
- **Short-Lived Access Tokens:** Expire in 15 minutes. Contains user ID and permissions scope.
- **Refresh Tokens:** Expire in 7–30 days. Stored securely in database/Redis with rotation upon each use (Refresh Token Rotation).
- **Storage:** Never store tokens in `localStorage` due to XSS vulnerability. Always use `HttpOnly; Secure; SameSite=Strict` cookies.

---

## 🛡️ JWT Signing & Verification
- Use strong asymmetric algorithms like `EdDSA (Ed25519)` or `RS256` for distributed verification, or `HS256` with high-entropy >=256-bit secrets for internal services.
- Always validate `exp` (expiration), `nbf` (not before), and `iss` (issuer).
- Explicitly check the `alg` header to prevent `alg: "none"` bypass attacks.
