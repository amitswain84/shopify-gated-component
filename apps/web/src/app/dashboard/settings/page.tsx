import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@gated/database'
import Link from 'next/link'

export default async function SettingsPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { subscription: true },
  })

  const subscription = user?.subscription

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your subscription and account settings
        </p>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Subscription</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Plan</p>
              <p className="text-sm text-muted-foreground">
                {subscription?.plan || 'FREE'}
              </p>
            </div>
            {subscription?.plan === 'FREE' && (
              <Link
                href="/pricing"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90"
              >
                Upgrade to Pro
              </Link>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-muted-foreground">
                {subscription?.status || 'ACTIVE'}
              </p>
            </div>
          </div>

          {subscription?.renewsAt && (
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(subscription.renewsAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Account</h2>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <div className="pt-4 border-t">
            <Link
              href="/dashboard/profile"
              className="text-sm text-primary hover:underline"
            >
              Manage account settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
