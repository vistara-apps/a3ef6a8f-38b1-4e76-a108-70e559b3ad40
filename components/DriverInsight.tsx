'use client';

import { DriverPsychology } from '@/lib/types';
import { getPsychologyColor } from '@/lib/utils';
import { Brain, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface DriverInsightProps {
  psychology: DriverPsychology;
  driverName: string;
  variant?: 'positive' | 'warning';
}

export function DriverInsight({ 
  psychology, 
  driverName,
  variant = 'positive' 
}: DriverInsightProps) {
  const getTrendIcon = () => {
    switch (psychology.formTrend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'border-orange-500/30 bg-orange-500/5';
      default:
        return 'border-gray-700/50 bg-surface/30';
    }
  };

  return (
    <div className={`rounded-lg p-4 border ${getVariantStyles()}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <span className="font-medium text-text-primary">{driverName}</span>
        </div>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-sm px-2 py-1 rounded-full bg-surface ${getPsychologyColor(psychology.mentalState)}`}>
            {psychology.mentalState}
          </span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-text-secondary">Risk Tolerance</span>
            <span className="text-xs text-text-primary font-medium">{psychology.riskTolerance}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${psychology.riskTolerance}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-text-secondary">Consistency</span>
            <span className="text-xs text-text-primary font-medium">{psychology.consistency}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-blue-500"
              style={{ width: `${psychology.consistency}%` }}
            />
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-2">
        <h6 className="text-xs font-medium text-text-secondary uppercase tracking-wide">
          Key Insights
        </h6>
        <div className="space-y-1">
          {psychology.insights.slice(0, 2).map((insight, index) => (
            <div key={index} className="flex items-start space-x-2">
              <div className="w-1 h-1 bg-accent rounded-full mt-2 flex-shrink-0" />
              <span className="text-xs text-text-primary">{insight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Warning for high-risk drivers */}
      {psychology.riskTolerance > 85 && psychology.consistency < 80 && (
        <div className="mt-3 flex items-center space-x-2 p-2 bg-orange-500/10 rounded border border-orange-500/20">
          <AlertTriangle className="w-4 h-4 text-orange-400" />
          <span className="text-xs text-orange-400">High risk, variable performance</span>
        </div>
      )}
    </div>
  );
}
