import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';
import { proptradingService } from '../../services/api/proptradingService';

export default function PropTrading() {
  const navigate = useNavigate();
  const content = CONTENT.propTrading;

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    telegram: '',
    experience_years: '',
    market_specialization: '',
    avg_monthly_return: '',
    max_drawdown: '',
    broker_api_key: '',
    strategy_description: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await proptradingService.submitApplication({
        ...formData,
        avg_monthly_return: formData.avg_monthly_return ? parseFloat(formData.avg_monthly_return) : undefined,
        max_drawdown: formData.max_drawdown ? parseFloat(formData.max_drawdown) : undefined,
      });
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        telegram: '',
        experience_years: '',
        market_specialization: '',
        avg_monthly_return: '',
        max_drawdown: '',
        broker_api_key: '',
        strategy_description: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <button
            onClick={() => navigate('/')}
            className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white mb-8 transition-colors"
          >
            ← Back
          </button>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4">
            {content.hero.title}
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            {content.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-white/80 leading-relaxed text-lg">
          {content.intro.description}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.whoWeSeek.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.whoWeSeek.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.whatWeOffer.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.whatWeOffer.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 text-white">
            {content.sections.selectionProcess.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.sections.selectionProcess.steps.map((step, index) => (
              <Card key={index} variant="bordered" padding="lg">
                <div className="text-5xl font-bold text-white/20 mb-4 font-mono">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold mb-3 uppercase">{step.title}</h4>
                <p className="text-white/70 text-sm">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 text-white">
            {content.sections.criteria.title}
          </h2>
          <Card variant="bordered" padding="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {content.sections.criteria.metrics.map((metric, index) => (
                <div key={index} className="border-l-2 border-white/20 pl-4">
                  <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">
                    {metric.name}
                  </p>
                  <p className="text-2xl font-bold text-white font-mono">
                    {metric.target}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="border-t border-white/10 pt-16 mb-8">
            <h2 className="text-3xl font-bold uppercase tracking-tight mb-2">
              {content.form.title}
            </h2>
          </div>

          <Card variant="bordered" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label={content.form.fullName}
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                fullWidth
              />

              <Input
                label={content.form.email}
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                fullWidth
              />

              <Input
                label={content.form.telegram}
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="@username"
                required
                fullWidth
              />

              <Select
                label={content.form.experience}
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                options={[
                  { value: '', label: 'Select Experience' },
                  ...content.form.experienceOptions.map(opt => ({ value: opt, label: opt }))
                ]}
                required
                fullWidth
              />

              <Select
                label={content.form.specialization}
                value={formData.market_specialization}
                onChange={(e) => setFormData({ ...formData, market_specialization: e.target.value })}
                options={[
                  { value: '', label: 'Select Market' },
                  ...content.form.specializationOptions.map(opt => ({ value: opt, label: opt }))
                ]}
                required
                fullWidth
              />

              <Input
                label={content.form.avgReturn}
                type="number"
                step="0.01"
                value={formData.avg_monthly_return}
                onChange={(e) => setFormData({ ...formData, avg_monthly_return: e.target.value })}
                placeholder="e.g., 8.5"
                fullWidth
              />

              <Input
                label={content.form.maxDrawdown}
                type="number"
                step="0.01"
                value={formData.max_drawdown}
                onChange={(e) => setFormData({ ...formData, max_drawdown: e.target.value })}
                placeholder="e.g., 12.3"
                fullWidth
              />

              <Input
                label={content.form.apiKey}
                value={formData.broker_api_key}
                onChange={(e) => setFormData({ ...formData, broker_api_key: e.target.value })}
                placeholder="Optional - for performance verification"
                fullWidth
              />

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  {content.form.strategyDescription}
                </label>
                <textarea
                  value={formData.strategy_description}
                  onChange={(e) => setFormData({ ...formData, strategy_description: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                  rows={6}
                  placeholder="Describe your trading strategy, approach, and methodology..."
                />
              </div>

              {success && (
                <div className="border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
                  <p className="text-emerald-400 text-sm font-mono">
                    {content.form.success}
                  </p>
                </div>
              )}

              {error && (
                <div className="border border-red-500/50 bg-red-500/10 px-4 py-3">
                  <p className="text-red-400 text-sm font-mono">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
              >
                {content.form.submit}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
