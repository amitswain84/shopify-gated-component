# Resend Newsletter Setup Guide

This guide will help you set up the newsletter subscription feature with Resend.

## Prerequisites

1. A [Resend](https://resend.com) account (free tier available)
2. A verified domain (or use Resend's test domain for development)

## Setup Steps

### 1. Get Your Resend API Key

1. Log in to your [Resend Dashboard](https://resend.com/overview)
2. Navigate to **API Keys** in the left sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Gated Components Newsletter")
5. Select permissions: `Sending access` and `Audience management`
6. Copy the API key (it starts with `re_`)

### 2. Create an Audience

1. In the Resend Dashboard, go to **Audiences**
2. Click **Create Audience**
3. Give it a name (e.g., "Newsletter Subscribers")
4. Copy the Audience ID (it looks like a UUID)

### 3. Set Up Your From Email (Optional but Recommended)

**Option A: Use Resend's Test Domain (Development Only)**
- You can use `onboarding@resend.dev` for testing
- Emails will only be sent to your verified email addresses

**Option B: Use Your Own Domain (Production)**
1. Go to **Domains** in Resend Dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records to your domain registrar
5. Wait for verification (usually takes a few minutes)
6. Once verified, you can use emails like `newsletter@yourdomain.com`

### 4. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Resend Email Service
RESEND_API_KEY="re_your_actual_api_key_here"
RESEND_AUDIENCE_ID="your-actual-audience-id-here"
RESEND_FROM_EMAIL="Your App Name <newsletter@yourdomain.com>"

# App URL (for email links)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Example:**
```env
RESEND_API_KEY="re_123abc456def789ghi012jkl345mno678"
RESEND_AUDIENCE_ID="b23e5f45-9012-4abc-8def-123456789abc"
RESEND_FROM_EMAIL="Gated Components <newsletter@gatedcomponents.com>"
NEXT_PUBLIC_APP_URL="https://gatedcomponents.com"
```

### 5. Test the Newsletter Subscription

1. Start your development server: `pnpm dev`
2. Navigate to the dashboard
3. Scroll to the newsletter subscription form in the sidebar
4. Enter an email address
5. Click "Subscribe"

### 6. Verify the Subscription

**Check Database:**
```sql
SELECT * FROM newsletter WHERE email = 'test@example.com';
```

**Check Resend Dashboard:**
1. Go to **Audiences** in Resend
2. Click on your audience
3. You should see the new contact listed

**Check Email:**
- The subscriber should receive a welcome email
- Check spam folder if not in inbox

## Troubleshooting

### "Failed to subscribe" Error

1. **Check API Key:**
   - Make sure `RESEND_API_KEY` is set correctly in `.env.local`
   - Verify the key has the right permissions

2. **Check Audience ID:**
   - Ensure `RESEND_AUDIENCE_ID` matches your actual audience ID
   - The audience must exist in your Resend account

3. **Check From Email:**
   - For development: Use `onboarding@resend.dev`
   - For production: Make sure your domain is verified
   - Format: `Name <email@domain.com>`

4. **Check Database Connection:**
   - Ensure `DATABASE_URL` is configured
   - Run database migrations: `pnpm db:push`

### Emails Not Being Sent

1. **Development with Test Domain:**
   - Resend's test domain only sends to verified email addresses
   - Add your test emails to Resend's verified list

2. **Production Issues:**
   - Verify your domain is properly configured
   - Check DNS records are correct
   - Wait at least 24 hours for DNS propagation

### Contact Already Exists

This is normal! The API handles this gracefully:
- It will still update the database subscription status
- It will skip adding to the audience if already there
- The user will still see a success message

## API Endpoint Details

**Endpoint:** `POST /api/newsletter`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true
}
```

**Error Response:**
```json
{
  "error": "Error message here"
}
```

## Features

✅ Adds subscriber to database  
✅ Adds contact to Resend audience  
✅ Sends beautiful welcome email  
✅ Handles duplicate subscriptions  
✅ Supports resubscribing  
✅ Graceful error handling  

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/introduction)
- [Resend Community](https://resend.com/community)
