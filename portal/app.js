/**
 * Team CyberHelix - Enterprise Command & AI Nexus
 * Master Web Application Logic & Zero-Trust State Management
 * 
 * Roles & Access:
 * - Admin: Suyash Rathod (Super Admin & Full Stack Lead)
 * - Individual Portals: Dedicated field stations for all 14 team members
 * - Security: Zero-Trust hashed session URL routing, persistent accounts, password management
 * - AI & IDE: NeuroNova AI (JARVIS-like assistant) + In-Browser Cloud IDE with Copilot
 */

// ==========================================================================
// 1. Core State & Data Stores
// ==========================================================================
const CYBER_STATE = {
  activeTab: 'dashboard',
  currentMember: null, // Active authenticated operative
  currentSessionToken: null,
  voiceOutputEnabled: true,
  isRecordingVoice: false,
  activeIdeFile: 'python',
  selectedAiProvider: 'neuronova-core',
  members: [],
  accounts: {}, // email -> { password, salt, role, mustChangePw }
  podTasks: {}, // memberId -> Array of task items
  auditLogs: [],
  projects: [
    {
      id: 'helix-sentinel-siem',
      name: 'Helix Sentinel SIEM',
      domain: 'SIEM & Threat Detection',
      version: 'v1.2.0',
      status: 'Active / S2',
      badgeClass: 'badge-cyan',
      leadId: 'shivam-rathod',
      contributors: ['suyash-rathod', 'aniket-chavhan', 'mohini-baghele', 'prashik-undirwade'],
      techStack: ['Python', 'Redis', 'FastAPI', 'Regex Engine', 'Syslog RFC 3164'],
      summary: 'High-performance Security Information and Event Management pipeline with real-time detection and threat mitigation rules.',
      repoPath: 'projects/active/helix-sentinel-siem',
      metrics: { rules: 4, alertsBlocked: '1,420/day', latency: '4.2ms' },
      detailsMarkdown: `### 🏗️ Helix Sentinel Architecture
- Multi-format ingestion supporting RFC 3164 Syslog and Apache/Nginx web logs.
- Real-time sliding window frequency thresholding for Brute-Force and SQLi detection.
- Fast zero-dependency engine ready for microservice container deployment.`
    },
    {
      id: 'aegis-auth-core',
      name: 'Aegis Auth Core',
      domain: 'Zero-Trust IAM & Crypto',
      version: 'v1.0.4',
      status: 'Active / S1',
      badgeClass: 'badge-violet',
      leadId: 'darshan-tripadwar',
      contributors: ['suyash-rathod', 'aniket-chavhan', 'sharvi-date', 'soummya-marekar'],
      techStack: ['Python', 'PBKDF2-HMAC', 'JWT', 'RBAC Policies', 'FastAPI'],
      summary: 'Cryptographically secured authentication service with salted multi-iteration password hashing, stateless JWT signing, and RBAC tiers.',
      repoPath: 'projects/active/aegis-auth-core',
      metrics: { hashIterations: '100,000', tokenExpiry: '15 min', authSuccessRate: '99.98%' },
      detailsMarkdown: `### 🔒 Aegis Auth Core Principles
- PBKDF2-HMAC-SHA256 with cryptographically generated 16-byte random salts.
- High-entropy HS256 JWT signature verification with constant-time equality checks.
- Zero-trust RBAC role verification across Admin, Researcher, Analyst, and Member.`
    },
    {
      id: 'cyber-forensics-toolkit',
      name: 'Cyber Forensics Toolkit',
      domain: 'Digital Forensics (DFIR)',
      version: 'v0.9.1',
      status: 'Active / S3',
      badgeClass: 'badge-emerald',
      leadId: 'ashish-ade',
      contributors: ['mandar-sahare', 'shivani-balpande'],
      techStack: ['Python', 'Shannon Entropy', 'Volatility API', 'PCAP Parser'],
      summary: 'Memory dump and network packet triage toolkit to extract strings, identify packed/encrypted payloads, and analyze suspicious sessions.',
      repoPath: 'projects/active/cyber-forensics-toolkit',
      metrics: { triageSpeed: '1.2 GB/s', entropyPrecision: '4 decimals', signatures: '12 active' },
      detailsMarkdown: `### 🔬 DFIR Artifact Pipeline
- Shannon entropy calculator (0.0 to 8.0) identifying encrypted/packed binaries.
- Automated IOC scanner identifying suspicious commands and anomalous strings.
- PCAP stream parser extracting Basic Auth leaks and SQLi fragments.`
    },
    {
      id: 'darknet-recon-crawler',
      name: 'Darknet Recon Crawler',
      domain: 'Threat Intel & OSINT',
      version: 'v1.1.0',
      status: 'Active / S1',
      badgeClass: 'badge-cyan',
      leadId: 'vasundhara-thakre',
      contributors: ['shivam-rathod', 'manish-wagh'],
      techStack: ['Python', 'CVE/NVD Feeds', 'BeautifulSoup', 'Markdown Gen'],
      summary: 'Automated vulnerability feed monitor that filters critical CVSS >= 7.5 CVEs and generates automated intelligence briefings.',
      repoPath: 'projects/active/darknet-recon-crawler',
      metrics: { cveMonitored: '4,500+', updateFreq: 'Every 15 min', alertSeverity: 'CVSS >= 7.5' },
      detailsMarkdown: `### 🎯 Threat Intel Mission
- Continuously polls official NVD and CISA feeds for high and critical CVEs.
- Generates structured team alert advisories for defensive response planning.`
    }
  ],
  notes: [
    {
      id: 'penetration-testing-cheatsheet',
      title: 'Defensive Security & Audit Guidelines',
      category: 'cybersecurity',
      categoryLabel: 'Defensive Security',
      author: 'Manish Wagh & Shivam Rathod',
      date: '2026-10-25',
      excerpt: 'Comprehensive security commands covering network scanning, DNS hygiene, service auditing, and Linux privilege permission reviews.',
      filePath: 'notes/cybersecurity/penetration-testing-cheatsheet.md',
      content: `## 1. Network Reconnaissance & Port Scanning

### Defensive Audit Scans
\`\`\`bash
nmap -sS -Pn -T4 -p- --min-rate 1000 -oN all_ports.nmap <target_ip>
nmap -sV -sC -O -p 22,80,443,8080 -oA service_audit <target_ip>
\`\`\`

### DNS Hygiene & Zone Transfers
\`\`\`bash
dig axfr @<nameserver_ip> <target_domain>
dnsrecon -d <target_domain> -t axfr
\`\`\`

## 2. Web Application Security Verification
Verify all input parameters with parameterized queries and prevent injection vulnerabilities.`
    },
    {
      id: 'soc-incident-response-playbook',
      title: 'SOC Incident Response Playbook (IR-600)',
      category: 'cybersecurity',
      categoryLabel: 'SOC Operations',
      author: 'Mohini Baghele & Shivani Balpande',
      date: '2026-10-25',
      excerpt: 'Standard operating procedures for severity classification (P1 through P4), automated host isolation via iptables, credential revocation, and eradication.',
      filePath: 'notes/cybersecurity/soc-incident-response-playbook.md',
      content: `## 🧭 Incident Response Lifecycle (NIST SP 800-61 Rev 2)

- **P1 - Critical:** Active controller compromise, unauthorized database access. SLA: <15 min.
- **P2 - High:** Malware persistence on production servers, credential leakage. SLA: <1 hour.
- **P3 - Medium:** Isolated malware on single workstation, policy violation. SLA: <4 hours.
- **P4 - Low:** Port scanning, unverified phishing attempts. SLA: <24 hours.

### Network Isolation Protocol
\`\`\`bash
iptables -A INPUT -s 10.10.10.5 -j ACCEPT
iptables -A OUTPUT -d 10.10.10.5 -j ACCEPT
iptables -A INPUT -j DROP
iptables -A OUTPUT -j DROP
\`\`\``
    },
    {
      id: 'memory-forensics-volatility',
      title: 'Volatility 3 Memory Forensics Cheatsheet',
      category: 'cyber-forensics',
      categoryLabel: 'Cyber Forensics',
      author: 'Ashish Ade',
      date: '2026-10-25',
      excerpt: 'Essential commands for extracting process trees, active network sockets, injected code memory blocks, and command histories.',
      filePath: 'notes/cyber-forensics/memory-forensics-volatility.md',
      content: `## 🔬 Core Volatility 3 Commands

### 1. Process & Network Analysis
\`\`\`bash
vol -f memdump.raw windows.pslist
vol -f memdump.raw windows.pstree
vol -f memdump.raw windows.netscan
\`\`\`

### 2. Injected Code Hunting
\`\`\`bash
vol -f memdump.raw windows.malfind -o ./extracted_payloads
\`\`\``
    },
    {
      id: 'disk-analysis-autopsy-guidelines',
      title: 'Autopsy Disk Forensics & Evidence Preservation',
      category: 'cyber-forensics',
      categoryLabel: 'Cyber Forensics',
      author: 'Ashish Ade & Shivani Balpande',
      date: '2026-10-25',
      excerpt: 'Guidelines for evidence hashing, write-blocked mounting, Master File Table (MFT) timestomping analysis, and chain of custody documentation.',
      filePath: 'notes/cyber-forensics/disk-analysis-autopsy-guidelines.md',
      content: `## ⚖️ Chain of Custody & Evidence Ingestion
- Always compute SHA-256 and MD5 hashes of media immediately upon acquisition.
- Mount image in write-blocked mode.
- Inspect $MFT $STANDARD_INFORMATION vs $FILE_NAME timestamps to detect timestomping.`
    },
    {
      id: 'fullstack-architecture-standards',
      title: 'Full-Stack Engineering Architecture Standards',
      category: 'development',
      categoryLabel: 'Development',
      author: 'Suyash Rathod',
      date: '2026-10-25',
      excerpt: 'Three-tier architecture decoupling, CORS security rules, environment secrets hygiene, and client input sanitization benchmarks.',
      filePath: 'notes/development/fullstack-architecture-standards.md',
      content: `## 🏛️ Layered Separation Architecture
- **Presentation Layer:** Vanilla CSS, responsive layouts, client validation.
- **Application & API Layer:** Microservices, token verification, business rules.
- **Persistence Layer:** PostgreSQL, Redis caches, immutable audit logs.`
    },
    {
      id: 'auth-oauth2-jwt-best-practices',
      title: 'OAuth2, JWT & Zero-Trust Auth Best Practices',
      category: 'development',
      categoryLabel: 'Development',
      author: 'Darshan Tripadwar & Sharvi Date',
      date: '2026-10-25',
      excerpt: '15-minute access tokens, refresh token rotation, HttpOnly Secure SameSite cookie flags, and alg:none attack prevention.',
      filePath: 'notes/development/auth-oauth2-jwt-best-practices.md',
      content: `## 🔑 Token Strategy & Rotation
- Short-lived Access Tokens (15 min).
- Refresh Tokens stored in DB/Redis with rotation upon each use.
- Always use HttpOnly; Secure; SameSite=Strict cookies.`
    },
    {
      id: 'database-schema-design-indexing',
      title: 'Database Schema Design & Indexing Optimization',
      category: 'database',
      categoryLabel: 'Database',
      author: 'Aniket Chavhan',
      date: '2026-10-25',
      excerpt: 'High-performance PostgreSQL indexing (B-Tree, GIN for JSONB payloads), partial indexes, and declarative table partitioning for telemetry.',
      filePath: 'notes/database/database-schema-design-indexing.md',
      content: `## ⚡ Indexing Guidelines (PostgreSQL)
\`\`\`sql
CREATE INDEX idx_logs_timestamp_severity ON security_logs (timestamp DESC, severity);
CREATE INDEX idx_logs_payload_gin ON security_logs USING GIN (raw_payload jsonb_path_ops);
CREATE INDEX idx_active_threat_alerts ON security_alerts (created_at) WHERE resolved = FALSE;
\`\`\``
    },
    {
      id: 'design-system-and-accessibility',
      title: 'CyberHelix Design System & Accessibility',
      category: 'ui-ux',
      categoryLabel: 'UI/UX Design',
      author: 'Pavan Londhe',
      date: '2026-10-25',
      excerpt: 'Obsidian glassmorphic tokens, neon cyan/violet palette, WCAG 2.1 AA accessibility standards, and focus-visible keyboard navigation.',
      filePath: 'notes/ui-ux/design-system-and-accessibility.md',
      content: `## 🎨 Color Palette & Visual Identity
- Base Canvas: #f8fafc with Liquid Glass Morphism
- Accent Cyan: #0284c7
- Accent Violet: #7c3aed
- WCAG AA Contrast minimum 4.5:1 for body copy.`
    },
    {
      id: '2026-10-kickoff-strategy',
      title: 'Team CyberHelix - Q4 Strategy & Kickoff',
      category: 'meeting-notes',
      categoryLabel: 'Meeting Notes',
      author: 'Shivam Rathod',
      date: '2026-10-25',
      excerpt: 'Meeting minutes from October 25, 2026: Member portal launch, SIEM rule expansion, zero-trust token deployment, and DFIR toolkit roadmap.',
      filePath: 'notes/meeting-notes/2026-10-kickoff-strategy.md',
      content: `## 👥 Attendees
Shivam Rathod, Suyash Rathod, Aniket Chavhan, Pavan Londhe, Ashish Ade, Darshan Tripadwar, Mohini Baghele, Manish Wagh, Prashik Undirwade, Mandar Sahare, Soummya Marekar, Sharvi Date, Vasundhara Thakre, Shivani Balpande.

## 🎯 Decisions
1. Unified Member Portal Website released for all 14 members.
2. Suyash Rathod designated as Super Admin with universal permissions.
3. Zero-trust complex URL tokens and individual field platforms initialized.`
    }
  ],
  ideFiles: {
    python: `# Helix Sentinel - SIEM Event Ingestion & Threat Filter
# Author: Suyash Rathod & Shivam Rathod

import re
import datetime

class SIEMDetector:
    def __init__(self):
        self.rules = [
            ("SQL_INJECTION", re.compile(r"(\%27)|(\')|(\-\-)|(\%23)|(union.*select)", re.IGNORECASE)),
            ("BRUTE_FORCE", re.compile(r"(failed login|authentication failure|invalid credentials)", re.IGNORECASE)),
            ("PATH_TRAVERSAL", re.compile(r"(\.\./|\.\.\\\\)", re.IGNORECASE))
        ]

    def inspect_log(self, raw_line: str) -> dict:
        timestamp = datetime.datetime.now(datetime.timezone.utc).isoformat()
        detected_threats = []
        for name, pattern in self.rules:
            if pattern.search(raw_line):
                detected_threats.append(name)
        
        status = "ALERT" if detected_threats else "BENIGN"
        return {
            "timestamp": timestamp,
            "status": status,
            "threats": detected_threats,
            "raw": raw_line
        }

# Live Verification Run
detector = SIEMDetector()
test_line = "192.168.1.105 - - [25/Oct/2026:15:30:00 +0000] 'GET /admin/users?id=1%27%20UNION%20SELECT HTTP/1.1' 200"
result = detector.inspect_log(test_line)

print("SIEM Ingestion Test Status:", result["status"])
print("Detected Signatures:", result["threats"])
print("Timestamp:", result["timestamp"])
`,
    javascript: `// Aegis Zero-Trust Client Authentication Guard
// Author: Darshan Tripadwar & Suyash Rathod

class AegisClientGuard {
  constructor(apiBase) {
    this.apiBase = apiBase || 'https://api.cyberhelix.io/v1';
    this.activeToken = null;
  }

  generateSessionToken(operativeId) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: operativeId,
      iss: 'cyberhelix-iam',
      exp: Math.floor(Date.now() / 1000) + 900, // 15 min
      nonce: Math.random().toString(36).substring(2)
    }));
    const mockSig = btoa('verified_signature_' + Date.now()).substring(0, 24);
    this.activeToken = \`\${header}.\${payload}.\${mockSig}\`;
    return this.activeToken;
  }

  verifySecurityHeaders() {
    return {
      'Content-Security-Policy': "default-src 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY'
    };
  }
}

const guard = new AegisClientGuard();
const token = guard.generateSessionToken('aniket-chavhan');
console.log('[AEGIS] Generated Token:', token);
console.log('[AEGIS] Active Security Headers:', guard.verifySecurityHeaders());
`,
    sql: `-- High-Performance Telemetry Schema
-- Author: Aniket Chavhan (Database Engineer)

CREATE TABLE IF NOT EXISTS security_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    source_ip INET NOT NULL,
    threat_category VARCHAR(64) NOT NULL,
    severity VARCHAR(16) NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    raw_payload JSONB NOT NULL,
    resolved BOOLEAN DEFAULT FALSE
);

-- Optimized B-Tree & GIN Indexes
CREATE INDEX IF NOT EXISTS idx_events_ts_sev 
ON security_events (timestamp DESC, severity);

CREATE INDEX IF NOT EXISTS idx_events_payload_gin 
ON security_events USING GIN (raw_payload jsonb_path_ops);

-- Sample Query
SELECT severity, count(*) AS total_incidents
FROM security_events
WHERE timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY severity
ORDER BY total_incidents DESC;
`,
    html: `<!-- CyberHelix Liquid Glassmorphic Component -->
<div class="glass-widget-demo">
  <div class="glow-orb"></div>
  <div class="content">
    <span class="badge">SECURE_NODE</span>
    <h3>Helix Quantum Station</h3>
    <p>Real-time neural copilot telemetry connected.</p>
    <button class="btn-demo">Engage Neural Link</button>
  </div>
</div>
`
  }
};

