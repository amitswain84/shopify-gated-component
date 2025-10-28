import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const items = await prisma.$queryRaw<Array<{
      id: string,
      title: string,
      description: string,
      icon: string,
      isPro: boolean,
      order: number,
      isActive: boolean,
      detailContent: string,
      createdAt?: string,
      updatedAt?: string,
    }>>`SELECT id, title, description, icon, "isPro", "order", "isActive",
            COALESCE("detailContent", '') AS "detailContent",
            "createdAt", "updatedAt"
         FROM "ChecklistItem"
         WHERE "isActive" = true
         ORDER BY "order" ASC`

    return NextResponse.json(
      { items },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch (error) {
    console.error('Failed to fetch checklist items:', error)
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 })
  }
}

// Admin endpoint to create checklist items
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, icon, isPro, order, detailContent } = body

    if (!title || !description || !icon || !detailContent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const item = await prisma.checklistItem.create({
      data: {
        title,
        description,
        icon,
        isPro: isPro || false,
        order: order || 0,
        detailContent,
      },
    })

    return NextResponse.json({ item })
  } catch (error) {
    console.error('Failed to create checklist item:', error)
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 })
  }
}
