import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';

export default function EpistemePage() {
  const navigate = useNavigate();
  const content = CONTENT.episteme;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    experience: '',
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
        experience: '',
        telegram: '',
        disclaimer: false
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-cyan-400">
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
          {/* Theory Core */}
          <div className="border border-cyan-500/30 rounded-lg p-8 bg-cyan-500/5 hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-cyan-400/60 uppercase tracking-wider">
                Course
              </span>
              <span className="text-xs font-mono text-gray-500">
                {content.products.theory.access}
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-2 text-cyan-400">
              {content.products.theory.name}
            </h3>

            <div className="text-xl font-semibold mb-8 text-gray-300 group-hover:text-cyan-300 transition-colors">
              {content.products.theory.subtitle}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Duration:</span>
                <span className="text-white">{content.products.theory.duration}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Access Level:</span>
                <span className="text-cyan-400">{content.products.theory.access}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              {content.products.theory.description}
            </p>
          </div>

          {/* Terminal Tools */}
          <div className="border border-cyan-500/40 rounded-lg p-8 bg-cyan-500/10 hover:border-cyan-500/70 hover:bg-cyan-500/15 transition-all duration-300 group md:scale-105">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono text-cyan-300/80 uppercase tracking-wider">
                Software
              </span>
              <span className="text-xs font-mono text-yellow-500">
                {content.products.tools.access}
              </span>
            </div>

            <h3 className="text-3xl font-bold mb-2 text-cyan-300">
              {content.products.tools.name}
            </h3>

            <div className="text-xl font-semibold mb-8 text-gray-300 group-hover:text-cyan-200 transition-colors">
              {content.products.tools.subtitle}
            </div>

            <div className="space-y-3 mb-8 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Platform:</span>
                <span className="text-white">{content.products.tools.platform}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Access Level:</span>
                <span className="text-cyan-300">{content.products.tools.access}</span>
              </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
              {content.products.tools.description}
            </p>
          </div>

          {/* Proprietary Fund */}
          <div className="border border-purple-500/40 rounded-lg p-8 bg-gradient-to-br from-purple-500/10 via-cyan-500/10 to-emerald-500/10 hover:border-purple-500/70 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-emerald-500/0 group-hover:from-purple-500/20 group-hover:via-cyan-500/20 group-hover:to-emerald-500/20 transition-all duration-700" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono text-purple-300 uppercase tracking-wider">
                  Challenge
                </span>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  {content.products.prop.access}
                </span>
              </div>

              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                {content.products.prop.name}
              </h3>

              <div className="text-xl font-semibold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {content.products.prop.subtitle}
              </div>

              <div className="space-y-3 mb-8 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Type:</span>
                  <span className="text-white">{content.products.prop.evaluation}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Access Level:</span>
                  <span className="text-purple-400">{content.products.prop.access}</span>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {content.products.prop.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase">
              {content.form.title}
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit} className="border border-cyan-500/30 rounded-lg p-8 bg-cyan-500/5 space-y-6">
          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.fullName}
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-black border border-cyan-500/30 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
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
              className="w-full bg-black border border-cyan-500/30 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-400 mb-2 uppercase tracking-wider">
              {content.form.experience}
            </label>
            <select
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full bg-black border border-cyan-500/30 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            >
              <option value="">Select experience level</option>
              {content.form.experienceOptions.map((option) => (
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
              className="w-full bg-black border border-cyan-500/30 rounded px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
              placeholder="@username"
            />
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              required
              checked={formData.disclaimer}
              onChange={(e) => setFormData({ ...formData, disclaimer: e.target.checked })}
              className="mt-1 w-4 h-4 bg-black border border-cyan-500/30 rounded focus:ring-cyan-500"
            />
            <label className="text-sm text-gray-400">
              {content.form.disclaimer}
            </label>
          </div>

          {submitted && (
            <div className="bg-cyan-500/20 border border-cyan-500/50 rounded p-4 text-cyan-300 text-sm">
              {content.form.success}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-semibold py-4 rounded transition-all duration-300 transform hover:scale-[1.02]"
          >
            {content.form.submit}
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full border border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 font-semibold py-3 rounded transition-all duration-300"
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
