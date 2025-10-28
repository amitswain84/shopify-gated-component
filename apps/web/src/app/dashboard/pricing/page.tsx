import { Badge } from '@/components/ui/badge'
import { PricingCards } from '@/components/pricing-cards'

export default function DashboardPricingPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex text-center justify-center items-center gap-4 flex-col">
        <Badge>Pricing</Badge>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-center font-regular">
            Upgrade your plan
          </h2>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-center">
            Choose the plan that works best for you.
          </p>
        </div>
        <div className="pt-12 w-full">
          <PricingCards />
        </div>
      </div>
    </div>
  )
}
