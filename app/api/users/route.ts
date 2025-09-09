import { NextRequest, NextResponse } from 'next/server';
import { User, Purchase } from '@/lib/types';

// Mock user database - In production, use a real database
const mockUsers: Record<string, User> = {
  'user_1': {
    userId: 'user_1',
    farcasterId: 'farcaster_123',
    subscriptionStatus: 'premium',
    purchaseHistory: [
      {
        id: 'purchase_1',
        type: 'subscription',
        amount: 14.99,
        timestamp: new Date('2024-12-01'),
        status: 'completed'
      }
    ]
  },
  'user_2': {
    userId: 'user_2',
    farcasterId: 'farcaster_456',
    subscriptionStatus: 'free',
    purchaseHistory: []
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const farcasterId = searchParams.get('farcasterId');
    
    if (!userId && !farcasterId) {
      return NextResponse.json(
        { success: false, error: 'userId or farcasterId required' },
        { status: 400 }
      );
    }
    
    // Find user by userId or farcasterId
    let user: User | undefined;
    if (userId) {
      user = mockUsers[userId];
    } else if (farcasterId) {
      user = Object.values(mockUsers).find(u => u.farcasterId === farcasterId);
    }
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Users GET API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, subscriptionStatus = 'free' } = body;
    
    if (!farcasterId) {
      return NextResponse.json(
        { success: false, error: 'farcasterId is required' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = Object.values(mockUsers).find(u => u.farcasterId === farcasterId);
    if (existingUser) {
      return NextResponse.json({
        success: true,
        data: existingUser,
        message: 'User already exists'
      });
    }
    
    // Create new user
    const userId = `user_${Date.now()}`;
    const newUser: User = {
      userId,
      farcasterId,
      subscriptionStatus: subscriptionStatus as 'free' | 'premium' | 'expired',
      purchaseHistory: []
    };
    
    mockUsers[userId] = newUser;
    
    return NextResponse.json({
      success: true,
      data: newUser,
      message: 'User created successfully'
    });
  } catch (error) {
    console.error('Users POST API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, subscriptionStatus, purchase } = body;
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }
    
    const user = mockUsers[userId];
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update subscription status
    if (subscriptionStatus) {
      user.subscriptionStatus = subscriptionStatus;
    }
    
    // Add purchase to history
    if (purchase) {
      const newPurchase: Purchase = {
        id: `purchase_${Date.now()}`,
        type: purchase.type,
        amount: purchase.amount,
        timestamp: new Date(),
        status: 'completed'
      };
      user.purchaseHistory.push(newPurchase);
    }
    
    return NextResponse.json({
      success: true,
      data: user,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Users PUT API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'userId is required' },
        { status: 400 }
      );
    }
    
    if (!mockUsers[userId]) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }
    
    delete mockUsers[userId];
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Users DELETE API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
