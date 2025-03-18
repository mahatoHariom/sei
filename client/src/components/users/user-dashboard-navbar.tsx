"use client";

import React from "react";
import { ModeToggle } from "../global/theme-toggle";
import { cn } from "@/lib/utils";
import { User, Bell } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface UserDashboardNavbarProps {
  className?: string;
}

const UserDashboardNavbar: React.FC<UserDashboardNavbarProps> = ({
  className,
}) => {
  const { fullName } = useSelector((state: RootState) => state.user);

  return (
    <div
      className={cn(
        "flex justify-between items-center h-16 border-b px-6",
        className
      )}
    >
      <div>
        <h2 className="text-lg font-medium">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm hidden md:inline-block">{fullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardNavbar;
