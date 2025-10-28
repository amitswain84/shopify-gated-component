# Content Management Guide

## Easy Ways to Add & Manage Content

### 1. Managing Shopify Checklist Items

**File:** `apps/web/src/app/dashboard/shopify-checklist/page.tsx`

**Location:** Lines 25-77

```typescript
const checklistItems: ChecklistItem[] = [
  {
    id: 'unique-id-here',
    title: 'Your Checklist Title',
    description: 'Description of what needs to be done',
    icon: PackageIcon, // Import from lucide-react
    isPro: false, // true for Pro items, false for Free
  },
  // Add more items...
]
```

**To Add a New Checklist Item:**

1. Open the file
2. Add a new object to the `checklistItems` array
3. Set a unique `id` (use lowercase-with-hyphens)
4. Choose an icon from [Lucide Icons](https://lucide.dev/icons/)
5. Import the icon: `import { YourIcon } from 'lucide-react'`
6. Set `isPro: true` for Pro-only items

**Example:**
```typescript
{
  id: 'setup-seo',
  title: 'Configure SEO settings',
  description: 'Optimize your store for search engines',
  icon: Search,
  isPro: false,
},
```

---

### 2. Managing Components Library

**File:** `packages/components/src/registry.ts`

**Add a new component:**

```typescript
{
  id: 'component-id',
  name: 'Component Name',
  description: 'What this component does',
  category: 'buttons', // or 'forms', 'navigation', etc.
  thumbnail: '/thumbnails/component-name.png',
  code: `
    // Your component code here
    export function MyComponent() {
      return <div>Hello</div>
    }
  `,
  isFree: true, // false for Pro components
  variantCount: 3,
  componentCount: 1,
  isPageExample: false,
}
```

**Steps:**
1. Add component to registry
2. Add thumbnail image to `apps/web/public/thumbnails/`
3. Optionally create MDX docs in `apps/web/src/content/components/`

---

### 3. Managing Pricing Plans

**File:** `apps/web/src/components/pricing-cards.tsx`

**Location:** Lines 105-142

```typescript
const plans = [
  {
    plan: 'free', // unique identifier
    title: 'Free',
    price: '$0',
    description: 'Plan description',
    features: [
      { 
        title: 'Feature name', 
        description: 'Feature details' 
      },
      // Add more features...
    ]
  },
  // Add more plans...
]
```

**To Update Pricing:**
1. Change the `price` field
2. Add/remove features in the `features` array
3. Update `description` text

---

### 4. Managing Changelog

**File:** `apps/web/src/app/dashboard/docs/changelog/page.tsx`

**Location:** Lines 18-74

```typescript
const changelogData: ChangelogEntry[] = [
  {
    date: 'June 30, 2025',
    version: '2.1',
    title: 'Release 2.1 - Feature Name',
    badges: ['AI', 'Performance'], // Category tags
    videoUrl: 'https://...', // Optional
    features: [
      'Feature description 1',
      'Feature description 2',
    ],
    bugFixes: [
      'Bug fix description',
    ],
  },
]
```

**To Add a Release:**
1. Add new object at the TOP of the array
2. Set date, version, title
3. Add badges for categorization
4. List new features and bug fixes

---

## Recommended Content Management Options

### Option 1: MDX Files (Easiest for Non-Developers)

**Pros:**
- Write in Markdown
- No coding required
- Version control friendly

**Create:** `apps/web/src/content/checklist/item-name.mdx`

```mdx
---
id: setup-store
title: Set up your Shopify store
description: Configure basic store settings
icon: Package
isPro: false
---

# Detailed Instructions

Step 1: Go to Settings...
Step 2: Configure...
```

Then import in checklist page.

---

### Option 2: JSON Configuration Files

**Create:** `apps/web/src/config/checklist.json`

```json
{
  "items": [
    {
      "id": "store-setup",
      "title": "Set up store",
      "description": "Configure basic settings",
      "icon": "Package",
      "isPro": false
    }
  ]
}
```

Import and use in your page.

---

### Option 3: Database + Admin Panel (Most Flexible)

**Setup:**
1. Add tables to Prisma schema
2. Create admin API routes
3. Build simple admin UI

**Prisma Schema:**
```prisma
model ChecklistItem {
  id          String   @id @default(cuid())
  title       String
  description String
  icon        String
  isPro       Boolean  @default(false)
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Benefits:**
- Edit without code changes
- No deployments needed
- User-friendly interface

---

### Option 4: Headless CMS (Professional)

**Recommended:** 
- [Sanity.io](https://www.sanity.io/) - Free tier available
- [Contentful](https://www.contentful.com/) - Good for structured content
- [Strapi](https://strapi.io/) - Self-hosted option

**Benefits:**
- Visual editor
- Media management
- Preview before publish
- Multi-user support
- Webhooks for auto-rebuild

**Setup with Sanity (Easiest):**
```bash
npm create sanity@latest
```

Define schemas for:
- Checklist Items
- Components
- Changelog Entries
- Pricing Plans

Then fetch in your Next.js app:
```typescript
import { client } from '@/lib/sanity'

const items = await client.fetch(`
  *[_type == "checklistItem"] | order(order asc)
`)
```

---

## Quick Edit Workflow

### For Checklist Items:
1. Navigate to file
2. Find the `checklistItems` array
3. Add/edit items
4. Save file
5. Changes reflect immediately (dev mode)

### For Components:
1. Edit `packages/components/src/registry.ts`
2. Add component object
3. Save file
4. Rebuild package: `pnpm build`

### For Changelog:
1. Edit `apps/web/src/app/dashboard/docs/changelog/page.tsx`
2. Add entry to `changelogData` array
3. Save file

---

## Recommended Approach

**For Your SaaS, I recommend:**

1. **Phase 1 (Now):** Keep using TypeScript files
   - Quick to update
   - No additional setup
   - Version controlled

2. **Phase 2 (Growth):** Move to JSON configs
   - Separate content from code
   - Easier for non-technical team members
   - Still version controlled

3. **Phase 3 (Scale):** Add Sanity CMS
   - Visual editing interface
   - No code deployments for content updates
   - Team collaboration features
   - Media management

---

## Automation Tips

### Auto-generate Thumbnails:
Use Puppeteer to screenshot components:

```typescript
// scripts/generate-thumbnails.ts
import puppeteer from 'puppeteer'

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.goto(`http://localhost:3000/preview/${componentId}`)
await page.screenshot({ 
  path: `public/thumbnails/${componentId}.png` 
})
```

### Sync from GitHub:
Watch a specific folder for MDX files and auto-import them.

### Use GitHub Actions:
Auto-rebuild site when content changes in specific folders.

---

## Content Validation

Add Zod schemas to validate content:

```typescript
import { z } from 'zod'

const checklistItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  icon: z.string(),
  isPro: z.boolean(),
})

// Validate on load
checklistItems.forEach(item => {
  checklistItemSchema.parse(item)
})
```

---

## Next Steps

1. **Start simple:** Edit TypeScript files directly
2. **As you grow:** Move to JSON config files  
3. **For teams:** Add a CMS like Sanity
4. **For scale:** Build custom admin panel

Choose based on:
- Team size
- Technical skills
- Update frequency
- Budget

The current TypeScript approach is perfectly fine for a single developer or small team!
