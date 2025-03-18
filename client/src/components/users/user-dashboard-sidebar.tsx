"use client";
import { Key, User, BookOpen, LogOut, Home } from "lucide-react";
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

interface UserDashboardSidebarProps {
  onItemClick?: () => void;
}

export function UserDashboardSidebar({
  onItemClick,
}: UserDashboardSidebarProps) {
  const { fullName } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    dispatch(clearUser());
    toast.error(Messages.logout.success);
    router.push(routesPath.home);
  };

  const handleHome = () => {
    router.push(routesPath.home);
    onItemClick?.();
  };

  const handleNavigation = (url: string) => {
    router.push(url);
    onItemClick?.();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6">
        <h2 className="text-lg font-bold text-foreground">USER DASHBOARD</h2>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          Welcome {fullName}
        </p>
      </div>

      <nav className="mt-4 flex-1">
        <div className="flex flex-col gap-2 px-2">
          {items.map((item) => {
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
        <div className="flex flex-col gap-3">
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
      </div>
    </div>
  );
}
