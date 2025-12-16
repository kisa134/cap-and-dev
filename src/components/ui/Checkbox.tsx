import React from 'react';
import { transitions } from '../../styles/design-tokens';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex items-start gap-3">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className={`
            w-4 h-4 bg-black border border-white/30
            checked:bg-white checked:border-white
            focus:outline-none focus:ring-1 focus:ring-white/50
            cursor-pointer transition-all
            appearance-none
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          style={{ transition: transitions.fast }}
          {...props}
        />
        {props.checked && (
          <svg
            className="absolute w-3 h-3 pointer-events-none"
            fill="none"
            stroke="black"
            strokeWidth="2"
            viewBox="0 0 16 16"
          >
            <path d="M3 8l3 3 7-7" />
          </svg>
        )}
      </div>
      {label && (
        <label className="text-sm text-white/70 leading-tight cursor-pointer select-none">
          {label}
        </label>
      )}
      {error && (
        <p className="text-xs text-red-400 mt-1 font-mono">
          {error}
        </p>
      )}
    </div>
  );
};
