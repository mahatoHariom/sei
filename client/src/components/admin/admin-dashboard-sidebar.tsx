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
import { useDispatch, useSelector } from "react-redux";
import { resetState, RootState } from "@/store/store";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { Messages } from "@/constants/messages";
import { routesPath } from "@/constants/routes-path";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AdminDashboardSidebarProps {
  onItemClick?: () => void;
}

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

export function AdminDashboardSidebar({
  onItemClick,
}: AdminDashboardSidebarProps) {
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

  const handleNavigation = (url: string) => {
    router.push(url);
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-foreground">ADMIN DASHBOARD</h2>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Welcome {fullName}
        </p>
      </div>

      <nav className="mt-4 flex-1">
        <div className="flex flex-col gap-2 px-2">
          {adminItems.map((item) => {
            const isActive = pathname === item.url;
            return (
              <Button
                key={item.title}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  isActive && "font-medium",
                  !isActive && "text-muted-foreground"
                )}
                onClick={() => handleNavigation(item.url)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
                {isActive && (
                  <div className="absolute left-0 w-1 h-full bg-primary rounded-r-md" />
                )}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto p-4 border-t">
        <Button onClick={handleLogout} variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
