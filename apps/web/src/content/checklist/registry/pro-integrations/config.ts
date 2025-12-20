import { ChecklistItem } from '../../../config'

export const proIntegrations: ChecklistItem = {
    id: 'pro-integrations',
    title: 'Pro integrations setup',
    description: 'Connect with premium third-party tools and services',
    access: 'paid',
    icon: 'Zap',
    isPro: true,
    order: 7,
    tags: ['integrations', 'automation', 'pro'],
    estimatedTime: '3-4 hours',
    difficulty: 'advanced',
    prerequisites: ['setup-store', 'add-products', 'configure-payments'],
    detailContent: `# Premium Integrations (Pro)

Connect your store with powerful third-party tools for enhanced functionality.

## Marketing Automation
- Klaviyo for email marketing
- Omnisend for omnichannel campaigns
- Privy for pop-ups and conversions

## Analytics & Insights
- Google Analytics 4 (advanced setup)
- Hotjar for heatmaps
- Lucky Orange for session recordings

## Customer Support
- Gorgias for helpdesk
- Tidio for live chat
- Re:amaze for customer engagement

**Pro Benefit:** Priority integration support and custom webhook setup.`
}
