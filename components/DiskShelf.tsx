"use client";
import { FloppyDisk } from "./FloppyDisk";

export function DiskShelf({
  projects,
  onInsert
}: {
  projects: { id: string; title: string }[];
  onInsert: (id: string) => void;
}) {
  console.log('DiskShelf rendering with', projects.length, 'projects:', projects.map(p => p.title));
  
  return (
    <div className="mt-4 overflow-x-auto pb-2">
      <ul className="flex snap-x snap-mandatory gap-2 sm:gap-4 px-1 w-full">
        {projects.map((p, i) => (
          <li key={p.id} className="snap-start flex-shrink-0">
            <FloppyDisk title={p.title} onInsert={() => onInsert(p.id)} tabIndex={i === 0 ? 0 : -1} diskNumber={i + 1} />
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-white/60">Tip: scroll sideways or use trackpad to browse disks.</p>
    </div>
  );
}
