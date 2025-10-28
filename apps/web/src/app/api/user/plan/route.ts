import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ plan: 'FREE' }, { status: 200 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { subscription: true },
    })

    const plan = user?.subscription?.plan === 'PAID' && user?.subscription?.status === 'ACTIVE' 
      ? 'PAID' 
      : 'FREE'

    return NextResponse.json({ plan }, { status: 200 })
  } catch (error) {
    console.error('Error fetching user plan:', error)
    return NextResponse.json({ plan: 'FREE' }, { status: 200 })
  }
}
