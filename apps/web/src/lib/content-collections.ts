import { Component, ChecklistItem } from '@/content/config'

// Import components from registry
import { avatar } from '@/content/components/registry/avatar/config'
import { button } from '@/content/components/registry/button/config'
import { card } from '@/content/components/registry/card/config'
import { badge } from '@/content/components/registry/badge/config'
import { input } from '@/content/components/registry/input/config'
import { dataTable } from '@/content/components/registry/data-table/config'
import { advancedChart } from '@/content/components/registry/advanced-chart/config'
import { calendar } from '@/content/components/registry/calendar/config'

// Import checklist items from registry
import { setupStore } from '@/content/checklist/registry/setup-store/config'
import { addProducts } from '@/content/checklist/registry/add-products/config'
import { configurePayments } from '@/content/checklist/registry/configure-payments/config'
import { advancedSeo } from '@/content/checklist/registry/advanced-seo/config'
import { proIntegrations } from '@/content/checklist/registry/pro-integrations/config'
import { advancedAnalytics } from '@/content/checklist/registry/advanced-analytics/config'

// Registry aggregation
export const allComponents: Component[] = [
  avatar,
  button,
  card,
  badge,
  input,
  dataTable,
  advancedChart,
  calendar
].sort((a, b) => {
  // Sort by order if available, otherwise name
  if (a.order && b.order) return a.order - b.order
  return a.name.localeCompare(b.name)
})

// Derived collections for backward compatibility
export const freeComponents: Component[] = allComponents.filter(
  c => c.access === 'free' || c.isFree === true || (c.category === 'free' && !c.access)
)

export const proComponents: Component[] = allComponents.filter(
  c => c.access === 'paid' || c.isFree === false || (c.category === 'paid' && !c.access)
)

// Checklist aggregation
export const allChecklistItems: ChecklistItem[] = [
  setupStore,
  addProducts,
  configurePayments,
  advancedSeo,
  proIntegrations,
  advancedAnalytics
].sort((a, b) => a.order - b.order)

// Derived checklist collections
export const freeChecklistItems: ChecklistItem[] = allChecklistItems.filter(
  item => item.access === 'free' || item.isPro === false
)

export const proChecklistItems: ChecklistItem[] = allChecklistItems.filter(
  item => item.access === 'paid' || item.isPro === true
)

// Helper functions
export function getComponentById(id: string): Component | undefined {
  return allComponents.find(component => component.id === id)
}

export function getComponentsByCategory(category: 'free' | 'paid' | 'all'): Component[] {
  if (category === 'all') return allComponents
  return allComponents.filter(component => component.category === category)
}

export function getFreeComponents(): Component[] {
  return freeComponents
}

export function getProComponents(): Component[] {
  return proComponents
}

export function getChecklistItemById(id: string): ChecklistItem | undefined {
  return allChecklistItems.find(item => item.id === id)
}

export function getChecklistItemsByType(isPro: boolean): ChecklistItem[] {
  return allChecklistItems.filter(item => item.isPro === isPro)
}

export function getFreeChecklistItems(): ChecklistItem[] {
  return freeChecklistItems
}

export function getProChecklistItems(): ChecklistItem[] {
  return proChecklistItems
}