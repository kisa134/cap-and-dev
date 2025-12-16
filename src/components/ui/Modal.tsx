import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { transitions } from '../../styles/design-tokens';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      style={{
        animation: 'fadeIn 200ms ease-out',
      }}
    >
      <div
        className={`bg-black border border-white/20 p-8 w-full ${sizeStyles[size]} relative`}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideIn 300ms ease-out',
        }}
      >
        {title && (
          <div className="mb-6 border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-white font-mono">
              {title}
            </h2>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          style={{ transition: transitions.fast }}
        >
          <X size={24} />
        </button>

        <div className="relative">
          {children}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
