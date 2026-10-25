# Network Security & Perimeter Hardening
**Author:** Mandar Sahare & Prashik Undirwade | **Category:** Network Defense

---

## 🔒 1. SSH Server Hardening (`/etc/ssh/sshd_config`)
```ini
Port 2222
Protocol 2
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2
X11Forwarding no
AllowGroups helix-secops
```

---

## 🛡️ 2. UFW Firewall Baseline
```bash
# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow hardened SSH
ufw allow 2222/tcp comment 'Hardened SSH'

# Allow HTTPS only
ufw allow 443/tcp comment 'TLS 1.3 Traffic'

# Enable firewall
ufw enable
ufw status verbose
```

---

## ⚡ 3. TLS 1.3 Enforcement (Nginx)
```nginx
ssl_protocols TLSv1.3;
ssl_prefer_server_ciphers off;
ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256';
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
```
