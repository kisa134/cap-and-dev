import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';

export default function Manifesto() {
  const navigate = useNavigate();
  const content = CONTENT.manifesto;
  const parallaxRef = useRef<HTMLDivElement>(null);
  const kineticRef1 = useRef<HTMLDivElement>(null);
  const kineticRef2 = useRef<HTMLDivElement>(null);
  const kineticRef3 = useRef<HTMLDivElement>(null);
  const kineticRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }

      if (kineticRef1.current) {
        kineticRef1.current.style.transform = `translateX(${-scrollY * 0.1}px)`;
      }
      if (kineticRef2.current) {
        kineticRef2.current.style.transform = `translateX(${scrollY * 0.15}px)`;
      }
      if (kineticRef3.current) {
        kineticRef3.current.style.transform = `translateX(${-scrollY * 0.08}px)`;
      }
      if (kineticRef4.current) {
        kineticRef4.current.style.transform = `translateX(${scrollY * 0.12}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        ref={parallaxRef}
        className="fixed inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, rgba(16, 185, 129, 0.05) 49%, rgba(16, 185, 129, 0.05) 51%, transparent 52%)
          `,
          backgroundSize: '50px 50px, 50px 50px, 100px 100px',
        }}
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          ref={kineticRef1}
          className="absolute top-[10%] left-0 text-[12rem] font-bold opacity-[0.03] whitespace-nowrap"
        >
          SYSTEM
        </div>
        <div
          ref={kineticRef2}
          className="absolute top-[30%] right-0 text-[12rem] font-bold opacity-[0.03] whitespace-nowrap"
        >
          PRINCIPLE
        </div>
        <div
          ref={kineticRef3}
          className="absolute top-[50%] left-0 text-[12rem] font-bold opacity-[0.03] whitespace-nowrap"
        >
          STRUCTURE
        </div>
        <div
          ref={kineticRef4}
          className="absolute top-[70%] right-0 text-[12rem] font-bold opacity-[0.03] whitespace-nowrap"
        >
          ALPHA
        </div>
      </div>

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="max-w-5xl w-full text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
              {content.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide">
              {content.hero.subtitle}
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-32 space-y-32">
          <section className="border-l-2 border-emerald-500/30 pl-12 py-8">
            <div className="flex items-baseline gap-6 mb-8">
              <span className="text-6xl font-bold text-emerald-500/20">
                {content.section01.number}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                {content.section01.title}
              </h2>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              {content.section01.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          <section className="border-l-2 border-emerald-500/30 pl-12 py-8">
            <div className="flex items-baseline gap-6 mb-8">
              <span className="text-6xl font-bold text-emerald-500/20">
                {content.section02.number}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                {content.section02.title}
              </h2>
            </div>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              {content.section02.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          <section className="border-l-2 border-emerald-500/30 pl-12 py-8">
            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-6xl font-bold text-emerald-500/20">
                {content.section03.number}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
                {content.section03.title}
              </h2>
            </div>

            <div className="space-y-12">
              {content.section03.principles.map((principle, idx) => (
                <div key={idx} className="border-l border-gray-700 pl-8 py-4">
                  <div className="flex items-baseline gap-4 mb-4">
                    <span className="text-2xl font-mono text-emerald-500/60">
                      {principle.number}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {principle.title}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {principle.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-20 text-center border-t border-gray-800">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-12">
              {content.cta.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {content.cta.buttons.map((button, idx) => (
                <Button
                  key={idx}
                  variant={idx === 1 ? 'primary' : 'secondary'}
                  size="lg"
                  fullWidth
                  onClick={() => navigate(button.route)}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
}
