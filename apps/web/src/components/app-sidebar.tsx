"use client"

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Package,
  ClipboardCheck,
  Palette,
  HelpCircle,
  MessageSquare,
  Sparkles,
  CreditCard,
  User,
  LogOut,
  Library,
  ChevronRight,
  FileText as FileIcon
} from "lucide-react"
import { useUser, useClerk, UserButton } from "@clerk/nextjs" // Added UserButton import

import { useUserPlan } from '@/hooks/use-user-plan'
import { Badge } from '@/components/ui/badge'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronsUpDown } from "lucide-react"

// Platform Items Data
const platformItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Get Started',
    url: '/dashboard/docs',
    icon: FileText,
    items: [
      { title: 'Onboarding', url: '/dashboard/onboarding' },
      { title: 'Tutorials', url: '/dashboard/tutorials' },
    ],
  },
  {
    title: 'Components',
    url: '/dashboard/components',
    icon: Package,
  },
  {
    title: 'Shopify Checklist',
    url: '/dashboard/shopify-checklist',
    icon: ClipboardCheck,
  },
  {
    title: 'Themes',
    url: '#',
    icon: Palette,
    badge: 'Coming Soon',
    disabled: true,
  },
  {
    title: 'Support',
    url: '/support',
    icon: HelpCircle,
  },
  {
    title: 'Feedback',
    url: '/feedback',
    icon: MessageSquare,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user } = useUser()
  const { signOut } = useClerk()
  const { plan } = useUserPlan()

  const userName = user?.fullName || user?.firstName || 'User'
  const userEmail = user?.primaryEmailAddress?.emailAddress || 'user@example.com'

  const handleLogout = async () => {
    await signOut({ redirectUrl: '/' })
  }

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Library className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Gated Components</span>
                  <span className="truncate text-xs">{plan} Plan</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {platformItems.map((item) => (
                item.items ? (
                  <Collapsible key={item.title} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={pathname.startsWith(item.url)} tooltip={item.title}>
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                                <Link href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                      disabled={item.disabled}
                      className={item.disabled ? "opacity-70 cursor-not-allowed" : ""}
                    >
                      <Link href={item.url} className={item.disabled ? "pointer-events-none" : ""}>
                        <item.icon />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="ml-auto text-[10px] px-2 py-0.5 h-5 font-medium border-muted-foreground/30">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* Unlock Pro Card */}
          <SidebarMenuItem className="px-1 pb-4">
            <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-card p-4 group-data-[collapsible=icon]:hidden shadow-sm">
              <div className="mb-3">
                <span className="inline-flex items-center rounded-sm bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-500 ring-1 ring-inset ring-green-500/20">
                  <span className="mr-1 h-1 w-1 rounded-full bg-green-500"></span>
                  UNLOCK THE FULL FLEX
                </span>
              </div>

              <h3 className="mb-2 text-base font-bold leading-tight whitespace-nowrap">
                Get Lifetime Access
              </h3>

              <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                Grab 350+ banger blocks and 500+ ROI roadmaps
              </p>

              <div className="mb-4 space-y-2">
                {[
                  "500+ Foolproof Checklist",
                  "Copy. Paste. Profit.",
                  "5x Your Margins"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mb-3 flex items-baseline gap-1">
                <span className="text-2xl font-bold">$399</span>
                <span className="text-xs text-muted-foreground">Lifetime Bag</span>
              </div>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openPricingDialog'))}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-xs font-semibold text-background transition-all hover:opacity-90 active:scale-95"
              >
                Claim the Pro Drip
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>

              {/* Avatar Group */}
              <div className="mb-1 mt-4 flex items-center justify-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="relative w-6 h-6 rounded-full border-2 border-card bg-gray-200 overflow-hidden">
                      <img
                        src={`https://ui-avatars.com/api/?name=User+${i}&background=random&color=fff`}
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-0.5 text-center text-[10px] text-muted-foreground">
                Joining 2,500+ Agency Legends
              </p>
            </div>
          </SidebarMenuItem>

          {/* User Menu */}
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {/* Using generic Avatar/Initials if UserButton doesn't support direct custom rendering easily in this structure, 
                       or we can use UserButton. But to match the Sidebar-08 design, we want the custom menu. 
                       I'll use the Clerk user data to render the avatar/name manually for the trigger, 
                       and then custom items in the menu. */}
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                    {/* Try to use UserButton just for the avatar image? No, UserButton controls its own menu. 
                         If we want Shadcn menu, we should use <img src={user.imageUrl} /> */}
                    {user?.imageUrl ? (
                      <img src={user.imageUrl} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="size-4" />
                    )}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">{userName}</span>
                    <span className="truncate text-xs">{userEmail}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground overflow-hidden">
                      {user?.imageUrl ? (
                        <img src={user.imageUrl} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        <User className="size-4" />
                      )}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{userName}</span>
                      <span className="truncate text-xs">{userEmail}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('openPricingDialog'))}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/dashboard/profile" className="w-full">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Account
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/settings" className="w-full">
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => window.dispatchEvent(new CustomEvent('openChangelogDialog'))}>
                    <FileIcon className="mr-2 h-4 w-4" />
                    Changelog
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
