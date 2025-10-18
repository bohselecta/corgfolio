"use client";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { TronFloor } from "./TronFloor";

// Project data for each floppy disk
const projects = [
    { title: "PROJECT_001", description: "Web Application Design", tech: "React • Node.js • MongoDB", color: 0x00ffff, url: "https://project1.com", github: "github.com/user/project1" },
    { title: "PROJECT_002", description: "Brand Identity System", tech: "Illustrator • After Effects", color: 0xff00ff, url: "https://project2.com", github: "github.com/user/project2" },
    { title: "PROJECT_003", description: "3D Product Visualization", tech: "Blender • Three.js • WebGL", color: 0x00ff00, url: "https://project3.com", github: "github.com/user/project3" },
    { title: "PROJECT_004", description: "Motion Graphics Reel", tech: "After Effects • Cinema 4D", color: 0xffff00 },
    { title: "PROJECT_005", description: "Interactive Installation", tech: "TouchDesigner • Arduino", color: 0xff6600 },
    { title: "PROJECT_006", description: "E-commerce Platform", tech: "Vue.js • Stripe • AWS", color: 0x00ffff },
    { title: "PROJECT_007", description: "Animated Short Film", tech: "Maya • Arnold • Nuke", color: 0xff0066 },
    { title: "PROJECT_008", description: "Mobile App UI/UX", tech: "Figma • Swift • Kotlin", color: 0x6600ff },
    { title: "PROJECT_009", description: "Generative Art Series", tech: "p5.js • WebGL • GLSL", color: 0x00ff88 },
    { title: "PROJECT_010", description: "VR Experience", tech: "Unity • Oculus SDK • C#", color: 0xff8800 },
    { title: "PROJECT_011", description: "Data Visualization", tech: "D3.js • Python • Pandas", color: 0x0088ff },
    { title: "PROJECT_012", description: "Game Character Design", tech: "ZBrush • Substance Painter", color: 0xff00aa },
    { title: "PROJECT_013", description: "Typography System", tech: "Glyphs • InDesign", color: 0xaaff00 },
    { title: "PROJECT_014", description: "AR Filter Collection", tech: "Spark AR • Lens Studio", color: 0x00aaff },
    { title: "PROJECT_015", description: "Sound Visualization", tech: "Web Audio API • GLSL", color: 0xff66ff },
    { title: "PROJECT_016", description: "Particle System", tech: "GLSL • WebGL • Three.js", color: 0x66ff00 },
    { title: "PROJECT_017", description: "Corporate Website", tech: "Next.js • Tailwind • Vercel", color: 0xff6666 },
    { title: "PROJECT_018", description: "Procedural Animation", tech: "Houdini • Python • USD", color: 0x6666ff },
    { title: "PROJECT_019", description: "Real-time Shader", tech: "GLSL • ShaderToy • WebGL", color: 0x66ffff },
    { title: "PROJECT_020", description: "Portfolio Website", tech: "Three.js • GSAP • WebGL", color: 0xffff66 }
];

