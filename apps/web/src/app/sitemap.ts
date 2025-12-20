import { MetadataRoute } from 'next'
import { getAllComponents } from '@/lib/components-db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.com'
  
  // Get all components for dynamic URLs
  const components = await getAllComponents()
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard/components`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dashboard/shopify-checklist`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
  
  // Dynamic component pages
  const componentPages: MetadataRoute.Sitemap = components.map((component) => ({
    url: `${baseUrl}/dashboard/components/${component.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...componentPages]
}
