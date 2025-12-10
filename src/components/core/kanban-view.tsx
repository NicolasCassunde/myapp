import { Ellipsis, PlusIcon } from "lucide-react";
import {
  ClosedIcon,
  CompletedIcon,
  InProgressIcon,
  PendingIcon,
  PlannedIcon,
} from "./icons";
import { P } from "../ui/typography";
import { Button } from "../ui/button";
import { useColumnsByTeamSlug } from "@/data/live-queries/list-columns";
import { useTasksByTeamSlug } from "@/data/live-queries/list-tasks";
import {
  DndContext,
  rectIntersection,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { useState, useMemo, useCallback } from "react";
import { taskCollection } from "@/lib/collections";

const columnIcons: Record<string, React.ElementType> = {
  backlog: PendingIcon,
  unstarted: PlannedIcon,
  started: InProgressIcon,
  completed: CompletedIcon,
  closed: ClosedIcon,
};

type ColumnsType = NonNullable<ReturnType<typeof useColumnsByTeamSlug>["data"]>;
type TasksType = NonNullable<ReturnType<typeof useTasksByTeamSlug>["data"]>;
type Task = TasksType[number];

interface KanbanViewProps {
  columns: ColumnsType;
  tasks: TasksType;
}

interface SortableTaskProps {
  task: Task;
}

const SortableTask = React.memo(function SortableTask({
  task,
}: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id! });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-start justify-between border border-border/60 bg-background rounded-xl px-3 py-2 cursor-grab active:cursor-grabbing ${
        isDragging ? "" : "hover:border-border transition-colors"
      }`}
      {...attributes}
      {...listeners}
      tabIndex={0}
      role="button"
      aria-label={`Task: ${task.title}`}
    >
      <div className="flex flex-col gap-2">
        <P className="text-sm font-medium truncate max-w-[30ch]">
          {task.title}
        </P>
        {task.description && (
          <P className="text-sm text-accent-foreground truncate max-w-[20ch]">
            {task.description}
          </P>
        )}
      </div>
      {!isDragging && (
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={(e) => e.stopPropagation()}
        >
          <Ellipsis />
        </Button>
      )}
    </div>
  );
});

const TaskItem = React.memo(function TaskItem({ task }: { task: Task }) {
  return (
    <div className="flex items-start justify-between border-2 border-primary bg-background rounded-xl px-3 py-2">
      <div className="flex flex-col gap-2">
        <P className="text-sm font-medium truncate max-w-[30ch]">
          {task.title}
        </P>
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
  );
});

const TaskList = React.memo(function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <>
      {tasks.map((task) => (
        <SortableTask key={task.id} task={task} />
      ))}
    </>
  );
});

function DroppableColumn({
  column,
  columnTasks,
}: {
  column: ColumnsType[number];
  columnTasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id! });

  const Icon =
    (column.type && columnIcons[column.type as keyof typeof columnIcons]) ||
    PendingIcon;

  return (
    <div
      ref={setNodeRef}
      id={column.id}
      className={`flex flex-col w-[380px] shrink-0 ${
        isOver ? "bg-accent/10 rounded-lg" : ""
      }`}
      role="region"
      aria-label={`${column.name} column`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-3">
        <Button size="sm" variant="ghost" className="flex items-center gap-1">
          <Icon style={{ color: column.color || "inherit" }} />
          <P className="font-medium">{column.name}</P>
          <span className="text-xs text-muted-foreground">
            ({columnTasks.length})
          </span>
        </Button>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label={`Add task to ${column.name}`}
        >
          <PlusIcon />
        </Button>
      </div>

      {/* Tasks Column */}
      <SortableContext
        items={columnTasks.map((t) => t.id!)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2 overflow-y-auto pr-1" role="list">
          <TaskList tasks={columnTasks} />
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanView({ columns, tasks }: KanbanViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const tasksByColumn = useMemo(() => {
    const map = new Map<string, Task[]>();
    columns.forEach((col) => {
      const colTasks = tasks
        .filter((t) => t.column_id === col.id)
        .sort((a, b) => (a.position || 0) - (b.position || 0));
      map.set(col.id!, colTasks);
    });
    return map;
  }, [columns, tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over || active.id === over.id) return;

      const activeTask = tasks.find((t) => t.id === active.id);
      if (!activeTask) return;

      let targetColumnId: string;
      let newPosition: number;

      const overTask = tasks.find((t) => t.id === over.id);

      if (overTask) {
        targetColumnId = overTask.column_id!;
        const allTargetTasks = tasksByColumn.get(targetColumnId) || [];
        const targetTasks = allTargetTasks.filter((t) => t.id !== active.id);

        const overIndexInFiltered = targetTasks.findIndex(
          (t) => t.id === over.id,
        );

        if (targetTasks.length === 0) {
          newPosition = 1000;
        } else if (overIndexInFiltered === -1) {
          newPosition = Math.round(
            (targetTasks[targetTasks.length - 1]?.position || 0) + 1000,
          );
        } else if (overIndexInFiltered === 0) {
          newPosition = Math.floor((targetTasks[0].position || 1000) / 2);
        } else if (overIndexInFiltered === targetTasks.length - 1) {
          newPosition = Math.round(
            (targetTasks[overIndexInFiltered].position || 0) + 1000,
          );
        } else {
          const currentPos = targetTasks[overIndexInFiltered].position || 0;
          const nextPos =
            targetTasks[overIndexInFiltered + 1]?.position || currentPos + 2000;
          newPosition = Math.round((currentPos + nextPos) / 2);
        }
      } else {
        const overColumn = columns.find((c) => c.id === over.id);
        if (!overColumn) return;

        targetColumnId = overColumn.id!;
        const targetTasks =
          tasksByColumn
            .get(targetColumnId)
            ?.filter((t) => t.id !== active.id) || [];

        if (targetTasks.length === 0) {
          newPosition = 1000;
        } else {
          newPosition = Math.round(
            (targetTasks[targetTasks.length - 1]?.position || 0) + 1000,
          );
        }
      }

      newPosition = Math.round(newPosition);

      if (
        targetColumnId !== activeTask.column_id ||
        newPosition !== (activeTask.position || 0)
      ) {
        taskCollection.update(activeTask.id!, (draft) => {
          draft.column_id = targetColumnId;
          draft.position = newPosition;
        });
      }
    },
    [tasks, tasksByColumn, columns],
  );

  const activeTask = useMemo(
    () => (activeId ? tasks.find((t) => t.id === activeId) : null),
    [activeId, tasks],
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 h-full">
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            column={column}
            columnTasks={tasksByColumn.get(column.id!) || []}
          />
        ))}
      </div>

      <DragOverlay dropAnimation={null}>
        {activeTask ? <TaskItem task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
