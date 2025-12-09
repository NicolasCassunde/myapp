"use client";

import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Plus,
  Settings,
  CheckIcon,
  LogOut,
  ArrowLeftRight,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function OrganizationSwitcher() {
  const [open, setOpen] = React.useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className={cn(
                "group w-fit rounded-lg px-2 py-1.5 transition-colors",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="flex size-5 items-center justify-center rounded-md bg-accent text-xs font-semibold text-muted-foreground">
                  N
                </div>
                <span className="truncate text-sm font-medium text-foreground">
                  Nicolas
                </span>
              </div>

              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="size-4 text-muted-foreground" />
              </motion.div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 size-4 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4 text-muted-foreground" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Organization</DropdownMenuLabel>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <ArrowLeftRight className="mr-2 size-4 text-muted-foreground" />
                  Switch organization
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-50">
                    <DropdownMenuItem
                      // key={org.id}
                      className={cn(
                        "flex items-center justify-between cursor-pointer",
                        // isActive && "font-medium text-primary",
                        // isNavigating && "opacity-50 cursor-wait",
                      )}
                      // disabled={isNavigating}
                      // onClick={() => handleOrgSwitch(org.slug)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent rounded-sm flex items-center mx-auto justify-center text-xs font-semibold">
                          N
                        </div>
                        <span>Nicolas</span>
                      </div>
                      {/*{isActive && (
                        <CheckIcon className="size-4 text-primary" />
                      )}*/}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                      <Plus className="mr-2 size-4 text-muted-foreground" />
                      Create new team
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut className="mr-2 size-4 text-muted-foreground" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
