'use client';

import { RaceSession } from '@/lib/types';
import { MapPin, Clock, Users, Flag } from 'lucide-react';

interface RaceHeaderProps {
  session: RaceSession;
}

export function RaceHeader({ session }: RaceHeaderProps) {
  const getStatusColor = () => {
    switch (session.status) {
      case 'live':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'upcoming':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'completed':
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = () => {
    switch (session.status) {
      case 'live':
        return <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />;
      case 'upcoming':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <Flag className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-f1-red to-primary rounded-lg">
            <Flag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{session.name}</h1>
            <div className="flex items-center space-x-2 text-text-secondary">
              <MapPin className="w-4 h-4" />
              <span>{session.location}</span>
            </div>
          </div>
        </div>
        
        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm font-medium capitalize">{session.status}</span>
        </div>
      </div>

      {session.status === 'live' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{session.currentLap}</div>
            <p className="text-xs text-text-secondary">Current Lap</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{session.totalLaps}</div>
            <p className="text-xs text-text-secondary">Total Laps</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-f1-blue">{session.timeRemaining}</div>
            <p className="text-xs text-text-secondary">Time Remaining</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {session.currentLap && session.totalLaps ? 
                Math.round((session.currentLap / session.totalLaps) * 100) : 0}%
            </div>
            <p className="text-xs text-text-secondary">Race Progress</p>
          </div>
        </div>
      )}

      {session.status === 'upcoming' && (
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary mb-2">
            Race starts {session.date.toLocaleDateString()} at {session.date.toLocaleTimeString()}
          </div>
          <div className="text-sm text-text-secondary">
            Get ready for the ultimate F1 prediction experience
          </div>
        </div>
      )}
    </div>
  );
}
