"use client";
import { FloppyDisk } from "./FloppyDisk";

export function DiskShelf({
  projects,
  onInsert
}: {
  projects: { id: string; title: string }[];
  onInsert: (id: string) => void;
}) {
  return (
    <div className="mt-4 overflow-x-auto pb-2">
      <ul className="flex snap-x snap-mandatory gap-4 px-1">
        {projects.map((p, i) => (
          <li key={p.id} className="snap-start">
            <FloppyDisk title={p.title} onInsert={() => onInsert(p.id)} tabIndex={i === 0 ? 0 : -1} />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-white/60">Tip: scroll sideways or use trackpad to browse disks.</p>
    </div>
  );
}
