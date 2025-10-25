import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-signature')

    // Verify webhook signature
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const event = JSON.parse(body)
    const eventName = event.meta.event_name

    switch (eventName) {
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

function verifySignature(body: string, signature: string | null): boolean {
  if (!signature) return false
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) return false

  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')
  return signature === digest
}

async function handleSubscriptionUpdate(data: any) {
  const { attributes, id } = data
  const userId = attributes.custom_data?.user_id

  if (!userId) return

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) return

  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      plan: 'PAID',
      status: mapLemonSqueezyStatus(attributes.status),
      lemonSqueezyId: id,
      variantId: attributes.variant_id,
      customerId: attributes.customer_id,
      renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
      endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
    },
    create: {
      userId: user.id,
      plan: 'PAID',
      status: mapLemonSqueezyStatus(attributes.status),
      lemonSqueezyId: id,
      variantId: attributes.variant_id,
      customerId: attributes.customer_id,
      renewsAt: attributes.renews_at ? new Date(attributes.renews_at) : null,
      endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
    },
  })
}

async function handleSubscriptionCancellation(data: any) {
  const { id, attributes } = data

  await prisma.subscription.update({
    where: { lemonSqueezyId: id },
    data: {
      status: 'CANCELLED',
      endsAt: attributes.ends_at ? new Date(attributes.ends_at) : null,
    },
  })
}

async function handleSubscriptionExpiration(data: any) {
  const { id } = data

  await prisma.subscription.update({
    where: { lemonSqueezyId: id },
    data: {
      status: 'EXPIRED',
    },
  })
}

function mapLemonSqueezyStatus(status: string): any {
  const statusMap: Record<string, any> = {
    active: 'ACTIVE',
    cancelled: 'CANCELLED',
    expired: 'EXPIRED',
    past_due: 'PAST_DUE',
    paused: 'PAUSED',
  }
  return statusMap[status] || 'ACTIVE'
}
