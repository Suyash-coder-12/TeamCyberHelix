# Volatility 3 Memory Forensics Cheatsheet
**Author:** Ashish Ade | **Category:** Digital Forensics (DFIR)

---

## 🔬 Core Volatility 3 Commands

### 1. Process Analysis
```bash
# List all active processes and PIDs
vol -f memdump.raw windows.pslist

# Detect hidden / unlinked processes (DKOM rootkits)
vol -f memdump.raw windows.psscan

# Display hierarchical process execution tree
vol -f memdump.raw windows.pstree
```

### 2. Network Connections & Sockets
```bash
# Extract TCP/UDP sockets and matching process IDs
vol -f memdump.raw windows.netscan
```

### 3. Injected Code & Shellcode Hunting
```bash
# Scan for injected memory regions (PAGE_EXECUTE_READWRITE)
vol -f memdump.raw windows.malfind -o ./extracted_payloads
```

### 4. Command Line & History
```bash
# Extract console history and commands entered in cmd.exe
vol -f memdump.raw windows.cmdline
```
