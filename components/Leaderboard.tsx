'use client';

import { Driver } from '@/lib/types';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaderboardProps {
  drivers: Driver[];
  showPositionChange?: boolean;
}

export function Leaderboard({ drivers, showPositionChange = true }: LeaderboardProps) {
  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-black';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-black';
      default:
        return 'bg-surface text-text-primary';
    }
  };

  const getPositionIcon = (position: number) => {
    if (position <= 3) {
      return <Trophy className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-f1-red" />
        <h3 className="text-xl font-semibold text-text-primary">Current Standings</h3>
      </div>

      <div className="space-y-3">
        {drivers.map((driver, index) => (
          <div 
            key={driver.id}
            className="flex items-center justify-between p-3 bg-surface/30 rounded-lg hover:bg-surface/50 transition-all duration-200"
          >
            <div className="flex items-center space-x-4">
              {/* Position */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getPositionColor(driver.currentPosition || index + 1)}`}>
                {getPositionIcon(driver.currentPosition || index + 1) || (driver.currentPosition || index + 1)}
              </div>

              {/* Driver Info */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-f1-blue rounded-full flex items-center justify-center text-white font-bold">
                  {driver.number}
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{driver.name}</div>
                  <div className="text-sm text-text-secondary">{driver.team}</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-6">
              {driver.lapTime && (
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary">{driver.lapTime}</div>
                  <div className="text-xs text-text-secondary">Best Lap</div>
                </div>
              )}
              
              {driver.gap && (
                <div className="text-right">
                  <div className="text-sm font-medium text-accent">{driver.gap}</div>
                  <div className="text-xs text-text-secondary">Gap</div>
                </div>
              )}

              {showPositionChange && (
                <div className="flex items-center space-x-1">
                  {Math.random() > 0.5 ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : Math.random() > 0.5 ? (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  ) : (
                    <Minus className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