function createFloppyDisk(index: number) {
    const group = new THREE.Group();
    const project = projects[index];
    
    // === MAIN BODY (based on SVG proportions) ===
    // SVG shows: width=668, height=701, so aspect ratio ~0.95
    const bodyGeometry = new THREE.BoxGeometry(2.0, 2.1, 0.1, 4, 4, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xB6B19A,  // Custom beige color
        roughness: 0.8,
        metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);
    
    // === WHITE LABEL AREA (top section, like SVG) ===
    // SVG shows large white rectangle at top - reduced to 90% width
    const labelGeometry = new THREE.BoxGeometry(1.44, 1.0, 0.001); // 1.6 * 0.9 = 1.44
    const labelMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xB6B19A,  // Match disk body color
        roughness: 0.8,
        metalness: 0.1
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.set(0, 0.5, 0.051); // Top section, facing up for filing
    group.add(label);
    
    // === METAL SHUTTER (bottom section, like SVG) ===
    // SVG shows darker rectangle at bottom - reduced to 60% width, scaled vertically by 15%
    const shutterGeometry = new THREE.BoxGeometry(0.96, 0.828, 0.001); // 0.69 * 1.2 = 0.828 (20% taller)
    const shutterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xc8d1d6,  // Much lighter grey metal
        roughness: 0.2,
        metalness: 0.8
    });
    const shutter = new THREE.Mesh(shutterGeometry, shutterMaterial);
    shutter.position.set(0, -0.6, 0.051); // Bottom section
    group.add(shutter);
    
    // === SMALL RECTANGLE OVER METAL PLATE (offset to side, 1/3rd across) ===
    const smallRectGeometry = new THREE.BoxGeometry(0.2, 0.54, 0.002); // 0.45 * 1.2 = 0.54 (20% taller)
    const smallRectMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x666666,  // Darker gray for contrast
        roughness: 0.3,
        metalness: 0.6
    });
    const smallRect = new THREE.Mesh(smallRectGeometry, smallRectMaterial);
    smallRect.position.set(-0.25, -0.6, 0.052); // Moved toward center, less offset from left side
    group.add(smallRect);
    
    
    // === WRITE PROTECT NOTCH (left side, moved closer to edge and higher) ===
    const notchGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.001);
    const notchMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,  // Matches SVG notch color
        roughness: 0.9,
        metalness: 0.0
    });
    const notch = new THREE.Mesh(notchGeometry, notchMaterial);
    notch.position.set(-0.85, 0.95, 0.052); // Moved up by 2.5x previous movement (0.2 + 0.75 = 0.95)
    group.add(notch);
    
    // === HD INDICATOR (right side, moved closer to edge and higher) ===
    const hdGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.001);
    const hdMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,  // Matches SVG HD indicator color
        roughness: 0.9,
        metalness: 0.0
    });
    const hd = new THREE.Mesh(hdGeometry, hdMaterial);
    hd.position.set(0.85, 0.95, 0.052); // Moved up by 2.5x previous movement (0.2 + 0.75 = 0.95)
    group.add(hd);
    
    // === GLOWING EDGES (Tron aesthetic) ===
    const edgesGeometry = new THREE.EdgesGeometry(bodyGeometry);
    const edgesMaterial = new THREE.LineBasicMaterial({ 
        color: project?.color || 0x00ffff,
        transparent: true,
        opacity: 0.5,
        linewidth: 2
    });
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
    group.add(edges);
    
    // === CUSTOM LABEL TEXTURE (use numbered labels) ===
    const textureLoader = new THREE.TextureLoader();
    const labelTexture = textureLoader.load(`/label${index + 1}.jpg`);
    labelTexture.flipY = true; // Flip vertically
    labelTexture.anisotropy = 16;
    
    // Flip horizontally by scaling the texture matrix
    labelTexture.matrixAutoUpdate = false;
    labelTexture.matrix.setUvTransform(0, 0, -1, 1, 0, 0, 0);
    const textMaterial = new THREE.MeshBasicMaterial({ 
        map: labelTexture,
        transparent: true,
        opacity: 1
    });
    const textPlane = new THREE.PlaneGeometry(1.39, 0.95); // Adjusted to match reduced label width
    const textMesh = new THREE.Mesh(textPlane, textMaterial);
    textMesh.position.set(0, 0.5, 0.052); // Positioned on white label area
    textMesh.rotation.z = 0; // Reset rotation
    group.add(textMesh);
    
    // Store references for animation
    group.userData.textMaterial = textMaterial;
    group.userData.project = project;
    group.userData.index = index;
    group.userData.edges = edges;
    group.userData.label = label; // White label area
    
    return group;
}

