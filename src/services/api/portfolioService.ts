import { supabase } from '../../lib/supabase';

export const portfolioService = {
  async getPortfolio(userId: string) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updatePortfolio(userId: string, updates: {
    balance_usdt?: number;
    active_deposits?: number;
    total_earnings?: number;
  }) {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
