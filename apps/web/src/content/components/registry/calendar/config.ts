import { Component } from '../../../config'

export const calendar: Component = {
    id: 'calendar',
    name: 'Calendar Component',
    slug: 'calendar',
    title: 'Calendar Component',
    access: 'paid',
    description: 'Full-featured calendar with events and scheduling',
    category: 'paid',
    isFree: false,
    variantCount: 10,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 3,
    tags: ['ui', 'calendar', 'scheduling', 'pro'],
    dependencies: ['date-fns', 'react-day-picker'],
    installCommand: '',
    code: `// This is premium content. Upgrade to access this component.`,
    implementationSteps: ['Upgrade to Pro to access this component'],
    customizationGuide: []
}
