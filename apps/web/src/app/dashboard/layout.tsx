import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { PricingDialogManager } from '@/components/pricing-dialog-manager'
import { ChangelogDialog } from '@/components/changelog-dialog'
import { TocProvider } from '@/contexts/toc-context'
import { DashboardHeader } from '@/components/dashboard-header'
import { syncUser } from '@/lib/user-sync'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Automatically sync user to DB on dashboard load
  // This ensures local dev works without webhooks and production is robust
  await syncUser()

  return (
    <TocProvider>
      <SidebarProvider>
        <AppSidebar />
        <PricingDialogManager />
        <ChangelogDialog />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex flex-1 flex-col">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TocProvider>
  )
}
