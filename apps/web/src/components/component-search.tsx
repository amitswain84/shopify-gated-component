'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { componentRegistry } from '@gated/components'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function ComponentSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const filteredComponents = search
    ? componentRegistry.filter((component) =>
        component.name.toLowerCase().includes(search.toLowerCase()) ||
        component.description.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 8)
    : []

  const handleSelect = (componentId: string) => {
    router.push(`/dashboard/components/${componentId}`)
    setOpen(false)
    setSearch('')
  }

  const handleNoResults = () => {
    router.push('/dashboard/components')
    setOpen(false)
    setSearch('')
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 sm:px-3 sm:py-1.5 h-9 sm:h-auto text-sm text-muted-foreground bg-muted/50 rounded-md hover:bg-muted transition-colors border">
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">Search components...</span>
          <kbd className="hidden sm:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[90vw] sm:w-[400px] p-0" align="center" side="bottom" sideOffset={8}>
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Search components..." 
            value={search}
            onValueChange={setSearch}
            ref={inputRef}
          />
          <CommandList>
            {search && filteredComponents.length === 0 ? (
              <CommandEmpty>
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    No components found
                  </p>
                  <button
                    onClick={handleNoResults}
                    className="text-sm text-primary hover:underline"
                  >
                    View all components →
                  </button>
                </div>
              </CommandEmpty>
            ) : search && filteredComponents.length > 0 ? (
              <CommandGroup heading="Components">
                {filteredComponents.map((component) => (
                  <CommandItem
                    key={component.id}
                    value={component.id}
                    onSelect={() => handleSelect(component.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-shrink-0 w-10 h-10 rounded border overflow-hidden bg-muted relative">
                        <Image 
                          src={component.thumbnail || '/thumbnails/placeholder.svg'} 
                          alt={component.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{component.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {component.description}
                        </p>
                      </div>
                      {!component.isFree && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                          Pro
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
