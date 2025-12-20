"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Package, CreditCard, Users, CheckCircle2, X } from 'lucide-react'

interface DashboardClientProps {
    initialPlan: string
    initialStatus: string
}

export function DashboardClient({ initialPlan, initialStatus }: DashboardClientProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    // Use initial data, but allow updates if needed (e.g. after successful upgrade)
    const [plan, setPlan] = useState(initialPlan)
    const [status, setStatus] = useState(initialStatus)

    useEffect(() => {
        // Redirect logic
        if (!searchParams.get('upgrade') && !searchParams.get('onboarding')) {
            // Only redirect if "onboarding" param is NOT present.
            // However, the original code logic was:
            // if (!upgrade && !onboarding) -> replace('/dashboard/onboarding')
            // Wait, isn't this an infinite redirect if /dashboard/onboarding leads back here?
            // The original code redirected FROM /dashboard TO /dashboard/onboarding.
            // /dashboard/onboarding is a different route.
            router.replace('/dashboard/onboarding')
        }

        // Open pricing
        if (searchParams.get('onboarding') === 'true') {
            window.dispatchEvent(new CustomEvent('openPricingDialog'))
            router.replace('/dashboard/onboarding')
        }

        // Success Upgrade
        if (searchParams.get('upgrade') === 'success') {
            setShowSuccessMessage(true)
            // Re-fetch to confirm? Or just optimistic update?
            // Since we are client-side now, we can hit the API again to be sure, or just trust the success param.
            // Let's hit the API to be safe and update state.
            fetch('/api/user/plan')
                .then(res => res.json())
                .then(data => {
                    setPlan(data.plan === 'PAID' ? 'PRO' : 'FREE')
                    setStatus(data.subscription?.status || 'ACTIVE')
                })

            router.replace('/dashboard/onboarding')
            setTimeout(() => setShowSuccessMessage(false), 10000)
        }
    }, [searchParams, router])

    const handleUpgrade = () => {
        window.dispatchEvent(new CustomEvent('openPricingDialog'))
    }

    return (
        <>
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top">
                    <div className="bg-muted border border-border rounded-lg p-4 shadow-lg flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                                Welcome to Pro! 🎉
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Your payment was successful. You now have access to all 50+ premium components and features.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSuccessMessage(false)}
                            className="text-foreground hover:opacity-80"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                <div>
                    <h1 className="text-3xl font-bold">Overview</h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here&apos;s an overview of your account.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Package className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Your Plan</p>
                                <p className="text-2xl font-bold">{plan}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg">
                                <CreditCard className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <p className="text-2xl font-bold">{status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg">
                                <Users className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Components</p>
                                <p className="text-2xl font-bold">{plan === 'PAID' ? '50+' : '20'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Link
                            href="/dashboard/components"
                            className="border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                            <h3 className="font-semibold mb-1">Browse Components</h3>
                            <p className="text-sm text-muted-foreground">
                                Explore our library of {plan === 'PAID' ? '50+' : '20'} components
                            </p>
                        </Link>

                        {plan === 'FREE' && (
                            <button
                                onClick={handleUpgrade}
                                className="border rounded-lg p-4 hover:bg-accent transition-colors text-left w-full"
                            >
                                <h3 className="font-semibold mb-1">Upgrade to Pro</h3>
                                <p className="text-sm text-muted-foreground">
                                    Get access to all 50+ premium components
                                </p>
                            </button>
                        )}

                        <Link
                            href="/dashboard/profile"
                            className="border rounded-lg p-4 hover:bg-accent transition-colors"
                        >
                            <h3 className="font-semibold mb-1">Manage Profile</h3>
                            <p className="text-sm text-muted-foreground">
                                Update your account settings and preferences
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
