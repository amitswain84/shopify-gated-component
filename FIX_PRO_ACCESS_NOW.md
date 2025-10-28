# 🔧 Fix PRO Access After Payment - Complete Guide

## Problem
After completing payment, you're redirected but still don't have PRO access because:
1. Webhook hasn't been triggered (no public URL for local dev)
2. Database subscription not updated
3. Frontend still showing FREE plan

## ✅ Immediate Solution - Use Admin Page

### Go to Admin Page
```
http://localhost:3000/dashboard/admin
```

### Click "Grant PRO Access Now"
This will:
- Update database: `plan=PAID`, `status=ACTIVE`
- Give immediate PRO access
- Bypass webhook requirement

### Then:
1. Refresh any page
2. Dashboard should show "PRO"
3. PRO components unlocked
4. PRO checklist items accessible

## 🔍 Why This Happens

### Local Development Issue
- Lemon Squeezy needs a public URL to send webhooks
- `localhost:3000` is not accessible from internet
- Webhook never fires → Database never updates
- You stay on FREE plan even after payment

### Production Won't Have This Issue
Once deployed with public URL, webhooks will work automatically.

## 🚀 Complete Fix for Local Testing

### Option 1: Use Admin Page (Easiest)
1. Go to `/dashboard/admin`
2. Click "Grant PRO Access Now"
3. Done! ✅

### Option 2: Update Database Manually
Using Prisma Studio:
```bash
cd packages/database
pnpm db:studio
```

1. Open Subscription table
2. Find your subscription
3. Update fields:
   - `plan`: PAID
   - `status`: ACTIVE
4. Save
5. Refresh app

### Option 3: Use ngrok for Real Webhooks
```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2: Start ngrok
ngrok http 3000

# Copy ngrok URL (e.g., https://abc123.ngrok.io)
# Update webhook in Lemon Squeezy to: https://abc123.ngrok.io/api/webhooks/lemonsqueezy
# Make another test payment
# Webhook will fire and update database
```

## 📊 Verify PRO Access

After granting access, check these places:

### 1. Dashboard
Navigate to: `/dashboard`
- Plan card shows: **"PRO"** (not "FREE")
- Components count: **"50+"** (not "20")

### 2. API Response
Check in browser console or visit:
```
http://localhost:3000/api/user/plan
```
Should return:
```json
{
  "plan": "PAID",
  "status": "ACTIVE",
  "subscription": {
    "plan": "PAID",
    "status": "ACTIVE"
  }
}
```

### 3. Components Page
Navigate to: `/dashboard/components?filter=premium`
- PRO components have NO lock overlay
- Click any PRO component → See code (not upgrade prompt)

### 4. Checklist Page
Navigate to: `/dashboard/shopify-checklist`
- Switch to "Pro" tab
- All 5 PRO items accessible
- No lock overlay
- Can check/uncheck items

## 🐛 If Still Not Working

### Clear Browser Cache
```
Ctrl + Shift + R (hard refresh)
```

### Check Database
```bash
cd packages/database
pnpm db:studio
```

In Subscription table, verify:
- Record exists for your user
- `plan`: "PAID"
- `status`: "ACTIVE"

### Check User Hook
In browser console, check if useUserPlan is returning correct data:
1. Open DevTools (F12)
2. Go to Console
3. Should see: "Loaded checklist items: [...]"
4. Check Network tab for `/api/user/plan` response

### Force Update
If database is correct but UI still shows FREE:

1. **Clear localStorage**:
   ```javascript
   // In browser console:
   localStorage.clear()
   ```

2. **Hard refresh**: Ctrl + Shift + R

3. **Navigate around**: Click between pages to trigger re-fetch

## 📝 Summary of Files That Check Access

### 1. Dashboard (`apps/web/src/app/dashboard/page.tsx`)
- Fetches plan on mount
- Shows PRO or FREE
- Displays correct component count

### 2. Components (`apps/web/src/app/dashboard/components/[id]/page.tsx`)
- Server-side check: `subscription.plan === 'PAID' && subscription.status === 'ACTIVE'`
- Shows code if access granted

### 3. Checklist (`apps/web/src/app/dashboard/shopify-checklist/page.tsx`)
- Uses `useUserPlan()` hook
- Shows lock overlay if `plan === 'FREE'`
- Enables PRO items if `plan === 'PRO'`

### 4. API (`apps/web/src/app/api/user/plan/route.ts`)
- Returns user plan from database
- Checks: `plan === 'PAID' && status === 'ACTIVE'`

## ✅ Quick Test Checklist

After granting PRO access:

- [ ] Navigate to `/dashboard/admin`
- [ ] Click "Grant PRO Access Now"
- [ ] See success message
- [ ] Hard refresh (Ctrl + Shift + R)
- [ ] Dashboard shows "PRO" plan
- [ ] Navigate to `/dashboard/components`
- [ ] PRO components are unlocked
- [ ] Click a PRO component → See code
- [ ] Navigate to `/dashboard/shopify-checklist`
- [ ] Click "Pro" tab
- [ ] All 5 PRO items accessible
- [ ] No lock overlays
- [ ] Can check/uncheck PRO items

## 🎯 Expected Behavior

### Before Payment/PRO Access
- Dashboard: Plan = "FREE", Components = "20"
- PRO components: Locked with overlay
- PRO checklist: Locked with overlay
- Clicking PRO items: Opens pricing dialog

### After Payment/PRO Access
- Dashboard: Plan = "PRO", Components = "50+"
- PRO components: Unlocked, shows code
- PRO checklist: Unlocked, fully functional
- No pricing dialogs
- No lock overlays anywhere

## 🔄 For Production Deployment

Once you deploy to production with a public URL:

1. Update `.env`:
   ```
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

2. Update webhook in Lemon Squeezy:
   ```
   https://yourdomain.com/api/webhooks/lemonsqueezy
   ```

3. Test with real payment
4. Webhook fires automatically
5. User gets instant PRO access

## 📞 Still Having Issues?

1. Check browser console for errors
2. Check Network tab for failed API calls
3. Verify database has subscription record
4. Try admin page again
5. Hard refresh multiple times
6. Clear cache and cookies

---

**TL;DR: Go to `/dashboard/admin` and click "Grant PRO Access Now" to instantly get PRO access for testing!** 🚀
