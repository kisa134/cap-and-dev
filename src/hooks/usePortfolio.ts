import { useState, useEffect } from 'react';
import { portfolioService } from '../services/api/portfolioService';
import { Portfolio } from '../types/database.types';

export function usePortfolio(userId: string | undefined) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    portfolioService
      .getPortfolio(userId)
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  return { portfolio, loading, error };
}
