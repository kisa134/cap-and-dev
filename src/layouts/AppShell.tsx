import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, Settings, HelpCircle, LogOut, BookOpen, Wrench } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { TierLevel } from '../types/database.types';
import { CONTENT } from '../constants/content';

interface AppShellProps {
  children: React.ReactNode;
}

const TierBadge = ({ tier }: { tier: TierLevel }) => {
  const colors = {
    S: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/20',
    A: 'text-amber-400 border-amber-500/40 bg-amber-950/10',
    B: 'text-slate-400 border-slate-700 bg-slate-900/50'
  };

  return (
    <div className={`px-3 py-1 border ${colors[tier]} rounded-none font-mono text-xs tracking-widest`}>
      TIER {tier}
    </div>
  );
};

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const isInvestor = profile?.role === 'investor';
  const isTrader = profile?.role === 'trader';

  const investorNav = [
    { icon: LayoutDashboard, label: CONTENT.appShell.investor.terminal, path: '/app/investor' },
    { icon: Wallet, label: CONTENT.appShell.investor.assets, path: '/app/investor/portfolio' }
  ];

  const traderNav = [
    { icon: LayoutDashboard, label: CONTENT.appShell.trader.terminal, path: '/app/trader' },
    { icon: BookOpen, label: CONTENT.appShell.trader.episteme, path: '/app/trader/courses' },
    { icon: Wrench, label: CONTENT.appShell.trader.config, path: '/app/trader/tools' }
  ];

  const navigation = isInvestor ? investorNav : isTrader ? traderNav : [];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-black flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-white"></div>
            <span className="font-bold text-xl tracking-tighter">COGITO</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest transition-colors ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => navigate('/app/settings')}
              className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Settings size={18} />
              {isInvestor ? CONTENT.appShell.investor.config : CONTENT.appShell.trader.config}
            </button>
            <button
              onClick={() => navigate('/app/support')}
              className="w-full flex items-center gap-3 px-4 py-3 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <HelpCircle size={18} />
              {isInvestor ? CONTENT.appShell.investor.support : CONTENT.appShell.trader.support}
            </button>
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">{profile?.full_name || 'User'}</div>
              <div className="text-xs text-white/40 font-mono uppercase">
                {isInvestor ? 'Investor' : isTrader ? 'Trader' : 'User'}
              </div>
            </div>
            {profile?.tier && <TierBadge tier={profile.tier} />}
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-white/20 font-mono text-xs uppercase tracking-widest text-white/60 hover:text-white hover:border-white transition-colors"
          >
            <LogOut size={16} />
            {CONTENT.appShell.disconnect}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-white/10 bg-black h-16 flex items-center justify-between px-8">
          <div className="font-mono text-xs tracking-widest text-white/40">
            {isInvestor ? 'CAPITAL.TERMINAL' : isTrader ? 'EPISTEME.TERMINAL' : 'TERMINAL'}
          </div>
          <div className="flex items-center gap-6 font-mono text-[10px] text-white/30">
            <span>SYS: ONLINE</span>
            <span>LATENCY: 12ms</span>
            <div className={`px-2 py-1 border ${
              profile?.kyc_status === 'verified'
                ? 'border-emerald-500/50 text-emerald-400'
                : 'border-amber-500/50 text-amber-400'
            }`}>
              KYC: {profile?.kyc_status === 'verified' ? 'VERIFIED' : 'PENDING'}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#050505]">
          {children}
        </main>
      </div>
    </div>
  );
};
