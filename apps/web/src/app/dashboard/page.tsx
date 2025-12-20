import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'
import { DashboardClient } from './components/dashboard-client'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await currentUser()

  let plan = 'FREE'
  let status = 'ACTIVE'

  if (user?.id) {
    try {
      // Opt to check the DB directly for faster initial load than calling an internal API route via fetch
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: { subscription: true },
      })

      if (dbUser?.subscription?.plan === 'PAID' && dbUser?.subscription?.status === 'ACTIVE') {
        plan = 'PAID'
        status = 'ACTIVE'
      } else {
        plan = 'FREE'
        status = dbUser?.subscription?.status || 'ACTIVE'
      }
    } catch (error) {
      console.error('Failed to fetch plan in dashboard page:', error)
    }
  }

  // Map to UI friendly strings if needed, or pass as is. 
  // Client component expects 'PRO' | 'FREE' for display?
  // Original client code: setPlan(data.plan === 'PAID' ? 'PRO' : 'FREE')
  // So 'PAID' -> 'PRO'.
  const displayPlan = plan === 'PAID' ? 'PRO' : 'FREE'

  return (
    <DashboardClient initialPlan={displayPlan} initialStatus={status} />
  )
}
