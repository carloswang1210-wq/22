import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, Float, Sparkles, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

const GOLD_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#D4AF37",
  metalness: 1,
  roughness: 0.15,
  envMapIntensity: 2,
});

const EMERALD_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#002816",
  metalness: 0.3,
  roughness: 0.2,
  emissive: "#001a0e",
  emissiveIntensity: 0.2,
});

const TreeLayer: React.FC<{ position: [number, number, number], scale: number }> = ({ position, scale }) => {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[1.5, 2, 8]} />
        <primitive object={EMERALD_MATERIAL} />
      </mesh>
    </group>
  );
};

export const LuxuryTree: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const starRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05; // Slow, majestic rotation
    }
    if (starRef.current) {
      starRef.current.rotation.z = -t * 0.2;
      starRef.current.rotation.y = t * 0.5;
    }
  });

  // Generate ornament positions procedurally
  const baubles = useMemo(() => {
    const items = [];
    const layers = 5;
    for (let i = 0; i < layers; i++) {
      const yBase = -2 + i * 1.2;
      const radiusBase = 1.3 - i * 0.25;
      const count = 8 - i; 
      
      for (let j = 0; j < count; j++) {
        const angle = (j / count) * Math.PI * 2 + (i * 0.5);
        const x = Math.cos(angle) * radiusBase;
        const z = Math.sin(angle) * radiusBase;
        // Jitter
        const y = yBase - 0.5 + Math.random() * 0.4;
        const scale = 0.12 + Math.random() * 0.08;
        items.push({ position: [x, y, z] as [number, number, number], scale });
      }
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Tree Layers */}
      <TreeLayer position={[0, 0, 0]} scale={1} />
      <TreeLayer position={[0, 1.2, 0]} scale={0.85} />
      <TreeLayer position={[0, 2.4, 0]} scale={0.7} />
      <TreeLayer position={[0, 3.6, 0]} scale={0.55} />
      <TreeLayer position={[0, 4.6, 0]} scale={0.4} />

      {/* The Topper Star */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh ref={starRef} position={[0, 5.8, 0]} castShadow>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FDD017" 
            emissiveIntensity={2} 
            toneMapped={false} 
          />
        </mesh>
        {/* Glow halo around star */}
        <pointLight position={[0, 5.8, 0]} distance={3} intensity={5} color="#FDD017" />
      </Float>

      {/* Instanced Ornaments for Performance */}
      <Instances range={100} material={GOLD_MATERIAL} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        {baubles.map((data, i) => (
          <Instance
            key={i}
            position={data.position}
            scale={[data.scale, data.scale, data.scale]}
          />
        ))}
      </Instances>

      {/* Floating Fairy Dust */}
      <Sparkles 
        count={150} 
        scale={6} 
        size={4} 
        speed={0.4} 
        opacity={0.6} 
        color="#FDD017"
        noise={0.5}
      />
    </group>
  );
};