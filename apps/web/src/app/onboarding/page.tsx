'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard with onboarding query param to show pricing dialog
    router.push('/dashboard?onboarding=true')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Setting up your account...</h2>
        <p className="text-muted-foreground">Please wait</p>
      </div>
    </div>
  )
}
