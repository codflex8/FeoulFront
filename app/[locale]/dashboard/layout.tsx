import DashboardSidebar from "@/components/DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main >
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
