# Thumbnail Setup Guide

All component thumbnails are now managed locally in the project.

## Current Setup ✅

- **Location**: `apps/web/public/thumbnails/`
- **Default image**: `placeholder.svg` (cloud icon SVG)
- **All components** use: `/thumbnails/placeholder.svg`

## How to Replace with Your Image

### Quick Replace (Recommended)

Simply replace the placeholder file with your image:

1. Navigate to: `apps/web/public/thumbnails/`
2. Delete or rename `placeholder.svg`
3. Copy your cloud icon image to this folder
4. Rename your image to `placeholder.svg` (or `placeholder.png`, `placeholder.webp`, etc.)
5. If using a different extension, update the file extension in the registry (see below)

### If Using Different File Extension

If your image is PNG, JPG, or WebP:

1. Save your image as `apps/web/public/thumbnails/placeholder.png` (or `.jpg`, `.webp`)
2. Run this command to update all references:

```powershell
# For PNG
Set-Location C:\Users\ADMIN\projects\gated-component-library\packages\components\src
(Get-Content registry.ts) -replace '/thumbnails/placeholder\.svg', '/thumbnails/placeholder.png' | Set-Content registry.ts

# For WebP
(Get-Content registry.ts) -replace '/thumbnails/placeholder\.svg', '/thumbnails/placeholder.webp' | Set-Content registry.ts

# For JPG
(Get-Content registry.ts) -replace '/thumbnails/placeholder\.svg', '/thumbnails/placeholder.jpg' | Set-Content registry.ts
```

3. Run `npm run build` to rebuild

## Add Individual Component Thumbnails (Optional)

To use different images for each component:

1. Add images to `apps/web/public/thumbnails/` with descriptive names:
   - `buttons.png`
   - `modal.webp`
   - `social-buttons.png`
   - etc.

2. Edit `packages/components/src/registry.ts` and update each component:

```typescript
{
  id: 'buttons',
  name: 'Buttons',
  thumbnail: '/thumbnails/buttons.png', // Changed from placeholder.svg
  // ... rest of properties
}
```

## Image Specifications

- **Aspect Ratio**: 4:3 (recommended 600x450px)
- **Formats**: SVG, PNG, WebP, JPG
- **Size**: Keep under 100KB per image for best performance
- **Optimization**: Use tools like TinyPNG or ImageOptim before adding

## Troubleshooting

### Images not showing?
1. Make sure the file is in `apps/web/public/thumbnails/`
2. Verify the path in registry starts with `/thumbnails/`
3. Check file extension matches in the registry
4. Run `npm run build` after changes

### Build errors?
1. Ensure the thumbnail file exists
2. Check for typos in file names
3. Verify the path in `registry.ts` is correct

## File Structure

```
apps/web/public/thumbnails/
├── README.md           # Documentation
└── placeholder.svg     # Default thumbnail (replace this!)
```

After adding your custom thumbnails:

```
apps/web/public/thumbnails/
├── README.md
├── placeholder.svg     # Your cloud icon
├── buttons.png         # (Optional) Custom button thumbnail
├── modal.webp          # (Optional) Custom modal thumbnail
└── ...
```

## Quick Start

**Just want to replace the placeholder?**

1. Copy your cloud icon image to `apps/web/public/thumbnails/`
2. Rename it to `placeholder.svg` (or match the extension)
3. Done! All components will use your image.

**Want different thumbnails per component?**

1. Add all your component images to `apps/web/public/thumbnails/`
2. Update each component's `thumbnail` field in `packages/components/src/registry.ts`
3. Run `npm run build`
