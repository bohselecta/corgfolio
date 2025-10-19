import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CardProps = {
  badge?: React.ReactNode;           // e.g., emoji or icon + label
  title: string;
  description: string;
  href: string;
  cta: string;
  image: { src: string; alt: string };
  variant?: "fun" | "pro";
  className?: string;
};

export default function Card({
  badge,
  title,
  description,
  href,
  cta,
  image,
  variant = "fun",
  className
}: CardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block rounded-3xl p-5 sm:p-6 md:p-7",
        // glass
        "bg-white/7 dark:bg-white/7 backdrop-blur-xl",
        // borders & depth
        "border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        // gradient ring on hover/focus for brand-y pop
        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70 focus-visible:ring-offset-transparent",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)]",
        "before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none",
        // soft inner light
        "after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300",
        variant === "fun"
          ? "after:bg-[radial-gradient(80%_60%_at_10%_10%,rgba(255,200,130,.18),transparent_60%),radial-gradient(80%_60%_at_90%_20%,rgba(120,220,255,.16),transparent_60%)]"
          : "after:bg-[radial-gradient(80%_60%_at_15%_10%,rgba(200,220,255,.14),transparent_60%),radial-gradient(80%_60%_at_85%_20%,rgba(180,255,210,.12),transparent_60%)]",
        className
      )}
    >
      {/* top preview image */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/20">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={720}
          priority
          className="aspect-[16/9] w-full object-cover opacity-95 transition-[filter,transform,opacity] duration-500 group-hover:opacity-100 group-hover:saturate-125 group-hover:scale-[1.01]"
        />
        {/* soft gradient to improve text legibility below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
      </div>

      {/* content */}
      <div className="mt-5 md:mt-6">
        {badge ? (
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90 ring-1 ring-white/20">
            {badge}
          </div>
        ) : null}

        <h3 className="mt-3 text-2xl/tight font-semibold tracking-[-0.01em] text-white">
          {title}
        </h3>

        <p className="mt-2 text-base text-white/80">
          {description}
        </p>

        <span
          className={cn(
            "mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
            "bg-white/12 text-white ring-1 ring-white/20",
            "group-hover:bg-white/18"
          )}
          aria-hidden
        >
          {cta} <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M7 5l6 5-6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}
