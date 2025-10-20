"use client";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { ScrollControls, useScroll } from "@react-three/drei";
import { TronFloor } from "./TronFloor";
import { createLabelTexture } from "@/utils/createLabelTexture";

const projects = [
    { title: "Tablature", description: "A privacy-first platform designed to align team intent and execution. Allows workers to share needs safely while providing managers with clear insights without personal diaries.", tech: "Next.js • TypeScript • Tailwind CSS", color: 65535, url: "https://www.tablature.io/", github: "https://github.com/bohselecta/middle-ground" },
    { title: "Mr Deep Seeks", description: "An AI-powered search platform that provides intelligent search capabilities with advanced query processing and contextual results.", tech: "React • Node.js • AI/ML", color: 16711935, url: "https://www.mrdeepseeks.me/", github: "https://github.com/bohselecta/mrdeepseeks" },
    { title: "Wove", description: "A modern web application featuring innovative design patterns and interactive user experiences. Built with cutting-edge web technologies.", tech: "Next.js • Three.js • WebGL", color: 65280, url: "https://wove-nine.vercel.app/", github: "https://github.com/bohselecta/wove" },
    { title: "Luvler", description: "A modern dating platform with intuitive user interface and advanced matching algorithms. Features real-time messaging and profile customization.", tech: "React • Node.js • PostgreSQL", color: 16776960, url: "https://luvler.com/", github: "https://github.com/bohselecta/luvler" },
    { title: "Schema", description: "A data modeling and schema management platform that helps developers design, validate, and manage database schemas with visual tools.", tech: "Next.js • TypeScript • Database Design", color: 16737792, url: "https://schema-swart.vercel.app/", github: "https://github.com/bohselecta/schema" },
    { title: "Etifyd Demo", description: "A demonstration platform showcasing innovative web technologies and user interface patterns. Features interactive demos and real-time updates.", tech: "React • WebSockets • Real-time", color: 16711680, url: "https://etifyd-demo.vercel.app/", github: "https://github.com/bohselecta/etifyd-demo" },
    { title: "MechaCrew", description: "A community platform for mechanical engineering professionals featuring project showcases, collaboration tools, and knowledge sharing.", tech: "Next.js • Community Features • User Management", color: 8388736, url: "https://mechacrew.org/", github: "https://github.com/bohselecta/mechacrew" },
    { title: "Glyphos", description: "A creative typography and design platform featuring custom font tools, text effects, and design utilities for creative professionals.", tech: "WebGL • Typography • Design Tools", color: 16753920, url: "https://glyphos.vercel.app/", github: "https://github.com/bohselecta/glyphos" },
    { title: "Labs for America", description: "A civic technology platform providing one-click deployment of community websites for schools, departments, and local organizations.", tech: "Next.js • Civic Tech • Community Tools", color: 10066329, url: "https://labs-for-america.vercel.app/", github: "https://github.com/bohselecta/labs-for-america" }
];

function createFloppyDisk(index: number) {
    const group = new THREE.Group();
    const project = projects[index];
    
    // === MAIN BODY (based on SVG proportions) ===
    // SVG shows: width=668, height=701, so aspect ratio ~0.95
    const bodyGeometry = new THREE.BoxGeometry(2.0, 2.1, 0.1, 4, 4, 1);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xB6B19A,  // Custom beige color
        roughness: 0.85,
        metalness: 0.05
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
    label.position.set(0, 0.4, 0.051); // Moved down 10 pixels (0.1 units)
    group.add(label);
    
    // === METAL SHUTTER (bottom section, like SVG) ===
    // SVG shows darker rectangle at bottom - reduced to 60% width, scaled vertically by 15%
    const shutterGeometry = new THREE.BoxGeometry(1.152, 0.782, 0.001); // 0.869 * 0.9 = 0.782 (10% shorter)
    const shutterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xc8d1d6,  // Much lighter grey metal
        roughness: 0.35,
        metalness: 0.6
    });
    const shutter = new THREE.Mesh(shutterGeometry, shutterMaterial);
    shutter.position.set(0, -0.67, 0.051); // Moved up 3 pixels (0.03 units)
    group.add(shutter);
    
    // === SMALL RECTANGLE OVER METAL PLATE (offset to side, 1/3rd across) ===
    const smallRectGeometry = new THREE.BoxGeometry(0.24, 0.54, 0.002); // 0.2 * 1.2 = 0.24 (20% wider)
    const smallRectMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x666666,  // Darker gray for contrast
        roughness: 0.5,
        metalness: 0.4
    });
    const smallRect = new THREE.Mesh(smallRectGeometry, smallRectMaterial);
    smallRect.position.set(-0.25, -0.67, 0.052); // Moved up 3 pixels (0.03 units)
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
    
    // === LABEL TEXTURE ===
    // Label texture and material are now handled in the FloppyDisk component
    // where we have access to the renderer for proper texture creation
    
    // Store references for animation
    group.userData.project = project;
    group.userData.index = index;
    group.userData.edges = edges;
    group.userData.label = label; // White label area
    
    return group;
}

