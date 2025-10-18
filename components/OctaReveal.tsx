"use client";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * Scroll-scrubbed sequence:
 * s in [0..1]
 *  0.00-0.30  : Octa spins, descends from y=3 to y=0.3
 *  0.30-0.65  : Octa splits (top +y, bottom -y) exposing a flat "screen" plane
 *  0.65-1.00  : Screen scales up slightly + glow, hint to scroll
 */
export function OctaReveal({ scroll }: { scroll: () => number }) {
  const group = useRef<THREE.Group>(null!);
  const upper = useRef<THREE.Mesh>(null!);
  const lower = useRef<THREE.Mesh>(null!);
  const screen = useRef<THREE.Mesh>(null!);

  const geo = useMemo(() => new THREE.OctahedronGeometry(0.9, 0), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0a1018"),
    metalness: 0.85, roughness: 0.25,
    emissive: new THREE.Color("#1ae0ff"),
    emissiveIntensity: 0.15
  }), []);

  useFrame((state, dt) => {
    const s = scroll();
    const tSpin = THREE.MathUtils.clamp(s / 0.3, 0, 1);
    const tSplit = THREE.MathUtils.clamp((s - 0.30) / 0.35, 0, 1);
    const tGlow = THREE.MathUtils.clamp((s - 0.65) / 0.35, 0, 1);

    // group transform
    group.current.position.y = THREE.MathUtils.lerp(3, 0.3, tSpin);
    group.current.rotation.y += dt * (1.5 - tSplit); // slow as it opens

    // halves
    const sep = THREE.MathUtils.lerp(0, 0.9, tSplit);
    upper.current.position.y = sep;
    lower.current.position.y = -sep;
    // tilt a hair for drama
    upper.current.rotation.x = THREE.MathUtils.lerp(0, 0.12, tSplit);
    lower.current.rotation.x = THREE.MathUtils.lerp(0, -0.12, tSplit);

    // screen
    const sScale = THREE.MathUtils.lerp(0.0001, 1, tSplit);
    screen.current.scale.setScalar(sScale * (1 + tGlow * 0.08));
        // emissive pulse
        const e = 0.15 + tGlow * 0.6;
        // @ts-expect-error - Three.js material properties
        upper.current.material.emissiveIntensity = e * 0.6;
        // @ts-expect-error - Three.js material properties
        lower.current.material.emissiveIntensity = e * 0.6;

    // gentle hover
    const hover = Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    group.current.position.y += hover;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <mesh ref={upper} geometry={geo} material={mat} />
      <mesh ref={lower} geometry={geo} material={mat} />
      {/* reveal plane (the "screen") */}
      <mesh ref={screen} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.4, 0.9, 1, 1]} />
        <meshStandardMaterial color="#0e1624" emissive="#1ae0ff" emissiveIntensity={0.25} />
        {/* You can mount HTML into 3D if you want actual DOM preview here: */}
        <Html transform sprite distanceFactor={1.4} position={[0, 0, 0.002]} occlude>
          <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-white">
            <span className="opacity-80">Preview unlocked</span>
          </div>
        </Html>
      </mesh>
    </group>
  );
}
