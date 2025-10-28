'use client'

import Link from 'next/link'
import { Check, MoveRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMediaQuery } from '@/hooks/use-media-query'

interface PricingCardsProps {
  onClose?: () => void
}

export function PricingCards({ onClose }: PricingCardsProps = {}) {
  const { user, isSignedIn } = useUser()
  const [currentPlan, setCurrentPlan] = useState<'free' | 'pro' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isSignedIn) {
      // TODO: Fetch user's current plan from database
      // For now, default to free for signed-in users
      setCurrentPlan('free')
    }
  }, [isSignedIn])

  const handleSelectPlan = async (plan: 'free' | 'pro') => {
    if (!isSignedIn) return
    
    setLoading(true)
    setError(null)
    
    if (plan === 'free') {
      try {
        // Update to free plan
        const response = await fetch('/api/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan: 'FREE' }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to update plan')
        }
        
        // Close dialog when selecting free plan
        onClose?.()
        window.location.reload()
      } catch (error) {
        console.error('Failed to update plan:', error)
        setError('Failed to update plan. Please try again.')
        setLoading(false)
      }
    } else {
      try {
        console.log('Creating checkout session...')
        
        // Create checkout session for Pro plan
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create checkout session')
        }
        
        const data = await response.json()
        console.log('Checkout session created:', data)
        
        if (data.checkoutUrl) {
          // Redirect to Lemon Squeezy checkout
          console.log('Redirecting to:', data.checkoutUrl)
          window.location.href = data.checkoutUrl
        } else {
          throw new Error('No checkout URL returned')
        }
      } catch (error) {
        console.error('Checkout error:', error)
        setError(error instanceof Error ? error.message : 'Failed to create checkout. Please try again or contact support.')
        setLoading(false)
      }
    }
  }

  const PricingCard = ({ plan, title, price, description, features, highlighted = false }: any) => (
    <Card className={`w-full rounded-md ${highlighted ? 'shadow-2xl' : ''}`}>
      <CardHeader>
        <CardTitle>
          <span className="flex flex-row gap-4 items-center font-normal">
            {title}
          </span>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8 justify-start">
          <p className="flex flex-row items-center gap-2 text-xl">
            <span className="text-4xl">{price}</span>
            <span className="text-sm text-muted-foreground"> / month</span>
          </p>
          <div className="flex flex-col gap-4 justify-start">
            {features.map((feature: any, i: number) => (
              <div key={i} className="flex flex-row gap-4">
                <Check className="w-4 h-4 mt-2 text-primary" />
                <div className="flex flex-col">
                  <p>{feature.title}</p>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {isSignedIn ? (
            <Button 
              variant={plan === 'pro' ? 'default' : 'outline'}
              className="gap-4"
              onClick={() => handleSelectPlan(plan)}
              disabled={currentPlan === plan || loading}
            >
              {loading ? 'Processing...' : currentPlan === plan ? `Currently on ${title} Plan` : (
                plan === 'pro' ? (
                  <>
                    Upgrade to Pro <MoveRight className="w-4 h-4" />
                  </>
                ) : `Select ${title}`
              )}
            </Button>
          ) : (
            <Button variant={plan === 'pro' ? 'default' : 'outline'} className="gap-4" asChild>
              <Link href="/sign-up">
                Sign up today <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const plans = [
    {
      plan: 'free',
      title: 'Free',
      price: '$0',
      description: 'Perfect for trying out our component library and getting started with your projects.',
      features: [
        { title: '20 free components', description: 'Access to our core component library' },
        { title: 'Copy & paste code', description: 'Easy integration with your projects' },
        { title: 'Community support', description: 'Get help from our community' },
      ]
    },
    {
      plan: 'pro',
      title: 'Pro',
      price: '$29',
      description: 'For professionals who need access to the complete library and premium features.',
      features: [
        { title: 'All 50+ components', description: 'Complete access to our entire library' },
        { title: 'Priority updates', description: 'Get new components first' },
        { title: 'Priority support', description: 'Fast response times for your questions' },
        { title: 'Advanced examples', description: 'Real-world implementation examples' },
      ],
      highlighted: true
    },
    {
      plan: 'enterprise',
      title: 'Enterprise',
      price: 'Custom',
      description: 'Custom solutions for teams and organizations with specific requirements.',
      features: [
        { title: 'Unlimited components', description: 'Everything in Pro plus custom components' },
        { title: 'Dedicated support', description: '24/7 support with SLA guarantees' },
        { title: 'Custom components', description: 'We build components for your needs' },
        { title: 'Team training', description: 'Onboarding and training for your team' },
      ]
    }
  ]

  if (isMobile) {
    return (
      <div className="w-full">
        {error && (
          <div className="mb-4 p-4 bg-muted border border-border rounded-lg text-foreground text-sm">
            {error}
          </div>
        )}
        <Tabs defaultValue="pro" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="pro">Pro</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          </TabsList>
          {plans.map((planData) => (
            <TabsContent key={planData.plan} value={planData.plan}>
              <PricingCard {...planData} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-muted border border-border rounded-lg text-foreground text-sm">
          {error}
        </div>
      )}
      <div className="grid text-left grid-cols-1 lg:grid-cols-3 w-full gap-8">
        {plans.map((planData) => (
          <PricingCard key={planData.plan} {...planData} />
        ))}
      </div>
    </div>
  )
}

