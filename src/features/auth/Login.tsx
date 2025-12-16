import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Loader2, Eye } from 'lucide-react';
import { authService } from '../../services/api/authService';
import { CONTENT } from '../../constants/content';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const content = CONTENT.auth.login;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { user } = await authService.signIn(email, password);
      if (user) {
        const profile = await authService.getUserProfile(user.id);
        if (profile.role === 'investor') {
          navigate('/app/investor');
        } else if (profile.role === 'trader') {
          navigate('/app/trader');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md space-y-6">
        {/* Demo Access Section */}
        <div className="border border-purple-500/30 bg-purple-500/5 p-8 relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-white/30 hover:text-white uppercase text-xs"
          >
            Close
          </button>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2 text-purple-400/80">
              <Eye size={20} />
              <span className="text-xs tracking-widest uppercase">{content.demoTitle}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/app/investor?demo=true')}
              className="w-full border-2 border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-4 font-bold tracking-wide uppercase transition-all"
            >
              <div className="text-sm">{content.demoInvestor}</div>
              <div className="text-xs text-emerald-400/60 mt-1">{content.demoInvestorSub}</div>
            </button>

            <button
              onClick={() => navigate('/app/trader?demo=true')}
              className="w-full border-2 border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 py-4 font-bold tracking-wide uppercase transition-all"
            >
              <div className="text-sm">{content.demoTrader}</div>
              <div className="text-xs text-cyan-400/60 mt-1">{content.demoTraderSub}</div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="border border-white/20 bg-black p-8 relative">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-white/50">
              <Terminal size={20} />
              <span className="text-xs tracking-widest uppercase">{content.title}</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tighter text-white font-sans uppercase">
              {content.subtitle}
            </h2>
          </div>

          {error && (
            <div className="p-4 border border-red-500/50 bg-red-950/20 text-red-400 text-xs mb-4">
              ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/50">
                {content.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/50">
                {content.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-4 font-bold tracking-widest uppercase hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verifying...
                </>
              ) : (
                content.submit
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-white/40">
              No account?{' '}
              <button
                onClick={() => navigate('/auth/register')}
                className="text-emerald-500 hover:text-emerald-400"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