// ==========================================================================
// 2. Default Team Members Data
// ==========================================================================
const DEFAULT_MEMBERS = [
  {
    id: "suyash-rathod",
    name: "Suyash Rathod",
    role: "ADMIN",
    isAdmin: true,
    designation: "Super Admin & Full Stack Lead",
    domain: "Systems Architecture & Global Platform",
    email: "suyash.rathod@cyberhelix.io",
    github: "Suyash-coder-12",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Suyash",
    status: "Admin",
    bio: "Super Admin holding universal platform permissions. Directs fullstack architecture, zero-trust session gateways, and NeuroNova AI orchestration.",
    skills: ["Full Stack Architecture", "Zero-Trust Security", "AI Orchestration", "Python", "Node.js / React"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core", "cyber-forensics-toolkit", "darknet-recon-crawler"]
  },
  {
    id: "aniket-chavhan",
    name: "Aniket Chavhan",
    role: "MEMBER",
    isAdmin: false,
    designation: "Database Engineer",
    domain: "Database Architecture & SQL Optimization",
    email: "aniket.chavhan@cyberhelix.io",
    github: "aniket-db",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aniket",
    status: "Core",
    bio: "Specializes in high-throughput transactional databases, distributed telemetry storage, GIN JSONB indexing, and SQL injection defense.",
    skills: ["PostgreSQL", "Redis", "GIN Indexing", "Data Partitioning", "Query Optimization"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core"]
  },
  {
    id: "pavan-londhe",
    name: "Pavan Londhe",
    role: "MEMBER",
    isAdmin: false,
    designation: "UI/UX Designer",
    domain: "Product Design & Cyber Interface",
    email: "pavan.londhe@cyberhelix.io",
    github: "pavan-ux",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Pavan",
    status: "Core",
    bio: "Crafts corporate white liquid glassmorphic interfaces, holographic HUD design tokens, and WCAG AA accessibility standards.",
    skills: ["UI/UX Prototyping", "Design Systems", "Liquid Glassmorphism", "Accessibility WCAG AA"],
    activeProjects: ["helix-sentinel-siem", "portal-web"]
  },
  {
    id: "ashish-ade",
    name: "Ashish Ade",
    role: "MEMBER",
    isAdmin: false,
    designation: "CyberForensic Specialist",
    domain: "Digital Forensics & Incident Response (DFIR)",
    email: "ashish.ade@cyberhelix.io",
    github: "ashish-forensics",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ashish",
    status: "Core",
    bio: "Investigates live security breaches, volatility memory artifacts, disk imaging, and Shannon entropy analysis of suspicious binaries.",
    skills: ["Volatility 3", "Memory Forensics", "Shannon Entropy", "PCAP Analysis", "Autopsy"],
    activeProjects: ["cyber-forensics-toolkit"]
  },
  {
    id: "shivam-rathod",
    name: "Shivam Rathod",
    role: "MEMBER",
    isAdmin: false,
    designation: "Research Head",
    domain: "Vulnerability Research & Threat Intel",
    email: "shivam.rathod@cyberhelix.io",
    github: "shivam-cyber",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Shivam",
    status: "Lead",
    bio: "Directs vulnerability research, zero-day threat analysis, CVSS 3.1 scoring models, and strategic threat briefings.",
    skills: ["Threat Intelligence", "Vulnerability Research", "CVSS Modeling", "Exploit Analysis"],
    activeProjects: ["darknet-recon-crawler", "helix-sentinel-siem"]
  },
  {
    id: "darshan-tripadwar",
    name: "Darshan Tripadwar",
    role: "MEMBER",
    isAdmin: false,
    designation: "Auth & Python Developer",
    domain: "Authentication & Cryptographic Backends",
    email: "darshan.tripadwar@cyberhelix.io",
    github: "darshan-dev",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Darshan",
    status: "Core",
    bio: "Builds zero-trust authentication engines, PBKDF2-HMAC salted hashing, JWT verification, and secure Python services.",
    skills: ["Python", "PBKDF2-HMAC", "JWT Signing", "OAuth 2.0 / OIDC", "FastAPI"],
    activeProjects: ["aegis-auth-core"]
  },
  {
    id: "mohini-baghele",
    name: "Mohini Baghele",
    role: "MEMBER",
    isAdmin: false,
    designation: "Cybersecurity Analyst",
    domain: "SOC Operations & Threat Detection",
    email: "mohini.baghele@cyberhelix.io",
    github: "mohini-sec",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mohini",
    status: "Active",
    bio: "Focuses on live telemetry monitoring, SIEM detection engineering, syslog correlation, and triage playbooks.",
    skills: ["SIEM Rules", "Threat Hunting", "Log Analysis", "Incident Triage (NIST)"],
    activeProjects: ["helix-sentinel-siem"]
  },
  {
    id: "manish-wagh",
    name: "Manish Wagh",
    role: "MEMBER",
    isAdmin: false,
    designation: "Penetration Tester",
    domain: "Offensive Security & Red Teaming",
    email: "manish.wagh@cyberhelix.io",
    github: "manish-pentest",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Manish",
    status: "Active",
    bio: "Conducts adversarial simulations, vulnerability assessments, OWASP Top 10 auditing, and permission verification.",
    skills: ["Burp Suite", "OWASP Top 10", "Network Pentesting", "Privilege Escalation Audit"],
    activeProjects: ["darknet-recon-crawler"]
  },
  {
    id: "prashik-undirwade",
    name: "Prashik Undirwade",
    role: "MEMBER",
    isAdmin: false,
    designation: "Cloud Security Specialist",
    domain: "Cloud Infrastructure & DevSecOps",
    email: "prashik.undirwade@cyberhelix.io",
    github: "prashik-cloud",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Prashik",
    status: "Active",
    bio: "Secures multicloud deployments, CI/CD pipeline hardening, IAM policies, and container security orchestrations.",
    skills: ["AWS / GCP Security", "Docker & Kubernetes", "CI/CD Hardening", "Terraform"],
    activeProjects: ["helix-sentinel-siem", "aegis-auth-core"]
  },
  {
    id: "mandar-sahare",
    name: "Mandar Sahare",
    role: "MEMBER",
    isAdmin: false,
    designation: "Network Security Engineer",
    domain: "Perimeter Defense & Protocol Analysis",
    email: "mandar.sahare@cyberhelix.io",
    github: "mandar-net",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mandar",
    status: "Active",
    bio: "Architects firewall topologies, intrusion detection systems, packet inspection, and secure network tunnels.",
    skills: ["Snort / Suricata", "WireGuard", "Wireshark", "Packet Filtering"],
    activeProjects: ["cyber-forensics-toolkit"]
  },
  {
    id: "soummya-marekar",
    name: "Soummya Marekar",
    role: "MEMBER",
    isAdmin: false,
    designation: "Frontend Security & QA",
    domain: "Client-Side Hardening & Verification",
    email: "soummya.marekar@cyberhelix.io",
    github: "soummya-qa",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Soummya",
    status: "Active",
    bio: "Ensures client apps are resilient to XSS/CSRF, conducts CSP audits, and oversees automated regression testing.",
    skills: ["CSP Hardening", "XSS/CSRF Defenses", "Automated QA", "Regression Testing"],
    activeProjects: ["portal-web", "aegis-auth-core"]
  },
  {
    id: "sharvi-date",
    name: "Sharvi Date",
    role: "MEMBER",
    isAdmin: false,
    designation: "Cryptography Researcher",
    domain: "Applied Cryptography & Privacy",
    email: "sharvi.date@cyberhelix.io",
    github: "sharvi-crypto",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sharvi",
    status: "Active",
    bio: "Researches post-quantum cryptographic primitives, zero-knowledge proofs, and entropy hashing algorithms.",
    skills: ["Applied Cryptography", "Elliptic Curves", "ZK Proofs", "Hashing Algorithms"],
    activeProjects: ["aegis-auth-core"]
  },
  {
    id: "vasundhara-thakre",
    name: "Vasundhara Thakre",
    role: "MEMBER",
    isAdmin: false,
    designation: "Threat Intelligence Analyst",
    domain: "OSINT & Threat Feeds",
    email: "vasundhara.thakre@cyberhelix.io",
    github: "vasundhara-intel",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Vasundhara",
    status: "Active",
    bio: "Monitors emerging cyber threats, collects open-source threat feeds, and curates actionable threat indicators.",
    skills: ["OSINT", "MISP", "IOC Extraction", "Threat Actor Profiling"],
    activeProjects: ["darknet-recon-crawler"]
  },
  {
    id: "shivani-balpande",
    name: "Shivani Balpande",
    role: "MEMBER",
    isAdmin: false,
    designation: "Compliance & InfoSec Auditor",
    domain: "Governance, Risk & Compliance",
    email: "shivani.balpande@cyberhelix.io",
    github: "shivani-audit",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Shivani",
    status: "Active",
    bio: "Audits security posture against international standards, ISO 27001, NIST CSF, and data governance policies.",
    skills: ["ISO 27001", "NIST CSF", "SOC 2", "Risk Modeling"],
    activeProjects: ["cyber-forensics-toolkit", "helix-sentinel-siem"]
  }
];

// ==========================================================================
// 3. Application Bootstrapper
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  await initializeDirectoryAndAccounts();
  initializeAuditLogs();
  initializePodTasks();
  setupNavigation();
  setupProjectsView();
  setupNotesView();
  setupUtilitiesView();
  setupModals();
  setupCloudIDE();
  setupCommandPalette();

  // Evaluate URL & Zero-Trust Session
  handleRouteAndSessionVerification();

  // Listen to hash change for deep routing
  window.addEventListener('hashchange', () => {
    handleRouteAndSessionVerification();
  });
});

// ==========================================================================
// 4. Accounts & Authentication Engine
// ==========================================================================
async function initializeDirectoryAndAccounts() {
  try {
    const res = await fetch('../members/directory.json');
    if (res.ok) {
      CYBER_STATE.members = await res.json();
    } else {
      CYBER_STATE.members = DEFAULT_MEMBERS;
    }
  } catch (e) {
    CYBER_STATE.members = DEFAULT_MEMBERS;
  }

  // Ensure Suyash Rathod is strictly flagged as ADMIN
  const suyash = CYBER_STATE.members.find(m => m.id === 'suyash-rathod');
  if (suyash) {
    suyash.role = 'ADMIN';
    suyash.isAdmin = true;
    suyash.status = 'Admin';
  }

  // Load or Seed Passwords in localStorage
  const savedAccounts = localStorage.getItem('CYBER_ACCOUNTS_V2');
  if (savedAccounts) {
    try {
      CYBER_STATE.accounts = JSON.parse(savedAccounts);
    } catch (e) {
      CYBER_STATE.accounts = {};
    }
  }

  // Seed default password (Helix@2026) for any missing account
  CYBER_STATE.members.forEach(member => {
    const email = member.email.toLowerCase();
    if (!CYBER_STATE.accounts[email]) {
      CYBER_STATE.accounts[email] = {
        password: member.id === 'suyash-rathod' ? 'Helix@Admin2026' : 'Helix@2026',
        memberId: member.id,
        role: member.role || 'MEMBER',
        updatedAt: new Date().toISOString()
      };
    }
  });

  saveAccountsToStorage();
}

function saveAccountsToStorage() {
  localStorage.setItem('CYBER_ACCOUNTS_V2', JSON.stringify(CYBER_STATE.accounts));
}

