import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface CustomerAccount {
  id: string;
  full_name: string;
  email: string;
  mobile_number: string;
  country: string;
  is_active: boolean;
  created_at: string;
}

export const usePortalAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [customerAccount, setCustomerAccount] = useState<CustomerAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const fetchCustomerAccount = async (userId: string) => {
    try {
      const { data } = await supabase
        .from('customer_accounts')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (data) {
        setCustomerAccount(data as CustomerAccount);
        setIsActive(data.is_active);
      } else {
        setCustomerAccount(null);
        setIsActive(false);
      }
    } catch (err) {
      console.error('Error fetching customer account:', err);
      setCustomerAccount(null);
      setIsActive(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchCustomerAccount(session.user.id);
      } else {
        setCustomerAccount(null);
        setIsActive(false);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchCustomerAccount(session.user.id);
      }
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string, fullName: string, mobile: string, country: string) => {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/customer-portal`,
        data: { full_name: fullName }
      }
    });
    
    if (error) return { data, error };

    // Create customer account record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('customer_accounts')
        .insert({
          user_id: data.user.id,
          full_name: fullName,
          email,
          mobile_number: mobile,
          country,
          is_active: false
        });
      
      if (profileError) return { data, error: profileError };
    }

    return { data, error: null };
  };

  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const changePassword = async (newPassword: string) => {
    return supabase.auth.updateUser({ password: newPassword });
  };

  return {
    user,
    customerAccount,
    loading,
    isActive,
    signIn,
    signUp,
    signOut,
    changePassword
  };
};
