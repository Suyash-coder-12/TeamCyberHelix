import React from 'react';

interface Props {
  size?: number;
  className?: string;
  glow?: boolean;
}

export const CyberHelixLogo: React.FC<Props> = ({ size = 28, glow = true }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        filter: glow ? 'drop-shadow(0 0 6px rgba(2, 132, 199, 0.45))' : 'none',
        flexShrink: 0
      }}
    >
      <defs>
        <linearGradient id="chLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7"/>
          <stop offset="50%" stopColor="#38bdf8"/>
          <stop offset="100%" stopColor="#4f46e5"/>
        </linearGradient>
        <linearGradient id="chShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a"/>
          <stop offset="100%" stopColor="#1e293b"/>
        </linearGradient>
      </defs>

      {/* Cyber Shield Backdrop */}
      <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#chShieldGrad)" stroke="url(#chLogoGrad)" strokeWidth="2.5" />
      
      {/* Grid Lines */}
      <line x1="16" y1="4" x2="16" y2="60" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1"/>
      <line x1="48" y1="4" x2="48" y2="60" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1"/>
      <line x1="4" y1="32" x2="60" y2="32" stroke="rgba(56, 189, 248, 0.15)" strokeWidth="1"/>

      {/* Intertwined DNA Helix */}
      <path d="M20 18 Q32 26 44 18 Q32 32 20 46 Q32 38 44 46" fill="none" stroke="url(#chLogoGrad)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M44 18 Q32 26 20 18 Q32 32 44 46 Q32 38 20 46" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" />

      {/* Rungs */}
      <line x1="26" y1="21" x2="38" y2="21" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
      <line x1="22" y1="32" x2="42" y2="32" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" opacity="0.9"/>
      <line x1="26" y1="43" x2="38" y2="43" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>

      {/* Central Quantum Node */}
      <circle cx="32" cy="32" r="4.5" fill="#38bdf8"/>
      <circle cx="32" cy="32" r="2" fill="#ffffff"/>

      {/* Active Green Security Status Dot */}
      <circle cx="48" cy="16" r="3" fill="#10b981"/>
    </svg>
  );
};
