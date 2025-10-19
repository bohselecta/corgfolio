"use client";
import Link from "next/link";
import Image from "next/image";
import { SplashCursor } from "@/components/SplashCursor";
import Card from "@/components/Card";

export default function SplashPage() {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/splash-background.jpg"
          alt="Splash background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Subtle radial gradient overlay for better text readability */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(0,0,0,0.25),transparent_60%)]" />
      </div>
      
      <SplashCursor />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <header className="pt-20 sm:pt-24 md:pt-28 text-center">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo-corgfolio.png"
              alt="Corgfolio Logo"
              width={120}
              height={120}
              className="mr-4"
            />
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">Corgfolio</h1>
              <p className="text-xl text-white/80">Choose Your Experience</p>
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 md:gap-10 pb-16">
          <Card
            variant="fun"
            badge={<><span className="text-lg">✨</span><span>Fun Site</span></>}
            title="Fun Site"
            description="Experience the 3D floppy disk carousel, playful interactions, and a creative vibe."
            href="/corgfolio"
            cta="Enter the Corg-verse"
            image={{ src: "/previews/neon-studio.jpg", alt: "Preview of fun site" }}
            className="min-h-[480px]"
          />
          <Card
            variant="pro"
            badge={<><span className="text-lg">🖥️</span><span>Professional</span></>}
            title="Professional"
            description="Clean portfolio showcasing projects, skills, and experience. Built for recruiters and clients."
            href="/portfolio"
            cta="View Portfolio"
            image={{ src: "/previews/xr-landing.jpg", alt: "Preview of professional site" }}
            className="min-h-[480px]"
          />
        </div>

        {/* Bottom Info */}
        <div className="text-center mb-10">
          <p className="text-sm text-white/70">
            Both sites share unified project data • Updated via the dashboard
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-white/60">
            <div className="flex items-center">
              <span className="mr-2">🎨</span>
              <span className="text-xs">Creative</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">💻</span>
              <span className="text-xs">Technical</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✨</span>
              <span className="text-xs">Interactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}