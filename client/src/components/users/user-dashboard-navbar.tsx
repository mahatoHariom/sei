"use client";

import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ModeToggle } from "../global/theme-toggle";

const UserDashboardNavbar: React.FC = () => {
  return (
    <div className="flex justify-between border-b py-4 px-3">
      <div>
        <SidebarTrigger />
      </div>
      <ModeToggle />
    </div>
  );
};

export default UserDashboardNavbar;
