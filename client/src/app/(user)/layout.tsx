import { SidebarProvider } from "@/components/ui/sidebar";
import UserDashboardNavbar from "@/components/users/user-dashboard-navbar";
import { UserDashboardSidebar } from "@/components/users/user-dashboard-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <UserDashboardSidebar />
      <main className="w-full">
        <UserDashboardNavbar />
        <section className="py-1 px-4"> {children}</section>
      </main>
    </SidebarProvider>
  );
}
