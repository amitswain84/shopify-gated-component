export interface ComponentMetadata {
  id: string
  name: string
  description: string
  category: string
  isFree: boolean
  code: string
  preview?: string
  variantCount?: number
  componentCount?: number
  thumbnail?: string
  isPageExample?: boolean
}

export const componentRegistry: ComponentMetadata[] = [
  // Free Components
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Versatile button components with multiple styles',
    category: 'free',
    isFree: true,
    componentCount: 5,
    variantCount: 940,
    thumbnail: 'https://placehold.co/600x450/6366f1/fff?text=Buttons',
    code: `export function Button({ variant = 'default', children }: { variant?: 'default' | 'outline', children: React.ReactNode }) {
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
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Input',
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
    variantCount: 15,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Card',
    code: `export function Card({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  )
}`,
  },
  // Add more free components with placeholder data
  {
    id: 'modal',
    name: 'Modal',
    description: 'Accessible modal dialogs with customizable content',
    category: 'Overlay',
    isFree: true,
    variantCount: 10,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Modal',
    code: `export function Modal() { return <div>Modal Component</div> }`,
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'Dropdown menus with keyboard navigation',
    category: 'Navigation',
    isFree: true,
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Dropdown',
    code: `export function Dropdown() { return <div>Dropdown Component</div> }`,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Helpful tooltips with multiple positioning options',
    category: 'Overlay',
    isFree: true,
    variantCount: 6,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Tooltip',
    code: `export function Tooltip() { return <div>Tooltip Component</div> }`,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'Alert messages for success, error, and warnings',
    category: 'Feedback',
    isFree: true,
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Alert',
    code: `export function Alert() { return <div>Alert Component</div> }`,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'Small status indicators and labels',
    category: 'Data Display',
    isFree: true,
    variantCount: 12,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Badge',
    code: `export function Badge() { return <div>Badge Component</div> }`,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'User avatars with fallback support',
    category: 'Data Display',
    isFree: true,
    variantCount: 7,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Avatar',
    code: `export function Avatar() { return <div>Avatar Component</div> }`,
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation breadcrumbs for page hierarchy',
    category: 'Navigation',
    isFree: true,
    variantCount: 5,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Breadcrumb',
    code: `export function Breadcrumb() { return <div>Breadcrumb Component</div> }`,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Pagination controls for data lists',
    category: 'Navigation',
    isFree: true,
    variantCount: 9,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Pagination',
    code: `export function Pagination() { return <div>Pagination Component</div> }`,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed interface for organizing content',
    category: 'Layout',
    isFree: true,
    variantCount: 11,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Tabs',
    code: `export function Tabs() { return <div>Tabs Component</div> }`,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Collapsible accordion for FAQs and content',
    category: 'Layout',
    isFree: true,
    variantCount: 7,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Accordion',
    code: `export function Accordion() { return <div>Accordion Component</div> }`,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox inputs with custom styling',
    category: 'Forms',
    isFree: true,
    variantCount: 6,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Checkbox',
    code: `export function Checkbox() { return <div>Checkbox Component</div> }`,
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Radio button groups for selections',
    category: 'Forms',
    isFree: true,
    variantCount: 5,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Radio',
    code: `export function Radio() { return <div>Radio Component</div> }`,
  },
  {
    id: 'select',
    name: 'Select',
    description: 'Dropdown select menus with search',
    category: 'Forms',
    isFree: true,
    variantCount: 9,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Select',
    code: `export function Select() { return <div>Select Component</div> }`,
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'Toggle switches for on/off states',
    category: 'Forms',
    isFree: true,
    variantCount: 6,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Switch',
    code: `export function Switch() { return <div>Switch Component</div> }`,
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'Range sliders for numeric inputs',
    category: 'Forms',
    isFree: true,
    variantCount: 7,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Slider',
    code: `export function Slider() { return <div>Slider Component</div> }`,
  },
  {
    id: 'progress',
    name: 'Progress Bar',
    description: 'Progress indicators for loading states',
    category: 'Feedback',
    isFree: true,
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Progress',
    code: `export function Progress() { return <div>Progress Component</div> }`,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'Loading spinners in various styles',
    category: 'Feedback',
    isFree: true,
    variantCount: 10,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Spinner',
    code: `export function Spinner() { return <div>Spinner Component</div> }`,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'Skeleton loaders for content placeholders',
    category: 'Feedback',
    isFree: true,
    variantCount: 6,
    thumbnail: 'https://placehold.co/600x400/6366f1/fff?text=Skeleton',
    code: `export function Skeleton() { return <div>Skeleton Component</div> }`,
  },

  // Paid/Premium Components (30+)
  {
    id: 'advanced-table',
    name: 'Advanced Table',
    description: 'Feature-rich data table with sorting, filtering and pagination',
    category: 'Data Display',
    isFree: false,
    variantCount: 25,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Table',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'chart',
    name: 'Chart',
    description: 'Interactive charts and graphs with multiple types',
    category: 'Data Display',
    isFree: false,
    variantCount: 18,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Chart',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'Full-featured calendar with event management',
    category: 'Data Display',
    isFree: false,
    variantCount: 15,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Calendar',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'kanban',
    name: 'Kanban Board',
    description: 'Drag and drop kanban board for task management',
    category: 'Premium',
    isFree: false,
    variantCount: 12,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Kanban',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'file-upload',
    name: 'File Upload',
    description: 'Advanced file upload with drag-and-drop and previews',
    category: 'Forms',
    isFree: false,
    variantCount: 10,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Upload',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'rich-text-editor',
    name: 'Rich Text Editor',
    description: 'WYSIWYG editor with formatting and media support',
    category: 'Forms',
    isFree: false,
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Editor',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'code-editor',
    name: 'Code Editor',
    description: 'Syntax highlighting code editor with themes',
    category: 'Premium',
    isFree: false,
    variantCount: 12,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=CodeEditor',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'dashboard-layout',
    name: 'Dashboard Layout',
    description: 'Pre-built dashboard layouts with responsive sidebar',
    category: 'Layout',
    isFree: false,
    variantCount: 20,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Dashboard',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Beautiful timelines for activity feeds and history',
    category: 'Data Display',
    isFree: false,
    variantCount: 9,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Timeline',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'pricing-table',
    name: 'Pricing Table',
    description: 'Pricing comparison tables for SaaS products',
    category: 'Premium',
    isFree: false,
    variantCount: 15,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Pricing',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'stat-cards',
    name: 'Stat Cards',
    description: 'Analytics and statistics display cards',
    category: 'Data Display',
    isFree: false,
    variantCount: 18,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=StatCards',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'Image and content carousels with autoplay',
    category: 'Premium',
    isFree: false,
    variantCount: 14,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Carousel',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'command-palette',
    name: 'Command Palette',
    description: 'Keyboard-accessible command menu for actions',
    category: 'Navigation',
    isFree: false,
    variantCount: 8,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Command',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'notification-center',
    name: 'Notification Center',
    description: 'Complete notification system with real-time updates',
    category: 'Feedback',
    isFree: false,
    variantCount: 11,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Notifications',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'image-gallery',
    name: 'Image Gallery',
    description: 'Lightbox image gallery with grid and masonry layouts',
    category: 'Premium',
    isFree: false,
    variantCount: 13,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Gallery',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'form-builder',
    name: 'Form Builder',
    description: 'Dynamic form builder with validation',
    category: 'Forms',
    isFree: false,
    variantCount: 16,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=FormBuilder',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'stepper',
    name: 'Stepper',
    description: 'Multi-step forms and wizards',
    category: 'Navigation',
    isFree: false,
    variantCount: 10,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Stepper',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'sidebar-nav',
    name: 'Sidebar Navigation',
    description: 'Advanced sidebar with collapsible menus',
    category: 'Navigation',
    isFree: false,
    variantCount: 22,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Sidebar',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'mega-menu',
    name: 'Mega Menu',
    description: 'Large dropdown menus with multiple columns',
    category: 'Navigation',
    isFree: false,
    variantCount: 9,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=MegaMenu',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'comparison-table',
    name: 'Comparison Table',
    description: 'Feature comparison tables for products',
    category: 'Data Display',
    isFree: false,
    variantCount: 11,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Comparison',
    code: `// This is premium content. Upgrade to access this component.`,
  },
  {
    id: 'search-autocomplete',
    name: 'Search Autocomplete',
    description: 'Search with intelligent autocomplete suggestions',
    category: 'Forms',
    isFree: false,
    variantCount: 12,
    thumbnail: 'https://placehold.co/600x400/8b5cf6/fff?text=Search',
    code: `// This is premium content. Upgrade to access this component.`,
  },
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
