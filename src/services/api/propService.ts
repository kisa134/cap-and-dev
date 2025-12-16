import { supabase } from '../../lib/supabase';
import { ChallengeStatus } from '../../types/database.types';

export const propService = {
  async getPropChallenges(userId: string) {
    const { data, error } = await supabase
      .from('prop_challenges')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getActiveChallenge(userId: string) {
    const { data, error } = await supabase
      .from('prop_challenges')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['active', 'funded'])
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createChallenge(userId: string) {
    const { data, error } = await supabase
      .from('prop_challenges')
      .insert([
        {
          user_id: userId,
          status: 'active' as ChallengeStatus,
          start_date: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateChallengeMetrics(
    challengeId: string,
    metrics: {
      win_rate?: number;
      max_drawdown?: number;
      profit_factor?: number;
      total_pnl?: number;
      trades_count?: number;
    }
  ) {
    const { data, error } = await supabase
      .from('prop_challenges')
      .update(metrics)
      .eq('id', challengeId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAccessRights(userId: string) {
    const { data, error } = await supabase
      .from('access_rights')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  async generateApiKey(userId: string) {
    const apiKey = `cogito_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const { data, error } = await supabase
      .from('access_rights')
      .update({ api_key: apiKey })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
