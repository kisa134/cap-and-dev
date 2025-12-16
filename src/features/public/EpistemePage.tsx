import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Footer } from '../../components/Footer';
import { contactService } from '../../services/api/contactService';

export default function EpistemePage() {
  const navigate = useNavigate();
  const content = CONTENT.episteme;

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [registrationForm, setRegistrationForm] = useState({
    fullName: '',
    email: '',
    telegram: '',
  });

  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setContactError(null);

    try {
      await contactService.submitContactForm({
        ...contactForm,
        subject: 'Episteme Inquiry',
        page_source: 'episteme',
      });
      setContactSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setContactError(err.message || 'Failed to send message');
    } finally {
      setContactLoading(false);
    }
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/auth/register');
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

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            {content.hero.title}
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            {content.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p><span className="text-white/40">Fact:</span> {content.intro.fact1}</p>
          <p><span className="text-white/40">Promise:</span> {content.intro.promise}</p>
          <p><span className="text-white/40">Fact:</span> {content.intro.fact2}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card variant="bordered" padding="lg" hoverable>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Course
              </span>
              <span className="text-xs font-mono text-white/40">
                {content.products.theory.access}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-tight">
              {content.products.theory.name}
            </h3>

            <div className="text-lg mb-8 text-white/60">
              {content.products.theory.subtitle}
            </div>

            <div className="space-y-3 mb-8 text-sm border-t border-white/10 pt-6">
              <div className="flex justify-between text-white/60">
                <span>Duration:</span>
                <span className="text-white font-mono">{content.products.theory.duration}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Access Level:</span>
                <span className="text-white font-mono">{content.products.theory.access}</span>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {content.products.theory.description}
            </p>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => navigate('/products/theory')}
            >
              Learn More
            </Button>
          </Card>

          <Card variant="bordered" padding="lg" hoverable>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Software
              </span>
              <span className="text-xs font-mono text-white/40">
                {content.products.tools.access}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-tight">
              {content.products.tools.name}
            </h3>

            <div className="text-lg mb-8 text-white/60">
              {content.products.tools.subtitle}
            </div>

            <div className="space-y-3 mb-8 text-sm border-t border-white/10 pt-6">
              <div className="flex justify-between text-white/60">
                <span>Platform:</span>
                <span className="text-white font-mono">{content.products.tools.platform}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Access Level:</span>
                <span className="text-white font-mono">{content.products.tools.access}</span>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {content.products.tools.description}
            </p>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => navigate('/products/tools')}
            >
              Learn More
            </Button>
          </Card>

          <Card variant="bordered" padding="lg" hoverable>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
                Service
              </span>
              <span className="text-xs font-mono text-white/40">
                {content.products.consulting.access}
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-tight">
              {content.products.consulting.name}
            </h3>

            <div className="text-lg mb-8 text-white/60">
              {content.products.consulting.subtitle}
            </div>

            <div className="space-y-3 mb-8 text-sm border-t border-white/10 pt-6">
              <div className="flex justify-between text-white/60">
                <span>Format:</span>
                <span className="text-white font-mono">{content.products.consulting.format}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Access Level:</span>
                <span className="text-white font-mono">{content.products.consulting.access}</span>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {content.products.consulting.description}
            </p>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => navigate('/products/consulting')}
            >
              Learn More
            </Button>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto border border-white/10 p-12 mb-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-6 text-center">
            Already an Expert?
          </h2>
          <p className="text-white/70 text-center mb-8 leading-relaxed">
            If you're a successful trader or mathematician with a proven track record, consider joining our
            proprietary trading program. Trade our capital, keep a significant share of the profits, and
            eliminate personal risk.
          </p>
          <div className="flex justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/proptrading')}
            >
              Learn About Prop Trading
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">
              Have Questions?
            </h2>
            <Card variant="bordered" padding="lg">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <Input
                  label="Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  fullWidth
                />

                <Input
                  label="Email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  fullWidth
                />

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                    Message
                  </label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                    rows={4}
                    required
                  />
                </div>

                {contactSuccess && (
                  <div className="border border-emerald-500/50 bg-emerald-500/10 px-4 py-3">
                    <p className="text-emerald-400 text-sm font-mono">
                      Message sent successfully. We'll respond within 24 hours.
                    </p>
                  </div>
                )}

                {contactError && (
                  <div className="border border-red-500/50 bg-red-500/10 px-4 py-3">
                    <p className="text-red-400 text-sm font-mono">{contactError}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  fullWidth
                  loading={contactLoading}
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6">
              Create Account
            </h2>
            <Card variant="bordered" padding="lg">
              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  value={registrationForm.fullName}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, fullName: e.target.value })}
                  required
                  fullWidth
                />

                <Input
                  label="Email"
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                  required
                  fullWidth
                />

                <Input
                  label="Telegram"
                  value={registrationForm.telegram}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, telegram: e.target.value })}
                  placeholder="@username"
                  required
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Register
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
