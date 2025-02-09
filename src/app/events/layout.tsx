import { SidebarProvider } from "@/components/ui/sidebar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <SidebarProvider>{children}</SidebarProvider>
    </div>
  );
}
