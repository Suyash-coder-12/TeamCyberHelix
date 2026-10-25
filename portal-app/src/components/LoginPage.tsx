import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CyberHelixLogo } from './CyberHelixLogo';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  AlertTriangle, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Search,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, allOperatives } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'leads' | 'engineering' | 'security'>('all');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (opEmail: string, opPass: string) => {
    setEmail(opEmail);
    setPassword(opPass);
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await login(opEmail, opPass);
      if (!res.success) {
        setError(res.message);
      } else {
        setSuccessMsg(res.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillOnly = (opEmail: string, opPass: string) => {
    setEmail(opEmail);
    setPassword(opPass);
    setError(null);
  };

  // Filter operatives
  const filteredOperatives = allOperatives.filter(op => {
    const matchesSearch = 
      op.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.designation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      op.email.toLowerCase().includes(searchFilter.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'leads') {
      return op.isAdmin || op.status === 'Lead';
    }
    if (activeCategory === 'engineering') {
      return op.domain.toLowerCase().includes('database') || 
             op.domain.toLowerCase().includes('design') || 
             op.domain.toLowerCase().includes('backend') || 
             op.domain.toLowerCase().includes('cloud') || 
             op.domain.toLowerCase().includes('frontend');
    }
    if (activeCategory === 'security') {
      return op.domain.toLowerCase().includes('forensic') || 
             op.domain.toLowerCase().includes('threat') || 
             op.domain.toLowerCase().includes('offensive') || 
             op.domain.toLowerCase().includes('network') || 
             op.domain.toLowerCase().includes('cryptography') || 
             op.domain.toLowerCase().includes('compliance');
    }
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2,
      padding: '2rem 1.25rem',
      overflowX: 'hidden'
    }}>
      
      {/* Background Animated Liquid Mesh in Loop */}
      <div className="liquid-canvas-bg">
        <div className="liquid-orb liquid-orb-1"></div>
        <div className="liquid-orb liquid-orb-2"></div>
        <div className="liquid-orb liquid-orb-3"></div>
      </div>

      <div style={{ width: '100%', maxWidth: '680px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Main Glass Login Card */}
        <div className="glass-panel" style={{ padding: '2.5rem 2.25rem', boxShadow: 'var(--shadow-liquid-lg)', border: '1.5px solid rgba(255, 255, 255, 0.95)' }}>
          
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', marginBottom: '0.85rem' }}>
              <CyberHelixLogo size={64} />
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }} className="badge-pill badge-cyan">
              <span className="pulsing-dot" style={{ backgroundColor: '#0284c7' }}></span>
              <span>ZERO-TRUST IDENTITY GATEWAY v3.5</span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Team CyberHelix
            </h1>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: '480px', margin: '0 auto' }}>
              Authenticate with your corporate credentials to unlock your custom cyber defense pod and station.
            </p>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div style={{
              background: 'rgba(225, 29, 72, 0.08)',
              border: '1px solid rgba(225, 29, 72, 0.3)',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.85rem',
              color: '#be123c'
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid rgba(5, 150, 105, 0.3)',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontSize: '0.85rem',
              color: '#059669'
            }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Email Field */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} color="var(--cyber-cyan)" />
                  <span>Operative Email Address</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>@cyberhelix.io</span>
              </label>

              <input 
                type="email"
                className="liquid-input"
                style={{ padding: '0.85rem 1rem', fontSize: '0.925rem' }}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. suyash.rathod@cyberhelix.io"
                required
                autoFocus
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.825rem', fontWeight: 700, marginBottom: '0.45rem', color: 'var(--text-main)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Lock size={14} color="var(--cyber-cyan)" />
                  <span>Cryptographic Passphrase</span>
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 500 }}>Zero-Trust Enforced</span>
              </label>

              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  className="liquid-input"
                  style={{ padding: '0.85rem 2.75rem 0.85rem 1rem', fontSize: '0.925rem' }}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter security passphrase"
                  required
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-dim)'
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-liquid btn-primary"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.9rem',
                fontSize: '0.975rem',
                fontWeight: 700,
                marginTop: '0.4rem',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              {loading ? (
                <span>Verifying Zero-Trust Handshake...</span>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Authenticate & Unlock Pod</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Quick Operative Selector & Directory (All 14 Members) */}
          <div style={{ marginTop: '2.25rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(226, 232, 240, 0.9)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <Key size={14} color="var(--cyber-cyan)" />
                <span>1-Click Operative Sign-In / Directory</span>
              </div>
              <span className="badge-pill badge-emerald" style={{ fontSize: '0.7rem' }}>
                All 14 Pods Ready
              </span>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input 
                  type="text"
                  className="liquid-input"
                  placeholder="Search operative by name, domain, or role..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  style={{ paddingLeft: '34px', paddingTop: '0.5rem', paddingBottom: '0.5rem', fontSize: '0.825rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button 
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  className={`btn-liquid ${activeCategory === 'all' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.725rem' }}
                >
                  All (14)
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveCategory('leads')}
                  className={`btn-liquid ${activeCategory === 'leads' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.725rem' }}
                >
                  Admin & Leads
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveCategory('engineering')}
                  className={`btn-liquid ${activeCategory === 'engineering' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.725rem' }}
                >
                  Engineering & Arch
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveCategory('security')}
                  className={`btn-liquid ${activeCategory === 'security' ? 'btn-primary' : 'btn-glass'}`}
                  style={{ padding: '0.3rem 0.65rem', fontSize: '0.725rem' }}
                >
                  Security & DFIR
                </button>
              </div>
            </div>

            {/* Scrollable Operatives Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '0.65rem', 
              maxHeight: '340px', 
              overflowY: 'auto',
              paddingRight: '0.25rem'
            }}>
              {filteredOperatives.map(op => {
                const opDefaultPass = op.isAdmin ? 'CyberHelix@Admin123!' : 'HelixSec#2026';
                const isSuyash = op.id === 'suyash-rathod';

                return (
                  <div 
                    key={op.id}
                    className="glass-panel"
                    style={{
                      padding: '0.7rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.65rem',
                      border: isSuyash ? '1.5px solid rgba(225, 29, 72, 0.35)' : '1px solid rgba(226, 232, 240, 0.9)',
                      background: isSuyash ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', minWidth: 0, flex: 1 }}>
                      <img 
                        src={op.avatar} 
                        alt="" 
                        aria-hidden="true" 
                        style={{ 
                          width: '32px', 
                          height: '32px', 
                          borderRadius: '50%', 
                          border: isSuyash ? '1.5px solid #be123c' : '1.5px solid #0284c7',
                          flexShrink: 0 
                        }} 
                      />
                      <div style={{ minWidth: 0, lineHeight: 1.25 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ 
                            fontSize: '0.825rem', 
                            fontWeight: 700, 
                            color: isSuyash ? '#be123c' : 'var(--text-main)', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                          }}>
                            {op.name}
                          </span>
                          {op.isAdmin && (
                            <span className="badge-pill badge-admin" style={{ fontSize: '0.58rem', padding: '0.05rem 0.3rem' }}>
                              L5
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {op.designation.split('&')[0]}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
                      <button 
                        type="button"
                        onClick={() => handleFillOnly(op.email, opDefaultPass)}
                        className="btn-liquid btn-glass"
                        style={{ padding: '0.3rem 0.5rem', fontSize: '0.7rem' }}
                        title="Fill Email & Password in form"
                      >
                        Fill
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleQuickLogin(op.email, opDefaultPass)}
                        className={`btn-liquid ${isSuyash ? 'btn-danger' : 'btn-primary'}`}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.7rem', fontWeight: 700 }}
                        title={`Sign in instantly as ${op.name}`}
                      >
                        Login
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredOperatives.length === 0 && (
                <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  No operative matches "{searchFilter}"
                </div>
              )}
            </div>

            {/* Standard Passphrase Reference Guide */}
            <div style={{ 
              marginTop: '1.25rem', 
              padding: '0.75rem 1rem', 
              borderRadius: '12px', 
              background: 'rgba(248, 250, 252, 0.85)', 
              border: '1px solid rgba(226, 232, 240, 0.9)', 
              fontSize: '0.75rem', 
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <div>
                Super Admin Passphrase: <code className="font-mono" style={{ color: '#be123c', fontWeight: 700 }}>CyberHelix@Admin123!</code>
              </div>
              <div>
                All Operatives Passphrase: <code className="font-mono" style={{ color: 'var(--cyber-cyan)', fontWeight: 700 }}>HelixSec#2026</code>
              </div>
            </div>

          </div>

        </div>

        {/* Security Readiness Footer Card */}
        <div className="glass-panel" style={{ padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="pulsing-dot" style={{ backgroundColor: '#059669' }}></span>
            <span>All 14 Regional Nodes Operational • Zero-Trust Guard Active</span>
          </div>
          <span className="badge-pill badge-emerald">DEFCON 2</span>
        </div>

      </div>
    </div>
  );
};
