"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function PlanInfoClient() {
  const [plan, setPlan] = useState<'FREE' | 'PAID'>('FREE')
  const [status, setStatus] = useState<string>('ACTIVE')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await fetch('/api/user/plan', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (!mounted) return
          setPlan(data.plan === 'PAID' ? 'PAID' : 'FREE')
          setStatus(data.subscription?.status || 'ACTIVE')
        } else {
          if (!mounted) return
          setPlan('FREE')
        }
      } catch {
        if (!mounted) return
        setPlan('FREE')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Current Plan */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border bg-muted/50">
        <div className="space-y-1">
          <p className="text-sm font-medium">Current Plan</p>
          <p className="text-2xl font-bold">{loading ? 'Loading…' : plan === 'PAID' ? 'PRO' : 'FREE'}</p>
          <p className="text-xs text-muted-foreground">
            {plan === 'PAID' ? 'Access to all premium components' : 'Access to 20 free components'}
          </p>
        </div>
        {plan !== 'PAID' && (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openPricingDialog'))}
            className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-background rounded-md text-sm font-medium hover:bg-foreground/90 transition-colors shrink-0 text-center"
          >
            Upgrade to Pro
          </button>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
        <div className="space-y-1">
          <p className="text-sm font-medium">Status</p>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${
              status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            <p className="text-sm text-muted-foreground capitalize">
              {loading ? 'Loading…' : status.toLowerCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      {plan === 'PAID' && (
        <div className="p-4 rounded-lg border bg-muted/50">
          <p className="text-sm font-medium mb-2">Billing Management</p>
          <p className="text-xs text-muted-foreground mb-3">
            Manage your subscription, payment methods, and billing history
          </p>
          <Link 
            href="/dashboard/profile" 
            className="text-sm text-foreground underline underline-offset-4 hover:text-foreground/80"
          >
            View billing details →
          </Link>
        </div>
      )}
    </div>
  )
}
