import { useState, useEffect } from 'react';
import { authService } from '../services/api/authService';
import { UserProfile } from '../types/database.types';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser().then(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userProfile = await authService.getUserProfile(currentUser.id);
          setProfile(userProfile);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
      setLoading(false);
    });

    const { data: authListener } = authService.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          try {
            const userProfile = await authService.getUserProfile(session.user.id);
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    loading,
    signOut: authService.signOut
  };
}
