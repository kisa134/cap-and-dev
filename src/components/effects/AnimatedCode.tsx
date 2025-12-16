import { useEffect, useRef, useState } from 'react';

const codeSnippets = [
  'fn calculate_volatility(data: &[f64]) -> f64 {',
  '  let mean = data.iter().sum::<f64>() / data.len() as f64;',
  '  let variance = data.iter().map(|x| (x - mean).powi(2)).sum::<f64>();',
  '  (variance / data.len() as f64).sqrt()',
  '}',
  '',
  'impl OrderBook {',
  '  pub fn update(&mut self, order: Order) {',
  '    match order.side {',
  '      Side::Bid => self.bids.insert(order.price, order.quantity),',
  '      Side::Ask => self.asks.insert(order.price, order.quantity),',
  '    }',
  '  }',
  '}',
  '',
  'let imbalance = (bid_volume - ask_volume) / (bid_volume + ask_volume);',
  'let spread = best_ask - best_bid;',
  'let mid_price = (best_ask + best_bid) / 2.0;',
];

export function AnimatedCode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Array<{ text: string; opacity: number }>>([]);

  useEffect(() => {
    const initialLines = codeSnippets.map((text, index) => ({
      text,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setLines(initialLines);

    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) => ({
          ...line,
          opacity: Math.random() * 0.3 + 0.1,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 w-1/2 h-full overflow-hidden pointer-events-none"
    >
      <div className="relative w-full h-full">
        <pre className="font-mono text-xs md:text-sm text-cyan-400 p-8 leading-relaxed">
          {lines.map((line, index) => (
            <div
              key={index}
              style={{
                opacity: line.opacity,
                transition: 'opacity 2s ease-in-out',
              }}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
        </pre>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0) 100%)',
          }}
        />
      </div>
    </div>
  );
}
