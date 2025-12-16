import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  showNav?: boolean;
  onReset?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true, onReset }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between border-x border-white/20 max-w-7xl mx-auto relative">
      {/* Grid Lines Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <header className="border-b border-white/20 bg-black z-50 sticky top-0">
        <div className="px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={onReset}
            title="Reset to Core"
          >
            <div className="w-6 h-6 bg-white group-hover:bg-transparent group-hover:border group-hover:border-white transition-all duration-300"></div>
            <span className="font-bold text-2xl tracking-tighter">CORE</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-white/60">
            <span>SYS: ONLINE</span>
            <span>LATENCY: 12ms</span>
            <span>VER: 1.0.4</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col z-10 relative">
        {children}
      </main>

      <footer className="border-t border-white/20 py-8 px-6 bg-black z-10">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div className="text-sm font-mono text-white/40">
            © 2025 HOLONIC SYSTEMS
          </div>
          <div className="text-right">
            <h4 className="font-bold text-lg tracking-tight">TRUST IS AN ALGORITHM.</h4>
            <p className="text-xs text-white/50 mt-1 max-w-xs">
              We do not rely on reputation. We rely on cryptographic proof and immutable logic.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;