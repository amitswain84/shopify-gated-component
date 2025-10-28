'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { ThemeToggle } from '@/components/theme-toggle'
import { DynamicBreadcrumb } from '@/components/dynamic-breadcrumb'
import { MobileTocMenu } from '@/components/mobile-toc-menu'
import { ComponentSearch } from '@/components/component-search'
import { useToc } from '@/contexts/toc-context'

export function DashboardHeader() {
  const { items } = useToc()
  
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        {/* Sidebar toggle on the left */}
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2 h-4 hidden md:block" />

        {/* Breadcrumbs - visible on all breakpoints, single-line on mobile */}
        <div className="flex-1 min-w-0">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            <DynamicBreadcrumb />
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ComponentSearch />
          <ThemeToggle />
        </div>
      </header>
      {/* Mobile TOC Menu - Only shown on mobile when items exist */}
      <div className="lg:hidden">
        <MobileTocMenu items={items} />
      </div>
    </>
  )
}
