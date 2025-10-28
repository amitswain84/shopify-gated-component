# Adding New Components

This guide explains how to add new components to the Gated Component Library.

## Current Architecture

**Important:** Currently, all component data is stored in the component registry file, **NOT in Supabase**. The data is stored locally in:

```
packages/components/src/registry.ts
```

## Adding a New Component

To add a new component to the library, follow these steps:

### 1. Open the Registry File

Navigate to `packages/components/src/registry.ts`

### 2. Add Your Component to the Array

Add a new component object to the `componentRegistry` array. Choose the appropriate section:

- **FREE COMPONENTS** section for free components
- **PAID/PREMIUM COMPONENTS** section for premium components

### 3. Component Schema

Each component must follow this interface:

```typescript
{
  id: string                    // Unique identifier (kebab-case, e.g., 'my-component')
  name: string                  // Display name (e.g., 'My Component')
  description: string           // Brief description or variant info
  category: 'free' | 'paid'     // Component category for filtering
  isFree: boolean               // true for free, false for premium
  variantCount: number          // Number of variants available
  componentCount?: number       // (Optional) Number of sub-components
  thumbnail?: string            // (Optional) URL to thumbnail image
  isPageExample?: boolean       // (Optional) true if this is a page example
  code: string                  // Component code or placeholder
}
```

### 4. Example: Adding a Free Component

```typescript
{
  id: 'my-new-button',
  name: 'Animated Button',
  description: '3 components + 45 variants',
  category: 'free',
  isFree: true,
  componentCount: 3,
  variantCount: 45,
  thumbnail: 'https://placehold.co/600x450/f5f5f5/6366f1?text=Animated+Button',
  code: `export function AnimatedButton() { return <button>Click me</button> }`,
}
```

### 5. Example: Adding a Premium Component

```typescript
{
  id: 'advanced-datepicker',
  name: 'Advanced Datepicker',
  description: '8 components + 150 variants',
  category: 'paid',
  isFree: false,
  componentCount: 8,
  variantCount: 150,
  thumbnail: 'https://placehold.co/600x450/f5f5f5/8b5cf6?text=Datepicker',
  code: `// This is premium content. Upgrade to access this component.`,
}
```

### 6. Example: Adding a Page Example

```typescript
{
  id: 'ecommerce-pages',
  name: 'E-commerce page examples',
  description: '35 page examples',
  category: 'free',
  isFree: true,
  variantCount: 35,
  isPageExample: true,
  thumbnail: 'https://placehold.co/600x450/f5f5f5/6366f1?text=Ecommerce',
  code: `export function EcommercePage() { return <div>Ecommerce Page</div> }`,
}
```

## Thumbnail Guidelines

### Color Schemes
- **Free components**: Use `#6366f1` (indigo) as the accent color
- **Premium components**: Use `#8b5cf6` (purple) as the accent color
- **Background**: Use `#f5f5f5` (light gray) for consistency

### Placeholder URLs
You can use `placehold.co` for temporary thumbnails:

```
Free: https://placehold.co/600x450/f5f5f5/6366f1?text=Component+Name
Paid: https://placehold.co/600x450/f5f5f5/8b5cf6?text=Component+Name
```

## Descriptions Format

Follow these patterns for consistency:

- **Single component with variants**: `"{count} variants"` 
  - Example: `"45 variants"`
  
- **Multiple components with variants**: `"{count} components + {count} variants"`
  - Example: `"5 components + 120 variants"`
  
- **Page examples**: `"{count} page examples"`
  - Example: `"20 page examples"`

## Testing Your Changes

After adding components:

1. Save the `registry.ts` file
2. The build system will automatically reload
3. Navigate to `/dashboard/components` to see all components
4. Use the sidebar to filter:
   - **All Components**: Shows everything
   - **Free**: Shows only free components (`isFree: true`)
   - **Premium**: Shows only premium components (`isFree: false`)

## Future: Supabase Migration

**Note:** In the future, this data will be migrated to Supabase for dynamic management. When that happens, this documentation will be updated with:

- Database schema
- API endpoints for CRUD operations
- Admin interface for managing components
- Instructions for uploading real thumbnails to storage

For now, all changes must be made directly in the `registry.ts` file.

## Need Help?

If you have questions about adding components, please:
1. Review existing components in `registry.ts` for reference
2. Ensure your component follows the interface schema
3. Test the component appears correctly in all three views (All/Free/Premium)
