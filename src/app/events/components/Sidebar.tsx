"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  LogOut,
  ChevronDown,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface SidebarProps {
  onFilterChange: (filters: string[]) => void;
  defaultFilters: string[];
}

export function SidebarNavigation({
  onFilterChange,
  defaultFilters,
}: SidebarProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<string[]>(defaultFilters);
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (value: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(value) ? prevFilters.filter((f) => f !== value) : [...prevFilters, value]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

  return (
    <Sidebar collapsible="offcanvas" className={sidebarOpen ? "w-64" : "w-16"}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setOpen(!open)} className="peer">
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                  <ChevronDown
                    className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>

              {open && (
                <SidebarMenuSub className="ml-4">
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Checkbox
                        checked={filters.includes("workshop")}
                        onCheckedChange={() => handleCheckboxChange("workshop")}
                      />
                      <Label className="text-right">Workshop</Label>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Checkbox
                        checked={filters.includes("tech_talk")}
                        onCheckedChange={() => handleCheckboxChange("tech_talk")}
                      />
                      <Label className="text-right">Tech Talk</Label>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>
                      <Checkbox
                        checked={filters.includes("activity")}
                        onCheckedChange={() => handleCheckboxChange("activity")}
                      />
                      <Label className="text-right">Activity</Label>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
    </Sidebar>
  );
}