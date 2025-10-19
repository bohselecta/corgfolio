"use client";
import Link from "next/link";
import Image from "next/image";
import { SplashCursor } from "@/components/SplashCursor";

export default function SplashPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <SplashCursor />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Logo and Title */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo-corgfolio.png"
              alt="Corgfolio Logo"
              width={120}
              height={120}
              className="mr-4"
            />
            <div>
              <h1 className="text-6xl font-bold text-white mb-2">Corgfolio</h1>
              <p className="text-xl text-slate-400">Choose Your Experience</p>
            </div>
          </div>
        </div>

        {/* Dual Entry Points */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Fun Site (Corgfolio) */}
          <Link 
            href="/corgfolio"
            className="group relative bg-gradient-to-br from-cyan-900/20 to-purple-900/20 backdrop-blur-sm rounded-2xl border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Preview Image at Top */}
            <div className="relative z-10 mb-6 w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/previews/neon-studio.jpg"
                alt="Fun site preview"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Fun Site</h2>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Experience the 3D floppy disk carousel, interactive animations, and playful design. 
                Perfect for showcasing creativity and technical skills in an engaging way.
              </p>
              
              <div className="flex items-center text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
                Enter the Corg-verse →
              </div>
            </div>
          </Link>

          {/* Serious Site (Portfolio) */}
          <Link 
            href="/portfolio"
            className="group relative bg-gradient-to-br from-slate-800/20 to-slate-700/20 backdrop-blur-sm rounded-2xl border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-500/20 p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Preview Image at Top */}
            <div className="relative z-10 mb-6 w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/previews/xr-landing.jpg"
                alt="Professional site preview"
                width={400}
                height={225}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Professional</h2>
              </div>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                Clean, professional portfolio showcasing projects, skills, and experience. 
                Designed for recruiters, clients, and professional networking.
              </p>
              
              <div className="flex items-center text-slate-400 font-medium group-hover:text-slate-300 transition-colors">
                View Portfolio →
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <p className="text-slate-500 text-sm">
            Both sites share the same project data • Updated via unified dashboard
          </p>
          <div className="flex items-center justify-center mt-4 space-x-6 text-slate-600">
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