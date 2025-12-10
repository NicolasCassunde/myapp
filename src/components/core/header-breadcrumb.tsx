import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Button, buttonVariants } from "../ui/button";
import { RightSidebarTrigger } from "./right-sidebar-trigger";
import { ModeToggle } from "../ui/mode-toggle";

interface HeaderBreadcrumbProps {
  showRightItems?: boolean;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

export function HeaderBreadcrumb({
  showRightItems = true,
  isSidebarOpen = false,
  setIsSidebarOpen,
}: HeaderBreadcrumbProps) {
  const { open: sidebarOpen, isMobile } = useSidebar();

  return (
    <header
      className={cn(
        "flex  h-[49px] shrink-0 items-center gap-2 border-b-[0.5px] border-b-border",
        sidebarOpen ? "pl-2" : "pl-3",
      )}
    >
      <div className="flex justify-between items-center">
        {(!sidebarOpen || isMobile) && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                )}
              >
                <p className="truncate max-w-20 sm:max-w-full">Nicolas</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                )}
              >
                <p className="truncate max-w-20 sm:max-w-full">team</p>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {showRightItems && (
        <div className="ml-auto pr-5 flex items-center gap-2">
          <Button size={"sm"} variant={"ghost"}>
            Invite
          </Button>
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <RightSidebarTrigger
            open={isSidebarOpen}
            onClick={() => setIsSidebarOpen?.(!isSidebarOpen)}
          />
          <ModeToggle />
        </div>
      )}
    </header>
  );
}
