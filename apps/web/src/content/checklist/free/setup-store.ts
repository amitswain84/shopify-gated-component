import { ChecklistItem } from '../../config'

export const setupStore: ChecklistItem = {
  id: 'setup-store',
  title: 'Set up your Shopify store',
  description: 'Create and configure your basic Shopify store settings',
  icon: 'Package',
  access: 'free',
  isPro: false,
  order: 1,
  tags: ['setup', 'configuration', 'basics'],
  estimatedTime: '30 minutes',
  difficulty: 'beginner',
  prerequisites: [],
  detailContent: `# Getting Started with Your Shopify Store

Setting up your Shopify store is the foundation of your e-commerce success. Follow these detailed steps:

## Step 1: Store Information
- Navigate to **Settings > General** in your Shopify admin
- Fill in your store name, email, and business details
- Add your store address for tax and shipping calculations

## Step 2: Currency and Units
- Choose your primary currency based on your target market
- Set up measurement units (metric or imperial)
- Configure timezone for accurate order timestamps

## Step 3: Legal Pages
- Create privacy policy, terms of service, and refund policy
- Add these to your store footer for legal compliance
- Use Shopify's template generator for quick setup

## Step 4: Store Preferences
- Set your checkout preferences
- Configure customer accounts (optional or required)
- Enable order processing notifications

**Pro Tip:** Take your time with initial setup - changes later can affect existing orders and customers.

## Common Issues
- **Currency changes:** Be careful changing currency after launch as it affects existing orders
- **Legal compliance:** Ensure your legal pages meet local regulations
- **Tax settings:** Configure properly to avoid issues with customers

## Next Steps
Once your basic store is configured, you can proceed to adding products and customizing your theme.`
}