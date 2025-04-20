/* eslint-disable */
// src/components/DeveloperScene.tsx
import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import {
    OrbitControls,
    Environment,
    ContactShadows,
    Html,
    useGLTF,
    Loader,
    SpotLight,
    // Preload // Import Preload if you want to preload assets
} from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { MathUtils, Group } from 'three';
// *** Removed the custom GLTFResult interface ***

interface ModelProps {
    onClick: () => void;
    isHovered: string | null;
    setIsHovered: (value: string | null) => void;
}

const MacBookModel: React.FC<ModelProps> = ({ onClick, isHovered, setIsHovered }) => {
    const [modelFailed, setModelFailed] = useState(false);
    const laptopRef = useRef<Group>(null);

    // *** UPDATED useGLTF call ***
    // Let TypeScript infer the type directly from useGLTF.
    // The inferred type will include the 'scene', 'nodes', 'materials', etc.
    let gltf = null; // Keep gltf scoped outside try/catch if needed by subsequent logic
    try {
        gltf = useGLTF('/models/macbook_pro_m3_16_inch_2024.glb');
        // No 'as GLTFResult' cast needed here
    } catch (error) {
        console.error('Failed to load MacBook GLTF model using useGLTF:', error);
        // If useGLTF throws synchronously (less common, usually Suspense handles), set failed state.
        // More often, an Error Boundary above the Canvas would catch async loading errors.
        if (!modelFailed) setModelFailed(true); // Set state if an error occurs during initial hook call
    }

    const model = useMemo(() => {
        // Check if gltf and gltf.scene exist, and no prior failure
        if (gltf?.scene && !modelFailed) {
            try {
                // Clone the scene from the inferred gltf object
                return gltf.scene.clone();
            } catch (e) {
                console.error('Error cloning scene:', e);
                setModelFailed(true); // Set failed state if cloning fails
                return null;
            }
        }
        // This check might be redundant if the above handles it, but safe fallback trigger
        if (!modelFailed && !gltf?.scene) {
             setModelFailed(true);
        }
        return null;
    }, [gltf, modelFailed]); // Depend on the inferred gltf object and modelFailed state


    useEffect(() => {
      // This effect attempts to catch cases where gltf loaded but cloning failed silently,
      // or where gltf remained null after Suspense resolved (less likely).
      if (gltf && !model && !modelFailed) {
        console.warn('GLTF loaded but scene/model could not be cloned or used. Falling back.');
        setModelFailed(true);
      }
    }, [gltf, model, modelFailed])


    useFrame((state) => {
        if (laptopRef.current) {
            const time = state.clock.getElapsedTime();
            laptopRef.current.position.y = Math.sin(time * 0.5) * 0.05 - 0.05;

            const targetRotation = isHovered === 'macbook'
                ? Math.sin(time * 0.6) * 0.15 + Math.PI * 0.1
                : Math.sin(time * 0.3) * 0.05 + Math.PI * 0.15;

            laptopRef.current.rotation.y = MathUtils.lerp(
                laptopRef.current.rotation.y,
                targetRotation,
                0.05
            );
        }
    });

    // Fallback component definition
    const FallbackMacBook = () => (
        <group>
            {/* Base */}
            <mesh position={[0, 0.015, 0]}>
                <boxGeometry args={[1.1, 0.03, 0.75]} />
                <meshStandardMaterial color="#a1a1aa" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Screen */}
            <group position={[0, 0.03, -0.36]} rotation={[Math.PI / 2.1, 0, 0]}>
                {/* Screen Bezel */}
                <mesh>
                    <boxGeometry args={[1.08, 0.7, 0.02]} />
                    <meshStandardMaterial color="#3f3f46" metalness={0.7} roughness={0.4} />
                </mesh>
                {/* Screen Panel */}
                <mesh position={[0, 0, 0.011]}>
                    <planeGeometry args={[1.04, 0.66]} />
                    <meshStandardMaterial color="#18181b" emissive="#000000" roughness={0.8} />
                </mesh>
            </group>
        </group>
    );


    return (
        <group
            ref={laptopRef}
            onClick={onClick}
            onPointerOver={(e) => { e.stopPropagation(); setIsHovered('macbook'); }}
            onPointerOut={() => setIsHovered(null)}
            position={[0.5, -0.05, 0.5]}
            rotation={[0, Math.PI * 0.15, 0]}
            scale={0.65}
        >
            {/* Conditionally render the loaded model or the fallback */}
            {!modelFailed && model ? (
                <primitive object={model} dispose={null} />
            ) : (
                <FallbackMacBook />
            )}

            {isHovered === 'macbook' && !modelFailed && model && ( // Check model exists for hover effects
                <>
                    <pointLight position={[0, 1, 0]} intensity={2} color="#61dafb" decay={2} distance={5} />
                    <Html position={[0, 0.8, 0]} center distanceFactor={8}>
                        <div className="px-3 py-1.5 rounded-md bg-stone-800 text-stone-50 text-sm font-medium shadow-lg opacity-90 transition-all duration-300 pointer-events-none">
                            My Projects
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
};


const Developer: React.FC<ModelProps> = ({ onClick, isHovered, setIsHovered }) => {
    const modelRef = useRef<Group>(null);

    useFrame((state) => {
        if (modelRef.current) {
            const time = state.clock.getElapsedTime();
            modelRef.current.position.y = Math.sin(time * 0.5) * 0.05;

            const targetRotation = isHovered === 'developer'
                ? Math.sin(time * 0.8) * 0.2 + Math.PI * 0.05
                : Math.sin(time * 0.3) * 0.05;

            const lerpFactor = isHovered === 'developer' ? 0.08 : 0.05;

            modelRef.current.rotation.y = MathUtils.lerp(
                modelRef.current.rotation.y,
                targetRotation,
                lerpFactor
            );
        }
    });

    return (
        <group
            ref={modelRef}
            onClick={onClick}
            onPointerOver={(e) => { e.stopPropagation(); setIsHovered('developer'); }}
            onPointerOut={() => setIsHovered(null)}
            position={[-0.8, 0, 0]}
            scale={1.0}
        >
            {/* Head */}
            <mesh position={[0, 1.5, 0]} castShadow>
                <sphereGeometry args={[0.25, 64, 64]} />
                <meshStandardMaterial color="#e0e0e0" roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Body */}
            <mesh position={[0, 0.9, 0]} castShadow>
                <capsuleGeometry args={[0.2, 0.8, 32, 64]} />
                <meshStandardMaterial color="#57534e" roughness={0.5} metalness={0.2} />
            </mesh>
            {/* Right Arm */}
            <mesh position={[0.35, 0.9, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
                <capsuleGeometry args={[0.08, 0.5, 16, 32]} />
                <meshStandardMaterial color="#78716c" roughness={0.5} metalness={0.2} />
            </mesh>
            {/* Left Arm */}
            <mesh position={[-0.35, 0.9, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
                <capsuleGeometry args={[0.08, 0.5, 16, 32]} />
                <meshStandardMaterial color="#78716c" roughness={0.5} metalness={0.2} />
            </mesh>
            {/* Hover Effect */}
            {isHovered === 'developer' && (
                <>
                    <pointLight position={[0, 1.2, 0]} intensity={1.8} color="#f59e0b" decay={2} distance={4} />
                    <Html position={[0, 2, 0]} center distanceFactor={8}>
                        <div className="px-3 py-1.5 rounded-md bg-stone-800 text-stone-50 text-sm font-medium shadow-lg opacity-90 transition-all duration-300 pointer-events-none">
                            About Me
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
};

interface SceneProps {
    onDeveloperClick: () => void;
    onMacBookClick: () => void;
}

const Scene: React.FC<SceneProps> = ({ onDeveloperClick, onMacBookClick }) => {
    const [isHovered, setIsHovered] = useState<string | null>(null);

    return (
        <>
            {/* Lighting Setup */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            <SpotLight
                position={[-2, 5, 4]}
                angle={0.5}
                penumbra={0.4}
                intensity={1.0}
                castShadow
                shadow-bias={-0.0002}
            />
            <SpotLight
                position={[4, 4, -3]}
                angle={0.4}
                penumbra={0.5}
                intensity={0.6}
                castShadow={false}
            />
            {/* Shadows */}
            <ContactShadows
                position={[0, -0.55, 0]}
                opacity={0.65}
                scale={15}
                blur={2.5}
                far={1.5}
                resolution={512}
                color="#000000"
            />
            {/* Models */}
            <Developer
                onClick={onDeveloperClick}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
            />
            <MacBookModel
                onClick={onMacBookClick}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
            />
            {/* Environment */}
            <Environment preset="studio" background={false} />
            {/* <Preload all /> */}
            {/* Controls */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI / 2.0}
                autoRotate
                autoRotateSpeed={0.3}
                enableDamping
                dampingFactor={0.05}
                target={[0, 0.5, 0]}
            />
            {/* Fog */}
            <fog attach="fog" color="#f5f5f4" near={10} far={25} />
        </>
    );
};

const DeveloperScene: React.FC = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleDeveloperClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => navigate('/about'), 800);
    };

    const handleMacBookClick = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => navigate('/projects'), 800);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            className="w-full h-[70vh] md:h-[80vh] bg-stone-100 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
        >
            {/* Canvas Setup */}
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 1.5, 6], fov: isMobile ? 65 : 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ touchAction: 'none' }}
            >
                <Suspense fallback={null}>
                    <Scene
                        onDeveloperClick={handleDeveloperClick}
                        onMacBookClick={handleMacBookClick}
                    />
                </Suspense>
                 {/* <Preload all /> */}
            </Canvas>

            {/* Loader */}
            <Loader
                containerStyles={{ background: 'rgba(245, 245, 244, 0.8)', backdropFilter: 'blur(8px)' }}
                innerStyles={{ backgroundColor: '#44403c', width: '120px' }}
                barStyles={{ backgroundColor: '#a1a1aa' }}
                dataStyles={{ color: '#44403c', fontSize: '1rem', fontFamily: 'Inter, sans-serif', marginTop: '8px' }}
                dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
            />

            {/* Transition Overlay */}
            <motion.div
                className="absolute inset-0 bg-stone-800 z-10 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isTransitioning ? 1 : 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Helper Text */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-stone-500 text-xs md:text-sm backdrop-blur-sm py-2 bg-stone-100/40 pointer-events-none">
                Click on the developer to learn about me or the MacBook to see my projects
            </div>

            {/* Optional: Error Boundary */}
            {/* <ErrorBoundary fallback={<div>Oops, something went wrong loading the 3D scene.</div>}>
                <Canvas>...</Canvas>
            </ErrorBoundary> */}
        </motion.div>
    );
};

export default DeveloperScene;

// Example Error Boundary (keep commented out or implement if needed)
/*
import React, { Component, ErrorInfo, ReactNode } from "react";
// ... (rest of ErrorBoundary implementation)
*/