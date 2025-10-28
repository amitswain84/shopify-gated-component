export const dynamic = 'force-dynamic'

import { headers } from 'next/headers'
import { ComponentCard } from '@/components/component-card'
import { getAllComponents } from '@/lib/components-db'
import { ComponentsFilterTabs } from '@/components/components-filter-tabs'

type SearchParams = {
  filter?: string
}

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const filter = searchParams.filter
  const currentFilter: 'all' | 'free' | 'premium' = filter === 'free' || filter === 'premium' ? filter : 'all'

  // Fetch via internal API with absolute URL (avoids relative URL issues in SSR)
  const h = headers()
  const host = h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || 'http'
  const base = `${proto}://${host}`
  const url = filter ? `${base}/api/components?filter=${filter}` : `${base}/api/components`
  let filteredComponents: any[] = []
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      filteredComponents = data.components || []
    }
  } catch {}

  // Fallback to direct DB fetch if API failed
  if (filteredComponents.length === 0) {
    const all = await getAllComponents()
    filteredComponents = filter
      ? all.filter((c) => {
          if (filter === 'free') return c.isFree
          if (filter === 'premium') return !c.isFree
          return true
        })
      : all
  }

  const title = filter === 'free' 
    ? 'Free Components' 
    : filter === 'premium' 
    ? 'Premium Components' 
    : 'All Components'

  const description = filter === 'free'
    ? `Browse our ${filteredComponents.length} free components`
    : filter === 'premium'
    ? `Explore our ${filteredComponents.length} premium components`
    : `Browse our complete collection of ${filteredComponents.length} components`

  // Compute counts for tabs
  const allComponents = await getAllComponents()
  const allCount = allComponents.length
  const freeCount = allComponents.filter((c) => c.isFree).length
  const premiumCount = allCount - freeCount

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="sm:ml-auto">
          <ComponentsFilterTabs currentFilter={currentFilter} counts={{ all: allCount, free: freeCount, premium: premiumCount }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {filteredComponents.map((component: any) => {
          const id = component.componentId ?? component.id
          const thumb = component.thumbnail ?? component.previewImage
          return (
            <ComponentCard
              key={id}
              id={id}
              name={component.name}
              description={component.description}
              thumbnail={thumb}
              variantCount={component.variantCount || 1}
              componentCount={component.componentCount}
              isFree={component.isFree}
              isPageExample={component.isPageExample}
            />
          )
        })}
      </div>
    </div>
  )
}
