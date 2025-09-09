import { NextRequest, NextResponse } from 'next/server';

// Frame metadata for Farcaster
const frameMetadata = {
  title: 'ApexPredict - F1 Race Winner Predictions',
  description: 'Outsmart the Podium: Real-time F1 Race Winner Predictions',
  image: '/api/frame/image',
  buttons: [
    { label: 'View Detailed Prediction', action: 'post', target: '/api/frame/prediction' },
    { label: 'Get Next Race', action: 'post', target: '/api/frame/next-race' },
    { label: 'Subscribe Premium', action: 'post', target: '/api/frame/subscribe' }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'home';
    
    // Generate Frame HTML with proper meta tags
    const frameHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${frameMetadata.title}</title>
  <meta name="description" content="${frameMetadata.description}">
  
  <!-- Frame Meta Tags -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:title" content="${frameMetadata.title}">
  <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.image}">
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
  
  <!-- Frame Buttons -->
  <meta property="fc:frame:button:1" content="${frameMetadata.buttons[0].label}">
  <meta property="fc:frame:button:1:action" content="${frameMetadata.buttons[0].action}">
  <meta property="fc:frame:button:1:target" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.buttons[0].target}">
  
  <meta property="fc:frame:button:2" content="${frameMetadata.buttons[1].label}">
  <meta property="fc:frame:button:2:action" content="${frameMetadata.buttons[1].action}">
  <meta property="fc:frame:button:2:target" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.buttons[1].target}">
  
  <meta property="fc:frame:button:3" content="${frameMetadata.buttons[2].label}">
  <meta property="fc:frame:button:3:action" content="${frameMetadata.buttons[2].action}">
  <meta property="fc:frame:button:3:target" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.buttons[2].target}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${frameMetadata.title}">
  <meta property="og:description" content="${frameMetadata.description}">
  <meta property="og:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.image}">
  <meta property="og:type" content="website">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${frameMetadata.title}">
  <meta name="twitter:description" content="${frameMetadata.description}">
  <meta name="twitter:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${frameMetadata.image}">
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; font-family: Arial, sans-serif;">
    <h1 style="font-size: 2.5rem; margin-bottom: 1rem; text-align: center;">🏎️ ApexPredict</h1>
    <p style="font-size: 1.2rem; margin-bottom: 2rem; text-align: center; max-width: 600px;">
      Outsmart the Podium with AI-powered F1 race winner predictions
    </p>
    <div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem; text-align: center;">
      <h2 style="margin-bottom: 1rem;">Current Race Prediction</h2>
      <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">🏆 Max Verstappen</div>
      <div style="font-size: 1rem; opacity: 0.8;">Confidence: 87%</div>
    </div>
    <p style="margin-top: 2rem; opacity: 0.7;">
      Click the buttons above to interact with the frame
    </p>
  </div>
</body>
</html>`;
    
    return new NextResponse(frameHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Frame GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate frame' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { untrustedData, trustedData } = body;
    
    // Validate frame interaction
    if (!untrustedData || !untrustedData.buttonIndex) {
      return NextResponse.json(
        { success: false, error: 'Invalid frame interaction' },
        { status: 400 }
      );
    }
    
    const buttonIndex = untrustedData.buttonIndex;
    const fid = untrustedData.fid; // Farcaster ID
    
    // Handle different button actions
    let responseImage = '/api/frame/image';
    let responseButtons = frameMetadata.buttons;
    let responseTitle = frameMetadata.title;
    
    switch (buttonIndex) {
      case 1: // View Detailed Prediction
        responseImage = '/api/frame/image?view=detailed';
        responseTitle = 'Detailed F1 Prediction';
        responseButtons = [
          { label: '← Back to Home', action: 'post', target: '/api/frame' },
          { label: 'Psychology Insights', action: 'post', target: '/api/frame/psychology' },
          { label: 'Pit Strategy', action: 'post', target: '/api/frame/strategy' }
        ];
        break;
        
      case 2: // Get Next Race
        responseImage = '/api/frame/image?view=next-race';
        responseTitle = 'Next Race Prediction';
        responseButtons = [
          { label: '← Back to Home', action: 'post', target: '/api/frame' },
          { label: 'Subscribe for More', action: 'post', target: '/api/frame/subscribe' }
        ];
        break;
        
      case 3: // Subscribe Premium
        responseImage = '/api/frame/image?view=subscribe';
        responseTitle = 'ApexPredict Premium';
        responseButtons = [
          { label: '← Back to Home', action: 'post', target: '/api/frame' },
          { label: 'Weekly $4.99', action: 'post', target: '/api/frame/payment?plan=weekly' },
          { label: 'Monthly $14.99', action: 'post', target: '/api/frame/payment?plan=monthly' }
        ];
        break;
    }
    
    // Generate response frame HTML
    const responseHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${responseTitle}</title>
  
  <!-- Frame Meta Tags -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:title" content="${responseTitle}">
  <meta property="fc:frame:image" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${responseImage}">
  <meta property="fc:frame:image:aspect_ratio" content="1.91:1">
  
  ${responseButtons.map((button, index) => `
  <meta property="fc:frame:button:${index + 1}" content="${button.label}">
  <meta property="fc:frame:button:${index + 1}:action" content="${button.action}">
  <meta property="fc:frame:button:${index + 1}:target" content="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${button.target}">
  `).join('')}
</head>
<body>
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: linear-gradient(135deg, #1a1a2e, #16213e); color: white; font-family: Arial, sans-serif;">
    <h1 style="font-size: 2rem; margin-bottom: 1rem; text-align: center;">${responseTitle}</h1>
    <p style="text-align: center; opacity: 0.8;">Frame interaction processed successfully</p>
  </div>
</body>
</html>`;
    
    return new NextResponse(responseHtml, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Frame POST API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process frame interaction' },
      { status: 500 }
    );
  }
}
