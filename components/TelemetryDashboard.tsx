'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { generateMockTelemetry } from '@/lib/utils';
import { Activity, Gauge, Zap, Timer } from 'lucide-react';

export function TelemetryDashboard() {
  const [telemetryData, setTelemetryData] = useState(generateMockTelemetry());
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateMockTelemetry();
      setTelemetryData(newData);
      
      setHistoricalData(prev => {
        const updated = [...prev, { 
          time: Date.now(), 
          speed: newData.speed,
          rpm: newData.rpm,
          throttle: newData.throttle,
          brake: newData.brake
        }];
        return updated.slice(-20); // Keep last 20 data points
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Live Telemetry Cards */}
      <div className="telemetry-grid">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Gauge className="w-5 h-5 text-f1-blue" />
              <span className="text-sm font-medium text-text-primary">Speed</span>
            </div>
            <span className="text-xs text-text-secondary">km/h</span>
          </div>
          <div className="text-2xl font-bold text-f1-blue">{telemetryData.speed}</div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-f1-blue to-primary transition-all duration-300"
              style={{ width: `${(telemetryData.speed / 350) * 100}%` }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-f1-red" />
              <span className="text-sm font-medium text-text-primary">RPM</span>
            </div>
            <span className="text-xs text-text-secondary">x1000</span>
          </div>
          <div className="text-2xl font-bold text-f1-red">{(telemetryData.rpm / 1000).toFixed(1)}</div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-f1-red to-orange-500 transition-all duration-300"
              style={{ width: `${(telemetryData.rpm / 15000) * 100}%` }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-text-primary">Throttle</span>
            </div>
            <span className="text-xs text-text-secondary">%</span>
          </div>
          <div className="text-2xl font-bold text-accent">{telemetryData.throttle}</div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-accent to-green-600 transition-all duration-300"
              style={{ width: `${telemetryData.throttle}%` }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Timer className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium text-text-primary">Lap Time</span>
            </div>
            <span className="text-xs text-text-secondary">current</span>
          </div>
          <div className="text-2xl font-bold text-yellow-400">{telemetryData.lapTime}</div>
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>S1: {telemetryData.sector1}</span>
            <span>S2: {telemetryData.sector2}</span>
            <span>S3: {telemetryData.sector3}</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-red-500 rounded" />
              <span className="text-sm font-medium text-text-primary">Brake</span>
            </div>
            <span className="text-xs text-text-secondary">%</span>
          </div>
          <div className="text-2xl font-bold text-red-400">{telemetryData.brake}</div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
              style={{ width: `${telemetryData.brake}%` }}
            />
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-purple-500 rounded" />
              <span className="text-sm font-medium text-text-primary">Gear</span>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${telemetryData.drs ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
              {telemetryData.drs ? 'DRS' : 'NO DRS'}
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-400">{telemetryData.gear}</div>
          <div className="flex space-x-1 mt-2">
            {Array.from({ length: 8 }, (_, i) => (
              <div 
                key={i}
                className={`h-1 flex-1 rounded ${i < telemetryData.gear ? 'bg-purple-500' : 'bg-gray-700'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Historical Charts */}
      {historicalData.length > 5 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Speed History</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="#0090ff" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card p-4">
            <h4 className="text-lg font-semibold text-text-primary mb-4">Throttle vs Brake</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={historicalData.slice(-10)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" hide />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="throttle" fill="#10B981" />
                <Bar dataKey="brake" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
