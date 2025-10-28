'use client'

import { useState, useEffect } from 'react'
import { PricingDialog } from './pricing-dialog'

export function PricingDialogManager() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    window.addEventListener('openPricingDialog', handleOpen)
    return () => window.removeEventListener('openPricingDialog', handleOpen)
  }, [])

  return <PricingDialog open={open} onOpenChange={setOpen} />
}
