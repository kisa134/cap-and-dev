import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Loader2 } from 'lucide-react';
import { authService } from '../../services/api/authService';
import { UserRole } from '../../types/database.types';
import { CONTENT } from '../../constants/content';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('investor');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const content = CONTENT.auth.register;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.signUp(email, password, role, fullName);
      navigate('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-mono">
      <div className="w-full max-w-md border border-white/20 bg-black p-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 right-8 text-white/30 hover:text-white uppercase text-xs"
        >
          Close
        </button>

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
            <label className="text-xs uppercase tracking-widest text-emerald-500">
              {content.role}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('investor')}
                className={`p-4 border transition-colors ${
                  role === 'investor'
                    ? 'bg-emerald-950/20 border-emerald-500 text-emerald-400'
                    : 'border-white/20 text-white/60'
                }`}
              >
                <div className="font-bold text-sm">CAPITAL</div>
                <div className="text-xs mt-1">{content.investor}</div>
              </button>
              <button
                type="button"
                onClick={() => setRole('trader')}
                className={`p-4 border transition-colors ${
                  role === 'trader'
                    ? 'bg-cyan-950/20 border-cyan-500 text-cyan-400'
                    : 'border-white/20 text-white/60'
                }`}
              >
                <div className="font-bold text-sm">EPISTEME</div>
                <div className="text-xs mt-1">{content.trader}</div>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50">
              {content.fullName}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-black border border-white/20 p-3 focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="John Doe"
              required
            />
          </div>

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
              minLength={6}
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
                Creating...
              </>
            ) : (
              content.submit
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            {content.hasAccount}{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-emerald-500 hover:text-emerald-400"
            >
              {content.login}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