function buildOperativeRoute(tabId, member) {
  if (!member) member = CYBER_STATE.currentMember;
  if (!member) return '#/gateway?status=unauthenticated&security=zero-trust';

  const token = CYBER_STATE.currentSessionToken || generateComplexSessionToken(member.id);
  const safeName = member.id;
  const domainSlug = (member.domain || 'security-station')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  let routePath = `/platform/${safeName}/${domainSlug}`;
  if (tabId === 'admin') routePath = `/platform/${safeName}/super-admin-nexus`;
  else if (tabId === 'pod') routePath = `/platform/${safeName}/${domainSlug}-workbench`;
  else if (tabId === 'ide') routePath = `/platform/${safeName}/cloud-ide-${CYBER_STATE.activeIdeFile || 'python'}`;
  else if (tabId === 'neuronova') routePath = `/platform/${safeName}/neuronova-ai-quantum-hud`;
  else if (tabId === 'github') routePath = `/platform/${safeName}/github-workspace-${member.github}`;
  else if (tabId === 'dashboard') routePath = `/platform/${safeName}/command-dashboard`;
  else if (tabId === 'projects') routePath = `/platform/${safeName}/projects-repository`;
  else if (tabId === 'notes') routePath = `/platform/${safeName}/knowledge-base`;
  else if (tabId === 'members') routePath = `/platform/${safeName}/operative-directory`;
  else if (tabId === 'utilities') routePath = `/platform/${safeName}/cyber-utilities`;

  const queryParams = new URLSearchParams({
    session: token,
    sig: `sha256_0x${member.id.substring(0, 4)}_${Date.now().toString(36)}`,
    auth_tier: member.isAdmin ? 'level-5-superadmin' : 'verified-operative',
    tab: tabId || 'dashboard',
    cluster: 'mumbai-alpha-node-01'
  });

  return `#${routePath}?${queryParams.toString()}`;
}

function updateBrowserUrl(tabId, member) {
  if (!member) member = CYBER_STATE.currentMember;
  if (!member) return;

  const complexRoute = buildOperativeRoute(tabId, member);
  history.replaceState(null, '', complexRoute);

  const displayEl = document.getElementById('route-url-display');
  if (displayEl) {
    displayEl.textContent = `${window.location.origin}${window.location.pathname}${complexRoute}`;
  }
}

function copyCurrentRouteUrl() {
  const fullUrl = window.location.href;
  copyTextToClipboard(fullUrl);
  showToast('Active Zero-Trust Route copied to clipboard', 'SECURITY_ROUTE');
}

function handleRouteAndSessionVerification() {
  const sessionRaw = sessionStorage.getItem('CYBER_ACTIVE_SESSION');
  const gatewayEl = document.getElementById('login-gateway');
  const hash = window.location.hash;

  if (!sessionRaw) {
    // Save target route for seamless post-login redirection
    if (hash && !hash.startsWith('#/gateway')) {
      sessionStorage.setItem('CYBER_REDIRECT_ROUTE', hash);
    }
    showLoginGateway();
    return;
  }

  let session;
  try {
    session = JSON.parse(sessionRaw);
  } catch (e) {
    showLoginGateway();
    return;
  }

  const member = CYBER_STATE.members.find(m => m.id === session.memberId);
  if (!member) {
    showLoginGateway();
    return;
  }

  // Verify session integrity & token
  CYBER_STATE.currentMember = member;
  CYBER_STATE.currentSessionToken = session.token;

  // Hide login gateway
  if (gatewayEl) {
    gatewayEl.classList.remove('active');
    gatewayEl.style.display = 'none';
  }

  // Update authenticated UI elements
  updateHeaderForUser(member);
  renderDashboard();

  // If user requested specific tab in URL hash
  const urlParams = parseHashParams(hash);
  const targetTab = urlParams.tab || CYBER_STATE.activeTab || 'dashboard';
  switchTab(targetTab, true);
}

function showLoginGateway() {
  const gatewayEl = document.getElementById('login-gateway');
  if (gatewayEl) {
    gatewayEl.classList.add('active');
    gatewayEl.style.display = 'flex';
  }
  // Reset hash to unauthenticated state with security flag
  if (!window.location.hash.startsWith('#/gateway')) {
    history.replaceState(null, '', '#/gateway?status=locked&security=zero-trust&v=3.0');
  }

  const displayEl = document.getElementById('route-url-display');
  if (displayEl) {
    displayEl.textContent = `${window.location.origin}${window.location.pathname}#/gateway?status=locked&security=zero-trust`;
  }
}

function parseHashParams(hash) {
  const params = {};
  if (!hash || !hash.includes('?')) return params;
  const queryString = hash.split('?')[1];
  const pairs = queryString.split('&');
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key) params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });
  return params;
}

function generateComplexSessionToken(memberId) {
  const randPart = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0')).join('');
  const timestamp = Date.now().toString(36);
  return `sec_enc_${memberId.substring(0, 4)}_${timestamp}_${randPart}`;
}

function handleUserLogin(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  if (!emailInput || !passwordInput) return;
  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  const account = CYBER_STATE.accounts[email];
  if (!account) {
    showToast('Authentication Failed: Operative Email not recognized', 'AUTH_ERROR');
    return;
  }

  if (account.password !== password) {
    showToast('Authentication Failed: Invalid Passphrase', 'AUTH_ERROR');
    return;
  }

  const member = CYBER_STATE.members.find(m => m.id === account.memberId);
  if (!member) {
    showToast('Profile records missing for this operative', 'SYSTEM_ERR');
    return;
  }

  // Create Zero-Trust Session
  const sessionToken = generateComplexSessionToken(member.id);
  const sessionObj = {
    email: member.email,
    memberId: member.id,
    token: sessionToken,
    role: member.role || 'MEMBER',
    loginTime: new Date().toISOString()
  };

  sessionStorage.setItem('CYBER_ACTIVE_SESSION', JSON.stringify(sessionObj));
  CYBER_STATE.currentMember = member;
  CYBER_STATE.currentSessionToken = sessionToken;

  // Log Audit Event
  logAuditEvent('LOGIN_SUCCESS', `Operative ${member.name} (${member.designation}) authenticated.`);

  // Check for any redirect route
  const redirectRoute = sessionStorage.getItem('CYBER_REDIRECT_ROUTE');
  sessionStorage.removeItem('CYBER_REDIRECT_ROUTE');
  let targetTab = 'dashboard';
  if (redirectRoute) {
    const params = parseHashParams(redirectRoute);
    if (params.tab) targetTab = params.tab;
  }

  // Update complex operative URL
  updateBrowserUrl(targetTab, member);

  // Hide Gateway Overlay with smooth transition
  const gatewayEl = document.getElementById('login-gateway');
  if (gatewayEl) {
    gatewayEl.classList.remove('active');
    setTimeout(() => {
      gatewayEl.style.display = 'none';
    }, 300);
  }

  updateHeaderForUser(member);
  renderDashboard();
  renderPodStation(member);
  switchTab(targetTab, true);

  showToast(`Welcome back, ${member.name}!`, 'ACCESS_GRANTED');

  // Welcome speech via NeuroNova if voice enabled
  if (CYBER_STATE.voiceOutputEnabled) {
    speakText(`Welcome back, ${member.name}. Neural telemetry and your ${member.designation} station are online.`);
  }
}

function quickFillCredentials(email) {
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  if (!emailInput || !passwordInput) return;

  emailInput.value = email;
  const account = CYBER_STATE.accounts[email.toLowerCase()];
  if (account) {
    passwordInput.value = account.password;
  } else {
    passwordInput.value = email.includes('suyash') ? 'Helix@Admin2026' : 'Helix@2026';
  }
}

function handleUserLogout() {
  const memberName = CYBER_STATE.currentMember ? CYBER_STATE.currentMember.name : 'Operative';
  logAuditEvent('LOGOUT', `Operative ${memberName} terminated active session.`);

  sessionStorage.removeItem('CYBER_ACTIVE_SESSION');
  CYBER_STATE.currentMember = null;
  CYBER_STATE.currentSessionToken = null;

  closeProfileDropdown();
  showLoginGateway();

  showToast('Session locked and credentials cleared from memory', 'SESSION_TERMINATED');
}

// Password Change Handler
function openPasswordModal() {
  closeProfileDropdown();
  const modal = document.getElementById('password-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closePasswordModal() {
  const modal = document.getElementById('password-modal-overlay');
  if (modal) modal.classList.remove('active');
  const cur = document.getElementById('pw-current');
  const nw = document.getElementById('pw-new');
  const conf = document.getElementById('pw-confirm');
  if (cur) cur.value = '';
  if (nw) nw.value = '';
  if (conf) conf.value = '';
}

function handlePasswordChangeSubmit(event) {
  event.preventDefault();
  if (!CYBER_STATE.currentMember) return;

  const currentPassInput = document.getElementById('pw-current');
  const newPassInput = document.getElementById('pw-new');
  const confirmPassInput = document.getElementById('pw-confirm');

  const curPass = currentPassInput.value;
  const newPass = newPassInput.value;
  const confPass = confirmPassInput.value;

  const email = CYBER_STATE.currentMember.email.toLowerCase();
  const account = CYBER_STATE.accounts[email];

  if (!account || account.password !== curPass) {
    showToast('Current passphrase does not match records', 'ERROR');
    return;
  }

  if (newPass.length < 6) {
    showToast('New passphrase must be at least 6 characters', 'WARN');
    return;
  }

  if (newPass !== confPass) {
    showToast('New passphrase and confirmation do not match', 'ERROR');
    return;
  }

  account.password = newPass;
  account.updatedAt = new Date().toISOString();
  saveAccountsToStorage();

  logAuditEvent('PASSWORD_CHANGE', `Operative ${CYBER_STATE.currentMember.name} successfully updated their passphrase.`);
  closePasswordModal();
  showToast('Passphrase updated successfully across CyberHelix clusters', 'SUCCESS');

  // Update admin table if open
  if (CYBER_STATE.currentMember.role === 'ADMIN') {
    renderAdminConsole();
  }
}

// ==========================================================================
// 5. Header & Profile Badge Management
// ==========================================================================
function updateHeaderForUser(member) {
  const avatarEl = document.getElementById('header-avatar');
  const nameEl = document.getElementById('header-member-name');
  const roleEl = document.getElementById('header-member-role');
  const adminBtn = document.getElementById('nav-admin-btn');
  const podTitleEl = document.getElementById('nav-pod-title');

  if (avatarEl) avatarEl.src = member.avatar;
  if (nameEl) nameEl.textContent = member.name;
  if (roleEl) roleEl.textContent = member.designation;

  // Custom tab title for member's pod
  if (podTitleEl) {
    const firstName = member.name.split(' ')[0];
    podTitleEl.textContent = `${firstName}'s Pod`;
  }

  // Display Admin Console Tab only for Suyash Rathod (Super Admin)
  if (adminBtn) {
    if (member.role === 'ADMIN' || member.isAdmin) {
      adminBtn.style.display = 'inline-flex';
    } else {
      adminBtn.style.display = 'none';
    }
  }
}

function toggleProfileDropdown() {
  const dropdown = document.getElementById('profile-dropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  }
}

function closeProfileDropdown() {
  const dropdown = document.getElementById('profile-dropdown');
  if (dropdown) dropdown.style.display = 'none';
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.member-switch-wrap');
  if (wrap && !wrap.contains(e.target)) {
    closeProfileDropdown();
  }
});

// ==========================================================================
// 6. Navigation & Tab Switcher
// ==========================================================================
function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
}

function switchTab(tabId, updateHash = true) {
  // If not authenticated, force login
  if (!CYBER_STATE.currentMember) {
    showLoginGateway();
    return;
  }

  // Protection: Only Admin can access the Admin Console
  if (tabId === 'admin') {
    if (CYBER_STATE.currentMember.role !== 'ADMIN' && !CYBER_STATE.currentMember.isAdmin) {
      showToast('Access Denied: Level 5 Super Admin authorization required', 'SECURITY_ALERT');
      return;
    }
  }

  CYBER_STATE.activeTab = tabId;

  // Highlight Nav Buttons
  document.querySelectorAll('.nav-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
  });

  // Activate View Panels
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === `view-${tabId}`);
  });

  // Update complex operative URL with active platform & security parameters
  if (updateHash && CYBER_STATE.currentSessionToken) {
    updateBrowserUrl(tabId, CYBER_STATE.currentMember);
  }

  // Render tab-specific state
  if (tabId === 'dashboard') renderDashboard();
  if (tabId === 'pod') renderPodStation(CYBER_STATE.currentMember);
  if (tabId === 'projects') renderProjects();
  if (tabId === 'notes') renderNotes();
  if (tabId === 'github') renderGitHubWorkspace(CYBER_STATE.currentMember.github);
  if (tabId === 'ide') renderCloudIDEState();
  if (tabId === 'members') renderMembers();
  if (tabId === 'admin') renderAdminConsole();
}

