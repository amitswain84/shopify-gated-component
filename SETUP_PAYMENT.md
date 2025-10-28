# Payment Integration Setup Guide

## Quick Setup Steps

### 1. Environment Variables
Make sure your `.env` file has the Lemon Squeezy credentials:

```env
LEMONSQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...
LEMONSQUEEZY_STORE_ID=234298
LEMONSQUEEZY_VARIANT_ID=1053010
LEMONSQUEEZY_WEBHOOK_SECRET=rgRffmz14PYKSCTSVtn9ZcFaHOnOCVKV
```

Note: The values from `.env.example` look like they might be test credentials. Make sure they're valid.

### 2. Configure Lemon Squeezy Webhook

1. Go to Lemon Squeezy Dashboard
2. Navigate to Settings → Webhooks
3. Create a new webhook with:
   - **URL**: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - **Events** (select all):
     - `order_created`
     - `subscription_created`
     - `subscription_updated`
     - `subscription_cancelled`
     - `subscription_expired`
     - `subscription_payment_success`
     - `subscription_payment_failed`
   - **Signing Secret**: Copy this to `LEMONSQUEEZY_WEBHOOK_SECRET`

### 3. Deploy & Test

1. Deploy your application or use ngrok for local testing:
   ```bash
   ngrok http 3000
   ```

2. Update webhook URL in Lemon Squeezy to your deployed URL or ngrok URL

3. Test the flow:
   - Sign in to your app
   - Click "Upgrade to Pro" from pricing dialog
   - Complete payment (use test mode in Lemon Squeezy)
   - Wait for webhook (usually < 30 seconds)
   - Verify access to pro components and checklist items

## Testing Locally with ngrok

```bash
# Terminal 1: Start your dev server
pnpm dev

# Terminal 2: Start ngrok
ngrok http 3000

# Use the ngrok URL (e.g., https://abc123.ngrok.io) as your webhook URL
# in Lemon Squeezy settings
```

## What Changed

### New Files Created
1. `apps/web/src/lib/lemonsqueezy.ts` - Lemon Squeezy API helpers
2. `apps/web/src/app/api/checkout/route.ts` - Checkout creation endpoint
3. `PAYMENT_INTEGRATION.md` - Detailed documentation
4. `SETUP_PAYMENT.md` - This file

### Files Modified
1. `apps/web/src/app/api/webhooks/lemonsqueezy/route.ts`
   - Enhanced webhook handler with proper payment verification
   - Added handlers for all subscription events
   - Improved error logging and user ID extraction

2. `apps/web/src/app/api/onboarding/route.ts`
   - Simplified to flag checkout requirement instead of creating it

3. `apps/web/src/components/pricing-cards.tsx`
   - Added proper checkout flow for PRO plan
   - Integrated with `/api/checkout` endpoint

### Existing Files (Already Correct)
- `apps/web/src/app/api/user/plan/route.ts` - Returns user plan based on subscription
- `apps/web/src/hooks/use-user-plan.ts` - Client-side hook for plan
- `apps/web/src/components/component-card.tsx` - Locks PRO components
- `apps/web/src/app/dashboard/shopify-checklist/page.tsx` - Locks PRO checklist items

## Payment Flow Summary

```
User clicks "Upgrade to Pro"
    ↓
POST /api/checkout
    ↓
Lemon Squeezy API creates checkout
    ↓
User redirected to Lemon Squeezy checkout page
    ↓
User completes payment
    ↓
Lemon Squeezy sends webhook to /api/webhooks/lemonsqueezy
    ↓
Webhook verified & subscription updated in database
    ↓
User refreshes page or navigates
    ↓
useUserPlan() hook fetches updated plan
    ↓
User sees unlocked PRO components & checklist items
```

## Verification Checklist

- [ ] Environment variables are set correctly
- [ ] Lemon Squeezy webhook is configured with correct URL
- [ ] Webhook secret matches environment variable
- [ ] Test payment completes successfully
- [ ] Webhook is received (check server logs)
- [ ] Database subscription is updated to PAID + ACTIVE
- [ ] `/api/user/plan` returns "PAID"
- [ ] PRO components are unlocked
- [ ] PRO checklist items are unlocked
- [ ] Locked overlay is removed from cards

## Notes on Checkbox Persistence

As per your requirement #1:
- Checkboxes on the Checklist cards do NOT need to stay checked when navigating
- Users can reset progress through the Reset button
- The checkbox state is stored in the database but it's OK if it resets on navigation
- Current implementation already saves state to DB but doesn't block navigation reset

## Troubleshooting

### Webhook Not Received
Check:
- Webhook URL is publicly accessible
- HTTPS is enabled (required by Lemon Squeezy)
- Webhook secret is correct
- Review Lemon Squeezy webhook logs

### Payment Complete But No Access
Check:
- Server logs for webhook reception
- Database for subscription record
- user_id in webhook custom data
- `/api/user/plan` response

### Console Errors
Check browser console for:
- Failed fetch requests
- CORS errors
- Authentication issues
