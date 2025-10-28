# Lemon Squeezy Payment Integration

This document describes the Lemon Squeezy payment integration implementation.

## Overview

The application uses Lemon Squeezy for payment processing with the following flow:
1. User selects a plan (FREE or PRO)
2. For PRO plan, checkout session is created via Lemon Squeezy API
3. User completes payment on Lemon Squeezy checkout page
4. Webhook verifies payment and updates subscription
5. User gains access to PRO components and checklist items

## Environment Variables

Required in `.env` file:

```env
LEMONSQUEEZY_API_KEY=<your-api-key>
LEMONSQUEEZY_STORE_ID=<your-store-id>
LEMONSQUEEZY_VARIANT_ID=<your-variant-id>
LEMONSQUEEZY_WEBHOOK_SECRET=<your-webhook-secret>
```

## Key Files

### API Routes

- **`/api/checkout`** - Creates Lemon Squeezy checkout sessions
  - POST endpoint that accepts optional `variantId`
  - Uses Clerk user data to prefill checkout
  - Returns `checkoutUrl` for redirect

- **`/api/webhooks/lemonsqueezy`** - Handles webhook events
  - Verifies webhook signature using HMAC-SHA256
  - Handles events:
    - `order_created` - One-time purchase completed
    - `subscription_created` - New subscription created
    - `subscription_updated` - Subscription status changed
    - `subscription_cancelled` - Subscription cancelled
    - `subscription_expired` - Subscription expired
    - `subscription_payment_success` - Payment successful
    - `subscription_payment_failed` - Payment failed

- **`/api/user/plan`** - Returns current user plan
  - GET endpoint
  - Returns `PAID` if subscription is PAID + ACTIVE
  - Returns `FREE` otherwise

### Library Files

- **`lib/lemonsqueezy.ts`** - Helper functions
  - `createCheckoutSession()` - Creates checkout with Lemon Squeezy API
  - `verifyWebhookSignature()` - Verifies webhook authenticity
  - `mapSubscriptionStatus()` - Maps LS status to internal status
  - `extractUserIdFromWebhook()` - Extracts Clerk user ID from webhook

### Components

- **`components/pricing-cards.tsx`** - Pricing plan selection
  - Handles FREE plan selection (updates DB, reloads page)
  - Handles PRO plan selection (creates checkout, redirects)
  
- **`components/component-card.tsx`** - Component showcase cards
  - Shows lock overlay for PRO components when user is FREE
  - Opens pricing dialog on click when locked

### Hooks

- **`hooks/use-user-plan.ts`** - React hook for user plan
  - Fetches plan from `/api/user/plan`
  - Returns `FREE` or `PRO` status

## Payment Flow

### 1. Plan Selection
User clicks "Upgrade to Pro" button in pricing dialog/cards:
```typescript
// pricing-cards.tsx
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({}),
})
const { checkoutUrl } = await response.json()
window.location.href = checkoutUrl
```

### 2. Checkout Creation
API creates checkout session with user data:
```typescript
// api/checkout/route.ts
const checkoutUrl = await createCheckoutSession({
  variantId: process.env.LEMONSQUEEZY_VARIANT_ID,
  checkoutData: {
    email: user.email,
    name: user.name,
    custom: { user_id: clerkUserId }
  }
})
```

### 3. Payment Completion
User completes payment on Lemon Squeezy, which triggers webhooks.

### 4. Webhook Processing
Webhook handler verifies payment and updates database:
```typescript
// api/webhooks/lemonsqueezy/route.ts
await prisma.subscription.upsert({
  where: { userId: user.id },
  update: {
    plan: 'PAID',
    status: 'ACTIVE',
    lemonSqueezyId: subscriptionId,
    // ... other fields
  }
})
```

### 5. Access Control
Components check subscription status:
```typescript
// Server-side (component detail page)
const hasAccess = 
  user?.subscription?.plan === 'PAID' && 
  user?.subscription?.status === 'ACTIVE'

// Client-side (component cards, checklist)
const { plan } = useUserPlan()
const isLocked = !isFree && plan === 'FREE'
```

## Access Control

### Components
- Free components: Always accessible
- Pro components: Require `PAID` subscription with `ACTIVE` status
- Locked state shows overlay with "Upgrade to Pro" prompt

### Checklist
- Free items: Always accessible
- Pro items: Require `PAID` subscription with `ACTIVE` status
- Locked state shows blur overlay with lock icon

## Webhook Setup

In your Lemon Squeezy dashboard:

1. Go to Settings → Webhooks
2. Create new webhook with URL: `https://yourdomain.com/api/webhooks/lemonsqueezy`
3. Select events:
   - order_created
   - subscription_created
   - subscription_updated
   - subscription_cancelled
   - subscription_expired
   - subscription_payment_success
   - subscription_payment_failed
4. Copy webhook secret to `LEMONSQUEEZY_WEBHOOK_SECRET` env var

## Testing

### Test Checkout Flow
1. Sign in as a user
2. Click "Upgrade to Pro" in pricing dialog
3. Complete test payment on Lemon Squeezy (use test mode)
4. Verify webhook is received and subscription is updated
5. Verify access to pro components and checklist items

### Test Webhook Locally
Use Lemon Squeezy's webhook testing feature or ngrok:
```bash
ngrok http 3000
# Update webhook URL to ngrok URL
```

## Security

- Webhook signature verification prevents unauthorized requests
- User ID passed via custom data ensures correct user updates
- API routes protected with Clerk authentication
- Server-side checks prevent unauthorized access to pro content

## Subscription States

| State | Database Status | User Access |
|-------|----------------|-------------|
| No subscription | NULL or FREE | Free only |
| Active subscription | PAID + ACTIVE | Full access |
| Cancelled subscription | PAID + CANCELLED | Free only (after end date) |
| Expired subscription | PAID + EXPIRED | Free only |
| Payment failed | PAID + PAST_DUE | Free only |
| Paused subscription | PAID + PAUSED | Free only |

## Troubleshooting

### Webhook not received
- Verify webhook URL is correct and accessible
- Check webhook secret matches environment variable
- Review Lemon Squeezy webhook logs

### Payment successful but no access
- Check webhook was received and processed
- Verify user_id in custom data matches Clerk user
- Check database for subscription record

### Access not updating after payment
- Webhook may be delayed (usually < 30 seconds)
- Check browser console for errors
- Verify `/api/user/plan` returns correct plan
