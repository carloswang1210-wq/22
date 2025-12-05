import React, { useState } from 'react';
import { LoadingState } from '../types';
import { generateLuxuryGreeting } from '../services/geminiService';

export const Overlay: React.FC = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [greeting, setGreeting] = useState<string | null>(null);

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(LoadingState.GENERATING);
    try {
      const message = await generateLuxuryGreeting(name);
      setGreeting(message);
      setLoading(LoadingState.COMPLETE);
    } catch (error) {
      setLoading(LoadingState.ERROR);
    }
  };

  const handleReset = () => {
    setGreeting(null);
    setName('');
    setLoading(LoadingState.IDLE);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-between p-8 md:p-12">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="font-display text-4xl md:text-5xl text-arix-gold tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
            Arix
          </h1>
          <p className="font-serif text-arix-emerald text-sm md:text-base italic tracking-wide mt-1 opacity-80">
            Signature Collection
          </p>
        </div>
      </header>

      {/* Interaction Area */}
      <main className="flex flex-col items-center justify-center w-full max-w-lg mx-auto pointer-events-auto">
        
        {loading === LoadingState.IDLE && (
          <form onSubmit={handleSign} className="w-full bg-arix-black/60 backdrop-blur-md border border-arix-gold/30 p-8 rounded-sm shadow-2xl transition-all duration-700">
            <h2 className="font-display text-arix-gold text-2xl text-center mb-6 tracking-wider">
              Sign the Guestbook
            </h2>
            <div className="relative group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-transparent border-b border-arix-gold/40 text-white font-serif text-xl py-2 px-1 focus:outline-none focus:border-arix-gold transition-colors placeholder:text-gray-600 text-center"
              />
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-arix-gold transition-all duration-500 group-hover:w-full"></div>
            </div>
            
            <button 
              type="submit" 
              disabled={!name.trim()}
              className="mt-8 w-full py-3 border border-arix-gold text-arix-gold font-display text-sm tracking-[0.2em] uppercase hover:bg-arix-gold hover:text-arix-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reveal Your Wish
            </button>
          </form>
        )}

        {loading === LoadingState.GENERATING && (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-arix-gold/20 border-t-arix-gold rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-serif text-arix-gold animate-pulse text-lg">Consulting the stars...</p>
          </div>
        )}

        {loading === LoadingState.COMPLETE && greeting && (
          <div className="w-full bg-gradient-to-br from-[#05140a] to-[#000] border border-arix-gold/50 p-10 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000">
             {/* Decorative Corner Lines */}
             <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-arix-gold"></div>
             <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-arix-gold"></div>
             <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-arix-gold"></div>
             <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-arix-gold"></div>

            <div className="text-center space-y-6">
              <h3 className="font-display text-arix-gold/70 text-sm tracking-[0.3em] uppercase">
                A Gift For {name}
              </h3>
              <div className="w-12 h-[1px] bg-arix-gold/40 mx-auto"></div>
              <p className="font-serif text-white/90 text-xl md:text-2xl leading-relaxed italic">
                "{greeting}"
              </p>
              <div className="w-12 h-[1px] bg-arix-gold/40 mx-auto"></div>
              
              <button 
                onClick={handleReset}
                className="text-arix-gold/60 text-xs uppercase tracking-widest hover:text-arix-gold transition-colors pt-4"
              >
                Sign Another
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center md:text-right">
        <p className="font-display text-arix-gold/40 text-[10px] uppercase tracking-widest">
          Est. 2024 &bull; Arix Interactive
        </p>
      </footer>
    </div>
  );
};