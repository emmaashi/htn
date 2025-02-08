import { SidebarProvider } from "@/components/ui/sidebar"

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}