function FloppyDisk({ index, scroll }: { index: number; scroll: () => number }) {
    const meshRef = useRef<THREE.Group>(null!);
    const diskGeometry = useMemo(() => createFloppyDisk(index), [index]);
    const { gl } = useThree();
    const [isFlashing, setIsFlashing] = useState(false);
    
    // Create proper label texture and material
    const labelTexture = useMemo(() => createLabelTexture(`/label${index + 1}.jpg`, gl), [index, gl]);
    const labelMaterial = useMemo(() => new THREE.MeshBasicMaterial({
        map: labelTexture,
        side: THREE.FrontSide,
        toneMapped: false,     // Critical for color accuracy
        fog: false            // Critical to ignore scene fog
    }), [labelTexture]);

    // Create flash outline geometry for the entire disk body
    const flashOutlineGeometry = useMemo(() => {
        const bodyGeometry = new THREE.BoxGeometry(2.0, 2.1, 0.1, 4, 4, 1);
        return new THREE.EdgesGeometry(bodyGeometry);
    }, []);

    // Click handler
    const handleClick = (event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation();
        const project = projects[index];
        if (project?.url) {
            // Trigger flash animation
            setIsFlashing(true);
            setTimeout(() => setIsFlashing(false), 400);
            
            // Open URL in new tab
            window.open(project.url, '_blank');
        }
    };

    // Pointer event handlers
    const handlePointerOver = () => {};
    const handlePointerOut = () => {};

    // Create flash material
    const flashMaterial = useMemo(() => new THREE.LineBasicMaterial({
        color: 0x00ffff, // Start with cyan
        transparent: true,
        opacity: 0,
        linewidth: 3
    }), []);
    
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const progress = scroll();
        const targetIndex = progress * 8; // Maps to disk 0-8 for 9 disks
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
            labelMaterial.opacity = 0.95;
            
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
            labelMaterial.opacity = Math.max(0, 0.3 - absDistance * 0.2);
            
            // Dim edge glow
            if (meshRef.current.userData.edges) {
                meshRef.current.userData.edges.material.opacity = Math.max(0.2, 0.6 - absDistance * 0.2);
            }
        }

        // Flash animation
        if (isFlashing) {
            const time = state.clock.elapsedTime;
            const flashProgress = (time % 0.4) / 0.4; // 400ms cycle
            
            // Animate opacity (fade in then out)
            const opacity = Math.sin(flashProgress * Math.PI);
            flashMaterial.opacity = opacity * 0.8;
            
            // Animate color from cyan to pink
            const hue = flashProgress * 0.5; // 0 to 0.5 (cyan to pink)
            flashMaterial.color.setHSL(hue, 1, 0.5);
        } else {
            flashMaterial.opacity = 0;
        }
    });
    
    return (
        <group
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {diskGeometry && <primitive object={diskGeometry} />}
            {/* Add the label as a separate mesh with proper material */}
            <mesh position={[0, 0.4, 0.052]} rotation={[0, 0, 0]} renderOrder={999}>
                <planeGeometry args={[1.39, 1.1]} />
                <primitive object={labelMaterial} attach="material" />
            </mesh>
            {/* Flash outline */}
            <lineSegments geometry={flashOutlineGeometry} material={flashMaterial} renderOrder={1000} />
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
    const pawDataRef = useRef<Array<{id: number, x: number, y: number, z: number, speed: number, opacity: number, rotation: number}>>([]);
    
    // Create clipping plane to hide paws in front of floppy carousel
    const clippingPlane = useMemo(() => {
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 1); // Normal pointing towards camera, distance 1
        return plane;
    }, []);
    
    // Initialize paw data
    useMemo(() => {
        const pawCount = 260; // Increased by 30% for denser Matrix effect
        pawDataRef.current = [];
        
        for (let i = 0; i < pawCount; i++) {
            pawDataRef.current.push({
                id: i,
                x: (Math.random() - 0.5) * 40, // Spread across width
                y: Math.random() * 60 + 20, // Start above scene
                z: -8 - Math.random() * 12, // Start well behind carousel
                speed: 0.017 + Math.random() * 0.05, // Variable falling speed (300% slower)
                opacity: 0.3 + Math.random() * 0.4, // Variable opacity
                rotation: Math.random() * Math.PI * 2 // Random rotation in radians
            });
        }
    }, []);
    
    const paws = useMemo(() => {
        return pawDataRef.current.map((paw) => {
            const trailElements = [];
            
            // Create fading paw print trail (15 paw prints with sustained bright section)
            for (let i = 1; i <= 15; i++) {
                const trailY = i * 0.5; // Space paw prints 0.5 units apart (like Matrix line-by-line)
                
                // Create sustained bright section for first 6 paws, then fade
                let fadeOpacity;
                if (i <= 6) {
                    // Sustained bright section (80% of main paw opacity)
                    fadeOpacity = paw.opacity * 0.8;
                } else {
                    // Fade section (gradual fade from 80% to 0%)
                    const fadeStart = 6;
                    const fadeProgress = (i - fadeStart) / (15 - fadeStart);
                    fadeOpacity = paw.opacity * 0.8 * (1 - fadeProgress);
                }
                
                trailElements.push(
                    <mesh key={`trail-${i}`} position={[0, trailY, 0]} rotation={[0, 0, paw.rotation + (Math.random() - 0.5) * 0.5]}>
                        <planeGeometry args={[0.3, 0.3]} />
                        <meshBasicMaterial 
                            map={new THREE.TextureLoader().load('/paw-print.svg')}
                            transparent={true}
                            opacity={Math.max(0, fadeOpacity)}
                            color={0x0BDE18} // Matrix green
                            clippingPlanes={[clippingPlane]}
                        />
                    </mesh>
                );
            }
            
            return (
                <group key={paw.id} position={[paw.x, paw.y, paw.z]}>
                    {/* Main paw */}
                    <mesh rotation={[0, 0, paw.rotation]}>
                        <planeGeometry args={[0.4, 0.4]} />
                        <meshBasicMaterial 
                            map={new THREE.TextureLoader().load('/paw-print.svg')}
                            transparent={true}
                            opacity={paw.opacity}
                            color={0x0BDE18} // Matrix green
                            clippingPlanes={[clippingPlane]}
                        />
                    </mesh>
                    
                    {/* Fading paw print trail */}
                    {trailElements}
                </group>
            );
        });
    }, [clippingPlane]);
    
    useFrame(() => {
        if (pawsRef.current) {
            // Update paw positions for Matrix-style falling
            pawDataRef.current.forEach((paw) => {
                paw.y -= paw.speed; // Fall straight down
                
                // Reset position when paw falls below scene
                if (paw.y < -20) {
                    paw.y = Math.random() * 20 + 40; // Respawn above
                    paw.x = (Math.random() - 0.5) * 40; // New random x position
                    paw.z = -8 - Math.random() * 12; // Ensure respawn behind carousel
                    paw.speed = 0.017 + Math.random() * 0.05; // New random speed (300% slower)
                    paw.opacity = 0.3 + Math.random() * 0.4; // New random opacity
                    paw.rotation = Math.random() * Math.PI * 2; // New random rotation
                }
            });
            
            // Update group positions and material opacity
            pawsRef.current.children.forEach((child, index) => {
                const paw = pawDataRef.current[index];
                if (paw && child instanceof THREE.Group) {
                    child.position.set(paw.x, paw.y, paw.z);
                    // Update material opacity for main paw and trail elements
                    child.children.forEach((mesh, meshIndex) => {
                        if (mesh instanceof THREE.Mesh && mesh.material instanceof THREE.MeshBasicMaterial) {
                            if (meshIndex === 0) {
                                // Main paw
                                mesh.material.opacity = paw.opacity;
                            } else {
                                // Trail paw prints (sustained bright then fade)
                                const trailIndex = meshIndex - 1;
                                let fadeOpacity;
                                if (trailIndex < 6) {
                                    // Sustained bright section
                                    fadeOpacity = paw.opacity * 0.8;
                                } else {
                                    // Fade section
                                    const fadeStart = 6;
                                    const fadeProgress = (trailIndex - fadeStart) / (15 - fadeStart);
                                    fadeOpacity = paw.opacity * 0.8 * (1 - fadeProgress);
                                }
                                mesh.material.opacity = Math.max(0, fadeOpacity);
                            }
                        }
                    });
                }
            });
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
            <ambientLight intensity={0.35} color="#505a66" />
            
            {/* Key Light - Main directional light with shadows */}
            <directionalLight 
                position={[4, 6, 5]} 
                intensity={1.0} 
                color="#ffffff"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
            />
            
            {/* Fill Light - Neutral fill from left */}
            <directionalLight 
                position={[-4, 2, -4]} 
                intensity={0.25} 
                color="#cfd6e0" 
            />
            
            {/* Rim Light - Softer cyan glow from front */}
            <pointLight 
                position={[0, 3, -5]} 
                intensity={0.35} 
                color="#88ffff" 
            />
            
            {/* Accent Light - Gentler magenta from below for extra shine */}
            <pointLight 
                position={[0, -2, 3]} 
                intensity={0.18} 
                color="#ff66e0" 
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
            {Array.from({ length: 9 }, (_, i) => (
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
                    toneMappingExposure: 1.0
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
