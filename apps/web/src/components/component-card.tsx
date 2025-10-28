'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Lock } from 'lucide-react'
import { useUserPlan } from '@/hooks/use-user-plan'

interface ComponentCardProps {
  id: string
  name: string
  description: string
  thumbnail?: string
  variantCount: number
  componentCount?: number
  isFree: boolean
  isPageExample?: boolean
  // When provided, show this instead of the variants line (used by components page)
}

export function ComponentCard({
  id,
  name,
  description,
  thumbnail,
  variantCount,
  componentCount,
  isFree,
  isPageExample = false,
}: ComponentCardProps) {
  const { plan } = useUserPlan()
  const isLocked = !isFree && plan === 'FREE'

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('openPricingDialog'))
    }
  }

  return (
    <Link href={`/dashboard/components/${id}`} className="block" onClick={handleClick}>
      <div className={`group relative border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-200 ${isLocked ? 'cursor-pointer' : ''}`}>
        {/* Thumbnail with border */}
        <div className="m-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 aspect-[768/400] overflow-hidden flex items-center justify-center relative">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={name}
              width={600}
              height={450}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-5xl font-bold text-gray-300 dark:text-gray-600">{name.charAt(0)}</div>
            </div>
          )}
          {/* Lock overlay for pro components - only over thumbnail */}
          {isLocked && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center gap-1">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <span className="text-[11px] font-medium text-muted-foreground">Pro Only</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-3 pb-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
              {name}
            </h3>
            <Badge 
              variant={isFree ? "outline" : "default"}
              className={isFree 
                ? "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-[11px] px-2 py-0.5 h-5 shrink-0" 
                : "bg-black dark:bg-white text-white dark:text-black text-[11px] px-2 py-0.5 h-5 shrink-0"
              }
            >
              {isFree ? 'Free' : 'Pro'}
            </Badge>
          </div>
          
<p className="text-xs text-gray-700 dark:text-gray-300">
            {isPageExample 
              ? `${variantCount} page examples`
              : `+${variantCount} variant${variantCount > 1 ? 's' : ''}`
            }
          </p>
        </div>

      </div>
    </Link>
  )
}
