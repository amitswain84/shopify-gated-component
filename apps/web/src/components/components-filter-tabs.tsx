"use client"

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type FilterCounts = { all: number; free: number; premium: number }

export function ComponentsFilterTabs({ currentFilter, counts }: { currentFilter: 'all' | 'free' | 'premium'; counts?: FilterCounts }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onChange = (val: string) => {
    const sp = new URLSearchParams(searchParams?.toString())
    if (val === 'all') {
      sp.delete('filter')
    } else {
      sp.set('filter', val)
    }
    const qs = sp.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <Tabs value={currentFilter} onValueChange={onChange}>
      <TabsList>
        <TabsTrigger value="all">
          All{typeof counts?.all === 'number' && <span className="ml-1 text-xs text-muted-foreground">({counts.all})</span>}
        </TabsTrigger>
        <TabsTrigger value="free">
          Free{typeof counts?.free === 'number' && <span className="ml-1 text-xs text-muted-foreground">({counts.free})</span>}
        </TabsTrigger>
        <TabsTrigger value="premium">
          Pro{typeof counts?.premium === 'number' && <span className="ml-1 text-xs text-muted-foreground">({counts.premium})</span>}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
