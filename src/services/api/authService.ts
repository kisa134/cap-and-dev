import { supabase } from '../../lib/supabase';
import { UserRole } from '../../types/database.types';

export const authService = {
  async signUp(email: string, password: string, role: UserRole, fullName?: string) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('users_profiles')
        .insert([
          {
            id: authData.user.id,
            role,
            full_name: fullName,
            kyc_status: 'pending',
            tier: 'B'
          }
        ]);

      if (profileError) throw profileError;

      if (role === 'investor') {
        await supabase
          .from('portfolios')
          .insert([{ user_id: authData.user.id }]);
      }

      if (role === 'trader') {
        await supabase
          .from('access_rights')
          .insert([{ user_id: authData.user.id }]);
      }
    }

    return authData;
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }
};
