"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, LogOut, ChevronDown } from "lucide-react";
import {
  Sidebar,
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
import icon from "@/app/assets/icon_transp.png";

import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [open, setOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCheckboxChange = (value: string) => {
    setFilters((prevFilters) =>
      prevFilters.includes(value)
        ? prevFilters.filter((f) => f !== value)
        : [...prevFilters, value],
    );
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem("loggedIn");
    router.push("/");
  };

  const handleLogoutClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarGroup>
        <div className="p-4 flex items-center space-x-2 justify-center">
          <img src={icon.src} className="h-16" />
        </div>

        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setOpen(!open)}
                className={`rounded-lg hover:bg-gray-100 w-52 flex items-center justify-center ml-3 px-4 ${open ? "bg-[#e2e3fb]" : ""}`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
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

            <SidebarMenuItem className="ml-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <SidebarMenuButton
                    className={`rounded-lg hover:bg-gray-100 w-52 flex justify-center px-4 cursor-pointer`}
                    onClick={handleLogoutClick}
                  >
                    <LogOut className="w-4 h-4 -ml-8" />
                    <span>Log out</span>
                  </SidebarMenuButton>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Log out</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to log out?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="button" onClick={handleLogoutConfirm}>
                      Log Out
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  );
}
