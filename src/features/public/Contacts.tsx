import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';
import { contactService } from '../../services/api/contactService';
import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react';

export default function Contacts() {
  const navigate = useNavigate();
  const content = CONTENT.contacts;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
        ...formData,
        page_source: 'contacts',
      });
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
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

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6" />
                {content.office.title}
              </h2>
              <Card variant="bordered" padding="lg">
                <p className="text-white/80 leading-relaxed mb-4">
                  {content.office.address}
                </p>
                <p className="text-white/40 text-sm font-mono">
                  Coordinates: {content.office.coordinates}
                </p>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6" />
                {content.channels.title}
              </h2>
              <Card variant="bordered" padding="lg">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-mono">
                      Email
                    </p>
                    <a
                      href={`mailto:${content.channels.email}`}
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      {content.channels.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-mono">
                      Telegram
                    </p>
                    <a
                      href={`https://t.me/${content.channels.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-400 transition-colors"
                    >
                      {content.channels.telegram}
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/40 mb-1 font-mono">
                      Phone
                    </p>
                    <a
                      href={`tel:${content.channels.phone}`}
                      className="text-white hover:text-emerald-400 transition-colors"
                    >
                      {content.channels.phone}
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6" />
                {content.hours.title}
              </h2>
              <Card variant="bordered" padding="lg">
                <p className="text-white/80 font-mono">
                  {content.hours.schedule}
                </p>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight mb-6 flex items-center gap-3">
              <MessageSquare className="w-6 h-6" />
              {content.form.title}
            </h2>
            <Card variant="bordered" padding="lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label={content.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  label={content.form.subject}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  fullWidth
                />

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
                    {content.form.message}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
                    rows={6}
                    required
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
      </div>

      <Footer />
    </div>
  );
}
