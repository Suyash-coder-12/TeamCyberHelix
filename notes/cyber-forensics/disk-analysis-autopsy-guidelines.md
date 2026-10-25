# Autopsy Disk Forensics & Evidence Preservation
**Author:** Ashish Ade & Shivani Balpande | **Category:** Digital Forensics

---

## ⚖️ Chain of Custody & Evidence Ingestion
1. **Hash Verification:** Always compute SHA-256 and MD5 hashes of original image media immediately upon acquisition.
   ```bash
   sha256sum evidence_drive.e01 > evidence_hash.txt
   ```
2. **Read-Only Mounting:** Mount image only in write-blocked or read-only loop mode.
3. **Autopsy Ingest Modules:**
   - Recent Activity (browser history, USB artifacts, user downloads).
   - Hash Lookup (NSRL known-good filter vs. known-bad IOC lists).
   - Keyword Search (Regex patterns for credit card numbers, passwords, SSH keys).
   - Email Parser & Extract Archives.

---

## 🗄️ Master File Table (MFT) Analysis
- `$MFT` contains metadata for every file on an NTFS volume.
- Inspect `$STANDARD_INFORMATION` vs `$FILE_NAME` timestamps to detect timestomping.
