// src/components/ThreeScene.tsx
import React, { useRef } from 'react';

import {
  PerspectiveCamera,
  OrbitControls,
  MeshDistortMaterial,
  Environment,
  Sphere,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

interface ThreeSceneProps {
  reduceMotion?: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ reduceMotion = false }) => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (reduceMotion || !sphereRef.current || !lightRef.current) return;

    const elapsedTime = clock.getElapsedTime();

    // Gentle sphere movement
    sphereRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
    sphereRef.current.rotation.z = elapsedTime * 0.15;

    // Light movement
    lightRef.current.position.x = Math.sin(elapsedTime * 0.5) * 3;
    lightRef.current.position.z = Math.cos(elapsedTime * 0.5) * 3;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50}>
        <ambientLight intensity={0.5} />
        <pointLight ref={lightRef} position={[3, 3, 3]} intensity={1.5} color="#F5F5F5" />
      </PerspectiveCamera>

      <motion.group
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <Sphere ref={sphereRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#1C1917"
            roughness={0.5}
            metalness={0.2}
            distort={0.3}
            speed={2}
          />
        </Sphere>
      </motion.group>

      {/* Subtle environment lighting */}
      <Environment preset="warehouse" />

      {/* Controls for desktop interaction */}
      {!reduceMotion && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          rotateSpeed={0.5}
        />
      )}
    </>
  );
};

export default ThreeScene;
