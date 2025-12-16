import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { CONTENT } from '../../constants/content';
import { authService } from '../../services/api/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'investor' | 'trader';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'investor',
}) => {
  const navigate = useNavigate();
  const content = CONTENT.auth.login;

  const [formData, setFormData] = useState({
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
      await authService.login({
        email: formData.email,
        password: formData.password,
      });

      const redirectPath = formData.role === 'investor' ? '/app/investor' : '/app/trader';
      navigate(redirectPath);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = (role: 'investor' | 'trader') => {
    const redirectPath = role === 'investor' ? '/app/investor' : '/app/trader';
    navigate(redirectPath);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={content.title} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          label="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as 'investor' | 'trader' })}
          options={[
            { value: 'investor', label: 'Investor' },
            { value: 'trader', label: 'Trader' },
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

        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-4 font-mono">
            {content.demoTitle}
          </p>
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleDemoAccess('investor')}
            >
              {content.demoInvestor}
              <span className="text-xs text-white/40 ml-2">{content.demoInvestorSub}</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => handleDemoAccess('trader')}
            >
              {content.demoTrader}
              <span className="text-xs text-white/40 ml-2">{content.demoTraderSub}</span>
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
