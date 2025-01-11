"use client";

import {
  User,
  BookOpen,
  Phone,
  LogOut,
  User2,
  School,
  PictureInPicture,
} from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { resetState, RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { routesPath } from "@/constants/routes-path";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
// import { clearUser } from "@/store/slices/userSlice";

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
    title: "All Enrolled Users",
    url: "/admin/dashboard/all-enrolled",
    icon: School,
  },
  {
    title: "Contacts",
    url: "/admin/dashboard/contacts",
    icon: Phone,
  },
  {
    title: "Profile",
    url: "/admin/dashboard/admin-profile",
    icon: User2,
  },
  {
    title: "Carousels",
    url: "/admin/dashboard/all-carousel",
    icon: PictureInPicture,
  },
];

export function AdminDashboardSidebar() {
  const { fullName } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("admin");
    dispatch(resetState());
    toast.success(Messages.logout.success);
    router.push(routesPath.home);
  };

  return (
    <Sidebar className="border-r bg-card">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 flex flex-col mb-6">
            <span className="text-lg font-bold text-destructive">
              ADMIN DASHBOARD
            </span>
            <span className="text-sm font-medium text-primary block mt-1">
              Welcome {fullName}
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-8">
            <SidebarMenu className="flex flex-col gap-4">
              {adminItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => router.push(item.url)}
                  >
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-5 text-sm font-medium rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                        isActive && "bg-accent text-accent-foreground",
                        !isActive && "text-muted-foreground"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        {isActive && (
                          <div className="absolute left-0 w-1 h-full bg-primary rounded-r-md" />
                        )}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
