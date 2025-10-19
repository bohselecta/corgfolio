"use client";
import HeroHeader from "@/components/HeroHeader";
import dynamic from "next/dynamic";
import "./../../styles/brand.css";

const CorgVerseConsole = dynamic(() => import("@/components/CorgVerseConsole"), { ssr: false });
const SiteFooter = dynamic(() => import("@/components/SiteFooter"), { ssr: false });

// Simple projects array for now to avoid import issues
const projects = [
  { id: "neon-studio", title: "Neon Studio", img: "/screenshots/screenshot1.jpg" },
  { id: "xr-landing", title: "XR Landing", img: "/screenshots/screenshot2.jpg" },
  { id: "gummy-brand", title: "Gummy Brand", img: "/screenshots/screenshot3.jpg" },
  { id: "ai-chat", title: "AI Chat Interface", img: "/screenshots/screenshot4.jpg" },
  { id: "data-viz", title: "Data Visualization", img: "/screenshots/screenshot5.jpg" },
  { id: "mobile-app", title: "Mobile App Design", img: "/screenshots/screenshot6.jpg" },
  { id: "web-platform", title: "Web Platform", img: "/screenshots/screenshot7.jpg" },
  { id: "creative-tools", title: "Creative Tools", img: "/screenshots/screenshot8.jpg" },
  { id: "portfolio-site", title: "Portfolio Site", img: "/screenshots/screenshot9.jpg" }
];

export default function CorgfolioPage() {
  return (
    <main>
      <HeroHeader />
      <div className="pt-8">
        {/* <FloppyCarousel /> */}

        {/* Spacer before Corg-verse Console */}
        <div className="h-[8svh]" />

        <CorgVerseConsole projects={projects} />

        {/* Footer below */}
        <SiteFooter />
      </div>
    </main>
  );
}