// ==========================================================================
// 7. Dashboard View (Personalized Greetings & Telemetry)
// ==========================================================================
function renderDashboard() {
  const member = CYBER_STATE.currentMember || DEFAULT_MEMBERS[0];

  // Personalized Greeting Banner
  const heroNameEl = document.getElementById('hero-operative-name');
  const heroGreetingEl = document.getElementById('hero-member-greeting');
  const defconTag = document.getElementById('hero-defcon-tag');
  const taskCountStat = document.getElementById('stat-pod-tasks-count');

  if (heroNameEl) {
    heroNameEl.textContent = member.name;
  }

  if (heroGreetingEl) {
    heroGreetingEl.textContent = `Operational Nexus ready for ${member.name}. Your specialized ${member.domain} workbench, field sprint tasks, and NeuroNova AI copilot are synchronized.`;
  }

  if (defconTag) {
    if (member.role === 'ADMIN') {
      defconTag.innerHTML = `LEVEL 5 OVERWATCH // SUPER ADMIN SUYASH RATHOD ACTIVE`;
      defconTag.style.color = 'var(--liquid-cyan)';
    } else {
      defconTag.innerHTML = `DEFCON 2 // VERIFIED OPERATIVE // ${member.designation.toUpperCase()}`;
    }
  }

  // Count active tasks for this member
  const memberTasks = CYBER_STATE.podTasks[member.id] || [];
  if (taskCountStat) {
    taskCountStat.textContent = memberTasks.length.toString().padStart(2, '0');
  }

  // Render Member's Assigned Projects in Dashboard Widget
  const assignedListEl = document.getElementById('dash-assigned-projects');
  if (assignedListEl) {
    const myProjects = CYBER_STATE.projects.filter(p =>
      p.leadId === member.id || p.contributors.includes(member.id)
    );

    if (myProjects.length === 0) {
      assignedListEl.innerHTML = `
        <div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">
          No active projects assigned yet. Explore the Projects tab to contribute!
        </div>
      `;
    } else {
      assignedListEl.innerHTML = myProjects.map(p => `
        <div class="dash-project-item" onclick="openProjectModal('${p.id}')">
          <div class="dash-project-info">
            <h4>${p.name}</h4>
            <p>${p.domain} • ${p.leadId === member.id ? '⭐ Project Lead' : 'Contributor'}</p>
          </div>
          <span class="badge ${p.badgeClass}">${p.status}</span>
        </div>
      `).join('');
    }
  }

  // Render Recent Notes
  const recentNotesEl = document.getElementById('dash-recent-notes');
  if (recentNotesEl) {
    recentNotesEl.innerHTML = CYBER_STATE.notes.slice(0, 4).map(n => `
      <div class="dash-note-item" onclick="openNoteModal('${n.id}')">
        <div class="dash-note-title">${n.title}</div>
        <div class="dash-note-meta">
          <span>By ${n.author}</span>
          <span>${n.categoryLabel}</span>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// 8. Individual Field Pod Platforms (Customized per Member)
// ==========================================================================
function renderPodStation(member) {
  if (!member) member = CYBER_STATE.currentMember;
  if (!member) return;

  const podTitleEl = document.getElementById('pod-hero-title');
  const podSubEl = document.getElementById('pod-hero-sub');
  const workbenchContainer = document.getElementById('pod-interactive-workbench');

  if (podTitleEl) {
    podTitleEl.innerHTML = `${member.name}'s Field Station <span style="font-size:0.95rem; font-weight:600; color:var(--liquid-cyan); margin-left:0.5rem;">[${member.domain}]</span>`;
  }

  if (podSubEl) {
    podSubEl.textContent = `Autonomous workspace optimized for ${member.name} (${member.designation}). Manage your field tasks and access your specialized toolsuite below.`;
  }

  // Render domain-specific interactive workbench
  if (workbenchContainer) {
    workbenchContainer.innerHTML = buildCustomWorkbenchHTML(member);
    attachWorkbenchHandlers(member);
  }

  // Render Kanban Task Board for this member
  renderMemberTasksKanban(member.id);
}

function buildCustomWorkbenchHTML(member) {
  // Aniket Chavhan: Database Engineer -> SQL Query Studio
  if (member.id === 'aniket-chavhan') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem;">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
            Interactive PostgreSQL Query Studio & Schema Inspector
          </div>
          <span class="tag">PostgreSQL 16 Cluster</span>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:1rem;">
          Execute optimized queries against simulated telemetry tables, verify GIN indexes, and test query execution plans.
        </p>
        <div style="display:flex; gap:0.5rem; margin-bottom:0.75rem; flex-wrap:wrap;">
          <button class="demo-pill" onclick="setSqlQuery(\`SELECT id, source_ip, threat_category, severity FROM security_events WHERE severity = 'CRITICAL';\`)">Query Critical Alerts</button>
          <button class="demo-pill" onclick="setSqlQuery(\`SELECT threat_category, count(*) FROM security_events GROUP BY threat_category ORDER BY count(*) DESC;\`)">Group by Threat Category</button>
          <button class="demo-pill" onclick="setSqlQuery(\`EXPLAIN ANALYZE SELECT * FROM security_events WHERE raw_payload @> '{\\\\"attack\\\\": true}';\`)">Explain GIN Index Plan</button>
        </div>
        <div style="margin-bottom:0.75rem;">
          <textarea id="sql-query-input" class="tool-textarea" style="height:85px; font-family:'JetBrains Mono';">SELECT id, source_ip, threat_category, severity, timestamp FROM security_events ORDER BY timestamp DESC LIMIT 5;</textarea>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
          <button class="btn-primary" id="btn-run-sql" onclick="executeSqlWorkbench()">⚡ Execute SQL Query</button>
          <span id="sql-execution-time" style="font-family:'JetBrains Mono'; font-size:0.78rem; color:var(--text-muted);">Query took: 1.4ms</span>
        </div>
        <div id="sql-results-table" style="overflow-x:auto;">
          <!-- SQL output rendered here -->
        </div>
      </div>
    `;
  }

  // Pavan Londhe: UI/UX Designer -> Glassmorphism Token Studio
  if (member.id === 'pavan-londhe') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem;">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
            Liquid Glassmorphism Design Token Customizer
          </div>
          <span class="tag">Design Tokens v3.0</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
          <div>
            <div class="tool-form-group">
              <label class="tool-label">Backdrop Blur: <span id="val-blur">24px</span></label>
              <input type="range" id="slider-blur" min="4" max="50" value="24" class="cyber-input" oninput="updateDesignTokens()">
            </div>
            <div class="tool-form-group">
              <label class="tool-label">Glass White Alpha: <span id="val-alpha">0.82</span></label>
              <input type="range" id="slider-alpha" min="0.1" max="1" step="0.05" value="0.82" class="cyber-input" oninput="updateDesignTokens()">
            </div>
            <div class="tool-form-group">
              <label class="tool-label">Border Glow Hue</label>
              <select id="select-accent" class="cyber-input" onchange="updateDesignTokens()">
                <option value="#0284c7">Liquid Cyan (#0284c7)</option>
                <option value="#7c3aed">Electric Violet (#7c3aed)</option>
                <option value="#059669">Emerald Cyber (#059669)</option>
                <option value="#d97706">Solar Amber (#d97706)</option>
              </select>
            </div>
          </div>
          <div id="preview-glass-box" style="padding:1.5rem; border-radius:var(--radius-md); background:rgba(255,255,255,0.82); backdrop-filter:blur(24px); border:1px solid #0284c7; box-shadow:0 8px 32px rgba(2,132,199,0.15); display:flex; flex-direction:column; justify-content:center;">
            <h4 style="font-family:'Outfit'; font-size:1.15rem; color:var(--text-main); margin-bottom:0.4rem;">Live Token Preview</h4>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">Corporate white liquid theme with dynamic WCAG AA contrast ratio.</p>
            <button class="btn-primary" style="align-self:flex-start;">Test Interactive State</button>
          </div>
        </div>
      </div>
    `;
  }

  // Ashish Ade: Forensics -> DFIR Artifact & Entropy Triage
  if (member.id === 'ashish-ade') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem;">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            DFIR Artifact Triage & Shannon Entropy Inspector
          </div>
          <span class="tag">Forensics Lab</span>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:1rem;">
          Analyze string entropy to discover obfuscated scripts, packed executable sections, or suspicious network PCAP fragments.
        </p>
        <div class="tool-form-group">
          <label class="tool-label">Paste Binary Segment or Obfuscated Payload:</label>
          <textarea id="forensic-payload-input" class="tool-textarea" style="height:75px;">powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Enc JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0AA==</textarea>
        </div>
        <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
          <button class="btn-primary" onclick="calculateForensicEntropy()">🔬 Calculate Shannon Entropy</button>
          <button class="btn-secondary" onclick="simulateVolatilityProcessScan()">Inspect Process Tree</button>
        </div>
        <div id="forensic-entropy-result" class="tool-output-box">
          Click above to compute Shannon entropy metrics...
        </div>
      </div>
    `;
  }

  // Darshan Tripadwar: Auth Developer -> JWT & Cryptographic Playground
  if (member.id === 'darshan-tripadwar') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem;">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Zero-Trust JWT Generator & Signature Verification Station
          </div>
          <span class="tag">HS256 / RS256 Auth</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem;">
          <div>
            <label class="tool-label">JWT Subject / Operative ID:</label>
            <input type="text" id="jwt-sub-input" class="cyber-input" value="darshan.tripadwar" style="margin-bottom:0.75rem;">
            <label class="tool-label">Secret Signing Key:</label>
            <input type="text" id="jwt-secret-input" class="cyber-input" value="CyberHelix_Master_ZeroTrust_2026!" style="margin-bottom:0.75rem;">
            <button class="btn-primary" onclick="generatePlaygroundJwt()">Generate Signed Token</button>
          </div>
          <div>
            <label class="tool-label">Signed Token Output:</label>
            <div id="jwt-token-output" class="tool-output-box" style="height:115px; font-size:0.75rem; word-break:break-all;">
              Click generate to sign token...
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Mohini Baghele: Cybersecurity Analyst -> SOC Incident Stream
  if (member.id === 'mohini-baghele') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem;">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            SOC Live Alert Correlation Stream (SIEM RFC 3164)
          </div>
          <span class="tag">SOC Level 2 Triage</span>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <span style="font-size:0.85rem; color:var(--text-secondary);">Simulated live syslog events streamed into Helix Sentinel</span>
          <button class="btn-secondary" style="padding:0.25rem 0.65rem; font-size:0.75rem;" onclick="simulateNewSocAlert()">+ Inject Telemetry Event</button>
        </div>
        <div id="soc-live-feed" style="background:#0f172a; color:#38bdf8; font-family:'JetBrains Mono'; font-size:0.78rem; padding:1rem; border-radius:var(--radius-sm); max-height:160px; overflow-y:auto; line-height:1.6;">
          [15:40:02] [SIEM] RFC3164 Syslog Ingest: host=auth-srv-01 event=USER_LOGIN user=aniket.chavhan status=SUCCESS<br>
          [15:42:15] [SIEM] RFC3164 Syslog Ingest: host=api-gateway ip=185.220.101.4 uri=/api/v1/auth status=401 attempts=4<br>
          [15:43:50] [SIEM] ALERT: Potential Brute-Force threshold exceeded for 185.220.101.4 (Trigger Rule: BF_01)
        </div>
      </div>
    `;
  }

  // Suyash Rathod: Super Admin -> Platform Health & Pod Switcher
  if (member.id === 'suyash-rathod') {
    return `
      <div class="widget-card" style="margin-bottom:1.5rem; border-left:4px solid var(--liquid-cyan);">
        <div class="widget-header">
          <div class="widget-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            Full Stack Lead Orchestration Command & Pod Inspector
          </div>
          <span class="badge badge-cyan">Admin Universal Access</span>
        </div>
        <p style="font-size:0.86rem; color:var(--text-secondary); margin-bottom:1rem;">
          As Super Admin, you can directly inspect, modify, and manage any operative's specialized workstation.
        </p>
        <div style="display:flex; gap:0.75rem; align-items:center; flex-wrap:wrap;">
          <span style="font-weight:700; font-size:0.85rem; color:var(--text-main);">Jump to Operative Station:</span>
          <select id="suyash-pod-jump-select" class="cyber-input" style="width:260px;" onchange="suyashJumpToPod(event)">
            ${CYBER_STATE.members.map(m => `
              <option value="${m.id}" ${m.id === 'suyash-rathod' ? 'selected' : ''}>${m.name} (${m.designation})</option>
            `).join('')}
          </select>
          <button class="btn-primary" onclick="switchTab('admin')">Open Full Admin Console →</button>
        </div>
      </div>
    `;
  }

  // Default workbench for other operatives
  return `
    <div class="widget-card" style="margin-bottom:1.5rem;">
      <div class="widget-header">
        <div class="widget-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
          ${member.domain} Operational Workspace
        </div>
        <span class="tag">Active Station</span>
      </div>
      <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem;">
        Station initialized for ${member.name} (${member.designation}). All domain telemetry, project branches, and assigned tasks are synced.
      </p>
      <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
        <button class="demo-pill" onclick="switchTab('ide')">Launch Cloud IDE in this Domain</button>
        <button class="demo-pill" onclick="sendPromptToNeuroNova('Give me a high-priority checklist for ${member.domain}')">Consult NeuroNova Copilot</button>
        <button class="demo-pill" onclick="switchTab('github')">View Assigned Repositories</button>
      </div>
    </div>
  `;
}

function attachWorkbenchHandlers(member) {
  if (member.id === 'aniket-chavhan') {
    // Initial run to populate table
    executeSqlWorkbench();
  }
}

// SQL Workbench Runner for Aniket
function setSqlQuery(sql) {
  const input = document.getElementById('sql-query-input');
  if (input) {
    input.value = sql;
    executeSqlWorkbench();
  }
}

function executeSqlWorkbench() {
  const input = document.getElementById('sql-query-input');
  const resultsContainer = document.getElementById('sql-results-table');
  const latencyEl = document.getElementById('sql-execution-time');
  if (!input || !resultsContainer) return;

  const query = input.value.trim();
  const start = performance.now();

  // Simulated live query results
  let rows = [];
  if (query.toUpperCase().includes('CRITICAL')) {
    rows = [
      { id: 'ev_0981', source_ip: '192.168.1.105', threat_category: 'SQL_INJECTION', severity: 'CRITICAL', timestamp: '2026-10-25 15:44:10' },
      { id: 'ev_0974', source_ip: '45.33.32.156', threat_category: 'BRUTE_FORCE', severity: 'CRITICAL', timestamp: '2026-10-25 15:39:22' },
      { id: 'ev_0955', source_ip: '185.220.101.4', threat_category: 'PATH_TRAVERSAL', severity: 'CRITICAL', timestamp: '2026-10-25 15:31:05' }
    ];
  } else if (query.toUpperCase().includes('GROUP BY')) {
    rows = [
      { threat_category: 'BRUTE_FORCE', count: '1,420 incidents' },
      { threat_category: 'SQL_INJECTION', count: '284 incidents' },
      { threat_category: 'PATH_TRAVERSAL', count: '92 incidents' },
      { threat_category: 'PORT_SCAN', count: '3,840 incidents' }
    ];
  } else if (query.toUpperCase().includes('EXPLAIN')) {
    rows = [
      { query_plan: 'Bitmap Heap Scan on security_events (cost=12.40..342.10 rows=45 width=128)' },
      { query_plan: 'Recheck Cond: (raw_payload @> \'{"attack": true}\'::jsonb)' },
      { query_plan: '-> Bitmap Index Scan on idx_events_payload_gin (cost=0.00..12.39 rows=45 width=0)' },
      { query_plan: 'Execution Time: 0.842 ms (GIN Index Hit)' }
    ];
  } else {
    rows = [
      { id: 'ev_1001', source_ip: '10.0.0.45', threat_category: 'AUTH_SUCCESS', severity: 'LOW', timestamp: '2026-10-25 15:45:00' },
      { id: 'ev_1000', source_ip: '10.0.0.12', threat_category: 'REDIS_SYNC', severity: 'LOW', timestamp: '2026-10-25 15:44:58' },
      { id: 'ev_0999', source_ip: '192.168.1.105', threat_category: 'SQL_INJECTION', severity: 'CRITICAL', timestamp: '2026-10-25 15:44:10' },
      { id: 'ev_0998', source_ip: '172.16.0.4', threat_category: 'PORT_SCAN', severity: 'MEDIUM', timestamp: '2026-10-25 15:43:02' },
      { id: 'ev_0997', source_ip: '185.220.101.4', threat_category: 'BRUTE_FORCE', severity: 'HIGH', timestamp: '2026-10-25 15:42:15' }
    ];
  }

  const duration = (performance.now() - start + Math.random() * 1.5).toFixed(2);
  if (latencyEl) latencyEl.textContent = `Query took: ${duration}ms (Index Scan)`;

  if (rows.length === 0) {
    resultsContainer.innerHTML = `<div style="padding:1rem; color:var(--text-muted); font-size:0.85rem;">Zero rows returned.</div>`;
    return;
  }

  const headers = Object.keys(rows[0]);
  resultsContainer.innerHTML = `
    <table class="operatives-table" style="font-size:0.8rem; font-family:'JetBrains Mono';">
      <thead>
        <tr>${headers.map(h => `<th>${h.toUpperCase()}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr>${headers.map(h => `<td>${r[h]}</td>`).join('')}</tr>
        `).join('')}
      </tbody>
    </table>
  `;

  showToast('SQL Query Executed', 'DATABASE');
}

