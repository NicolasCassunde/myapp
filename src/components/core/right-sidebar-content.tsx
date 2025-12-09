import { motion } from "motion/react";

export function RightSidebarContent() {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ ease: [0.165, 0.84, 0.44, 1], duration: 0.15 }}
      className="absolute inset-y-0 right-0  w-[380px] md:w-[440px] border-l-[0.5px] border-l-border bg-sidebar overflow-hidden"
    >
      <div className="p-4">
        <h2 className="font-bold mb-4">Details</h2>
        <p>Conteúdo da sidebar aqui...</p>
      </div>
    </motion.div>
  );
}
