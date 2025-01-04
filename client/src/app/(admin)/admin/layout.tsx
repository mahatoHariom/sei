import { AdminDashboardSidebar } from "@/components/admin/admin-dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserDashboardNavbar from "@/components/users/user-dashboard-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminDashboardSidebar/>
      <main className="w-full">
        <UserDashboardNavbar />
        <section className="py-1 px-4"> {children}</section>
      </main>
    </SidebarProvider>
  );
}