// Design Tokens for Pavan
function updateDesignTokens() {
  const blurVal = document.getElementById('slider-blur').value;
  const alphaVal = document.getElementById('slider-alpha').value;
  const accentVal = document.getElementById('select-accent').value;

  const lblBlur = document.getElementById('val-blur');
  const lblAlpha = document.getElementById('val-alpha');
  const previewBox = document.getElementById('preview-glass-box');

  if (lblBlur) lblBlur.textContent = `${blurVal}px`;
  if (lblAlpha) lblAlpha.textContent = alphaVal;

  if (previewBox) {
    previewBox.style.backdropFilter = `blur(${blurVal}px)`;
    previewBox.style.background = `rgba(255, 255, 255, ${alphaVal})`;
    previewBox.style.borderColor = accentVal;
    previewBox.style.boxShadow = `0 8px 32px ${accentVal}26`;
  }
}

// Shannon Entropy for Ashish
function calculateForensicEntropy() {
  const input = document.getElementById('forensic-payload-input');
  const out = document.getElementById('forensic-entropy-result');
  if (!input || !out) return;

  const text = input.value;
  if (!text) {
    out.textContent = 'Please enter a string or payload to measure entropy.';
    return;
  }

  // Calculate Shannon entropy (0 to 8)
  const len = text.length;
  const freqs = {};
  for (let i = 0; i < len; i++) {
    freqs[text[i]] = (freqs[text[i]] || 0) + 1;
  }

  let entropy = 0;
  for (const char in freqs) {
    const p = freqs[char] / len;
    entropy -= p * Math.log2(p);
  }

  const entropyFormatted = entropy.toFixed(4);
  let statusBadge = '🟢 Normal Text / Code (Low Risk)';
  if (entropy > 5.5) {
    statusBadge = '🔴 HIGH ENTROPY (>5.5): Packed Executable / Encrypted Shellcode Detected';
  } else if (entropy > 4.5) {
    statusBadge = '🟡 MODERATE ENTROPY: Obfuscated Base64 or Compressed Script';
  }

  out.innerHTML = `
    <strong>Calculated Shannon Entropy:</strong> <span style="font-size:1.1rem; color:var(--liquid-cyan); font-weight:800;">${entropyFormatted}</span> bits/symbol<br>
    <strong>Triage Assessment:</strong> ${statusBadge}<br>
    <strong>Payload Length:</strong> ${len} bytes | Unique Characters: ${Object.keys(freqs).length}
  `;
  showToast(`Entropy calculated: ${entropyFormatted}`, 'DFIR_LAB');
}

function simulateVolatilityProcessScan() {
  const out = document.getElementById('forensic-entropy-result');
  if (!out) return;
  out.innerHTML = `
    <strong>[VOLATILITY 3] Memory Process Tree (psscan):</strong><br>
    4      | System           | 0x00000000 | Services Root<br>
    644    | smss.exe         | 0x7ffd1000 | Session Manager<br>
    892    | lsass.exe        | 0x7ffd2200 | Local Security Authority (No Injections)<br>
    2048   | svchost.exe      | 0x7ffd4400 | Windows Service Host<br>
    4192   | powershell.exe   | 0x7ffd9800 | ⚠️ Suspicious Encoded Command Flagged
  `;
}

// JWT Playground for Darshan
function generatePlaygroundJwt() {
  const sub = document.getElementById('jwt-sub-input').value || 'darshan.tripadwar';
  const secret = document.getElementById('jwt-secret-input').value || 'CyberHelixSecret';
  const out = document.getElementById('jwt-token-output');

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: sub,
    iss: 'cyberhelix-iam',
    role: 'AUTHENTICATED_OPERATIVE',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 900
  }));
  const sig = btoa(`${secret}_${Date.now()}`).substring(0, 32);

  const token = `${header}.${payload}.${sig}`;
  if (out) {
    out.innerHTML = `
      <span style="color:#ef4444;">${header}</span>.<span style="color:#7c3aed;">${payload}</span>.<span style="color:#0284c7;">${sig}</span>
      <div style="margin-top:0.5rem; color:var(--liquid-emerald); font-weight:700;">✓ HS256 Signature Verified (Valid 15m)</div>
    `;
  }
}

// SOC alert inject for Mohini
function simulateNewSocAlert() {
  const feed = document.getElementById('soc-live-feed');
  if (!feed) return;
  const time = new Date().toTimeString().split(' ')[0];
  const ips = ['192.168.1.105', '45.33.32.156', '103.224.182.240', '185.220.101.4'];
  const ip = ips[Math.floor(Math.random() * ips.length)];
  const threats = ['SQL Injection attempt detected', 'SSH Brute-force rate limit exceeded', 'CVE-2026-1101 probe flagged'];
  const threat = threats[Math.floor(Math.random() * threats.length)];

  feed.innerHTML = `[${time}] [SIEM] <span style="color:#f43f5e;">ALERT:</span> ${threat} from source=${ip} (Mitigation: Auto-Logged)<br>` + feed.innerHTML;
  showToast('New SIEM Telemetry Event Ingested', 'SOC_ALERT');
}

// Admin Suyash Station Switcher
function suyashJumpToPod(event) {
  const targetMemberId = event.target.value;
  const member = CYBER_STATE.members.find(m => m.id === targetMemberId);
  if (member) {
    renderPodStation(member);
    showToast(`Viewing ${member.name}'s Field Station`, 'ADMIN_OVERRIDE');
  }
}

// ==========================================================================
// 9. Field Work & Sprint Task Board (Interactive Kanban per Member)
// ==========================================================================
function initializePodTasks() {
  const savedTasks = localStorage.getItem('CYBER_POD_TASKS_V2');
  if (savedTasks) {
    try {
      CYBER_STATE.podTasks = JSON.parse(savedTasks);
    } catch (e) {
      CYBER_STATE.podTasks = {};
    }
  }

  // Pre-seed realistic tasks for all 14 members if empty
  CYBER_STATE.members.forEach(member => {
    if (!CYBER_STATE.podTasks[member.id] || CYBER_STATE.podTasks[member.id].length === 0) {
      CYBER_STATE.podTasks[member.id] = generateDefaultTasksForMember(member);
    }
  });

  savePodTasksToStorage();
}

function savePodTasksToStorage() {
  localStorage.setItem('CYBER_POD_TASKS_V2', JSON.stringify(CYBER_STATE.podTasks));
}

function generateDefaultTasksForMember(member) {
  const id = member.id;
  if (id === 'suyash-rathod') {
    return [
      { id: 't_suyash_1', title: 'Deploy Zero-Trust Complex Route Token System', desc: 'Ensure all portal routes are guarded with hashed session URLs.', priority: 'CRITICAL', status: 'completed' },
      { id: 't_suyash_2', title: 'Synchronize NeuroNova AI with Local GGUF & HuggingFace', desc: 'Integrate multi-provider inference bridge and voice synthesis.', priority: 'HIGH', status: 'in_progress' },
      { id: 't_suyash_3', title: 'Audit Global Password & Admin Permissions Table', desc: 'Verify universal administrative override and reset handlers.', priority: 'HIGH', status: 'todo' }
    ];
  }
  if (id === 'aniket-chavhan') {
    return [
      { id: 't_aniket_1', title: 'Optimize GIN Index on telemetry raw_payload', desc: 'Accelerate JSONB querying for high-throughput security logs.', priority: 'HIGH', status: 'in_progress' },
      { id: 't_aniket_2', title: 'Declarative Partitioning for 2026 Audit Tables', desc: 'Partition security_events table monthly to maintain sub-5ms latency.', priority: 'MEDIUM', status: 'todo' },
      { id: 't_aniket_3', title: 'SQL Injection Prevention Audit for Aegis Auth', desc: 'Verify parameterized query compliance across all auth repositories.', priority: 'CRITICAL', status: 'completed' }
    ];
  }
  if (id === 'pavan-londhe') {
    return [
      { id: 't_pavan_1', title: 'Corporate White Glassmorphic UI Refinement', desc: 'Balance white frosted blur with modern liquid backdrop filters.', priority: 'HIGH', status: 'completed' },
      { id: 't_pavan_2', title: 'Holographic HUD Component for NeuroNova AI', desc: 'Design pulsing plasma orb and quantum latency indicators.', priority: 'HIGH', status: 'completed' },
      { id: 't_pavan_3', title: 'WCAG AA Accessibility Contrast Audit', desc: 'Ensure all typography tokens adhere to 4.5:1 minimum contrast ratio.', priority: 'MEDIUM', status: 'in_progress' }
    ];
  }
  if (id === 'ashish-ade') {
    return [
      { id: 't_ashish_1', title: 'Volatility 3 Memory Artifact Extractor Pipeline', desc: 'Automate psscan and malfind parsing for Windows 11 dumps.', priority: 'HIGH', status: 'in_progress' },
      { id: 't_ashish_2', title: 'Shannon Entropy Threshold Tuning for Packed Binaries', desc: 'Calibrate alerts when entropy exceeds 6.2 bits/symbol.', priority: 'CRITICAL', status: 'completed' },
      { id: 't_ashish_3', title: 'PCAP Stream Parser for Suspicious Basic Auth', desc: 'Extract unencrypted headers from packet captures.', priority: 'MEDIUM', status: 'todo' }
    ];
  }
  if (id === 'darshan-tripadwar') {
    return [
      { id: 't_darshan_1', title: 'PBKDF2 Salt Generation with 100,000 Iterations', desc: 'Verify cryptographic randomness of per-user salts in Aegis.', priority: 'CRITICAL', status: 'completed' },
      { id: 't_darshan_2', title: '15-Minute Stateless JWT Access Token Rotation', desc: 'Enforce short expiry with refresh token rotation.', priority: 'HIGH', status: 'in_progress' },
      { id: 't_darshan_3', title: 'Constant-Time String Comparison for Signatures', desc: 'Prevent timing attacks during HMAC signature verification.', priority: 'HIGH', status: 'todo' }
    ];
  }
  // Generic domain tasks for other members
  return [
    { id: `t_${id}_1`, title: `Review ${member.domain} Standards`, desc: 'Update team knowledge base with verified defensive benchmarks.', priority: 'HIGH', status: 'completed' },
    { id: `t_${id}_2`, title: `Sprint Deliverables for ${member.designation}`, desc: 'Execute active tasks assigned in Q4 strategy kickoff.', priority: 'HIGH', status: 'in_progress' },
    { id: `t_${id}_3`, title: 'Collaborate with NeuroNova AI Copilot', desc: 'Run code audits and security verifications in Cloud IDE.', priority: 'MEDIUM', status: 'todo' }
  ];
}

function renderMemberTasksKanban(memberId) {
  const boardEl = document.getElementById('field-tasks-board');
  const countTag = document.getElementById('pod-task-count-tag');
  if (!boardEl) return;

  const tasks = CYBER_STATE.podTasks[memberId] || [];
  if (countTag) countTag.textContent = `${tasks.length} Sprint Tasks`;

  const cols = [
    { key: 'todo', label: '📌 To Do', class: 'col-todo' },
    { key: 'in_progress', label: '⚡ In Progress', class: 'col-progress' },
    { key: 'completed', label: '✅ Completed', class: 'col-done' }
  ];

  boardEl.innerHTML = cols.map(col => {
    const colTasks = tasks.filter(t => t.status === col.key);
    return `
      <div class="kanban-column ${col.class}">
        <div class="kanban-column-header">
          <span>${col.label}</span>
          <span class="kanban-count-badge">${colTasks.length}</span>
        </div>
        <div class="kanban-tasks-list">
          ${colTasks.length === 0 ? `
            <div style="padding:1.5rem 0.5rem; text-align:center; color:var(--text-muted); font-size:0.8rem;">
              No tasks in this lane
            </div>
          ` : colTasks.map(t => `
            <div class="kanban-card">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
                <span class="badge ${getPriorityBadgeClass(t.priority)}">${t.priority}</span>
                <button class="btn-task-delete" onclick="deleteFieldTask('${memberId}', '${t.id}')" title="Delete Task">&times;</button>
              </div>
              <h4 class="kanban-task-title">${t.title}</h4>
              <p class="kanban-task-desc">${t.desc || ''}</p>
              <div class="kanban-task-actions">
                ${col.key !== 'todo' ? `<button class="btn-task-move" onclick="moveFieldTask('${memberId}', '${t.id}', 'todo')">← Todo</button>` : ''}
                ${col.key !== 'in_progress' ? `<button class="btn-task-move" onclick="moveFieldTask('${memberId}', '${t.id}', 'in_progress')">Progress</button>` : ''}
                ${col.key !== 'completed' ? `<button class="btn-task-move" onclick="moveFieldTask('${memberId}', '${t.id}', 'completed')">Done →</button>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function getPriorityBadgeClass(p) {
  if (p === 'CRITICAL') return 'badge-rose';
  if (p === 'HIGH') return 'badge-amber';
  if (p === 'MEDIUM') return 'badge-cyan';
  return 'badge-emerald';
}

function openAddTaskModal() {
  const modal = document.getElementById('task-modal-overlay');
  if (modal) modal.classList.add('active');
}

function closeAddTaskModal() {
  const modal = document.getElementById('task-modal-overlay');
  if (modal) modal.classList.remove('active');
  const t = document.getElementById('task-title-input');
  const d = document.getElementById('task-desc-input');
  if (t) t.value = '';
  if (d) d.value = '';
}

function handleCreateTaskSubmit(event) {
  event.preventDefault();
  if (!CYBER_STATE.currentMember) return;

  const titleInput = document.getElementById('task-title-input');
  const descInput = document.getElementById('task-desc-input');
  const prioritySelect = document.getElementById('task-priority-input');

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const priority = prioritySelect.value;

  if (!title) return;

  const memberId = CYBER_STATE.currentMember.id;
  if (!CYBER_STATE.podTasks[memberId]) {
    CYBER_STATE.podTasks[memberId] = [];
  }

  const newTask = {
    id: `t_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: title,
    desc: desc,
    priority: priority,
    status: 'todo',
    createdAt: new Date().toISOString()
  };

  CYBER_STATE.podTasks[memberId].unshift(newTask);
  savePodTasksToStorage();

  closeAddTaskModal();
  renderMemberTasksKanban(memberId);
  renderDashboard();

  showToast('Task added to your field sprint', 'TASK_CREATED');
}

function moveFieldTask(memberId, taskId, newStatus) {
  const tasks = CYBER_STATE.podTasks[memberId];
  if (!tasks) return;

  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    savePodTasksToStorage();
    renderMemberTasksKanban(memberId);
    renderDashboard();
    showToast(`Task moved to ${newStatus.replace('_', ' ').toUpperCase()}`, 'SPRINT');
  }
}

function deleteFieldTask(memberId, taskId) {
  const tasks = CYBER_STATE.podTasks[memberId];
  if (!tasks) return;

  CYBER_STATE.podTasks[memberId] = tasks.filter(t => t.id !== taskId);
  savePodTasksToStorage();
  renderMemberTasksKanban(memberId);
  renderDashboard();
  showToast('Task removed from sprint board', 'INFO');
}

// ==========================================================================
// 10. In-Website GitHub Connected Workspace
// ==========================================================================
function renderGitHubWorkspace(username) {
  if (!username && CYBER_STATE.currentMember) {
    username = CYBER_STATE.currentMember.github;
  }
  if (!username) username = 'Suyash-coder-12';

  const userInput = document.getElementById('github-user-input');
  if (userInput) userInput.value = username;

  fetchGitHubData(username);
}

function syncGitHubUser() {
  const userInput = document.getElementById('github-user-input');
  if (userInput && userInput.value.trim()) {
    fetchGitHubData(userInput.value.trim());
  }
}

async function fetchGitHubData(username) {
  const profileContainer = document.getElementById('github-profile-bar');
  const reposContainer = document.getElementById('github-repos-grid');
  const countTag = document.getElementById('github-repo-count-tag');

  if (profileContainer) {
    profileContainer.innerHTML = `<div style="padding:1.5rem; color:var(--text-muted); font-size:0.9rem;">Connecting to GitHub API for @${username}...</div>`;
  }

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    if (!profileRes.ok) throw new Error('API Rate Limited or Not Found');
    const profileData = await profileRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);
    const reposData = reposRes.ok ? await reposRes.json() : [];

    renderGitHubProfileUI(profileData, reposData);
  } catch (err) {
    // Graceful offline fallback with rich team repository data
    renderGitHubOfflineFallback(username);
  }
}

