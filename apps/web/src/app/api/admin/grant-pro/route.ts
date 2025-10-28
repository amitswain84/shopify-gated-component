import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'

// Temporary API to manually grant PRO access for testing
export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Manually granting PRO access to user:', userId)

    // Find or create user
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: '', // Will be populated from Clerk
        onboardingComplete: true,
      },
    })

    // Grant PRO subscription
    const subscription = await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        plan: 'PAID',
        status: 'ACTIVE',
      },
      create: {
        userId: user.id,
        plan: 'PAID',
        status: 'ACTIVE',
      },
    })

    console.log('✅ PRO access granted:', {
      userId: user.id,
      clerkId: userId,
      plan: subscription.plan,
      status: subscription.status,
    })

    return NextResponse.json({
      success: true,
      message: 'PRO access granted!',
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
      },
    })
  } catch (error) {
    console.error('Error granting PRO access:', error)
    return NextResponse.json(
      { error: 'Failed to grant PRO access' },
      { status: 500 }
    )
  }
}
