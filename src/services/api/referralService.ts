import { supabase } from '../../lib/supabase';

export interface ReferralRegistration {
  full_name: string;
  email: string;
  telegram: string;
  professional_background?: string;
  linkedin_url?: string;
  user_id?: string;
}

export const referralService = {
  async registerReferral(data: ReferralRegistration) {
    const { data: result, error } = await supabase
      .from('referrals')
      .insert([{ ...data, referral_code: '' }])
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return result;
  },

  async getReferralByCode(code: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('referral_code', code)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async getReferralByEmail(email: string) {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async incrementReferralCount(referralCode: string) {
    const { data, error } = await supabase
      .from('referrals')
      .update({ total_referrals: supabase.raw('total_referrals + 1') })
      .eq('referral_code', referralCode)
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
