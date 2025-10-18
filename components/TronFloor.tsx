"use client";
import * as THREE from "three";
import { useMemo } from "react";

export function TronFloor({ size = 40 }: { size?: number }) {
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(size, size, 0x22d3ee, 0x22d3ee); // Same cyan as logo glow
    (g.material as THREE.Material).opacity = 0.308; // Increased by 40% (0.22 * 1.4)
    (g.material as THREE.Material).transparent = true;
    (g.material as THREE.Material).depthWrite = false;
    return g;
  }, [size]);

  return (
    <primitive object={grid} rotation={[0, 0, 0]} position={[0, -1.2, 0]} />
  );
}
