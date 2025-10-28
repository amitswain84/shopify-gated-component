import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'
import { 
  verifyWebhookSignature, 
  mapSubscriptionStatus, 
  extractUserIdFromWebhook 
} from '@/lib/lemonsqueezy'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-signature')

    // Verify webhook signature
    if (!verifyWebhookSignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventName = event.meta.event_name

    console.log('Lemon Squeezy webhook received:', eventName)

    switch (eventName) {
      case 'order_created':
        // Handle one-time purchases
        await handleOrderCreated(event.data)
        break
      case 'subscription_created':
      case 'subscription_updated':
        await handleSubscriptionUpdate(event.data)
        break
      case 'subscription_cancelled':
        await handleSubscriptionCancellation(event.data)
        break
      case 'subscription_expired':
        await handleSubscriptionExpiration(event.data)
        break
      case 'subscription_payment_success':
        // Verify payment and ensure subscription is active
        await handlePaymentSuccess(event.data)
        break
      case 'subscription_payment_failed':
        await handlePaymentFailed(event.data)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleOrderCreated(data: any) {
  const { attributes, id } = data
  const userId = extractUserIdFromWebhook(data)

  if (!userId) {
    console.error('No user_id found in order webhook')
    return
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    console.error(`User not found for clerkId: ${userId}`)
    return
  }

  // For one-time purchases, create a subscription with PAID status
  if (attributes.status === 'paid') {
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        plan: 'PAID',
        status: 'ACTIVE',
        lemonSqueezyId: id,
        variantId: attributes.first_order_item?.variant_id?.toString(),
        customerId: attributes.customer_id?.toString(),
      },
      create: {
        userId: user.id,
        plan: 'PAID',
        status: 'ACTIVE',
        lemonSqueezyId: id,
        variantId: attributes.first_order_item?.variant_id?.toString(),
        customerId: attributes.customer_id?.toString(),
      },
    })
    console.log(`Order created and subscription activated for user: ${userId}`)
  }
}

async function handleSubscriptionUpdate(data: any) {
  const { attributes, id } = data
  const userId = extractUserIdFromWebhook(data)

  if (!userId) {
    console.error('No user_id found in subscription webhook')
    return
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    console.error(`User not found for clerkId: ${userId}`)
    return
  }

  const status = mapSubscriptionStatus(attributes.status)
  const isPaid = status === 'ACTIVE'

  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      plan: isPaid ? 'PAID' : 'FREE',
      status: status as any,
      lemonSqueezyId: id,
      variantId: attributes.variant_id?.toString(),
      customerId: attributes.customer_id?.toString(),
      renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
      endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
    },
    create: {
      userId: user.id,
      plan: isPaid ? 'PAID' : 'FREE',
      status: status as any,
      lemonSqueezyId: id,
      variantId: attributes.variant_id?.toString(),
      customerId: attributes.customer_id?.toString(),
      renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
      endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
    },
  })
  console.log(`Subscription updated for user: ${userId}, status: ${status}`)
}

async function handleSubscriptionCancellation(data: any) {
  const { id, attributes } = data

  try {
    await prisma.subscription.update({
      where: { lemonSqueezyId: id },
      data: {
        status: 'CANCELLED',
        endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
      },
    })
    console.log(`Subscription cancelled: ${id}`)
  } catch (error) {
    console.error(`Failed to cancel subscription ${id}:`, error)
  }
}

async function handleSubscriptionExpiration(data: any) {
  const { id } = data

  try {
    await prisma.subscription.update({
      where: { lemonSqueezyId: id },
      data: {
        status: 'EXPIRED',
        plan: 'FREE',
      },
    })
    console.log(`Subscription expired: ${id}`)
  } catch (error) {
    console.error(`Failed to expire subscription ${id}:`, error)
  }
}

async function handlePaymentSuccess(data: any) {
  const { id, attributes } = data

  try {
    // Ensure subscription is active after successful payment
    await prisma.subscription.update({
      where: { lemonSqueezyId: id },
      data: {
        status: 'ACTIVE',
        plan: 'PAID',
        renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
      },
    })
    console.log(`Payment successful for subscription: ${id}`)
  } catch (error) {
    console.error(`Failed to process payment success for ${id}:`, error)
  }
}

async function handlePaymentFailed(data: any) {
  const { id } = data

  try {
    await prisma.subscription.update({
      where: { lemonSqueezyId: id },
      data: {
        status: 'PAST_DUE',
      },
    })
    console.log(`Payment failed for subscription: ${id}`)
  } catch (error) {
    console.error(`Failed to process payment failure for ${id}:`, error)
  }
}

