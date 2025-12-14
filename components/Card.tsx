import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  isInteractive?: boolean;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children, className = '', isInteractive = false }) => {
  return (
    <div className={`
      border border-white/20 bg-black p-8 
      ${isInteractive ? 'hover:bg-white hover:text-black transition-colors duration-300 group cursor-default' : ''}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="mb-6 border-b border-white/20 pb-4 group-hover:border-black/20">
          {subtitle && (
            <span className="block font-mono text-xs tracking-widest uppercase mb-1 opacity-60 group-hover:opacity-100">
              {subtitle}
            </span>
          )}
          {title && (
            <h3 className="text-2xl font-bold tracking-tight uppercase">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="font-light">
        {children}
      </div>
    </div>
  );
};

export default Card;