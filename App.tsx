import React from 'react';
import { Scene } from './components/Scene';
import { Overlay } from './components/Overlay';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden selection:bg-arix-gold selection:text-black">
      {/* 3D Scene Background */}
      <Scene />
      
      {/* UI Overlay */}
      <Overlay />
      
      {/* Vignette Overlay for extra cinematic depth at edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-5"></div>
    </div>
  );
};

export default App;