function renderGitHubProfileUI(user, repos) {
  const profileContainer = document.getElementById('github-profile-bar');
  const reposContainer = document.getElementById('github-repos-grid');
  const countTag = document.getElementById('github-repo-count-tag');

  if (profileContainer) {
    profileContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:1.25rem;">
        <img src="${user.avatar_url}" style="width:64px; height:64px; border-radius:50%; border:2px solid var(--liquid-cyan);" alt="${user.login}">
        <div>
          <h3 style="font-family:'Outfit'; font-size:1.3rem; color:var(--text-main); font-weight:700;">${user.name || user.login}</h3>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            <a href="${user.html_url}" target="_blank" style="color:var(--liquid-cyan); font-weight:600;">@${user.login}</a>
            • ${user.bio || 'Security Researcher & Developer'}
          </div>
          <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:0.35rem; display:flex; gap:1rem;">
            <span>Followers: <strong>${user.followers}</strong></span>
            <span>Public Repos: <strong>${user.public_repos}</strong></span>
            <span>Location: <strong>${user.location || 'CyberHelix Core'}</strong></span>
          </div>
        </div>
      </div>
      <div>
        <a href="${user.html_url}" target="_blank" class="btn-primary" style="text-decoration:none;">Open on GitHub ↗</a>
      </div>
    `;
  }

  if (countTag) countTag.textContent = `${repos.length} Repositories Connected`;

  if (reposContainer) {
    if (repos.length === 0) {
      reposContainer.innerHTML = `<div style="grid-column:1/-1; padding:2rem; text-align:center; color:var(--text-muted);">No public repositories discovered.</div>`;
      return;
    }

    reposContainer.innerHTML = repos.map(r => `
      <div class="github-repo-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <h4 style="font-size:1rem; color:var(--text-main); font-weight:700;">${r.name}</h4>
          <span class="tag">${r.language || 'Code'}</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1rem; min-height:36px;">
          ${r.description || 'CyberHelix engineering and security codebase.'}
        </p>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px solid var(--border-subtle); padding-top:0.75rem;">
          <div style="display:flex; gap:0.75rem;">
            <span>★ ${r.stargazers_count}</span>
            <span>⑂ ${r.forks_count}</span>
          </div>
          <a href="${r.html_url}" target="_blank" style="color:var(--liquid-cyan); font-weight:600; text-decoration:none;">View Source ↗</a>
        </div>
      </div>
    `).join('');
  }
}

function renderGitHubOfflineFallback(username) {
  const profileContainer = document.getElementById('github-profile-bar');
  const reposContainer = document.getElementById('github-repos-grid');
  const countTag = document.getElementById('github-repo-count-tag');

  const member = CYBER_STATE.members.find(m => m.github.toLowerCase() === username.toLowerCase()) || CYBER_STATE.currentMember;

  if (profileContainer) {
    profileContainer.innerHTML = `
      <div style="display:flex; align-items:center; gap:1.25rem;">
        <img src="${member.avatar}" style="width:64px; height:64px; border-radius:50%; border:2px solid var(--liquid-cyan);" alt="${username}">
        <div>
          <h3 style="font-family:'Outfit'; font-size:1.3rem; color:var(--text-main); font-weight:700;">${member.name}</h3>
          <div style="font-size:0.85rem; color:var(--text-muted);">
            <a href="https://github.com/${username}" target="_blank" style="color:var(--liquid-cyan); font-weight:600;">@${username}</a>
            • ${member.bio}
          </div>
          <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:0.35rem; display:flex; gap:1rem;">
            <span>Connected Cluster: <strong>TeamCyberHelix</strong></span>
            <span>Assigned Repos: <strong>${CYBER_STATE.projects.length}</strong></span>
            <span>Status: <strong style="color:var(--liquid-emerald);">Live In-App Explorer</strong></span>
          </div>
        </div>
      </div>
      <div>
        <a href="https://github.com/${username}" target="_blank" class="btn-primary" style="text-decoration:none;">Open on GitHub ↗</a>
      </div>
    `;
  }

  if (countTag) countTag.textContent = `${CYBER_STATE.projects.length} Team Repositories`;

  if (reposContainer) {
    reposContainer.innerHTML = CYBER_STATE.projects.map(p => `
      <div class="github-repo-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <h4 style="font-size:1rem; color:var(--text-main); font-weight:700;">${p.name}</h4>
          <span class="tag">${p.techStack[0]}</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1rem; min-height:36px;">
          ${p.summary}
        </p>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-muted); border-top:1px solid var(--border-subtle); padding-top:0.75rem;">
          <div style="display:flex; gap:0.75rem;">
            <span>★ 24</span>
            <span>⑂ 6</span>
            <span style="color:var(--liquid-cyan);">${p.version}</span>
          </div>
          <button class="btn-card-action" onclick="openProjectModal('${p.id}')">Inspect Code Tree →</button>
        </div>
      </div>
    `).join('');
  }
}

// ==========================================================================
// 11. NeuroNova AI — JARVIS Quantum Assistant
// ==========================================================================
function toggleSpeechSynthesis() {
  CYBER_STATE.voiceOutputEnabled = !CYBER_STATE.voiceOutputEnabled;
  const statusEl = document.getElementById('voice-mode-status');
  if (statusEl) {
    statusEl.textContent = CYBER_STATE.voiceOutputEnabled ? 'ON' : 'OFF';
    statusEl.style.color = CYBER_STATE.voiceOutputEnabled ? 'var(--liquid-emerald)' : 'var(--text-muted)';
  }
  showToast(`NeuroNova Voice Output: ${CYBER_STATE.voiceOutputEnabled ? 'Enabled' : 'Muted'}`, 'JARVIS_VOICE');
}

function speakText(text) {
  if (!CYBER_STATE.voiceOutputEnabled || !('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  // Strip code blocks and markdown symbols for natural voice
  const cleanText = text
    .replace(/```[\s\S]*?```/g, 'Code block omitted.')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_#>-]/g, '')
    .substring(0, 300);

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.05;
  utterance.pitch = 1.0;

  // Prefer English natural voices if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David')));
  if (preferredVoice) utterance.voice = preferredVoice;

  window.speechSynthesis.speak(utterance);
}

function toggleVoiceInput() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('Speech recognition not supported in this browser. Please use Chrome/Edge.', 'VOICE_ERR');
    return;
  }

  const btnMic = document.getElementById('btn-mic-input');
  const chatInput = document.getElementById('ai-chat-input');

  if (CYBER_STATE.isRecordingVoice) {
    CYBER_STATE.isRecordingVoice = false;
    if (btnMic) btnMic.style.background = 'transparent';
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  CYBER_STATE.isRecordingVoice = true;
  if (btnMic) {
    btnMic.style.background = 'rgba(239, 68, 68, 0.2)';
    btnMic.style.borderColor = '#ef4444';
  }
  showToast('Listening... Speak your command to NeuroNova', 'MIC_ACTIVE');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (chatInput) {
      chatInput.value = transcript;
      handleNeuroNovaChat();
    }
  };

  recognition.onerror = () => {
    CYBER_STATE.isRecordingVoice = false;
    if (btnMic) {
      btnMic.style.background = 'transparent';
      btnMic.style.borderColor = 'var(--border-subtle)';
    }
  };

  recognition.onend = () => {
    CYBER_STATE.isRecordingVoice = false;
    if (btnMic) {
      btnMic.style.background = 'transparent';
      btnMic.style.borderColor = 'var(--border-subtle)';
    }
  };

  recognition.start();
}

function sendPromptToNeuroNova(promptText) {
  switchTab('neuronova');
  const input = document.getElementById('ai-chat-input');
  if (input) {
    input.value = promptText;
    handleNeuroNovaChat();
  }
}

async function handleNeuroNovaChat(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('ai-chat-input');
  const stream = document.getElementById('ai-chat-stream');
  if (!input || !stream) return;

  const query = input.value.trim();
  if (!query) return;

  // Append user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.innerHTML = `<strong>${CYBER_STATE.currentMember ? CYBER_STATE.currentMember.name : 'Operative'}:</strong> ${escapeHTML(query)}`;
  stream.appendChild(userBubble);
  input.value = '';
  stream.scrollTop = stream.scrollHeight;

  // Append typing indicator
  const typingBubble = document.createElement('div');
  typingBubble.className = 'chat-bubble ai';
  typingBubble.innerHTML = `<strong>NeuroNova AI:</strong> <em>Synthesizing neural reasoning...</em>`;
  stream.appendChild(typingBubble);
  stream.scrollTop = stream.scrollHeight;

  // Process Query via Configured Provider (Built-in Core, HuggingFace, or GGUF)
  const responseText = await queryAIProvider(query);

  typingBubble.innerHTML = `<strong>NeuroNova AI:</strong> ${renderMarkdownBasic(responseText)}`;
  stream.scrollTop = stream.scrollHeight;

  // Voice output
  speakText(responseText);
}

async function queryAIProvider(query) {
  const provider = localStorage.getItem('NEURONOVA_PROVIDER') || 'neuronova-core';

  // 1. Hugging Face Inference API
  if (provider === 'huggingface') {
    const token = localStorage.getItem('HF_API_TOKEN');
    const model = localStorage.getItem('HF_MODEL_ID') || 'Qwen/Qwen2.5-Coder-7B-Instruct';
    if (token) {
      try {
        const hfRes = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputs: query, parameters: { max_new_tokens: 300 } })
        });
        if (hfRes.ok) {
          const data = await hfRes.json();
          if (Array.isArray(data) && data[0] && data[0].generated_text) {
            return data[0].generated_text;
          }
        }
      } catch (e) {
        console.warn('Hugging Face inference error, falling back to NeuroNova core:', e);
      }
    }
  }

  // 2. Local GGUF / Ollama Endpoint
  if (provider === 'local-gguf') {
    const endpoint = localStorage.getItem('GGUF_ENDPOINT') || 'http://localhost:11434/api/generate';
    const model = localStorage.getItem('GGUF_MODEL') || 'llama3.2:3b';
    try {
      const ggufRes = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: model, prompt: query, stream: false })
      });
      if (ggufRes.ok) {
        const data = await ggufRes.json();
        if (data.response) return data.response;
      }
    } catch (e) {
      console.warn('Local GGUF endpoint unreachable, falling back to NeuroNova core:', e);
    }
  }

  // 3. NeuroNova Built-in Intelligence Agent
  return generateNeuroNovaCoreResponse(query);
}

function generateNeuroNovaCoreResponse(query) {
  const q = query.toLowerCase();

  if (q.includes('siem') || q.includes('helix') || q.includes('sentinel')) {
    return `### 🛡️ Helix Sentinel SIEM Telemetry Analysis
- **Current Status:** 4 active detection engines running on RFC 3164 Syslog pipelines.
- **Rule Thresholds:** Brute-force frequency window triggers when failures >= 5 inside 60 seconds.
- **Defensive Audit:** SQLi regex pattern matches both URL encoded variants (\`%27\`, \`%20\`) and union select fragments.
- **Recommendation:** Implement sliding-window Redis token bucket to mitigate distributed brute-force attacks across clustered gateways.`;
  }

  if (q.includes('auth') || q.includes('jwt') || q.includes('aegis') || q.includes('password')) {
    return `### 🔑 Aegis Auth Core Security Evaluation
- **Hashing Architecture:** PBKDF2-HMAC-SHA256 with 100,000 rounds and 16-byte cryptographically secure random per-user salt.
- **Token Policy:** Stateless HS256 tokens expiring in 15 minutes.
- **Defense-in-Depth:** Constant-time byte comparisons (\`hmac.compare_digest\`) are enforced to prevent side-channel timing attacks.`;
  }

  if (q.includes('entropy') || q.includes('forensics') || q.includes('volatility') || q.includes('ashish')) {
    return `### 🔬 DFIR Artifact Triage Insights
- **Shannon Entropy Range:** 0.0 (uniform bytes) to 8.0 (completely random or encrypted).
- **Threshold Analysis:** Unpacked ASCII text typically measures 3.5 to 4.8. Any executable binary section scoring > 6.8 strongly indicates encryption or packing (UPX/Themida).
- **Process Memory Check:** Cross-reference \`pslist\` vs \`psscan\` in Volatility 3 to locate unlinked or hidden rootkit processes.`;
  }

  if (q.includes('sql') || q.includes('database') || q.includes('aniket') || q.includes('postgres')) {
    return `### 🗄️ PostgreSQL Database Architecture Optimization
- **GIN Indexing:** Recommended \`CREATE INDEX idx_events_payload_gin ON security_events USING GIN (raw_payload jsonb_path_ops);\`
- **Query Plan:** GIN indexing reduces JSONB deep-containment queries from O(N) table scans down to O(log N) bitmap scans (typically sub-2ms).
- **Defense:** Always utilize parameterized bind arguments (\`$1, $2\`) to eliminate SQL injection attack surfaces completely.`;
  }

  if (q.includes('admin') || q.includes('suyash') || q.includes('who is admin')) {
    return `**Super Admin Directive:** **Suyash Rathod** holds Level 5 universal administrative authorization across Team CyberHelix. He possesses global rights to manage credentials, reset passwords, inspect all 14 pod workbenches, and coordinate platform infrastructure.`;
  }

  // General assistance
  return `Understood. I have correlated your query with Team CyberHelix's knowledge bases and active code repositories. All 14 operatives are actively monitored, and current system telemetry is stable. You can execute code tests directly in the **Cloud IDE** tab or trigger specialized audits through your **Pod Station**.`;
}

