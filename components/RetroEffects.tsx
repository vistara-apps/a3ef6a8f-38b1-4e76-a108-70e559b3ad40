'use client';

import React from 'react';

interface RetroEffectsProps {
  variant?: 'subtle' | 'prominent';
  showScanLines?: boolean;
  showGrid?: boolean;
}

export function RetroEffects({ 
  variant = 'subtle', 
  showScanLines = true, 
  showGrid = true 
}: RetroEffectsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Retro grid background */}
      {showGrid && (
        <div className={`absolute inset-0 retro-grid ${
          variant === 'subtle' ? 'opacity-20' : 'opacity-40'
        }`} />
      )}
      
      {/* Scan lines effect */}
      {showScanLines && (
        <div className={`absolute inset-0 ${
          variant === 'subtle' ? 'opacity-10' : 'opacity-20'
        }`}>
          <div className="scan-lines w-full h-full" />
        </div>
      )}
      
      {/* Ambient glow effects */}
      <div className={`absolute inset-0 ${
        variant === 'subtle' ? 'opacity-30' : 'opacity-50'
      }`}>
        {/* Top left glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-neon-cyan/20 via-neon-cyan/10 to-transparent rounded-full blur-3xl" />
        
        {/* Top right glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-neon-purple/20 via-neon-purple/10 to-transparent rounded-full blur-3xl" />
        
        {/* Bottom center glow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-neon-pink/20 via-neon-pink/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      {/* Floating particles (CSS-only) */}
      <div className={`absolute inset-0 ${
        variant === 'subtle' ? 'opacity-20' : 'opacity-40'
      }`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full animate-pulse-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function NeonBorder({ 
  children, 
  className = '',
  variant = 'cyan' 
}: { 
  children: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'purple' | 'pink' | 'multi';
}) {
  const borderClass = variant === 'multi' 
    ? 'border-neon-gradient' 
    : `border-neon-${variant}`;
    
  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 rounded-lg ${borderClass} opacity-50`} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export function GlowText({ 
  children, 
  className = '',
  variant = 'cyan' 
}: { 
  children: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'purple' | 'pink' | 'multi';
}) {
  const textClass = variant === 'multi' 
    ? 'text-neon-gradient' 
    : `text-neon-${variant}`;
    
  return (
    <span className={`${textClass} ${className}`} style={{
      textShadow: variant === 'multi' 
        ? '0 0 10px rgb(103 232 249 / 0.5), 0 0 20px rgb(196 181 253 / 0.3)'
        : `0 0 10px rgb(var(--neon-${variant}) / 0.5)`
    }}>
      {children}
    </span>
  );
}
