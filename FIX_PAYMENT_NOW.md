# 🔧 Fix Payment Integration - Action Required

## ⚠️ Problem Identified

Your Lemon Squeezy credentials in `.env.local` are set to placeholder values (`xxx`). This is why clicking "Upgrade to Pro" does nothing.

## ✅ Solution - Update Environment Variables

### Step 1: Get Your Lemon Squeezy Credentials

1. Go to [Lemon Squeezy Dashboard](https://app.lemonsqueezy.com)
2. Get your **Store ID**:
   - Go to Settings → Stores
   - Copy your store ID (format: `#234298`)
   - Remove the `#` symbol, use only the number

3. Get your **Variant ID**:
   - Go to Products
   - Click on your product
   - Click on a variant/plan
   - Copy the Variant ID from the URL or product details

4. Get your **Webhook Secret**:
   - Go to Settings → Webhooks
   - Create a webhook (or use existing)
   - Copy the signing secret

### Step 2: Update Your .env.local File

Edit `apps/web/.env.local` and replace the `xxx` values:

```env
# Lemon Squeezy
LEMONSQUEEZY_API_KEY=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9... (keep existing, it looks valid)
LEMONSQUEEZY_STORE_ID=234298  # ← Replace xxx with your store ID
LEMONSQUEEZY_VARIANT_ID=1053010  # ← Replace xxx with your variant ID
LEMONSQUEEZY_WEBHOOK_SECRET=rgRffmz14PYKSCTSVtn9ZcFaHOnOCVKV  # ← Replace xxx with your webhook secret
```

**Note:** There's also a typo in your env variable names - they should be `LEMONSQUEEZY` not `LEMONSQUEEZY` (missing an 'E'). The code now handles both spellings.

### Step 3: Restart Your Dev Server

```bash
# Stop your current dev server (Ctrl+C)
pnpm dev
```

### Step 4: Test the Payment Flow

1. Sign in to your application
2. Click "Upgrade to Pro" button
3. Check browser console for any errors
4. You should be redirected to Lemon Squeezy checkout page

## 🐛 Debugging

If it still doesn't work after updating the credentials:

### Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Click "Upgrade to Pro"
4. Look for error messages like:
   - "Creating checkout session..."
   - "Checkout session created: ..."
   - "Redirecting to: ..."
   - Any red error messages

### Check Network Tab
1. Open browser DevTools (F12)
2. Go to Network tab
3. Click "Upgrade to Pro"
4. Look for the `/api/checkout` request
5. Click on it and check:
   - Status code (should be 200)
   - Response body (should contain `checkoutUrl`)
   - Preview tab to see the response

### Common Issues & Fixes

**Issue:** "Payment system not configured"
- **Fix:** Update the `xxx` values in `.env.local` with real credentials

**Issue:** "Failed to create checkout session"
- **Fix:** Check that your API key has the correct permissions in Lemon Squeezy

**Issue:** Button shows "Processing..." forever
- **Fix:** Check browser console for errors, likely an API error

**Issue:** Nothing happens when clicking button
- **Fix:** Make sure you're signed in with Clerk first

## 📝 Quick Test Commands

Run these to verify your setup:

```bash
# Check if env variables are loaded (from project root)
cd apps/web
node -e "console.log('Store ID:', process.env.LEMONSQUEEZY_STORE_ID)"
node -e "console.log('Variant ID:', process.env.LEMONSQUEEZY_VARIANT_ID)"
```

## 🎯 What Should Happen

After fixing the credentials:

1. Click "Upgrade to Pro" → Button shows "Processing..."
2. API creates checkout session
3. You're redirected to Lemon Squeezy checkout page
4. Complete payment (use test mode)
5. Webhook updates your subscription
6. You get access to PRO features

## 📞 Still Having Issues?

Share the error messages from:
1. Browser console
2. Network tab (screenshot of /api/checkout response)
3. Server logs (terminal where `pnpm dev` is running)
