"""
Cyber Forensics Toolkit - Memory Dump & Binary Artifact Analyzer
Author: Team CyberHelix (Ashish Ade & Mandar Sahare)
"""

import math
import re
from typing import List, Dict, Any

SUSPICIOUS_SIGNATURES = [
    r"(?i)powershell(\.exe)?\s+-[eE](nc(odedCommand)?)?\s+[A-Za-z0-9+/=]{20,}",
    r"(?i)sekurlsa::logonpasswords",
    r"(?i)mimikatz",
    r"(?i)cmd\.exe\s+/c\s+echo",
    r"(?i)rundll32\.exe\s+javascript:",
    r"https?://[a-zA-Z0-9.-]+\.onion",
    r"\\\\\.\\pipe\\[a-zA-Z0-9_-]+"
]

def calculate_shannon_entropy(data: bytes) -> float:
    """Calculate the Shannon entropy of a byte sequence (0.0 to 8.0). High values (>7.2) indicate encryption or packing."""
    if not data:
        return 0.0
    entropy = 0.0
    length = len(data)
    byte_counts = [0] * 256
    for b in data:
        byte_counts[b] += 1
    
    for count in byte_counts:
        if count == 0:
            continue
        p = count / length
        entropy -= p * math.log2(p)
    return round(entropy, 4)

def extract_strings(data: bytes, min_len: int = 4) -> List[str]:
    """Extract printable ASCII strings from raw byte buffer."""
    pattern = rb"[\x20-\x7e]{" + str(min_len).encode() + rb",}"
    return [match.decode("latin-1") for match in re.findall(pattern, data)]

def scan_for_indicators(strings: List[str]) -> List[Dict[str, str]]:
    """Scan extracted strings against forensic indicators of compromise."""
    findings = []
    for s in strings:
        for sig in SUSPICIOUS_SIGNATURES:
            if re.search(sig, s):
                findings.append({
                    "signature": sig,
                    "matched_string": s[:120]  # truncate for safety
                })
    return findings
