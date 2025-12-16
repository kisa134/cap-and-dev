import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hoverSide, setHoverSide] = useState<'LEFT' | 'RIGHT' | null>(null);
  const [showManifesto, setShowManifesto] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col md:flex-row font-sans">
      {showManifesto && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-8">
          <div className="max-w-4xl w-full">
            <button
              onClick={() => setShowManifesto(false)}
              className="float-right text-white/50 hover:text-white text-2xl"
            >
              ×
            </button>
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-bold tracking-tighter mb-6">
                ДОВЕРИЕ - ЭТО АЛГОРИТМ.
              </h2>
              <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
                COGITO.ART использует математические модели и криптографические доказательства
                для верификации участников рынка. Мы устраняем человеческий фактор из процесса
                принятия инвестиционных решений.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="border-l-2 border-emerald-500 pl-4 text-left">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-emerald-500 mb-2">
                    Для Капитала
                  </h3>
                  <p className="text-sm text-white/60">
                    Проверенные возможности. Прозрачность. Гарантированная доходность без шума и спекуляций.
                  </p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4 text-left">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-cyan-500 mb-2">
                    Для Эпистемы
                  </h3>
                  <p className="text-sm text-white/60">
                    Знания. Инструменты. Прямой доступ к институциональному капиталу через меритократию.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
        <button
          onClick={() => setShowManifesto(true)}
          className="pointer-events-auto bg-black text-white border border-white/30 px-8 py-3 font-mono text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 uppercase backdrop-blur-md"
        >
          [ Манифест ]
        </button>
      </div>

      <div
        className={`relative flex-1 border-r border-white/10 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
          hoverSide === 'LEFT' ? 'bg-emerald-950/20' : 'bg-black'
        }`}
        onMouseEnter={() => setHoverSide('LEFT')}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => navigate('/auth/register?role=investor')}
      >
        {hoverSide === 'LEFT' && (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />
        )}
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            КАПИТАЛ
          </h1>
          <p
            className="font-mono text-xs md:text-sm text-emerald-400/80 tracking-widest uppercase transition-all duration-500"
            style={{
              opacity: hoverSide === 'LEFT' ? 1 : 0,
              transform: hoverSide === 'LEFT' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            &gt; Верифицированные Возможности
          </p>
        </div>
      </div>

      <div
        className={`relative flex-1 flex flex-col justify-center items-center cursor-pointer transition-all duration-700 ${
          hoverSide === 'RIGHT' ? 'bg-cyan-950/20' : 'bg-black'
        }`}
        onMouseEnter={() => setHoverSide('RIGHT')}
        onMouseLeave={() => setHoverSide(null)}
        onClick={() => navigate('/auth/register?role=trader')}
      >
        {hoverSide === 'RIGHT' && (
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent animate-pulse pointer-events-none" />
        )}
        <div className="z-10 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            ЭПИСТЕМА
          </h1>
          <p
            className="font-mono text-xs md:text-sm text-cyan-400/80 tracking-widest uppercase transition-all duration-500"
            style={{
              opacity: hoverSide === 'RIGHT' ? 1 : 0,
              transform: hoverSide === 'RIGHT' ? 'translateY(0)' : 'translateY(10px)'
            }}
          >
            &gt; Знания и Инструменты
          </p>
        </div>
      </div>
    </div>
  );
};
