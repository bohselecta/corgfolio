"use client";
import HeroHeader from "@/components/HeroHeader";
import FloppyCarousel from "@/components/FloppyCarousel";
import dynamic from "next/dynamic";
import "./../../styles/brand.css";

const CorgVerseConsole = dynamic(() => import("@/components/CorgVerseConsole"), { ssr: false });
const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });

// Simple projects array for now to avoid import issues
const projects = [
  { id: "1", title: "Tablature", img: "/previews/tablature.jpg" },
  { id: "2", title: "Mr Deep Seeks", img: "/previews/mrdeepseeks.jpg" },
  { id: "3", title: "Wove", img: "/previews/wove.jpg" },
  { id: "4", title: "Luvler", img: "/previews/luvler.jpg" },
  { id: "5", title: "Schema", img: "/previews/schema.jpg" },
  { id: "6", title: "Etifyd Demo", img: "/previews/etifyd.jpg" },
  { id: "7", title: "MechaCrew", img: "/previews/mechacrew.jpg" },
  { id: "8", title: "Glyphos", img: "/previews/glyphos.jpg" },
  { id: "9", title: "Labs for America", img: "/previews/labs-for-america.jpg" }
];

export default function CorgfolioPage() {
  return (
    <main>
      <HeroHeader />
      <div className="pt-8">
        <FloppyCarousel />

        {/* Spacer before Corg-verse Console */}
        <div className="h-[8svh]" />

        <CorgVerseConsole projects={projects} />

        {/* Footer below */}
        <SiteFooter />
      </div>
    </main>
  );
}
