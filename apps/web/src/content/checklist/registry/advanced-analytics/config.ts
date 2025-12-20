import { ChecklistItem } from '../../../config'

export const advancedAnalytics: ChecklistItem = {
    id: 'advanced-analytics',
    title: 'Advanced analytics setup',
    description: 'Implement comprehensive analytics and reporting',
    access: 'paid',
    icon: 'BarChart',
    isPro: true,
    order: 8,
    tags: ['analytics', 'reporting', 'pro'],
    estimatedTime: '2-3 hours',
    difficulty: 'advanced',
    prerequisites: ['setup-store', 'add-products'],
    detailContent: `# Advanced Analytics Dashboard (Pro)

Make data-driven decisions with comprehensive analytics and insights.

## Key Metrics
- Revenue by product/collection
- Customer lifetime value (CLV)
- Average order value (AOV)
- Sales by traffic source

## Custom Reports
- Inventory turnover
- Product performance ranking
- Marketing ROI by channel
- Conversion funnel analysis

**Pro Feature:** AI-powered insights and personalized recommendations for growth.`
}
