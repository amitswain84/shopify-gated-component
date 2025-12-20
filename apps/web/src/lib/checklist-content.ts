import { allChecklistItems, getChecklistItemsByType, getChecklistItemById } from './content-collections'

export interface ChecklistItemData {
  id: string
  title: string
  description: string
  icon: string
  isPro: boolean
  detailContent: string
}

// Server-side function to get all checklist items from content collections
export async function getAllChecklistItems(): Promise<ChecklistItemData[]> {
  try {
    return allChecklistItems.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      isPro: item.isPro,
      detailContent: item.detailContent,
    }))
  } catch (error) {
    console.error('Failed to fetch checklist items from content collections:', error)
    return []
  }
}

// Get checklist items by type (free/pro)
export async function getChecklistItemsByTypeFromContent(isPro: boolean): Promise<ChecklistItemData[]> {
  try {
    const items = getChecklistItemsByType(isPro)
    return items.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      isPro: item.isPro,
      detailContent: item.detailContent,
    }))
  } catch (error) {
    console.error('Failed to fetch checklist items by type:', error)
    return []
  }
}

// Get single checklist item by ID
export async function getChecklistItemByIdFromContent(id: string): Promise<ChecklistItemData | null> {
  try {
    const item = getChecklistItemById(id)
    
    if (!item) {
      return null
    }

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      icon: item.icon,
      isPro: item.isPro,
      detailContent: item.detailContent,
    }
  } catch (error) {
    console.error(`Failed to fetch checklist item ${id}:`, error)
    return null
  }
}