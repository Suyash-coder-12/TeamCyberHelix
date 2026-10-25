import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { PodTask, TaskStatus, TaskPriority } from '../types';
import { INITIAL_TASKS } from '../data/seedData';
import { 
  Database, 
  Sliders, 
  ShieldCheck, 
  Search, 
  Cpu, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Trash2, 
  Play, 
  RefreshCw, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PodStationView: React.FC = () => {
  const { currentOperative, addAuditLog } = useAuth();
  const [tasks, setTasks] = useState<PodTask[]>(INITIAL_TASKS);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriority>('P1');
  const [newTaskTag, setNewTaskTag] = useState('');

  // 1. Interactive States for Aniket's SQL Studio
  const [sqlQuery, setSqlQuery] = useState(`SELECT \n  event_type,\n  source_ip,\n  severity,\n  threat_score,\n  detected_at\nFROM siem_threat_events\nWHERE severity = 'HIGH'\nORDER BY threat_score DESC\nLIMIT 10;`);
  const [queryResults, setQueryResults] = useState<any[] | null>(null);
  const [queryLatency, setQueryLatency] = useState<number | null>(null);
  const [isQueryRunning, setIsQueryRunning] = useState(false);

  // 2. Interactive States for Pavan's Design Studio
  const [glassBlur, setGlassBlur] = useState(20);
  const [borderRadius, setBorderRadius] = useState(16);
  const [glowIntensity, setGlowIntensity] = useState(25);

  // 3. Interactive States for Ashish's Entropy Forensics
  const [entropyInput, setEntropyInput] = useState('4d5a90000300000004000000ffff0000b8000000000000004000000000000000');
  const [entropyScore, setEntropyScore] = useState<number | null>(null);
  const [entropyVerdict, setEntropyVerdict] = useState<string | null>(null);

  // 4. Interactive States for Darshan's Auth JWT Lab
  const [jwtSecret, setJwtSecret] = useState('cyberhelix-aegis-supersecret-2026');
  const [jwtPayloadUser, setJwtPayloadUser] = useState(currentOperative?.email || 'darshan.tripadwar@cyberhelix.io');
  const [generatedJwt, setGeneratedJwt] = useState<string | null>(null);

  if (!currentOperative) return null;

  // Handlers for Kanban
  const operativeTasks = tasks.filter(t => t.operativeId === currentOperative.id);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: PodTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle.trim(),
      operativeId: currentOperative.id,
      status: 'todo',
      priority: newTaskPriority,
      tag: newTaskTag.trim() || currentOperative.domain.split('&')[0].trim(),
      createdAt: '2026-10-25'
    };

    setTasks(prev => [task, ...prev]);
    addAuditLog('SPRINT_TASK_CREATED', task.title, 'INFO');
    setNewTaskTitle('');
    setNewTaskTag('');
    setShowAddTaskModal(false);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    addAuditLog('SPRINT_TASK_STATUS_UPDATED', `Task ${taskId} -> ${newStatus}`, 'INFO');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addAuditLog('SPRINT_TASK_DELETED', taskId, 'INFO');
  };

  // Aniket's SQL Execution Runner
  const handleExecuteSql = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setIsQueryRunning(false);
      setQueryLatency(Number((Math.random() * 2 + 0.8).toFixed(2)));
      setQueryResults([
        { event_type: 'SSH_BRUTE_FORCE', source_ip: '192.168.1.104', severity: 'HIGH', threat_score: 94, detected_at: '16:22:10 IST' },
        { event_type: 'SQLI_UNION_PROBE', source_ip: '45.33.32.156', severity: 'HIGH', threat_score: 89, detected_at: '16:21:44 IST' },
        { event_type: 'PORT_SWEEP_XMAS', source_ip: '185.220.101.5', severity: 'HIGH', threat_score: 82, detected_at: '16:19:12 IST' },
        { event_type: 'PRIV_ESC_ATTEMPT', source_ip: '10.0.12.44', severity: 'HIGH', threat_score: 91, detected_at: '16:15:30 IST' }
      ]);
      addAuditLog('DATABASE_QUERY_EXEC', `Scanned siem_threat_events (4 rows)`, 'SUCCESS');
    }, 450);
  };

  // Ashish's Real Shannon Entropy Calculator
  const handleCalculateEntropy = () => {
    if (!entropyInput) return;
    const len = entropyInput.length;
    const freq: Record<string, number> = {};
    for (let i = 0; i < len; i++) {
      const char = entropyInput[i];
      freq[char] = (freq[char] || 0) + 1;
    }
    let entropy = 0;
    for (const char in freq) {
      const p = freq[char] / len;
      entropy -= p * Math.log2(p);
    }
    const score = Number(entropy.toFixed(3));
    setEntropyScore(score);

    if (score > 6.8) {
      setEntropyVerdict('CRITICAL: High Shannon Entropy (>6.8). Packed binary, AES encrypted stream, or polymorphic malware detected.');
    } else if (score > 4.5) {
      setEntropyVerdict('MODERATE: Standard compiled machine code or compressed structured dataset.');
    } else {
      setEntropyVerdict('NORMAL: Plaintext, ASCII configuration, or raw log stream.');
    }
    addAuditLog('SHANNON_ENTROPY_CALC', `Input score: ${score}`, 'SUCCESS');
  };

  // Darshan's JWT Token Generator
  const handleGenerateJwt = () => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(JSON.stringify({
      sub: jwtPayloadUser,
      role: currentOperative.role || "OPERATIVE",
      clearance: currentOperative.securityClearance,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    }));
    const fakeSig = btoa(jwtSecret.substring(0, 16) + "_" + Math.random().toString(36).substring(2, 8));
    const token = `${header}.${payload}.${fakeSig}`;
    setGeneratedJwt(token);
    addAuditLog('AEGIS_JWT_TOKEN_MINTED', jwtPayloadUser, 'SUCCESS');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Pod Station Header */}
      <div className="glass-panel" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img 
              src={currentOperative.avatar} 
              alt={currentOperative.name}
              style={{ width: '56px', height: '56px', borderRadius: '16px', border: '2px solid rgba(2, 132, 199, 0.4)' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>{currentOperative.name}'s Field Station</h2>
                <span className="badge-pill badge-cyan font-mono" style={{ fontSize: '0.75rem' }}>
                  pod://{currentOperative.stationSlug}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {currentOperative.designation} &bull; <strong style={{ color: 'var(--text-main)' }}>{currentOperative.domain}</strong>
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => setShowAddTaskModal(true)} 
              className="btn-liquid btn-primary"
            >
              <Plus size={16} />
              <span>+ Add Sprint Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* OPERATIVE SPECIFIC WORKBENCH */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        
        {/* CASE 1: ANIKET CHAVHAN (Database Engineer) */}
        {currentOperative.id === 'aniket-chavhan' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Database size={22} color="var(--cyber-cyan)" />
                <h3 style={{ fontSize: '1.2rem' }}>Interactive SQL Query & Performance Studio</h3>
              </div>
              <span className="badge-pill badge-emerald">PostgreSQL 16 // Shard #01 Connected</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Execute high-performance transactional queries with B-Tree index hints against the live <code className="font-mono">siem_threat_events</code> partition.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <textarea 
                className="liquid-input font-mono"
                style={{ height: '140px', resize: 'vertical', fontSize: '0.85rem', lineHeight: 1.4 }}
                value={sqlQuery}
                onChange={e => setSqlQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={handleExecuteSql}
                  disabled={isQueryRunning}
                  className="btn-liquid btn-primary"
                >
                  <Play size={15} />
                  <span>{isQueryRunning ? 'Running Plan...' : 'Execute Query'}</span>
                </button>
                <button 
                  onClick={() => {
                    setSqlQuery(`EXPLAIN ANALYZE SELECT * FROM siem_threat_events WHERE threat_score > 90;`);
                  }}
                  className="btn-liquid btn-glass"
                  style={{ fontSize: '0.8rem' }}
                >
                  Explain Analyze
                </button>
              </div>

              {queryLatency !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Execution Latency: <strong style={{ color: '#059669' }}>{queryLatency} ms</strong></span>
                  <span>Index Scan: <strong style={{ color: 'var(--cyber-cyan)' }}>idx_threat_events_btree</strong></span>
                </div>
              )}
            </div>

            {queryResults && (
              <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(241, 245, 249, 0.9)', borderBottom: '1px solid rgba(203, 213, 225, 0.8)' }}>
                      <th style={{ padding: '0.65rem 1rem' }}>EVENT_TYPE</th>
                      <th style={{ padding: '0.65rem 1rem' }}>SOURCE_IP</th>
                      <th style={{ padding: '0.65rem 1rem' }}>SEVERITY</th>
                      <th style={{ padding: '0.65rem 1rem' }}>THREAT_SCORE</th>
                      <th style={{ padding: '0.65rem 1rem' }}>DETECTED_AT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryResults.map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(241, 245, 249, 0.9)', backgroundColor: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>{r.event_type}</td>
                        <td style={{ padding: '0.65rem 1rem' }} className="font-mono">{r.source_ip}</td>
                        <td style={{ padding: '0.65rem 1rem' }}>
                          <span className="badge-pill badge-admin" style={{ fontSize: '0.65rem' }}>{r.severity}</span>
                        </td>
                        <td style={{ padding: '0.65rem 1rem', color: '#be123c', fontWeight: 700 }}>{r.threat_score} / 100</td>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>{r.detected_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CASE 2: PAVAN LONDHE (UI/UX Designer) */}
        {currentOperative.id === 'pavan-londhe' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sliders size={22} color="var(--cyber-indigo)" />
                <h3 style={{ fontSize: '1.2rem' }}>Corporate White Liquid Glass Design Studio</h3>
              </div>
              <span className="badge-pill badge-indigo">Token Studio v3.5</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Tune fluid frosted glass tokens in real-time. Notice the live preview card updating with your backdrop filters and radii!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <span>Backdrop Filter Blur</span>
                  <span className="font-mono">{glassBlur}px</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="40" 
                  value={glassBlur} 
                  onChange={e => setGlassBlur(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <span>Corner Radius</span>
                  <span className="font-mono">{borderRadius}px</span>
                </label>
                <input 
                  type="range" 
                  min="6" 
                  max="32" 
                  value={borderRadius} 
                  onChange={e => setBorderRadius(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  <span>Glow Ambient Intensity</span>
                  <span className="font-mono">{glowIntensity}%</span>
                </label>
                <input 
                  type="range" 
                  min="0" 
                  max="60" 
                  value={glowIntensity} 
                  onChange={e => setGlowIntensity(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Live Interactive Preview Component */}
            <div 
              style={{
                backdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                WebkitBackdropFilter: `blur(${glassBlur}px) saturate(180%)`,
                borderRadius: `${borderRadius}px`,
                boxShadow: `0 10px 30px -5px rgba(2, 132, 199, ${glowIntensity / 100}), 0 0 0 1px rgba(255, 255, 255, 0.9) inset`,
                border: '1px solid rgba(255, 255, 255, 0.95)',
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.85)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-main)' }}>Live Token Preview Card</h4>
                <span className="badge-pill badge-cyan">Active Render</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                This card reflects your exact CSS tokens: <code className="font-mono">backdrop-filter: blur({glassBlur}px)</code> and <code className="font-mono">border-radius: {borderRadius}px</code>.
              </p>
            </div>
          </div>
        )}

        {/* CASE 3: ASHISH ADE (CyberForensic Specialist) */}
        {currentOperative.id === 'ashish-ade' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Search size={22} color="var(--cyber-cyan)" />
                <h3 style={{ fontSize: '1.2rem' }}>Shannon Entropy & Malware Packer Inspector</h3>
              </div>
              <span className="badge-pill badge-emerald">Forensics Toolkit v2.1</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Compute exact Shannon Entropy for suspicious memory strings, raw packet buffers, or executable headers to detect encrypted payloads.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                Raw Hex / Byte String / Payload
              </label>
              <textarea 
                className="liquid-input font-mono"
                style={{ height: '90px', resize: 'vertical', fontSize: '0.825rem' }}
                value={entropyInput}
                onChange={e => setEntropyInput(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <button onClick={handleCalculateEntropy} className="btn-liquid btn-primary">
                <Sparkles size={15} />
                <span>Calculate Shannon Entropy</span>
              </button>
              <button 
                onClick={() => setEntropyInput('7z\xbc\xaf\'\x1c\x00\x04q\x98f\x80\xa1\x19\xda\xf2\xee\x11\x88\x99\x22\x33\x44\x55\x66\x77\x88\x99\xaa\xbb\xcc\xdd\xee\xff')}
                className="btn-liquid btn-glass"
                style={{ fontSize: '0.8rem' }}
              >
                Load Encrypted Payload Sample
              </button>
            </div>

            {entropyScore !== null && (
              <div style={{ background: 'rgba(241, 245, 249, 0.9)', border: '1px solid rgba(203, 213, 225, 0.8)', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Computed Entropy (H)</span>
                  <span className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 800, color: entropyScore > 6.8 ? '#be123c' : 'var(--cyber-cyan)' }}>
                    {entropyScore} / 8.000
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: entropyScore > 6.8 ? '#be123c' : 'var(--text-main)', fontWeight: 500 }}>
                  {entropyVerdict}
                </p>
              </div>
            )}
          </div>
        )}

        {/* CASE 4: DARSHAN TRIPADWAR (Auth Developer) */}
        {currentOperative.id === 'darshan-tripadwar' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={22} color="var(--cyber-indigo)" />
                <h3 style={{ fontSize: '1.2rem' }}>Aegis Zero-Trust JWT Signer & Inspector</h3>
              </div>
              <span className="badge-pill badge-indigo">Aegis Auth Core</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  HMAC SHA-256 Secret Key
                </label>
                <input 
                  type="text"
                  className="liquid-input font-mono"
                  value={jwtSecret}
                  onChange={e => setJwtSecret(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Subject (User Claim)
                </label>
                <input 
                  type="text"
                  className="liquid-input font-mono"
                  value={jwtPayloadUser}
                  onChange={e => setJwtPayloadUser(e.target.value)}
                />
              </div>
            </div>

            <button onClick={handleGenerateJwt} className="btn-liquid btn-primary" style={{ marginBottom: '1.25rem' }}>
              <RefreshCw size={15} />
              <span>Mint Signed Aegis Token</span>
            </button>

            {generatedJwt && (
              <div style={{ background: 'rgba(241, 245, 249, 0.9)', border: '1px solid rgba(203, 213, 225, 0.8)', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Cryptographically Signed Token:
                </div>
                <div className="font-mono" style={{ fontSize: '0.75rem', wordBreak: 'break-all', color: 'var(--cyber-cyan)' }}>
                  {generatedJwt}
                </div>
              </div>
            )}
          </div>
        )}

        {/* DEFAULT FALLBACK FOR OTHER OPERATIVES */}
        {['aniket-chavhan', 'pavan-londhe', 'ashish-ade', 'darshan-tripadwar'].indexOf(currentOperative.id) === -1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Cpu size={22} color="var(--cyber-cyan)" />
                <h3 style={{ fontSize: '1.2rem' }}>{currentOperative.domain} Station</h3>
              </div>
              <span className="badge-pill badge-cyan">{currentOperative.securityClearance}</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {currentOperative.bio}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {currentOperative.skills.map((skill, idx) => (
                <span key={idx} className="badge-pill badge-indigo">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SPRINT KANBAN BOARD */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>{currentOperative.name}'s Active Sprint Board</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Manage, execute, and deliver field objectives with full zero-trust tracking
            </p>
          </div>
          <button onClick={() => setShowAddTaskModal(true)} className="btn-liquid btn-primary" style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}>
            <Plus size={14} />
            <span>New Task</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          
          {/* Column 1: To Do */}
          <div style={{ background: 'rgba(241, 245, 249, 0.6)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem' }}>
                <Clock size={16} color="var(--text-muted)" />
                <span>To Do</span>
              </div>
              <span className="badge-pill badge-cyan" style={{ fontSize: '0.7rem' }}>
                {operativeTasks.filter(t => t.status === 'todo').length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {operativeTasks.filter(t => t.status === 'todo').map(task => (
                <div key={task.id} className="glass-panel" style={{ padding: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge-pill" style={{ fontSize: '0.65rem', background: task.priority === 'P0' ? 'rgba(225,29,72,0.1)' : 'rgba(2,132,199,0.1)', color: task.priority === 'P0' ? '#be123c' : '#0369a1' }}>
                      {task.priority}
                    </span>
                    <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{task.tag}</span>
                    <button 
                      onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                      className="btn-liquid btn-glass"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    >
                      <span>Start</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div style={{ background: 'rgba(241, 245, 249, 0.6)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem' }}>
                <AlertCircle size={16} color="var(--cyber-cyan)" />
                <span>In Progress</span>
              </div>
              <span className="badge-pill badge-indigo" style={{ fontSize: '0.7rem' }}>
                {operativeTasks.filter(t => t.status === 'in_progress').length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {operativeTasks.filter(t => t.status === 'in_progress').map(task => (
                <div key={task.id} className="glass-panel" style={{ padding: '0.85rem', borderLeft: '3px solid var(--cyber-cyan)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge-pill" style={{ fontSize: '0.65rem', background: task.priority === 'P0' ? 'rgba(225,29,72,0.1)' : 'rgba(2,132,199,0.1)', color: task.priority === 'P0' ? '#be123c' : '#0369a1' }}>
                      {task.priority}
                    </span>
                    <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{task.tag}</span>
                    <button 
                      onClick={() => handleUpdateTaskStatus(task.id, 'done')}
                      className="btn-liquid btn-primary"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                    >
                      <CheckCircle2 size={11} />
                      <span>Complete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Done */}
          <div style={{ background: 'rgba(241, 245, 249, 0.6)', border: '1px solid rgba(226, 232, 240, 0.8)', borderRadius: '16px', padding: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} color="#059669" />
                <span>Done</span>
              </div>
              <span className="badge-pill badge-emerald" style={{ fontSize: '0.7rem' }}>
                {operativeTasks.filter(t => t.status === 'done').length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {operativeTasks.filter(t => t.status === 'done').map(task => (
                <div key={task.id} className="glass-panel" style={{ padding: '0.85rem', opacity: 0.9 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge-pill badge-emerald" style={{ fontSize: '0.65rem' }}>
                      COMPLETED
                    </span>
                    <button onClick={() => handleDeleteTask(task.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.825rem', textDecoration: 'line-through', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{task.tag}</span>
                    <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>+ Create Sprint Task</h3>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Task Title / Objective
                </label>
                <input 
                  type="text"
                  className="liquid-input"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Audit Redis session invalidation"
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Priority Level
                </label>
                <select 
                  className="liquid-input"
                  value={newTaskPriority}
                  onChange={e => setNewTaskPriority(e.target.value as TaskPriority)}
                >
                  <option value="P0">P0 - Critical Blocker</option>
                  <option value="P1">P1 - High Priority</option>
                  <option value="P2">P2 - Standard Maintenance</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Domain Tag
                </label>
                <input 
                  type="text"
                  className="liquid-input"
                  value={newTaskTag}
                  onChange={e => setNewTaskTag(e.target.value)}
                  placeholder="e.g. Database Hardening"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddTaskModal(false)} className="btn-liquid btn-glass">
                  Cancel
                </button>
                <button type="submit" className="btn-liquid btn-primary">
                  Save Objective
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
