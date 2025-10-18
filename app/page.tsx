"use client";
import HeroHeader from "@/components/HeroHeader";
import FloppyCarousel from "@/components/FloppyCarousel";
import dynamic from "next/dynamic";
import "./../styles/brand.css";

const CorgVerseConsole = dynamic(() => import("@/components/CorgVerseConsole"), { ssr: false });

const projects = [
  { id: "neon-studio", title: "Neon Studio", img: "/previews/neon-studio.jpg" },
  { id: "xr-landing", title: "XR Landing", img: "/previews/xr-landing.jpg" },
  { id: "gummy-brand", title: "Gummy Brand", img: "/previews/gummy-brand.jpg" },
  // ...plug your real ones
];

export default function Page() {
  return (
    <main>
      <HeroHeader />
      <div className="pt-8">
        <FloppyCarousel />

        {/* Spacer before Corg-verse Console */}
        <div className="h-[8svh]" />

        <CorgVerseConsole projects={projects} />

        {/* Footer below */}
        <footer className="mx-auto mt-16 w-full max-w-7xl px-6 py-12 text-[var(--brand-muted)]">
          © {new Date().getFullYear()} Hayden • Corg-folio
        </footer>
      </div>
    </main>
  );
}