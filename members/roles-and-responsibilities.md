# Team CyberHelix - Roles & Responsibilities Charter

Welcome to the official **Team CyberHelix** organization handbook. This document outlines the hierarchy, domain responsibilities, collaboration workflows, and ethical conduct guidelines for all members.

---

## 🏛️ Organizational Leadership & Core Pods

### 1. Research & Strategic Threat Intel
* **Lead:** **Shivam Rathod** (*Research Head*)
* **Analysts:** **Vasundhara Thakre** (*Threat Intel Analyst*), **Sharvi Date** (*Cryptography Researcher*)
* **Key Responsibilities:**
  - Lead zero-day vulnerability analysis and threat landscape assessments.
  - Curate OSINT feeds and maintain the internal Threat Intelligence Base.
  - Evaluate advanced cryptographic schemes, post-quantum readiness, and secure protocols.

### 2. Engineering, Systems & Web Architecture
* **Full Stack Lead:** **Suyash Rathod** (*Full Stack Developer*)
* **Auth & Backend Developer:** **Darshan Tripadwar** (*Auth and Python Developer*)
* **Cloud Security Specialist:** **Prashik Undirwade** (*Cloud Security Specialist*)
* **Key Responsibilities:**
  - Build and maintain core web applications, microservices, and internal member portals.
  - Architect zero-trust authentication services (OAuth2, OIDC, WebAuthn/Passkeys).
  - Deploy secure cloud infrastructure, CI/CD pipelines, and container orchestrations.

### 3. Data Systems & Persistence
* **Lead:** **Aniket Chavhan** (*Database Engineer*)
* **Key Responsibilities:**
  - Design scalable relational, document, and caching database layers.
  - Implement strict SQL injection defenses, data encryption at rest and in transit.
  - Optimize high-throughput query pipelines for telemetry ingestion.

### 4. Experience Design & Client-Side Hardening
* **UI/UX Lead:** **Pavan Londhe** (*UI/UX Designer*)
* **Frontend Security & QA:** **Soummya Marekar** (*Frontend Security & QA*)
* **Key Responsibilities:**
  - Deliver modern cyber-defense user interfaces, design tokens, and components.
  - Conduct UX audits and ensure WCAG AA accessibility compliance.
  - Enforce Content Security Policy (CSP), sanitize DOM inputs, and automate regression test suites.

### 5. Cyber Forensics & Incident Response (DFIR)
* **Lead:** **Ashish Ade** (*CyberForensic Specialist*)
* **Network Security Engineer:** **Mandar Sahare** (*Network Security Engineer*)
* **Key Responsibilities:**
  - Lead digital forensic triage, memory extraction (Volatility), and filesystem recovery.
  - Maintain cryptographic chain-of-custody documentation for digital evidence.
  - Monitor packet traffic, configure Snort/Suricata rules, and investigate anomalous traffic.

### 6. Offensive Operations & Defensive Operations (SecOps / GRC)
* **Offensive Security Lead:** **Manish Wagh** (*Penetration Tester*)
* **Defensive / SOC Operations:** **Mohini Baghele** (*Cybersecurity Analyst*)
* **Governance, Risk & Compliance:** **Shivani Balpande** (*Compliance & InfoSec Auditor*)
* **Key Responsibilities:**
  - Perform authorized red-team penetration tests, code audits, and vulnerability assessments.
  - Build SIEM detection rules, triage alerts, and maintain incident response playbooks.
  - Audit infrastructure against NIST CSF, ISO 27001, and SOC 2 frameworks.

---

## 🤝 Contribution & Collaboration Rules

1. **Git Flow:** Feature branches format: `feature/<project-name>/<brief-desc>` or `fix/<ticket-id>`.
2. **Code Reviews:** All pull requests require a minimum of two peer reviews before merging into `main`.
3. **Security Standards:** Never commit secrets, API keys, or raw private keys to Git. Always utilize `.env` and environment variables.
4. **Knowledge Sharing:** Every completed project milestone or security research finding must have a corresponding note in `/notes`.

---

## 🔒 Code of Ethics
As members of Team CyberHelix, we adhere strictly to ethical research standards, authorized engagement boundaries, privacy protection, and responsible disclosure practices.
