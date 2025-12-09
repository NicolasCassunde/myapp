import { LayoutGrid, LayoutList, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface HeaderActionsProps {
  displayMode: "kanban" | "list";
  setDisplayMode: (mode: "kanban" | "list") => void;
}

export function HeaderActions({
  displayMode,
  setDisplayMode,
}: HeaderActionsProps) {
  const handleViewChange = (mode: "kanban" | "list") => {
    setDisplayMode(mode);
  };

  return (
    <header className="flex pl-2 pr-5 shrink-0 py-2 items-center gap-2 border-b-[0.5px] border-border">
      <Button size="sm" variant="ghost" className="flex   items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="13"
          fill="none"
          viewBox="0 0 12 13"
        >
          <path
            stroke="currentColor"
            d="M1.91.75h7.67c.64 0 1.16.52 1.16 1.16v1.28c0 .47-.29 1.05-.58 1.34l-2.5 2.21c-.35.29-.58.87-.58 1.34v2.5c0 .35-.23.81-.52.99l-.81.51c-.76.47-1.8-.06-1.8-.99V8.01c0-.41-.23-.93-.47-1.22L1.27 4.46C.98 4.18.75 3.65.75 3.3V1.97c0-.7.52-1.22 1.16-1.22Z"
          />
        </svg>
        Filters
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative ml-auto" size="sm" variant="ghost">
            <SlidersHorizontal className="size-4 mr-1" />
            Display
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48 flex p-2 gap-2" align="end">
          {/* List */}
          <DropdownMenuItem
            onClick={() => handleViewChange("list")}
            className={cn(
              "w-full text-xs border border-accent flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer",
              displayMode === "list" ? "bg-accent" : "",
            )}
          >
            <LayoutList className="size-4" />
            List
          </DropdownMenuItem>

          {/* Kanban */}
          <DropdownMenuItem
            onClick={() => handleViewChange("kanban")}
            className={cn(
              "w-full text-xs border border-accent flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer",
              displayMode === "kanban" ? "bg-accent" : "",
            )}
          >
            <LayoutGrid className="size-4" />
            Kanban
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
