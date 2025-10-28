'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { type TocItem } from '@/contexts/toc-context'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface MobileTocMenuProps {
  items: TocItem[]
  currentSection?: string
}

export function MobileTocMenu({ items, currentSection }: MobileTocMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  if (items.length === 0) return null

  const activeItem = items.find(item => item.id === currentSection)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="border-b bg-background">
        <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium hover:bg-accent/50 transition-colors">
          <span className="text-muted-foreground">
            {activeItem?.title || items[0]?.title || 'On this page'}
          </span>
          <ChevronDown 
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} 
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="border-b bg-muted/30">
          <nav className="py-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  flex w-full items-center px-4 py-2.5 text-sm transition-colors
                  hover:bg-accent hover:text-accent-foreground
                  ${currentSection === item.id ? 'text-foreground font-medium bg-accent/50' : 'text-muted-foreground'}
                  ${item.level === 3 ? 'pl-8' : ''}
                `}
              >
                {item.title}
              </button>
            ))}
          </nav>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
