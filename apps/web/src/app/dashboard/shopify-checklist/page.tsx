export const dynamic = 'force-dynamic'

import { getAllChecklistItems } from '@/lib/checklist-content'
import ChecklistClient from './ChecklistClient'

export default async function ShopifyChecklistPage() {
  // Server-side fetch ensures data shows immediately (no client API dependency)
  let items: Array<{ id: string; title: string; description: string; icon: string; isPro: boolean; detailContent: string }>
  try {
    items = await getAllChecklistItems()
  } catch (err) {
    console.error('Checklist server fetch failed:', err)
    items = []
  }

  return <ChecklistClient initialItems={items} />
}
