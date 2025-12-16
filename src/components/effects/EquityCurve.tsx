import { useEffect, useRef, useState } from 'react';

export function EquityCurve() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const dataPoints = [
    100, 103, 107, 105, 110, 115, 113, 118, 122, 120,
    125, 130, 128, 135, 140, 138, 145, 150, 148, 155,
    160, 158, 165, 170, 168, 175, 180, 178, 185, 190
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 2s ease-in-out';
        path.style.strokeDashoffset = '0';
      }, 100);
    }
  }, [isVisible]);

  const width = 600;
  const height = 300;
  const padding = 40;

  const xScale = (index: number) =>
    padding + (index / (dataPoints.length - 1)) * (width - 2 * padding);

  const yScale = (value: number) => {
    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);
    return height - padding - ((value - min) / (max - min)) * (height - 2 * padding);
  };

  const pathData = dataPoints
    .map((value, index) => {
      const x = xScale(index);
      const y = yScale(value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto"
      style={{ maxHeight: '300px' }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
        </linearGradient>
      </defs>

      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="#374151"
        strokeWidth="1"
      />
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="#374151"
        strokeWidth="1"
      />

      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="url(#lineGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {dataPoints.map((value, index) => (
        <circle
          key={index}
          cx={xScale(index)}
          cy={yScale(value)}
          r="3"
          fill="#10b981"
          opacity={isVisible ? 1 : 0}
          style={{
            transition: `opacity 0.3s ease-in-out ${index * 0.05}s`,
          }}
        />
      ))}
    </svg>
  );
}
