'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { type TocItem } from '@/contexts/toc-context'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="sticky top-24 w-full border rounded-lg max-h-[calc(100vh-7rem)] overflow-auto">
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <List className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">On this page</h3>
        </div>
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`
                block w-full text-left text-sm py-1.5 px-2 rounded-md transition-colors
                hover:bg-accent hover:text-accent-foreground
                ${activeId === item.id ? 'text-foreground font-medium bg-accent' : 'text-muted-foreground'}
                ${item.level === 3 ? 'pl-4' : ''}
              `}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