function FloppyDisk({ index, scroll }: { index: number; scroll: () => number }) {
    const meshRef = useRef<THREE.Group>(null!);
    const diskGeometry = useMemo(() => createFloppyDisk(index), [index]);
    
    useFrame(() => {
        if (!meshRef.current) return;
        
        const progress = scroll();
        const targetIndex = progress * 6; // Maps to disk 0-6 for 7 disks
        const distanceFromCenter = index - targetIndex;
        const absDistance = Math.abs(distanceFromCenter);
        
        // Position
        const diskSpacing = 3.5;
        meshRef.current.position.x = distanceFromCenter * diskSpacing;
        meshRef.current.position.z = -absDistance * 0.8;
        meshRef.current.position.y = -1.5 - absDistance * 0.3; // Position below floor
        
        // Rotation
        const rotationAngle = Math.sign(distanceFromCenter) * Math.PI * 0.25 * Math.min(absDistance, 2);
        meshRef.current.rotation.y = rotationAngle;
        
        // Enhanced animation for center disk
        if (absDistance < 0.5) {
            // Center disk - scale up and enhanced effects
            meshRef.current.scale.setScalar(1.2);
            
            // Enhanced glow for center disk
            if (meshRef.current.userData.label) {
                meshRef.current.userData.label.material.emissiveIntensity = 0.5;
            }
            
            // Show text
            if (meshRef.current.userData.textMaterial) {
                meshRef.current.userData.textMaterial.opacity = 0.95;
            }
            
            // Enhanced edge glow
            if (meshRef.current.userData.edges) {
                meshRef.current.userData.edges.material.opacity = 0.9;
            }
            
            // Subtle floating animation
            const time = Date.now() * 0.001;
            meshRef.current.position.y += Math.sin(time * 2) * 0.002;
        } else {
            // Side disks - scale down and dim effects
            const scale = Math.max(0.7, 1.2 - absDistance * 0.1);
            meshRef.current.scale.setScalar(scale);
            
            // Dim label glow for side disks
            if (meshRef.current.userData.label) {
                meshRef.current.userData.label.material.emissiveIntensity = Math.max(0.1, 0.3 - absDistance * 0.1);
            }
            
            // Hide text
            if (meshRef.current.userData.textMaterial) {
                meshRef.current.userData.textMaterial.opacity = Math.max(0, 0.3 - absDistance * 0.2);
            }
            
            // Dim edge glow
            if (meshRef.current.userData.edges) {
                meshRef.current.userData.edges.material.opacity = Math.max(0.2, 0.6 - absDistance * 0.2);
            }
        }
    });
    
    return (
        <group ref={meshRef}>
            {diskGeometry && <primitive object={diskGeometry} />}
        </group>
    );
}

function InteractiveCursorOverlay() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, opacity: number, scale: number}>>([]);
    const particleIdRef = useRef(0);
    
    // Track mouse movement
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setMousePosition({ x, y });
        
        // Spawn particles when mouse moves
        if (Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1) {
            const newParticle = {
                id: particleIdRef.current++,
                x: x + (Math.random() - 0.5) * 20,
                y: y + (Math.random() - 0.5) * 20,
                opacity: 1,
                scale: 0.5 + Math.random() * 0.5
            };
            
            setParticles(prev => [...prev.slice(-50), newParticle]); // Keep only last 50 particles
        }
    };
    
    // Animate particles
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => 
                prev.map(particle => ({
                    ...particle,
                    opacity: Math.max(0, particle.opacity - 0.02), // Decay over time
                    scale: particle.scale * 0.98 // Slight shrink
                })).filter(particle => particle.opacity > 0.1) // Remove faded particles
            );
        }, 16); // ~60fps
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div 
            className="absolute inset-0 pointer-events-none z-10"
            onMouseMove={handleMouseMove}
        >
            {/* Cursor Circle */}
            <div 
                className="absolute w-2.5 h-2.5 bg-white rounded-full opacity-30 pointer-events-none"
                style={{
                    left: mousePosition.x - 5,
                    top: mousePosition.y - 5,
                    transform: 'translate(-50%, -50%)'
                }}
            />
            
            {/* Particle System */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        transform: `translate(-50%, -50%) scale(${particle.scale})`,
                        opacity: particle.opacity
                    }}
                >
                    <img 
                        src="/paw-print.svg" 
                        alt="Paw print particle"
                        className="w-4 h-4"
                    />
                </div>
            ))}
        </div>
    );
}

