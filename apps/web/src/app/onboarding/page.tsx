'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function OnboardingPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard with onboarding query param to show pricing dialog
    router.push('/dashboard?onboarding=true')
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <Loader2 className="h-12 w-12 animate-spin text-primary relative z-10" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
            Setting up your account...
          </h2>
          <p className="text-muted-foreground animate-pulse text-sm md:text-base">
            Loading your dashboard, please wait a moment.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
