import { ChecklistItem } from '../../../config'

export const configurePayments: ChecklistItem = {
    id: 'configure-payments',
    title: 'Configure payment gateway',
    description: 'Set up secure payment processing for customer transactions',
    access: 'free',
    icon: 'Settings',
    isPro: false,
    order: 3,
    tags: ['payments', 'security'],
    estimatedTime: '45 minutes',
    difficulty: 'intermediate',
    prerequisites: ['setup-store'],
    detailContent: `# Payment Gateway Setup

Accepting payments securely is critical for your store's success.

## Available Options
1. **Shopify Payments** (Recommended)
   - No transaction fees
   - Easy setup
   - Competitive rates

2. **Third-Party Gateways**
   - PayPal, Stripe, Square
   - Additional transaction fees apply
   - More setup required

## Setup Process
1. Go to Settings > Payments
2. Choose your payment provider
3. Enter business and banking details
4. Enable test mode before going live
5. Complete verification process

## Security
- Ensure SSL certificate is active
- Enable fraud analysis
- Set up 2FA for your admin account

**Important:** Test transactions thoroughly before launching to customers.`
}
