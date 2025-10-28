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
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <div className="flex flex-col items-center gap-2">
              <Badge>Pricing</Badge>
              <DrawerTitle className="text-2xl tracking-tighter text-center">
                Choose your plan
              </DrawerTitle>
              <DrawerDescription className="text-sm text-center">
                Start with 20 free components or unlock the full library with Pro.
              </DrawerDescription>
            </div>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            <PricingCards onClose={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Badge>Pricing</Badge>
            <DialogTitle className="text-3xl md:text-4xl tracking-tighter text-center">
              Choose your plan
            </DialogTitle>
            <DialogDescription className="text-lg text-center max-w-2xl">
              Start with 20 free components or unlock the full library with Pro.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="pt-8">
          <PricingCards onClose={() => onOpenChange(false)} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
