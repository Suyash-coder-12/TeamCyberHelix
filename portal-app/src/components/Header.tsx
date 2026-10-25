import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { PortalTab } from '../types';
import { GithubIcon } from './GithubIcon';
import { CyberHelixLogo } from './CyberHelixLogo';
import { 
  ShieldAlert, 
  Terminal,
  Layers, 
  Cpu, 
  Bot, 
  KeyRound, 
  LogOut, 
  Lock 
} from 'lucide-react';

interface Props {
  activeTab: PortalTab;
  onTabChange: (tab: PortalTab) => void;
  onOpenPasswordModal: () => void;
}

export const Header: React.FC<Props> = ({
  activeTab,
  onTabChange,
  onOpenPasswordModal
}) => {
  const { currentOperative, logout } = useAuth();

  return (
    <header className="glass-panel" style={{ padding: '0.85rem 1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        
        {/* Brand & Platform Identifier */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => onTabChange('dashboard')}>
            <CyberHelixLogo size={40} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: 'var(--text-main)' }}>
                  TEAM CYBERHELIX
                </span>
                <span className="badge-pill badge-cyan" style={{ fontSize: '0.65rem' }}>
                  GRID v3.5
                </span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Zero-Trust Autonomous Cyber Defense Architecture
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`btn-liquid ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-glass'}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Layers size={15} />
            <span>Dashboard</span>
          </button>

          <button 
            onClick={() => onTabChange('pod-station')}
            className={`btn-liquid ${activeTab === 'pod-station' ? 'btn-primary' : 'btn-glass'}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Cpu size={15} />
            <span>
              {currentOperative ? `${currentOperative.name.split(' ')[0]}'s Station` : 'Pod Station'}
            </span>
          </button>

          <button 
            onClick={() => {
              if (currentOperative?.isAdmin) {
                onTabChange('admin-console');
              } else {
                alert('Access Restricted: Level 5 Administrator authorization required. Log in as Suyash Rathod.');
              }
            }}
            className={`btn-liquid ${activeTab === 'admin-console' ? 'btn-danger' : 'btn-glass'}`}
            style={{ 
              padding: '0.55rem 0.95rem', 
              fontSize: '0.825rem',
              opacity: currentOperative?.isAdmin ? 1 : 0.65 
            }}
            title={currentOperative?.isAdmin ? "Super Admin Console" : "Admin Only (Suyash Rathod)"}
          >
            {currentOperative?.isAdmin ? <ShieldAlert size={15} /> : <Lock size={14} />}
            <span>Admin Console</span>
            {currentOperative?.isAdmin && (
              <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.3)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>
                L5
              </span>
            )}
          </button>

          <button 
            onClick={() => onTabChange('github')}
            className={`btn-liquid ${activeTab === 'github' ? 'btn-primary' : 'btn-glass'}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.825rem' }}
          >
            <GithubIcon size={15} />
            <span>GitHub Workspace</span>
          </button>

          <button 
            onClick={() => onTabChange('neuronova')}
            className={`btn-liquid ${activeTab === 'neuronova' ? 'btn-primary' : 'btn-glass'}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.825rem', position: 'relative' }}
          >
            <Bot size={15} />
            <span>NeuroNova AI</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0284c7', position: 'absolute', top: '7px', right: '7px' }}></span>
          </button>

          <button 
            onClick={() => onTabChange('cloud-ide')}
            className={`btn-liquid ${activeTab === 'cloud-ide' ? 'btn-primary' : 'btn-glass'}`}
            style={{ padding: '0.55rem 0.95rem', fontSize: '0.825rem' }}
          >
            <Terminal size={15} />
            <span>Cloud IDE</span>
          </button>
        </nav>

        {/* Profile Identity Capsule & Explicit Session Controls (No User Switch Allowed) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {currentOperative && (
            <>
              {/* Static Executive Identity Badge */}
              <div 
                className="glass-panel"
                style={{ 
                  padding: '0.4rem 0.85rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  borderRadius: '14px',
                  border: '1.5px solid rgba(2, 132, 199, 0.25)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  boxShadow: 'var(--shadow-liquid-sm)'
                }}
              >
                <img 
                  src={currentOperative.avatar} 
                  alt=""
                  aria-hidden="true"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid #0284c7', flexShrink: 0 }}
                />
                
                <div style={{ textAlign: 'left', lineHeight: 1.25 }}>
                  <div style={{ fontSize: '0.825rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span>{currentOperative.name}</span>
                    {currentOperative.isAdmin ? (
                      <span className="badge-pill badge-admin" style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>
                        ADMIN
                      </span>
                    ) : (
                      <span className="badge-pill badge-cyan" style={{ fontSize: '0.6rem', padding: '0.05rem 0.35rem' }}>
                        {currentOperative.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {currentOperative.designation.split('&')[0]}
                  </div>
                </div>
              </div>

              {/* Password Change Trigger */}
              <button 
                onClick={onOpenPasswordModal}
                className="btn-liquid btn-glass"
                style={{ 
                  padding: '0.45rem 0.75rem', 
                  borderRadius: '10px', 
                  fontSize: '0.775rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem' 
                }}
                title="Rotate Security Passphrase"
              >
                <KeyRound size={14} color="var(--cyber-cyan)" />
                <span>Change Pass</span>
              </button>

              {/* Sign Out (Returns directly to Login Page) */}
              <button 
                onClick={logout}
                className="btn-liquid btn-danger"
                style={{ 
                  padding: '0.45rem 0.85rem', 
                  borderRadius: '10px', 
                  fontSize: '0.775rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem' 
                }}
                title="Sign Out of Session"
              >
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
