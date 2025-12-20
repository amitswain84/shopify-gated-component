'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer'
import { Badge } from '@/components/ui/badge'
import { PricingCards } from '@/components/pricing-cards'
import { useMediaQuery } from '@/hooks/use-media-query'

interface PricingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PricingDialog({ open, onOpenChange }: PricingDialogProps) {
  const { isMobile } = useMediaQuery()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <div className="p-3">
            <PricingCards onClose={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto p-0">
        <div className="p-4">
          <PricingCards onClose={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
