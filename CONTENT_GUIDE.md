# Content Management Guide

This guide provides step-by-step instructions for adding and managing content in your Gated Component Library.

## Table of Contents

1. [Adding Components](#adding-components)
2. [Adding Checklist Items](#adding-checklist-items)
3. [Adding Changelog Entries](#adding-changelog-entries)

---

## Adding Components

Components are the main content of your library. Follow these steps to add a new component:

### Step 1: Locate the Content Directory

Navigate to:
```
apps/web/src/content/components/
```

You'll see two subdirectories:
- `free/` - For components accessible to all users
- `pro/` - For premium components requiring a paid subscription

### Step 2: Create a Component File

Create a new TypeScript file in the appropriate directory. For example:
- Free component: `apps/web/src/content/components/free/my-component.ts`
- Pro component: `apps/web/src/content/components/pro/my-component.ts`

### Step 3: Define the Component Structure

Use the following template for your component file:

```typescript
export const myComponent = {
  // Basic Information
  id: 'my-component',                           // Unique identifier (kebab-case)
  name: 'My Component',                         // Display name
  description: 'A brief description of what this component does and its purpose.',
  category: 'Forms',                            // Category: Forms, Layout, Navigation, etc.
  isFree: true,                                 // true for free, false for pro
  
  // Visual Assets
  thumbnail: '/thumbnails/my-component.png',    // Preview image path
  previewImage: '/previews/my-component.png',   // Optional: larger preview
  
  // Code
  code: `
import React from 'react'

export function MyComponent() {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h2 className="text-xl font-bold">My Component</h2>
      <p className="text-muted-foreground">Component content goes here</p>
    </div>
  )
}
  `,
  
  // File Information
  codeFilename: 'components/ui/my-component.tsx',   // Where users should save it
  installFilename: 'my-component.tsx',              // Alternative filename
  
  // Documentation
  note: 'This component solves the problem of...',  // Key issue it addresses
  
  implementationGuide: `
Copy the component code to your project
Import required dependencies from shadcn/ui
Customize the styling to match your design
Add your own content and props
  `,
  
  customization: `
You can customize this component by modifying the className props.
Change colors using Tailwind CSS utilities.
Adjust spacing with padding and margin classes.
  `,
  
  // Metadata (Optional)
  variantCount: 3,                                  // Number of variations available
  tags: ['form', 'input', 'validation'],           // Search tags
}
```

### Step 4: Register the Component

Open the file:
```
apps/web/src/lib/components-db.ts
```

Import and add your component to the registry:

```typescript
import { myComponent } from '@/content/components/free/my-component'

const allComponents = [
  // ... existing components
  myComponent,
]
```

### Step 5: Add Preview Images

Place your component preview images in:
```
apps/web/public/thumbnails/my-component.png
apps/web/public/previews/my-component.png
```

**Image Guidelines:**
- Thumbnail: 400x300px (or 4:3 ratio)
- Preview: 800x600px (or larger)
- Format: PNG or WebP
- Show the component in action with sample data

### Step 6: Test Your Component

1. Run the development server: `pnpm dev`
2. Navigate to `/dashboard/components`
3. Find your component in the list
4. Click to view the component page
5. Verify all information displays correctly

---

## Adding Checklist Items

Checklist items help users implement features step-by-step. Here's how to add them:

### Step 1: Choose Free or Pro

Navigate to:
```
apps/web/src/content/checklist/
```

Subdirectories:
- `free/` - Free checklist items
- `pro/` - Pro checklist items (require subscription)

### Step 2: Create a Checklist File

Create a new TypeScript file:
```
apps/web/src/content/checklist/free/my-checklist-item.ts
```

### Step 3: Define the Checklist Item

Use this template:

```typescript
export const myChecklistItem = {
  // Basic Information
  id: 'my-checklist-item',                     // Unique identifier
  title: 'Setup My Feature',                   // Short, action-oriented title
  description: 'Configure and implement my feature in your store.',
  icon: 'Settings',                            // Icon name from lucide-react
  isPro: false,                                // true for pro items
  
  // Detailed Content (supports HTML)
  detailContent: `
    <h3>Overview</h3>
    <p>This checklist item helps you set up and configure my feature.</p>
    
    <h3>Prerequisites</h3>
    <ul>
      <li>Requirement 1</li>
      <li>Requirement 2</li>
    </ul>
    
    <h3>Steps</h3>
    <ol>
      <li><strong>Step 1:</strong> Do this first thing</li>
      <li><strong>Step 2:</strong> Then do this</li>
      <li><strong>Step 3:</strong> Finally, complete this</li>
    </ol>
    
    <h3>Tips</h3>
    <ul>
      <li>💡 Helpful tip 1</li>
      <li>⚠️ Important warning</li>
      <li>✅ Best practice recommendation</li>
    </ul>
    
    <h3>Resources</h3>
    <ul>
      <li><a href="#">Official Documentation</a></li>
      <li><a href="#">Video Tutorial</a></li>
    </ul>
  `,
}
```

### Step 4: Available Icons

You can use any icon from [Lucide React](https://lucide.dev/icons/). Common choices:
- `Package` - Product-related
- `ShoppingCart` - E-commerce
- `Settings` - Configuration
- `Palette` - Design/Theming
- `Truck` - Shipping
- `TrendingUp` - Analytics
- `Zap` - Performance
- `Shield` - Security
- `Lock` - Access Control
- `BarChart` - Reporting

### Step 5: Register the Checklist Item

Open:
```
apps/web/src/lib/checklist-content.ts
```

Import and add your item:

```typescript
import { myChecklistItem } from '@/content/checklist/free/my-checklist-item'

const freeItems = [
  // ... existing items
  myChecklistItem,
]
```

### Step 6: Test the Checklist Item

1. Run: `pnpm dev`
2. Go to `/dashboard/shopify-checklist`
3. Find your item in the appropriate tab (Free or Pro)
4. Click to open the detail popup
5. Verify formatting and content

---

## Adding Changelog Entries

Keep users informed about updates and improvements:

### Step 1: Open the Changelog File

Navigate to:
```
apps/web/src/content/changelog.ts
```

### Step 2: Add a New Entry

Add a new entry at the **top** of the `changelogEntries` array:

```typescript
export const changelogEntries: ChangelogEntry[] = [
  // NEW ENTRY GOES HERE
  {
    version: 'v1.2.0',                          // Version number
    date: '2024-01-15',                         // Release date (YYYY-MM-DD)
    title: 'New Features and Improvements',     // Entry title
    
    // Optional: Featured media
    image: '/changelog/v1.2.0.png',            // Feature image
    videoUrl: '/videos/v1.2.0-demo.mp4',       // Or video
    
    // Badges (optional)
    badges: ['New Features', 'Bug Fixes', 'Performance'],
    
    // Features list
    features: [
      'Added 5 new premium components to the library',
      'Introduced dark mode support across all components',
      'New customization options for color themes',
      'Improved mobile responsiveness for all layouts',
    ],
    
    // Bug fixes list
    bugFixes: [
      'Fixed tooltip positioning on mobile devices',
      'Resolved form validation edge cases',
      'Corrected accessibility issues with modals',
      'Fixed dark mode color inconsistencies',
    ],
  },
  
  // ... existing entries
]
```

### Step 3: Changelog Entry Structure

Each entry supports:

**Required Fields:**
- `version`: Version number (e.g., "v1.2.0")
- `date`: Release date in YYYY-MM-DD format
- `title`: Brief, descriptive title

**Optional Fields:**
- `image`: Path to a feature image
- `videoUrl`: Path to a demo video
- `badges`: Array of category tags
- `features`: Array of new features
- `bugFixes`: Array of bug fixes

### Step 4: Add Media Assets

If using images or videos, place them in:
```
apps/web/public/changelog/v1.2.0.png
apps/web/public/videos/v1.2.0-demo.mp4
```

**Media Guidelines:**
- Images: 1200x630px (social media format)
- Videos: MP4 format, H.264 codec
- Keep file sizes reasonable (<5MB)

### Step 5: Writing Good Changelog Entries

**DO:**
- ✅ Use clear, user-focused language
- ✅ Group related changes together
- ✅ Highlight the most important changes first
- ✅ Be specific about what changed
- ✅ Include visual media for major features

**DON'T:**
- ❌ Use technical jargon unnecessarily
- ❌ List every minor code change
- ❌ Make entries too long
- ❌ Forget to date your entries

**Example - Good vs Bad:**

Good ✅:
```
"Added bulk upload feature - now you can import up to 1000 products at once"
```

Bad ❌:
```
"Implemented asynchronous batch processing for CSV file parsing"
```

### Step 6: Test the Changelog

1. Run: `pnpm dev`
2. Open the changelog dialog from the sidebar menu
3. Verify your entry appears at the top
4. Check that dates, badges, and media display correctly
5. Test both desktop and mobile views

---

## Best Practices

### General Guidelines

1. **Consistency**: Use consistent naming conventions across all content
2. **Quality**: Test all code snippets before publishing
3. **Documentation**: Provide clear, detailed instructions
4. **Visuals**: Include high-quality preview images
5. **Accessibility**: Ensure all content is accessible

### Component Guidelines

- Keep component code focused and reusable
- Include dependencies in the implementation guide
- Show real-world use cases
- Provide customization examples
- Test on multiple screen sizes

### Checklist Guidelines

- Make titles action-oriented ("Setup X", "Configure Y")
- Break complex tasks into small steps
- Include troubleshooting tips
- Link to relevant documentation
- Keep content current and tested

### Changelog Guidelines

- Publish regularly (at least monthly)
- Group related changes
- Use clear, non-technical language
- Highlight user benefits
- Include visuals for major features

---

## Troubleshooting

### Component Not Appearing

1. Check the component is imported in `components-db.ts`
2. Verify the `id` is unique
3. Ensure image paths are correct
4. Restart the development server

### Checklist Item Not Showing

1. Verify it's imported in `checklist-content.ts`
2. Check the icon name is valid
3. Ensure it's in the correct array (free/pro)
4. Clear browser cache

### Changelog Not Updating

1. Check date format is YYYY-MM-DD
2. Verify entry is at the top of the array
3. Restart development server
4. Clear browser cache

---

## Advanced Tips

### Using TypeScript

All content files support TypeScript for type safety:

```typescript
import type { Component } from '@/types/component'

export const myComponent: Component = {
  // TypeScript will validate your component structure
}
```

### Code Formatting

For multi-line code in components, use proper indentation:

```typescript
code: `
export function MyComponent() {
  return (
    <div>
      <h1>Properly Indented</h1>
    </div>
  )
}
`.trim(),  // Use .trim() to remove extra whitespace
```

### Dynamic Content

You can use JavaScript in your content files for dynamic data:

```typescript
export const myComponent = {
  id: 'my-component',
  name: 'My Component',
  date: new Date().toISOString(),  // Dynamic date
  version: process.env.NEXT_PUBLIC_VERSION,  // From env vars
}
```

---

## Getting Help

If you encounter issues or need assistance:

1. Check this guide thoroughly
2. Review existing components for examples
3. Test in a clean browser session
4. Check the browser console for errors
5. Verify all file paths are correct

---

## Quick Reference

### File Locations

```
apps/web/src/content/
├── components/
│   ├── free/          # Free components
│   └── pro/           # Pro components
├── checklist/
│   ├── free/          # Free checklist items
│   └── pro/           # Pro checklist items
└── changelog.ts       # Changelog entries

apps/web/public/
├── thumbnails/        # Component thumbnails
├── previews/          # Component preview images
├── changelog/         # Changelog images
└── videos/           # Demo videos
```

### Common Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format
```

---

## Content Checklist

Before publishing new content, verify:

- [ ] Content file created in correct directory
- [ ] Unique ID assigned
- [ ] All required fields completed
- [ ] Code tested and working
- [ ] Images added and optimized
- [ ] Imported in registry file
- [ ] Tested in development
- [ ] Tested on mobile
- [ ] Spelling and grammar checked
- [ ] Links verified (if any)

---

**Last Updated:** January 2025
**Version:** 1.0.0
