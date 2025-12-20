'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, ChevronRight, LayoutDashboard, Package, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Welcome to Gated Components</h2>
                    <p className="text-muted-foreground">
                        Let&apos;s get you set up and shipping in minutes.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Step 1: Explore */}
                <Card className="relative overflow-hidden border-primary/20 bg-background/60 backdrop-blur-sm">
                    <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-primary/10 blur-3xl" />
                    <CardHeader>
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>1. Browse Components</CardTitle>
                        <CardDescription>
                            Explore our library of 50+ production-ready components.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Copy & Paste installation
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Fully typed with Zod
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Shadcn UI compatible
                            </li>
                        </ul>
                        <Button asChild className="w-full">
                            <Link href="/dashboard/components">
                                Browse Library <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Step 2: Tutorials */}
                <Card>
                    <CardHeader>
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                            <LayoutDashboard className="h-5 w-5 text-blue-500" />
                        </div>
                        <CardTitle>2. Follow Tutorials</CardTitle>
                        <CardDescription>
                            Learn how to integrate components into your app.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                Step-by-step guides
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                Real-world examples
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                Best practices
                            </li>
                        </ul>
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/dashboard/tutorials">
                                View Tutorials <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Step 3: Upgrade */}
                <Card className="border-green-500/20 bg-green-500/5">
                    <CardHeader>
                        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                            <Rocket className="h-5 w-5 text-green-500" />
                        </div>
                        <CardTitle>3. Go Pro</CardTitle>
                        <CardDescription>
                            Unlock the full potential of Gated Components.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Access all 50+ components
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                8 Premium Templates
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Lifetime updates
                            </li>
                        </ul>
                        <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => window.dispatchEvent(new CustomEvent('openPricingDialog'))} // Assuming client-side helper or move to client component if needed
                        >
                            Upgrade Now <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
