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
      className="group relative h-36 w-28 shrink-0 cursor-pointer select-none rounded-md border border-white/10 bg-gradient-to-b from-[#141b2a] to-[#0d131f] p-2 outline-none focus:ring-2 focus:ring-cyan-300"
      aria-label={`Insert disk: ${title}`}
    >
      {/* Shell */}
      <svg viewBox="0 0 112 144" className="h-full w-full">
        {/* body */}
        <rect x="6" y="6" width="100" height="132" rx="8" fill="#0e1624" stroke="#1a2639" strokeWidth="3" />
        {/* shutter */}
        <rect x="16" y="18" width="80" height="22" rx="4" fill="#2a3346" />
        {/* window */}
        <rect x="16" y="46" width="80" height="28" rx="4" fill="#101524" stroke="#223147" strokeWidth="2" />
        {/* label */}
        <rect x="16" y="80" width="80" height="42" rx="6" fill="#fff3e6" />
      </svg>
      {/* Label text */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 top-[74px] flex items-center justify-center rounded-md px-2 text-center text-[11px] font-bold leading-tight text-[#0a0c12]">
        {title}
      </div>

      {/* Neon edge on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-cyan-400/0 transition group-hover:ring-2 group-hover:ring-cyan-400/50" />
    </motion.button>
  );
}
