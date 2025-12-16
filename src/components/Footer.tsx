import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../constants/content';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show footer when scrolled more than 500px or near bottom
      if (scrolled > 500 || (scrolled + windowHeight) >= documentHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const links = [
    { label: CONTENT.footer.links.aboutUs, path: '/manifesto' },
    { label: CONTENT.footer.links.workWithUs, path: '/work-with-us' },
    { label: CONTENT.footer.links.contacts, path: '/contacts' },
    { label: CONTENT.footer.links.investorLogin, path: '/auth/login?type=investor' },
    { label: CONTENT.footer.links.traderLogin, path: '/auth/login?type=trader' },
  ];

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-40 transition-all duration-300"
      style={{
        animation: 'slideUp 300ms ease-out',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {links.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Legal Info */}
          <div className="flex flex-col items-center md:items-end gap-1">
            <p className="text-xs text-white/30 font-mono">
              {CONTENT.footer.copyright}
            </p>
            <p className="text-xs text-white/20 font-mono">
              {CONTENT.footer.legal}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </footer>
  );
};
