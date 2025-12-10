import { Ellipsis, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { P } from "../ui/typography";
import { useColumnsByTeamSlug } from "@/data/live-queries/list-columns";
import { useTasksByTeamSlug } from "@/data/live-queries/list-tasks";
import {
  PendingIcon,
  PlannedIcon,
  InProgressIcon,
  CompletedIcon,
  ClosedIcon,
} from "@/components/core/icons";

// Inferindo tipos diretamente do hook
type ColumnsType = NonNullable<ReturnType<typeof useColumnsByTeamSlug>["data"]>;
type TasksType = NonNullable<ReturnType<typeof useTasksByTeamSlug>["data"]>;

interface ListViewProps {
  columns: ColumnsType;
  tasks: TasksType;
}

// Mapeamento seguro de ícones
const columnIcons: Record<string, React.ElementType> = {
  backlog: PendingIcon,
  unstarted: PlannedIcon,
  started: InProgressIcon,
  completed: CompletedIcon,
  closed: ClosedIcon,
};

export function ListView({ columns, tasks }: ListViewProps) {
  return (
    <div className="space-y-4">
      {columns.map((column) => {
        const Icon =
          (column.type &&
            columnIcons[column.type as keyof typeof columnIcons]) ||
          PendingIcon;
        const columnTasks = tasks.filter(
          (task) => task.column_id === column.id,
        );

        return (
          <div
            key={column.id}
            className="space-y-3 border-b-[0.5px] overflow-auto"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pr-1.5">
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-1"
              >
                <Icon style={{ color: column.color || "inherit" }} />
                <P>{column.name}</P>
              </Button>

              <Button size="icon-sm" variant="ghost">
                <PlusIcon />
              </Button>
            </div>

            {/* Tasks List */}
            <div className="pl-2 space-y-1">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center p-1.5 hover:bg-accent/20 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                      <Button size="sm" variant="ghost">
                        {task.title}
                      </Button>
                    </div>

                    <Button size="icon-sm" variant="ghost">
                      <Ellipsis />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
