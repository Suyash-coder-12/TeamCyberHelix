# Web Application Security & OWASP Top 10 Mitigation
**Author:** Suyash Rathod & Soummya Marekar | **Category:** Application Security

---

## 🛡️ Top Attack Vectors & Defenses

### 1. Broken Object Level Authorization (BOLA / IDOR)
**Vulnerability:** Fetching `/api/users/42/documents` without checking whether the requesting user owns resource `42`.
**Defense:**
```python
# Always check tenant/owner context
def get_user_document(request, doc_id):
    doc = db.query(Document).filter_by(id=doc_id, owner_id=request.current_user.id).first()
    if not doc:
        raise NotFoundException("Resource not found")
    return doc
```

### 2. Cross-Site Scripting (XSS)
- Strict Content Security Policy (CSP):
  ```http
  Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-random123'; object-src 'none';
  ```
- Always HTML-escape untrusted input before rendering into the DOM.
- Use textContent instead of innerHTML in vanilla JavaScript.

### 3. Server-Side Request Forgery (SSRF)
- Never allow users to supply unvalidated arbitrary URLs for server-side fetches.
- Whitelist allowable hostnames.
- Disallow private network IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.1`, `169.254.169.254` AWS metadata).
