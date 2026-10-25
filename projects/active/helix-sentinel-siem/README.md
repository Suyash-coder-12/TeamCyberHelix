# Helix Sentinel SIEM - Log & Threat Detection Engine

Helix Sentinel is Team CyberHelix's lightweight, high-performance Security Information and Event Management (SIEM) pipeline designed to ingest system, auth, and network logs, detect anomalous patterns in real-time, and trigger defensive alerts.

---

## 🏗️ Architecture

```
[ Log Sources (Syslog / Auth / Web) ]
                │
                ▼
      [ log_parser.py ] ─── (Normalized Log Event JSON)
                │
                ▼
     [ threat_detector.py ] <─── [ config/rules.json ]
                │
         (Rule Triggers)
                ▼
  [ Alert Dispatcher / Console / Slack / Webhook ]
```

---

## ⚙️ Features
- **Multi-Format Ingestion:** Ingests Syslog (RFC 3164/5424), JSON events, and Apache/Nginx web logs.
- **Rule Engine:** Flexible rule configuration supporting threshold frequency, failed logins, and suspicious payloads.
- **Severity Scoring:** Automatically scores alerts into Low, Medium, High, and Critical.
- **Zero External Dependencies:** Built with pure Python 3 for maximum portability.

---

## 🚀 Quick Start

```bash
# Run detection on sample log stream
python src/threat_detector.py

# Run unit tests
python -m unittest tests/test_siem.py
```

---

## 👥 Project Team
- **Lead:** Shivam Rathod
- **Core Developers:** Suyash Rathod, Aniket Chavhan
- **Detection Engineers:** Mohini Baghele, Prashik Undirwade
