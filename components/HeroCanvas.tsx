"use client";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useScroll, Environment, Float } from "@react-three/drei";
import { TronFloor } from "./TronFloor";
import { OctaReveal } from "./OctaReveal";

function Scene() {
  const sc = useScroll();
  const scroll = () => sc.offset; // 0..1

  return (
    <>
      {/* environment */}
      <color attach="background" args={["#0a0c12"]} />
      <fog attach="fog" args={["#0a0c12", 6, 22]} />
      <hemisphereLight intensity={0.6} color={"#bdf6ff"} groundColor={"#0b1020"} />
      <directionalLight position={[3, 6, 2]} intensity={1.4} />
      <Environment preset="city" />

      <TronFloor size={36} />
      <Float floatIntensity={1.2} speed={1.2}>
        <OctaReveal scroll={scroll} />
      </Float>
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="relative h-[90svh] w-full">
      <Canvas camera={{ position: [0, 1.2, 6], fov: 56 }}>
        <ScrollControls pages={2.2} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>

      {/* CTA overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-28 z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="neon text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
          Step into the <span className="text-[var(--brand-warm)]">Corg-verse</span>
        </h2>
        <p className="mt-3 text-[var(--brand-ink)]/80">
          Scroll to crack the vault and reveal the work. WASD vibes optional. 🕹️
        </p>
      </div>

      {/* subtle gradient top/bottom to blend */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-bg)] to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--brand-bg)] to-transparent"></div>
    </div>
  );
}
