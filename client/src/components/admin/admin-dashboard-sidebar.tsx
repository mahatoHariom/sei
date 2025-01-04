"use client";

import { User, BookOpen, Phone, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { routesPath } from "@/constants/routes-path";
import { Button } from "../ui/button";

const adminItems = [
  {
    title: "All Users",
    url: "/admin/dashboard/all-users",
    icon: User,
  },
  {
    title: "All Subjects",
    url: "/admin/dashboard/all-subjects",
    icon: BookOpen,
  },
  {
    title: "Contacts",
    url: "/admin/dashboard/contacts",
    icon: Phone,
  },
];

export function AdminDashboardSidebar() {
  const { fullName } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("admin");
    router.push(routesPath.login);
    toast.success(Messages.logout.success);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-destructive">
            ADMIN DASHBOARD
          </SidebarGroupLabel>
          <SidebarGroupLabel className="font-medium text-primary">
            Welcome {fullName}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => router.push(item.url)}
                >
                  <SidebarMenuButton asChild>
                    <span className="flex items-center gap-2 cursor-pointer">
                      <item.icon />
                      <span>{item.title}</span>
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
