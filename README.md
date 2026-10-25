# Team CyberHelix 🧬

> **Advanced Cybersecurity, Digital Forensics & Full-Stack Systems Research Pod**

Welcome to the official repository for **Team CyberHelix**. This workspace organizes our active engineering projects, research notes, team roster, and the interactive **Member Portal Website**.

---

## 🌐 Member Access Portal Website

We have developed a dedicated, cyber-glassmorphic **Member Portal Website** for all team members to browse active projects, explore notes, access dossiers, and use live cyber utilities.

### Quick Launch Options:
1. **Direct Browser Open:** Simply double-click or open [`portal/index.html`](./portal/index.html) (or the root [`index.html`](./index.html)) in any web browser.
2. **Local HTTP Server:**
   ```bash
   python -m http.server 8080
   # Navigate to: http://localhost:8080
   ```

---

## 🗂️ Repository Architecture

```
TeamCyberHelix/
├── index.html                        # Root launcher redirecting to the Member Portal
├── members.txt                       # Raw team member roster
├── .gitignore                        # Git exclusions for Python, caches, and secrets
├── README.md                         # Master organization overview (this file)
│
├── portal/                           # 🌐 Member Access Portal Web Application
│   ├── index.html                    # Single Page Application entry point
│   ├── styles.css                    # Obsidian glassmorphic design system
│   └── app.js                        # Dynamic search, filtering, modals, tools & member identity
│
├── members/                          # 👥 Team Profiles & Governance
│   ├── directory.json                # Complete metadata for all 14 members
│   └── roles-and-responsibilities.md # Team structure, pods, and code of ethics
│
├── projects/                         # 🚀 Engineering & Research Projects
│   ├── README.md                     # Central project catalog & status matrix
│   ├── active/
│   │   ├── helix-sentinel-siem/      # SIEM Log Parser & Threat Detection Engine
│   │   │   ├── config/rules.json     # Detection signatures (Brute-Force, SQLi, Port-scan)
│   │   │   ├── src/log_parser.py     # Syslog RFC 3164 parser & IP extractor
│   │   │   ├── src/threat_detector.py# Sliding-window alert evaluator
│   │   │   └── tests/test_siem.py    # Unit tests
│   │   ├── aegis-auth-core/          # Zero-Trust Identity & Token Framework
│   │   │   ├── src/auth_handler.py   # Salted PBKDF2-HMAC-SHA256 password hashing
│   │   │   ├── src/jwt_validator.py  # Zero-dependency HS256 JWT service
│   │   │   └── tests/test_auth.py    # Unit tests
│   │   ├── cyber-forensics-toolkit/  # Memory & Packet Forensic Artifact Extractor
│   │   │   ├── src/memory_dump_analyzer.py # Shannon entropy & IOC scanner
│   │   │   ├── src/pcap_inspector.py # Cleartext credentials & SQLi finder
│   │   │   └── tests/test_forensics.py # Unit tests
│   │   └── darknet-recon-crawler/    # Threat Intelligence & CVE Alert Generator
│   │       ├── src/cve_tracker.py    # CVSS threshold filter & Markdown report generator
│   │       └── tests/test_cve.py     # Unit tests
│   └── templates/
│       └── project-starter/          # Standardized boilerplate for new projects
│
└── notes/                            # 📚 Central Knowledge Base & Cheatsheets
    ├── README.md                     # Tag index & document matrix
    ├── cybersecurity/
    │   ├── penetration-testing-cheatsheet.md
    │   ├── soc-incident-response-playbook.md
    │   ├── web-application-security-owasp.md
    │   └── network-security-hardening.md
    ├── cyber-forensics/
    │   ├── memory-forensics-volatility.md
    │   ├── disk-analysis-autopsy-guidelines.md
    │   └── pcap-wireshark-network-forensics.md
    ├── development/
    │   ├── fullstack-architecture-standards.md
    │   ├── api-design-rest-graphql.md
    │   └── auth-oauth2-jwt-best-practices.md
    ├── database/
    │   ├── database-schema-design-indexing.md
    │   └── sql-injection-prevention-audit.md
    ├── ui-ux/
    │   └── design-system-and-accessibility.md
    └── meeting-notes/
        ├── 2026-10-kickoff-strategy.md
        └── weekly-sync-template.md
```

---

## 👥 Team CyberHelix Operatives

| # | Operative Name | Designation | Specialization / Domain |
| :-: | :--- | :--- | :--- |
| 1 | **Shivam Rathod** | Research Head | Vulnerability Research & Threat Intel |
| 2 | **Suyash Rathod** | Full Stack Developer | Systems Architecture & Web Engineering |
| 3 | **Aniket Chavhan** | Database Engineer | High-Throughput DB Architecture & Tuning |
| 4 | **Pavan Londhe** | UI/UX Designer | Product Design Systems & Cyber Interfaces |
| 5 | **Ashish Ade** | CyberForensic Specialist | Digital Forensics, Memory Dumps & Incident Response |
| 6 | **Darshan Tripadwar** | Auth and Python Developer | Zero-Trust Authentication, IAM & Secure Python |
| 7 | **Mohini Baghele** | Cybersecurity Analyst | SOC Operations, SIEM Detection & Telemetry |
| 8 | **Manish Wagh** | Penetration Tester | Offensive Security, Red Teaming & Exploit Analysis |
| 9 | **Prashik Undirwade**| Cloud Security Specialist | Cloud Hardening, DevSecOps & Container Security |
| 10 | **Mandar Sahare** | Network Security Engineer | Perimeter Defense, Firewalls & Protocol Analysis |
| 11 | **Soummya Marekar** | Frontend Security & QA | Client-Side Hardening, CSP & Automated Test Suites |
| 12 | **Sharvi Date** | Cryptography Researcher | Post-Quantum Cryptography & Privacy Protocols |
| 13 | **Vasundhara Thakre**| Threat Intelligence Analyst | OSINT Reconnaissance, MISP & Threat Feeds |
| 14 | **Shivani Balpande** | Compliance & InfoSec Auditor| Governance, Risk, ISO 27001 & Incident Reporting |

---

## 🧪 Running Project Tests

All projects have standalone test suites with zero external dependencies:

```bash
# Test SIEM Threat Detection
python -m unittest projects/active/helix-sentinel-siem/tests/test_siem.py

# Test Aegis Auth Core
python -m unittest projects/active/aegis-auth-core/tests/test_auth.py

# Test Cyber Forensics Toolkit
python -m unittest projects/active/cyber-forensics-toolkit/tests/test_forensics.py

# Test CVE Recon Tracker
python -m unittest projects/active/darknet-recon-crawler/tests/test_cve.py
```
