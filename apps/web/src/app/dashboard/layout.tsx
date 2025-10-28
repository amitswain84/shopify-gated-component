import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { PricingDialogManager } from '@/components/pricing-dialog-manager'
import { TocProvider } from '@/contexts/toc-context'
import { DashboardHeader } from '@/components/dashboard-header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TocProvider>
      <SidebarProvider>
        <AppSidebar />
        <PricingDialogManager />
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
