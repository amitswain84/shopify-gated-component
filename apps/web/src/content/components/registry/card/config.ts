import { Component } from '../../../config'

export const card: Component = {
    id: 'card',
    name: 'Card',
    slug: 'card',
    title: 'Card',
    access: 'free',
    description: 'Flexible container component for grouping related content',
    category: 'free',
    isFree: true,
    variantCount: 6,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 3,
    tags: ['ui', 'container', 'layout'],
    dependencies: [],
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }`,
    preview: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Project content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button>Deploy</Button>
  </CardFooter>
</Card>`,
    implementationSteps: [
        'Copy and paste the Card component code into your project at components/ui/card.tsx',
        'Import the Card components where you want to use them',
        'Use CardHeader for titles and descriptions',
        'Use CardContent for main content',
        'Use CardFooter for actions and buttons'
    ],
    customizationGuide: [
        {
            title: 'Card Variants',
            content: 'Create different card styles by modifying the base Card className. Add hover effects, different shadows, or background colors.'
        },
        {
            title: 'Spacing',
            content: 'Adjust padding in CardHeader, CardContent, and CardFooter by overriding the default padding classes.'
        },
        {
            title: 'Borders and Shadows',
            content: 'Customize the card appearance by modifying border radius, shadow, and border styles in the base Card component.'
        }
    ]
}
