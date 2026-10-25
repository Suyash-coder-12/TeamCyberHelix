import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import type { AiChatMessage, AiProviderConfig } from '../types';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Settings, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Zap 
} from 'lucide-react';

export const NeuroNovaView: React.FC = () => {
  const { currentOperative, addAuditLog } = useAuth();
  
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Greetings, Operative ${currentOperative?.name || 'User'}. I am NeuroNova AI — your autonomous neural defense copilot and systems architect for Team CyberHelix. How may I assist your mission today?`,
      timestamp: '16:24 IST',
      metadata: { model: 'NeuroNova-Quantum-70B', latencyMs: 142 }
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const [aiConfig, setAiConfig] = useState<AiProviderConfig>({
    provider: 'neuronova-core',
    hfApiKey: '',
    hfModel: 'meta-llama/Llama-3-70b-instruct',
    ollamaEndpoint: 'http://localhost:11434/api/generate',
    ollamaModel: 'llama3:latest',
    speechEnabled: true,
    speechPitch: 1.0,
    speechRate: 1.05
  });

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // JARVIS Voice Synthesis
  const speakVoice = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Clean markdown symbols for natural reading
      const cleanText = text.replace(/[*#`_]/g, '').substring(0, 280);
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.pitch = aiConfig.speechPitch;
      utterance.rate = aiConfig.speechRate;
      
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Male')));
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis unavailable', e);
    }
  };

  // JARVIS Voice Dictation (Speech Recognition)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser window.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputPrompt(transcript);
        }
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputPrompt).trim();
    if (!query || isThinking) return;

    const userMsg: AiChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toTimeString().split(' ')[0] + ' IST'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);
    addAuditLog('NEURONOVA_PROMPT_DISPATCHED', query.substring(0, 40), 'INFO');

    // Simulate intelligent neural reasoning
    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('siem') || lower.includes('threat') || lower.includes('brute')) {
        reply = `**[SENTINEL SIEM TELEMETRY ANALYSIS]**\n- **Pattern Detected:** Recurring SSH failed handshakes matching regex r"Failed password for (invalid user )?\\S+ from \\S+".\n- **Mitigation Directive:** Applied dynamic iptables drop rule on subnet 192.168.1.0/24 with an Aegis rate-limiter penalty of 600s.\n- **MITRE ATT&CK Mapping:** T1110 (Brute Force : Credential Stuffing).`;
      } else if (lower.includes('aniket') || lower.includes('sql') || lower.includes('database') || lower.includes('index')) {
        reply = `**[DATABASE ENGINE ADVISORY FOR ANIKET CHAVHAN]**\n- **B-Tree Analysis:** Composite indexing on \`(severity, detected_at)\` reduces seq-scan cost from 124.0 to 1.84ms.\n- **Connection Pool:** PgBouncer transaction-mode pool recommended at max 50 pooled connections per shard to eliminate lock contention.`;
      } else if (lower.includes('ashish') || lower.includes('entropy') || lower.includes('forensic')) {
        reply = `**[DFIR SHANNON ENTROPY ADVISORY FOR ASHISH ADE]**\n- **Formula:** H(X) = -Σ P(x) log₂(P(x)).\n- **Threshold Assessment:** Byte streams scoring > 6.8 indicate high randomized density characteristic of UPX packing, RC4/AES payload wrapping, or polymorphic malware.`;
      } else if (lower.includes('suyash') || lower.includes('admin') || lower.includes('clearance')) {
        reply = `**[GOVERNANCE ADVISORY FOR SUPER ADMIN SUYASH RATHOD]**\n- Super Admin Suyash holds universal Level 5 clearance across all 14 node clusters.\n- Root signature keys are valid and synchronized across Mumbai S1 Alpha, Delhi DB 01, and Bangalore DFIR 01.`;
      } else {
        reply = `**[NEURONOVA INTELLIGENCE RESPONSE]**\nI have evaluated your query: "${query}". All system telemetry parameters confirm operational integrity under DEFCON 2. Would you like me to inspect active SIEM event streams or execute code through the Cloud IDE?`;
      }

      const assistantMsg: AiChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toTimeString().split(' ')[0] + ' IST',
        metadata: { model: 'NeuroNova-Quantum-70B', latencyMs: 312 }
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsThinking(false);
      speakVoice(reply);
      addAuditLog('NEURONOVA_INFERENCE_DELIVERED', 'Response synthesized', 'SUCCESS');
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* JARVIS Holographic Plasma Core Banner */}
      <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        
        {/* Holographic Concentric Animated Rings */}
        <div className="plasma-orb-wrapper">
          <div className="plasma-ring plasma-ring-1"></div>
          <div className="plasma-ring plasma-ring-2"></div>
          <div className="plasma-ring plasma-ring-3"></div>
          <div className="plasma-core">
            <Zap size={32} />
          </div>
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }} className="badge-pill badge-cyan">
            <span className="pulsing-dot" style={{ backgroundColor: '#0284c7' }}></span>
            <span>NEURONOVA AI CORE // JARVIS PROTOCOL ACTIVE</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            NeuroNova Autonomous Defense Intelligence
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Multi-modal conversational AI, security code audit engine, and threat hunting advisor for Team CyberHelix operatives.
          </p>
        </div>

        {/* Audio Wave Visualizer & Controls Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="audio-wave">
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
            <div className="audio-bar"></div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button 
              onClick={() => setSpeechEnabled(!speechEnabled)}
              className="btn-liquid btn-glass"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem' }}
              title={speechEnabled ? "Mute Voice Speech" : "Enable Voice Speech"}
            >
              {speechEnabled ? <Volume2 size={14} color="#059669" /> : <VolumeX size={14} color="var(--text-dim)" />}
              <span>{speechEnabled ? 'Voice: On' : 'Voice: Muted'}</span>
            </button>

            <button 
              onClick={() => setShowConfigModal(true)}
              className="btn-liquid btn-glass"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.75rem' }}
            >
              <Settings size={14} />
              <span>Model Config</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Prompt Suggestion Chips */}
      <div style={{ display: 'flex', gap: '0.65rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        <button 
          onClick={() => handleSendMessage("Audit SIEM threat logs for SSH brute-force anomalies")}
          className="btn-liquid btn-glass"
          style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', flexShrink: 0 }}
        >
          <Sparkles size={12} color="var(--cyber-cyan)" />
          <span>Audit SSH Brute Force</span>
        </button>

        <button 
          onClick={() => handleSendMessage("Analyze PostgreSQL B-Tree indexing on siem_threat_events")}
          className="btn-liquid btn-glass"
          style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', flexShrink: 0 }}
        >
          <Cpu size={12} color="var(--cyber-indigo)" />
          <span>PostgreSQL Index Advisor (Aniket)</span>
        </button>

        <button 
          onClick={() => handleSendMessage("Explain Shannon entropy formula for malware packing")}
          className="btn-liquid btn-glass"
          style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', flexShrink: 0 }}
        >
          <Terminal size={12} color="#059669" />
          <span>Shannon Entropy Formula (Ashish)</span>
        </button>

        <button 
          onClick={() => handleSendMessage("Verify Aegis Zero-Trust cryptographic HMAC signature")}
          className="btn-liquid btn-glass"
          style={{ fontSize: '0.75rem', padding: '0.45rem 0.85rem', flexShrink: 0 }}
        >
          <ShieldCheck size={12} color="#d97706" />
          <span>Aegis Zero-Trust Specs</span>
        </button>
      </div>

      {/* Chat Messages Console */}
      <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '480px' }}>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem' }}>
          {messages.map(msg => (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                gap: '0.75rem',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%'
              }}
            >
              {msg.role === 'assistant' && (
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
              )}

              <div 
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '16px',
                  background: msg.role === 'user' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : 'rgba(255, 255, 255, 0.9)',
                  color: msg.role === 'user' ? '#ffffff' : 'var(--text-main)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(226, 232, 240, 0.9)',
                  boxShadow: 'var(--shadow-liquid-sm)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap'
                }}
              >
                {msg.content}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                  fontSize: '0.675rem',
                  color: msg.role === 'user' ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-dim)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  <span>{msg.timestamp}</span>
                  {msg.metadata?.latencyMs && (
                    <span>{msg.metadata.model} &bull; {msg.metadata.latencyMs}ms</span>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <img 
                  src={currentOperative?.avatar} 
                  alt={currentOperative?.name}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, border: '1px solid rgba(2, 132, 199, 0.4)' }}
                />
              )}
            </div>
          ))}

          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Bot size={18} />
              </div>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.9)', border: '1px solid rgba(226, 232, 240, 0.9)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                NeuroNova is synthesizing neural response...
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(226, 232, 240, 0.9)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button"
            onClick={toggleListening}
            className={`btn-liquid ${isListening ? 'btn-danger' : 'btn-glass'}`}
            style={{ padding: '0.75rem', borderRadius: '12px' }}
            title="Speech-to-Text Voice Dictation"
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <input 
            type="text"
            className="liquid-input"
            value={inputPrompt}
            onChange={e => setInputPrompt(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Ask NeuroNova AI a question, request code audit, or give a voice command..."
          />

          <button 
            type="button"
            onClick={() => handleSendMessage()}
            className="btn-liquid btn-primary"
            disabled={isThinking || !inputPrompt.trim()}
            style={{ padding: '0.75rem 1.25rem' }}
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </div>
      </div>

      {/* Model Config Modal */}
      {showConfigModal && (
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
          <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>NeuroNova AI Engine Configuration</h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Select neural model provider, connect Hugging Face tokens, or bind to local Ollama GGUF endpoints.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                  Inference Provider
                </label>
                <select 
                  className="liquid-input"
                  value={aiConfig.provider}
                  onChange={e => setAiConfig(prev => ({ ...prev, provider: e.target.value as any }))}
                >
                  <option value="neuronova-core">NeuroNova Embedded Neural Core (Ultra Fast)</option>
                  <option value="huggingface">Hugging Face Inference API</option>
                  <option value="ollama-local">Local Ollama / GGUF Server</option>
                </select>
              </div>

              {aiConfig.provider === 'huggingface' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                      Hugging Face API Token
                    </label>
                    <input 
                      type="password"
                      className="liquid-input font-mono"
                      value={aiConfig.hfApiKey}
                      onChange={e => setAiConfig(prev => ({ ...prev, hfApiKey: e.target.value }))}
                      placeholder="hf_..."
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                      Model Name
                    </label>
                    <input 
                      type="text"
                      className="liquid-input font-mono"
                      value={aiConfig.hfModel}
                      onChange={e => setAiConfig(prev => ({ ...prev, hfModel: e.target.value }))}
                    />
                  </div>
                </>
              )}

              {aiConfig.provider === 'ollama-local' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                      Ollama Endpoint
                    </label>
                    <input 
                      type="text"
                      className="liquid-input font-mono"
                      value={aiConfig.ollamaEndpoint}
                      onChange={e => setAiConfig(prev => ({ ...prev, ollamaEndpoint: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                      Local Model Name
                    </label>
                    <input 
                      type="text"
                      className="liquid-input font-mono"
                      value={aiConfig.ollamaModel}
                      onChange={e => setAiConfig(prev => ({ ...prev, ollamaModel: e.target.value }))}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                <button type="button" onClick={() => setShowConfigModal(false)} className="btn-liquid btn-primary">
                  Apply Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
