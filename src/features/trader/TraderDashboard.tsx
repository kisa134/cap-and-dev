import React, { useState, useEffect } from 'react';
import { BookOpen, Wrench, TrendingUp, Award, Target, BarChart3 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { coursesService } from '../../services/api/coursesService';
import { propService } from '../../services/api/propService';
import { Course, PropChallenge, AccessRights } from '../../types/database.types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CONTENT } from '../../constants/content';

export const TraderDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [challenge, setChallenge] = useState<PropChallenge | null>(null);
  const [accessRights, setAccessRights] = useState<AccessRights | null>(null);
  const [loading, setLoading] = useState(true);
  const content = CONTENT.trader;

  useEffect(() => {
    if (profile?.id) {
      Promise.all([
        coursesService.getCourses(),
        propService.getActiveChallenge(profile.id),
        propService.getAccessRights(profile.id)
      ])
        .then(([coursesData, challengeData, accessData]) => {
          setCourses(coursesData);
          setChallenge(challengeData);
          setAccessRights(accessData);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading data:', err);
          setLoading(false);
        });
    }
  }, [profile]);

  // Mock equity curve for challenge
  const equityCurve = challenge
    ? Array.from({ length: 15 }, (_, i) => ({
        day: `Day ${i + 1}`,
        pnl: Math.random() * 1000 + challenge.total_pnl / 15 * i
      }))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white font-mono text-sm animate-pulse">LOADING DATA...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tighter mb-2">{content.title}</h1>
        <p className="font-mono text-xs text-white/50">
          Trader: {profile?.full_name} • Status: {accessRights?.prop_challenge_status?.toUpperCase()}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="border border-white/10 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="text-cyan-400" size={24} />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {accessRights?.has_theory_access ? 'Active' : 'Locked'}
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
            {content.theoryAccess}
          </div>
        </div>

        <div className="border border-white/10 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <Wrench className="text-cyan-400" size={24} />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {accessRights?.has_indicators_access ? 'Active' : 'Locked'}
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
            {content.toolsAccess}
          </div>
        </div>

        <div className="border border-white/10 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-emerald-400" size={24} />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            {challenge?.win_rate?.toFixed(1) || '0'}%
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
            Win Rate
          </div>
        </div>

        <div className="border border-white/10 bg-black p-6">
          <div className="flex items-center justify-between mb-4">
            <Award className="text-amber-400" size={24} />
          </div>
          <div className="text-3xl font-bold tracking-tight mb-1">
            ${challenge?.total_pnl?.toLocaleString() || '0'}
          </div>
          <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
            Total P&L
          </div>
        </div>
      </div>

      {/* Prop Challenge Console */}
      {challenge && (
        <div className="border border-cyan-500/30 bg-black p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Prop Trading Challenge</h2>
            <div className={`px-3 py-1 border font-mono text-xs tracking-widest ${
              challenge.status === 'active'
                ? 'border-emerald-500/50 text-emerald-400'
                : challenge.status === 'funded'
                ? 'border-cyan-500/50 text-cyan-400'
                : 'border-white/20 text-white/60'
            }`}>
              {challenge.status.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/50">Winrate</span>
                  <span className="font-bold">{challenge.win_rate.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/50">Max Drawdown</span>
                  <span className="font-bold text-red-400">{challenge.max_drawdown.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/50">Profit Factor</span>
                  <span className="font-bold">{challenge.profit_factor.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="font-mono text-xs text-white/50">Trades Count</span>
                  <span className="font-bold">{challenge.trades_count}</span>
                </div>
              </div>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={equityCurve}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis
                    dataKey="day"
                    stroke="#ffffff40"
                    style={{ fontSize: '10px', fontFamily: 'monospace' }}
                  />
                  <YAxis
                    stroke="#ffffff40"
                    style={{ fontSize: '10px', fontFamily: 'monospace' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000',
                      border: '1px solid #ffffff20',
                      borderRadius: 0
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pnl"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button className="w-full bg-cyan-500 text-black py-3 font-bold tracking-widest uppercase hover:bg-cyan-400 transition-colors">
            {content.submitReport}
          </button>
        </div>
      )}

      {/* Courses */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">{content.courses}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border border-white/10 bg-black p-6 hover:border-cyan-500/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-cyan-400" size={20} />
                <div className={`px-2 py-1 border border-white/20 font-mono text-[10px] tracking-widest text-white/60`}>
                  TIER {course.tier_required}+
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">{course.title}</h3>
              <p className="text-sm text-white/60 mb-4">{course.description}</p>
              <div className="flex items-center justify-between font-mono text-xs text-white/40">
                <span>{course.duration_minutes} minutes</span>
                <span className="text-cyan-400">{content.beginCourse} →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">{content.tools}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-white/10 bg-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="text-emerald-400" size={20} />
              <span className="font-bold">Cogito Indicators</span>
            </div>
            <p className="text-sm text-white/60 mb-4">
              Technical indicators suite for TradingView
            </p>
            <button
              className="w-full border border-white/20 py-2 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
              disabled={!accessRights?.has_indicators_access}
            >
              {accessRights?.has_indicators_access ? content.download : 'Locked'}
            </button>
          </div>

          <div className="border border-white/10 bg-black p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-amber-400" size={20} />
              <span className="font-bold">API Key</span>
            </div>
            <p className="text-sm text-white/60 mb-4">
              API key for terminal integration
            </p>
            {accessRights?.api_key ? (
              <div className="bg-white/5 p-2 font-mono text-xs break-all mb-2">
                {accessRights.api_key}
              </div>
            ) : (
              <button className="w-full border border-white/20 py-2 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                {content.generateKey}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
