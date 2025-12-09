import { AnimatePresence, motion } from "motion/react";

import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

interface RightSidebarTriggerProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  open?: boolean;
}

export function RightSidebarTrigger({
  onClick,
  open = false,
}: RightSidebarTriggerProps) {
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          className="fill-[oklch(0.4734 0.0026 283.5)] dark:fill-neutral-300"
          aria-hidden="true"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M4.25 2A3.25 3.25 0 0 0 1 5.25v5.5A3.25 3.25 0 0 0 4.25 14h7.5A3.25 3.25 0 0 0 15 10.75v-5.5A3.25 3.25 0 0 0 11.75 2zM2.5 10.5a2 2 0 0 0 2 2h7.25a1.75 1.75 0 0 0 1.75-1.75v-5.5a1.75 1.75 0 0 0-1.75-1.75H4.5a2 2 0 0 0-2 2z"
            clipRule="evenodd"
          />
          <path d="M9 3h1.5v10H9z" />
        </svg>
        <AnimatePresence mode="popLayout">
          {open && (
            <motion.div
              key="overlay"
              className="absolute top-0 left-0 overflow-hidden"
              initial={{ x: 16 }}
              animate={{ x: 0 }}
              exit={{ x: 16 }}
              transition={{
                ease: [0.165, 0.84, 0.44, 1],
                duration: 0.15,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <rect
                  x="10"
                  y="3"
                  width="4"
                  height="10"
                  className="fill-[oklch(0.4734 0.0026 283.5)] dark:fill-neutral-300"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
