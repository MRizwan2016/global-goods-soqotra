import { useContext, useMemo, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/contexts/AuthContext";
import type { AuthContextType as LegacyAuthContextType, User as LegacyUser } from "@/types/auth";

function mapSupabaseUser(user: any): LegacyUser | null {
  if (!user) return null;
  const email = user.email || "";
  const name = email.split("@")[0];
  const now = new Date().toISOString();
  return {
    id: user.id,
    fullName: name,
    email,
    mobileNumber: "",
    country: "",
    isActive: true,
    isAdmin: false,
    createdAt: now,
    permissions: {
      masterData: false,
      dataEntry: true,
      reports: true,
      downloads: true,
      accounting: true,
      controlPanel: false,
      cargoDelivery: true,
      accountFunctions: true,
      accountRegistrations: true,
      accountFinancialEntities: true,
      accountCountryReconciliations: true,
      files: {}
    }
  } as LegacyUser;
}

export function useAuth(): LegacyAuthContextType {
  const ctx = useContext(AuthContext) as any;
  const [users, setUsers] = useState<LegacyUser[]>([]);
  const [legacyUser, setLegacyUser] = useState<LegacyUser | null>(null);
  const [legacyLoading, setLegacyLoading] = useState<boolean>(true);

  // Load users from Supabase instead of localStorage
  useEffect(() => {
    loadUsersFromSupabase();
  }, []);

  const loadUsersFromSupabase = async () => {
    try {
      console.log("Loading users from Supabase...");
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at');

      if (error) {
        console.error("Error loading profiles from Supabase:", error);
        return;
      }

      console.log("Loaded profiles from Supabase:", profiles);

      const supabaseUsers: LegacyUser[] = profiles.map((profile: any) => ({
        id: profile.id,
        fullName: profile.full_name,
        email: profile.email,
        mobileNumber: profile.mobile_number || "",
        country: profile.country || "",
        isActive: profile.is_active,
        isAdmin: profile.is_admin,
        createdAt: profile.created_at,
        permissions: profile.permissions as LegacyUser['permissions']
      }));

      setUsers(supabaseUsers);
      console.log("Mapped users:", supabaseUsers);

      // Check if current user is authenticated via Supabase
      if (ctx?.user) {
        const currentProfile = profiles.find((p: any) => p.id === ctx.user.id);
        if (currentProfile) {
          setLegacyUser({
            id: currentProfile.id,
            fullName: currentProfile.full_name,
            email: currentProfile.email,
            mobileNumber: currentProfile.mobile_number || "",
            country: currentProfile.country || "",
            isActive: currentProfile.is_active,
            isAdmin: currentProfile.is_admin,
            createdAt: currentProfile.created_at,
            permissions: currentProfile.permissions as LegacyUser['permissions']
          });
        }
      }
    } catch (error) {
      console.error("Error loading users from Supabase:", error);
      setUsers([]);
    } finally {
      setLegacyLoading(false);
    }
  };

  const currentUser = useMemo(() => {
    const sbUser = mapSupabaseUser(ctx?.user);
    return sbUser ?? legacyUser;
  }, [ctx?.user, legacyUser]);
  
  const isAuthenticated = !!ctx?.user || !!legacyUser;
  const isAdmin = currentUser?.isAdmin ?? false;

  const login = async (email: string, password: string) => {
    const normalizedEmail = (email || '').trim().toLowerCase();
    console.log("Login attempt with email:", normalizedEmail);

    try {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password
      });

      if (error) {
        console.error("Supabase auth error:", error);
        return false;
      }

      if (data.user) {
        console.log("Login successful for user:", data.user.email);
        await loadUsersFromSupabase(); // Reload users after login
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    setLegacyUser(null);
    await supabase.auth.signOut();
  };

  const register: LegacyAuthContextType["register"] = async ({ fullName, email, password, country, mobileNumber }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        console.error("Registration error:", error);
        return false;
      }

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: fullName,
              email: email,
              mobile_number: mobileNumber,
              country: country,
              is_admin: false,
              permissions: {
                masterData: false,
                dataEntry: true,
                reports: true,
                downloads: true,
                accounting: true,
                controlPanel: false,
                cargoDelivery: true,
                accountFunctions: true,
                accountRegistrations: true,
                accountFinancialEntities: true,
                accountCountryReconciliations: true,
                files: {}
              }
            }
          ]);

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }

        await loadUsersFromSupabase();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const requestPasswordReset = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/reset-password`
    });
    return !error;
  };

  const resetPassword = async (_userId: string, _token: string, newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return !error;
  };

  const toggleUserStatus = async (userId: string) => {
    try {
      // Find the user in current users array
      const user = users.find(u => u.id === userId);
      if (!user) return;

      // Update in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ is_active: !user.isActive })
        .eq('id', userId);

      if (error) {
        console.error("Error updating user status:", error);
        return;
      }

      // Reload users from Supabase
      await loadUsersFromSupabase();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };
  
  const sendActivationEmail = async (_user: LegacyUser) => true;
  
  const toggleUserPermission = async (userId: string, permissionType: keyof LegacyUser['permissions']) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const updatedPermissions = {
        ...user.permissions,
        [permissionType]: !user.permissions[permissionType]
      };

      const { error } = await supabase
        .from('profiles')
        .update({ permissions: updatedPermissions })
        .eq('id', userId);

      if (error) {
        console.error("Error updating user permission:", error);
        return;
      }

      await loadUsersFromSupabase();
    } catch (error) {
      console.error("Error toggling user permission:", error);
    }
  };
  
  const toggleFilePermission = async (userId: string, fileKey: keyof LegacyUser['permissions']['files']) => {
    try {
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const updatedPermissions = {
        ...user.permissions,
        files: {
          ...user.permissions.files,
          [fileKey]: !user.permissions.files[fileKey]
        }
      };

      const { error } = await supabase
        .from('profiles')
        .update({ permissions: updatedPermissions })
        .eq('id', userId);

      if (error) {
        console.error("Error updating file permission:", error);
        return;
      }

      await loadUsersFromSupabase();
    } catch (error) {
      console.error("Error toggling file permission:", error);
    }
  };
  
  const hasFilePermission = (_user: LegacyUser | null, _fileKey: keyof LegacyUser['permissions']['files']) => true;

  return {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading: (ctx?.loading ?? false) || legacyLoading,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    users,
    toggleUserStatus,
    sendActivationEmail,
    toggleUserPermission,
    toggleFilePermission,
    hasFilePermission,
  } as LegacyAuthContextType;
}