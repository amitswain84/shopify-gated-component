# 🧪 Testing PRO Access

## ✅ Database Seeded

Successfully added to database:
- ✅ 5 Free checklist items
- ✅ 5 PRO checklist items

## 🎯 Testing Options

### Option 1: Admin Page (Quick Test)

1. **Navigate to admin page**:
   ```
   http://localhost:3000/dashboard/admin
   ```

2. **Click "Grant PRO Access Now"**
   - Immediately grants PRO subscription to current user
   - Updates database: plan=PAID, status=ACTIVE

3. **Verify access**:
   - Refresh any page
   - Dashboard should show "PRO" plan
   - PRO components unlocked
   - PRO checklist items accessible

### Option 2: Full Payment Flow

1. **Click "Upgrade to Pro"**
2. **Complete payment on Lemon Squeezy**
3. **Webhook updates subscription**
4. **Access granted automatically**

## 🔍 Verify PRO Access

### 1. Dashboard
- Plan card should show: **"PRO"**
- Components count: **"50+"**

### 2. Components
- Navigate to `/dashboard/components`
- Filter: Premium components
- PRO components should be **unlocked** (no lock overlay)
- Click any PRO component - should see code, not upgrade prompt

### 3. Checklist
- Navigate to `/dashboard/shopify-checklist`
- Switch to "Pro" tab
- All 5 PRO items should be **accessible**
- No lock overlay on cards
- Can check/uncheck items

### 4. Database
Check subscription in database:
```bash
cd packages/database
pnpm db:studio
```

Navigate to **Subscription** table:
- `plan`: should be `PAID`
- `status`: should be `ACTIVE`

## 🐛 Troubleshooting

### PRO Access Not Working After Payment

**Issue**: Completed payment but still shows FREE

**Likely cause**: Webhook not configured or not triggered

**Solution**:
1. Use admin page to grant PRO access manually
2. Configure webhook in Lemon Squeezy:
   - URL: `https://yourdomain.com/api/webhooks/lemonsqueezy`
   - Events: `order_created`, `subscription_created`
   - Secret: Copy to `.env.local`

### Components Still Locked

**Check**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Check `/api/user/plan` response:
   ```
   Should return: { "plan": "PAID", "status": "ACTIVE" }
   ```
3. Check `useUserPlan` hook is fetching correctly
4. Clear browser cache

### Checklist Items Still Locked

**Check**:
1. Database has ChecklistItem entries:
   ```sql
   SELECT * FROM "ChecklistItem" WHERE "isPro" = true;
   ```
2. `useUserPlan` hook returns `plan: 'PRO'`
3. Hard refresh the page

### Database Shows FREE

**Fix**:
1. Go to `/dashboard/admin`
2. Click "Grant PRO Access Now"
3. OR manually update in Prisma Studio:
   ```
   plan: PAID
   status: ACTIVE
   ```

## 📊 Expected Behavior

### FREE User
- ✅ Access to 20 free components
- ✅ Access to 5 free checklist items
- ❌ PRO components locked
- ❌ PRO checklist items locked
- Shows "Upgrade to Pro" prompts

### PRO User
- ✅ Access to all 50+ components
- ✅ Access to all 10 checklist items (5 free + 5 pro)
- ✅ No lock overlays
- ✅ Dashboard shows "PRO" plan
- ❌ No "Upgrade to Pro" prompts

## 🎬 Quick Demo Flow

1. **Start as FREE user**:
   - Login
   - See FREE components only
   - Try PRO component → locked
   - Try PRO checklist → locked

2. **Upgrade to PRO**:
   - Go to `/dashboard/admin`
   - Click "Grant PRO Access Now"
   - See success message

3. **Verify PRO access**:
   - Refresh page
   - Dashboard shows "PRO"
   - Navigate to components
   - PRO components unlocked
   - Navigate to checklist
   - PRO items accessible

## 📝 Checklist Status

### Database
- ✅ 5 free items seeded
- ✅ 5 PRO items seeded
- ✅ Checklist icon: Package, ShoppingCart, Settings, Palette, Truck
- ✅ PRO icon: TrendingUp, Zap, Shield, Lock, BarChart

### Frontend (Existing)
- ✅ Checklist page at `/dashboard/shopify-checklist`
- ✅ Free/Pro tabs
- ✅ Lock overlay for PRO items
- ✅ `useUserPlan` hook integration

### API
- ✅ `/api/user/plan` - Returns user plan
- ✅ `/api/admin/grant-pro` - Grants PRO access
- ✅ `/api/checkout` - Creates checkout
- ✅ `/api/webhooks/lemonsqueezy` - Handles payments

## 🚀 Next Steps

1. **Test the flow**:
   ```
   http://localhost:3000/dashboard/admin
   ```

2. **Grant PRO access**

3. **Verify everywhere**:
   - Dashboard shows PRO
   - Components unlocked
   - Checklist accessible

4. **Test with real payment** (optional):
   - Configure webhook with ngrok
   - Complete test payment
   - Verify webhook updates subscription

## Commands

```bash
# Seed database (already done)
cd packages/database
pnpm db:seed

# Check database
pnpm db:studio

# Start dev server
cd ../..
pnpm dev

# Test admin page
# Navigate to: http://localhost:3000/dashboard/admin
```

---

**The PRO access system is ready to test!** 🎉
