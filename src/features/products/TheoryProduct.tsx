import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';

export default function TheoryProduct() {
  const navigate = useNavigate();

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
            Theory Core
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            The First Principles of Market Structure
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            Retail trading education is a multi-billion dollar industry built on selling lagging indicators,
            subjective chart patterns, and recycled platitudes. This approach creates dependency, not proficiency,
            leaving traders vulnerable to market noise and systemic risk.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Promise:</span>{' '}
            Theory Core is not another course; it is a complete epistemological framework for understanding
            price action from first principles. We deconstruct the market into its fundamental components—order flow,
            liquidity, and volatility—to provide you with a mathematical and structural model of price behavior.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            Graduates of this program do not hunt for signals; they engineer alpha-generating systems from the
            ground up. You will receive a comprehensive curriculum delivered via on-demand video modules,
            supplemented with executable code examples (Python/Rust) and access to a private community of
            systematic traders.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="bordered" padding="lg">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
              Who Is This For?
            </h3>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Systematic traders seeking a robust theoretical foundation</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Quantitative analysts transitioning from academia to markets</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Developers building algorithmic trading systems</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Discretionary traders seeking to transition to rules-based methodology</span>
              </li>
            </ul>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
              What You Will Master
            </h3>
            <ul className="space-y-3">
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Market Microstructure & Order Flow Dynamics</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Volatility Modeling & Regime Filtering</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>Liquidity Analysis & Stop-Loss Hunting</span>
              </li>
              <li className="text-white/70 text-sm flex items-start gap-2">
                <span className="text-white/40">—</span>
                <span>System Architecture & Backtesting without Bias</span>
              </li>
            </ul>
          </Card>
        </div>

        <Card variant="bordered" padding="lg" className="mb-16">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
            Format & Delivery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Content</p>
              <p className="text-white text-sm">On-demand video lectures with downloadable code repositories</p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Access</p>
              <p className="text-white text-sm">Lifetime access to all materials and updates</p>
            </div>
            <div className="border-l-2 border-white/20 pl-4">
              <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Community</p>
              <p className="text-white text-sm">Private Discord channel with systematic traders</p>
            </div>
          </div>
        </Card>

        <div className="max-w-2xl mx-auto border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 text-center">
            Pricing & Enrollment
          </h2>
          <Card variant="bordered" padding="lg" className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">Full Access</h4>
                <p className="text-white/60 text-sm">Complete Theory Core curriculum</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white font-mono">$2,997</p>
                <p className="text-white/40 text-xs uppercase tracking-widest font-mono">One-time</p>
              </div>
            </div>
            <ul className="space-y-2 border-t border-white/10 pt-6 mb-8">
              <li className="text-white/70 text-sm flex items-center gap-2">
                <span className="text-white/40">✓</span>
                <span>All video modules and lectures</span>
              </li>
              <li className="text-white/70 text-sm flex items-center gap-2">
                <span className="text-white/40">✓</span>
                <span>Executable code examples (Python & Rust)</span>
              </li>
              <li className="text-white/70 text-sm flex items-center gap-2">
                <span className="text-white/40">✓</span>
                <span>Private Discord community access</span>
              </li>
              <li className="text-white/70 text-sm flex items-center gap-2">
                <span className="text-white/40">✓</span>
                <span>Lifetime access to all future updates</span>
              </li>
            </ul>
            <Button variant="primary" size="lg" fullWidth>
              Enroll Now
            </Button>
          </Card>
          <div className="text-center">
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
