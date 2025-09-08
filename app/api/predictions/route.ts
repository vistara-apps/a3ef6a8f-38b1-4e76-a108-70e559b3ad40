import { NextRequest, NextResponse } from 'next/server';
import { Prediction, Driver, DriverPsychology, PitStrategy, WeatherImpact, TrackConditions } from '@/lib/types';

// Mock F1 API data - In production, this would connect to real F1 telemetry APIs
const mockF1Data = {
  drivers: [
    { id: '1', name: 'Max Verstappen', team: 'Red Bull Racing', number: 1, nationality: 'NED' },
    { id: '2', name: 'Lewis Hamilton', team: 'Mercedes', number: 44, nationality: 'GBR' },
    { id: '3', name: 'Charles Leclerc', team: 'Ferrari', number: 16, nationality: 'MON' },
    { id: '4', name: 'Lando Norris', team: 'McLaren', number: 4, nationality: 'GBR' },
    { id: '5', name: 'George Russell', team: 'Mercedes', number: 63, nationality: 'GBR' },
  ],
  telemetryData: {
    lapTimes: { '1': 83.456, '2': 83.789, '3': 84.123, '4': 84.456, '5': 84.789 },
    sectorTimes: {
      '1': { s1: 28.123, s2: 29.456, s3: 25.877 },
      '2': { s1: 28.234, s2: 29.567, s3: 25.988 },
      '3': { s1: 28.345, s2: 29.678, s3: 26.100 },
    },
    tireWear: { '1': 15, '2': 18, '3': 22, '4': 20, '5': 17 },
  }
};

// AI Prediction Algorithm (simplified for demo)
function generatePrediction(raceId: string): Prediction {
  const drivers = mockF1Data.drivers;
  const telemetry = mockF1Data.telemetryData;
  
  // Calculate driver scores based on multiple factors
  const driverScores = drivers.map(driver => {
    const lapTime = telemetry.lapTimes[driver.id] || 85;
    const tireWear = telemetry.tireWear[driver.id] || 20;
    const sectorData = telemetry.sectorTimes[driver.id];
    
    // Scoring algorithm (simplified)
    let score = 100;
    score -= (lapTime - 83) * 10; // Faster lap times = higher score
    score -= tireWear * 0.5; // Less tire wear = higher score
    score += Math.random() * 10 - 5; // Random factor for variability
    
    return { driver, score };
  });
  
  // Sort by score and pick winner
  driverScores.sort((a, b) => b.score - a.score);
  const predictedWinner = driverScores[0].driver;
  const confidenceScore = Math.min(0.95, Math.max(0.65, driverScores[0].score / 100));
  
  // Generate psychology signals
  const psychologySignals: DriverPsychology[] = drivers.slice(0, 3).map(driver => ({
    driverId: driver.id,
    mentalState: ['confident', 'pressured', 'aggressive', 'cautious'][Math.floor(Math.random() * 4)] as any,
    formTrend: ['improving', 'declining', 'stable'][Math.floor(Math.random() * 3)] as any,
    riskTolerance: Math.floor(Math.random() * 40) + 60,
    consistency: Math.floor(Math.random() * 30) + 70,
    insights: [
      'Maintaining optimal racing line consistency',
      'Showing aggressive overtaking patterns',
      'Adapting well to track evolution'
    ]
  }));
  
  // Generate pit strategy
  const pitStrategy: PitStrategy = {
    recommendedStops: Math.floor(Math.random() * 2) + 1,
    optimalLaps: [18, 42],
    tireCompounds: ['medium', 'hard'],
    estimatedTimeGain: Math.random() * 5 + 1,
    riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
    reasoning: 'Optimal strategy based on current tire degradation and track position'
  };
  
  // Generate weather impact
  const weatherImpact: WeatherImpact = {
    currentConditions: 'Partly Cloudy',
    forecast: `${Math.floor(Math.random() * 30)}% chance of rain in final 15 laps`,
    rainProbability: Math.floor(Math.random() * 30),
    temperature: Math.floor(Math.random() * 10) + 20,
    windSpeed: Math.floor(Math.random() * 15) + 5,
    impactOnRace: ['minimal', 'moderate', 'significant'][Math.floor(Math.random() * 3)] as any,
    favoredDrivers: [predictedWinner.id]
  };
  
  // Generate track conditions
  const trackConditions: TrackConditions = {
    surface: 'dry',
    grip: Math.floor(Math.random() * 20) + 80,
    temperature: Math.floor(Math.random() * 20) + 35,
    evolution: ['improving', 'degrading', 'stable'][Math.floor(Math.random() * 3)] as any
  };
  
  return {
    raceId,
    timestamp: new Date(),
    predictedWinner,
    confidenceScore,
    driverPsychologySignals: psychologySignals,
    pitStrategySuggestion: pitStrategy,
    weatherImpact,
    trackConditions
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const raceId = searchParams.get('raceId') || 'abu-dhabi-2024';
    
    // In production, this would:
    // 1. Fetch real-time F1 telemetry data
    // 2. Get weather data from weather APIs
    // 3. Run AI prediction algorithms
    // 4. Store prediction in database
    
    const prediction = generatePrediction(raceId);
    
    return NextResponse.json({
      success: true,
      data: prediction,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate prediction' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { raceId, userId } = body;
    
    if (!raceId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // In production, this would:
    // 1. Validate user subscription/payment
    // 2. Generate personalized prediction
    // 3. Store in database with user association
    // 4. Handle micro-transaction if needed
    
    const prediction = generatePrediction(raceId);
    
    return NextResponse.json({
      success: true,
      data: prediction,
      message: 'Prediction generated successfully'
    });
  } catch (error) {
    console.error('Prediction POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create prediction' },
      { status: 500 }
    );
  }
}
