import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/Footer';
import { AnimatedCode } from '../../components/effects/AnimatedCode';
import { CodeHighlight } from '../../components/effects/CodeHighlight';

export default function EpistemePage() {
  const navigate = useNavigate();
  const content = CONTENT.episteme;
  const toolkitRef = useRef<HTMLElement>(null);

  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [contactForm, setContactForm] = useState({
    email: '',
    message: '',
  });

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/register');
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact submitted:', contactForm);
  };

  const scrollToToolkit = () => {
    toolkitRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedCode />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide mb-12 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="primary" size="lg" onClick={scrollToToolkit}>
              {content.hero.cta.explore}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/auth/register')}
            >
              {content.hero.cta.register}
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="border-l-2 border-cyan-500/20 pl-12 space-y-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.fpf.fact1}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.fpf.promise}
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            {content.fpf.fact2}
          </p>
        </div>
      </section>

      <section ref={toolkitRef} className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.toolkit.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.toolkit.products.map((product, idx) => (
            <div
              key={idx}
              className="border border-gray-800 bg-black p-8 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.03) 2px, rgba(6, 182, 212, 0.03) 4px)',
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-cyan-500/70 text-sm font-mono uppercase tracking-wider mb-6">
                  {product.subtitle}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>

                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate(product.link)}
                >
                  Learn More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.precision.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              {content.precision.description}
            </p>

            <div className="border-l-2 border-cyan-500/20 pl-6">
              <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
                Transparent
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Every indicator is fully documented with clear mathematical definitions and
                implementation details.
              </p>

              <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
                Performant
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Built with Rust and optimized for low-latency execution in live trading
                environments.
              </p>

              <p className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">
                Testable
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Comprehensive backtesting framework included with every tool for systematic
                validation.
              </p>
            </div>
          </div>

          <div>
            <CodeHighlight code={content.precision.codeExample} />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="border-2 border-cyan-500/30 p-12 bg-cyan-500/5">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-6 text-center">
            {content.propTrading.title}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 text-center max-w-3xl mx-auto">
            {content.propTrading.description}
          </p>
          <div className="flex justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate(content.propTrading.link)}
            >
              {content.propTrading.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-gray-800">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.finalCTA.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              {content.finalCTA.registerForm.title}
            </h3>
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <Input
                label={content.finalCTA.registerForm.fields.fullName}
                type="text"
                required
                value={registerForm.fullName}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, fullName: e.target.value })
                }
              />

              <Input
                label={content.finalCTA.registerForm.fields.email}
                type="email"
                required
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
              />

              <Input
                label={content.finalCTA.registerForm.fields.password}
                type="password"
                required
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
              />

              <Button type="submit" variant="primary" fullWidth>
                {content.finalCTA.registerForm.submitButton}
              </Button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">
              {content.finalCTA.contactForm.title}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {content.finalCTA.contactForm.description}
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <Input
                label={content.finalCTA.contactForm.fields.email}
                type="email"
                required
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
                  {content.finalCTA.contactForm.fields.message}
                </label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  className="w-full bg-black border border-gray-800 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                  rows={5}
                />
              </div>

              <Button type="submit" variant="secondary" fullWidth>
                {content.finalCTA.contactForm.submitButton}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
