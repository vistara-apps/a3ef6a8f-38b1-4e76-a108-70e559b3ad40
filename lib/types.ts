export interface Prediction {
  raceId: string;
  timestamp: Date;
  predictedWinner: Driver;
  confidenceScore: number;
  driverPsychologySignals: DriverPsychology[];
  pitStrategySuggestion: PitStrategy;
  weatherImpact: WeatherImpact;
  trackConditions: TrackConditions;
}

export interface User {
  userId: string;
  farcasterId?: string;
  subscriptionStatus: 'free' | 'premium' | 'expired';
  purchaseHistory: Purchase[];
}

export interface Driver {
  id: string;
  name: string;
  team: string;
  number: number;
  nationality: string;
  avatar?: string;
  currentPosition?: number;
  lapTime?: string;
  gap?: string;
}

export interface DriverPsychology {
  driverId: string;
  mentalState: 'confident' | 'pressured' | 'aggressive' | 'cautious';
  formTrend: 'improving' | 'declining' | 'stable';
  riskTolerance: number; // 0-100
  consistency: number; // 0-100
  insights: string[];
}

export interface PitStrategy {
  recommendedStops: number;
  optimalLaps: number[];
  tireCompounds: ('soft' | 'medium' | 'hard')[];
  estimatedTimeGain: number;
  riskLevel: 'low' | 'medium' | 'high';
  reasoning: string;
}

export interface WeatherImpact {
  currentConditions: string;
  forecast: string;
  rainProbability: number;
  temperature: number;
  windSpeed: number;
  impactOnRace: 'minimal' | 'moderate' | 'significant';
  favoredDrivers: string[];
}

export interface TrackConditions {
  surface: 'dry' | 'damp' | 'wet';
  grip: number; // 0-100
  temperature: number;
  evolution: 'improving' | 'degrading' | 'stable';
}

export interface Purchase {
  id: string;
  type: 'prediction' | 'subscription';
  amount: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}

export interface TelemetryData {
  speed: number;
  rpm: number;
  gear: number;
  throttle: number;
  brake: number;
  drs: boolean;
  lapTime: string;
  sector1: string;
  sector2: string;
  sector3: string;
}

export interface RaceSession {
  id: string;
  name: string;
  location: string;
  date: Date;
  status: 'upcoming' | 'live' | 'completed';
  currentLap?: number;
  totalLaps?: number;
  timeRemaining?: string;
}
