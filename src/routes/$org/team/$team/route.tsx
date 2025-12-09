import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$org/team/$team")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}
