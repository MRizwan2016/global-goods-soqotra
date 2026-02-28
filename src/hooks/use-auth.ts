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

  useEffect(() => {
    loadUsersFromBothSources();
  }, []);

  const loadUsersFromBothSources = async () => {
    try {
      // Load from Supabase
      let supabaseUsers: LegacyUser[] = [];
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at');

        if (!error && profiles) {
          supabaseUsers = profiles.map((profile: any) => ({
            id: profile.user_id,
            fullName: profile.full_name,
            email: profile.email,
            mobileNumber: profile.mobile_number || "",
            country: profile.country || "",
            isActive: profile.is_active,
            isAdmin: profile.is_admin,
            createdAt: profile.created_at,
            permissions: profile.permissions as LegacyUser['permissions']
          }));
        }
      } catch (error) {
        console.error("Error loading profiles");
      }

      // Load from localStorage as fallback (for legacy users only)
      let localStorageUsers: LegacyUser[] = [];
      try {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
          const parsedUsers: LegacyUser[] = JSON.parse(storedUsers);
          if (Array.isArray(parsedUsers) && parsedUsers.length > 0) {
            localStorageUsers = parsedUsers;
          }
        }
      } catch (error) {
        console.error("Error loading from localStorage");
      }

      // Combine users (Supabase takes priority)
      const allUsers = [...supabaseUsers];
      localStorageUsers.forEach(localUser => {
        const existsInSupabase = supabaseUsers.find(su => su.email === localUser.email);
        if (!existsInSupabase) {
          allUsers.push(localUser);
        }
      });

      setUsers(allUsers);

      // Check current session
      const sid = localStorage.getItem('session_user_id');
      if (sid) {
        const existing = allUsers.find((u: LegacyUser) => u.id === sid) || null;
        setLegacyUser(existing);
      }

      // Check if current user is authenticated via Supabase
      if (ctx?.user) {
        const currentProfile = allUsers.find((u: any) => u.id === ctx.user.id);
        if (currentProfile) {
          setLegacyUser(currentProfile);
        }
      }
    } catch (error) {
      console.error("Error loading users");
      setUsers([]);
    } finally {
      setLegacyLoading(false);
    }
  };

  const currentUser = useMemo(() => {
    if (ctx?.user) {
      const profile = users.find(u => u.id === ctx.user.id);
      return profile || mapSupabaseUser(ctx.user);
    }
    return legacyUser;
  }, [ctx?.user, legacyUser, users]);
  
  const isAuthenticated = !!ctx?.user || !!legacyUser;
  const isAdmin = currentUser?.isAdmin ?? false;

  const login = async (email: string, password: string) => {
    const normalizedEmail = (email || '').trim().toLowerCase();

    // First try Supabase authentication
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password: password
      });

      if (!error && data.user) {
        await loadUsersFromBothSources();
        return true;
      }
    } catch (error) {
      // Supabase auth failed, try localStorage fallback
    }

    // localStorage fallback removed for security
    return false;
  };

  const logout = async () => {
    localStorage.removeItem('session_user_id');
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
        console.error("Registration error");
        return false;
      }

      if (data.user) {
        await loadUsersFromBothSources();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Registration error");
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
      const user = users.find(u => u.id === userId);
      if (!user) return;

      const isSupabaseUser = user.id.includes('-') && user.id.length > 20;

      if (isSupabaseUser) {
        const { error } = await supabase
          .from('profiles')
          .update({ is_active: !user.isActive })
          .eq('user_id', userId);

        if (error) {
          console.error("Error updating user status");
          return;
        }
      } else {
        const updatedUsers = users.map(u => 
          u.id === userId ? { ...u, isActive: !u.isActive } : u
        );
        const localUsers = updatedUsers.filter(u => !u.id.includes('-') || u.id.length < 20);
        localStorage.setItem("users", JSON.stringify(localUsers));
      }

      await loadUsersFromBothSources();
    } catch (error) {
      console.error("Error toggling user status");
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

      const isSupabaseUser = user.id.includes('-') && user.id.length > 20;

      if (isSupabaseUser) {
        const { error } = await supabase
          .from('profiles')
          .update({ permissions: updatedPermissions })
          .eq('user_id', userId);

        if (error) {
          console.error("Error updating user permission");
          return;
        }
      } else {
        const updatedUsers = users.map(u => 
          u.id === userId ? { ...u, permissions: updatedPermissions } : u
        );
        const localUsers = updatedUsers.filter(u => !u.id.includes('-') || u.id.length < 20);
        localStorage.setItem("users", JSON.stringify(localUsers));
      }

      await loadUsersFromBothSources();
    } catch (error) {
      console.error("Error toggling user permission");
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

      const isSupabaseUser = user.id.includes('-') && user.id.length > 20;

      if (isSupabaseUser) {
        const { error } = await supabase
          .from('profiles')
          .update({ permissions: updatedPermissions })
          .eq('id', userId);

        if (error) {
          console.error("Error updating file permission");
          return;
        }
      } else {
        const updatedUsers = users.map(u => 
          u.id === userId ? { ...u, permissions: updatedPermissions } : u
        );
        const localUsers = updatedUsers.filter(u => !u.id.includes('-') || u.id.length < 20);
        localStorage.setItem("users", JSON.stringify(localUsers));
      }

      await loadUsersFromBothSources();
    } catch (error) {
      console.error("Error toggling file permission");
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
