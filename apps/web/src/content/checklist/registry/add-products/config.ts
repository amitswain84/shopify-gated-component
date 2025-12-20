import { ChecklistItem } from '../../../config'

export const addProducts: ChecklistItem = {
    id: 'add-products',
    title: 'Add product listings',
    description: 'Upload products with images, descriptions, and pricing',
    access: 'free',
    icon: 'ShoppingCart',
    isPro: false,
    order: 2,
    tags: ['products', 'catalog'],
    estimatedTime: '1-2 hours',
    difficulty: 'beginner',
    prerequisites: ['setup-store'],
    detailContent: `# Creating Product Listings

Your product listings are crucial for conversions. Here's how to optimize them:

## Essential Elements
1. **Product Title**: Clear, descriptive, and SEO-friendly (50-60 characters)
2. **High-Quality Images**: Multiple angles, 2000x2000px minimum
3. **Detailed Description**: Benefits, features, specifications
4. **Pricing**: Competitive pricing with compare-at price if applicable

## Organization
- Use collections to group similar products
- Add tags for better searchability
- Set up variants for sizes, colors, etc.

## SEO Optimization
- Write unique meta descriptions for each product
- Use descriptive URLs
- Add alt text to all images

**Best Practice:** Start with 10-20 products and expand gradually to ensure quality over quantity.`
}
