import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export async function POST(req: Request) {
  try {
    const { userId } = auth()
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
      // Create Lemon Squeezy checkout
      const checkoutUrl = await createCheckout(userId)
      return NextResponse.json({ checkoutUrl })
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

async function createCheckout(userId: string): Promise<string> {
  // TODO: Implement Lemon Squeezy checkout creation
  // This is a placeholder
  return `https://checkout.lemonsqueezy.com/buy/${process.env.LEMONSQUEEZY_VARIANT_ID}?checkout[custom][user_id]=${userId}`
}
