import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Badge } from '@/components/ui/badge'
import { PricingCards } from '@/components/pricing-cards'

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Gated Components
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <SignedOut>
              <Link href="/sign-in" className="text-sm font-medium hover:text-primary">
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
              >
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </header>

      <div className="w-full py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-4">
            <Badge>Pricing</Badge>
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl md:text-5xl tracking-tighter max-w-2xl font-semibold">
                Select a Plan
              </h2>
              <p className="text-base md:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl">
                Start with 20 free components or unlock the full library with Pro.
              </p>
            </div>
          </div>

          {/* Plans (shared UI with popup) */}
          <div className="mx-auto max-w-3xl mt-10 md:mt-14">
            {/* Client pricing selector */}
            <PricingCards />
          </div>
        </div>
      </div>
    </div>
  )
}
