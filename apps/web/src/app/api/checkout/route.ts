import { NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { createCheckoutSession } from '@/lib/lemonsqueezy'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      console.error('Checkout error: No userId from auth')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Creating checkout for user:', userId)

    const user = await currentUser()
    const body = await req.json()
    const { variantId } = body

    const variantIdToUse = variantId || process.env.LEMONSQUEEZY_VARIANT_ID || process.env.LEMONSQUEEZY_VARIANT_ID

    console.log('Using variant ID:', variantIdToUse)

    if (!variantIdToUse || variantIdToUse === 'xxx') {
      console.error('Lemon Squeezy variant ID not configured')
      return NextResponse.json(
        { error: 'Payment system not configured. Please contact support.' },
        { status: 500 }
      )
    }

    const checkoutOptions = {
      variantId: variantIdToUse,
      checkoutData: {
        email: user?.emailAddresses[0]?.emailAddress,
        name: user?.firstName && user?.lastName 
          ? `${user.firstName} ${user.lastName}` 
          : user?.firstName || undefined,
        custom: {
          user_id: userId,
        },
      },
    }

    console.log('Checkout options:', JSON.stringify(checkoutOptions, null, 2))

    // Create checkout session with Lemon Squeezy
    const checkoutUrl = await createCheckoutSession(checkoutOptions)

    console.log('Checkout URL created:', checkoutUrl)

    return NextResponse.json({ checkoutUrl })
  } catch (error) {
    console.error('Checkout creation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Error details:', errorMessage)
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    )
  }
}
