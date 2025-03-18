"use client";

import {
  User,
  BookOpen,
  Phone,
  LogOut,
  User2,
  School,
  PictureInPicture,
  File,
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
  {
    title: "Pdfs File",
    url: "/admin/dashboard/pdfs",
    icon: File,
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
    <div className="h-full bg-card border-r flex flex-col">
      <div className="px-4 py-2 flex flex-col mb-6">
        <span className="text-lg font-bold text-destructive">
          ADMIN DASHBOARD
        </span>
        <span className="text-sm font-medium text-primary block mt-1">
          Welcome {fullName}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mt-8">
          <div className="flex flex-col gap-4">
            {adminItems.map((item) => {
              const isActive = pathname === item.url;
              return (
                <button
                  key={item.title}
                  onClick={() => router.push(item.url)}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-5 text-sm font-medium rounded-md transition-colors relative",
                    "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-full bg-primary rounded-r-md" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <Button onClick={handleLogout} variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
