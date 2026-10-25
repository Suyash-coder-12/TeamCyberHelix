# Full-Stack Engineering Architecture Standards
**Author:** Suyash Rathod | **Category:** Software Engineering

---

## 🏛️ Layered Separation Architecture
All CyberHelix web applications and services must follow a 3-tier decoupling pattern:
```
[ Presentation Layer (UI/HTML/CSS) ]
                 │
                 ▼
 [ Application & API Business Logic ]
                 │
                 ▼
[ Persistence & Data Access (PostgreSQL/Redis) ]
```

---

## 🔒 Security Best Practices for Full-Stack Developers
1. **Never Trust Client Input:** Always validate, sanitize, and strictly type request payloads on the server.
2. **Environment Variable Management:** Secrets must never be checked into version control. Use `.env` files with git ignore patterns.
3. **CORS Configuration:** Do not set `Access-Control-Allow-Origin: *` for authenticated routes. Explicitly specify the origin domain.
4. **Rate Limiting:** Protect all authentication and public search endpoints with leaky bucket or token bucket rate limiters (e.g., max 60 req/min).
