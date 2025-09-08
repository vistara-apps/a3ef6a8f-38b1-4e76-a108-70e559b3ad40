'use client';

import { getConfidenceColor } from '@/lib/utils';

interface ConfidenceBarProps {
  score: number;
  variant?: 'positive' | 'neutral' | 'negative';
  showLabel?: boolean;
}

export function ConfidenceBar({ 
  score, 
  variant = 'positive',
  showLabel = false 
}: ConfidenceBarProps) {
  const percentage = Math.round(score * 100);
  
  const getVariantColor = () => {
    switch (variant) {
      case 'positive':
        return getConfidenceColor(score);
      case 'neutral':
        return 'from-gray-500 to-gray-600';
      case 'negative':
        return 'from-red-500 to-red-600';
      default:
        return getConfidenceColor(score);
    }
  };

  return (
    <div className="space-y-1">
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`confidence-bar bg-gradient-to-r ${getVariantColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between text-xs text-text-secondary">
          <span>0%</span>
          <span className="text-text-primary font-medium">{percentage}%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
}
