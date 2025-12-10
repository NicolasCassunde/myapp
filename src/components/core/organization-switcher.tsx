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
import { useAllOrganizations } from "@/data/live-queries/all-organizations";
import { Route } from "@/routes/$org/team/$team/route";
import { useActiveOrgAndTeam } from "@/data/live-queries/currentOrganization";

export function OrganizationSwitcher({ userId }: { userId: string }) {
  const [open, setOpen] = React.useState(false);
  const { org, team } = Route.useParams();
  const navigate = useNavigate();
  const { data: organizations } = useAllOrganizations({
    userId,
  });

  const { data: activeOrgAndTeam, isLoading: isLoadingOrganization } =
    useActiveOrgAndTeam({
      organizationSlug: org,
      teamKey: team,
      userId: userId,
    });

  if (isLoadingOrganization) return <div>Loading...</div>;

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
                  {activeOrgAndTeam[0].activeOrganization?.name
                    .charAt(0)
                    .toUpperCase()}
                </div>
                <span className="truncate text-sm font-medium text-foreground">
                  {activeOrgAndTeam[0].activeOrganization?.name}
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
                    {organizations?.map((orgItem) => (
                      <DropdownMenuItem
                        key={orgItem.workspace?.id}
                        onSelect={() => {
                          const urlKey = orgItem.workspace?.url_key;
                          if (!urlKey) return;

                          const team = urlKey.slice(0, 3).toUpperCase();

                          navigate({
                            to: "/$org/team/$team",
                            params: {
                              org: orgItem.workspace!.slug,
                              team,
                            },
                          });
                        }}
                      >
                        <span className="truncate">
                          {orgItem.workspace?.name}
                        </span>
                      </DropdownMenuItem>
                    ))}

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
