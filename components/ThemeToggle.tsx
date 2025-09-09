'use client';

import React, { useState } from 'react';
import { Sun, Moon, Monitor, Zap } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';
import { Theme } from '@/lib/theme-types';

interface ThemeToggleProps {
  variant?: 'compact' | 'expanded';
  showLabel?: boolean;
}

export function ThemeToggle({ variant = 'compact', showLabel = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes: Array<{ value: Theme; label: string; icon: React.ComponentType<any> }> = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const CurrentIcon = currentTheme.icon;

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 rounded-lg bg-surface/80 backdrop-blur-md border border-border/50 
                     hover:bg-surface-hover/80 hover:border-accent/30 transition-all duration-300
                     hover:shadow-neon group"
          aria-label="Toggle theme"
        >
          <CurrentIcon className="w-5 h-5 text-text-primary group-hover:text-accent transition-colors duration-300" />
          
          {/* Neon glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute right-0 top-full mt-2 z-50 min-w-[140px] 
                            bg-surface/95 backdrop-blur-lg border border-border/50 rounded-lg 
                            shadow-card-hover overflow-hidden animate-theme-transition">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                const isActive = theme === themeOption.value;
                
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      setTheme(themeOption.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200
                               hover:bg-surface-hover/80 hover:text-accent
                               ${isActive ? 'bg-accent/10 text-accent border-r-2 border-accent' : 'text-text-primary'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{themeOption.label}</span>
                    {isActive && (
                      <Zap className="w-3 h-3 ml-auto text-accent animate-pulse-neon" />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  // Expanded variant - toggle switch style
  return (
    <div className="flex items-center space-x-3">
      {showLabel && (
        <span className="text-sm font-medium text-text-secondary">
          Theme
        </span>
      )}
      
      <div className="relative">
        {/* Toggle switch background */}
        <div className={`w-16 h-8 rounded-full border border-border/50 transition-all duration-300 cursor-pointer
                        ${resolvedTheme === 'dark' 
                          ? 'bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border-accent/30' 
                          : 'bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30'
                        }`}
             onClick={() => {
               const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
               setTheme(nextTheme);
             }}>
          
          {/* Toggle switch handle */}
          <div className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 transform
                          ${resolvedTheme === 'dark' 
                            ? 'translate-x-9 bg-gradient-to-r from-neon-cyan to-neon-purple shadow-neon' 
                            : 'translate-x-1 bg-gradient-to-r from-primary to-accent shadow-lg'
                          }`}>
            
            {/* Icon inside handle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CurrentIcon className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        
        {/* Theme indicator dots */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {themes.map((themeOption, index) => (
            <div
              key={themeOption.value}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300
                         ${theme === themeOption.value 
                           ? 'bg-accent shadow-neon scale-125' 
                           : 'bg-text-muted/30'
                         }`}
            />
          ))}
        </div>
      </div>
      
      {showLabel && (
        <span className="text-xs text-text-muted capitalize min-w-[50px]">
          {theme === 'system' ? resolvedTheme : theme}
        </span>
      )}
    </div>
  );
}
