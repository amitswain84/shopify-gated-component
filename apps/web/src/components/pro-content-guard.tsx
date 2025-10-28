'use client'

import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

interface ProContentGuardProps {
  children?: React.ReactNode
}

export function ProContentGuard({ children }: ProContentGuardProps) {
  const handleUpgrade = () => {
    window.dispatchEvent(new CustomEvent('openPricingDialog'))
  }

  return (
    <div className="border rounded-lg p-8 bg-muted/50 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <Lock className="w-8 h-8 text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Pro Content</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This component is available for Pro members only. Upgrade your plan to access this and all premium components.
        </p>
      </div>
      <Button onClick={handleUpgrade}>
        Upgrade to Pro
      </Button>
      {children}
    </div>
  )
}
