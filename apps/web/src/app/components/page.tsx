import Link from 'next/link'
import { componentRegistry } from '@gated/components'

export default function ComponentsPage() {
  const categories = Array.from(new Set(componentRegistry.map((c) => c.category)))

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Component Library</h1>
        <p className="text-muted-foreground mb-8">
          Browse our collection of {componentRegistry.length} components
        </p>

        {categories.map((category) => {
          const components = componentRegistry.filter((c) => c.category === category)
          return (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {components.map((component) => (
                  <Link
                    key={component.id}
                    href={`/components/${component.id}`}
                    className="border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{component.name}</h3>
                      {!component.isFree && (
                        <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded">
                          Pro
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
