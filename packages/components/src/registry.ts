export interface ComponentMetadata {
  id: string
  name: string
  description: string
  category: string
  isFree: boolean
  code: string
  preview?: string
}

export const componentRegistry: ComponentMetadata[] = [
  // Free Components (20)
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants',
    category: 'Forms',
    isFree: true,
    code: `export function Button({ children, variant = 'default' }: { children: React.ReactNode; variant?: 'default' | 'outline' }) {
  return (
    <button className={\`px-4 py-2 rounded \${variant === 'outline' ? 'border border-gray-300' : 'bg-primary text-white'}\`}>
      {children}
    </button>
  )
}`,
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Text input field with label support',
    category: 'Forms',
    isFree: true,
    code: `export function Input({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <input className="w-full px-3 py-2 border border-gray-300 rounded" {...props} />
    </div>
  )
}`,
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Container component for content sections',
    category: 'Layout',
    isFree: true,
    code: `export function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  )
}`,
  },
  // Add more free components as placeholders
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `free-component-${i + 4}`,
    name: `Free Component ${i + 4}`,
    description: `This is free component number ${i + 4}`,
    category: 'General',
    isFree: true,
    code: `export function FreeComponent${i + 4}() { return <div>Free Component ${i + 4}</div> }`,
  })),

  // Paid Components (30)
  {
    id: 'advanced-table',
    name: 'Advanced Table',
    description: 'Feature-rich data table with sorting and pagination',
    category: 'Data Display',
    isFree: false,
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'chart',
    name: 'Chart',
    description: 'Interactive charts and graphs',
    category: 'Data Display',
    isFree: false,
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'Advanced modal dialog with animations',
    category: 'Overlay',
    isFree: false,
    code: `// This is premium content. Upgrade to access this component.`,
  },
  // Add more paid components as placeholders
  ...Array.from({ length: 27 }, (_, i) => ({
    id: `paid-component-${i + 4}`,
    name: `Premium Component ${i + 4}`,
    description: `This is premium component number ${i + 4}`,
    category: 'Premium',
    isFree: false,
    code: `// This is premium content. Upgrade to access this component.`,
  })),
]

export function getComponentById(id: string): ComponentMetadata | undefined {
  return componentRegistry.find((c) => c.id === id)
}

export function getComponentsByCategory(category: string): ComponentMetadata[] {
  return componentRegistry.filter((c) => c.category === category)
}

export function getFreeComponents(): ComponentMetadata[] {
  return componentRegistry.filter((c) => c.isFree)
}

export function getPaidComponents(): ComponentMetadata[] {
  return componentRegistry.filter((c) => !c.isFree)
}
