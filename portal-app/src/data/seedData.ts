import type { Operative, PodTask, AuditLog, IdeTab } from '../types';

export const INITIAL_OPERATIVES: Operative[] = [
  {
    id: "suyash-rathod",
    name: "Suyash Rathod",
    designation: "Super Admin & Full Stack Lead",
    role: "ADMIN",
    isAdmin: true,
    domain: "Systems Architecture, Security & Governance",
    email: "suyash.rathod@cyberhelix.io",
    github: "Suyash-coder-12",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Suyash",
    status: "Admin",
    bio: "Super Administrator and Tech Lead of Team CyberHelix. Holds universal administrative access across all operative pods, cloud infrastructure, AI models, and repositories.",
    skills: ["JavaScript / TypeScript", "Node.js", "React", "Python", "Cloud & Microservices", "Security Architecture", "Platform Admin"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core", "portal-web"],
    stationSlug: "master-command",
    securityClearance: "LEVEL-5 UNIVERSAL",
    assignedNode: "node-mumbai-s1-alpha"
  },
  {
    id: "shivam-rathod",
    name: "Shivam Rathod",
    designation: "Research Head",
    domain: "Vulnerability Research & Threat Intel",
    email: "shivam.rathod@cyberhelix.io",
    github: "shivam-cyber",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Shivam",
    status: "Lead",
    bio: "Directs vulnerability research, zero-day threat analysis, and advanced research initiatives across Team CyberHelix.",
    skills: ["Threat Intelligence", "Vulnerability Research", "Exploit Analysis", "Reverse Engineering", "Strategic Planning"],
    activeProjects: ["darknet-recon-crawler", "helix-sentinel-siem"],
    stationSlug: "intel-matrix",
    securityClearance: "LEVEL-4 LEAD",
    assignedNode: "node-mumbai-s2-beta"
  },
  {
    id: "aniket-chavhan",
    name: "Aniket Chavhan",
    designation: "Database Engineer",
    domain: "Database Architecture & Optimization",
    email: "aniket.chavhan@cyberhelix.io",
    github: "aniket-db",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aniket",
    status: "Core",
    bio: "Specializes in high-throughput transactional databases, distributed storage, indexing strategies, and SQL defense.",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Data Modeling", "Query Optimization", "Database Hardening"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core"],
    stationSlug: "database-studio",
    securityClearance: "LEVEL-3 SPECIALIST",
    assignedNode: "node-delhi-db-01"
  },
  {
    id: "pavan-londhe",
    name: "Pavan Londhe",
    designation: "UI/UX Designer",
    domain: "Product Design & Cyber Interface",
    email: "pavan.londhe@cyberhelix.io",
    github: "pavan-ux",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Pavan",
    status: "Core",
    bio: "Crafts intuitive, futuristic cyber-defense user interfaces, design systems, and seamless team collaboration tools.",
    skills: ["UI/UX Prototyping", "Figma", "Design Systems", "Interaction Design", "Accessibility", "Visual Hierarchy"],
    activeProjects: ["helix-sentinel-siem", "portal-web"],
    stationSlug: "design-system-hub",
    securityClearance: "LEVEL-3 SPECIALIST",
    assignedNode: "node-pune-ux-01"
  },
  {
    id: "ashish-ade",
    name: "Ashish Ade",
    designation: "CyberForensic Specialist",
    domain: "Digital Forensics & Incident Response",
    email: "ashish.ade@cyberhelix.io",
    github: "ashish-forensics",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ashish",
    status: "Core",
    bio: "Investigates security breaches, memory dumps, disk artifacts, and maintains immutable chain of custody records.",
    skills: ["Volatility", "Autopsy", "Memory Forensics", "Network PCAP", "Chain of Custody", "Malware Triage"],
    activeProjects: ["cyber-forensics-toolkit"],
    stationSlug: "forensics-lab",
    securityClearance: "LEVEL-3 SPECIALIST",
    assignedNode: "node-bangalore-dfir-01"
  },
  {
    id: "darshan-tripadwar",
    name: "Darshan Tripadwar",
    designation: "Auth and Python Developer",
    domain: "Authentication & Secure Backend",
    email: "darshan.tripadwar@cyberhelix.io",
    github: "darshan-dev",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Darshan",
    status: "Core",
    bio: "Builds zero-trust authentication engines, OAuth2/OIDC workflows, cryptography primitives, and secure Python microservices.",
    skills: ["Python", "OAuth 2.0 / OIDC", "JWT & Passkeys", "FastAPI", "Cryptography", "RBAC Policies"],
    activeProjects: ["aegis-auth-core"],
    stationSlug: "auth-forge",
    securityClearance: "LEVEL-3 SPECIALIST",
    assignedNode: "node-mumbai-auth-01"
  },
  {
    id: "mohini-baghele",
    name: "Mohini Baghele",
    designation: "Cybersecurity Analyst",
    domain: "SOC Operations & Threat Detection",
    email: "mohini.baghele@cyberhelix.io",
    github: "mohini-sec",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mohini",
    status: "Active",
    bio: "Focuses on live telemetry monitoring, SIEM detection engineering, anomalous behavior hunting, and triage playbooks.",
    skills: ["SIEM Rules", "Splunk / ELK", "Threat Hunting", "Log Analysis", "Incident Triage"],
    activeProjects: ["helix-sentinel-siem"],
    stationSlug: "soc-telemetry",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-mumbai-soc-02"
  },
  {
    id: "manish-wagh",
    name: "Manish Wagh",
    designation: "Penetration Tester",
    domain: "Offensive Security & Red Teaming",
    email: "manish.wagh@cyberhelix.io",
    github: "manish-pentest",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Manish",
    status: "Active",
    bio: "Conducts adversarial simulations, web application penetration tests, privilege escalation checks, and bug hunting.",
    skills: ["Burp Suite", "OWASP Top 10", "Network Pentesting", "Privilege Escalation", "Metasploit"],
    activeProjects: ["darknet-recon-crawler"],
    stationSlug: "redteam-arena",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-hyderabad-pt-01"
  },
  {
    id: "prashik-undirwade",
    name: "Prashik Undirwade",
    designation: "Cloud Security Specialist",
    domain: "Cloud Infrastructure & DevSecOps",
    email: "prashik.undirwade@cyberhelix.io",
    github: "prashik-cloud",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Prashik",
    status: "Active",
    bio: "Secures multicloud deployments, builds CI/CD security pipelines, and hardens Kubernetes and container environments.",
    skills: ["AWS Security", "Docker & Kubernetes", "CI/CD Hardening", "Terraform", "Identity & IAM"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core"],
    stationSlug: "cloud-bastion",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-delhi-k8s-01"
  },
  {
    id: "mandar-sahare",
    name: "Mandar Sahare",
    designation: "Network Security Engineer",
    domain: "Perimeter Defense & Protocol Analysis",
    email: "mandar.sahare@cyberhelix.io",
    github: "mandar-net",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mandar",
    status: "Active",
    bio: "Architects firewall topologies, intrusion detection systems, VPN gateways, and protocol inspection pipelines.",
    skills: ["Snort / Suricata", "WireGuard / OpenVPN", "Wireshark", "Packet Filtering", "BGP / VLAN Security"],
    activeProjects: ["cyber-forensics-toolkit"],
    stationSlug: "net-perimeter",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-chennai-gw-01"
  },
  {
    id: "soummya-marekar",
    name: "Soummya Marekar",
    designation: "Frontend Security & QA",
    domain: "Client-Side Hardening & Verification",
    email: "soummya.marekar@cyberhelix.io",
    github: "soummya-qa",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Soummya",
    status: "Active",
    bio: "Ensures client applications are resilient to XSS, CSRF, DOM injection, and oversees end-to-end security test suites.",
    skills: ["CSP Hardening", "Client-Side Cryptography", "Cypress / Playwright", "OWASP ZAP", "Automated QA"],
    activeProjects: ["portal-web", "aegis-auth-core"],
    stationSlug: "client-shield",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-pune-qa-02"
  },
  {
    id: "sharvi-date",
    name: "Sharvi Date",
    designation: "Cryptography & Security Researcher",
    domain: "Applied Cryptography & Privacy",
    email: "sharvi.date@cyberhelix.io",
    github: "sharvi-crypto",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sharvi",
    status: "Active",
    bio: "Researches post-quantum cryptographic primitives, zero-knowledge proofs, and secure multiparty computation models.",
    skills: ["Applied Cryptography", "Elliptic Curves", "ZK Proofs", "Hashing Algorithms", "Secure Key Exchange"],
    activeProjects: ["aegis-auth-core"],
    stationSlug: "crypto-vault",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-bangalore-pqc-01"
  },
  {
    id: "vasundhara-thakre",
    name: "Vasundhara Thakre",
    designation: "Threat Intelligence Analyst",
    domain: "OSINT & Threat Feeds",
    email: "vasundhara.thakre@cyberhelix.io",
    github: "vasundhara-intel",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Vasundhara",
    status: "Active",
    bio: "Monitors emerging cyber threats, collects open-source threat intelligence (OSINT), and curates actionable IOC indicators.",
    skills: ["OSINT", "MISP", "IOC Extraction", "Threat Actor Profiling", "CVE Tracking"],
    activeProjects: ["darknet-recon-crawler"],
    stationSlug: "osint-radar",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-delhi-osint-01"
  },
  {
    id: "shivani-balpande",
    name: "Shivani Balpande",
    designation: "Compliance & InfoSec Auditor",
    domain: "Governance, Risk & Compliance",
    email: "shivani.balpande@cyberhelix.io",
    github: "shivani-audit",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Shivani",
    status: "Active",
    bio: "Audits security posture against international frameworks, drafts security policies, and oversees compliance checks.",
    skills: ["ISO 27001", "NIST CSF", "SOC 2", "Risk Modeling", "Security Policy Audits"],
    activeProjects: ["cyber-forensics-toolkit", "helix-sentinel-siem"],
    stationSlug: "audit-chamber",
    securityClearance: "LEVEL-2 OPERATIVE",
    assignedNode: "node-mumbai-grc-01"
  }
];

export const INITIAL_TASKS: PodTask[] = [
  {
    id: "task-01",
    title: "Implement B-Tree query index on siem_threat_events (timestamp, severity)",
    operativeId: "aniket-chavhan",
    status: "in_progress",
    priority: "P0",
    tag: "Database Defense",
    createdAt: "2026-10-24"
  },
  {
    id: "task-02",
    title: "Benchmark Redis session caching latency under 10k concurrent handshakes",
    operativeId: "aniket-chavhan",
    status: "todo",
    priority: "P1",
    tag: "Performance",
    createdAt: "2026-10-25"
  },
  {
    id: "task-03",
    title: "PostgreSQL pg_hba.conf client cert authentication audit",
    operativeId: "aniket-chavhan",
    status: "done",
    priority: "P2",
    tag: "Hardening",
    createdAt: "2026-10-22"
  },
  {
    id: "task-04",
    title: "Liquid White corporate design token documentation & micro-animations",
    operativeId: "pavan-londhe",
    status: "done",
    priority: "P0",
    tag: "Design System",
    createdAt: "2026-10-25"
  },
  {
    id: "task-05",
    title: "Holographic NeuroNova HUD audio-wave feedback layout",
    operativeId: "pavan-londhe",
    status: "in_progress",
    priority: "P1",
    tag: "UI/UX",
    createdAt: "2026-10-25"
  },
  {
    id: "task-06",
    title: "Shannon entropy threshold calibration for packed polymorphic binaries",
    operativeId: "ashish-ade",
    status: "in_progress",
    priority: "P0",
    tag: "DFIR",
    createdAt: "2026-10-25"
  },
  {
    id: "task-07",
    title: "Volatility 3 kernel pool carving plugin integration",
    operativeId: "ashish-ade",
    status: "todo",
    priority: "P1",
    tag: "Forensics",
    createdAt: "2026-10-24"
  },
  {
    id: "task-08",
    title: "Ed25519 cryptographic token signing speed benchmark",
    operativeId: "darshan-tripadwar",
    status: "done",
    priority: "P0",
    tag: "Aegis Core",
    createdAt: "2026-10-24"
  },
  {
    id: "task-09",
    title: "Enforce WebAuthn FIDO2 passkey hardware attestation",
    operativeId: "darshan-tripadwar",
    status: "in_progress",
    priority: "P1",
    tag: "Zero-Trust",
    createdAt: "2026-10-25"
  },
  {
    id: "task-10",
    title: "Universal cluster audit and cryptographic root key rotation",
    operativeId: "suyash-rathod",
    status: "in_progress",
    priority: "P0",
    tag: "Super Admin",
    createdAt: "2026-10-25"
  },
  {
    id: "task-11",
    title: "Deploy NeuroNova v3.5 streaming inference nodes",
    operativeId: "suyash-rathod",
    status: "done",
    priority: "P0",
    tag: "AI Architecture",
    createdAt: "2026-10-25"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "log-101",
    timestamp: "16:24:12 IST",
    actor: "suyash.rathod@cyberhelix.io",
    action: "ADMIN_ROOT_SESSION_INIT",
    target: "Cluster Mumbai-Alpha",
    ip: "10.0.12.1",
    status: "SUCCESS",
    hash: "a4f89d31e9c20..."
  },
  {
    id: "log-102",
    timestamp: "16:20:45 IST",
    actor: "aniket.chavhan@cyberhelix.io",
    action: "DATABASE_POD_SYNC",
    target: "PostgreSQL Shard #03",
    ip: "10.0.14.88",
    status: "SUCCESS",
    hash: "b72183cfa109e..."
  },
  {
    id: "log-103",
    timestamp: "16:15:22 IST",
    actor: "SYSTEM_SENTINEL",
    action: "DEFCON_LEVEL_ASSESSMENT",
    target: "Global Defense Grid",
    ip: "127.0.0.1",
    status: "INFO",
    hash: "9910dbe38fa11..."
  },
  {
    id: "log-104",
    timestamp: "16:08:04 IST",
    actor: "ashish.ade@cyberhelix.io",
    action: "PCAP_INGEST_ENTROPY_PASS",
    target: "Evidence /vol/01",
    ip: "10.0.19.42",
    status: "SUCCESS",
    hash: "fc289a018ba20..."
  },
  {
    id: "log-105",
    timestamp: "15:52:19 IST",
    actor: "UNKNOWN_HOST",
    action: "UNAUTHENTICATED_PORTAL_PROBE",
    target: "Gateway /api/v1/auth",
    ip: "198.51.100.24",
    status: "ALERT",
    hash: "dd41908efc021..."
  }
];

export const INITIAL_IDE_TABS: IdeTab[] = [
  {
    id: "tab-py-1",
    name: "log_parser.py",
    language: "python",
    code: `"""
Team CyberHelix - Helix Sentinel SIEM
Log Parser & Threat Detection Engine
Author: Suyash Rathod / Mohini Baghele
"""
import re
from typing import Dict, Any

class LogParser:
    AUTH_FAIL_REGEX = re.compile(r"Failed password for (invalid user )?(?P<user>\\S+) from (?P<ip>\\S+)")
    
    def parse_line(self, line: str) -> Dict[str, Any]:
        match = self.AUTH_FAIL_REGEX.search(line)
        if match:
            return {
                "event_type": "AUTH_FAILURE",
                "user": match.group("user"),
                "ip": match.group("ip"),
                "severity": "HIGH",
                "threat_score": 88
            }
        return {"event_type": "UNKNOWN", "raw": line, "severity": "LOW"}

if __name__ == "__main__":
    parser = LogParser()
    sample = "Oct 25 16:20:01 srv sshd[912]: Failed password for invalid user admin from 192.168.1.55 port 4432"
    result = parser.parse_line(sample)
    print(f"[SENTINEL SIEM RESULT] -> {result}")
`
  },
  {
    id: "tab-js-1",
    name: "aegis_handshake.ts",
    language: "javascript",
    code: `// Aegis Auth Core - Zero-Trust Handshake Protocol
export async function createZeroTrustSignature(payload: string, secret: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

console.log("Aegis Handshake Module Ready. Zero-Trust verification active.");
`
  },
  {
    id: "tab-sql-1",
    name: "query_threats.sql",
    language: "sql",
    code: `-- Aniket Chavhan: Threat Database Optimization Query
SELECT 
    event_type,
    source_ip,
    COUNT(*) as incident_count,
    MAX(threat_score) as peak_severity,
    DATE_TRUNC('minute', detected_at) as time_bucket
FROM siem_threat_events
WHERE detected_at >= NOW() - INTERVAL '1 hour'
GROUP BY event_type, source_ip, time_bucket
HAVING COUNT(*) > 5
ORDER BY peak_severity DESC, incident_count DESC;
`
  }
];

export const ACTIVE_PROJECTS_LIST = [
  {
    id: "helix-sentinel-siem",
    name: "Helix Sentinel SIEM",
    desc: "Autonomous Security Information and Event Management with real-time log ingestion and MITRE ATT&CK mapping.",
    status: "OPERATIONAL",
    path: "projects/active/helix-sentinel-siem",
    lead: "Mohini Baghele / Suyash Rathod",
    testsPassed: "13/13 Passing"
  },
  {
    id: "aegis-auth-core",
    name: "Aegis Auth Core",
    desc: "High-assurance Zero-Trust authentication server featuring cryptographically signed tokens and biometric WebAuthn.",
    status: "OPERATIONAL",
    path: "projects/active/aegis-auth-core",
    lead: "Darshan Tripadwar / Suyash Rathod",
    testsPassed: "Verified"
  },
  {
    id: "cyber-forensics-toolkit",
    name: "Cyber Forensics Toolkit",
    desc: "Digital forensic pipeline for PCAP reconstruction, memory dump analysis, and Shannon entropy calculations.",
    status: "OPERATIONAL",
    path: "projects/active/cyber-forensics-toolkit",
    lead: "Ashish Ade",
    testsPassed: "Verified"
  },
  {
    id: "darknet-recon-crawler",
    name: "Darknet Recon Crawler",
    desc: "Automated vulnerability and darknet intelligence aggregator parsing CVE data feeds.",
    status: "RESEARCH",
    path: "projects/active/darknet-recon-crawler",
    lead: "Shivam Rathod / Manish Wagh",
    testsPassed: "Verified"
  }
];

export const RESEARCH_NOTES_LIST = [
  {
    title: "PCAP & Network Forensics",
    category: "Forensics",
    file: "notes/cyber-forensics/pcap-wireshark-network-forensics.md",
    summary: "Wireshark packet filters, DNS tunneling heuristics, and TCP flow reconstruction."
  },
  {
    title: "Database Schema Design & Indexing",
    category: "Database",
    file: "notes/database/database-schema-design-indexing.md",
    summary: "B-Tree vs Hash index performance, connection pooling, and SQL injection hardening."
  },
  {
    title: "Disk Analysis & Autopsy Guidelines",
    category: "Forensics",
    file: "notes/cyber-forensics/disk-analysis-autopsy-guidelines.md",
    summary: "Chain of custody protocol, raw image mounting, and file system timeline extraction."
  },
  {
    title: "API Design: REST vs GraphQL",
    category: "Architecture",
    file: "notes/development/api-design-rest-graphql.md",
    summary: "Zero-trust API gateway specs, token rate-limiting, and error envelope standards."
  }
];
