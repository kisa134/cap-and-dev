import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';
import { referralService } from '../../services/api/referralService';

export default function Referral() {
  const navigate = useNavigate();
  const content = CONTENT.referral;

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    telegram: '',
    professional_background: '',
    linkedin_url: '',
    agreement: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.agreement) {
      setError('Please agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      const result = await referralService.registerReferral({
        full_name: formData.full_name,
        email: formData.email,
        telegram: formData.telegram,
        professional_background: formData.professional_background,
        linkedin_url: formData.linkedin_url,
      });

      setSuccess(true);
      setReferralCode(result.referral_code);
      setFormData({
        full_name: '',
        email: '',
        telegram: '',
        professional_background: '',
        linkedin_url: '',
        agreement: false,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to register');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.howItWorks.title}
            </h3>
            <ul className="space-y-4">
              {content.sections.howItWorks.steps.map((step, index) => (
                <li key={index} className="text-white/70 text-sm flex items-start gap-3">
                  <span className="text-white/40 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-6 text-white">
              {content.sections.compensation.title}
            </h3>
            <p className="text-white/60 text-sm mb-6">{content.sections.compensation.description}</p>
            <div className="space-y-3">
              {content.sections.compensation.tiers.map((tier, index) => (
                <div key={index} className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-white/70 text-sm font-mono">{tier.range}</span>
                  <span className="text-white text-sm font-bold">{tier.fee}</span>
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
            {success && referralCode ? (
              <div className="text-center py-12">
                <div className="border border-emerald-500/50 bg-emerald-500/10 px-6 py-8 mb-6">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-4 font-mono">
                    {content.form.success}
                  </h3>
                  <div className="bg-black border border-emerald-500/30 px-6 py-4 mb-4">
                    <p className="text-xs uppercase tracking-widest text-white/50 mb-2">Your Referral Code</p>
                    <p className="text-3xl font-bold text-white font-mono tracking-wider">
                      {referralCode}
                    </p>
                  </div>
                  <p className="text-sm text-white/70">
                    Check your email for complete details and next steps.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    setSuccess(false);
                    setReferralCode(null);
                  }}
                >
                  Register Another
                </Button>
              </div>
            ) : (
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

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                    {content.form.background}
                  </label>
                  <textarea
                    value={formData.professional_background}
                    onChange={(e) => setFormData({ ...formData, professional_background: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                    rows={4}
                    placeholder="Describe your professional background..."
                  />
                </div>

                <Input
                  label={content.form.linkedin}
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  fullWidth
                />

                <Checkbox
                  label={content.form.agreement}
                  checked={formData.agreement}
                  onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
                />

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
            )}
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
