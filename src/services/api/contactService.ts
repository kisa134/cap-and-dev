import { supabase } from '../../lib/supabase';

export interface ContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  page_source?: string;
}

export const contactService = {
  async submitContactForm(data: ContactSubmission) {
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([data])
      .select()
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return result;
  },

  async getSubmissionsByEmail(email: string) {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};
