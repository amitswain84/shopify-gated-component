import { Component } from '../../../config'

export const badge: Component = {
    id: 'badge',
    name: 'Badge',
    slug: 'badge',
    title: 'Badge',
    access: 'free',
    description: 'Small status indicators and labels',
    category: 'free',
    isFree: true,
    variantCount: 8,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 4,
    tags: ['ui', 'status', 'labels'],
    dependencies: [],
    installCommand: '',
    code: `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }`,
    implementationSteps: [
        'Copy the Badge component code to components/ui/badge.tsx',
        'Import the Badge component where needed',
        'Use different variants: default, secondary, destructive, outline'
    ],
    customizationGuide: []
}
