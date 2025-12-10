// routes/$org/team/$team/index.tsx
import { AppSidebar } from "@/components/core/app-sidebar";
import { HeaderActions } from "@/components/core/header-actions";
import { HeaderBreadcrumb } from "@/components/core/header-breadcrumb";
import { KanbanView } from "@/components/core/kanban-view";
import { ListView } from "@/components/core/list-view";
import { RightSidebarContent } from "@/components/core/right-sidebar-content";
import { getSessionFn } from "@/data/getSessionFn";
import { useColumnsByTeamSlug } from "@/data/live-queries/list-columns";
import { useTasksByTeamSlug } from "@/data/live-queries/list-tasks";

import { useTeamPage } from "@/data/live-queries/organization";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/$org/team/$team/")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const session = await getSessionFn();
    return { session };
  },
});

type DisplayMode = "kanban" | "list";

function RouteComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("list");
  const { org, team } = Route.useParams();
  const { session } = Route.useRouteContext();

  const { data, isLoading, isError } = useTeamPage({
    workspaceSlug: org,
    teamKey: team,
    userId: session.session.userId,
  });

  const { data: tasksData, isLoading: tasksIsLoading } = useTasksByTeamSlug({
    teamSlug: team,
  });

  const { data: columnsData, isLoading: columnsIsLoading } =
    useColumnsByTeamSlug({
      teamSlug: team,
    });

  if (columnsIsLoading) {
    return <div>Columns tasks data...</div>;
  }

  if (tasksIsLoading) {
    return <div>Loading tasks data...</div>;
  }

  if (isError) {
    return <div>Error loading team data</div>;
  }

  if (isLoading) {
    return <div>Loading team data...</div>;
  }

  return (
    <>
      <AppSidebar userId={session.session.userId} />
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
                {displayMode === "list" ? (
                  <ListView columns={columnsData} tasks={tasksData} />
                ) : (
                  <KanbanView columns={columnsData} tasks={tasksData} />
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
