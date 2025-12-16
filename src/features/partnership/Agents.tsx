import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';
import { agentsService } from '../../services/api/agentsService';

export default function Agents() {
  const navigate = useNavigate();
  const content = CONTENT.agents;

  const [formData, setFormData] = useState({
    full_name: '',
    company: '',
    email: '',
    telegram: '',
    aum: '',
    region: '',
    client_profile: '',
    sales_experience: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await agentsService.submitApplication(formData);
      setSuccess(true);
      setFormData({
        full_name: '',
        company: '',
        email: '',
        telegram: '',
        aum: '',
        region: '',
        client_profile: '',
        sales_experience: '',
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
            onClick={() => navigate('/work-with-us')}
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
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>{content.intro.fact}</p>
          <p>{content.intro.promise}</p>
          <p>{content.intro.fact2}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.target.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.target.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.benefits.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.benefits.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.process.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.process.steps.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
                label={content.form.company}
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
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

              <Input
                label={content.form.aum}
                value={formData.aum}
                onChange={(e) => setFormData({ ...formData, aum: e.target.value })}
                placeholder="e.g., $10M - $50M"
                fullWidth
              />

              <Input
                label={content.form.region}
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                placeholder="e.g., Middle East, Europe"
                required
                fullWidth
              />

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  {content.form.clientProfile}
                </label>
                <textarea
                  value={formData.client_profile}
                  onChange={(e) => setFormData({ ...formData, client_profile: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                  rows={4}
                  placeholder="Describe your typical client profile..."
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  {content.form.experience}
                </label>
                <textarea
                  value={formData.sales_experience}
                  onChange={(e) => setFormData({ ...formData, sales_experience: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                  rows={4}
                  placeholder="Describe your sales experience..."
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
