import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';

export default function ToolsProduct() {
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
            Terminal Tools
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            Institutional-Grade Indicator Suite
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            The indicators included with standard charting platforms (RSI, MACD, Stochastics) are lagging by
            design and have been fully arbitraged for decades. Relying on them for execution is equivalent to
            navigating with a 19th-century map.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Promise:</span>{' '}
            Our Terminal Tools suite provides direct access to the proprietary, predictive indicators our own
            desk uses for execution and risk management. These are not repainting "signal" toys; they are
            real-time instruments that model liquidity, order flow imbalance, and volatility structure.
          </p>
          <p>
            <span className="text-white/40 font-mono uppercase text-xs tracking-widest">Fact:</span>{' '}
            This is a live, non-repainting toolkit that integrates directly with TradingView via a private
            invitation. The suite includes API access for automated system development and is accompanied by
            detailed documentation on the mathematical basis and practical application of each indicator.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold uppercase tracking-tight mb-8">
          Indicator Showcase
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Volatility Cone
            </h3>
            <p className="text-white/70 text-sm">
              Predictive volatility forecasting based on historical distribution analysis and regime detection.
            </p>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Order Flow Imbalance
            </h3>
            <p className="text-white/70 text-sm">
              Real-time tracking of aggressive market orders to identify institutional positioning.
            </p>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Liquidity Delta
            </h3>
            <p className="text-white/70 text-sm">
              Measures absorption and exhaustion at key price levels using volume profile analysis.
            </p>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Regime Filter
            </h3>
            <p className="text-white/70 text-sm">
              Algorithmic identification of trending vs. mean-reverting market conditions.
            </p>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Smart Money Index
            </h3>
            <p className="text-white/70 text-sm">
              Tracks divergence between price action and underlying accumulation/distribution patterns.
            </p>
          </Card>

          <Card variant="bordered" padding="lg">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 text-white">
              Microstructure Scanner
            </h3>
            <p className="text-white/70 text-sm">
              Real-time detection of spoofing, layering, and other high-frequency manipulation tactics.
            </p>
          </Card>
        </div>

        <Card variant="bordered" padding="lg" className="mb-16">
          <h3 className="text-2xl font-bold uppercase tracking-tight mb-6 text-white">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Platform</p>
                <p className="text-white text-sm">TradingView (Invite-Only Script)</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">API Access</p>
                <p className="text-white text-sm">REST & WebSocket endpoints</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Data Feeds</p>
                <p className="text-white text-sm">Real-time, Tier 1 market data</p>
              </div>
              <div className="border-l-2 border-white/20 pl-4">
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">Update Frequency</p>
                <p className="text-white text-sm">Tick-by-tick (&lt; 100ms latency)</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="max-w-2xl mx-auto border-t border-white/10 pt-16">
          <h2 className="text-3xl font-bold uppercase tracking-tight mb-8 text-center">
            Subscription Tiers
          </h2>

          <div className="space-y-6">
            <Card variant="bordered" padding="lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Professional</h4>
                  <p className="text-white/60 text-sm">TradingView indicators only</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white font-mono">$297</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Per month</p>
                </div>
              </div>
              <Button variant="secondary" size="lg" fullWidth>
                Get Access
              </Button>
            </Card>

            <Card variant="bordered" padding="lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Institutional</h4>
                  <p className="text-white/60 text-sm">Full suite + API access</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white font-mono">$997</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Per month</p>
                </div>
              </div>
              <Button variant="primary" size="lg" fullWidth>
                Get Access
              </Button>
            </Card>
          </div>

          <div className="text-center mt-8">
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
