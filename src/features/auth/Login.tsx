import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ArrowLeft, Loader2 } from 'lucide-react';
import { authService } from '../../services/api/authService';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError(err.message || 'Ошибка входа');
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
          Закрыть
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-white/50">
            <Terminal size={20} />
            <span className="text-xs tracking-widest">ВХОД В СИСТЕМУ</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tighter text-white font-sans uppercase">
            Аутентификация
          </h2>
        </div>

        {error && (
          <div className="p-4 border border-red-500/50 bg-red-950/20 text-red-400 text-xs mb-4">
            ОШИБКА: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/50">
              Email
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
              Пароль
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
                ПРОВЕРКА...
              </>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            Нет аккаунта?{' '}
            <button
              onClick={() => navigate('/auth/register')}
              className="text-emerald-500 hover:text-emerald-400"
            >
              Регистрация
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
