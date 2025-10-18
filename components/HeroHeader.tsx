"use client";
import Image from "next/image";

export default function HeroHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 bg-[var(--brand-bg)]/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3">
        {/* VR Corgi badge — drop your generated PNG/SVG in /public/logo-corgfolio.png */}
        <Image
          src="/logo-corgfolio.png" /* replace with your exported logo */
          alt="Hayden's Corg-folio"
          width={80}
          height={80}
          className="badge-pop"
          priority
        />
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white neon">
            Hayden&apos;s <span className="text-[var(--brand-warm)]">Corg-folio</span>
          </h1>
          <p className="text-sm text-[var(--brand-muted)]">Designer • Builder • Arcade-grade pixels</p>
        </div>
      </div>

      <nav className="hidden gap-6 md:flex">
        <a className="text-sm text-[var(--brand-ink)]/80 hover:text-white" href="#corg-verse-console">Projects</a>
        <a className="text-sm text-[var(--brand-ink)]/80 hover:text-white" href="#about">About</a>
        <a className="text-sm text-[var(--brand-ink)]/80 hover:text-white" href="/resume.html">Resume</a>
        <a className="text-sm text-[var(--brand-ink)]/80 hover:text-white" href="#contact">Contact</a>
      </nav>
    </header>
  );
}
