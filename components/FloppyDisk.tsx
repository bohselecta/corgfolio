"use client";
import { motion } from "framer-motion";

export function FloppyDisk({
  title,
  onInsert,
  tabIndex = 0,
  diskNumber = 1
}: {
  title: string;
  onInsert: () => void;
  tabIndex?: number;
  diskNumber?: number;
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
          src={`/disk${diskNumber}.svg`} 
          alt={`Floppy Disk ${diskNumber}`} 
          className="h-full w-full object-contain"
        />
        
        {/* Text Label Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* White label background */}
            <div className="absolute inset-0 -top-8 left-1/2 -translate-x-1/2 w-20 h-6 bg-white rounded-sm opacity-90" />
            {/* Text */}
            <span className="relative text-[10px] font-medium text-gray-800 text-center leading-tight px-1">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Neon edge on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-lg ring-0 ring-cyan-400/0 transition group-hover:ring-2 group-hover:ring-cyan-400/50" />
    </motion.button>
  );
}
