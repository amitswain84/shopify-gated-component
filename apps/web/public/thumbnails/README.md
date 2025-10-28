# Component Thumbnails

This folder contains thumbnail images for all components in the library.

## File Structure

All component thumbnails are stored in this directory:
```
apps/web/public/thumbnails/
```

## Current Setup

- **Default placeholder**: `placeholder.svg` - A cloud icon placeholder used for all components
- All components in the registry use: `/thumbnails/placeholder.svg`

## How to Add/Update Thumbnails

### Option 1: Replace the placeholder (Easiest)
Simply replace `placeholder.svg` with your desired image (can be PNG, JPG, WebP, or SVG)

### Option 2: Add individual component thumbnails
1. Add your thumbnail image to this folder (e.g., `button.png`, `modal.webp`)
2. Update the component in `packages/components/src/registry.ts`:
   ```typescript
   {
     id: 'buttons',
     name: 'Buttons',
     thumbnail: '/thumbnails/button.png', // Update this path
     // ... other properties
   }
   ```

## Image Guidelines

- **Recommended size**: 600x450px (4:3 aspect ratio)
- **Supported formats**: PNG, JPG, WebP, SVG
- **File naming**: Use kebab-case matching component IDs (e.g., `button-groups.png`)
- **Optimization**: Compress images before adding to keep bundle size small

## Examples

```
/thumbnails/placeholder.svg          (default for all)
/thumbnails/buttons.png              (custom for buttons component)
/thumbnails/social-buttons.webp      (custom for social buttons)
/thumbnails/modal.png                (custom for modal component)
```

## Current Components Using Placeholder

All components currently use `/thumbnails/placeholder.svg`:
- Featured icons
- Buttons
- Social buttons
- Mobile app store buttons
- Utility buttons
- Button groups
- Badges
- Badge groups
- Tags
- Dropdowns
- Select
- Inputs
- Textareas
- Verification code inputs
- Rich text editors
- Landing page examples
- Dashboard examples
- Pricing examples
- And all premium components

## Next Steps

1. **Replace placeholder.svg** with your cloud icon image from the screenshot
2. Optionally, add individual thumbnails for each component
3. Update registry paths if using individual thumbnails
4. Run `npm run build` to verify images load correctly
