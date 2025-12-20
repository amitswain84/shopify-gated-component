import { allComponents, getComponentsByCategory, getComponentById } from './content-collections'

export interface ComponentMetadata {
  id: string
  name: string
  description: string
  category: string
  access: 'free' | 'paid'
  isFree: boolean
  code: string
  preview?: string
  // Optional extra metadata
  note?: string
  installFilename?: string
  previewImage?: string
  codeFilename?: string
  implementationGuide?: string
  customization?: string
  variantCount: number
  componentCount?: number
  thumbnail?: string
  isPageExample?: boolean
}

// Server-side function to get all components from content collections
export async function getAllComponents(): Promise<ComponentMetadata[]> {
  try {
    return allComponents.map(component => ({
      id: component.id,
      name: component.name,
      description: component.description,
      category: component.category || 'free',
      access: component.access,
      isFree: component.isFree ?? (component.access === 'free'),
      code: component.code,
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
    }))
  } catch (error) {
    console.error('Failed to fetch components from content collections:', error)
    return []
  }
}

// Server-side function to get a single component by ID from content collections
export async function getComponentByIdFromContent(id: string): Promise<ComponentMetadata | null> {
  try {
    const component = getComponentById(id)

    if (!component) {
      return null
    }

    return {
      id: component.id,
      name: component.name,
      description: component.description,
      category: component.category || 'free',
      access: component.access,
      isFree: component.isFree ?? (component.access === 'free'),
      code: component.code,
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
    }
  } catch (error) {
    console.error(`Failed to fetch component ${id} from content collections:`, error)
    return null
  }
}