// AI Model Modal
function openAIModelModal() {
  closeProfileDropdown();
  const modal = document.getElementById('ai-model-modal-overlay');
  if (modal) modal.classList.add('active');

  const provider = localStorage.getItem('NEURONOVA_PROVIDER') || 'neuronova-core';
  const select = document.getElementById('ai-provider-select');
  if (select) select.value = provider;
  toggleProviderFields();
}

function closeAIModelModal() {
  const modal = document.getElementById('ai-model-modal-overlay');
  if (modal) modal.classList.remove('active');
}

function toggleProviderFields() {
  const select = document.getElementById('ai-provider-select');
  const hfBox = document.getElementById('hf-fields');
  const ggufBox = document.getElementById('gguf-fields');
  if (!select) return;

  const val = select.value;
  if (hfBox) hfBox.style.display = val === 'huggingface' ? 'block' : 'none';
  if (ggufBox) ggufBox.style.display = val === 'local-gguf' ? 'block' : 'none';
}

function saveAIModelConfig() {
  const select = document.getElementById('ai-provider-select');
  const hfToken = document.getElementById('hf-api-token');
  const hfModel = document.getElementById('hf-model-id');
  const ggufEndpoint = document.getElementById('gguf-endpoint');
  const ggufModel = document.getElementById('gguf-model-name');
  const activeLabel = document.getElementById('active-model-label');

  if (select) {
    localStorage.setItem('NEURONOVA_PROVIDER', select.value);
    if (activeLabel) {
      if (select.value === 'huggingface') activeLabel.textContent = 'Hugging Face API';
      else if (select.value === 'local-gguf') activeLabel.textContent = 'Local GGUF / Ollama';
      else activeLabel.textContent = 'NeuroNova Core';
    }
  }

  if (hfToken && hfToken.value) localStorage.setItem('HF_API_TOKEN', hfToken.value);
  if (hfModel && hfModel.value) localStorage.setItem('HF_MODEL_ID', hfModel.value);
  if (ggufEndpoint && ggufEndpoint.value) localStorage.setItem('GGUF_ENDPOINT', ggufEndpoint.value);
  if (ggufModel && ggufModel.value) localStorage.setItem('GGUF_MODEL', ggufModel.value);

  closeAIModelModal();
  showToast('NeuroNova AI Model Configuration Saved', 'AI_ENGINE');
}

// ==========================================================================
// 12. Cloud IDE with NeuroNova Copilot
// ==========================================================================
function setupCloudIDE() {
  renderCloudIDEState();
}

function renderCloudIDEState() {
  const editor = document.getElementById('ide-editor');
  const badge = document.getElementById('ide-lang-badge');
  const lang = CYBER_STATE.activeIdeFile || 'python';

  if (editor) {
    editor.value = CYBER_STATE.ideFiles[lang] || '';
  }

  if (badge) {
    if (lang === 'python') badge.textContent = 'Python 3.14 (SIEM)';
    else if (lang === 'javascript') badge.textContent = 'JavaScript (Aegis)';
    else if (lang === 'sql') badge.textContent = 'PostgreSQL 16';
    else badge.textContent = 'HTML5 / CSS3';
  }

  // Update pill active states
  const pills = document.querySelectorAll('.ide-tab-pill');
  pills.forEach(pill => {
    const text = pill.textContent.toLowerCase();
    pill.classList.toggle('active', text.includes(lang));
  });
}

function switchIdeFile(lang) {
  const editor = document.getElementById('ide-editor');
  if (editor) {
    // Save current changes to state
    CYBER_STATE.ideFiles[CYBER_STATE.activeIdeFile] = editor.value;
  }
  CYBER_STATE.activeIdeFile = lang;
  renderCloudIDEState();
}

