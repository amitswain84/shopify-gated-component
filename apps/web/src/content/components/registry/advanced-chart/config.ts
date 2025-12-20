import { Component } from '../../../config'

export const advancedChart: Component = {
    id: 'advanced-chart',
    name: 'Advanced Charts',
    slug: 'advanced-chart',
    title: 'Advanced Charts',
    access: 'paid',
    description: 'Interactive charts with animations and real-time data',
    category: 'paid',
    isFree: false,
    variantCount: 15,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 2,
    tags: ['ui', 'charts', 'data', 'pro'],
    dependencies: ['recharts', 'framer-motion'],
    installCommand: '',
    code: `// This is premium content. Upgrade to access this component.`,
    implementationSteps: ['Upgrade to Pro to access this component'],
    customizationGuide: []
}
