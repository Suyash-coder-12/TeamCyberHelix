# Database Schema Design & Indexing Optimization
**Author:** Aniket Chavhan | **Category:** Database Engineering

---

## ⚡ Indexing Guidelines (PostgreSQL)

### 1. B-Tree Indexes
Default for equality and range queries (`=`, `<`, `<=`, `>`, `>=`).
```sql
CREATE INDEX idx_logs_timestamp_severity ON security_logs (timestamp DESC, severity);
```

### 2. GIN (Generalized Inverted Index) for JSONB & Full-Text Search
Ideal for searching semi-structured telemetry data.
```sql
CREATE INDEX idx_logs_payload_gin ON security_logs USING GIN (raw_payload jsonb_path_ops);
```

### 3. Partial Indexes
Reduce index disk footprint by indexing only actionable rows.
```sql
CREATE INDEX idx_active_threat_alerts ON security_alerts (created_at) WHERE resolved = FALSE;
```

---

## 🗄️ Partitioning Strategy
For high-volume telemetry tables exceeding 10M rows/month, use PostgreSQL declarative table partitioning by range (monthly partitions) to allow instantaneous drop of obsolete data partitions.
