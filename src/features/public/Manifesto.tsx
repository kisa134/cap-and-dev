import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';

export default function Manifesto() {
  const navigate = useNavigate();
  const content = CONTENT.manifesto;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        <div className="max-w-7xl w-full space-y-16">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {content.title}
            </h1>
            <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
          </div>

          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Capital */}
            <div className="space-y-6 p-8 border border-emerald-500/20 rounded-lg bg-emerald-500/5 hover:border-emerald-500/40 transition-all duration-300">
              <h2 className="text-2xl font-bold text-emerald-400 tracking-wide">
                {content.capital.title}
              </h2>
              <div className="space-y-3 text-gray-300 leading-relaxed">
                {content.capital.content.map((line, idx) => (
                  <p key={idx} className={line === "" ? "h-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Center Column - Mission */}
            <div className="space-y-6 p-8 border border-purple-500/30 rounded-lg bg-purple-500/10 hover:border-purple-500/50 transition-all duration-300 lg:scale-105">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-purple-400 to-cyan-400 bg-clip-text tracking-wide">
                {content.mission.title}
              </h2>
              <div className="space-y-3 text-gray-200 leading-relaxed text-lg">
                {content.mission.content.map((line, idx) => (
                  <p key={idx} className={line === "" ? "h-3" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column - Episteme */}
            <div className="space-y-6 p-8 border border-cyan-500/20 rounded-lg bg-cyan-500/5 hover:border-cyan-500/40 transition-all duration-300">
              <h2 className="text-2xl font-bold text-cyan-400 tracking-wide">
                {content.episteme.title}
              </h2>
              <div className="space-y-3 text-gray-300 leading-relaxed">
                {content.episteme.content.map((line, idx) => (
                  <p key={idx} className={line === "" ? "h-2" : ""}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Regulatory Footer */}
          <div className="text-center space-y-6 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              {content.regulatory}
            </p>
            <div className="flex justify-center gap-8">
              {content.badges.map((badge) => (
                <div
                  key={badge}
                  className="px-6 py-3 border border-gray-700 rounded-lg bg-gray-900/50 text-gray-300 font-mono text-sm tracking-wider hover:border-gray-600 transition-colors"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center pt-8">
            <button
              onClick={() => navigate('/')}
              className="px-12 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg font-semibold text-lg hover:from-emerald-500 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
            >
              {content.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
