import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getComponentById } from '@gated/components'
import { prisma } from '@gated/database'
import { CopyButton } from '@/components/copy-button'

export default async function ComponentPage({
  params,
}: {
  params: { id: string }
}) {
  const component = getComponentById(params.id)

  if (!component) {
    redirect('/components')
  }

  // Check user access for paid components
  let hasAccess = component.isFree
  if (!component.isFree) {
    const { userId } = auth()
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { subscription: true },
      })
      hasAccess = user?.subscription?.plan === 'PAID' && user?.subscription?.status === 'ACTIVE'
    }
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-bold">{component.name}</h1>
            {!component.isFree && (
              <span className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">
                Pro
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{component.description}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Code</h2>
          {hasAccess ? (
            <div className="relative">
              <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto">
                <code>{component.code}</code>
              </pre>
              <div className="mt-4">
                <CopyButton text={component.code} />
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
              <p className="text-muted-foreground mb-4">
                This component is only available with a Pro subscription.
              </p>
              <a
                href="/pricing"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90"
              >
                View Pricing
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
