'use client';

import { PitStrategy } from '@/lib/types';
import { Clock, Zap, AlertCircle, CheckCircle } from 'lucide-react';

interface PitStrategyDisplayProps {
  strategy: PitStrategy;
  variant?: 'basic' | 'detailed';
}

export function PitStrategyDisplay({ 
  strategy, 
  variant = 'basic' 
}: PitStrategyDisplayProps) {
  const getRiskColor = () => {
    switch (strategy.riskLevel) {
      case 'low':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'high':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getRiskIcon = () => {
    switch (strategy.riskLevel) {
      case 'low':
        return <CheckCircle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'high':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTireColor = (compound: string) => {
    switch (compound) {
      case 'soft':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'hard':
        return 'bg-gray-300';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="glass-card p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-f1-red" />
          <h4 className="font-semibold text-text-primary">Pit Strategy</h4>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded border text-xs ${getRiskColor()}`}>
          {getRiskIcon()}
          <span className="capitalize">{strategy.riskLevel} Risk</span>
        </div>
      </div>

      {/* Strategy Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{strategy.recommendedStops}</div>
          <p className="text-xs text-text-secondary">Pit Stops</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">+{strategy.estimatedTimeGain}s</div>
          <p className="text-xs text-text-secondary">Time Gain</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-f1-blue">{strategy.optimalLaps.length}</div>
          <p className="text-xs text-text-secondary">Windows</p>
        </div>
      </div>

      {/* Pit Windows */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-text-primary">Optimal Pit Windows</h5>
        <div className="space-y-2">
          {strategy.optimalLaps.map((lap, index) => (
            <div key={index} className="flex items-center justify-between bg-surface/30 rounded p-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-text-primary">Lap {lap}</span>
                <div className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded-full ${getTireColor(strategy.tireCompounds[index])}`} />
                  <span className="text-xs text-text-secondary capitalize">
                    {strategy.tireCompounds[index]}
                  </span>
                </div>
              </div>
              <span className="text-xs text-accent">Stop {index + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      {variant === 'detailed' && (
        <div className="space-y-3 pt-3 border-t border-gray-700/50">
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Strategy Reasoning</h5>
            <p className="text-xs text-text-secondary leading-relaxed">
              {strategy.reasoning}
            </p>
          </div>

          {/* Tire Compound Legend */}
          <div>
            <h5 className="text-sm font-medium text-text-primary mb-2">Tire Compounds</h5>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-xs text-text-secondary">Soft</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-xs text-text-secondary">Medium</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-gray-300" />
                <span className="text-xs text-text-secondary">Hard</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
