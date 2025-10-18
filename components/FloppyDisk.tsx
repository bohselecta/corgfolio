"use client";
import { motion } from "framer-motion";

export function FloppyDisk({
  title,
  onInsert,
  tabIndex = 0
}: {
  title: string;
  onInsert: () => void;
  tabIndex?: number;
}) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      onClick={onInsert}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onInsert()}
      tabIndex={tabIndex}
      className="group relative h-36 w-28 shrink-0 cursor-pointer select-none p-1 outline-none focus:ring-2 focus:ring-cyan-300"
      aria-label={`Insert disk: ${title}`}
    >
      {/* Shell */}
      <div className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/floppy-disk.svg" 
          alt="Floppy Disk" 
          className="h-full w-full object-contain"
        />
      </div>
      {/* Label text */}
      <div className="pointer-events-none absolute inset-x-2 top-4 bottom-[80px] flex items-center justify-center rounded-md px-1 text-center text-[10px] font-bold leading-tight text-[#0a0c12]">
        {title}
      </div>

      {/* Neon edge on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-cyan-400/0 transition group-hover:ring-2 group-hover:ring-cyan-400/50" />
    </motion.button>
  );
}
