import React from 'react';
import { transitions } from '../../styles/design-tokens';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const selectStyles = 'bg-black border border-white/20 px-4 py-3 text-white focus:border-white focus:outline-none transition-colors font-mono text-sm appearance-none cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            ${selectStyles}
            ${widthStyles}
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          style={{ transition: transitions.fast }}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1 font-mono">
          {error}
        </p>
      )}
    </div>
  );
};
