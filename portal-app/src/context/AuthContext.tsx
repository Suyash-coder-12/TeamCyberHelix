import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Operative, AuditLog, SessionContext } from '../types';
import { INITIAL_OPERATIVES, INITIAL_AUDIT_LOGS } from '../data/seedData';

interface AuthContextType {
  currentOperative: Operative | null;
  allOperatives: Operative[];
  session: SessionContext | null;
  auditLogs: AuditLog[];
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  switchOperative: (operativeId: string) => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
  adminResetPassword: (operativeId: string, newPass: string) => { success: boolean; message: string };
  addAuditLog: (action: string, target: string, status?: 'SUCCESS' | 'ALERT' | 'INFO') => void;
  impersonatePod: (operativeId: string) => void;
  zeroTrustUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_OPERATIVES = 'cyberhelix_operatives_react_v1';
const STORAGE_KEY_PASSWORDS = 'cyberhelix_passwords_react_v1';
const STORAGE_KEY_SESSION = 'cyberhelix_session_v3';
const STORAGE_KEY_LOGS = 'cyberhelix_logs_react_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initialize Operatives & Passwords
  const [operatives] = useState<Operative[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_OPERATIVES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_OPERATIVES;
  });

  const [passwords, setPasswords] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PASSWORDS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const initPass: Record<string, string> = {};
    INITIAL_OPERATIVES.forEach(op => {
      initPass[op.id] = op.isAdmin ? 'CyberHelix@Admin123!' : 'HelixSec#2026';
    });
    return initPass;
  });

  // 2. Initialize Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_AUDIT_LOGS;
  });

  // 3. Current Session & Authenticated Operative (Requires explicit login)
  const [currentOperative, setCurrentOperative] = useState<Operative | null>(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    if (savedSession) {
      try {
        const parsed: SessionContext = JSON.parse(savedSession);
        const match = operatives.find(o => o.id === parsed.operativeId);
        if (match) return match;
      } catch (e) { /* ignore */ }
    }
    return null; // Require login first
  });

  const [session, setSession] = useState<SessionContext | null>(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    if (savedSession) {
      try {
        const parsed: SessionContext = JSON.parse(savedSession);
        return parsed;
      } catch (e) { /* ignore */ }
    }
    return null; // Require login first
  });

  const [zeroTrustUrl, setZeroTrustUrl] = useState<string>('');

  // Persist state updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OPERATIVES, JSON.stringify(operatives));
  }, [operatives]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PASSWORDS, JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  }, [session]);

  // Synchronize Zero-Trust Cryptographic Route in address bar
  useEffect(() => {
    if (currentOperative && session) {
      const generatedUrl = `#/platform/${currentOperative.id}/${currentOperative.stationSlug}?session=${session.token}&auth_tier=${session.authTier}&cluster=${session.cluster}`;
      setZeroTrustUrl(generatedUrl);
      window.history.replaceState(null, '', generatedUrl);
    }
  }, [currentOperative, session]);

  const addAuditLog = (action: string, target: string, status: 'SUCCESS' | 'ALERT' | 'INFO' = 'SUCCESS') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + ' IST';
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: timeStr,
      actor: currentOperative ? currentOperative.email : 'SYSTEM',
      action,
      target,
      ip: '10.0.12.' + Math.floor(Math.random() * 200 + 10),
      status,
      hash: Math.random().toString(16).substring(2, 15) + '...'
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 49)]);
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; message: string }> => {
    const trimmedEmail = email.trim().toLowerCase();
    const matchedOp = operatives.find(o => o.email.toLowerCase() === trimmedEmail);

    if (!matchedOp) {
      addAuditLog('FAILED_AUTH_UNKNOWN_OPERATIVE', trimmedEmail, 'ALERT');
      return { success: false, message: 'Operative email not registered in CyberHelix directory.' };
    }

    const correctPassword = passwords[matchedOp.id] || 'HelixSec#2026';
    if (pass !== correctPassword) {
      addAuditLog('FAILED_AUTH_BAD_PASSPHRASE', matchedOp.email, 'ALERT');
      return { success: false, message: 'Cryptographic passphrase validation failed.' };
    }

    const newSession: SessionContext = {
      token: `sec_enc_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`,
      operativeId: matchedOp.id,
      authTier: matchedOp.isAdmin ? 'root-l5' : 'core-s1',
      cluster: matchedOp.assignedNode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600 * 1000 * 8
    };

    setCurrentOperative(matchedOp);
    setSession(newSession);
    addAuditLog('ZERO_TRUST_LOGIN_SUCCESS', matchedOp.designation, 'SUCCESS');

    return { success: true, message: `Welcome back, ${matchedOp.name}!` };
  };

  const logout = () => {
    if (currentOperative) {
      addAuditLog('SESSION_TERMINATED', currentOperative.email, 'INFO');
    }
    setCurrentOperative(null);
    setSession(null);
    window.history.replaceState(null, '', '#/gateway/login');
  };

  const switchOperative = (operativeId: string) => {
    const target = operatives.find(o => o.id === operativeId);
    if (!target) return;

    const newSession: SessionContext = {
      token: `sec_enc_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`,
      operativeId: target.id,
      authTier: target.isAdmin ? 'root-l5' : 'core-s1',
      cluster: target.assignedNode,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600 * 1000 * 8
    };

    setCurrentOperative(target);
    setSession(newSession);
    addAuditLog('OPERATIVE_SWITCH_SUCCESS', target.name, 'SUCCESS');
  };

  const impersonatePod = (operativeId: string) => {
    if (!currentOperative?.isAdmin) {
      addAuditLog('UNAUTHORIZED_IMPERSONATION_ATTEMPT', operativeId, 'ALERT');
      alert('Access Denied: Level 5 Administrator authorization required.');
      return;
    }
    switchOperative(operativeId);
  };

  const changePassword = (oldPass: string, newPass: string) => {
    if (!currentOperative) return { success: false, message: 'No active session.' };
    const currentPass = passwords[currentOperative.id] || (currentOperative.isAdmin ? 'CyberHelix@Admin123!' : 'HelixSec#2026');

    if (oldPass !== currentPass) {
      return { success: false, message: 'Current passphrase is incorrect.' };
    }

    if (newPass.length < 8) {
      return { success: false, message: 'New passphrase must be at least 8 characters long.' };
    }

    setPasswords(prev => ({ ...prev, [currentOperative.id]: newPass }));
    addAuditLog('PASSPHRASE_ROTATION_SUCCESS', currentOperative.email, 'SUCCESS');
    return { success: true, message: 'Passphrase successfully rotated.' };
  };

  const adminResetPassword = (operativeId: string, newPass: string) => {
    if (!currentOperative?.isAdmin) {
      return { success: false, message: 'Level 5 Admin authorization required.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'Passphrase must have at least 6 characters.' };
    }

    setPasswords(prev => ({ ...prev, [operativeId]: newPass }));
    addAuditLog('ADMIN_FORCE_PASSWORD_RESET', operativeId, 'SUCCESS');
    return { success: true, message: `Passphrase updated for operative ${operativeId}` };
  };

  return (
    <AuthContext.Provider
      value={{
        currentOperative,
        allOperatives: operatives,
        session,
        auditLogs,
        login,
        logout,
        switchOperative,
        changePassword,
        adminResetPassword,
        addAuditLog,
        impersonatePod,
        zeroTrustUrl
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
