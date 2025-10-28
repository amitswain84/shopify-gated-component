# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev              # Start Next.js dev server (runs on localhost:3000)
pnpm build            # Build all apps and packages
pnpm start            # Start production server
pnpm lint             # Run ESLint across all workspaces
pnpm format           # Format code with Prettier
```

### Database (run from packages/database/)
```bash
pnpm db:push          # Push Prisma schema changes to database
pnpm db:studio        # Open Prisma Studio for database management
pnpm db:generate      # Generate Prisma client
```

### Testing
This project does not have tests configured. Do not assume test frameworks exist.

## Architecture

### Monorepo Structure (Turborepo)
- **apps/web/**: Main Next.js application (App Router)
- **packages/components/**: Component registry with metadata
- **packages/database/**: Prisma schema and client
- **packages/ui/**: Shared UI components

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Auth**: Clerk (middleware in `apps/web/src/middleware.ts`)
- **Database**: Prisma + Supabase (PostgreSQL)
- **Payments**: Lemon Squeezy
- **UI**: Tailwind CSS + shadcn/ui
- **Analytics**: PostHog
- **Email**: Resend

### Freemium Model
The core business logic revolves around gating components:
- **Free tier**: 20 components accessible to all authenticated users
- **Paid tier**: 50+ components requiring active subscription
- Component access is determined by `component.isFree` flag and user's subscription status

### Authentication Flow
1. User signs up/in via Clerk → redirected to `/onboarding`
2. Onboarding page (`apps/web/src/app/onboarding/page.tsx`) lets user choose FREE or PAID plan
3. API route `/api/onboarding` creates User and Subscription records in database
4. For PAID plan, user is redirected to Lemon Squeezy checkout
5. Middleware (`apps/web/src/middleware.ts`) protects routes, with public routes: `/`, `/components`, `/pricing`

### Component Registry System
All components live in `packages/components/src/registry.ts` as an array:
```typescript
interface ComponentMetadata {
  id: string
  name: string
  description: string
  category: string
  isFree: boolean    // Key gating mechanism
  code: string       // Actual component code as string
  preview?: string
}
```

To add a new component, add an entry to the `componentRegistry` array. The component automatically appears in the showcase.

### Access Control Pattern
Component pages (`apps/web/src/app/components/[id]/page.tsx`) check access:
1. If component is free → grant access
2. If component is paid:
   - Fetch user from database by Clerk ID
   - Check if `subscription.plan === 'PAID' && subscription.status === 'ACTIVE'`
   - Show component code if access granted, otherwise show upgrade prompt

### Webhook Integration
`apps/web/src/app/api/webhooks/lemonsqueezy/route.ts` handles subscription events:
- **subscription_created/updated**: Updates subscription status in database
- **subscription_cancelled**: Sets status to CANCELLED
- **subscription_expired**: Sets status to EXPIRED
- Verifies webhook signature using HMAC-SHA256
- Custom data passes `user_id` (Clerk ID) to link subscription to user

### Database Schema
Two main models in `packages/database/prisma/schema.prisma`:

**User**:
- Links to Clerk via `clerkId` (unique)
- Has one optional Subscription (one-to-one)
- Tracks `onboardingComplete` status

**Subscription**:
- `plan`: FREE or PAID enum
- `status`: ACTIVE, CANCELLED, EXPIRED, PAST_DUE, PAUSED enum
- Links to Lemon Squeezy via `lemonSqueezyId`, `variantId`, `customerId`
- Tracks renewal/expiration dates

### Environment Variables
Required variables (see `.env.example`):
- **Database**: `DATABASE_URL`
- **Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, redirect URLs
- **Lemon Squeezy**: `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID`, `LEMONSQUEEZY_VARIANT_ID`, `LEMONSQUEEZY_WEBHOOK_SECRET`
- **PostHog**: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
- **Resend**: `RESEND_API_KEY`
- **App**: `NEXT_PUBLIC_APP_URL`

### Key Files to Understand
- `apps/web/src/middleware.ts`: Clerk auth middleware, defines public routes
- `packages/components/src/registry.ts`: Single source of truth for all components
- `apps/web/src/app/api/webhooks/lemonsqueezy/route.ts`: Subscription lifecycle management
- `apps/web/src/app/onboarding/page.tsx`: First user experience after signup
- `apps/web/src/app/components/[id]/page.tsx`: Component detail page with access control
- `packages/database/prisma/schema.prisma`: Database schema
