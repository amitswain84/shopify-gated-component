# Gated Component Library

A modern SaaS application built with Next.js that provides a gated component library with freemium pricing.

## 🚀 Tech Stack

- **Monorepo**: Turborepo
- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + shadcn/ui
- **Authentication**: Clerk
- **Database**: Prisma + Supabase (PostgreSQL)
- **Payments**: Lemon Squeezy
- **Analytics**: PostHog
- **Email**: Resend
- **CMS**: BaseHub (optional)

## 📦 Project Structure

```
gated-component-library/
├── apps/
│   └── web/                    # Next.js application
│       ├── src/
│       │   ├── app/           # App router pages
│       │   ├── components/    # React components
│       │   ├── lib/           # Utilities
│       │   └── middleware.ts  # Clerk auth middleware
│       └── package.json
├── packages/
│   ├── components/            # Component library registry
│   ├── database/              # Prisma schema & client
│   └── ui/                    # Shared UI components
├── turbo.json
└── package.json
```

## 🎯 Features

### Core Functionality
- ✅ User authentication with Clerk
- ✅ Onboarding flow for plan selection
- ✅ Freemium model (20 free + 30+ paid components)
- ✅ Component showcase with previews
- ✅ Copy-to-clipboard for code snippets
- ✅ Gated access control for premium components
- ✅ Lemon Squeezy payment integration
- ✅ Webhook handling for subscriptions
- ✅ PostHog analytics integration
- ✅ Transactional emails with Resend

### Component Library
- 50+ UI components built with Tailwind CSS
- 20 free components (accessible to all users)
- 30+ premium components (paid subscription required)
- Organized by category
- Easy copy-paste implementation

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18.17.0 or higher
- pnpm 8.15.4
- PostgreSQL database (Supabase recommended)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd gated-component-library
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example apps/web/.env.local
   ```
   
   Fill in all required environment variables:
   - Database connection string (Supabase)
   - Clerk API keys
   - Lemon Squeezy credentials
   - PostHog API key
   - Resend API key

4. **Set up the database**
   ```bash
   cd packages/database
   pnpm db:push
   ```

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication Setup (Clerk)

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the API keys to your `.env.local`
4. Configure redirect URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/onboarding`
   - After sign-up: `/onboarding`

## 💳 Payment Setup (Lemon Squeezy)

1. Create a Lemon Squeezy account
2. Create a product and variant for your subscription
3. Set up a webhook endpoint: `https://yourdomain.com/api/webhooks/lemonsqueezy`
4. Add webhook secret to environment variables
5. Configure the variant ID in your environment

## 📊 Database Schema

### User Model
- ID, Clerk ID, email, name
- Onboarding completion status
- Related subscription

### Subscription Model
- Plan (FREE or PAID)
- Status (ACTIVE, CANCELLED, EXPIRED, etc.)
- Lemon Squeezy integration fields
- Renewal and expiration dates

## 🎨 Adding New Components

1. Add component metadata to `packages/components/src/registry.ts`
2. Specify if the component is free or paid (`isFree: boolean`)
3. Include the component code as a string
4. The component will automatically appear in the showcase

Example:
```typescript
{
  id: 'my-component',
  name: 'My Component',
  description: 'A great component',
  category: 'Forms',
  isFree: false,
  code: `export function MyComponent() { ... }`,
}
```

## 🚢 Deployment

### Prerequisites
- Vercel account (recommended for Next.js)
- Production database (Supabase)
- All API keys configured

### Steps
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel
4. Deploy

### Post-Deployment
1. Update Clerk redirect URLs to production domain
2. Update Lemon Squeezy webhook URL
3. Test authentication flow
4. Test payment flow with test mode

## 📝 Development Commands

```bash
# Install dependencies
pnpm install

# Run dev server
pnpm dev

# Build all apps
pnpm build

# Lint code
pnpm lint

# Format code
pnpm format

# Database commands
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
```

## 🤝 Contributing

This is a template project. Feel free to customize and extend it for your needs.

## 📄 License

MIT

## 🙏 Acknowledgments

- Built with [next-forge](https://next-forge.com) patterns
- UI components inspired by [shadcn/ui](https://ui.shadcn.com)
- Marketing components from [twblocks](https://twblocks.com)
