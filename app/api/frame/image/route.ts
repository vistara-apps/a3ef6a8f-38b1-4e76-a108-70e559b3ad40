import { NextRequest, NextResponse } from 'next/server';

// Mock data for frame images
const mockPredictionData = {
  currentRace: {
    name: 'Abu Dhabi Grand Prix',
    location: 'Yas Marina Circuit',
    predictedWinner: 'Max Verstappen',
    confidence: 87,
    team: 'Red Bull Racing'
  },
  nextRace: {
    name: 'Bahrain Grand Prix',
    location: 'Bahrain International Circuit',
    predictedWinner: 'Charles Leclerc',
    confidence: 82,
    team: 'Ferrari'
  }
};

// Generate SVG image for Frame
function generateFrameImage(view: string = 'home') {
  const width = 1200;
  const height = 630; // 1.91:1 aspect ratio
  
  let content = '';
  let title = 'ApexPredict';
  let subtitle = 'AI-Powered F1 Predictions';
  
  switch (view) {
    case 'detailed':
      title = 'Detailed Prediction';
      subtitle = `${mockPredictionData.currentRace.predictedWinner} - ${mockPredictionData.currentRace.confidence}% Confidence`;
      content = `
        <rect x="100" y="200" width="1000" height="300" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="600" y="250" text-anchor="middle" fill="white" font-size="32" font-weight="bold">🏆 ${mockPredictionData.currentRace.predictedWinner}</text>
        <text x="600" y="290" text-anchor="middle" fill="#4ade80" font-size="24">${mockPredictionData.currentRace.team}</text>
        <text x="600" y="330" text-anchor="middle" fill="#60a5fa" font-size="28">Confidence: ${mockPredictionData.currentRace.confidence}%</text>
        <text x="600" y="370" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="20">${mockPredictionData.currentRace.name}</text>
        <text x="600" y="400" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="18">${mockPredictionData.currentRace.location}</text>
        
        <!-- Confidence Bar -->
        <rect x="300" y="420" width="600" height="20" rx="10" fill="rgba(255,255,255,0.2)"/>
        <rect x="300" y="420" width="${600 * (mockPredictionData.currentRace.confidence / 100)}" height="20" rx="10" fill="url(#confidenceGradient)"/>
      `;
      break;
      
    case 'next-race':
      title = 'Next Race Prediction';
      subtitle = `${mockPredictionData.nextRace.predictedWinner} - ${mockPredictionData.nextRace.confidence}% Confidence`;
      content = `
        <rect x="100" y="200" width="1000" height="300" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="600" y="240" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="20">NEXT RACE</text>
        <text x="600" y="280" text-anchor="middle" fill="white" font-size="32" font-weight="bold">🏆 ${mockPredictionData.nextRace.predictedWinner}</text>
        <text x="600" y="320" text-anchor="middle" fill="#ef4444" font-size="24">${mockPredictionData.nextRace.team}</text>
        <text x="600" y="360" text-anchor="middle" fill="#60a5fa" font-size="28">Confidence: ${mockPredictionData.nextRace.confidence}%</text>
        <text x="600" y="400" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="20">${mockPredictionData.nextRace.name}</text>
        <text x="600" y="430" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="18">${mockPredictionData.nextRace.location}</text>
      `;
      break;
      
    case 'subscribe':
      title = 'ApexPredict Premium';
      subtitle = 'Unlock Advanced Predictions';
      content = `
        <rect x="150" y="180" width="400" height="280" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="350" y="220" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Weekly Plan</text>
        <text x="350" y="260" text-anchor="middle" fill="#4ade80" font-size="36" font-weight="bold">$4.99</text>
        <text x="350" y="290" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Unlimited predictions</text>
        <text x="350" y="315" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Driver psychology</text>
        <text x="350" y="340" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Pit strategy insights</text>
        <text x="350" y="365" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Weather analysis</text>
        
        <rect x="650" y="180" width="400" height="280" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="850" y="220" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Monthly Plan</text>
        <text x="850" y="260" text-anchor="middle" fill="#60a5fa" font-size="36" font-weight="bold">$14.99</text>
        <text x="850" y="290" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Everything in Weekly</text>
        <text x="850" y="315" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Historical data</text>
        <text x="850" y="340" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Advanced analytics</text>
        <text x="850" y="365" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="16">• Priority support</text>
      `;
      break;
      
    default: // home
      content = `
        <rect x="200" y="200" width="800" height="250" rx="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <text x="600" y="250" text-anchor="middle" fill="white" font-size="28" font-weight="bold">Current Race Prediction</text>
        <text x="600" y="300" text-anchor="middle" fill="white" font-size="40" font-weight="bold">🏆 ${mockPredictionData.currentRace.predictedWinner}</text>
        <text x="600" y="340" text-anchor="middle" fill="#4ade80" font-size="24">${mockPredictionData.currentRace.team}</text>
        <text x="600" y="380" text-anchor="middle" fill="#60a5fa" font-size="32">Confidence: ${mockPredictionData.currentRace.confidence}%</text>
        <text x="600" y="420" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="18">${mockPredictionData.currentRace.name}</text>
      `;
  }
  
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#16213e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#4ade80;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#backgroundGradient)"/>
  
  <!-- Header -->
  <text x="600" y="80" text-anchor="middle" fill="white" font-size="48" font-weight="bold">${title}</text>
  <text x="600" y="120" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-size="24">${subtitle}</text>
  
  <!-- Content -->
  ${content}
  
  <!-- Footer -->
  <text x="600" y="580" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="16">Powered by ApexPredict AI</text>
</svg>`;
  
  return svg;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view') || 'home';
    
    const svgImage = generateFrameImage(view);
    
    return new NextResponse(svgImage, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Frame image API error:', error);
    
    // Return a simple error image
    const errorSvg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1a1a2e"/>
  <text x="600" y="315" text-anchor="middle" fill="white" font-size="32">Error generating image</text>
</svg>`;
    
    return new NextResponse(errorSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache',
      },
    });
  }
}
