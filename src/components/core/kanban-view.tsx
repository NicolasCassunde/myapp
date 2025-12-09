import { Ellipsis, PlusIcon } from "lucide-react";
import {
  ClosedIcon,
  CompletedIcon,
  InProgressIcon,
  PendingIcon,
  PlannedIcon,
  ReviewingIcon,
} from "./icons";
import { P } from "./typography";
import { Button } from "../ui/button";

const items = [
  {
    Category: "To Do",
    icon: PendingIcon,
    iconColor: "var(--color-red-500)",
    Items: [
      {
        id: 1,
        title: "Fix login button alignment",
        description:
          "The login button on mobile view is slightly misaligned and needs adjustment",
      },
      {
        id: 2,
        title: "Update API documentation",
        description: "Add examples for the new authentication endpoints",
      },
      {
        id: 3,
        title: "Design new landing page",
        description:
          "Create mockups for the redesigned homepage with modern aesthetics",
      },
      {
        id: 4,
        title: "Research competitor features",
        description:
          "Analyze top 5 competitors and document their key features",
      },
      {
        id: 5,
        title: "Research competitor features",
        description:
          "Analyze top 5 competitors and document their key features",
      },
      {
        id: 6,
        title: "Research competitor features",
        description:
          "Analyze top 5 competitors and document their key features",
      },
      {
        id: 7,
        title: "Research competitor features",
        description:
          "Analyze top 5 competitors and document their key features",
      },
      {
        id: 8,
        title: "Research competitor features",
        description:
          "Analyze top 5 competitors and document their key features",
      },
    ],
  },
  {
    Category: "Planned",
    icon: PlannedIcon,
    iconColor: "var(--color-blue-500)",
    Items: [
      {
        id: 5,
        title: "Implement dark mode toggle",
        description:
          "Add system preference detection and manual toggle in settings",
      },
      {
        id: 6,
        title: "Setup CI/CD pipeline",
        description: "Configure automated testing and deployment workflows",
      },
      {
        id: 7,
        title: "Create user onboarding flow",
        description: "Design and implement step-by-step tutorial for new users",
      },
    ],
  },
  {
    Category: "Reviewing",
    icon: ReviewingIcon,
    iconColor: "var(--color-yellow-500)",
    Items: [
      {
        id: 8,
        title: "Database migration script",
        description:
          "Review changes to user table schema and test rollback procedures",
      },
      {
        id: 9,
        title: "Performance optimization PR",
        description: "Code review for lazy loading implementation in dashboard",
      },
      {
        id: 10,
        title: "Accessibility audit report",
        description:
          "Check WCAG compliance and keyboard navigation improvements",
      },
    ],
  },
  {
    Category: "In Progress",
    icon: InProgressIcon,
    iconColor: "var(--color-purple-500)",
    Items: [
      {
        id: 11,
        title: "Integrate payment gateway",
        description: "Implementing Stripe checkout flow with webhook handlers",
      },
      {
        id: 12,
        title: "Build analytics dashboard",
        description: "Creating real-time charts for user engagement metrics",
      },
      {
        id: 13,
        title: "Refactor authentication module",
        description: "Migrating from JWT to session-based auth system",
      },
      {
        id: 14,
        title: "Write unit tests for API",
        description: "Coverage for all user management endpoints",
      },
    ],
  },
  {
    Category: "Completed",
    icon: CompletedIcon,
    iconColor: "var(--color-orange-500)",
    Items: [
      {
        id: 15,
        title: "Deploy staging environment",
        description: "Successfully deployed v2.1.0 to staging server",
      },
      {
        id: 16,
        title: "Fix memory leak in worker",
        description: "Resolved issue causing worker process crashes",
      },
      {
        id: 17,
        title: "Update dependencies",
        description: "Upgraded all packages to latest stable versions",
      },
    ],
  },
  {
    Category: "Closed",
    icon: ClosedIcon,
    iconColor: "var(--color-green-500)",
    Items: [
      {
        id: 18,
        title: "Launch beta program",
        description: "Beta successfully launched with 100+ early adopters",
      },
      {
        id: 19,
        title: "Conduct user interviews",
        description: "Completed 15 interviews and synthesized feedback",
      },
      {
        id: 20,
        title: "Security audit",
        description: "Third-party audit completed with no critical issues",
      },
    ],
  },
];

export function KanbanView() {
  return (
    <div className="flex gap-4 h-full">
      {items.map((category, categoryIndex) => {
        const Icon = category.icon;

        return (
          <div
            key={categoryIndex}
            className="flex flex-col min-w-[280px] max-w-[320px] shrink-0"
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-3">
              <Button size="sm" variant="ghost" className="flex items-center ">
                <Icon style={{ color: category.iconColor }} />
                <P className="font-medium">{category.Category}</P>
                <span className="text-xs text-muted-foreground">
                  ({category.Items.length})
                </span>
              </Button>
              <Button size="icon-sm" variant="ghost">
                <PlusIcon />
              </Button>
            </div>

            {/* Items Column - Scrollable */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-1">
              {category.Items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between border border-border/60 bg-background rounded-xl px-3 py-2 hover:border-border transition-colors cursor-pointer"
                >
                  <div className="flex flex-col gap-4 ">
                    <Button size={"sm"} variant={"ghost"} className="w-fit">
                      <Icon style={{ color: category.iconColor }} />

                      <P className="text-sm font-medium truncate">
                        {item.title}
                      </P>
                    </Button>
                    <P className="text-sm ml-2 text-accent-foreground">
                      {item.description}
                    </P>
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
