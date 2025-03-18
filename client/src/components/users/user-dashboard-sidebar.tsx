"use client";
import { Key, User, BookOpen, LogOut, Home } from "lucide-react";
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
import { RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { routesPath } from "@/constants/routes-path";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { clearUser } from "@/store/slices/userSlice";

const items = [
  {
    title: "Profile",
    url: "/user/dashboard/profile",
    icon: User,
  },
  {
    title: "Password",
    url: "/user/dashboard/change-password",
    icon: Key,
  },
  {
    title: "Courses",
    url: "/user/dashboard/courses",
    icon: BookOpen,
  },
];

export function UserDashboardSidebar() {
  const { fullName } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    dispatch(clearUser());
    toast.error(Messages.logout.success);
    router.push(routesPath.home);
  };

  const handleHome = () => {
    router.push(routesPath.home);
  };

  return (
    <Sidebar className="border-r bg-card">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 flex flex-col  mb-6">
            {/* Adjust margin bottom */}
            <span className="text-lg font-bold text-destructive">
              DASHBOARD
            </span>
            <span className="text-sm font-medium text-primary block mt-1">
              Welcome {fullName}
            </span>
          </SidebarGroupLabel>

          <SidebarGroupContent className="mt-8">
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    onClick={() => router.push(item.url)}
                  >
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-5 text-sm font-medium rounded-md transition-colors ",
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

        <div className="mt-auto p-4 border-t flex flex-col gap-3">
          <Button onClick={handleHome} variant="outline" className="w-full">
            <Home className="mr-2 h-4 w-4" />
            <span>Home</span>
          </Button>
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
