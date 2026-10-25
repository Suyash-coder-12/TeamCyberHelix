# Penetration Testing & Recon Cheatsheet
**Author:** Manish Wagh & Shivam Rathod | **Category:** Offensive Security | **Level:** Advanced

---

## 1. Network Reconnaissance & Port Scanning

### Fast Stealth SYN Scan
```bash
nmap -sS -Pn -T4 -p- --min-rate 1000 -oN all_ports.nmap <target_ip>
```

### Targeted Service Fingerprinting & Vulnerability Scripts
```bash
nmap -sV -sC -O -p 22,80,443,8080,8443 -oA service_audit <target_ip>
```

### DNS Enumeration & Zone Transfers
```bash
dig axfr @<nameserver_ip> <target_domain>
dnsrecon -d <target_domain> -t axfr
sublist3r -d <target_domain> -o subdomains.txt
```

---

## 2. Web Application Assessment

### Subdomain & Directory Fuzzing
```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt -u https://<target>/FUZZ -mc 200,301,302,403
gobuster dir -u https://<target> -w /usr/share/wordlists/dirb/common.txt -x php,html,js,json
```

### Parameter Fuzzing & Injection Testing
```bash
sqlmap -u "https://<target>/api/item?id=1" --batch --dbs --random-agent --tamper=between
```

---

## 3. Linux Privilege Escalation Quick Wins

```bash
# SUID binaries lookup
find / -perm -4000 -type f -exec ls -la {} 2>/dev/null \;

# Sudo privileges review
sudo -l

# Check active listening ports on localhost
ss -tulpn | grep LISTEN
```

---

## 4. Post-Exploitation & Clean-Up
- Always remove test files created during proof of concept.
- Restore modified configurations to their original state.
- Document exact timestamp of actions for correlated log auditing.
