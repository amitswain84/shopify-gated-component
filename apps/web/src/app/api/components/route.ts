export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'
import { getComponentsByCategory, allComponents } from '@/lib/content-collections'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter')

    let components = allComponents

    if (filter === 'free') {
      components = getComponentsByCategory('free')
    } else if (filter === 'premium') {
      components = getComponentsByCategory('paid')
    }

    // Transform to match expected API format
    const transformedComponents = components.map((component) => ({
      id: component.id,
      componentId: component.id,
      name: component.name,
      description: component.description,
      category: component.category,
      isFree: component.isFree,
      preview: component.preview,
      note: `Component with ${component.variantCount} variants`,
      installFilename: `${component.id}.tsx`,
      previewImage: component.thumbnail,
      codeFilename: `${component.id}.tsx`,
      implementationGuide: component.implementationSteps?.join('\n'),
      customization: component.customizationGuide?.map(guide => `${guide.title}: ${guide.content}`).join('\n'),
      variantCount: component.variantCount,
      componentCount: component.componentCount,
      thumbnail: component.thumbnail,
      isPageExample: component.isPageExample,
      order: component.order,
    }))

    return NextResponse.json({ components: transformedComponents })
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
