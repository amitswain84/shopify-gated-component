'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface TocItem {
  id: string
  title: string
  level: number
}

interface TocContextType {
  items: TocItem[]
  setItems: (items: TocItem[]) => void
}

const TocContext = createContext<TocContextType>({
  items: [],
  setItems: () => {},
})

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([])

  return (
    <TocContext.Provider value={{ items, setItems }}>
      {children}
    </TocContext.Provider>
  )
}

export function useToc() {
  const context = useContext(TocContext)
  return context
}
