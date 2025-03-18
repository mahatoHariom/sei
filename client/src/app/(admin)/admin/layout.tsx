import { AdminDashboardSidebar } from "@/components/admin/admin-dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserDashboardNavbar from "@/components/users/user-dashboard-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 fixed h-full z-30">
        <AdminDashboardSidebar />
      </div>

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <UserDashboardNavbar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
