export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter')

    let where: any = {
      isActive: true,
    }

    if (filter === 'free') {
      where.isFree = true
    } else if (filter === 'premium') {
      where.isFree = false
    }

    const components = await prisma.component.findMany({
      where,
      orderBy: {
        order: 'asc',
      },
      select: {
        id: true,
        componentId: true,
        name: true,
        description: true,
        category: true,
        isFree: true,
        preview: true,
        // New optional metadata from DB; safe if null
        note: true,
        installFilename: true,
        previewImage: true,
        codeFilename: true,
        implementationGuide: true,
        customization: true,
        variantCount: true,
        componentCount: true,
        thumbnail: true,
        isPageExample: true,
        order: true,
      },
    })

    return NextResponse.json({ components })
  } catch (error) {
    console.error('Failed to fetch components:', error)
    return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 })
  }
}

// Admin endpoint to create components
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      componentId,
      name,
      description,
      category,
      isFree,
      code,
      preview,
      note,
      installFilename,
      previewImage,
      codeFilename,
      implementationGuide,
      customization,
      variantCount,
      componentCount,
      thumbnail,
      isPageExample,
      order,
    } = body

    if (!componentId || !name || !description || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const component = await prisma.component.create({
      data: {
        componentId,
        name,
        description,
        category: category || 'free',
        isFree: isFree !== undefined ? isFree : true,
        code,
        preview,
        note,
        installFilename,
        previewImage,
        codeFilename: codeFilename ?? installFilename ?? null,
        implementationGuide,
        customization,
        variantCount: variantCount || 1,
        componentCount,
        thumbnail,
        isPageExample: isPageExample || false,
        order: order || 0,
      },
    })

    return NextResponse.json({ component })
  } catch (error) {
    console.error('Failed to create component:', error)
    return NextResponse.json({ error: 'Failed to create component' }, { status: 500 })
  }
}
