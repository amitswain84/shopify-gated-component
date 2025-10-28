export const dynamic = 'force-dynamic'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { prisma } from '@gated/database'
import { CopyButton } from './copy-button'
import { ProContentGuard } from '@/components/pro-content-guard'
import { getComponentById } from '@/lib/components-db'
import { ComponentDocs } from '@/components/component-docs'

export default async function ComponentPage({
  params,
}: {
  params: { id: string }
}) {
  // Fetch component from database only
  const component = await getComponentById(params.id)

  if (!component) {
    redirect('/dashboard/components')
  }

  // Check user access for paid components
  let hasAccess = component.isFree
  if (!component.isFree) {
    const clerkUser = await currentUser()
    if (clerkUser?.id) {
      const user = await prisma.user.findUnique({
        where: { clerkId: clerkUser.id },
        include: { subscription: true },
      })
      hasAccess = user?.subscription?.plan === 'PAID' && user?.subscription?.status === 'ACTIVE'
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
              locked={!hasAccess && !component.isFree}
              lockedContent={<ProContentGuard />}
              variantCount={component.variantCount}
              isFree={component.isFree}
            />
      </div>
    </div>
  )
}
