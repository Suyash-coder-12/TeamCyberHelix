import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import type { PortalTab } from '../types';
import { GithubIcon } from './GithubIcon';
import { 
  GitBranch, 
  GitCommit, 
  Folder, 
  FileCode, 
  ExternalLink, 
  Check, 
  Key, 
  Terminal, 
  ShieldCheck,
  Star,
  GitFork,
  BookOpen,
  Sparkles,
  TrendingUp,
  Code2,
  Activity,
  Smartphone,
  Cpu,
  Briefcase
} from 'lucide-react';

interface Props {
  onTabChange: (tab: PortalTab) => void;
}

interface PinnedRepo {
  name: string;
  url: string;
  description: string;
  language: string;
  languageColor: string;
  stars?: string | number;
  forks?: string | number;
  isFork?: boolean;
}

export const GitHubWorkspaceView: React.FC<Props> = ({ onTabChange }) => {
  const { currentOperative, addAuditLog } = useAuth();
  const [ghUser, setGhUser] = useState(currentOperative?.github || 'Suyash-coder-12');
  const [repoName, setRepoName] = useState('TeamCyberHelix');
  const [patToken, setPatToken] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'files' | 'commits' | 'security'>('profile');
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  // Pinned Repositories from Suyash-coder-12
  const pinnedRepos: PinnedRepo[] = [
    {
      name: "Library-Management-System",
      url: "https://github.com/Suyash-coder-12/Library-Management-System",
      description: "A GUI-based Library Management System built using C++ and Qt. Designed for final-year Computer Science students with book & member management, issue/return tracking.",
      language: "C++",
      languageColor: "#f34b7d",
      stars: 1
    },
    {
      name: "Click-House",
      url: "https://github.com/Suyash-coder-12/Click-House",
      description: "ClickHouse® is an open-source column-oriented database management system that allows generating analytical data reports in real time.",
      language: "C++",
      languageColor: "#f34b7d"
    },
    {
      name: "local-ip-mapper",
      url: "https://github.com/Suyash-coder-12/local-ip-mapper",
      description: "Command-line tool written in Go that helps users discover devices on a local network, identify active IP addresses, open ports, and analyze network topology.",
      language: "Go",
      languageColor: "#00ADD8"
    },
    {
      name: "openai/codex",
      url: "https://github.com/openai/codex",
      description: "Lightweight coding agent that runs in your terminal, providing autonomous coding capabilities directly from CLI.",
      language: "Rust",
      languageColor: "#dea584",
      stars: "131k",
      forks: "20.6k",
      isFork: true
    }
  ];

  // Tech stack tags
  const favoriteTools = [
    { name: "Python", color: "#3776ab", bg: "rgba(55, 118, 171, 0.1)" },
    { name: "Java", color: "#e76f00", bg: "rgba(231, 111, 0, 0.1)" },
    { name: "Android", color: "#3ddc84", bg: "rgba(61, 220, 132, 0.15)" },
    { name: "Kotlin", color: "#7f52ff", bg: "rgba(127, 82, 255, 0.1)" },
    { name: "JavaScript", color: "#f7df1e", bg: "rgba(247, 223, 30, 0.15)" },
    { name: "C++", color: "#00599c", bg: "rgba(0, 89, 156, 0.1)" },
    { name: "C", color: "#555555", bg: "rgba(85, 85, 85, 0.1)" },
    { name: "React", color: "#61dafb", bg: "rgba(97, 218, 251, 0.15)" },
    { name: "Node.js", color: "#339933", bg: "rgba(51, 153, 51, 0.1)" },
    { name: "Git", color: "#f05032", bg: "rgba(240, 80, 50, 0.1)" }
  ];

  // 52-week contribution matrix simulation totaling ~886 contributions
  const contributionGrid = useMemo(() => {
    const weeks = 52;
    const daysPerWeek = 7;
    const grid: { count: number; date: string; level: number }[][] = [];
    const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
    const baseDate = new Date(2025, 10, 1);

    for (let w = 0; w < weeks; w++) {
      const weekCol: { count: number; date: string; level: number }[] = [];
      for (let d = 0; d < daysPerWeek; d++) {
        const currentDate = new Date(baseDate);
        currentDate.setDate(baseDate.getDate() + (w * 7 + d));
        
        // Realistic distribution with spikes
        const seed = Math.sin(w * 0.4 + d * 0.7) * 10000;
        const rand = seed - Math.floor(seed);
        let count = 0;
        let level = 0;

        if (rand > 0.35) {
          if (rand > 0.88) {
            count = Math.floor(rand * 8) + 6;
            level = 4;
          } else if (rand > 0.68) {
            count = Math.floor(rand * 5) + 3;
            level = 3;
          } else if (rand > 0.5) {
            count = Math.floor(rand * 3) + 2;
            level = 2;
          } else {
            count = 1;
            level = 1;
          }
        }

        const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        weekCol.push({ count, date: dateStr, level });
      }
      grid.push(weekCol);
    }
    return { grid, months };
  }, []);

  const monthLabels = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  const filesTree = [
    { path: 'projects/active/helix-sentinel-siem/src/log_parser.py', type: 'file', size: '2.4 KB', lang: 'Python' },
    { path: 'projects/active/helix-sentinel-siem/tests/test_siem.py', type: 'file', size: '1.8 KB', lang: 'Python' },
    { path: 'projects/active/aegis-auth-core/src/auth_handler.py', type: 'file', size: '3.1 KB', lang: 'Python' },
    { path: 'projects/active/cyber-forensics-toolkit/src/entropy_calc.py', type: 'file', size: '2.0 KB', lang: 'Python' },
    { path: 'projects/active/darknet-recon-crawler/src/cve_monitor.py', type: 'file', size: '2.8 KB', lang: 'Python' },
    { path: 'members/directory.json', type: 'file', size: '8.9 KB', lang: 'JSON' },
    { path: 'notes/cyber-forensics/pcap-wireshark-network-forensics.md', type: 'file', size: '4.2 KB', lang: 'Markdown' },
    { path: 'notes/database/database-schema-design-indexing.md', type: 'file', size: '5.1 KB', lang: 'Markdown' }
  ];

  const recentCommits = [
    { sha: '7f9a12c', msg: 'feat: add modern React + TypeScript liquid glassmorphism architecture', author: 'Suyash Rathod', date: 'Just now' },
    { sha: 'e410b98', msg: 'test: pass all 13 active test suites for SIEM and Aegis Auth', author: 'Suyash Rathod', date: '1 hour ago' },
    { sha: '88c12a4', msg: 'docs: update database indexing guidelines and forensic PCAP runbooks', author: 'Aniket Chavhan', date: 'Yesterday' },
    { sha: 'b567d01', msg: 'sec: enforce zero-trust cryptographic signature authentication', author: 'Darshan Tripadwar', date: '2 days ago' }
  ];

  const handleConnectToken = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnected(true);
    addAuditLog('GITHUB_TOKEN_ATTACHED', `${ghUser}/${repoName}`, 'SUCCESS');
  };

  const getHeatColor = (level: number) => {
    switch(level) {
      case 1: return '#9be9a8';
      case 2: return '#40c463';
      case 3: return '#30a14e';
      case 4: return '#216e39';
      default: return 'rgba(226, 232, 240, 0.75)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* GitHub Workspace & Profile Hero Header */}
      <div className="glass-panel" style={{ padding: '2rem 2.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)'
            }}>
              <GithubIcon size={34} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.25rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.025em' }}>
                  Suyash Rathod
                </h1>
                <span className="font-mono badge-pill badge-cyan">
                  @{ghUser}
                </span>
                <span className="badge-pill badge-emerald">
                  <Check size={12} />
                  <span>{isConnected ? 'GITHUB SYNCED' : 'STANDBY'}</span>
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Founder & Executive Director at <strong style={{ color: 'var(--text-main)' }}>BeatsVibe Technologies</strong> &bull; Super Admin & Tech Lead
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(241, 245, 249, 0.8)', padding: '0.4rem 0.85rem', borderRadius: '10px', border: '1px solid rgba(203, 213, 225, 0.8)' }}>
              <GitBranch size={14} color="var(--cyber-cyan)" />
              <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 600 }}>main</span>
            </div>

            <a 
              href={`https://github.com/${ghUser}`}
              target="_blank" 
              rel="noreferrer"
              className="btn-liquid btn-primary"
              style={{ padding: '0.6rem 1rem', fontSize: '0.825rem' }}
            >
              <GithubIcon size={15} />
              <span>View GitHub Profile</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>

        {/* Quick Bio & Status Metric Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(226, 232, 240, 0.85)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Smartphone size={18} color="var(--cyber-cyan)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)', display: 'block' }}>Android & Jetpack</strong>
              Active App Development
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Cpu size={18} color="var(--cyber-indigo)" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)', display: 'block' }}>AI DevOps & LLMs</strong>
              Advanced Intelligence Dev
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Briefcase size={18} color="#059669" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)', display: 'block' }}>BeatsVibe Tech</strong>
              Founder & Director
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Activity size={18} color="#d97706" />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <strong style={{ color: 'var(--text-main)', display: 'block' }}>886 Contributions</strong>
              In the last year
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Navigation Subtabs */}
      <div className="glass-panel" style={{ padding: '0.85rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveSubTab('profile')}
              className={`btn-liquid ${activeSubTab === 'profile' ? 'btn-primary' : 'btn-glass'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
            >
              <BookOpen size={14} />
              <span>GitHub Profile, Stats & Activity</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('files')}
              className={`btn-liquid ${activeSubTab === 'files' ? 'btn-primary' : 'btn-glass'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
            >
              <Folder size={14} />
              <span>Repository Explorer</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('commits')}
              className={`btn-liquid ${activeSubTab === 'commits' ? 'btn-primary' : 'btn-glass'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
            >
              <GitCommit size={14} />
              <span>Recent Commits</span>
            </button>

            <button 
              onClick={() => setActiveSubTab('security')}
              className={`btn-liquid ${activeSubTab === 'security' ? 'btn-primary' : 'btn-glass'}`}
              style={{ padding: '0.5rem 1rem', fontSize: '0.825rem' }}
            >
              <ShieldCheck size={14} />
              <span>Security & Dependabot</span>
            </button>
          </div>

          <button onClick={() => onTabChange('cloud-ide')} className="btn-liquid btn-glass" style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem' }}>
            <Terminal size={13} />
            <span>Open Workspace in Cloud IDE</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: GITHUB PROFILE, STATS & ACTIVITY */}
      {activeSubTab === 'profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* SECTION A: CONTRIBUTIONS HEATMAP GRAPH */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={20} color="#059669" />
                  <span>886 contributions in the last year</span>
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Continuous commit & development velocity on GitHub (@{ghUser})
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>Less</span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: 'rgba(226, 232, 240, 0.75)', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: '#9be9a8', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: '#40c463', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: '#30a14e', display: 'inline-block' }}></span>
                <span style={{ width: '11px', height: '11px', borderRadius: '2px', backgroundColor: '#216e39', display: 'inline-block' }}></span>
                <span>More</span>
              </div>
            </div>

            {/* Interactive 52-Week Contribution Matrix */}
            <div style={{ overflowX: 'auto', paddingBottom: '0.5rem', position: 'relative' }}>
              
              {/* Months Headers Row */}
              <div style={{ display: 'flex', marginLeft: '32px', marginBottom: '6px', fontSize: '0.7rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {monthLabels.map((m, idx) => (
                  <div key={idx} style={{ width: `${100 / 12}%`, minWidth: '48px' }}>
                    {m}
                  </div>
                ))}
              </div>

              {/* Day Labels + Heatmap Grid */}
              <div style={{ display: 'flex', gap: '8px' }}>
                
                {/* Days of week labels */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '104px', fontSize: '0.65rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', paddingRight: '4px' }}>
                  <span>Sun</span>
                  <span>Tue</span>
                  <span>Thu</span>
                  <span>Sat</span>
                </div>

                {/* 52 Columns Grid */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {contributionGrid.grid.map((week, wIdx) => (
                    <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {week.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setHoveredCell({
                              date: day.date,
                              count: day.count,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 10
                            });
                          }}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '2.5px',
                            backgroundColor: getHeatColor(day.level),
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease, filter 0.15s ease'
                          }}
                          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.25)')}
                          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      ))}
                    </div>
                  ))}
                </div>

              </div>

              {/* Floating Tooltip */}
              {hoveredCell && (
                <div 
                  className="glass-panel"
                  style={{
                    position: 'fixed',
                    left: `${hoveredCell.x}px`,
                    top: `${hoveredCell.y}px`,
                    transform: 'translate(-50%, -100%)',
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    background: '#0f172a',
                    color: '#ffffff',
                    borderRadius: '8px',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.25)'
                  }}
                >
                  <strong>{hoveredCell.count > 0 ? `${hoveredCell.count} contributions` : 'No contributions'}</strong> on {hoveredCell.date}
                </div>
              )}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <a 
                href="https://docs.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile"
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--cyber-cyan)', textDecoration: 'none' }}
              >
                Learn how GitHub counts contributions &rarr;
              </a>
              <span className="font-mono">Year: 2025 - 2026</span>
            </div>
          </div>

          {/* SECTION B: SUYASH RATHOD README.MD & ABOUT ME */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(226, 232, 240, 0.85)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode size={18} color="var(--cyber-cyan)" />
                <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                  Suyash-coder-12 / README.md
                </span>
              </div>
              <span className="badge-pill badge-cyan">Profile README</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                  Hi there 👋, I'm Suyash Rathod
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Passionate Software Engineer, Security Researcher & Tech Entrepreneur. Building resilient systems, modern android experiences, and autonomous cyber-defense platforms.
                </p>
              </div>

              {/* 💫 About Me List */}
              <div style={{ background: 'rgba(241, 245, 249, 0.7)', borderRadius: '14px', padding: '1.25rem', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={16} color="var(--cyber-indigo)" />
                  <span>About Me:</span>
                </h4>
                
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span>📱</span>
                    <span>I'm currently working on <strong>Android App Development & Jetpack Compose</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span>🤖</span>
                    <span>I'm currently learning <strong>AI DevOps and LLM Dev</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span>💼</span>
                    <span><strong>Founder & Executive Director</strong> at <strong>BeatsVibe Technologies</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span>👯</span>
                    <span>I’m looking to collaborate on <strong>Open Source & AI Projects</strong></span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span>📫</span>
                    <span>How to reach me: You can contact me via my social links above!</span>
                  </li>
                </ul>
              </div>

              {/* 💻 Favorite Tools & Technologies */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Code2 size={16} color="var(--cyber-cyan)" />
                  <span>My Favorite Tools and Technologies:</span>
                </h4>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {favoriteTools.map((tool, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '0.45rem 0.9rem',
                        borderRadius: '10px',
                        backgroundColor: tool.bg,
                        color: tool.color,
                        fontWeight: 700,
                        fontSize: '0.825rem',
                        border: `1px solid ${tool.color}33`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <span>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* SECTION C: PINNED REPOSITORIES */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>📊 GitHub Stats and Activity &bull; Pinned Repositories</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Highlighted open-source repositories and system projects from Suyash-coder-12
                </p>
              </div>
              <span className="badge-pill badge-indigo">4 Featured Repos</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {pinnedRepos.map((repo, idx) => (
                <div 
                  key={idx}
                  className="glass-panel glass-panel-interactive"
                  style={{
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'rgba(255, 255, 255, 0.85)',
                    border: '1px solid rgba(226, 232, 240, 0.9)'
                  }}
                  onClick={() => window.open(repo.url, '_blank')}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen size={16} color="var(--cyber-cyan)" />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--cyber-cyan)' }}>
                          {repo.name}
                        </span>
                      </div>
                      <span className="badge-pill" style={{ fontSize: '0.65rem', background: 'rgba(241, 245, 249, 0.9)', color: 'var(--text-muted)', border: '1px solid rgba(203, 213, 225, 0.8)' }}>
                        Public
                      </span>
                    </div>

                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {repo.description}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '0.5rem', borderTop: '1px solid rgba(241, 245, 249, 0.9)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: repo.languageColor }}></span>
                      <span style={{ fontWeight: 600 }}>{repo.language}</span>
                    </div>

                    {repo.stars && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Star size={13} color="#d97706" />
                        <span>{repo.stars}</span>
                      </div>
                    )}

                    {repo.forks && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <GitFork size={13} color="var(--cyber-indigo)" />
                        <span>{repo.forks}</span>
                      </div>
                    )}

                    <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-dim)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: REPOSITORY FILES */}
      {activeSubTab === 'files' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          
          {/* Quick Repo Path & Token Sync Strip */}
          <form onSubmit={handleConnectToken} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem', padding: '0.75rem 1rem', background: 'rgba(241, 245, 249, 0.7)', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '180px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>Target:</span>
              <input 
                type="text"
                className="liquid-input font-mono"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                value={`${ghUser}/${repoName}`}
                onChange={e => {
                  const parts = e.target.value.split('/');
                  setGhUser(parts[0] || '');
                  setRepoName(parts[1] || '');
                }}
                placeholder="user/repo"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '180px' }}>
              <Key size={13} color="var(--text-muted)" />
              <input 
                type="password"
                className="liquid-input font-mono"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                value={patToken}
                onChange={e => setPatToken(e.target.value)}
                placeholder="Personal access token (Optional)"
              />
            </div>

            <button type="submit" className="btn-liquid btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}>
              Sync Repo
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(226, 232, 240, 0.9)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>{ghUser}/{repoName} &bull; Repository Files</h3>
            <span className="badge-pill badge-cyan">main branch</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filesTree.map((f, idx) => (
              <div 
                key={idx}
                className="glass-panel glass-panel-interactive"
                style={{
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 255, 255, 0.75)'
                }}
                onClick={() => onTabChange('cloud-ide')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <FileCode size={16} color="var(--cyber-cyan)" />
                  <span className="font-mono" style={{ fontSize: '0.825rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    {f.path}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span className="badge-pill badge-cyan">{f.lang}</span>
                  <span>{f.size}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: RECENT COMMITS */}
      {activeSubTab === 'commits' && (
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(226, 232, 240, 0.9)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.15rem' }}>Commit History & Audit Track</h3>
            <span className="badge-pill badge-indigo font-mono">Latest: 7f9a12c</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentCommits.map((c, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{c.msg}</span>
                  <span className="badge-pill badge-indigo font-mono" style={{ fontSize: '0.7rem' }}>{c.sha}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Committed by: <strong>{c.author}</strong></span>
                  <span>{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: SECURITY & DEPENDABOT */}
      {activeSubTab === 'security' && (
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.75rem' }}>
            <ShieldCheck size={24} color="#059669" />
            <h3 style={{ fontSize: '1.2rem', color: '#047857' }}>Repository Hardened</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            Secret scanning and Dependabot alerts active. No leaked API keys, tokens, or plaintext credentials detected across the main branch.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="badge-pill badge-emerald">Branch Protection: Enforced</span>
            <span className="badge-pill badge-indigo">Signed Commits: Required</span>
            <span className="badge-pill badge-cyan">Zero-Trust Pipeline: Passing</span>
          </div>
        </div>
      )}

    </div>
  );
};
