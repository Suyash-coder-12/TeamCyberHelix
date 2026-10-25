# Wireshark & PCAP Network Forensics
**Author:** Mandar Sahare & Ashish Ade | **Category:** Digital Forensics

---

## 🎯 Essential Wireshark Display Filters

### Filter Cleartext Passwords & Credentials
```wireshark
http.request.method == "POST" && (http contains "password" || http contains "passwd" || http contains "token")
```

### DNS Exfiltration & Tunneling Detection
```wireshark
dns.flags.response == 0 && (dns.qry.name.len > 50 || dns.qry.type == 16)
```

### TLS Handshake SNI Inspection
```wireshark
tls.handshake.extensions_server_name
```

### TCP SYN Scan Activity
```wireshark
tcp.flags.syn == 1 && tcp.flags.ack == 0
```

---

## ⚡ Tshark Fast Command-Line Extraction
```bash
# Extract all HTTP requested URIs and User-Agents
tshark -r capture.pcap -Y "http.request" -T fields -e ip.src -e http.host -e http.request.uri -e http.user_agent
```
