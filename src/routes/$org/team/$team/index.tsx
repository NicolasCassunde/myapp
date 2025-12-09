// routes/$org/team/$team/index.tsx

import { AppSidebar } from "@/components/core/app-sidebar";
import { HeaderActions } from "@/components/core/header-actions";
import { HeaderBreadcrumb } from "@/components/core/header-breadcrumb";
import { RightSidebarContent } from "@/components/core/right-sidebar-content";
import { cn } from "@/lib/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/$org/team/$team/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<"kanban" | "list">("list");

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
                  "flex flex-1 flex-col gap-4 p-3.5 overflow-auto pb-3.5 sm:pb-0",
                  isSidebarOpen && "md:mr-[440px] mr-[380px]",
                )}
              >
                {displayMode === "list" ? (
                  <span>list</span>
                ) : (
                  <span>kanban</span>
                )}
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
