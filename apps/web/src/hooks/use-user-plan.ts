'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'

export function useUserPlan() {
  const { user } = useUser()
  const [plan, setPlan] = useState<'FREE' | 'PRO'>('FREE')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPlan() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/plan')
        if (response.ok) {
          const data = await response.json()
          setPlan(data.plan === 'PAID' ? 'PRO' : 'FREE')
        }
      } catch (error) {
        console.error('Failed to fetch user plan:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlan()
  }, [user])

  return { plan, loading }
}
