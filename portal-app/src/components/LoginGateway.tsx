import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, AlertTriangle, Key, Cpu, UserCheck } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginGateway: React.FC<Props> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async (targetEmail: string, targetPass: string) => {
    setEmail(targetEmail);
    setPassword(targetPass);
    setLoading(true);
    const res = await login(targetEmail, targetPass);
    setLoading(false);
    if (res.success) {
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '2.25rem', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
            border: '1px solid rgba(2, 132, 199, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'var(--cyber-cyan)'
          }}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.45rem', marginBottom: '0.25rem' }}>Zero-Trust Identity Gateway</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Cryptographically authenticated operative session access
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(225, 29, 72, 0.1)',
            border: '1px solid rgba(225, 29, 72, 0.3)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.825rem',
            color: '#be123c'
          }}>
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
              <Mail size={14} />
              <span>Operative Corporate Email</span>
            </label>
            <input 
              type="email"
              className="liquid-input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@cyberhelix.io"
              required
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-muted)' }}>
              <Lock size={14} />
              <span>Security Passphrase</span>
            </label>
            <input 
              type="password"
              className="liquid-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter cryptographic passphrase"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-liquid btn-primary"
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem', marginTop: '0.25rem' }}
          >
            {loading ? 'Authenticating Zero-Trust Handshake...' : 'Authenticate & Unlock Pod'}
          </button>
        </form>

        {/* Quick Demo Access Pills */}
        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            <Key size={12} />
            <span>Quick Demo Authentications:</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button 
              type="button"
              onClick={() => handleQuickDemo('suyash.rathod@cyberhelix.io', 'CyberHelix@Admin123!')}
              className="btn-liquid btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', border: '1px solid rgba(225, 29, 72, 0.3)', color: '#be123c' }}
            >
              <Cpu size={12} />
              <span>Suyash Rathod (Super Admin)</span>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemo('aniket.chavhan@cyberhelix.io', 'HelixSec#2026')}
              className="btn-liquid btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              <UserCheck size={12} />
              <span>Aniket Chavhan (Database)</span>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemo('ashish.ade@cyberhelix.io', 'HelixSec#2026')}
              className="btn-liquid btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              <UserCheck size={12} />
              <span>Ashish Ade (Forensics)</span>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemo('pavan.londhe@cyberhelix.io', 'HelixSec#2026')}
              className="btn-liquid btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              <UserCheck size={12} />
              <span>Pavan Londhe (UI/UX)</span>
            </button>

            <button 
              type="button"
              onClick={() => handleQuickDemo('darshan.tripadwar@cyberhelix.io', 'HelixSec#2026')}
              className="btn-liquid btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              <UserCheck size={12} />
              <span>Darshan Tripadwar (Auth)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
