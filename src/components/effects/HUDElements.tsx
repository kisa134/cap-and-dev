import React, { useEffect, useState } from 'react';

export const HUDElements: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="w-8 h-8 border border-white/20">
          <div className="w-full h-full border border-white/10 m-1" />
        </div>
        <div className="text-[10px] font-mono text-white/30 tracking-wider">
          {mousePos.x.toFixed(0)},{mousePos.y.toFixed(0)}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        <div className="w-8 h-8 border border-white/20">
          <div className="w-full h-full border border-white/10 m-1" />
        </div>
        <div className="text-[10px] font-mono text-white/30 tracking-wider">
          {time.toLocaleTimeString('en-GB', { hour12: false })}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex flex-col gap-2">
        <div className="text-[10px] font-mono text-white/30 tracking-wider">
          COGITO.ART
        </div>
        <div className="w-8 h-8 border border-white/20">
          <div className="w-full h-full border border-white/10 m-1" />
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 items-end">
        <div className="text-[10px] font-mono text-white/30 tracking-wider">
          ONLINE
        </div>
        <div className="w-8 h-8 border border-white/20">
          <div className="w-full h-full border border-white/10 m-1" />
        </div>
      </div>

      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
      <div className="absolute top-0 left-1/2 w-px h-full bg-white/5" />
    </div>
  );
};
