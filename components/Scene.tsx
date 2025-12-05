import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { LuxuryTree } from './LuxuryTree';
import { Lights } from './Lights';

export const Scene: React.FC = () => {
  return (
    <div className="w-full h-screen relative z-0">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }} gl={{ antialias: false }}>
        {/* Cinematic Post Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={1.1} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.6}
            levels={8} 
          />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
          <Noise opacity={0.02} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Environment preset="city" /> {/* Provides nice reflections for the gold */}
          
          <LuxuryTree />
          <Lights />

          <ContactShadows 
            opacity={0.7} 
            scale={15} 
            blur={2.5} 
            far={4} 
            resolution={512} 
            color="#000000" 
            position={[0, -2, 0]}
          />
          
          <OrbitControls 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8}
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={12}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
        
        {/* Background gradient via color attach */}
        <color attach="background" args={['#020402']} />
        <fog attach="fog" args={['#020402', 5, 20]} />
      </Canvas>
    </div>
  );
};