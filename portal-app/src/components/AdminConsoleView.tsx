import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { PortalTab } from '../types';
import { 
  ShieldAlert, 
  KeyRound, 
  RotateCw, 
  Activity, 
  Check, 
  Eye 
} from 'lucide-react';

interface Props {
  onTabChange: (tab: PortalTab) => void;
}

export const AdminConsoleView: React.FC<Props> = ({ onTabChange }) => {
  const { currentOperative, allOperatives, adminResetPassword, auditLogs, addAuditLog } = useAuth();
  const [selectedOperativeId, setSelectedOperativeId] = useState<string | null>(null);
  const [newPassInput, setNewPassInput] = useState('');
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [inspectModalOp, setInspectModalOp] = useState<any | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // If not admin Suyash Rathod, deny access
  if (!currentOperative?.isAdmin) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '20px',
          background: 'rgba(225, 29, 72, 0.1)',
          color: '#be123c',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem'
        }}>
          <ShieldAlert size={36} />
        </div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: '#be123c' }}>
          Access Denied: Level 5 Administrator Required
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
          This command deck is strictly restricted to Super Admin <strong>Suyash Rathod</strong>. Your session on {currentOperative?.assignedNode || 'node'} does not hold root privileges.
        </p>
        <button onClick={() => onTabChange('dashboard')} className="btn-liquid btn-primary">
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleOpenReset = (opId: string) => {
    setSelectedOperativeId(opId);
    setNewPassInput('HelixSec#2026');
    setResetModalOpen(true);
  };

  const handleExecuteReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOperativeId) return;

    const res = adminResetPassword(selectedOperativeId, newPassInput);
    if (res.success) {
      setStatusMessage(`Passphrase successfully forced for operative [${selectedOperativeId}].`);
      setTimeout(() => setStatusMessage(null), 3000);
      setResetModalOpen(false);
    }
  };

  const handleInspectPod = (op: any) => {
    setInspectModalOp(op);
    addAuditLog('ADMIN_INSPECT_POD_TELEMETRY', op.email, 'INFO');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Super Admin Command Banner */}
      <div className="glass-panel" style={{ padding: '2rem 2.25rem', borderLeft: '4px solid #be123c' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <span className="badge-pill badge-admin">
                LEVEL-5 UNIVERSAL ROOT ACCESS
              </span>
              <span className="badge-pill badge-indigo">
                SUPER ADMIN: SUYASH RATHOD
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.35rem' }}>
              Master Security Command & Governance Hub
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Universal supervisory controls over all 14 team pods, credentials, cluster nodes, and audit streams.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              onClick={() => {
                addAuditLog('ROOT_KEYS_ROTATED', 'Master Cluster RSA-4096 / Ed25519', 'SUCCESS');
                setStatusMessage('Global Cluster cryptographic root keys rotated successfully.');
                setTimeout(() => setStatusMessage(null), 3000);
              }}
              className="btn-liquid btn-glass"
            >
              <RotateCw size={15} />
              <span>Rotate Root Keys</span>
            </button>
          </div>
        </div>

        {statusMessage && (
          <div style={{ marginTop: '1.25rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#047857', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={16} />
            <span>{statusMessage}</span>
          </div>
        )}
      </div>

      {/* Operative Credential & Access Manager */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem' }}>Operatives Credential & Pod Registry (14 Active Accounts)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Super Admin can reset any member passphrase or impersonate their dedicated pod workbench
            </p>
          </div>
          <span className="badge-pill badge-emerald">All 14 Nodes Connected</span>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(241, 245, 249, 0.9)', borderBottom: '1px solid rgba(203, 213, 225, 0.8)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>OPERATIVE</th>
                <th style={{ padding: '0.75rem 1rem' }}>DESIGNATION & DOMAIN</th>
                <th style={{ padding: '0.75rem 1rem' }}>CLEARANCE</th>
                <th style={{ padding: '0.75rem 1rem' }}>STATION SLUG</th>
                <th style={{ padding: '0.75rem 1rem' }}>ASSIGNED NODE</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>SUPER ADMIN ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {allOperatives.map((op, idx) => (
                <tr key={op.id} style={{ borderBottom: '1px solid rgba(241, 245, 249, 0.9)', backgroundColor: op.isAdmin ? 'rgba(225, 29, 72, 0.03)' : idx % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)' }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <img src={op.avatar} alt={op.name} style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span>{op.name}</span>
                          {op.isAdmin && <span className="badge-pill badge-admin" style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>ADMIN</span>}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{op.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ fontWeight: 600 }}>{op.designation}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{op.domain}</div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span className="badge-pill" style={{ fontSize: '0.675rem', background: op.isAdmin ? 'rgba(225, 29, 72, 0.1)' : 'rgba(2, 132, 199, 0.1)', color: op.isAdmin ? '#be123c' : '#0369a1' }}>
                      {op.securityClearance.split(' ')[0]}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--cyber-cyan)', fontSize: '0.75rem' }} className="font-mono">
                    pod://{op.stationSlug}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }} className="font-mono">
                    {op.assignedNode}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleInspectPod(op)}
                        className="btn-liquid btn-glass"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.725rem' }}
                        title="Audit & Inspect Operative Pod"
                      >
                        <Eye size={12} />
                        <span>Inspect Pod</span>
                      </button>

                      <button 
                        onClick={() => handleOpenReset(op.id)}
                        className="btn-liquid btn-glass"
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.725rem', color: '#be123c' }}
                        title="Force Passphrase Reset"
                      >
                        <KeyRound size={12} />
                        <span>Reset Pass</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Immutable Security Audit Stream */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Activity size={20} color="var(--cyber-cyan)" />
            <h3 style={{ fontSize: '1.2rem' }}>Zero-Trust Immutable Audit Trail</h3>
          </div>
          <span className="badge-pill badge-emerald">SHA-256 Chained Hashes</span>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(241, 245, 249, 0.9)', borderBottom: '1px solid rgba(203, 213, 225, 0.8)' }}>
                <th style={{ padding: '0.65rem 1rem' }}>TIMESTAMP</th>
                <th style={{ padding: '0.65rem 1rem' }}>ACTOR</th>
                <th style={{ padding: '0.65rem 1rem' }}>ACTION EVENT</th>
                <th style={{ padding: '0.65rem 1rem' }}>TARGET</th>
                <th style={{ padding: '0.65rem 1rem' }}>IP ORIGIN</th>
                <th style={{ padding: '0.65rem 1rem' }}>STATUS</th>
                <th style={{ padding: '0.65rem 1rem' }}>CRYPTO HASH</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.slice(0, 10).map((log, idx) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(241, 245, 249, 0.9)', backgroundColor: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.9)' }}>
                  <td style={{ padding: '0.65rem 1rem' }} className="font-mono">{log.timestamp}</td>
                  <td style={{ padding: '0.65rem 1rem', fontWeight: 600 }}>{log.actor}</td>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--cyber-cyan)' }} className="font-mono">{log.action}</td>
                  <td style={{ padding: '0.65rem 1rem', color: 'var(--text-muted)' }}>{log.target}</td>
                  <td style={{ padding: '0.65rem 1rem' }} className="font-mono">{log.ip}</td>
                  <td style={{ padding: '0.65rem 1rem' }}>
                    <span className="badge-pill" style={{
                      fontSize: '0.65rem',
                      background: log.status === 'ALERT' ? 'rgba(225, 29, 72, 0.1)' : log.status === 'SUCCESS' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(2, 132, 199, 0.1)',
                      color: log.status === 'ALERT' ? '#be123c' : log.status === 'SUCCESS' ? '#047857' : '#0369a1'
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.65rem 1rem', fontSize: '0.72rem', color: 'var(--text-dim)' }} className="font-mono">
                    {log.hash}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Force Reset Password Modal */}
      {resetModalOpen && (
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
          <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#be123c' }}>
              Level 5 Force Reset Passphrase
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Overriding security key for operative: <strong>{selectedOperativeId}</strong>
            </p>

            <form onSubmit={handleExecuteReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  New Passphrase
                </label>
                <input 
                  type="text"
                  className="liquid-input font-mono"
                  value={newPassInput}
                  onChange={e => setNewPassInput(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setResetModalOpen(false)} className="btn-liquid btn-glass">
                  Cancel
                </button>
                <button type="submit" className="btn-liquid btn-danger">
                  Force Reset Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Operative Pod Audit Inspection Modal */}
      {inspectModalOp && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1rem'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '520px', padding: '2.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img src={inspectModalOp.avatar} alt="" aria-hidden="true" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #0284c7' }} />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{inspectModalOp.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inspectModalOp.designation}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem', background: 'rgba(248, 250, 252, 0.85)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Corporate Email:</span>
                <span className="font-mono" style={{ fontWeight: 600 }}>{inspectModalOp.email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Node:</span>
                <span className="font-mono" style={{ color: 'var(--cyber-cyan)', fontWeight: 600 }}>{inspectModalOp.assignedNode}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Clearance:</span>
                <span className="badge-pill badge-indigo" style={{ fontSize: '0.65rem' }}>{inspectModalOp.securityClearance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Station Route:</span>
                <span className="font-mono" style={{ fontSize: '0.75rem' }}>pod://{inspectModalOp.stationSlug}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(226, 232, 240, 0.9)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                <span style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>Specialized Skills:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {inspectModalOp.skills.map((s: string) => (
                    <span key={s} className="badge-pill badge-cyan" style={{ fontSize: '0.65rem' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={() => setInspectModalOp(null)} 
                className="btn-liquid btn-primary"
                style={{ padding: '0.5rem 1.25rem' }}
              >
                Close Audit Inspection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
