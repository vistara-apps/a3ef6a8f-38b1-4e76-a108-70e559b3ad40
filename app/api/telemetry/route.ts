import { NextRequest, NextResponse } from 'next/server';
import { TelemetryData } from '@/lib/types';

// Mock telemetry data generator - In production, this would connect to F1 live timing APIs
function generateLiveTelemetry(driverId: string): TelemetryData {
  const baseSpeed = 280 + Math.random() * 50;
  const baseRpm = 10000 + Math.random() * 2000;
  
  return {
    speed: Math.floor(baseSpeed),
    rpm: Math.floor(baseRpm),
    gear: Math.floor(Math.random() * 8) + 1,
    throttle: Math.floor(Math.random() * 100),
    brake: Math.floor(Math.random() * 100),
    drs: Math.random() > 0.7,
    lapTime: `1:${(23 + Math.random() * 3).toFixed(3)}`,
    sector1: `${(28 + Math.random() * 2).toFixed(3)}`,
    sector2: `${(29 + Math.random() * 2).toFixed(3)}`,
    sector3: `${(25 + Math.random() * 2).toFixed(3)}`
  };
}

// Generate historical telemetry data for charts
function generateHistoricalData(driverId: string, laps: number = 20) {
  return Array.from({ length: laps }, (_, i) => ({
    lap: i + 1,
    lapTime: 83 + Math.random() * 3,
    speed: Math.floor(Math.random() * 50) + 280,
    position: Math.floor(Math.random() * 3) + 1,
    tireWear: Math.min(100, (i + 1) * 2 + Math.random() * 5),
    fuelLoad: Math.max(0, 100 - (i + 1) * 1.5),
    timestamp: new Date(Date.now() - (laps - i) * 90000).toISOString()
  }));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const driverId = searchParams.get('driverId') || '1';
    const type = searchParams.get('type') || 'live'; // 'live' or 'historical'
    const laps = parseInt(searchParams.get('laps') || '20');
    
    if (type === 'historical') {
      const historicalData = generateHistoricalData(driverId, laps);
      
      return NextResponse.json({
        success: true,
        data: {
          driverId,
          type: 'historical',
          laps: historicalData
        },
        timestamp: new Date().toISOString()
      });
    }
    
    // Live telemetry data
    const liveTelemetry = generateLiveTelemetry(driverId);
    
    return NextResponse.json({
      success: true,
      data: {
        driverId,
        type: 'live',
        telemetry: liveTelemetry
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Telemetry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch telemetry data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { driverIds, type = 'live' } = body;
    
    if (!driverIds || !Array.isArray(driverIds)) {
      return NextResponse.json(
        { success: false, error: 'Invalid driverIds array' },
        { status: 400 }
      );
    }
    
    // Batch telemetry data for multiple drivers
    const telemetryResults = driverIds.map(driverId => {
      if (type === 'historical') {
        return {
          driverId,
          type: 'historical',
          data: generateHistoricalData(driverId, 10) // Shorter for batch requests
        };
      }
      
      return {
        driverId,
        type: 'live',
        data: generateLiveTelemetry(driverId)
      };
    });
    
    return NextResponse.json({
      success: true,
      data: telemetryResults,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Telemetry batch API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch batch telemetry data' },
      { status: 500 }
    );
  }
}

// WebSocket endpoint for real-time telemetry streaming
// In production, this would be implemented using WebSocket or Server-Sent Events
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { driverId, subscribe } = body;
    
    if (subscribe) {
      // In production, this would:
      // 1. Establish WebSocket connection
      // 2. Subscribe to F1 live timing feed
      // 3. Stream real-time telemetry data
      
      return NextResponse.json({
        success: true,
        message: 'Subscribed to live telemetry stream',
        driverId,
        streamUrl: `/api/telemetry/stream?driverId=${driverId}` // Mock stream URL
      });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Unsubscribed from telemetry stream',
      driverId
    });
  } catch (error) {
    console.error('Telemetry stream API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to manage telemetry stream' },
      { status: 500 }
    );
  }
}
