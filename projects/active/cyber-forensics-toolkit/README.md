# Cyber Forensics Toolkit (DFIR)

Digital Forensics & Incident Response (DFIR) rapid triage toolkit developed by Team CyberHelix. Used to extract forensically sound artifacts from memory dumps, raw binaries, and network packet capture files.

---

## 🔍 Modules
1. **Memory Dump Analyzer (`memory_dump_analyzer.py`):**
   - High-speed string carver with ASCII and UTF-16 LE support.
   - Known IOC / Malicious signature scanner (mimikatz commands, powershell execution flags, base64 blobs).
   - Entropy calculator for packed / encrypted payload detection.
2. **PCAP Inspector (`pcap_inspector.py`):**
   - Extracts DNS queries, anomalous UDP traffic, and suspicious cleartext HTTP authorization headers.
   - Protocol frequency distribution and top talkers IP statistics.

---

## 🚀 Quick Start
```bash
python -m unittest tests/test_forensics.py
```

---

## 👥 Contributors
- **Forensic Lead:** Ashish Ade
- **Network Analyst:** Mandar Sahare
- **Audit & Compliance:** Shivani Balpande
