'use client'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const pathNameMap: Record<string, string> = {
  dashboard: 'Dashboard',
  components: 'Components',
  profile: 'Profile',
  settings: 'Settings',
  pricing: 'Pricing',
}

export function DynamicBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  // If on dashboard root, show simple breadcrumb
  if (segments.length === 1 && segments[0] === 'dashboard') {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Build dynamic breadcrumb
  return (
    <Breadcrumb className="overflow-hidden text-ellipsis whitespace-nowrap">
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {segments.map((segment, index) => {
          if (index === 0 && segment === 'dashboard') return null
          const isLast = index === segments.length - 1
          const href = `/${segments.slice(0, index + 1).join('/')}`
          const label = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
          
          // On mobile, only show last 2 items
          const isSecondToLast = index === segments.length - 2
          const shouldShowOnMobile = isLast || isSecondToLast

          // Mobile widths to keep everything on one line with ellipsis
          const mobileWidthClass = isLast ? 'max-w-[50vw]' : isSecondToLast ? 'max-w-[40vw]' : ''

          return (
            <div key={segment} className={`flex items-center gap-2 ${!shouldShowOnMobile ? 'hidden md:flex' : ''}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className={`truncate ${mobileWidthClass} md:max-w-none`}>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className={`truncate ${mobileWidthClass} md:max-w-none`}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className={!shouldShowOnMobile ? 'hidden md:block' : ''} />}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
