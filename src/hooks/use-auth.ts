
import { useContext, useMemo } from "react";
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

  const currentUser = useMemo(() => mapSupabaseUser(ctx?.user), [ctx?.user]);
  const isAuthenticated = !!ctx?.user;
  const isAdmin = currentUser?.isAdmin ?? false;

  const login = async (email: string, password: string) => {
    const { error } = await ctx?.signIn?.(email, password);
    return !error;
  };

  const logout = () => ctx?.signOut?.();

  const register: LegacyAuthContextType["register"] = async ({ fullName, email, password, country, mobileNumber }) => {
    const { error } = await ctx?.signUp?.(email, password);
    return !error;
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

  const users: LegacyUser[] = [];
  const toggleUserStatus = async (_userId: string) => {};
  const sendActivationEmail = async (_user: LegacyUser) => true;
  const toggleUserPermission = (_userId: string, _permissionType: keyof LegacyUser['permissions']) => {};
  const toggleFilePermission = (_userId: string, _fileKey: keyof LegacyUser['permissions']['files']) => {};
  const hasFilePermission = (_user: LegacyUser | null, _fileKey: keyof LegacyUser['permissions']['files']) => true;

  return {
    currentUser,
    isAuthenticated,
    isAdmin,
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
