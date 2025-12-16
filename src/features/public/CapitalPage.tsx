import { useState } from 'react';
import { CONTENT } from '../../constants/content';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Footer } from '../../components/Footer';
import { WireframeObject } from '../../components/effects/WireframeObject';
import { EquityCurve } from '../../components/effects/EquityCurve';

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
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.vehicles.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.vehicles.strategies.map((strategy, idx) => (
            <div
              key={idx}
              className="border border-gray-800 bg-black p-8 hover:border-emerald-500/50 transition-all duration-300 group"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                {strategy.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {strategy.description}
              </p>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">ASSET CLASS:</span>
                  <span className="text-white">{strategy.metrics.assetClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">TARGET SHARPE:</span>
                  <span className="text-emerald-400">{strategy.metrics.targetSharpe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">MAX DRAWDOWN:</span>
                  <span className="text-white">{strategy.metrics.maxDrawdown}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CORRELATION (SPX):</span>
                  <span className="text-white">{strategy.metrics.correlation}</span>
                </div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onClick={() => setShowRequestModal(true)}
                className="mt-8"
              >
                Request Fact Sheet
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-5xl font-bold uppercase tracking-tight mb-16 text-center">
          {content.performance.title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <EquityCurve />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="text-sm font-mono text-gray-500 mb-2">AGGREGATE YTD RETURN</div>
              <div className="text-5xl font-mono font-bold text-emerald-400">
                {content.performance.metrics.ytdReturn}
              </div>
            </div>

            <div>
              <div className="text-sm font-mono text-gray-500 mb-2">3-YEAR CAGR</div>
              <div className="text-5xl font-mono font-bold text-emerald-400">
                {content.performance.metrics.cagr3Year}
              </div>
            </div>

            <div>
              <div className="text-sm font-mono text-gray-500 mb-2">FIRM-WIDE SHARPE</div>
              <div className="text-5xl font-mono font-bold text-emerald-400">
                {content.performance.metrics.firmwideSharpe}
              </div>
            </div>

            <div>
              <div className="text-sm font-mono text-gray-500 mb-2">TOTAL AUM</div>
              <div className="text-5xl font-mono font-bold text-white">
                {content.performance.metrics.totalAUM}
              </div>
            </div>
          </div>
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
          {content.finalCTA.title}
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          {content.finalCTA.subtitle}
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setShowRequestModal(true)}
        >
          {content.finalCTA.buttonText}
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
