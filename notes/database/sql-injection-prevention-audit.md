# SQL Injection Prevention & Database Security Audit
**Author:** Aniket Chavhan & Manish Wagh | **Category:** Database Security

---

## 🛑 The Golden Rule: Parameterization Always

### ❌ Insecure (String Concatenation / Interpolation)
```python
# HIGH VULNERABILITY: SQL INJECTION
cursor.execute(f"SELECT * FROM members WHERE username = '{user_input}'")
```

### ✅ Secure (Prepared Statements with Parameter Placeholders)
```python
# SECURE: Database engine treats input as raw scalar literal, never executable code
cursor.execute("SELECT * FROM members WHERE username = %s", (user_input,))
```

---

## 🔒 Least Privilege Database User Accounts
- Web application runtime should connect with non-superuser credentials.
- Application DB user should have `SELECT, INSERT, UPDATE, DELETE` on application tables only.
- Revoke `DROP, ALTER, TRUNCATE, GRANT` permissions from application roles.
