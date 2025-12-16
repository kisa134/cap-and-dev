import { supabase } from '../../lib/supabase';

export interface AgentApplication {
  full_name: string;
  company?: string;
  email: string;
  telegram: string;
  aum?: string;
  region: string;
  client_profile?: string;
  sales_experience?: string;
}

export const agentsService = {
  async submitApplication(data: AgentApplication) {
    const { data: result, error } = await supabase
      .from('agents')
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
      .from('agents')
      .select('status, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
