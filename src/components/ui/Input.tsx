import React from 'react';
import { colors, transitions } from '../../styles/design-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputStyles = 'bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/30 focus:border-white focus:outline-none transition-colors font-mono text-sm';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
          {label}
        </label>
      )}
      <input
        className={`
          ${inputStyles}
          ${widthStyles}
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        style={{ transition: transitions.fast }}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400 mt-1 font-mono">
          {error}
        </p>
      )}
    </div>
  );
};
