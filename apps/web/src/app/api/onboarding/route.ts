import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { plan } = body

    // Create or update user
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        onboardingComplete: true,
      },
      create: {
        clerkId: userId,
        email: '', // Will be populated from Clerk webhook
        onboardingComplete: true,
      },
    })

    // Create subscription
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        plan: plan,
      },
      create: {
        userId: user.id,
        plan: plan,
      },
    })

    if (plan === 'PAID') {
      // For paid plan, return a flag to trigger checkout on the client
      // The actual checkout will be initiated from the pricing dialog/cards
      return NextResponse.json({ 
        success: true, 
        requiresCheckout: true 
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
