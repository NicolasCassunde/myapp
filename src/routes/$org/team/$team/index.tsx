// routes/$org/team/$team/index.tsx
import { AppSidebar } from "@/components/core/app-sidebar";
import { HeaderActions } from "@/components/core/header-actions";
import { HeaderBreadcrumb } from "@/components/core/header-breadcrumb";
import { KanbanView } from "@/components/core/kanban-view";
import { ListView } from "@/components/core/list-view";
import { RightSidebarContent } from "@/components/core/right-sidebar-content";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/$org/team/$team/")({
  component: RouteComponent,
});

type DisplayMode = "kanban" | "list";

function RouteComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("list");

  return (
    <>
      <AppSidebar />
      <main className="flex flex-1 w-full flex-col h-screen overflow-hidden">
        <div className="flex flex-col h-full overflow-hidden">
          <HeaderBreadcrumb
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <HeaderActions
            displayMode={displayMode}
            setDisplayMode={setDisplayMode}
          />

          <div className="relative flex flex-1 overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
              <div
                className={cn(
                  "flex flex-1 flex-col gap-4 p-3.5 overflow-auto pb-3.5 sm:pb-0 transition-[margin] duration-150 ease-in-out",
                  isSidebarOpen && "mr-[380px] md:mr-[440px]",
                )}
              >
                {displayMode === "list" ? <ListView /> : <KanbanView />}
              </div>

              <AnimatePresence mode="popLayout">
                {isSidebarOpen && <RightSidebarContent />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
