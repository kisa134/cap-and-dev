import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CONTENT } from '../../constants/content';
import { authService } from '../../services/api/authService';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'investor' | 'trader';
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'investor',
}) => {
  const navigate = useNavigate();
  const content = CONTENT.auth.register;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: defaultRole,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      });

      const redirectPath = formData.role === 'investor' ? '/app/investor' : '/app/trader';
      navigate(redirectPath);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={content.title} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label={content.fullName}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
          fullWidth
        />

        <Input
          label={content.email}
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          fullWidth
        />

        <Input
          label={content.password}
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          fullWidth
        />

        <Select
          label={content.role}
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as 'investor' | 'trader' })}
          options={[
            { value: 'investor', label: content.investor },
            { value: 'trader', label: content.trader },
          ]}
          required
          fullWidth
        />

        {error && (
          <div className="border border-red-500/50 bg-red-500/10 px-4 py-3">
            <p className="text-red-400 text-sm font-mono">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <Button type="button" variant="ghost" size="lg" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            {content.submit}
          </Button>
        </div>

        <div className="text-center text-sm text-white/40">
          <span>{content.hasAccount} </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('/auth/login');
            }}
            className="text-white hover:text-emerald-400 transition-colors"
          >
            {content.login}
          </button>
        </div>
      </form>
    </Modal>
  );
};
