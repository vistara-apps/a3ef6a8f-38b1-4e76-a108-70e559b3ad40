import { NextRequest, NextResponse } from 'next/server';

// Mock weather data - In production, integrate with OpenWeatherMap or similar
const mockWeatherData = {
  'abu-dhabi': {
    current: {
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NE',
      conditions: 'Partly Cloudy',
      visibility: 10,
      pressure: 1013
    },
    forecast: {
      next3Hours: {
        temperature: 26,
        rainProbability: 20,
        conditions: 'Partly Cloudy'
      },
      next6Hours: {
        temperature: 28,
        rainProbability: 15,
        conditions: 'Sunny'
      },
      raceImpact: {
        level: 'minimal',
        description: 'Stable conditions expected throughout the race',
        favoredDrivers: ['1', '2'], // Driver IDs who perform well in these conditions
        strategicImplications: [
          'Tire degradation will be moderate',
          'DRS effectiveness high due to low wind',
          'Track temperature optimal for grip'
        ]
      }
    }
  },
  'silverstone': {
    current: {
      temperature: 18,
      humidity: 78,
      windSpeed: 15,
      windDirection: 'SW',
      conditions: 'Overcast',
      visibility: 8,
      pressure: 1008
    },
    forecast: {
      next3Hours: {
        temperature: 19,
        rainProbability: 45,
        conditions: 'Light Rain'
      },
      next6Hours: {
        temperature: 17,
        rainProbability: 65,
        conditions: 'Moderate Rain'
      },
      raceImpact: {
        level: 'significant',
        description: 'Rain expected during race, strategy crucial',
        favoredDrivers: ['2', '1'], // Hamilton and Verstappen excel in wet conditions
        strategicImplications: [
          'Intermediate tires likely needed',
          'Pit stop timing will be critical',
          'Overtaking opportunities increased'
        ]
      }
    }
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'abu-dhabi';
    const detailed = searchParams.get('detailed') === 'true';
    
    // In production, this would call OpenWeatherMap API:
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    // );
    
    const weatherData = mockWeatherData[location as keyof typeof mockWeatherData] || mockWeatherData['abu-dhabi'];
    
    if (detailed) {
      return NextResponse.json({
        success: true,
        data: weatherData,
        location,
        timestamp: new Date().toISOString()
      });
    }
    
    // Return simplified data for quick access
    return NextResponse.json({
      success: true,
      data: {
        temperature: weatherData.current.temperature,
        conditions: weatherData.current.conditions,
        rainProbability: weatherData.forecast.next3Hours.rainProbability,
        windSpeed: weatherData.current.windSpeed,
        raceImpact: weatherData.forecast.raceImpact.level
      },
      location,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locations } = body;
    
    if (!locations || !Array.isArray(locations)) {
      return NextResponse.json(
        { success: false, error: 'Invalid locations array' },
        { status: 400 }
      );
    }
    
    // Batch weather data for multiple locations
    const weatherResults = locations.map(location => {
      const data = mockWeatherData[location as keyof typeof mockWeatherData] || mockWeatherData['abu-dhabi'];
      return {
        location,
        data: {
          temperature: data.current.temperature,
          conditions: data.current.conditions,
          rainProbability: data.forecast.next3Hours.rainProbability,
          raceImpact: data.forecast.raceImpact.level
        }
      };
    });
    
    return NextResponse.json({
      success: true,
      data: weatherResults,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather batch API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch batch weather data' },
      { status: 500 }
    );
  }
}
