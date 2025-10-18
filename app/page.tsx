"use client";
import HeroHeader from "@/components/HeroHeader";
import FloppyCarousel from "@/components/FloppyCarousel";
import dynamic from "next/dynamic";
import "./../styles/brand.css";

const CorgVerseConsole = dynamic(() => import("@/components/CorgVerseConsole"), { ssr: false });
const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });

const projects = [
  { id: "neon-studio", title: "Neon Studio", img: "/previews/neon-studio.jpg" },
  { id: "xr-landing", title: "XR Landing", img: "/previews/xr-landing.jpg" },
  { id: "gummy-brand", title: "Gummy Brand", img: "/previews/gummy-brand.jpg" },
  { id: "ai-chat", title: "AI Chat Interface", img: "/previews/neon-studio.jpg" },
  { id: "data-viz", title: "Data Visualization", img: "/previews/xr-landing.jpg" },
  { id: "mobile-app", title: "Mobile App Design", img: "/previews/gummy-brand.jpg" },
  { id: "web-platform", title: "Web Platform", img: "/previews/neon-studio.jpg" },
  { id: "creative-tools", title: "Creative Tools", img: "/previews/xr-landing.jpg" },
  { id: "portfolio-site", title: "Portfolio Site", img: "/previews/gummy-brand.jpg" }
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
        <SiteFooter />
      </div>
    </main>
  );
}