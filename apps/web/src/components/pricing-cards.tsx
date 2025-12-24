'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Check, Lock } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PricingCardsProps {
  onClose?: () => void
}

export function PricingCards({ onClose }: PricingCardsProps = {}) {
  const { user, isSignedIn } = useUser()
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | 'lifetime' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'lifetime' | null>('lifetime')
  const [showAllFeatures, setShowAllFeatures] = useState<boolean>(false)

  // Reset showAllFeatures when selected plan changes
  useEffect(() => {
    setShowAllFeatures(false)
  }, [selectedPlan])

  useEffect(() => {
    if (isSignedIn) {
      setCurrentPlan('free')
    }
  }, [isSignedIn])

  const handleSelectPlan = async (plan: 'free' | 'pro' | 'lifetime') => {
    if (!isSignedIn) return

    setLoading(true)
    setError(null)

    if (plan === 'free') {
      try {
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: 'FREE' }),
        })
        if (!response.ok) throw new Error('Failed to update plan')
        onClose?.()
        window.location.reload()
      } catch (error) {
        setError('Failed to update plan. Please try again.')
        setLoading(false)
      }
    } else if (plan === 'pro') {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ billingPeriod: 'yearly', plan: 'pro' }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create checkout session')
        }
        const data = await response.json()
        if (data.checkoutUrl) window.location.href = data.checkoutUrl
        else throw new Error('No checkout URL returned')
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to create checkout.')
        setLoading(false)
      }
    } else if (plan === 'lifetime') {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: 'lifetime' }),
        })
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create checkout session')
        }
        const data = await response.json()
        if (data.checkoutUrl) window.location.href = data.checkoutUrl
        else throw new Error('No checkout URL returned')
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to create checkout.')
        setLoading(false)
      }
    }
  }

  const plans = [
    {
      id: 'free',
      name: 'The Rookie Flex',
      subtitle: '$0 Forever (Free Sauce)',
      price: '$0',
      period: 'Forever',
      subPrice: 'Perfect for solo devs',
      features: [
        '25+ essential high-drip snippets',
        'Liquid code, zero theme bloat',
        'Lightweight CSS, fast AF speed',
        'Mobile-first responsive vibes',
        'Unlimited local test environment',
        'SEO-ready Liquid foundations',
        'Instant copy-paste dev workflow',
        'Community wiki and dev support',
        'Ship custom looks for free',
        'Pro-grade production code',
        '100% compatible with any theme',
        'Scalable agency-ready blocks',
        'No code fatigue, just flex',
        'Optimized image lazy loading',
        'Basic banger UI components',
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Agency Legend',
      subtitle: 'Scale your agency fast',
      price: '$199',
      period: '/ Year',
      subPrice: '$199 Yearly (Pro Drip)',
      features: [
        '350+ premium high-drip sections',
        'Weekly fresh component vault drops',
        '500+ store checklist for ROI',
        'Boost SEO, speed, and ranking',
        'God-tier UI snippets for clients',
        'Maximize sales with pro UX flows',
        'VIP Slack and email support',
        'Unlimited usage on client stores',
        'Advanced mega-menu Liquid blocks',
        'Zero bloat, pure speed code',
        'Commercial license for all builds',
        'Premium cart and drawer layouts',
        'High-converting product page grids',
        'Custom requests for new blocks',
        'Shopify 2.0 drag-and-drop ready'
      ],
      popular: false
    },
    {
      id: 'lifetime',
      name: 'God-Tier Alpha',
      subtitle: 'Ultimate agency flex',
      price: '$399',
      period: '',
      subPrice: 'One-Time Payment',
      features: [
        'Unlimited access to every banger block',
        '500+ store checklist for max ROI',
        '100+ legal dark hacks for sales',
        'Boost SEO, speed, and sales growth',
        'Own every future component drop',
        'No recurring fees, pay once only',
        'White-label license for all clients',
        'Priority custom block request lane',
        'Full access to the private wiki',
        'Pro-level revenue boosting strategies',
        'Instant rank and conversion spikes',
        'Direct dev support for big builds',
        '100% theme control, zero limits',
        'Expert Shopify speed optimization hacks',
        'High-drip designs, maximum profit'
      ],
      popular: true,
      badge: 'Most Popular'
    }
  ]

  const activePlan = plans.find(p => p.id === selectedPlan) || plans[1]

  const toggleSelect = (planId: 'free' | 'pro' | 'lifetime') => {
    setSelectedPlan(prev => prev === planId ? null : planId);
  }

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      {error && (
        <div className="w-full mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-xs text-center">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight mb-1 text-foreground">Pricing Plans</h2>
        <p className="text-muted-foreground text-sm font-medium">Choose the perfect plan for your needs</p>
      </div>

      {/* Plans Stack */}
      <div className="space-y-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          // Slice features: show 3 if !showAllFeatures, else all
          const displayFeatures = (isSelected && !showAllFeatures)
            ? plan.features.slice(0, 3)
            : plan.features;

          return (
            <div
              key={plan.id}
              onClick={() => toggleSelect(plan.id as any)}
              className={cn(
                "relative rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden",
                isSelected
                  ? "border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600/10 dark:bg-blue-900/10 dark:border-blue-500/50"
                  : "border-border bg-card hover:border-foreground/10 hover:bg-muted/30"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 px-2 py-0.5 bg-blue-600 text-[10px] font-bold text-white rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  {/* Radio Circle */}
                  <div className={cn(
                    "mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-colors",
                    isSelected
                      ? "border-blue-600 dark:border-blue-500"
                      : "border-muted-foreground/30"
                  )}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start w-full gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold tracking-tight truncate pr-2 text-foreground">{plan.name}</h3>
                        <p className="text-xs text-muted-foreground font-medium truncate">{plan.subtitle}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-baseline justify-end gap-1">
                          <span className="text-base sm:text-lg font-bold text-foreground">{plan.price}</span>
                          {plan.period && <span className="text-xs text-muted-foreground font-medium">{plan.period}</span>}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-px">{plan.subPrice}</p>
                      </div>
                    </div>

                    {/* Expanded Content for Selected Plan */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-blue-200/50 dark:border-blue-800/50 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="space-y-2">
                          {displayFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-3.5 h-3.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mt-0.5">
                                <Check className="w-2 h-2" strokeWidth={3} />
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-foreground/80 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* See All Features Toggle */}
                        {!showAllFeatures && plan.features.length > 3 && (
                          <div
                            className="mt-3 text-center"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card toggle
                              setShowAllFeatures(true);
                            }}
                          >
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                              See all features
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Global Action Button */}
      <div className="mt-6 pt-2">
        {isSignedIn ? (
          <Button
            onClick={() => selectedPlan && handleSelectPlan(selectedPlan)}
            disabled={!selectedPlan || currentPlan === selectedPlan || loading}
            className="w-full h-11 rounded-lg text-sm sm:text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : selectedPlan ? `Get Started with ${activePlan.name}` : 'Select a Plan'}
          </Button>
        ) : (
          <Button asChild className="w-full h-11 rounded-lg text-sm sm:text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <Link href="/sign-up">
              {selectedPlan ? `Get Started with ${activePlan.name}` : 'Select a Plan'}
            </Link>
          </Button>
        )}
        <div className="flex items-center justify-center gap-1.5 mt-3 text-muted-foreground/60">
          <Lock className="w-3 h-3" />
          <p className="text-[10px] font-medium uppercase tracking-wide">
            Secure payment via Lemon Squeezy
          </p>
        </div>
      </div>
    </div>
  )
}
