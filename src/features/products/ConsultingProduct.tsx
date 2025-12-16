import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/Footer';
import { contactService } from '../../services/api/contactService';

export default function ConsultingProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telegram: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submitContactForm({
        name: formData.name,
        email: formData.email,
        subject: 'Consulting Application',
        message: `Telegram: ${formData.telegram}\n\n${formData.message}`,
        page_source: 'consulting',
      });
      setSuccess(true);
      setFormData({ name: '', email: '', telegram: '', message: '' });
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
            onClick={() => navigate('/episteme')}
            className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white mb-8 transition-colors"
          >
            ← Back to Products
          </button>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            System Architecture Consulting
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            One-on-One Strategy Validation
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            Even with a sound theoretical basis, 90% of trading systems fail in a live environment due to
            curve-fitting, look-ahead bias, or flawed risk models. The gap between a successful backtest and
            profitable deployment is where most aspiring quants fail.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Promise:</span>{' '}
            This one-on-one consulting service provides direct access to our senior quantitative analysts to
            rigorously audit, stress-test, and refine your trading architecture. We act as your external
            validation team, identifying points of failure before they impact your capital.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            Clients receive a formal audit document identifying structural flaws, recommendations for parameter
            optimization, and a clear roadmap for deploying a more robust system. We sign a strict Non-Disclosure
            Agreement (NDA) to ensure your intellectual property is fully protected.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">
          Services Offered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
              System Audit
            </h3>
            <p className="text-white/70 text-sm mb-4">
              A complete review of your existing strategy code and backtest results.
            </p>
            <ul className="space-y-2">
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Code review for logical errors and biases</span>
              </li>
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Backtest validation and walk-forward analysis</span>
              </li>
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Risk model stress-testing</span>
              </li>
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4 text-white">
              Full Architecture Build-out
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Collaborative development of a new system from concept to deployment.
            </p>
            <ul className="space-y-2">
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Strategy conceptualization and hypothesis testing</span>
              </li>
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>End-to-end system implementation</span>
              </li>
              <li className="text-white/60 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Live deployment guidance and monitoring</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card variant="bordered" padding="lg" className="mb-16">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
            Who This Is For
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Fund Managers</p>
              <p className="text-white/70 text-sm">
                Emerging fund managers launching quantitative strategies
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Independent Traders</p>
              <p className="text-white/70 text-sm">
                Experienced traders seeking institutional-grade validation
              </p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Family Offices</p>
              <p className="text-white/70 text-sm">
                Developing in-house quantitative strategies
              </p>
            </div>
          </div>
        </Card>

        <Card variant="bordered" padding="lg" className="mb-16">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
            Booking & Process
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-white/20 font-mono">01</div>
              <div>
                <h4 className="text-white font-bold mb-1">Submit Application</h4>
                <p className="text-white/70 text-sm">Fill out the form below with project details</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-white/20 font-mono">02</div>
              <div>
                <h4 className="text-white font-bold mb-1">Initial Assessment Call</h4>
                <p className="text-white/70 text-sm">30-minute discovery call to assess fit and scope</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-white/20 font-mono">03</div>
              <div>
                <h4 className="text-white font-bold mb-1">NDA & Engagement</h4>
                <p className="text-white/70 text-sm">Sign Non-Disclosure Agreement and engagement terms</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-white/20 font-mono">04</div>
              <div>
                <h4 className="text-white font-bold mb-1">Collaborative Work Sessions</h4>
                <p className="text-white/70 text-sm">Weekly sessions with senior quantitative analysts</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl font-bold text-white/20 font-mono">05</div>
              <div>
                <h4 className="text-white font-bold mb-1">Final Report Delivery</h4>
                <p className="text-white/70 text-sm">Comprehensive audit document with actionable recommendations</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="max-w-2xl mx-auto border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 text-center">
            Apply for Consultation
          </h2>

          <Card variant="bordered" padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                fullWidth
              />

              <Input
                label="Telegram"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="@username"
                required
                fullWidth
              />

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                  Project Description
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                  rows={6}
                  placeholder="Describe your strategy, current challenges, and what you're looking to achieve..."
                  required
                />
              </div>

              {success && (
                <div className="border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
                  <p className="text-emerald-400 text-sm font-mono">
                    Application submitted successfully. We'll contact you within 48 hours.
                  </p>
                </div>
              )}

              {error && (
                <div className="border border-red-500/50 bg-red-500/10 px-4 py-3">
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
                Submit Application
              </Button>
            </form>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm mb-2">Pricing starts at $5,000 for system audit</p>
            <button
              onClick={() => navigate('/contacts')}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Questions? Contact us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
