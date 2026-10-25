"""
Cyber Forensics Toolkit - PCAP & Traffic Stream Inspector
Lightweight forensic packet parser extracting endpoints and suspicious payloads.
Author: Team CyberHelix (Ashish Ade & Mandar Sahare)
"""

import re
from typing import Dict, List, Any

HTTP_AUTH_PATTERN = re.compile(r"Authorization:\s*Basic\s+([A-Za-z0-9+/=]+)", re.IGNORECASE)

def inspect_stream_text(raw_text: str) -> Dict[str, Any]:
    """Inspects decoded session stream text for cleartext credentials and DNS queries."""
    findings = {
        "cleartext_basic_auth": [],
        "extracted_domains": [],
        "suspicious_sqli_keywords": []
    }

    # Check for basic auth leaks
    auth_matches = HTTP_AUTH_PATTERN.findall(raw_text)
    findings["cleartext_basic_auth"].extend(auth_matches)

    # Simple domain extract
    domain_matches = re.findall(r"\b([a-zA-Z0-9-]+\.(?:com|org|net|io|onion|xyz))\b", raw_text)
    findings["extracted_domains"] = list(set(domain_matches))

    # Check for SQL injection fragments in GET / POST strings
    sqli_keywords = ["UNION SELECT", "INFORMATION_SCHEMA", "SLEEP(", "WAITFOR DELAY"]
    for kw in sqli_keywords:
        if kw.lower() in raw_text.lower():
            findings["suspicious_sqli_keywords"].append(kw)

    return findings
