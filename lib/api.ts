import { Prediction, User, TelemetryData } from './types';

// API base URL - in production, this would be your deployed URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

// API client class for making requests
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Prediction API methods
  async getPrediction(raceId?: string): Promise<ApiResponse<Prediction>> {
    const params = raceId ? `?raceId=${raceId}` : '';
    return this.request<Prediction>(`/api/predictions${params}`);
  }

  async createPrediction(userId: string, raceId: string): Promise<ApiResponse<Prediction>> {
    return this.request<Prediction>('/api/predictions', {
      method: 'POST',
      body: JSON.stringify({ userId, raceId }),
    });
  }

  // Weather API methods
  async getWeather(location: string, detailed: boolean = false): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({ location, detailed: detailed.toString() });
    return this.request<any>(`/api/weather?${params}`);
  }

  async getBatchWeather(locations: string[]): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/weather', {
      method: 'POST',
      body: JSON.stringify({ locations }),
    });
  }

  // Telemetry API methods
  async getTelemetry(
    driverId: string,
    type: 'live' | 'historical' = 'live',
    laps?: number
  ): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({ driverId, type });
    if (laps) params.append('laps', laps.toString());
    return this.request<any>(`/api/telemetry?${params}`);
  }

  async getBatchTelemetry(
    driverIds: string[],
    type: 'live' | 'historical' = 'live'
  ): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/api/telemetry', {
      method: 'POST',
      body: JSON.stringify({ driverIds, type }),
    });
  }

  async subscribeTelemetryStream(driverId: string): Promise<ApiResponse<any>> {
    return this.request<any>('/api/telemetry', {
      method: 'PUT',
      body: JSON.stringify({ driverId, subscribe: true }),
    });
  }

  // User API methods
  async getUser(userId?: string, farcasterId?: string): Promise<ApiResponse<User>> {
    const params = new URLSearchParams();
    if (userId) params.append('userId', userId);
    if (farcasterId) params.append('farcasterId', farcasterId);
    return this.request<User>(`/api/users?${params}`);
  }

  async createUser(farcasterId: string, subscriptionStatus: 'free' | 'premium' = 'free'): Promise<ApiResponse<User>> {
    return this.request<User>('/api/users', {
      method: 'POST',
      body: JSON.stringify({ farcasterId, subscriptionStatus }),
    });
  }

  async updateUser(
    userId: string,
    updates: {
      subscriptionStatus?: 'free' | 'premium' | 'expired';
      purchase?: {
        type: 'prediction' | 'subscription';
        amount: number;
      };
    }
  ): Promise<ApiResponse<User>> {
    return this.request<User>('/api/users', {
      method: 'PUT',
      body: JSON.stringify({ userId, ...updates }),
    });
  }

  // Payment API methods
  async createPayment(
    userId: string,
    type: 'prediction' | 'subscription',
    amount: number,
    currency: 'USD' | 'ETH' = 'USD',
    walletAddress?: string
  ): Promise<ApiResponse<any>> {
    return this.request<any>('/api/payments', {
      method: 'POST',
      body: JSON.stringify({ userId, type, amount, currency, walletAddress }),
    });
  }

  async getPayment(paymentId: string): Promise<ApiResponse<any>> {
    return this.request<any>(`/api/payments?paymentId=${paymentId}`);
  }

  async getUserPayments(userId: string): Promise<ApiResponse<any[]>> {
    return this.request<any[]>(`/api/payments?userId=${userId}`);
  }

  async updatePaymentStatus(
    paymentId: string,
    status: 'pending' | 'completed' | 'failed',
    transactionHash?: string
  ): Promise<ApiResponse<any>> {
    return this.request<any>('/api/payments', {
      method: 'PUT',
      body: JSON.stringify({ paymentId, status, transactionHash }),
    });
  }

  async refundPayment(paymentId: string, reason?: string): Promise<ApiResponse<any>> {
    const params = new URLSearchParams({ paymentId });
    if (reason) params.append('reason', reason);
    return this.request<any>(`/api/payments?${params}`, {
      method: 'DELETE',
    });
  }
}

// Create and export API client instance
export const apiClient = new ApiClient();

// Convenience functions for common operations
export const api = {
  // Predictions
  getCurrentPrediction: () => apiClient.getPrediction(),
  getRacePrediction: (raceId: string) => apiClient.getPrediction(raceId),
  purchasePrediction: (userId: string, raceId: string) => apiClient.createPrediction(userId, raceId),

  // Weather
  getCurrentWeather: (location: string) => apiClient.getWeather(location),
  getDetailedWeather: (location: string) => apiClient.getWeather(location, true),

  // Telemetry
  getLiveTelemetry: (driverId: string) => apiClient.getTelemetry(driverId, 'live'),
  getHistoricalTelemetry: (driverId: string, laps?: number) => 
    apiClient.getTelemetry(driverId, 'historical', laps),

  // Users
  findUser: (farcasterId: string) => apiClient.getUser(undefined, farcasterId),
  registerUser: (farcasterId: string) => apiClient.createUser(farcasterId),
  upgradeUser: (userId: string) => 
    apiClient.updateUser(userId, { subscriptionStatus: 'premium' }),

  // Payments
  buyPrediction: (userId: string, walletAddress?: string) => 
    apiClient.createPayment(userId, 'prediction', 1.00, 'USD', walletAddress),
  subscribeWeekly: (userId: string, walletAddress?: string) => 
    apiClient.createPayment(userId, 'subscription', 4.99, 'USD', walletAddress),
  subscribeMonthly: (userId: string, walletAddress?: string) => 
    apiClient.createPayment(userId, 'subscription', 14.99, 'USD', walletAddress),
};

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: ApiResponse<any>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Retry utility for failed requests
export async function withRetry<T>(
  fn: () => Promise<ApiResponse<T>>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<ApiResponse<T>> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fn();
      if (result.success) {
        return result;
      }
      lastError = new Error(result.error || 'API request failed');
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
    }

    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Max retries exceeded',
  };
}

// Cache utility for API responses
class ApiCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const apiCache = new ApiCache();
