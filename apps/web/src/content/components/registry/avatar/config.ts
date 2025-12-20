import { Component } from '../../../config'

export const avatar: Component = {
    id: 'avatar',
    name: 'Avatar',
    slug: 'avatar',
    title: 'Avatar',
    access: 'free',
    description: 'User profile pictures with fallback support',
    category: 'free',
    isFree: true,
    variantCount: 3,
    componentCount: 1,
    thumbnail: '/thumbnails/avatar.svg',
    isPageExample: false,
    order: 1,
    tags: ['ui', 'profile', 'image'],
    dependencies: ['@radix-ui/react-avatar'],
    installCommand: 'npm install @radix-ui/react-avatar',
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
    preview: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`,
    implementationSteps: [
        'Install the required dependencies: npm install @radix-ui/react-avatar',
        'Copy and paste the Avatar component code into your project at components/ui/avatar.tsx',
        'Import the Avatar, AvatarImage, and AvatarFallback components where you want to use them',
        'Use the AvatarImage component with a src prop for the image URL, and AvatarFallback for the fallback content (like initials)',
        'The fallback will automatically display if the image fails to load or while it\'s loading'
    ],
    customizationGuide: [
        {
            title: 'Sizing',
            content: 'Control the avatar size by passing custom className with height and width utilities. Example: className="h-12 w-12" for a larger avatar, or className="h-8 w-8" for a smaller one.'
        },
        {
            title: 'Shape',
            content: 'Change the avatar shape by modifying the border-radius. Replace "rounded-full" with "rounded-lg" for rounded squares, or "rounded-none" for sharp corners.'
        },
        {
            title: 'Fallback Styling',
            content: 'Customize the fallback background and text color using Tailwind classes on the AvatarFallback component. You can also add custom gradients or patterns.'
        },
        {
            title: 'Status Indicators',
            content: 'Add status indicators (online, offline, etc.) by wrapping the Avatar in a relative container and positioning an absolutely positioned badge element.'
        }
    ]
}
