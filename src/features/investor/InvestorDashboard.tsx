import React, { useState } from 'react';
import { TrendingUp, DollarSign, PieChart, Activity } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useProducts } from '../../hooks/useProducts';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateEquityCurve } from '../../utils/mockData';

export const InvestorDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { portfolio, loading: portfolioLoading } = usePortfolio(profile?.id);
  const { products, loading: productsLoading } = useProducts();

  const equityData = generateEquityCurve(90, 100000, portfolio?.balance_usdt || 125000);

  const statCards = [
    {
      icon: DollarSign,
      label: 'Текущий Капитал',
      value: `$${portfolio?.balance_usdt?.toLocaleString() || '0'}`,
      color: 'emerald'
    },
    {
      icon: TrendingUp,
      label: 'Активные Инвестиции',
      value: `$${portfolio?.active_deposits?.toLocaleString() || '0'}`,
      color: 'cyan'
    },
    {
      icon: PieChart,
      label: 'Начисленная Прибыль',
      value: `$${portfolio?.total_earnings?.toLocaleString() || '0'}`,
      color: 'amber'
    },
    {
      icon: Activity,
      label: 'ROI',
      value: portfolio?.active_deposits
        ? `${((portfolio.total_earnings / portfolio.active_deposits) * 100).toFixed(1)}%`
        : '0%',
      color: 'emerald'
    }
  ];

  if (portfolioLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white font-mono text-sm animate-pulse">ЗАГРУЗКА ДАННЫХ...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tighter mb-2">ОБЗОР КАПИТАЛА</h1>
        <p className="font-mono text-xs text-white/50">
          Последнее обновление: {new Date().toLocaleString('ru-RU')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="border border-white/10 bg-black p-6 hover:border-white/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`text-${stat.color}-400`} size={24} />
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
                  Live
                </span>
              </div>
              <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
              <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Equity Chart */}
      <div className="border border-white/10 bg-black p-6">
        <h2 className="text-xl font-bold tracking-tight mb-6">Рост Капитала</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={equityData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis
              dataKey="date"
              stroke="#ffffff40"
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
            />
            <YAxis
              stroke="#ffffff40"
              style={{ fontSize: '10px', fontFamily: 'monospace' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#000',
                border: '1px solid #ffffff20',
                borderRadius: 0
              }}
              labelStyle={{ color: '#fff', fontFamily: 'monospace', fontSize: '11px' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#10b981"
              fill="url(#colorValue)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Инвестиционные Продукты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border bg-black p-6 hover:bg-white/5 transition-colors ${
                product.tier === 'S'
                  ? 'border-emerald-500/50'
                  : product.tier === 'A'
                  ? 'border-amber-500/40'
                  : 'border-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`px-3 py-1 border font-mono text-xs tracking-widest ${
                  product.tier === 'S'
                    ? 'border-emerald-500/50 text-emerald-400'
                    : product.tier === 'A'
                    ? 'border-amber-500/40 text-amber-400'
                    : 'border-slate-700 text-slate-400'
                }`}>
                  TIER {product.tier}
                </div>
                <div className="text-2xl font-bold">{product.yield_target}</div>
              </div>
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-sm text-white/60 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="space-y-2 mb-4 font-mono text-xs text-white/40">
                <div>Период блокировки: {product.lock_period_days} дней</div>
                <div>Мин. инвестиция: ${product.min_investment.toLocaleString()}</div>
                <div>Вывод: {product.withdrawal_frequency}</div>
              </div>
              <button className="w-full bg-white text-black py-3 font-bold text-sm tracking-widest uppercase hover:bg-white/90 transition-colors">
                Разместить Депозит
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
