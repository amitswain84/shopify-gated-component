import { z } from 'zod'

// Component schema for content collection
export const componentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  // access: 'free' | 'paid' is the new source of truth
  access: z.enum(['free', 'paid']).default('free'),
  // slug and title for better SEO/routing if needed, defaults to id/name
  slug: z.string().optional(),
  title: z.string().optional(),

  // Deprecated but kept for compatibility
  category: z.enum(['free', 'paid']).optional(),
  isFree: z.boolean().optional(),

  variantCount: z.number().default(1),
  componentCount: z.number().optional(),
  thumbnail: z.string().optional(),
  isPageExample: z.boolean().default(false),
  order: z.number().default(0),
  tags: z.array(z.string()).default([]),
  dependencies: z.array(z.string()).default([]),
  installCommand: z.string().optional(),
  code: z.string(),
  preview: z.string().optional(),
  implementationSteps: z.array(z.string()).default([]),
  customizationGuide: z.array(z.object({
    title: z.string(),
    content: z.string()
  })).default([]),
})

// Checklist item schema
export const checklistSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  isPro: z.boolean(),
  order: z.number(),
  detailContent: z.string(),
  tags: z.array(z.string()).default([]),
  access: z.enum(['free', 'paid']).default('free'),
  estimatedTime: z.string().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  prerequisites: z.array(z.string()).default([]),
})

export type Component = z.infer<typeof componentSchema>
export type ChecklistItem = z.infer<typeof checklistSchema>