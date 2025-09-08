import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toFixed(3).padStart(6, '0')}`;
}

export function formatConfidence(score: number): string {
  return `${(score * 100).toFixed(1)}%`;
}

export function getConfidenceColor(score: number): string {
  if (score >= 0.8) return 'from-green-500 to-green-600';
  if (score >= 0.6) return 'from-yellow-500 to-yellow-600';
  if (score >= 0.4) return 'from-orange-500 to-orange-600';
  return 'from-red-500 to-red-600';
}

export function getPsychologyColor(state: string): string {
  switch (state) {
    case 'confident': return 'text-green-400';
    case 'pressured': return 'text-red-400';
    case 'aggressive': return 'text-orange-400';
    case 'cautious': return 'text-blue-400';
    default: return 'text-gray-400';
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function generateMockTelemetry(): any {
  return {
    speed: Math.floor(Math.random() * 100) + 200,
    rpm: Math.floor(Math.random() * 3000) + 10000,
    gear: Math.floor(Math.random() * 8) + 1,
    throttle: Math.floor(Math.random() * 100),
    brake: Math.floor(Math.random() * 100),
    drs: Math.random() > 0.7,
    lapTime: `1:${(Math.random() * 30 + 20).toFixed(3)}`,
    sector1: `${(Math.random() * 10 + 25).toFixed(3)}`,
    sector2: `${(Math.random() * 10 + 30).toFixed(3)}`,
    sector3: `${(Math.random() * 10 + 28).toFixed(3)}`,
  };
}