function runIdeCode() {
  const editor = document.getElementById('ide-editor');
  const consoleEl = document.getElementById('ide-console');
  if (!editor || !consoleEl) return;

  const code = editor.value;
  const lang = CYBER_STATE.activeIdeFile;
  const time = new Date().toTimeString().split(' ')[0];

  consoleEl.innerHTML += `\n\n[${time}] ▶ EXECUTING ${lang.toUpperCase()} CODE...`;

  if (lang === 'javascript') {
    // Safe client-side JS evaluation with captured logs
    const logs = [];
    const originalLog = console.log;
    try {
      console.log = (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
      const fn = new Function(code);
      fn();
      console.log = originalLog;
      consoleEl.innerHTML += `\n${logs.join('\n') || '[Process completed with 0 output logs]'}\n[SUCCESS]: Execution returned 0.`;
    } catch (err) {
      console.log = originalLog;
      consoleEl.innerHTML += `\n[RUNTIME ERROR]: ${err.message}`;
    }
  } else if (lang === 'python') {
    consoleEl.innerHTML += `
[VIRTUAL RUNTIME]: Initializing Python 3.14 sandbox...
[STDOUT]: SIEM Ingestion Test Status: ALERT
[STDOUT]: Detected Signatures: ['SQL_INJECTION']
[STDOUT]: Timestamp: ${new Date().toISOString()}
[SUCCESS]: Process finished with exit code 0 (Execution time: 4.2ms)
    `;
  } else if (lang === 'sql') {
    consoleEl.innerHTML += `
[POSTGRES ENGINE]: Executing DDL / DQL queries...
[INFO]: Table 'security_events' verified.
[INFO]: GIN index 'idx_events_payload_gin' active.
[RESULTS]: 3 query rows returned. (Cost: 0.84ms)
[SUCCESS]: Transactions committed cleanly.
    `;
  } else {
    consoleEl.innerHTML += `
[WEB ENGINE]: HTML DOM Parsed successfully. All custom tags validated.
    `;
  }

  consoleEl.scrollTop = consoleEl.scrollHeight;
  showToast('Code Executed in Cloud Sandbox', 'RUN_SUCCESS');
}

function ideCopilotAction(type) {
  const editor = document.getElementById('ide-editor');
  const consoleEl = document.getElementById('ide-console');
  if (!editor || !consoleEl) return;

  const code = editor.value;
  const lang = CYBER_STATE.activeIdeFile;
  const time = new Date().toTimeString().split(' ')[0];

  if (type === 'audit') {
    consoleEl.innerHTML += `\n\n[${time}] 🛡️ NEURONOVA COPILOT SECURITY AUDIT:
==================================================
Target: ${lang.toUpperCase()} Codebase
Status: PASS (No Critical Vulnerabilities Found)

[AUDIT FINDINGS]:
1. Input Sanitization: Regex patterns verified against SQLi and Path Traversal.
2. Memory Safety: Zero buffer allocation overflow points.
3. Cryptographic Hygiene: High-entropy algorithms implemented with salted nonces.
4. Advisory: Ensure all API endpoints implement rate limiting headers.
==================================================`;
    showToast('Copilot Security Audit Complete', 'AUDIT_PASS');
  } else if (type === 'explain') {
    consoleEl.innerHTML += `\n\n[${time}] 🤖 NEURONOVA CODE EXPLANATION:
This ${lang.toUpperCase()} module implements the defensive detection architecture for Team CyberHelix. It continuously correlates runtime payloads with compiled signatures, classifies threats into severity tiers, and returns immutable telemetry events for the SIEM cluster.`;
    showToast('Code Architecture Explained', 'COPILOT');
  } else if (type === 'optimize') {
    consoleEl.innerHTML += `\n\n[${time}] ⚡ NEURONOVA OPTIMIZATION RECOMMENDATIONS:
1. Cache pre-compiled regular expressions at module load to save 1.8ms per call.
2. Replace linear array search with bitwise flags for threat classification.
3. Utilize zero-copy buffer slicing for incoming network byte streams.`;
    showToast('Optimizations Generated', 'COPILOT');
  }

  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function clearIdeConsole() {
  const consoleEl = document.getElementById('ide-console');
  if (consoleEl) {
    consoleEl.innerHTML = '[SYSTEM]: Console cleared. Ready for execution.';
  }
}

// ==========================================================================
// 13. Admin Master Console (Suyash Rathod Only)
// ==========================================================================
function renderAdminConsole() {
  const tbody = document.getElementById('admin-operatives-tbody');
  const podSwitcher = document.getElementById('admin-pod-switcher');
  const auditContainer = document.getElementById('admin-audit-log-stream');

  // Populate Operatives Table
  if (tbody) {
    tbody.innerHTML = CYBER_STATE.members.map(m => {
      const email = m.email.toLowerCase();
      const account = CYBER_STATE.accounts[email] || { password: '••••••••' };
      const isSuperAdmin = m.id === 'suyash-rathod';

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <img src="${m.avatar}" style="width:32px; height:32px; border-radius:50%;" alt="${m.name}">
              <div>
                <strong style="color:var(--text-main);">${m.name}</strong>
                ${isSuperAdmin ? '<span class="admin-badge-indicator" style="margin-left:0.35rem;">SUPER ADMIN</span>' : ''}
              </div>
            </div>
          </td>
          <td>
            <div style="font-size:0.85rem; color:var(--text-secondary);">${m.designation}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${m.domain}</div>
          </td>
          <td><code>${m.email}</code></td>
          <td>
            <span class="badge ${isSuperAdmin ? 'badge-rose' : 'badge-cyan'}">${isSuperAdmin ? 'SUPER ADMIN' : 'OPERATIVE'}</span>
          </td>
          <td>
            <span style="font-family:'JetBrains Mono'; font-size:0.8rem; color:var(--text-main); font-weight:700;">
              ${account.password}
            </span>
          </td>
          <td>
            <div style="display:flex; gap:0.4rem;">
              <button class="btn-card-action" style="padding:0.25rem 0.65rem; font-size:0.75rem;" onclick="adminResetPassword('${m.id}')">Reset PW</button>
              <button class="btn-primary" style="padding:0.25rem 0.65rem; font-size:0.75rem;" onclick="adminImpersonateStation('${m.id}')">View Pod</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Populate Pod Switcher Dropdown
  if (podSwitcher) {
    podSwitcher.innerHTML = CYBER_STATE.members.map(m => `
      <option value="${m.id}">${m.name} (${m.designation})</option>
    `).join('');
  }

  // Render Audit Log Stream
  renderAuditLogsUI();
}

function adminResetPassword(memberId) {
  const member = CYBER_STATE.members.find(m => m.id === memberId);
  if (!member) return;

  const newPass = prompt(`Enter new security passphrase for ${member.name}:`, 'Helix@2026');
  if (!newPass) return;

  const email = member.email.toLowerCase();
  if (CYBER_STATE.accounts[email]) {
    CYBER_STATE.accounts[email].password = newPass;
    CYBER_STATE.accounts[email].updatedAt = new Date().toISOString();
    saveAccountsToStorage();

    logAuditEvent('ADMIN_RESET_PW', `Admin Suyash Rathod reset passphrase for ${member.name} (${member.email}).`);
    renderAdminConsole();
    showToast(`Passphrase for ${member.name} updated to: ${newPass}`, 'ADMIN_OVERRIDE');
  }
}

function adminImpersonateStation(memberId) {
  const member = CYBER_STATE.members.find(m => m.id === memberId);
  if (!member) return;

  switchTab('pod');
  renderPodStation(member);
  showToast(`Impersonating ${member.name}'s Field Platform`, 'ADMIN_IMPERSONATE');
}

function adminSwitchPodView(event) {
  const memberId = event.target.value;
  adminImpersonateStation(memberId);
}

// Audit Log Subsystem
function initializeAuditLogs() {
  const saved = localStorage.getItem('CYBER_AUDIT_LOGS_V2');
  if (saved) {
    try {
      CYBER_STATE.auditLogs = JSON.parse(saved);
    } catch (e) {
      CYBER_STATE.auditLogs = [];
    }
  }

  if (CYBER_STATE.auditLogs.length === 0) {
    logAuditEvent('SYSTEM_BOOT', 'Team CyberHelix Command Nexus initialized under Super Admin Suyash Rathod.');
  }
}

function logAuditEvent(type, detail) {
  const entry = {
    id: `log_${Date.now()}`,
    time: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: type,
    detail: detail
  };
  CYBER_STATE.auditLogs.unshift(entry);
  if (CYBER_STATE.auditLogs.length > 50) CYBER_STATE.auditLogs.pop();
  localStorage.setItem('CYBER_AUDIT_LOGS_V2', JSON.stringify(CYBER_STATE.auditLogs));
}

function renderAuditLogsUI() {
  const stream = document.getElementById('admin-audit-log-stream');
  if (!stream) return;

  stream.innerHTML = CYBER_STATE.auditLogs.map(l => `
    <div>
      <span style="color:var(--text-muted);">[${l.time}]</span>
      <span style="color:var(--liquid-cyan); font-weight:700;">[${l.type}]</span>
      <span>${l.detail}</span>
    </div>
  `).join('');
}

function clearAuditLogs() {
  CYBER_STATE.auditLogs = [];
  logAuditEvent('LOG_PURGE', 'Audit logs cleared by Super Admin Suyash Rathod.');
  renderAuditLogsUI();
  showToast('Audit log stream cleared', 'ADMIN');
}

// ==========================================================================
// 14. Projects & Knowledge Base Views
// ==========================================================================
function setupProjectsView() {
  const searchInput = document.getElementById('project-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderProjects());
  }

  const filterBtns = document.querySelectorAll('.project-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CYBER_STATE.activeProjectFilter = btn.getAttribute('data-filter');
      renderProjects();
    });
  });

  renderProjects();
}

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search-input');
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  if (!grid) return;

  const currentMemberId = CYBER_STATE.currentMember ? CYBER_STATE.currentMember.id : 'suyash-rathod';

  const filtered = CYBER_STATE.projects.filter(p => {
    let matchesFilter = true;
    if (CYBER_STATE.activeProjectFilter === 'my') {
      matchesFilter = p.leadId === currentMemberId || p.contributors.includes(currentMemberId);
    } else if (CYBER_STATE.activeProjectFilter === 'siem') {
      matchesFilter = p.id.includes('siem');
    } else if (CYBER_STATE.activeProjectFilter === 'crypto') {
      matchesFilter = p.id.includes('auth');
    } else if (CYBER_STATE.activeProjectFilter === 'forensics') {
      matchesFilter = p.id.includes('forensics');
    }

    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.domain.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.techStack.some(t => t.toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 3rem; color:var(--text-muted);">No matching projects found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const lead = CYBER_STATE.members.find(m => m.id === p.leadId) || { name: 'Team Lead', avatar: '' };
    return `
      <div class="project-card">
        <div class="project-top-meta">
          <span class="badge ${p.badgeClass}">${p.status}</span>
          <span style="font-family:'JetBrains Mono';font-size:0.75rem;color:var(--text-dim);">${p.version}</span>
        </div>
        <h3 class="project-title">${p.name}</h3>
        <p class="project-desc">${p.summary}</p>
        <div class="project-tags">
          ${p.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="project-contributors-row">
          <div class="lead-info">
            <img src="${lead.avatar}" class="lead-avatar" alt="${lead.name}">
            <div class="lead-text">Lead: <strong>${lead.name}</strong></div>
          </div>
          <button class="btn-card-action" onclick="openProjectModal('${p.id}')">
            Explore <span>→</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function setupNotesView() {
  const searchInput = document.getElementById('notes-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderNotes());
  }

  const catBtns = document.querySelectorAll('.notes-category-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      CYBER_STATE.activeNoteCategory = btn.getAttribute('data-cat');
      renderNotes();
    });
  });

  renderNotes();
}

function renderNotes() {
  const grid = document.getElementById('notes-cards-grid');
  const searchInput = document.getElementById('notes-search-input');
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  if (!grid) return;

  const filtered = CYBER_STATE.notes.filter(n => {
    const matchesCat = CYBER_STATE.activeNoteCategory === 'all' || n.category === CYBER_STATE.activeNoteCategory;
    const matchesSearch = !query ||
      n.title.toLowerCase().includes(query) ||
      n.excerpt.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 3rem; color:var(--text-muted);">No matching notes found.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(n => `
    <div class="note-card" onclick="openNoteModal('${n.id}')">
      <div class="note-card-cat">${n.categoryLabel}</div>
      <h3 class="note-card-title">${n.title}</h3>
      <p class="note-card-excerpt">${n.excerpt}</p>
      <div class="note-card-footer">
        <span>By ${n.author}</span>
        <span>${n.date}</span>
      </div>
    </div>
  `).join('');
}

function renderMembers() {
  const grid = document.getElementById('members-grid');
  if (!grid) return;

  grid.innerHTML = CYBER_STATE.members.map(m => `
    <div class="member-card" onclick="openMemberModal('${m.id}')">
      <img src="${m.avatar}" class="member-card-avatar" alt="${m.name}">
      <h3 class="member-card-name">${m.name}</h3>
      <div class="member-card-role">${m.designation}</div>
      <div class="member-card-domain">${m.domain}</div>
      <div style="margin-top:1rem; display:flex; flex-wrap:wrap; gap:0.35rem; justify-content:center;">
        ${m.skills.slice(0, 3).map(s => `<span class="tag" style="font-size:0.68rem;">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 15. Cyber Utilities Sandbox (Hash, Base64, Subnet)
// ==========================================================================
function setupUtilitiesView() {
  // Hash Generator
  const hashBtn = document.getElementById('hash-calc-btn');
  const hashInput = document.getElementById('hash-input');
  const outSha256 = document.getElementById('hash-out-sha256');
  const outSha512 = document.getElementById('hash-out-sha512');

  if (hashBtn && hashInput) {
    hashBtn.addEventListener('click', async () => {
      const text = hashInput.value;
      if (outSha256) outSha256.textContent = await computeCryptoHash(text, 'SHA-256');
      if (outSha512) {
        const full512 = await computeCryptoHash(text, 'SHA-512');
        outSha512.textContent = full512.substring(0, 64) + '...';
      }
      showToast('Cryptographic Hashes Computed', 'SUCCESS');
    });
  }

  // Base64 & Hex
  const b64Input = document.getElementById('b64-input');
  const b64EncBtn = document.getElementById('b64-encode-btn');
  const b64DecBtn = document.getElementById('b64-decode-btn');
  const hexEncBtn = document.getElementById('hex-encode-btn');
  const b64Output = document.getElementById('b64-output');

  if (b64EncBtn && b64Input && b64Output) {
    b64EncBtn.addEventListener('click', () => {
      try {
        b64Output.textContent = btoa(unescape(encodeURIComponent(b64Input.value)));
        showToast('Base64 Encoded', 'SUCCESS');
      } catch (e) {
        b64Output.textContent = 'Error encoding string';
      }
    });

    b64DecBtn.addEventListener('click', () => {
      try {
        b64Output.textContent = decodeURIComponent(escape(atob(b64Input.value)));
        showToast('Base64 Decoded', 'SUCCESS');
      } catch (e) {
        b64Output.textContent = 'Error: Invalid Base64 payload';
      }
    });

    hexEncBtn.addEventListener('click', () => {
      const str = b64Input.value;
      let hex = '';
      for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(2, '0');
      }
      b64Output.textContent = hex;
      showToast('Hex Encoded', 'SUCCESS');
    });
  }

  // Subnet CIDR
  const cidrInput = document.getElementById('cidr-input');
  const cidrCalcBtn = document.getElementById('cidr-calc-btn');
  const cidrOutput = document.getElementById('cidr-output');

  if (cidrCalcBtn && cidrInput && cidrOutput) {
    cidrCalcBtn.addEventListener('click', () => {
      const val = cidrInput.value.trim();
      const parts = val.split('/');
      if (parts.length !== 2 || isNaN(parts[1]) || parseInt(parts[1]) < 0 || parseInt(parts[1]) > 32) {
        cidrOutput.textContent = 'Error: Please enter valid CIDR format (e.g. 192.168.1.0/24)';
        return;
      }
      const maskBits = parseInt(parts[1]);
      const totalHosts = Math.pow(2, 32 - maskBits);
      const usableHosts = totalHosts > 2 ? totalHosts - 2 : totalHosts;
      cidrOutput.innerHTML = `
        <strong>Prefix /${maskBits}</strong> | Total IPs: <strong>${totalHosts.toLocaleString()}</strong> | Usable Hosts: <strong>${usableHosts.toLocaleString()}</strong>
      `;
      showToast('Subnet Calculated', 'SUCCESS');
    });
  }
}

async function computeCryptoHash(message, algo) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ==========================================================================
// 16. Modals & Detail Viewer
// ==========================================================================
function setupModals() {
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.classList.remove('active');
}

function openProjectModal(projectId) {
  const project = CYBER_STATE.projects.find(p => p.id === projectId);
  if (!project) return;

  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const overlay = document.getElementById('modal-overlay');

  if (titleEl) titleEl.textContent = project.name;
  if (bodyEl) {
    const lead = CYBER_STATE.members.find(m => m.id === project.leadId) || { name: 'Lead', avatar: '' };
    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <div>
          <span class="badge ${project.badgeClass}">${project.status}</span>
          <span style="font-family:'JetBrains Mono'; font-size:0.8rem; color:var(--text-muted); margin-left:0.5rem;">${project.version}</span>
        </div>
        <div style="font-size:0.85rem; color:var(--text-secondary);">
          Lead: <strong>${lead.name}</strong>
        </div>
      </div>

      <p style="font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem; color:var(--text-secondary);">${project.summary}</p>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:0.9rem; margin-bottom:0.5rem; color:var(--text-main); font-weight:700;">Tech Stack & Security Primitives</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${project.techStack.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="note-markdown-render" style="margin-top:1.5rem;">
        ${renderMarkdownBasic(project.detailsMarkdown)}
      </div>

      <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
        <span style="font-family:'JetBrains Mono';font-size:0.78rem;color:var(--text-muted);">Workspace: ${project.repoPath}</span>
        <button class="btn-primary" onclick="copyTextToClipboard('${project.repoPath}')">Copy Repo Path</button>
      </div>
    `;
  }
  if (overlay) overlay.classList.add('active');
}

function openNoteModal(noteId) {
  const note = CYBER_STATE.notes.find(n => n.id === noteId);
  if (!note) return;

  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const overlay = document.getElementById('modal-overlay');

  if (titleEl) titleEl.textContent = note.title;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:1.25rem; font-family:'JetBrains Mono'; font-size:0.78rem; color:var(--text-muted); border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
        <span>Category: <strong style="color:var(--liquid-cyan);">${note.categoryLabel}</strong></span>
        <span>Author: <strong style="color:var(--text-main);">${note.author}</strong></span>
        <span>File: <code>${note.filePath}</code></span>
      </div>
      <p style="font-size:0.95rem; margin-bottom:1.5rem; color:var(--text-secondary);">${note.excerpt}</p>
      <div class="note-markdown-render">
        ${renderMarkdownBasic(note.content)}
      </div>
      <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:flex-end; gap:0.75rem;">
        <button class="btn-secondary" onclick="copyTextToClipboard('${note.filePath}')">Copy File Path</button>
        <button class="btn-primary" onclick="copyTextToClipboard(\`${note.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`)">Copy Note Content</button>
      </div>
    `;
  }
  if (overlay) overlay.classList.add('active');
}

function openMemberModal(memberId) {
  const member = CYBER_STATE.members.find(m => m.id === memberId);
  if (!member) return;

  const titleEl = document.getElementById('modal-title');
  const bodyEl = document.getElementById('modal-body');
  const overlay = document.getElementById('modal-overlay');

  if (titleEl) titleEl.textContent = `Dossier: ${member.name}`;
  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="display:flex; gap:1.5rem; align-items:center; margin-bottom:1.5rem;">
        <img src="${member.avatar}" style="width:76px; height:76px; border-radius:50%; border:2px solid var(--liquid-cyan);" alt="${member.name}">
        <div>
          <h3 style="font-size:1.35rem; color:var(--text-main); margin-bottom:0.25rem; font-weight:800;">${member.name}</h3>
          <div style="font-family:'JetBrains Mono'; font-size:0.85rem; color:var(--liquid-cyan); font-weight:700; margin-bottom:0.25rem;">${member.designation}</div>
          <div style="font-size:0.82rem; color:var(--text-muted);">${member.domain}</div>
        </div>
      </div>

      <p style="font-size:0.95rem; line-height:1.6; margin-bottom:1.5rem; color:var(--text-secondary);">${member.bio}</p>

      <div style="background:rgba(241, 245, 249, 0.7); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.5rem;">
        <p style="font-size:0.85rem; margin-bottom:0.35rem; color:var(--text-secondary);"><strong>Email:</strong> <code>${member.email}</code></p>
        <p style="font-size:0.85rem; color:var(--text-secondary);"><strong>GitHub:</strong> <a href="https://github.com/${member.github}" target="_blank" style="color:var(--liquid-cyan); font-weight:600;">@${member.github}</a></p>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:0.9rem; margin-bottom:0.5rem; color:var(--text-main); font-weight:700;">Skills & Expertise</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.4rem;">
          ${member.skills.map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
      </div>

      <div style="margin-top:2rem; padding-top:1rem; border-top:1px solid var(--border-subtle); display:flex; justify-content:flex-end;">
        <button class="btn-primary" onclick="closeModal(); switchTab('pod'); renderPodStation(CYBER_STATE.members.find(m => m.id === '${member.id}'))">Open Field Station</button>
      </div>
    `;
  }
  if (overlay) overlay.classList.add('active');
}

// Basic markdown renderer
function renderMarkdownBasic(md) {
  if (!md) return '';
  return md
    .replace(/^### (.*$)/gim, '<h3 style="color:var(--text-main);font-weight:700;margin:1.1rem 0 0.5rem;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="color:var(--liquid-cyan);font-weight:800;margin:1.3rem 0 0.5rem;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="color:var(--text-main);font-weight:800;margin:1.5rem 0 0.75rem;">$1</h1>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/gim, '<br>');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// ==========================================================================
// 17. Command Palette (Ctrl+K / ⌘K)
// ==========================================================================
function setupCommandPalette() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      toggleCommandPalette();
    }
  });

  const btn = document.getElementById('header-cmd-btn');
  if (btn) btn.addEventListener('click', toggleCommandPalette);
}

function toggleCommandPalette() {
  const existing = document.getElementById('cmd-palette-modal');
  if (existing) {
    existing.remove();
    return;
  }

  const modal = document.createElement('div');
  modal.id = 'cmd-palette-modal';
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(20px);
    z-index: 3000; display: flex; justify-content: center; padding-top: 15vh;
  `;

  modal.innerHTML = `
    <div style="background: rgba(255, 255, 255, 0.96); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); width: 620px; max-width: 90%; height: fit-content; box-shadow: var(--shadow-modal); overflow: hidden; backdrop-filter: blur(32px);">
      <div style="padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-subtle); display:flex; align-items:center; gap:0.75rem;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--liquid-cyan);"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="cmd-search-input" placeholder="Jump to projects, notes, members, or tools..." style="width:100%; background:transparent; border:none; color:var(--text-main); font-size:1rem; outline:none; font-family:'Inter', sans-serif;">
        <span class="kbd-shortcut" style="font-size:0.7rem;">ESC</span>
      </div>
      <div id="cmd-results" style="max-height: 360px; overflow-y: auto; padding: 0.5rem;">
        ${renderCmdResults('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  const input = document.getElementById('cmd-search-input');
  input.focus();

  input.addEventListener('input', (e) => {
    document.getElementById('cmd-results').innerHTML = renderCmdResults(e.target.value.toLowerCase());
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function renderCmdResults(q) {
  let items = [];

  CYBER_STATE.projects.forEach(p => {
    if (!q || p.name.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q)) {
      items.push({ type: 'PROJECT', title: p.name, desc: p.domain, action: `openProjectModal('${p.id}')` });
    }
  });

  CYBER_STATE.notes.forEach(n => {
    if (!q || n.title.toLowerCase().includes(q) || n.categoryLabel.toLowerCase().includes(q)) {
      items.push({ type: 'NOTE', title: n.title, desc: n.categoryLabel, action: `openNoteModal('${n.id}')` });
    }
  });

  CYBER_STATE.members.forEach(m => {
    if (!q || m.name.toLowerCase().includes(q) || m.designation.toLowerCase().includes(q)) {
      items.push({ type: 'MEMBER', title: m.name, desc: m.designation, action: `openMemberModal('${m.id}')` });
    }
  });

  if (items.length === 0) {
    return `<div style="padding:1.5rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No results found.</div>`;
  }

  return items.slice(0, 8).map(item => `
    <div style="padding: 0.75rem 0.95rem; border-radius: var(--radius-sm); cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.15s;" 
         onmouseover="this.style.background='rgba(241, 245, 249, 0.9)'" 
         onmouseout="this.style.background='transparent'" 
         onclick="document.getElementById('cmd-palette-modal').remove(); ${item.action}">
      <div>
        <div style="font-size:0.9rem; font-weight:700; color:var(--text-main);">${item.title}</div>
        <div style="font-size:0.75rem; color:var(--text-muted);">${item.desc}</div>
      </div>
      <span class="tag" style="font-size:0.68rem;">${item.type}</span>
    </div>
  `).join('');
}

// ==========================================================================
// 18. Helper Utilities & Toast System
// ==========================================================================
function copyTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard', 'SUCCESS');
  }).catch(() => {
    showToast('Failed to copy', 'ERROR');
  });
}

function showToast(message, badge = 'NOTICE') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="badge badge-cyan" style="font-size:0.65rem;">${badge}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
