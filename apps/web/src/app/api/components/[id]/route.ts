import { NextResponse } from 'next/server'
import { prisma } from '@gated/database'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const component = await prisma.component.findFirst({
      where: {
        componentId: params.id,
        isActive: true,
      },
      select: {
        id: true,
        componentId: true,
        name: true,
        description: true,
        category: true,
        isFree: true,
        code: true,
        preview: true,
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
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 })
    }

    return NextResponse.json({ component })
  } catch (error) {
    console.error('Failed to fetch component:', error)
    return NextResponse.json({ error: 'Failed to fetch component' }, { status: 500 })
  }
}

// Admin endpoint to update a component
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    
    // Keep codeFilename in sync with installFilename if provided
    const data = {
      ...body,
      codeFilename: body.codeFilename ?? body.installFilename ?? undefined,
    }

    const component = await prisma.component.update({
      where: {
        componentId: params.id,
      },
      data,
    })

    return NextResponse.json({ component })
  } catch (error) {
    console.error('Failed to update component:', error)
    return NextResponse.json({ error: 'Failed to update component' }, { status: 500 })
  }
}

// Admin endpoint to delete a component
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.component.delete({
      where: {
        componentId: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete component:', error)
    return NextResponse.json({ error: 'Failed to delete component' }, { status: 500 })
  }
}
