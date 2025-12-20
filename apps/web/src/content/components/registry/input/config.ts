import { Component } from '../../../config'

export const input: Component = {
    id: 'input',
    name: 'Input',
    slug: 'input',
    title: 'Input',
    access: 'free',
    description: 'Text input fields with validation states',
    category: 'free',
    isFree: true,
    variantCount: 5,
    componentCount: 1,
    thumbnail: '/thumbnails/placeholder.svg',
    isPageExample: false,
    order: 5,
    tags: ['ui', 'forms', 'input'],
    dependencies: [],
    installCommand: '',
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }`,
    implementationSteps: [
        'Copy the Input component code to components/ui/input.tsx',
        'Import the Input component where needed',
        'Use with forms and validation libraries like react-hook-form'
    ],
    customizationGuide: []
}
