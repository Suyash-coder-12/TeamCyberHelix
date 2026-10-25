"""
Darknet Recon Crawler - CVE Intelligence Watcher
Parses and triages CVE feeds and generates security alert briefs.
Author: Team CyberHelix (Vasundhara Thakre & Manish Wagh)
"""

from typing import List, Dict, Any

class CVETracker:
    def __init__(self, min_cvss: float = 7.5):
        self.min_cvss = min_cvss

    def filter_critical_cves(self, cve_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Filter incoming CVE records by minimum CVSS score threshold."""
        results = []
        for item in cve_records:
            cvss = item.get("cvss", 0.0)
            if cvss >= self.min_cvss:
                results.append(item)
        return sorted(results, key=lambda x: x.get("cvss", 0.0), reverse=True)

    def generate_markdown_brief(self, cve_records: List[Dict[str, Any]]) -> str:
        """Render a formatted markdown security advisory for team notifications."""
        critical = self.filter_critical_cves(cve_records)
        lines = [
            "# ⚠️ Team CyberHelix - Vulnerability Advisory Brief",
            f"**Total High/Critical Findings:** {len(critical)}",
            "",
            "| CVE ID | CVSS | Affected Component | Summary |",
            "| :--- | :--- | :--- | :--- |"
        ]
        for cve in critical:
            lines.append(
                f"| `{cve.get('id', 'N/A')}` | **{cve.get('cvss', 0.0)}** | {cve.get('component', 'General')} | {cve.get('summary', '')} |"
            )
        return "\n".join(lines)
