import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';
import { careerService } from '../../services/api/careerService';

export default function Career() {
  const navigate = useNavigate();
  const content = CONTENT.career;

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    telegram: '',
    specialization: '',
    experience_years: '',
    portfolio_link: '',
    cv_link: '',
    motivation: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await careerService.submitApplication({
        ...formData,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : undefined,
      });
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        telegram: '',
        specialization: '',
        experience_years: '',
        portfolio_link: '',
        cv_link: '',
        motivation: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
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

      {/* Intro - FPF Framework */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>{content.intro.fact}</p>
          <p>{content.intro.promise}</p>
          <p>{content.intro.fact2}</p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Open Positions */}
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.positions.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.positions.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Core Requirements */}
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.requirements.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.requirements.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* What We Offer */}
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.offers.title}
            </h3>
            <ul className="space-y-3">
              {content.sections.offers.items.map((item, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-2">
                  <span className="text-white/40">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Application Form */}
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
                label={content.form.specialization}
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                options={[
                  { value: '', label: 'Select Specialization' },
                  ...content.form.specializationOptions.map(opt => ({ value: opt, label: opt }))
                ]}
                required
                fullWidth
              />

              <Input
                label={content.form.experience}
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                placeholder="Years"
                fullWidth
              />

              <Input
                label={content.form.portfolio}
                value={formData.portfolio_link}
                onChange={(e) => setFormData({ ...formData, portfolio_link: e.target.value })}
                placeholder="https://"
                fullWidth
              />

              <Input
                label={content.form.cv}
                value={formData.cv_link}
                onChange={(e) => setFormData({ ...formData, cv_link: e.target.value })}
                placeholder="https://"
                fullWidth
              />

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  {content.form.motivation}
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                  rows={6}
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
