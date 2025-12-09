import {
  Calendar,
  Home,
  Inbox,
  InboxIcon,
  PlusIcon,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// import { ModeToggle } from "./theme-toggle";
// import { Logo } from "./logo";
// import { H1, H2, H3, P } from "./typography";

import { OrganizationSwitcher } from "./organization-switcher";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { isMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="group flex-row flex items-center justify-between border-b">
        <OrganizationSwitcher />
        {!isMobile && <SidebarTrigger className="" />}
      </SidebarHeader>
      <SidebarContent>
        {/*<SidebarMenu className="px-2 mt-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <InboxIcon />
                <span>My Issues</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>*/}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>Teams</SidebarGroupLabel>
            {/*<CreateTeam />*/}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/*<SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
            <div className="w-full h-52 rounded-2xl bg-accent/20 border-[0.5px] relative overflow-hidden p-2">
              <H3>Free Trial</H3>
              <P className="leading-[125%] mt-2 text-accent-foreground">
                Unlimited workspaces <br />
              </P>
              <Button className="rounded-full mt-4 dark:text-white font-bold ">
                Try now
              </Button>

              <Logo
                variant="purple"
                className="size-38 -rotate-15 -left-14 -bottom-14 absolute z-10"
              />

              <Logo className="size-40 scale-x-[-1] right-0 -bottom-11 absolute z-10" />

              <Logo
                variant="orange"
                className="size-38 rotate-5 scale-x-[-1] -right-9 bottom-3 absolute z-5"
              />

              <Logo
                variant="green"
                className="size-30 scale-x-[-1] -right-9 bottom-25 absolute z-4"
              />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>*/}
    </Sidebar>
  );
}
