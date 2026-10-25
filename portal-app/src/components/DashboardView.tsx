import React from 'react';
import { useAuth } from '../context/AuthContext';
import type { PortalTab } from '../types';
import { ACTIVE_PROJECTS_LIST, RESEARCH_NOTES_LIST } from '../data/seedData';
import { GithubIcon } from './GithubIcon';
import { 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  FolderGit2, 
  FileText, 
  Users, 
  ArrowUpRight, 
  Cpu, 
  Bot, 
  ShieldAlert,
  Star,
  TrendingUp
} from 'lucide-react';

interface Props {
  onTabChange: (tab: PortalTab) => void;
}

export const DashboardView: React.FC<Props> = ({ onTabChange }) => {
  const { currentOperative, allOperatives } = useAuth();

  if (!currentOperative) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Hero Welcome Banner */}
      <div className="glass-panel" style={{ padding: '2rem 2.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
              <span className="badge-pill badge-emerald">
                <span className="pulsing-dot"></span>
                <span>CRYPTOGRAPHIC SESSION VERIFIED</span>
              </span>
              <span className="badge-pill badge-cyan">
                {currentOperative.assignedNode}
              </span>
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.4rem', letterSpacing: '-0.03em' }}>
              Welcome back, {currentOperative.name}!
            </h1>
            
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '750px', lineHeight: 1.5 }}>
              {currentOperative.designation} &bull; <strong style={{ color: 'var(--text-main)' }}>{currentOperative.domain}</strong>.
              All systems on node <span className="font-mono" style={{ color: 'var(--cyber-cyan)' }}>{currentOperative.assignedNode}</span> are operational under DEFCON 2 readiness.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onTabChange('pod-station')} 
              className="btn-liquid btn-primary"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <Cpu size={16} />
              <span>Enter {currentOperative.name.split(' ')[0]}'s Station</span>
            </button>

            <button 
              onClick={() => onTabChange('neuronova')} 
              className="btn-liquid btn-glass"
              style={{ padding: '0.75rem 1.25rem' }}
            >
              <Bot size={16} />
              <span>Ask NeuroNova AI</span>
            </button>

            {currentOperative.isAdmin && (
              <button 
                onClick={() => onTabChange('admin-console')} 
                className="btn-liquid btn-danger"
                style={{ padding: '0.75rem 1.25rem' }}
              >
                <ShieldAlert size={16} />
                <span>Super Admin Console</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Defense Grid Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>GRID DEFENSE STATUS</span>
            <ShieldCheck size={18} color="#059669" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669' }}>DEFCON 2</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>0 critical vulnerabilities detected</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>TEST SUITE STATUS</span>
            <Activity size={18} color="#0284c7" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--cyber-cyan)' }}>13 / 13 PASS</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>SIEM, Aegis & DFIR test suites green</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>ACTIVE OPERATIVES</span>
            <Users size={18} color="#4f46e5" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--cyber-indigo)' }}>14 / 14 ONLINE</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Full division authenticated on grid</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
            <span>NEURONOVA AI CORE</span>
            <Sparkles size={18} color="#d97706" />
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--cyber-amber)' }}>STANDBY</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Speech & Copilot engines active</div>
        </div>
      </div>

      {/* GitHub Profile, Stats & 886-Contribution Heatmap Highlight */}
      <div className="glass-panel" style={{ padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <GithubIcon size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <h3 style={{ fontSize: '1.25rem' }}>GitHub Stats & Activity (@Suyash-coder-12)</h3>
                <span className="badge-pill badge-emerald">
                  <TrendingUp size={12} />
                  <span>886 contributions</span>
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Founder & Executive Director at BeatsVibe Technologies &bull; Android, AI DevOps & Open Source
              </p>
            </div>
          </div>

          <button 
            onClick={() => onTabChange('github')}
            className="btn-liquid btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
          >
            <span>Explore Full GitHub Heatmap & Pinned Repos</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Pinned Projects Quick Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <div 
            className="glass-panel glass-panel-interactive" 
            style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.75)' }}
            onClick={() => onTabChange('github')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--cyber-cyan)' }}>Library-Management-System</strong>
              <span className="badge-pill" style={{ fontSize: '0.65rem' }}>C++</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              GUI-based Library Management System built using C++ and Qt for CS students.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.725rem', color: '#d97706' }}>
              <Star size={12} />
              <span>1 star</span>
            </div>
          </div>

          <div 
            className="glass-panel glass-panel-interactive" 
            style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.75)' }}
            onClick={() => onTabChange('github')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--cyber-cyan)' }}>Click-House</strong>
              <span className="badge-pill" style={{ fontSize: '0.65rem' }}>C++</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              Column-oriented database management system for real-time analytical reports.
            </p>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
              Open-source DBMS
            </div>
          </div>

          <div 
            className="glass-panel glass-panel-interactive" 
            style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.75)' }}
            onClick={() => onTabChange('github')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--cyber-cyan)' }}>local-ip-mapper</strong>
              <span className="badge-pill" style={{ fontSize: '0.65rem' }}>Go</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              Network scanner CLI tool in Go for IP discovery, open ports, and topology mapping.
            </p>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
              CLI Tool
            </div>
          </div>

          <div 
            className="glass-panel glass-panel-interactive" 
            style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.75)' }}
            onClick={() => onTabChange('github')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <strong style={{ fontSize: '0.9rem', color: 'var(--cyber-cyan)' }}>openai/codex</strong>
              <span className="badge-pill" style={{ fontSize: '0.65rem' }}>Rust</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
              Lightweight coding agent that runs in your terminal for autonomous execution.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.725rem', color: '#d97706' }}>
              <span>⭐ 131k</span>
              <span style={{ color: 'var(--cyber-indigo)' }}>🍴 20.6k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Active Projects & Research Knowledge */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        
        {/* Active Projects Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FolderGit2 size={20} color="var(--cyber-cyan)" />
              <h3 style={{ fontSize: '1.15rem' }}>Active Cyber Projects</h3>
            </div>
            <button onClick={() => onTabChange('cloud-ide')} className="btn-liquid btn-glass" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}>
              <span>Open in IDE</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {ACTIVE_PROJECTS_LIST.map(proj => (
              <div 
                key={proj.id}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => onTabChange('cloud-ide')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {proj.name}
                  </span>
                  <span className="badge-pill badge-emerald" style={{ fontSize: '0.675rem' }}>
                    {proj.status}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {proj.desc}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  <span>Lead: {proj.lead}</span>
                  <span style={{ color: '#059669', fontWeight: 600 }}>{proj.testsPassed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research & Forensics Notes */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="var(--cyber-indigo)" />
              <h3 style={{ fontSize: '1.15rem' }}>Research & Forensic Notes</h3>
            </div>
            <span className="badge-pill badge-indigo" style={{ fontSize: '0.75rem' }}>
              Repository Verified
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {RESEARCH_NOTES_LIST.map((note, idx) => (
              <div 
                key={idx}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.7)' }}
                onClick={() => onTabChange('pod-station')}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {note.title}
                  </span>
                  <span className="badge-pill badge-cyan" style={{ fontSize: '0.675rem' }}>
                    {note.category}
                  </span>
                </div>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  {note.summary}
                </p>
                <div style={{ fontSize: '0.725rem', color: 'var(--cyber-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {note.file}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Operatives Division Roster Grid */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem' }}>CyberHelix Team Directory (14 Operatives)</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Dedicated authenticated stations across intelligence, security, forensics & architecture
            </p>
          </div>
          <span className="badge-pill badge-indigo">
            Super Admin: Suyash Rathod
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {allOperatives.map(op => (
            <div 
              key={op.id}
              className="glass-panel"
              style={{
                padding: '1rem',
                border: op.id === currentOperative.id ? '1px solid var(--cyber-cyan)' : '1px solid rgba(255, 255, 255, 0.9)',
                background: op.id === currentOperative.id ? 'rgba(2, 132, 199, 0.04)' : 'rgba(255, 255, 255, 0.75)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <img src={op.avatar} alt={op.name} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid rgba(2, 132, 199, 0.3)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{op.name}</span>
                    {op.isAdmin && <span className="badge-pill badge-admin" style={{ fontSize: '0.6rem', padding: '0.05rem 0.3rem' }}>L5</span>}
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {op.designation}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.4, height: '42px', overflow: 'hidden' }}>
                {op.bio}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(226, 232, 240, 0.8)', paddingTop: '0.5rem' }}>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--cyber-cyan)' }}>
                  {op.stationSlug}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {op.securityClearance.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
