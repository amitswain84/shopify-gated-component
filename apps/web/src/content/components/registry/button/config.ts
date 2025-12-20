import { Component } from '../../../config'

export const button: Component = {
    id: 'button',
    name: 'Button',
    slug: 'button',
    title: 'Button',
    access: 'free',
    description: 'Versatile button components with multiple styles and variants',
    category: 'free',
    isFree: true,
    variantCount: 13,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 2,
    tags: ['ui', 'actions', 'forms'],
    dependencies: ['class-variance-authority'],
    installCommand: 'npm install class-variance-authority',
    code: `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`,
    preview: `<div className="flex gap-2">
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`,
    implementationSteps: [
        'Install the required dependencies: npm install class-variance-authority @radix-ui/react-slot',
        'Copy and paste the Button component code into your project at components/ui/button.tsx',
        'Import the Button component where you want to use it',
        'Use different variants: default, destructive, outline, secondary, ghost, link',
        'Use different sizes: default, sm, lg, icon',
        'Combine variants and sizes as needed'
    ],
    customizationGuide: [
        {
            title: 'Adding New Variants',
            content: 'Extend the buttonVariants cva configuration to add new color schemes. Add your variant to the variants.variant object with appropriate Tailwind classes.'
        },
        {
            title: 'Custom Sizes',
            content: 'Add new sizes by extending the variants.size object. Include height, padding, and text size adjustments for consistent scaling.'
        },
        {
            title: 'Icon Buttons',
            content: 'Use the icon size variant for square buttons with icons. Combine with Lucide React icons for best results.'
        },
        {
            title: 'Loading States',
            content: 'Add loading props and spinner icons to create buttons with loading states. Disable the button and show a spinner when loading.'
        }
    ]
}