function PawField() {
    const pawsRef = useRef<THREE.Group>(null!);
    
    const paws = useMemo(() => {
        const pawCount = 400;
        const pawElements = [];
        
        for (let i = 0; i < pawCount; i++) {
            // Create paws in a large sphere around the scene
            const radius = 20 + Math.random() * 30;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            // Random rotation for each paw
            const rotationY = Math.random() * Math.PI * 2;
            const rotationZ = Math.random() * Math.PI * 2;
            
            pawElements.push(
                <mesh key={i} position={[x, y, z]} rotation={[0, rotationY, rotationZ]}>
                    <planeGeometry args={[1, 1]} />
                    <meshBasicMaterial 
                        map={new THREE.TextureLoader().load('/paw-print.svg')}
                        transparent={true}
                        opacity={0.6}
                        color={0xffffff}
                    />
                </mesh>
            );
        }
        
        return pawElements;
    }, []);
    
    useFrame(() => {
        if (pawsRef.current) {
            // Slow rotation for subtle movement
            pawsRef.current.rotation.y += 0.0001;
        }
    });
    
    return <group ref={pawsRef}>{paws}</group>;
}

function Scene() {
    const sc = useScroll();
    const scroll = () => sc.offset; // 0..1
    
    return (
        <>
            {/* Paw Field */}
            <PawField />
            
            {/* Environment */}
            <fog attach="fog" args={["#000011", 15, 50]} />
            
            {/* Enhanced Lighting System */}
            <ambientLight intensity={0.9} color="#606060" />
            
            {/* Key Light - Main directional light with shadows */}
            <directionalLight 
                position={[5, 8, 5]} 
                intensity={1.8} 
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
            />
            
            {/* Fill Light - Blue tint from left */}
            <directionalLight 
                position={[-5, 2, -5]} 
                intensity={0.4} 
                color="#0088ff" 
            />
            
            {/* Rim Light - Cyan glow from front */}
            <pointLight 
                position={[0, 3, -5]} 
                intensity={0.8} 
                color="#00ffff" 
            />
            
            {/* Accent Light - Magenta from below for extra shine */}
            <pointLight 
                position={[0, -2, 3]} 
                intensity={0.3} 
                color="#ff00ff" 
            />
            
            {/* Invisible ground plane for shadows */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <shadowMaterial opacity={0.3} />
            </mesh>
            
            {/* TRON Floor */}
            <group position={[0, -2, 0]}>
                <TronFloor size={36} />
            </group>
            
            {/* Floppy disks */}
            {Array.from({ length: 7 }, (_, i) => (
                <FloppyDisk key={i} index={i} scroll={scroll} />
            ))}
        </>
    );
}

export default function FloppyCarousel() {
    return (
        <div className="relative h-[90svh] w-full bg-[#000011]">
            <Canvas 
                camera={{ position: [0, 1, 8], fov: 50 }}
                shadows
                gl={{ 
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                <ScrollControls pages={5} damping={0.15}>
                    <Scene />
                </ScrollControls>
            </Canvas>

            {/* Interactive Cursor Overlay */}
            <InteractiveCursorOverlay />

            {/* CTA overlay */}
            <div className="pointer-events-none absolute inset-x-0 top-28 z-10 mx-auto max-w-3xl px-6 text-center">
                <h2 className="neon text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
                    Step into the <span className="text-[var(--brand-warm)]">Corg-verse</span>
                </h2>
                <p className="mt-3 text-[var(--brand-ink)]/80">
                  Scroll to navigate through the floppy disk collection.
                </p>
                
                {/* Personal Picture Circle - Hidden on mobile */}
                <div className="mt-8 flex justify-center hidden md:flex">
                    <div className="relative rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm" style={{ width: '175px', height: '175px' }}>
                        {/* Your profile picture */}
                        <img 
                            src="/profile-pic.jpg" 
                            alt="Profile" 
                            className="absolute inset-0 rounded-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* subtle gradient top/bottom to blend */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-bg)] to-transparent"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--brand-bg)] to-transparent"></div>
            
            {/* Mobile-only Profile Picture - Below carousel */}
            <div className="absolute inset-x-0 bottom-[-200px] flex justify-center md:hidden pb-8">
                <div className="relative rounded-full border-2 border-cyan-400/50 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm" style={{ width: '120px', height: '120px' }}>
                    {/* Your profile picture */}
                    <img 
                        src="/profile-pic.jpg" 
                        alt="Profile" 
                        className="absolute inset-0 rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
