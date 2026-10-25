# Team CyberHelix - Projects Registry

This directory contains all ongoing, planned, and archived software, tooling, and research initiatives developed by Team CyberHelix.

---

## 🚀 Active Projects Directory

| Project Name | Domain | Project Lead | Core Contributors | Status | Version | Tech Stack |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **[helix-sentinel-siem](./active/helix-sentinel-siem)** | SIEM & Threat Detection | Shivam Rathod | Suyash, Aniket, Mohini, Prashik | `Active / S2` | `v1.2.0` | Python, Redis, FastAPI, ELK |
| **[aegis-auth-core](./active/aegis-auth-core)** | Zero-Trust Auth & IAM | Darshan Tripadwar | Suyash, Aniket, Sharvi, Soummya | `Active / S1` | `v1.0.4` | Python, JWT, Cryptography, OAuth2 |
| **[cyber-forensics-toolkit](./active/cyber-forensics-toolkit)** | Digital Forensics (DFIR) | Ashish Ade | Mandar, Shivani | `Active / S3` | `v0.9.1` | Python, Scapy, Volatility API, C++ |
| **[darknet-recon-crawler](./active/darknet-recon-crawler)** | Threat Intel & OSINT | Vasundhara Thakre | Shivam, Manish | `Active / S1` | `v1.1.0` | Python, BeautifulSoup, REST APIs |

---

## 📁 Projects Structure

```
projects/
├── README.md                      # Central projects catalog (this file)
├── active/                        # Actively developed projects
│   ├── helix-sentinel-siem/       # Flagship Log & Threat Detection Engine
│   ├── aegis-auth-core/           # Zero-Trust Identity & Access Management
│   ├── cyber-forensics-toolkit/   # Memory, Disk & PCAP Incident Triage
│   └── darknet-recon-crawler/     # OSINT & CVE Intelligence Watcher
├── archive/                       # Deprecated or completed research experiments
└── templates/                     # Project starter templates
    └── project-starter/           # Standardized boilerplate for new projects
```

---

## 🛠️ Initiating a New Project

To propose and create a new project:
1. Duplicate the boilerplate located in `projects/templates/project-starter/`.
2. Follow the CyberHelix naming standard: lowercase kebab-case (e.g., `shield-firewall-agent`).
3. Complete the `README.md` with problem statement, system architecture diagram, and contributor assignments.
4. Update `members/directory.json` and this `README.md` to assign active contributors.
5. Create a GitHub milestone and track weekly sprints in Team Sync.
