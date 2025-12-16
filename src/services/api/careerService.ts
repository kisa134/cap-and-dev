import { supabase } from '../../lib/supabase';

export interface CareerApplication {
  full_name: string;
  email: string;
  telegram: string;
  specialization: string;
  experience_years?: number;
  portfolio_link?: string;
  cv_link?: string;
  motivation?: string;
}

export const careerService = {
  async submitApplication(data: CareerApplication) {
    const { data: result, error } = await supabase
      .from('careers')
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
      .from('careers')
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
