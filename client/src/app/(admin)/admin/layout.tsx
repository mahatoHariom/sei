"use client";

import { useState, useEffect } from "react";
import { AdminDashboardSidebar } from "@/components/admin/admin-dashboard-sidebar";
import UserDashboardNavbar from "@/components/users/user-dashboard-navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-64 h-full border-r bg-card shadow-sm z-20">
        <AdminDashboardSidebar />
      </aside>

      {/* Mobile sidebar */}
      {isMobile && (
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <AdminDashboardSidebar
              onItemClick={() => setIsSidebarOpen(false)}
            />
          </SheetContent>
        </Sheet>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <UserDashboardNavbar
          onMobileMenuClick={() => setIsSidebarOpen(true)}
          isMobile={isMobile}
        />
        <div className="flex-1 p-4 md:p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
