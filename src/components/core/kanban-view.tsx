import { Ellipsis, PlusIcon } from "lucide-react";
import {
  ClosedIcon,
  CompletedIcon,
  InProgressIcon,
  PendingIcon,
  PlannedIcon,
  ReviewingIcon,
} from "./icons";
import { P } from "../ui/typography";
import { Button } from "../ui/button";
import { useColumnsByTeamSlug } from "@/data/live-queries/list-columns";
import { useTasksByTeamSlug } from "@/data/live-queries/list-tasks";

const columnIcons: Record<string, React.ElementType> = {
  backlog: PendingIcon,
  unstarted: PlannedIcon,
  started: InProgressIcon,
  completed: CompletedIcon,
  closed: ClosedIcon,
};

type ColumnsType = NonNullable<ReturnType<typeof useColumnsByTeamSlug>["data"]>;
type TasksType = NonNullable<ReturnType<typeof useTasksByTeamSlug>["data"]>;

interface KanbanViewProps {
  columns: ColumnsType;
  tasks: TasksType;
}

export function KanbanView({ columns, tasks }: KanbanViewProps) {
  return (
    <div className="flex gap-4 h-full">
      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.column_id === column.id,
        );

        // pega o ícone baseado no tipo da coluna
        const Icon =
          (column.type &&
            columnIcons[column.type as keyof typeof columnIcons]) ||
          PendingIcon;

        return (
          <div
            key={column.id}
            className="flex flex-col min-w-[280px] max-w-[320px] shrink-0"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-3">
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-1"
              >
                <Icon style={{ color: column.color || "inherit" }} />
                <P className="font-medium">{column.name}</P>
                <span className="text-xs text-muted-foreground">
                  ({columnTasks.length})
                </span>
              </Button>
              <Button size="icon-sm" variant="ghost">
                <PlusIcon />
              </Button>
            </div>

            {/* Tasks Column */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-1">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between border border-border/60 bg-background rounded-xl px-3 py-2 hover:border-border transition-colors cursor-pointer"
                >
                  <div className="flex flex-col gap-2">
                    <P className="text-sm font-medium">{task.title}</P>
                    {task.description && (
                      <P className="text-sm text-accent-foreground truncate max-w-[20ch]">
                        {task.description}
                      </P>
                    )}
                  </div>

                  <Button size="icon-sm" variant="ghost">
                    <Ellipsis />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
