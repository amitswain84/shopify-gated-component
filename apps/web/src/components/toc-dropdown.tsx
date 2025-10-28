'use client'

import { useState } from 'react'
import { ChevronDown, List } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type TocItem } from '@/contexts/toc-context'

interface TocDropdownProps {
  items: TocItem[]
}

export function TocDropdown({ items }: TocDropdownProps) {
  const [open, setOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  if (items.length === 0) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-1.5 text-xs sm:text-sm"
        >
          <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">On this page</span>
          <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`cursor-pointer ${item.level === 3 ? 'pl-8' : ''}`}
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
