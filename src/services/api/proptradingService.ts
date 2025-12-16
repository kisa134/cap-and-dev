import { supabase } from '../../lib/supabase';

export interface PropTradingApplication {
  full_name: string;
  email: string;
  telegram: string;
  experience_years: string;
  market_specialization: string;
  avg_monthly_return?: number;
  max_drawdown?: number;
  broker_api_key?: string;
  strategy_description?: string;
}

export const proptradingService = {
  async submitApplication(data: PropTradingApplication) {
    const { data: result, error } = await supabase
      .from('proptraders')
      .insert([data])
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return result;
  },

  async getApplicationStatus(email: string) {
    const { data, error } = await supabase
      .from('proptraders')
      .select('status, evaluation_score, allocated_capital, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getApplicationById(id: string) {
    const { data, error } = await supabase
      .from('proptraders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
