'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface DarkModeToggleProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function DarkModeToggle({ variant = 'default', className = '' }: DarkModeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-all duration-200 hover:bg-surface/50 ${className}`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-text-secondary hover:text-text-primary" />
        ) : (
          <Sun className="w-5 h-5 text-text-secondary hover:text-text-primary" />
        )}
      </button>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-text-secondary">Theme:</span>
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center h-8 w-14 rounded-full bg-surface border border-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <span
          className={`inline-block w-6 h-6 transform rounded-full bg-gradient-to-r transition-transform duration-200 ${
            theme === 'dark'
              ? 'translate-x-1 from-primary to-f1-blue'
              : 'translate-x-7 from-yellow-400 to-orange-400'
          }`}
        >
          <span className="flex items-center justify-center w-full h-full">
            {theme === 'dark' ? (
              <Moon className="w-3 h-3 text-white" />
            ) : (
              <Sun className="w-3 h-3 text-white" />
            )}
          </span>
        </span>
      </button>
      <span className="text-sm text-text-secondary capitalize">{theme}</span>
    </div>
  );
}
