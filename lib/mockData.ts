import { Driver, Prediction, DriverPsychology, PitStrategy, WeatherImpact, TrackConditions, RaceSession } from './types';

export const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'Max Verstappen',
    team: 'Red Bull Racing',
    number: 1,
    nationality: 'NED',
    currentPosition: 1,
    lapTime: '1:23.456',
    gap: 'Leader'
  },
  {
    id: '2',
    name: 'Lewis Hamilton',
    team: 'Mercedes',
    number: 44,
    nationality: 'GBR',
    currentPosition: 2,
    lapTime: '1:23.789',
    gap: '+2.345'
  },
  {
    id: '3',
    name: 'Charles Leclerc',
    team: 'Ferrari',
    number: 16,
    nationality: 'MON',
    currentPosition: 3,
    lapTime: '1:24.123',
    gap: '+5.678'
  },
  {
    id: '4',
    name: 'Lando Norris',
    team: 'McLaren',
    number: 4,
    nationality: 'GBR',
    currentPosition: 4,
    lapTime: '1:24.456',
    gap: '+8.901'
  },
  {
    id: '5',
    name: 'George Russell',
    team: 'Mercedes',
    number: 63,
    nationality: 'GBR',
    currentPosition: 5,
    lapTime: '1:24.789',
    gap: '+12.234'
  }
];

export const mockPsychologySignals: DriverPsychology[] = [
  {
    driverId: '1',
    mentalState: 'confident',
    formTrend: 'stable',
    riskTolerance: 85,
    consistency: 92,
    insights: [
      'Maintaining optimal racing line consistency',
      'Showing aggressive overtaking patterns',
      'High confidence in car setup'
    ]
  },
  {
    driverId: '2',
    mentalState: 'pressured',
    formTrend: 'improving',
    riskTolerance: 75,
    consistency: 88,
    insights: [
      'Pushing harder in sector 2',
      'Slight increase in braking points',
      'Adapting well to track evolution'
    ]
  },
  {
    driverId: '3',
    mentalState: 'aggressive',
    formTrend: 'declining',
    riskTolerance: 90,
    consistency: 78,
    insights: [
      'Taking more risks in corners',
      'Inconsistent sector times',
      'Fighting car balance issues'
    ]
  }
];

export const mockPitStrategy: PitStrategy = {
  recommendedStops: 2,
  optimalLaps: [18, 42],
  tireCompounds: ['medium', 'hard'],
  estimatedTimeGain: 3.2,
  riskLevel: 'medium',
  reasoning: 'Two-stop strategy optimal given current tire degradation rates and track position'
};

export const mockWeatherImpact: WeatherImpact = {
  currentConditions: 'Partly Cloudy',
  forecast: '20% chance of rain in final 15 laps',
  rainProbability: 20,
  temperature: 24,
  windSpeed: 12,
  impactOnRace: 'minimal',
  favoredDrivers: ['1', '2']
};

export const mockTrackConditions: TrackConditions = {
  surface: 'dry',
  grip: 85,
  temperature: 42,
  evolution: 'improving'
};

export const mockCurrentSession: RaceSession = {
  id: 'abu-dhabi-2024',
  name: 'Abu Dhabi Grand Prix',
  location: 'Yas Marina Circuit',
  date: new Date('2024-12-08T13:00:00Z'),
  status: 'live',
  currentLap: 35,
  totalLaps: 58,
  timeRemaining: '1:23:45'
};

export const mockPrediction: Prediction = {
  raceId: 'abu-dhabi-2024',
  timestamp: new Date(),
  predictedWinner: mockDrivers[0],
  confidenceScore: 0.87,
  driverPsychologySignals: mockPsychologySignals,
  pitStrategySuggestion: mockPitStrategy,
  weatherImpact: mockWeatherImpact,
  trackConditions: mockTrackConditions
};

export const leaderboardData = [
  { position: 1, driver: 'Max Verstappen', team: 'Red Bull', points: 575, change: 0 },
  { position: 2, driver: 'Lando Norris', team: 'McLaren', points: 356, change: 0 },
  { position: 3, driver: 'Charles Leclerc', team: 'Ferrari', points: 345, change: 0 },
  { position: 4, driver: 'Oscar Piastri', team: 'McLaren', points: 291, change: 1 },
  { position: 5, driver: 'Carlos Sainz', team: 'Ferrari', points: 272, change: -1 },
];

export const telemetryHistory = Array.from({ length: 20 }, (_, i) => ({
  lap: i + 16,
  speed: Math.floor(Math.random() * 50) + 280,
  lapTime: 83 + Math.random() * 3,
  position: Math.floor(Math.random() * 3) + 1,
}));
