import React from 'react';
import { colors, transitions } from '../../styles/design-tokens';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-mono uppercase tracking-widest transition-all inline-flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 border border-white',
    secondary: 'bg-black text-white border border-white/20 hover:border-white/60 hover:bg-white/5',
    ghost: 'bg-transparent text-white/60 border border-transparent hover:text-white hover:bg-white/5',
    accent: 'bg-transparent text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/10 hover:border-emerald-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${(disabled || loading) ? disabledStyles : ''}
        ${widthStyles}
        ${className}
      `}
      disabled={disabled || loading}
      style={{ transition: transitions.normal }}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
