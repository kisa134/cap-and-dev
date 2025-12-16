import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hoverSide, setHoverSide] = useState<'LEFT' | 'RIGHT' | null>(null);
  const content = CONTENT.landing;

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col md:flex-row font-sans">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <button
          onClick={() => navigate('/manifesto')}
          className="pointer-events-auto bg-black text-white border border-white/30 px-8 py-3 font-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 uppercase backdrop-blur-md"
        >
          [ {content.manifesto} ]
        </button>
      </div>

      <div
        className={`relative flex-1 border-r border-white/10 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
          hoverSide === 'LEFT' ? 'bg-emerald-950/20' : 'bg-black'
        }`}
        onMouseEnter={() => setHoverSide('LEFT')}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => navigate('/capital')}
      >
        {hoverSide === 'LEFT' && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />
        )}
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            {content.capital.title}
          </h1>
          <p
            className="font-mono text-xs md:text-sm text-emerald-400/80 tracking-widest uppercase transition-all duration-500"
            style={{
              opacity: hoverSide === 'LEFT' ? 1 : 0,
              transform: hoverSide === 'LEFT' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            &gt; {content.capital.subtitle}
          </p>
        </div>
      </div>

      <div
        className={`relative flex-1 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
          hoverSide === 'RIGHT' ? 'bg-cyan-950/20' : 'bg-black'
        }`}
        onMouseEnter={() => setHoverSide('RIGHT')}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => navigate('/episteme')}
      >
        {hoverSide === 'RIGHT' && (
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />
        )}
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            {content.episteme.title}
          </h1>
          <p
            className="font-mono text-xs md:text-sm text-cyan-400/80 tracking-widest uppercase transition-all duration-500"
            style={{
              opacity: hoverSide === 'RIGHT' ? 1 : 0,
              transform: hoverSide === 'RIGHT' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            &gt; {content.episteme.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
