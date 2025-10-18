"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { DiskShelf } from "./DiskShelf";

type Project = { id: string; title: string; img: string; url?: string };

export default function CorgVerseConsole({
  projects
}: {
  projects: Project[];
}) {
  const [active, setActive] = useState<Project | null>(null);
  const byId = useMemo(() => Object.fromEntries(projects.map(p => [p.id, p])), [projects]);

  function handleInsert(id: string) {
    const proj = byId[id];
    if (!proj) return;
    // brief slot glow, then show preview
    setGlow(true);
    setTimeout(() => setActive(proj), 280);
  }

  const [glow, setGlow] = useState(false);
  useEffect(() => {
    if (!glow) return;
    const t = setTimeout(() => setGlow(false), 450);
    return () => clearTimeout(t);
  }, [glow]);

  return (
    <section id="corg-verse-console" className="mx-auto mt-24 w-full max-w-7xl px-6">
      {/* Styled header */}
      <div className="mb-8 text-center">
        <h2 className="neon text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          In the <span className="text-[var(--brand-warm)]">Corg-verse</span>, everything runs off floppies.
        </h2>
      </div>

      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Illustration with subtle parallax / scanlines overlay */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <Image
              src="/illustrations/corg-verse-crt.png"
              alt="A corgi using a floor CRT computer with a giant floppy slot — the Corg-verse console"
              width={1200}
              height={900}
              className="h-auto w-full"
              priority={false}
            />
            {/* scanlines */}
            <div className="pointer-events-none absolute inset-0 mix-blend-soft-light [background:repeating-linear-gradient(transparent_0_2px,rgba(0,0,0,.15)_2px,rgba(0,0,0,.15)_3px)]" />
            {/* slot glow */}
            <AnimatePresence>
              {glow && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  // position this bar roughly where the slot would be on your art (tweak as needed)
                  className="pointer-events-none absolute left-1/2 top-[72%] h-8 w-2/3 -translate-x-1/2 rounded-md bg-[radial-gradient(60%_180%_at_50%_50%,rgba(34,211,238,.75),rgba(255,62,165,.4)_70%,transparent_85%)] blur-md"
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Disk browser */}
        <div>
          <h3 className="text-2xl font-extrabold text-white">Disk Library</h3>
          <p className="mt-1 text-white/70">Browse the floppies. Click one to insert it into the corgi console.</p>
          <div className="mt-4">
            <DiskShelf projects={projects.map(({id,title}) => ({id,title}))} onInsert={handleInsert} />
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
              className="w-[min(92vw,960px)] rounded-2xl border border-white/15 bg-white/5 p-4 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">{active.title}</h4>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
                >
                  Close
                </button>
              </div>
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.img} alt={active.title} className="h-full w-full object-contain" />
              </div>
              <div className="mt-3 flex items-center gap-3">
                {active.url && (
                  <a
                    href={active.url}
                    target="_blank"
                    className="rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-sm text-white hover:bg-white/20"
                  >
                    Visit project ↗
                  </a>
                )}
                <span className="text-xs text-white/60">Beep boop… disk mounted.</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
