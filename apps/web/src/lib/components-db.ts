import { prisma } from '@gated/database'

export interface ComponentMetadata {
  id: string
  name: string
  description: string
  category: string
  isFree: boolean
  code: string
  preview?: string
  // Optional extra metadata, synced from DB
  note?: string
  installFilename?: string
  previewImage?: string
  codeFilename?: string
  implementationGuide?: string
  customization?: string
  variantCount: number
  componentCount?: number
  thumbnail?: string // kept for backward-compat; mapped from previewImage if available
  isPageExample?: boolean
}

// Server-side function to get all components from database only
export async function getAllComponents(): Promise<ComponentMetadata[]> {
  try {
    const components = await prisma.component.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
      select: {
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
      },
    })

    return components.map((c: {
      componentId: string;
      name: string;
      description: string;
      category: string;
      isFree: boolean;
      code: string;
      preview?: string | null;
      note?: string | null;
      installFilename?: string | null;
      previewImage?: string | null;
      codeFilename?: string | null;
      implementationGuide?: string | null;
      customization?: string | null;
      variantCount: number;
      componentCount?: number | null;
      thumbnail?: string | null;
      isPageExample: boolean;
    }) => ({
      id: c.componentId,
      name: c.name,
      description: c.description,
      category: c.category,
      isFree: c.isFree,
      code: c.code,
      preview: c.preview || undefined,
      note: c.note || undefined,
      installFilename: c.installFilename || undefined,
      previewImage: c.previewImage || undefined,
      codeFilename: (c.codeFilename || c.installFilename) || undefined,
      implementationGuide: c.implementationGuide || undefined,
      customization: c.customization || undefined,
      variantCount: c.variantCount,
      componentCount: c.componentCount || undefined,
      thumbnail: (c.previewImage || c.thumbnail) || undefined,
      isPageExample: c.isPageExample,
    }))
  } catch (error) {
    console.error('Failed to fetch components from database:', error)
    return []
  }
}

// Server-side function to get a single component by ID from database only
export async function getComponentById(id: string): Promise<ComponentMetadata | null> {
  try {
    const component = await prisma.component.findFirst({
      where: {
        componentId: id,
        isActive: true,
      },
      select: {
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
      },
    })

    if (!component) {
      return null
    }

    return {
      id: component.componentId,
      name: component.name,
      description: component.description,
      category: component.category,
      isFree: component.isFree,
      code: component.code,
      preview: component.preview || undefined,
      note: component.note || undefined,
      installFilename: component.installFilename || undefined,
      previewImage: component.previewImage || undefined,
      codeFilename: (component.codeFilename || component.installFilename) || undefined,
      implementationGuide: component.implementationGuide || undefined,
      customization: component.customization || undefined,
      variantCount: component.variantCount,
      componentCount: component.componentCount || undefined,
      thumbnail: (component.previewImage || component.thumbnail) || undefined,
      isPageExample: component.isPageExample,
    }
  } catch (error) {
    console.error(`Failed to fetch component ${id} from database:`, error)
    return null
  }
}
