import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@gated/database'

export async function GET() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progress = await prisma.checklistProgress.findMany({
      where: {
        userId,
        completed: true,
      },
      select: {
        checklistId: true,
      },
    })

    return NextResponse.json(
      { completed: progress.map((p: { checklistId: string }) => p.checklistId) },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Failed to fetch checklist progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { checklistId, completed } = await req.json()

    if (!checklistId || typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    await prisma.checklistProgress.upsert({
      where: {
        userId_checklistId: {
          userId,
          checklistId,
        },
      },
      update: {
        completed,
      },
      create: {
        userId,
        checklistId,
        completed,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update checklist progress:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.checklistProgress.deleteMany({
      where: {
        userId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to reset checklist progress:', error)
    return NextResponse.json({ error: 'Failed to reset progress' }, { status: 500 })
  }
}
