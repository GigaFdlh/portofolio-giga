import React from 'react';

export const LogoGKF = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gkf-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2dd4bf" /> {/* teal-400 */}
        <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    
    {/* Frame Hexagon Tech (Background) */}
    <path 
      d="M50 5 L95 27.5 V72.5 L50 95 L5 72.5 V27.5 L50 5Z" 
      stroke="url(#gkf-gradient)" 
      strokeWidth="2"
      fill="none"
      opacity="0.3"
    />

    {/* Huruf G (Sisi Kiri & Bawah) */}
    <path 
      d="M60 25 H35 L25 35 V65 L35 75 H65" 
      stroke="url(#gkf-gradient)" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#glow)"
    />

    {/* Huruf K & F (Bagian Tengah & Kanan) */}
    <path 
      d="M35 50 H55 M55 50 L70 30 M55 50 L70 70" 
      stroke="url(#gkf-gradient)" 
      strokeWidth="6" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      filter="url(#glow)"
    />

    {/* Aksen Dot (Tech Node) */}
    <circle cx="25" cy="35" r="3" fill="#2dd4bf" />
    <circle cx="25" cy="65" r="3" fill="#2dd4bf" />
    <circle cx="70" cy="30" r="3" fill="#3b82f6" />
    <circle cx="70" cy="70" r="3" fill="#3b82f6" />
  </svg>
);