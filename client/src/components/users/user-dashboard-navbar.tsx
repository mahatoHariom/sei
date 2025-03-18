"use client";

import React from "react";
import { ModeToggle } from "../global/theme-toggle";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

interface UserDashboardNavbarProps {
  className?: string;
  onMobileMenuClick?: () => void;
  isMobile?: boolean;
}

const UserDashboardNavbar: React.FC<UserDashboardNavbarProps> = ({
  className,
  onMobileMenuClick,
  isMobile = false,
}) => {
  const { fullName } = useSelector((state: RootState) => state.user);

  return (
    <div
      className={cn(
        "flex justify-between items-center h-16 border-b px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMobileMenuClick}
            className="md:hidden"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        )}
        <h2 className="text-lg font-medium">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <span className="text-sm font-medium hidden md:inline-block">
          {fullName}
        </span>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
