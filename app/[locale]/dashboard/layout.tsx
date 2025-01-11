import DashboardHeader from "@/components/dashboard/DashboardHeader"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main >
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  )
}
