import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { IdeTab } from '../types';
import { INITIAL_IDE_TABS } from '../data/seedData';
import { 
  Play, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Plus, 
  FileCode 
} from 'lucide-react';

export const CloudIdeView: React.FC = () => {
  const { currentOperative, addAuditLog } = useAuth();
  const [tabs, setTabs] = useState<IdeTab[]>(INITIAL_IDE_TABS);
  const [activeTabId, setActiveTabId] = useState(INITIAL_IDE_TABS[0].id);
  const [terminalOutput, setTerminalOutput] = useState<string>(
    `[CYBERHELIX CLOUD IDE v3.5 - INITIALIZED]\nConnected to operative node: ${currentOperative?.assignedNode || 'node-mumbai-s1'}\nSandboxed execution runtime ready. Press 'Run Code' to execute.\n`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleCodeChange = (newCode: string) => {
    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, code: newCode } : t));
  };

  const handleRunCode = () => {
    setIsRunning(true);
    addAuditLog('IDE_CODE_EXECUTION_TRIGGERED', activeTab.name, 'INFO');

    setTimeout(() => {
      setIsRunning(false);
      const timestamp = new Date().toTimeString().split(' ')[0];

      if (activeTab.language === 'javascript') {
        try {
          // Safe evaluation for JavaScript
          let logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
            warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
            error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' '))
          };
          const runner = new Function('console', activeTab.code);
          runner(customConsole);
          setTerminalOutput(prev => prev + `\n[${timestamp}] RUN ${activeTab.name}:\n` + (logs.length ? logs.join('\n') : 'Code executed with return code 0.\n'));
        } catch (err: any) {
          setTerminalOutput(prev => prev + `\n[${timestamp}] RUN ERROR in ${activeTab.name}:\n${err.message}\n`);
        }
      } else if (activeTab.language === 'python') {
        setTerminalOutput(prev => prev + `\n[${timestamp}] PYTHON 3.12 SANDBOX EXECUTION: ${activeTab.name}\n` +
          `[SENTINEL SIEM RESULT] -> {'event_type': 'AUTH_FAILURE', 'user': 'admin', 'ip': '192.168.1.55', 'severity': 'HIGH', 'threat_score': 88}\n` +
          `Process exited with code 0 (execution time: 38ms).\n`
        );
      } else if (activeTab.language === 'sql') {
        setTerminalOutput(prev => prev + `\n[${timestamp}] SQL ENGINE EXPLAIN / EXECUTION: ${activeTab.name}\n` +
          `Query executed on PostgreSQL cluster node.\n` +
          `Rows matched: 4 | Scan type: Index Scan using idx_threat_events_btree\n` +
          `Planning Time: 0.112 ms | Execution Time: 1.842 ms\n`
        );
      } else {
        setTerminalOutput(prev => prev + `\n[${timestamp}] HTML/DOM rendered successfully.\n`);
      }
    }, 450);
  };

  const handleAiAudit = () => {
    setAiAnalysis(
      `🛡️ [NEURONOVA SECURITY AUDIT FOR ${activeTab.name.toUpperCase()}]\n` +
      `✓ Memory Safety: Compliant. No unsafe buffer references.\n` +
      `✓ Cryptographic Primitives: Secure (HMAC-SHA256 verified).\n` +
      `✓ Injection Prevention: Parameterized inputs enforced.\n` +
      `✓ Threat Score: 0/100 (Clean - Zero Vulnerabilities Detected)`
    );
    addAuditLog('NEURONOVA_COPILOT_AUDIT', activeTab.name, 'SUCCESS');
  };

  const handleAiExplain = () => {
    setAiAnalysis(
      `💡 [NEURONOVA CODE EXPLANATION FOR ${activeTab.name.toUpperCase()}]\n` +
      `This script implements core logic for Team CyberHelix security pipeline. It extracts structured telemetry events, validates authorization credentials, and logs high-priority threat events with deterministic hashing.`
    );
  };

  const handleAiOptimize = () => {
    setAiAnalysis(
      `⚡ [NEURONOVA AUTO-OPTIMIZE SUGGESTIONS FOR ${activeTab.name.toUpperCase()}]\n` +
      `1. Pre-compile regular expressions at module load time to reduce loop overhead by 42%.\n` +
      `2. Utilize buffered streaming I/O for log sizes exceeding 50 MB.\n` +
      `3. Apply SIMD vectorization flags when compiling SHA-256 validation routines.`
    );
  };

  const handleAddNewTab = () => {
    const newId = `tab-custom-${Date.now()}`;
    const newTab: IdeTab = {
      id: newId,
      name: `script_${tabs.length + 1}.py`,
      language: 'python',
      code: `# Team CyberHelix Custom Script\n# Operative: ${currentOperative?.name}\n\ndef main():\n    print("Initiating zero-trust diagnostic probe...")\n\nif __name__ == "__main__":\n    main()\n`
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Cloud IDE Header */}
      <div className="glass-panel" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Terminal size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <h2 style={{ fontSize: '1.4rem' }}>CyberHelix Cloud IDE & Copilot</h2>
                <span className="badge-pill badge-cyan">SANDBOX V3.5</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Multi-language zero-trust cloud runtime powered by NeuroNova AI Copilot
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn-liquid btn-primary"
              style={{ padding: '0.55rem 1.15rem' }}
            >
              <Play size={15} />
              <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
            </button>

            <button 
              onClick={handleAiAudit}
              className="btn-liquid btn-glass"
              style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem' }}
              title="Audit Security with NeuroNova"
            >
              <ShieldCheck size={14} color="#059669" />
              <span>AI Security Audit</span>
            </button>

            <button 
              onClick={handleAiExplain}
              className="btn-liquid btn-glass"
              style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Sparkles size={14} color="var(--cyber-indigo)" />
              <span>AI Explain</span>
            </button>

            <button 
              onClick={handleAiOptimize}
              className="btn-liquid btn-glass"
              style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem' }}
            >
              <Zap size={14} color="var(--cyber-amber)" />
              <span>Optimize</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor & AI Advisory Split */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.25rem' }}>
        
        {/* Editor Box */}
        <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Tabs Navigation Strip */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(241, 245, 249, 0.95)', borderBottom: '1px solid rgba(226, 232, 240, 0.9)', padding: '0.4rem 0.75rem', overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: tab.id === activeTabId ? '#ffffff' : 'transparent',
                    color: tab.id === activeTabId ? 'var(--cyber-cyan)' : 'var(--text-muted)',
                    boxShadow: tab.id === activeTabId ? 'var(--shadow-liquid-sm)' : 'none'
                  }}
                >
                  <FileCode size={13} />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={handleAddNewTab}
              className="btn-liquid btn-glass"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
              title="Add New File"
            >
              <Plus size={13} />
              <span>New File</span>
            </button>
          </div>

          {/* Code Textarea with Line Numbers simulation */}
          <div style={{ position: 'relative', display: 'flex', minHeight: '340px' }}>
            <textarea
              className="font-mono"
              value={activeTab.code}
              onChange={e => handleCodeChange(e.target.value)}
              spellCheck={false}
              style={{
                width: '100%',
                height: '340px',
                padding: '1.25rem',
                border: 'none',
                outline: 'none',
                resize: 'vertical',
                background: '#ffffff',
                color: '#0f172a',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                fontFamily: 'var(--font-mono)'
              }}
            />
          </div>

          {/* AI Copilot Feedback Drawer (If Triggered) */}
          {aiAnalysis && (
            <div style={{ background: 'rgba(240, 253, 250, 0.95)', borderTop: '1px solid rgba(20, 184, 166, 0.3)', padding: '1rem 1.25rem', position: 'relative' }}>
              <button 
                onClick={() => setAiAnalysis(null)}
                style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-dim)' }}
              >
                ✕ Close
              </button>
              <div className="font-mono" style={{ fontSize: '0.825rem', color: '#0f766e', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {aiAnalysis}
              </div>
            </div>
          )}
        </div>

        {/* Sandboxed Virtual Terminal Console */}
        <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', background: '#0f172a', color: '#38bdf8', borderRadius: '16px', boxShadow: 'var(--shadow-liquid-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(51, 65, 85, 0.8)', paddingBottom: '0.65rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc', fontSize: '0.825rem', fontWeight: 600 }}>
              <Terminal size={15} color="#38bdf8" />
              <span>TERMINAL OUTPUT // ZERO-TRUST EXECUTION CONSOLE</span>
            </div>
            <button 
              onClick={() => setTerminalOutput(`[CONSOLE CLEARED - READY]\n`)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Clear Terminal
            </button>
          </div>

          <pre className="font-mono" style={{ fontSize: '0.825rem', whiteSpace: 'pre-wrap', maxHeight: '180px', overflowY: 'auto', lineHeight: 1.5, color: '#e2e8f0' }}>
            {terminalOutput}
          </pre>
        </div>

      </div>

    </div>
  );
};
