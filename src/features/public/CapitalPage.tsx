import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';

export default function CapitalPage() {
  const navigate = useNavigate();
  const content = CONTENT.capital;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    capitalSize: '',
    telegram: '',
    disclaimer: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        capitalSize: '',
        telegram: '',
        disclaimer: false
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="border-b border-emerald-500/20 bg-gradient-to-b from-emerald-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-emerald-400">
            {content.hero.title}
          </h1>
          <p className="text-gray-400 text-sm md:text-base tracking-wider uppercase font-mono">
            {content.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vector 30 */}
          <div className="border border-emerald-500/30 rounded-lg p-8 bg-emerald-500/5 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-emerald-400/60 uppercase tracking-wider">
                {content.products.vector30.tier}
              </span>
              <span className="text-xs font-mono text-gray-500">
                {content.products.vector30.variance}
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-2 text-emerald-400">
              {content.products.vector30.name}
            </h3>

            <div className="text-5xl font-bold mb-8 text-white group-hover:text-emerald-300 transition-colors">
              {content.products.vector30.yield}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Lock Period:</span>
                <span className="text-white">{content.products.vector30.lock}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Settlement:</span>
                <span className="text-white">{content.products.vector30.settlement}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Minimum:</span>
                <span className="text-emerald-400">{content.products.vector30.minimum}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {content.products.vector30.description}
            </p>
          </div>

          {/* Vector 60 */}
          <div className="border border-emerald-500/40 rounded-lg p-8 bg-emerald-500/10 hover:border-emerald-500/70 hover:bg-emerald-500/15 transition-all duration-300 group md:scale-105">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-emerald-300/80 uppercase tracking-wider">
                {content.products.vector60.tier}
              </span>
              <span className="text-xs font-mono text-yellow-500">
                {content.products.vector60.variance}
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-2 text-emerald-300">
              {content.products.vector60.name}
            </h3>

            <div className="text-5xl font-bold mb-8 text-white group-hover:text-emerald-200 transition-colors">
              {content.products.vector60.yield}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Lock Period:</span>
                <span className="text-white">{content.products.vector60.lock}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Settlement:</span>
                <span className="text-white">{content.products.vector60.settlement}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Minimum:</span>
                <span className="text-emerald-300">{content.products.vector60.minimum}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {content.products.vector60.description}
            </p>
          </div>

          {/* Vector Alpha */}
          <div className="border border-purple-500/40 rounded-lg p-8 bg-gradient-to-br from-purple-500/10 via-emerald-500/10 to-cyan-500/10 hover:border-purple-500/70 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-emerald-500/0 to-cyan-500/0 group-hover:from-purple-500/20 group-hover:via-emerald-500/20 group-hover:to-cyan-500/20 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                  {content.products.vectorAlpha.tier}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">
                  {content.products.vectorAlpha.variance}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {content.products.vectorAlpha.name}
              </h3>

              <div className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {content.products.vectorAlpha.yield}
              </div>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Lock Period:</span>
                  <span className="text-white">{content.products.vectorAlpha.lock}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Settlement:</span>
                  <span className="text-white">{content.products.vectorAlpha.settlement}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Minimum:</span>
                  <span className="text-purple-400">{content.products.vectorAlpha.minimum}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {content.products.vectorAlpha.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="text-emerald-400 font-mono text-sm tracking-[0.3em] uppercase">
              {content.form.title}
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit} className="border border-emerald-500/30 rounded-lg p-8 bg-emerald-500/5 space-y-6">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.fullName}
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-black border border-emerald-500/30 rounded px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.email}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-black border border-emerald-500/30 rounded px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.capitalSize}
            </label>
            <select
              required
              value={formData.capitalSize}
              onChange={(e) => setFormData({ ...formData, capitalSize: e.target.value })}
              className="w-full bg-black border border-emerald-500/30 rounded px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
            >
              <option value="">Select range</option>
              {content.form.capitalOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.telegram}
            </label>
            <input
              type="text"
              required
              value={formData.telegram}
              onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
              className="w-full bg-black border border-emerald-500/30 rounded px-4 py-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder="@username"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              checked={formData.disclaimer}
              onChange={(e) => setFormData({ ...formData, disclaimer: e.target.checked })}
              className="mt-1 w-4 h-4 bg-black border border-emerald-500/30 rounded focus:ring-emerald-500"
            />
            <label className="text-sm text-gray-400">
              {content.form.disclaimer}
            </label>
          </div>

          {submitted && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 rounded p-4 text-emerald-300 text-sm">
              {content.form.success}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-4 rounded transition-all duration-300 transform hover:scale-[1.02]"
          >
            {content.form.submit}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-400 font-semibold py-3 rounded transition-all duration-300"
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
