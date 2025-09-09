'use client';

import { useState } from 'react';
import { Prediction } from '@/lib/types';
import { formatConfidence, getConfidenceColor } from '@/lib/utils';
import { Trophy, TrendingUp, Clock, Zap } from 'lucide-react';
import { ConfidenceBar } from './ConfidenceBar';

interface PredictionCardProps {
  prediction: Prediction;
  variant?: 'default' | 'expanded';
  onExpand?: () => void;
}

export function PredictionCard({ 
  prediction, 
  variant = 'default',
  onExpand 
}: PredictionCardProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onExpand?.();
  };

  return (
    <div className="glass-card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-f1-red to-primary rounded-lg">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary">Race Winner Prediction</h3>
            <p className="text-sm text-text-secondary">
              {prediction.timestamp.toLocaleDateString()} • Live Analysis
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-yellow-400 font-medium">LIVE</span>
        </div>
      </div>

      {/* Predicted Winner */}
      <div className="bg-surface/50 rounded-lg p-4 border border-border/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-f1-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
              {prediction.predictedWinner.number}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">
                {prediction.predictedWinner.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {prediction.predictedWinner.team}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">
              {formatConfidence(prediction.confidenceScore)}
            </div>
            <p className="text-xs text-text-secondary">Confidence</p>
          </div>
        </div>
        
        <ConfidenceBar 
          score={prediction.confidenceScore} 
          variant="positive"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-accent">
            {prediction.predictedWinner.currentPosition || 'P1'}
          </div>
          <p className="text-xs text-text-secondary">Current Pos</p>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {prediction.predictedWinner.lapTime || '1:23.456'}
          </div>
          <p className="text-xs text-text-secondary">Best Lap</p>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-f1-blue">
            {prediction.pitStrategySuggestion.recommendedStops}
          </div>
          <p className="text-xs text-text-secondary">Pit Stops</p>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={handleToggle}
        className="w-full btn-primary flex items-center justify-center space-x-2"
      >
        <TrendingUp className="w-4 h-4" />
        <span>{isExpanded ? 'Hide Details' : 'View Detailed Analysis'}</span>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-4 pt-4 border-t border-border/50">
          {/* Driver Psychology */}
          <div className="space-y-2">
            <h5 className="font-semibold text-text-primary flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Driver Psychology Signals</span>
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {prediction.driverPsychologySignals.slice(0, 2).map((signal, index) => (
                <div key={index} className="bg-surface-elevated/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {prediction.predictedWinner.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-surface ${
                      signal.mentalState === 'confident' ? 'text-success' :
                      signal.mentalState === 'pressured' ? 'text-error' :
                      signal.mentalState === 'aggressive' ? 'text-warning' :
                      'text-info'
                    }`}>
                      {signal.mentalState}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Risk Tolerance</span>
                      <span className="text-text-primary">{signal.riskTolerance}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-text-secondary">Consistency</span>
                      <span className="text-text-primary">{signal.consistency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Impact */}
          <div className="space-y-2">
            <h5 className="font-semibold text-text-primary flex items-center space-x-2">
              <div className="w-2 h-2 bg-f1-blue rounded-full"></div>
              <span>Weather & Track Impact</span>
            </h5>
            <div className="bg-surface-elevated/30 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Conditions:</span>
                  <span className="ml-2 text-text-primary">{prediction.weatherImpact.currentConditions}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Rain Chance:</span>
                  <span className="ml-2 text-text-primary">{prediction.weatherImpact.rainProbability}%</span>
                </div>
                <div>
                  <span className="text-text-secondary">Temperature:</span>
                  <span className="ml-2 text-text-primary">{prediction.weatherImpact.temperature}°C</span>
                </div>
                <div>
                  <span className="text-text-secondary">Impact:</span>
                  <span className={`ml-2 capitalize ${
                    prediction.weatherImpact.impactOnRace === 'minimal' ? 'text-success' :
                    prediction.weatherImpact.impactOnRace === 'moderate' ? 'text-warning' :
                    'text-error'
                  }`}>
                    {prediction.weatherImpact.impactOnRace}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pit Strategy */}
          <div className="space-y-2">
            <h5 className="font-semibold text-text-primary flex items-center space-x-2">
              <div className="w-2 h-2 bg-f1-red rounded-full"></div>
              <span>Optimal Pit Strategy</span>
            </h5>
            <div className="bg-surface-elevated/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Strategy:</span>
                <span className="text-sm font-medium text-text-primary">
                  {prediction.pitStrategySuggestion.recommendedStops}-stop
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Pit Windows:</span>
                <span className="text-sm text-text-primary">
                  Laps {prediction.pitStrategySuggestion.optimalLaps.join(', ')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Time Gain:</span>
                <span className="text-sm font-medium text-accent">
                  +{prediction.pitStrategySuggestion.estimatedTimeGain}s
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
