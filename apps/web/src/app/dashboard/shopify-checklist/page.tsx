export const dynamic = 'force-dynamic'

import { prisma } from '@gated/database'
import ChecklistClient from './ChecklistClient'

export default async function ShopifyChecklistPage() {
  // Server-side fetch ensures data shows immediately (no client API dependency)
  const items = await prisma.$queryRaw<Array<{
    id: string,
    title: string,
    description: string,
    icon: string,
    isPro: boolean,
    detailContent: string,
  }>>`SELECT id, title, description, icon, "isPro", COALESCE("detailContent", '') AS "detailContent"
     FROM "ChecklistItem"
     WHERE "isActive" = true
     ORDER BY "order" ASC`

  return <ChecklistClient initialItems={items} />
}
