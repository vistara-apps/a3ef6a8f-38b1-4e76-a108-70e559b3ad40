'use client';

import { useEffect, useState } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { PredictionCard } from '@/components/PredictionCard';
import { TelemetryDashboard } from '@/components/TelemetryDashboard';
import { RaceHeader } from '@/components/RaceHeader';
import { Leaderboard } from '@/components/Leaderboard';
import { DriverInsight } from '@/components/DriverInsight';
import { PitStrategyDisplay } from '@/components/PitStrategyDisplay';
import { 
  mockPrediction, 
  mockCurrentSession, 
  mockDrivers, 
  mockPsychologySignals 
} from '@/lib/mockData';
import { Zap, TrendingUp, Brain, Settings2 } from 'lucide-react';
import { DarkModeToggle } from '@/components/DarkModeToggle';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'prediction' | 'telemetry' | 'insights' | 'strategy'>('prediction');

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const tabs = [
    { id: 'prediction', label: 'Prediction', icon: TrendingUp },
    { id: 'telemetry', label: 'Telemetry', icon: Zap },
    { id: 'insights', label: 'Psychology', icon: Brain },
    { id: 'strategy', label: 'Strategy', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-sm border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-f1-red to-primary rounded-lg glow-effect">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">ApexPredict</h1>
                <p className="text-sm text-text-secondary">Outsmart the Podium</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <DarkModeToggle variant="compact" />
              <Wallet>
                <ConnectWallet>
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Race Session Header */}
        <RaceHeader session={mockCurrentSession} />

        {/* Navigation Tabs */}
        <div className="glass-card p-1">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'prediction' && (
              <PredictionCard 
                prediction={mockPrediction} 
                variant="expanded"
              />
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-f1-blue" />
                    <span>Live Telemetry</span>
                  </h2>
                  <TelemetryDashboard />
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-accent" />
                    <span>Driver Psychology Analysis</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockPsychologySignals.map((signal, index) => {
                      const driver = mockDrivers.find(d => d.id === signal.driverId);
                      return (
                        <DriverInsight
                          key={signal.driverId}
                          psychology={signal}
                          driverName={driver?.name || 'Unknown Driver'}
                          variant={signal.mentalState === 'pressured' ? 'warning' : 'positive'}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'strategy' && (
              <div className="space-y-6">
                <PitStrategyDisplay 
                  strategy={mockPrediction.pitStrategySuggestion}
                  variant="detailed"
                />
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Weather Impact Analysis</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-f1-blue">
                        {mockPrediction.weatherImpact.temperature}°C
                      </div>
                      <p className="text-xs text-text-secondary">Track Temp</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {mockPrediction.weatherImpact.rainProbability}%
                      </div>
                      <p className="text-xs text-text-secondary">Rain Chance</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">
                        {mockPrediction.weatherImpact.windSpeed}
                      </div>
                      <p className="text-xs text-text-secondary">Wind (km/h)</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold capitalize ${
                        mockPrediction.weatherImpact.impactOnRace === 'minimal' ? 'text-green-400' :
                        mockPrediction.weatherImpact.impactOnRace === 'moderate' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {mockPrediction.weatherImpact.impactOnRace}
                      </div>
                      <p className="text-xs text-text-secondary">Impact Level</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Leaderboard drivers={mockDrivers.slice(0, 5)} />
            
            {/* Quick Actions */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary">
                  Get Next Race Prediction
                </button>
                <button className="w-full btn-secondary">
                  Subscribe to Premium
                </button>
                <button className="w-full btn-secondary">
                  View Historical Data
                </button>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">AI Confidence</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-2">
                  {Math.round(mockPrediction.confidenceScore * 100)}%
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Current prediction accuracy
                </p>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-accent to-primary transition-all duration-300"
                    style={{ width: `${mockPrediction.confidenceScore * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
