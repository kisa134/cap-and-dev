import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CONTENT } from '../../constants/content';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Footer } from '../../components/Footer';

export default function WorkWithUs() {
  const navigate = useNavigate();
  const content = CONTENT.workWithUs;

  const columns = [
    {
      ...content.columns.developers,
      path: '/career',
    },
    {
      ...content.columns.agents,
      path: '/agents',
    },
    {
      ...content.columns.referral,
      path: '/referral',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <button
            onClick={() => navigate('/')}
            className="text-xs uppercase tracking-widest font-mono text-white/40 hover:text-white mb-8 transition-colors"
          >
            ← Back
          </button>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-4">
            {content.hero.title}
          </h1>
          <p className="text-white/60 text-lg font-mono tracking-wide uppercase">
            {content.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Three Columns */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column, index) => (
            <Card
              key={index}
              variant="bordered"
              padding="lg"
              hoverable
              className="flex flex-col h-full"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 uppercase tracking-tight">
                  {column.title}
                </h3>
                <p className="text-white/40 text-sm font-mono uppercase tracking-wider mb-6">
                  {column.description}
                </p>
                <p className="text-white/70 leading-relaxed mb-8">
                  {column.text}
                </p>
              </div>
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => navigate(column.path)}
              >
                {column.buttonText}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
