# Darknet Recon Crawler & CVE Intelligence Watcher

Automated threat feed crawler that watches public vulnerability feeds (CVE / NVD / CISA KEV), aggregates newly published zero-days, extracts CVSS metrics, and produces actionable briefing summaries for Team CyberHelix.

---

## 🎯 Objectives
- Track newly released critical vulnerabilities (CVSS >= 8.5).
- Filter by affected tech stacks (Linux, OpenSSH, Redis, PostgreSQL, Web Frameworks).
- Generate automated Markdown alerts for team broadcast.

---

## 🚀 Quick Start
```bash
python -m unittest tests/test_cve.py
```

---

## 👥 Contributors
- **Lead Analyst:** Vasundhara Thakre
- **Research Advisor:** Shivam Rathod
- **Exploitation Analyst:** Manish Wagh
