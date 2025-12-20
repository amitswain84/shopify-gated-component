export const dynamic = 'force-dynamic'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@gated/database'
import { CopyButton } from './copy-button'
import { ProContentGuard } from '@/components/pro-content-guard'
import { getComponentByIdFromContent } from '@/lib/components-db'
import { ComponentDocs } from '@/components/component-docs'
import { canAccessComponent } from '@/lib/access'

export default async function ComponentPage({
  params,
}: {
  params: { id: string }
}) {
  // Fetch component from database only
  const component = await getComponentByIdFromContent(params.id)

  if (!component) {
    redirect('/dashboard/components')
  }

  // Check user access using new utility
  // Optimization: Check if component is free first to avoid unnecessary DB calls
  let hasAccess = canAccessComponent(component)
  let isPro = false

  // Only check database if component is not free (i.e. we don't have access yet)
  if (!hasAccess) {
    const clerkUser = await currentUser()
    if (clerkUser?.id) {
      try {
        const user = await prisma.user.findUnique({
          where: { clerkId: clerkUser.id },
          include: { subscription: true },
        })
        isPro = user?.subscription?.plan === 'PAID' && user?.subscription?.status === 'ACTIVE'
        // Re-check access with pro status
        hasAccess = canAccessComponent(component, { isPro })
      } catch (error) {
        console.error('Failed to fetch user subscription:', error)
        // Keep hasAccess as false (safe default)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        <ComponentDocs
          title={component.name}
          description={component.description}
          problemStatement={component.note}
          fileName={component.codeFilename || component.installFilename || 'components/ui/component.tsx'}
          thumbnail={component.thumbnail || component.previewImage || '/thumbnails/placeholder.svg'}
          code={component.code}
          implementationSteps={(component.implementationGuide ? component.implementationGuide.split('\n').map(s => s.trim()).filter(Boolean) : [])}
          customizationGuide={component.customization ? [{ title: 'Customization', content: component.customization }] : undefined}
          locked={!hasAccess}
          lockedContent={<ProContentGuard />}
          variantCount={component.variantCount}
          isFree={component.isFree}
        />
      </div>
    </div>
  )
}
