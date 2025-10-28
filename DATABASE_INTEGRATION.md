# Database Integration for Components and Checklist

This document describes the database-driven approach for managing components and checklist content.

## Overview

Both the component library and checklist system can now be managed directly through the Supabase database, allowing for dynamic content updates without code changes.

## Database Schema

### ChecklistItem Model
Stores checklist items with detailed content:
- `id`: Unique identifier
- `title`: Checklist item title
- `description`: Short description
- `icon`: Icon name (from Lucide icons)
- `isPro`: Boolean indicating if it's a pro feature
- `order`: Display order
- `isActive`: Boolean to enable/disable items
- `detailContent`: Rich markdown content displayed in popup (NEW)

### Component Model (NEW)
Stores component library items:
- `id`: Database ID
- `componentId`: URL-friendly identifier (e.g., 'avatar', 'button')
- `name`: Component display name
- `description`: Component description
- `category`: 'free' | 'paid' | 'all'
- `isFree`: Boolean indicating free/premium status
- `code`: Full component code
- `preview`: Optional preview code
- `variantCount`: Number of variants
- `componentCount`: Number of components
- `thumbnail`: Thumbnail image path
- `isPageExample`: Boolean for page examples
- `order`: Display order
- `isActive`: Boolean to enable/disable components

## Features Implemented

### 1. Checklist Detail Content
- ✅ Added `detailContent` field to ChecklistItem model
- ✅ Updated seed with detailed markdown content for all 10 checklist items
- ✅ Modified popup dialog/drawer to render `detailContent` instead of hardcoded text
- ✅ Content is now fully manageable through Supabase

### 2. Component Library from Database
- ✅ Added Component model to store all component data
- ✅ Created 10 test components (5 free + 5 pro) with real code
- ✅ Created API routes:
  - `GET /api/components` - Fetch all components (with filter support)
  - `GET /api/components/[id]` - Fetch specific component
  - `POST /api/components` - Create new component (admin)
  - `PATCH /api/components/[id]` - Update component (admin)
  - `DELETE /api/components/[id]` - Delete component (admin)
- ✅ Created server-side helper functions with automatic fallback
- ✅ Updated components pages to use database with registry fallback

### 3. Fallback System
Both systems have automatic fallback to hardcoded data if database is unavailable:
- **Components**: Falls back to `componentRegistry` from `@gated/components`
- **Checklist**: Already working with database, API returns error if unavailable

## Managing Content

### Through Supabase Dashboard
1. Log into your Supabase dashboard
2. Navigate to Table Editor
3. Select `ChecklistItem` or `Component` table
4. Add/Edit/Delete rows directly

### Through API (for programmatic access)

#### Checklist Items
```typescript
// Create new checklist item
POST /api/checklist/items
{
  "title": "New Task",
  "description": "Task description",
  "icon": "Package",
  "isPro": false,
  "order": 11,
  "detailContent": "# Detailed content here\n\n..."
}
```

#### Components
```typescript
// Create new component
POST /api/components
{
  "componentId": "my-component",
  "name": "My Component",
  "description": "Component description",
  "category": "free",
  "isFree": true,
  "code": "export function MyComponent() { ... }",
  "variantCount": 3,
  "thumbnail": "/thumbnails/my-component.svg"
}

// Update existing component
PATCH /api/components/my-component
{
  "code": "updated code...",
  "description": "Updated description"
}
```

## Testing

The seed file (`packages/database/prisma/seed.ts`) includes:
- 5 free checklist items with detailed content
- 5 pro checklist items with detailed content
- 5 free components (Avatar, Button, Badge, Input, Card)
- 5 pro components (DataTable, Chart, Modal, Dropdown, Toast)

To reseed the database:
```bash
cd packages/database
pnpm prisma db push
pnpm prisma db seed
```

## TOC Integration

The checklist popup now properly displays detailed content, and all component pages maintain proper TOC (Table of Contents) functionality for navigation.

## Future Enhancements

1. **Admin Dashboard**: Create UI for managing components and checklist items
2. **Versioning**: Track component versions and changes
3. **Analytics**: Track component usage and checklist completion
4. **Preview Mode**: Test changes before making them live
5. **Import/Export**: Bulk import/export functionality for components

## Notes

- The system gracefully falls back to the hardcoded registry if the database is unavailable
- All existing functionality remains intact
- Components can be updated through Supabase without redeployment
- Checklist content can be enriched with markdown formatting
- Pro components and checklist items respect user subscription status
