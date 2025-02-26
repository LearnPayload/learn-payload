import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-full w-full flex-1 flex-col gap-4 rounded-xl">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
