import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing data
  await prisma.checklistItem.deleteMany({})
  await prisma.component.deleteMany({})
  await prisma.changelogEntry.deleteMany({})
  console.log('✅ Cleared existing checklist items, components, and changelog entries')

  // Free checklist items
  const freeItems = [
    {
      title: 'Set up your Shopify store',
      description: 'Create and configure your basic Shopify store settings',
      icon: 'Package',
      isPro: false,
      order: 1,
      detailContent: `## Getting Started with Your Shopify Store

Setting up your Shopify store is the foundation of your e-commerce success. Follow these detailed steps:

### Step 1: Store Information
- Navigate to Settings > General in your Shopify admin
- Fill in your store name, email, and business details
- Add your store address for tax and shipping calculations

### Step 2: Currency and Units
- Choose your primary currency based on your target market
- Set up measurement units (metric or imperial)
- Configure timezone for accurate order timestamps

### Step 3: Legal Pages
- Create privacy policy, terms of service, and refund policy
- Add these to your store footer for legal compliance

**Pro Tip:** Take your time with initial setup - changes later can affect existing orders and customers.`,
    },
    {
      title: 'Add product listings',
      description: 'Upload products with images, descriptions, and pricing',
      icon: 'ShoppingCart',
      isPro: false,
      order: 2,
      detailContent: `## Creating Product Listings

Your product listings are crucial for conversions. Here's how to optimize them:

### Essential Elements
1. **Product Title**: Clear, descriptive, and SEO-friendly (50-60 characters)
2. **High-Quality Images**: Multiple angles, 2000x2000px minimum
3. **Detailed Description**: Benefits, features, specifications
4. **Pricing**: Competitive pricing with compare-at price if applicable

### Organization
- Use collections to group similar products
- Add tags for better searchability
- Set up variants for sizes, colors, etc.

### SEO Optimization
- Write unique meta descriptions for each product
- Use descriptive URLs
- Add alt text to all images

**Best Practice:** Start with 10-20 products and expand gradually to ensure quality over quantity.`,
    },
    {
      title: 'Configure payment gateway',
      description: 'Set up payment processing for customer transactions',
      icon: 'Settings',
      isPro: false,
      order: 3,
      detailContent: `## Payment Gateway Setup

Accepting payments securely is critical for your store's success.

### Available Options
1. **Shopify Payments** (Recommended)
   - No transaction fees
   - Easy setup
   - Competitive rates

2. **Third-Party Gateways**
   - PayPal, Stripe, Square
   - Additional transaction fees apply
   - More setup required

### Setup Process
1. Go to Settings > Payments
2. Choose your payment provider
3. Enter business and banking details
4. Enable test mode before going live
5. Complete verification process

### Security
- Ensure SSL certificate is active
- Enable fraud analysis
- Set up 2FA for your admin account

**Important:** Test transactions thoroughly before launching to customers.`,
    },
    {
      title: 'Customize your theme',
      description: 'Design and personalize your store appearance',
      icon: 'Palette',
      isPro: false,
      order: 4,
      detailContent: `## Theme Customization Guide

Your store's design creates the first impression. Make it count!

### Theme Selection
- Browse Shopify Theme Store
- Consider mobile responsiveness
- Check loading speed
- Read reviews and ratings

### Customization Steps
1. **Logo and Branding**
   - Upload your logo (recommended size: 250x100px)
   - Set brand colors
   - Choose typography

2. **Homepage Layout**
   - Add hero banner with compelling CTA
   - Feature bestsellers or new arrivals
   - Include social proof (reviews, testimonials)

3. **Navigation**
   - Create clear menu structure
   - Add search functionality
   - Enable filters for collections

### Mobile Optimization
- Test on multiple devices
- Ensure touch-friendly buttons
- Optimize image sizes

**Pro Tip:** Keep it simple - don't overwhelm visitors with too many elements.`,
    },
    {
      title: 'Add shipping zones',
      description: 'Configure shipping rates and delivery zones',
      icon: 'Truck',
      isPro: false,
      order: 5,
      detailContent: `## Shipping Configuration

Proper shipping setup ensures smooth order fulfillment.

### Setting Up Zones
1. Go to Settings > Shipping and delivery
2. Click "Create shipping zone"
3. Name your zone (e.g., "United States", "Europe")
4. Select countries/regions

### Rate Options
- **Flat rate**: Fixed price regardless of weight
- **Weight-based**: Varies by order weight
- **Price-based**: Varies by order total
- **Free shipping**: Above certain threshold

### Carrier Integration
- Connect with USPS, UPS, FedEx, or DHL
- Enable real-time carrier rates
- Set up package dimensions and weights

### Best Practices
- Offer free shipping when possible (absorb cost or set minimum order)
- Be transparent about delivery times
- Provide tracking information
- Consider international shipping carefully

**Tip:** Test your shipping rates with sample orders before launch.`,
    },
  ]

  // Pro checklist items
  const proItems = [
    {
      title: 'Advanced SEO optimization',
      description: 'Implement advanced SEO strategies to boost visibility',
      icon: 'TrendingUp',
      isPro: true,
      order: 6,
      detailContent: `## Advanced SEO Optimization (Pro)

Take your store's visibility to the next level with advanced SEO techniques.

### Technical SEO
1. **Schema Markup**
   - Implement Product schema
   - Add breadcrumb markup
   - Use Organization schema

2. **Site Structure**
   - Create XML sitemap
   - Optimize robots.txt
   - Fix broken links and redirects

### Content Optimization
- Long-form product descriptions (300+ words)
- Blog content for target keywords
- Internal linking strategy
- User-generated content (reviews)

### Performance
- Optimize Core Web Vitals
- Lazy load images
- Minify CSS/JS
- Use CDN for assets

### Advanced Tactics
- Competitor analysis
- Backlink building strategy
- Rich snippets optimization
- International SEO (hreflang tags)

**Pro Feature:** Access to SEO audit tools and monthly performance reports.`,
    },
    {
      title: 'Pro integrations setup',
      description: 'Connect with premium third-party tools and services',
      icon: 'Zap',
      isPro: true,
      order: 7,
      detailContent: `## Premium Integrations (Pro)

Connect your store with powerful third-party tools for enhanced functionality.

### Marketing Automation
- Klaviyo for email marketing
- Omnisend for omnichannel campaigns
- Privy for pop-ups and conversions

### Analytics & Insights
- Google Analytics 4 (advanced setup)
- Hotjar for heatmaps
- Lucky Orange for session recordings

### Customer Support
- Gorgias for helpdesk
- Tidio for live chat
- Re:amaze for customer engagement

### Inventory & Fulfillment
- ShipStation for shipping
- Inventory Planner for forecasting
- Returnly for returns management

### Social Commerce
- Facebook Shop integration
- Instagram Shopping
- TikTok Shop
- Pinterest catalogs

**Pro Benefit:** Priority integration support and custom webhook setup.`,
    },
    {
      title: 'Enable security features',
      description: 'Activate advanced security and fraud protection',
      icon: 'Shield',
      isPro: true,
      order: 8,
      detailContent: `## Advanced Security Features (Pro)

Protect your store and customers with enterprise-level security.

### Fraud Prevention
1. **Fraud Analysis**
   - Enable advanced fraud detection
   - Set up custom risk rules
   - Auto-cancel suspicious orders

2. **Payment Security**
   - 3D Secure authentication
   - AVS verification
   - CVV requirement

### Data Protection
- GDPR compliance tools
- Customer data encryption
- Secure checkout (PCI DSS)
- Regular security audits

### Access Control
- Staff permission levels
- Two-factor authentication for all users
- IP whitelisting for admin
- Session timeout settings

### Monitoring
- Real-time security alerts
- Login attempt tracking
- Suspicious activity reports
- DDoS protection

**Pro Exclusive:** Dedicated security specialist and quarterly security reviews.`,
    },
    {
      title: 'Access VIP support',
      description: 'Get priority support from Shopify experts',
      icon: 'Lock',
      isPro: true,
      order: 9,
      detailContent: `## VIP Support Access (Pro)

Get expert help when you need it with our premium support tier.

### Support Channels
- **Priority Chat**: <15 minute response time
- **Phone Support**: Direct line to senior support agents
- **Email**: 2-hour guaranteed response
- **Video Calls**: Screen-sharing sessions for complex issues

### Dedicated Resources
- Personal account manager
- Monthly strategy calls
- Quarterly business reviews
- Direct Slack channel

### Technical Assistance
- Custom code review
- Theme troubleshooting
- App conflict resolution
- Performance optimization
- Migration support

### Educational Resources
- Exclusive webinars
- One-on-one training sessions
- Advanced documentation
- Beta feature access

### Response Times
- Critical issues: <30 minutes
- High priority: <2 hours
- Medium priority: <6 hours
- Low priority: <24 hours

**VIP Perk:** 24/7 emergency support hotline for critical store issues.`,
    },
    {
      title: 'Advanced analytics',
      description: 'Access detailed analytics and reports',
      icon: 'BarChart',
      isPro: true,
      order: 10,
      detailContent: `## Advanced Analytics Dashboard (Pro)

Make data-driven decisions with comprehensive analytics and insights.

### Key Metrics
- **Sales Analytics**
  - Revenue by product/collection
  - Customer lifetime value (CLV)
  - Average order value (AOV)
  - Sales by traffic source

- **Customer Insights**
  - Cohort analysis
  - RFM segmentation
  - Purchase patterns
  - Churn prediction

### Custom Reports
- Inventory turnover
- Product performance ranking
- Marketing ROI by channel
- Conversion funnel analysis
- Cart abandonment breakdown

### Real-Time Dashboards
- Live sales tracking
- Active visitors
- Top products today
- Revenue goals vs actuals

### Export & Integration
- Custom CSV exports
- Google Data Studio integration
- Automated weekly/monthly reports
- API access for custom tools

### Predictive Analytics
- Sales forecasting
- Inventory recommendations
- Seasonal trend analysis
- Customer behavior predictions

**Pro Feature:** AI-powered insights and personalized recommendations for growth.`,
    },
  ]

  // Insert free items
  for (const item of freeItems) {
    await prisma.checklistItem.create({
      data: item,
    })
  }
  console.log(`✅ Created ${freeItems.length} free checklist items`)

  // Insert pro items
  for (const item of proItems) {
    await prisma.checklistItem.create({
      data: item,
    })
  }
  console.log(`✅ Created ${proItems.length} pro checklist items`)

  // Test components - 5 free and 5 pro
  const testComponents = [
    // FREE COMPONENTS
    {
      componentId: 'avatar',
      name: 'Avatar',
      description: 'User profile pictures with fallback support',
      category: 'free',
      isFree: true,
      variantCount: 3,
      componentCount: 1,
      thumbnail: '/thumbnails/avatar.svg',
      isPageExample: false,
      order: 1,
      code: `import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }`,
    },
    {
      componentId: 'button-primary',
      name: 'Primary Button',
      description: 'Main action buttons with multiple variants',
      category: 'free',
      isFree: true,
      variantCount: 5,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      previewImage: '/thumbnails/placeholder.svg',
      installFilename: 'button.tsx',
      note: 'Primary action button with multiple sizes and variants.',
      implementationGuide: 'Install the button file\nImport Button\nChoose variant and size',
      customization: 'Override Tailwind classes via className.',
      isPageExample: false,
      order: 2,
      code: `import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'primary',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'border border-input bg-background hover:bg-accent': variant === 'outline',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'danger',
        },
        {
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-12 px-6 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}`,
    },
    {
      componentId: 'badge',
      name: 'Badge',
      description: 'Small status indicators and labels',
      category: 'free',
      isFree: true,
      variantCount: 4,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 3,
      code: `import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          'bg-primary text-primary-foreground': variant === 'default',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-green-500 text-white': variant === 'success',
          'bg-yellow-500 text-white': variant === 'warning',
          'bg-red-500 text-white': variant === 'danger',
        },
        className
      )}
      {...props}
    />
  )
}`,
    },
    {
      componentId: 'input',
      name: 'Input',
      description: 'Text input fields with validation states',
      category: 'free',
      isFree: true,
      variantCount: 3,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 4,
      code: `import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"`,
    },
    {
      componentId: 'card',
      name: 'Card',
      description: 'Container component for content grouping',
      category: 'free',
      isFree: true,
      variantCount: 2,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 5,
      code: `import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
}`,
    },
    // PRO COMPONENTS
    {
      componentId: 'data-table',
      name: 'Data Table',
      description: 'Advanced table with sorting, filtering, and pagination',
      category: 'paid',
      isFree: false,
      variantCount: 8,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 6,
      code: `// This is premium content. Upgrade to access this component.
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function DataTable<T extends Record<string, any>>({ data, columns }: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: 'asc' | 'desc' } | null>(null)
  
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0
    const aVal = a[sortConfig.key]
    const bVal = b[sortConfig.key]
    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {columns.map((col) => (
              <th key={String(col.key)} className="p-3 text-left">
                <div className="flex items-center gap-2">
                  {col.label}
                  {col.sortable && <ChevronDown className="w-4 h-4" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-3">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`,
    },
    {
      componentId: 'chart',
      name: 'Interactive Charts',
      description: 'Beautiful charts with animations and tooltips',
      category: 'paid',
      isFree: false,
      variantCount: 6,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 7,
      code: `// This is premium content. Upgrade to access this component.
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
  name: string
  value: number
}

interface ChartProps {
  data: ChartData[]
  height?: number
}

export function Chart({ data, height = 300 }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}`,
    },
    {
      componentId: 'modal',
      name: 'Advanced Modal',
      description: 'Feature-rich modal dialogs with animations',
      category: 'paid',
      isFree: false,
      variantCount: 4,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 8,
      code: `// This is premium content. Upgrade to access this component.
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={\`relative bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto
        \${size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-4xl' : size === 'xl' ? 'max-w-6xl' : 'max-w-2xl'}\`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}`,
    },
    {
      componentId: 'dropdown-menu',
      name: 'Dropdown Menu',
      description: 'Context menus with nested options',
      category: 'paid',
      isFree: false,
      variantCount: 5,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 9,
      code: `// This is premium content. Upgrade to access this component.
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface MenuItem {
  label: string
  onClick: () => void
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownMenuProps {
  trigger: React.ReactNode
  items: MenuItem[]
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { item.onClick(); setIsOpen(false) }}
              disabled={item.disabled}
              className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 disabled:opacity-50"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
    },
    {
      componentId: 'toast',
      name: 'Toast Notifications',
      description: 'Non-intrusive notifications with auto-dismiss',
      category: 'paid',
      isFree: false,
      variantCount: 4,
      componentCount: 1,
      thumbnail: '/thumbnails/placeholder.svg',
      isPageExample: false,
      order: 10,
      code: `// This is premium content. Upgrade to access this component.
import { createContext, useContext, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

const ToastContext = createContext<{
  showToast: (message: string, type: ToastType) => void
} | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36)
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map(toast => (
          <div key={toast.id} className="bg-white border rounded-lg shadow-lg p-4 flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle className="text-green-500" />}
            {toast.type === 'error' && <AlertCircle className="text-red-500" />}
            {toast.type === 'info' && <Info className="text-blue-500" />}
            <span>{toast.message}</span>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}`,
    },
  ]

  // Insert test components
  for (const component of testComponents) {
    const data = {
      ...component,
      previewImage: component.previewImage ?? component.thumbnail ?? '/thumbnails/placeholder.svg',
      installFilename: component.installFilename ?? `${component.componentId}.tsx`,
      codeFilename: component.codeFilename ?? component.installFilename ?? `${component.componentId}.tsx`,
      note: component.note ?? `Short note for ${component.name}.`,
      implementationGuide: component.implementationGuide ?? 'Install the file\nImport the component\nUse with props',
      customization: component.customization ?? 'Customize styles via className and Tailwind.',
    }
    await prisma.component.create({
      data,
    })
  }
  console.log(`✅ Created ${testComponents.length} test components (5 free + 5 pro)`)

  // Changelog demo data (with image and video)
  const changelogEntries = [
    {
      date: new Date('2025-06-30'),
      version: '2.1',
      title: 'Performance & UX refresh',
      badges: ['Performance', 'UX'],
      image: '/thumbnails/placeholder.svg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      features: [
        'Optimized Tailwind build and reduced bundle size',
        'Refined sidebar header alignment and breadcrumbs',
        'New Components page filters: All, Free, Pro',
      ],
      bugFixes: ['Fixed env loading for Prisma', 'Resolved cookie modal state issues'],
      order: 1,
      isActive: true,
    },
    {
      date: new Date('2025-06-15'),
      version: '2.0',
      title: 'Major release with DB-backed components',
      badges: ['Release'],
      image: '/thumbnails/avatar.svg',
      videoUrl: '',
      features: ['Components sourced from Supabase DB', 'Component detail page revamp'],
      bugFixes: ['Various UI polish across pages'],
      order: 2,
      isActive: true,
    },
    {
      date: new Date('2025-06-01'),
      version: '1.9.5',
      title: 'Quality of life improvements',
      badges: ['UI', 'DX'],
      image: '/thumbnails/placeholder.svg',
      videoUrl: '',
      features: ['Improved docs styling', 'Faster local dev builds'],
      bugFixes: ['Fixed breadcrumb truncation on mobile'],
      order: 3,
      isActive: true,
    },
  ]
  for (const entry of changelogEntries) {
    await prisma.changelogEntry.create({ data: entry })
  }
  console.log(`✅ Created ${changelogEntries.length} changelog entries`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
