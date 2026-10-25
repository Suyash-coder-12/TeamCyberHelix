# SOC Incident Response Playbook (IR-600)
**Author:** Mohini Baghele & Shivani Balpande | **Category:** Defensive Operations | **Version:** 2.1

---

## 🧭 Incident Response Lifecycle (NIST SP 800-61 Rev 2)

```
[ 1. Preparation ] ───► [ 2. Detection & Analysis ]
                                   │
                                   ▼
 [ 4. Post-Incident Activity ] ◄─── [ 3. Containment, Eradication & Recovery ]
```

---

## Phase 1: Triage & Classification
Upon alert notification from Helix Sentinel SIEM or EDR:
1. **Severity Matrix:**
   - **P1 - Critical:** Active domain controller compromise, ransomware outbreak, customer PII exfiltration. SLA: <15 min.
   - **P2 - High:** Malware persistence on production servers, credential dumping. SLA: <1 hour.
   - **P3 - Medium:** Isolated malware on single workstation, policy violation. SLA: <4 hours.
   - **P4 - Low:** Port scanning, unverified phishing attempts. SLA: <24 hours.

---

## Phase 2: Containment Procedures

### Network Isolation
```bash
# Isolate affected Linux host via iptables while preserving forensics jump host (10.10.10.5)
iptables -F
iptables -A INPUT -s 10.10.10.5 -j ACCEPT
iptables -A OUTPUT -d 10.10.10.5 -j ACCEPT
iptables -A INPUT -j DROP
iptables -A OUTPUT -j DROP
```

### Credential Revocation
- Invalidate all active sessions in Redis token cache.
- Reset LDAP/Kerberos password for affected accounts.
- Enforce MFA re-enrollment.

---

## Phase 3: Eradication & Recovery
1. Identify root cause (e.g. unpatched CVE, phishing token compromise).
2. Clean persistence artifacts (cron jobs, systemd services, SSH authorized_keys).
3. Validate golden image integrity before bringing the service back online.
4. Enable heightened telemetry logging for 14 days post-recovery.
