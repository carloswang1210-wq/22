import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export const Lights: React.FC = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    if (spotLightRef.current) {
      // Subtle swaying of the main light to create "living" shadows
      spotLightRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} color="#001a10" />
      
      {/* Main Key Light - Warm Gold */}
      <SpotLight
        ref={spotLightRef}
        position={[10, 20, 10]}
        angle={0.3}
        penumbra={0.5}
        intensity={200}
        color="#ffeebb"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Rim Light - Cool Blue/White for contrast against the emerald */}
      <spotLight
        position={[-10, 10, -5]}
        angle={0.5}
        penumbra={1}
        intensity={50}
        color="#e0f7fa"
      />

      {/* Fill Light - Deep Green from below */}
      <pointLight position={[0, -5, 5]} intensity={20} color="#004225" />
    </>
  );
};