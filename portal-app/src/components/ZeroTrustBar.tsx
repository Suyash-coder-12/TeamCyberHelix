import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CyberHelixLogo } from './CyberHelixLogo';
import { ShieldCheck, Copy, Check, Server, Clock, Lock } from 'lucide-react';

export const ZeroTrustBar: React.FC = () => {
  const { currentOperative, session, zeroTrustUrl } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!currentOperative || !session) return null;

  const handleCopy = () => {
    const fullUrl = window.location.origin + window.location.pathname + zeroTrustUrl;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel" style={{ padding: '0.65rem 1.25rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
      
      {/* Endpoint URL with Official Site Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '260px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cyber-cyan)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <ShieldCheck size={16} />
          <span>Endpoint:</span>
        </div>
        
        {/* Browser Omnibox Style URL Bar with Logo */}
        <div 
          style={{ 
            background: 'rgba(255, 255, 255, 0.95)', 
            border: '1.5px solid rgba(203, 213, 225, 0.9)', 
            borderRadius: '12px', 
            padding: '0.35rem 0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '720px',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
          }}
          title={zeroTrustUrl}
        >
          {/* Logo next to URL */}
          <CyberHelixLogo size={22} glow={false} />

          {/* Secure Padlock & Protocol */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#059669', background: 'rgba(16, 185, 129, 0.12)', padding: '0.15rem 0.45rem', borderRadius: '6px', fontSize: '0.675rem', fontWeight: 700 }}>
            <Lock size={11} color="#059669" />
            <span>https://</span>
          </div>

          <span style={{ color: 'var(--cyber-cyan)', fontWeight: 700 }}>grid.cyberhelix.io</span>
          <span style={{ color: '#475569' }}>{zeroTrustUrl}</span>
        </div>

        <button 
          onClick={handleCopy}
          className="btn-liquid btn-glass"
          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
          title="Copy secure link"
        >
          {copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        <div className="badge-pill badge-indigo">
          <Server size={12} />
          <span>{currentOperative.assignedNode}</span>
        </div>

        <div className="badge-pill badge-emerald">
          <Clock size={12} />
          <span>TTL: 07h 48m</span>
        </div>

        <div className="badge-pill" style={{ background: currentOperative.isAdmin ? 'rgba(225, 29, 72, 0.1)' : 'rgba(2, 132, 199, 0.1)', color: currentOperative.isAdmin ? '#be123c' : '#0369a1', border: `1px solid ${currentOperative.isAdmin ? 'rgba(225, 29, 72, 0.2)' : 'rgba(2, 132, 199, 0.2)'}` }}>
          <span>{currentOperative.securityClearance}</span>
        </div>
      </div>
    </div>
  );
};
