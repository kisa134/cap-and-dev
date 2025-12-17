import { useState, useEffect } from 'react';
import { CONTENT } from '../../constants/content';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Footer } from '../../components/Footer';
import { WireframeObject } from '../../components/effects/WireframeObject';
import { EquityCurve } from '../../components/effects/EquityCurve';

interface InfrastructureCardProps {
  title: string;
  stat: string;
  description: string;
}

function InfrastructureCard({ title, stat, description }: InfrastructureCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayStat, setDisplayStat] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById(`stat-${title.replace(/\s+/g, '-')}`);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);

  useEffect(() => {
    if (!isVisible) return;

    const numericMatch = stat.match(/[\d,]+/);
    if (numericMatch) {
      const targetNumber = parseInt(numericMatch[0].replace(/,/g, ''), 10);
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        current += increment;
        step++;

        if (step >= steps) {
          setDisplayStat(stat);
          clearInterval(timer);
        } else {
          const formattedNumber = Math.floor(current).toLocaleString();
          setDisplayStat(stat.replace(/[\d,]+/, formattedNumber));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      let charIndex = 0;
      const timer = setInterval(() => {
        charIndex++;
        setDisplayStat(stat.substring(0, charIndex));
        if (charIndex >= stat.length) clearInterval(timer);
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isVisible, stat]);

  return (
    <div
      id={`stat-${title.replace(/\s+/g, '-')}`}
      className="border border-gray-800 bg-black/50 p-8 hover:border-emerald-500/50 transition-all duration-500 group"
    >
      <div className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-wider">
        {title}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-6 font-mono min-h-[60px] flex items-center">
        {displayStat || <span className="opacity-0">{stat}</span>}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function CapitalPage() {
  const content = CONTENT.capital;
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [requestFormData, setRequestFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    investorStatus: '',
    estimatedAllocation: '',
  });

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Request submitted:', requestFormData);
    setShowRequestModal(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', loginFormData);
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <WireframeObject />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide mb-12 max-w-3xl mx-auto">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowRequestModal(true)}
            >
              {content.hero.cta.request}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowLoginModal(true)}
            >
              {content.hero.cta.login}
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="border-l-2 border-emerald-500/20 pl-12 space-y-8">
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

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold uppercase tracking-tight mb-4">
            The COGITO Infrastructure
          </h2>
          <p className="text-xl text-gray-400">
            The engine that drives our performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InfrastructureCard
            title="Our Researchers"
            stat="25+"
            description="Quantitative researchers, mathematicians, and systems engineers from leading academic and technology institutions."
          />
          <InfrastructureCard
            title="Daily Data Ingestion"
            stat="> 5 TB"
            description="Our research database ingests and processes over 5 terabytes of raw market data daily, from tick-level order books to alternative datasets."
          />
          <InfrastructureCard
            title="Computational Grid"
            stat="1,200+ Cores"
            description="A distributed computing grid dedicated to continuous backtesting, simulation, and machine learning model training."
          />
          <InfrastructureCard
            title="Proprietary Code"
            stat="> 500,000 Lines"
            description="Of highly optimized, performance-first code written in Rust and C++, forming the core of our execution and risk systems."
          />
          <InfrastructureCard
            title="Partner Capital"
            stat="Significant"
            description="Founders' and employees' capital is significantly invested in the same strategies offered to our clients. We have skin in the game."
          />
          <InfrastructureCard
            title="Regulatory Framework"
            stat="Fully Regulated"
            description="Operating under the strict regulatory and compliance framework of DIFC and ADGM jurisdictions."
          />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.onboarding.title}
        </h2>

        <div className="space-y-16">
          {content.onboarding.steps.map((step, idx) => (
            <div key={idx} className="flex gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 flex items-center justify-center border-2 border-emerald-500/30 text-3xl font-bold text-emerald-500/60">
                  {step.number}
                </div>
              </div>

              <div className="flex-1 pt-2">
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32 text-center border-t border-gray-800">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-8">
          Engage with the System.
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          If your investment philosophy aligns with our principles of systematic, data-driven asset management, we invite you to begin the onboarding process.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowRequestModal(true)}
        >
          Request Onboarding
        </Button>
      </section>

      <Footer />

      <Modal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        title={content.requestModal.title}
      >
        <form onSubmit={handleRequestSubmit} className="space-y-6">
          <Input
            label={content.requestModal.fields.fullName}
            type="text"
            required
            value={requestFormData.fullName}
            onChange={(e) =>
              setRequestFormData({ ...requestFormData, fullName: e.target.value })
            }
          />

          <Input
            label={content.requestModal.fields.email}
            type="email"
            required
            value={requestFormData.email}
            onChange={(e) =>
              setRequestFormData({ ...requestFormData, email: e.target.value })
            }
          />

          <Input
            label={content.requestModal.fields.country}
            type="text"
            required
            value={requestFormData.country}
            onChange={(e) =>
              setRequestFormData({ ...requestFormData, country: e.target.value })
            }
          />

          <Select
            label={content.requestModal.fields.investorStatus}
            required
            value={requestFormData.investorStatus}
            onChange={(e) =>
              setRequestFormData({ ...requestFormData, investorStatus: e.target.value })
            }
            options={[
              { value: '', label: 'Select status' },
              ...content.requestModal.fields.investorStatusOptions.map((opt) => ({
                value: opt,
                label: opt,
              })),
            ]}
          />

          <Input
            label={content.requestModal.fields.estimatedAllocation}
            type="text"
            value={requestFormData.estimatedAllocation}
            onChange={(e) =>
              setRequestFormData({
                ...requestFormData,
                estimatedAllocation: e.target.value,
              })
            }
          />

          <p className="text-xs text-gray-400">{content.requestModal.disclaimer}</p>

          <Button type="submit" variant="primary" fullWidth>
            {content.requestModal.submitButton}
          </Button>
        </form>
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={content.loginModal.title}
      >
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <Input
            label={content.loginModal.fields.email}
            type="email"
            required
            value={loginFormData.email}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, email: e.target.value })
            }
          />

          <Input
            label={content.loginModal.fields.password}
            type="password"
            required
            value={loginFormData.password}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, password: e.target.value })
            }
          />

          <Button type="submit" variant="primary" fullWidth>
            {content.loginModal.submitButton}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
