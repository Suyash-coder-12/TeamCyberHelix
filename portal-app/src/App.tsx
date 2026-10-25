import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { PortalTab } from './types';
import { Header } from './components/Header';
import { ZeroTrustBar } from './components/ZeroTrustBar';
import { DashboardView } from './components/DashboardView';
import { PodStationView } from './components/PodStationView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { GitHubWorkspaceView } from './components/GitHubWorkspaceView';
import { NeuroNovaView } from './components/NeuroNovaView';
import { CloudIdeView } from './components/CloudIdeView';
import { LoginPage } from './components/LoginPage';
import { ChangePasswordModal } from './components/ChangePasswordModal';

const MainPortalLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PortalTab>('dashboard');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Animated Continuous Looping Fluid Canvas */}
      <div className="liquid-canvas-bg">
        <div className="liquid-orb liquid-orb-1"></div>
        <div className="liquid-orb liquid-orb-2"></div>
        <div className="liquid-orb liquid-orb-3"></div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Navigation & Header */}
        <Header 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenPasswordModal={() => setIsPasswordModalOpen(true)}
        />

        {/* Dynamic Cryptographic Route & Verification Bar */}
        <ZeroTrustBar />

        {/* Main Tab Content View */}
        <main style={{ flex: 1, paddingBottom: '2.5rem' }}>
          {activeTab === 'dashboard' && <DashboardView onTabChange={setActiveTab} />}
          {activeTab === 'pod-station' && <PodStationView />}
          {activeTab === 'admin-console' && <AdminConsoleView onTabChange={setActiveTab} />}
          {activeTab === 'github' && <GitHubWorkspaceView onTabChange={setActiveTab} />}
          {activeTab === 'neuronova' && <NeuroNovaView />}
          {activeTab === 'cloud-ide' && <CloudIdeView />}
        </main>

        {/* Corporate Footer */}
        <footer className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>TEAM CYBERHELIX &copy; 2026</span>
            <span>&bull;</span>
            <span>Autonomous Cyber Defense & Vulnerability Research Platform</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--cyber-cyan)', fontWeight: 600 }}>Super Admin: Suyash Rathod</span>
            <span>&bull;</span>
            <span>React 19 + TypeScript (Vite)</span>
          </div>
        </footer>
      </div>

      {/* Passphrase Rotation Modal */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />

    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentOperative, session } = useAuth();

  // Sabse pehle login page aana chahiye: if no authenticated operative session, show LoginPage
  if (!currentOperative || !session) {
    return <LoginPage />;
  }

  // Once authenticated, show user's custom platform and dashboard
  return <MainPortalLayout />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
