'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export default function OnboardingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PAID'>('FREE')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user } = useUser()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: selectedPlan }),
      })

      if (response.ok) {
        if (selectedPlan === 'PAID') {
          // Redirect to checkout
          const data = await response.json()
          window.location.href = data.checkoutUrl
        } else {
          // Redirect to dashboard
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome, {user?.firstName}!
        </h1>
        <p className="text-center text-muted-foreground mb-12">
          Choose your plan to get started
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div
            onClick={() => setSelectedPlan('FREE')}
            className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan === 'FREE'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-3xl font-bold mb-4">$0</p>
            <p className="text-muted-foreground mb-6">
              Perfect for trying out our components
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                20 free components
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Copy & paste code
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Community support
              </li>
            </ul>
          </div>

          {/* Paid Plan */}
          <div
            onClick={() => setSelectedPlan('PAID')}
            className={`p-8 border-2 rounded-lg cursor-pointer transition-all ${
              selectedPlan === 'PAID'
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-3xl font-bold mb-4">$29/mo</p>
            <p className="text-muted-foreground mb-6">
              For professionals who need more
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                All 50+ components
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Priority updates
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Priority support
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Advanced examples
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
