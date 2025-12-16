import React from 'react';
import { colors, transitions } from '../../styles/design-tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  onClick,
}) => {
  const baseStyles = 'bg-black';

  const variantStyles = {
    default: 'border border-white/10',
    elevated: 'border border-white/20 bg-neutral-900',
    bordered: 'border-2 border-white/30',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable
    ? 'cursor-pointer hover:border-white/40 hover:bg-white/5 transition-all'
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${className}
      `}
      style={{ transition: transitions.normal }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
