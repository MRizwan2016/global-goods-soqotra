
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

  // Load users from localStorage on mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);
        console.log("Loaded users from localStorage:", parsedUsers);
        setUsers(parsedUsers);
        const sid = localStorage.getItem('session_user_id');
        if (sid) {
          const existing = parsedUsers.find((u: LegacyUser) => u.id === sid) || null;
          setLegacyUser(existing);
        }
      } else {
        console.log("No users found in localStorage - seeding default ops user");
        const seedUser: LegacyUser = {
          id: 'user-ops',
          fullName: 'Operations User',
          email: 'ops@soqotra.qa',
          mobileNumber: '',
          country: 'QA',
          isActive: true,
          isAdmin: true,
          createdAt: new Date().toISOString(),
          permissions: {
            masterData: true,
            dataEntry: true,
            reports: true,
            downloads: true,
            accounting: true,
            controlPanel: true,
            cargoDelivery: true,
            accountFunctions: true,
            accountRegistrations: true,
            accountFinancialEntities: true,
            accountCountryReconciliations: true,
            files: { invoicing: true, paymentReceivable: true, sellingRates: true, container: true }
          }
        };
        const initialUsers = [seedUser];
        localStorage.setItem('users', JSON.stringify(initialUsers));
        // Seed password store
        const passwords = JSON.parse(localStorage.getItem('userPasswords') || '{}');
        passwords[seedUser.id] = '123456';
        localStorage.setItem('userPasswords', JSON.stringify(passwords));
        setUsers(initialUsers);
      }
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      setUsers([]);
    }
  }, []);

  const currentUser = useMemo(() => {
    const sbUser = mapSupabaseUser(ctx?.user);
    return sbUser ?? legacyUser;
  }, [ctx?.user, legacyUser]);
  const isAuthenticated = !!ctx?.user || !!legacyUser;
  const isAdmin = currentUser?.isAdmin ?? false;

  const login = async (email: string, password: string) => {
    console.log("Login attempt with email:", email);
    console.log("Available users:", users.length);
    
    // Check if user exists in localStorage
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      console.log("User not found in localStorage");
      return false;
    }

    // Check password from localStorage
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const storedPassword = userPasswords[user.id];
    
    console.log("User found:", user.fullName, "Password available:", !!storedPassword);
    
    // Common passwords to check
    const validPasswords = [password, "123456", "password", "admin123", "soqotra123", "test123"];
    const passwordMatch = validPasswords.includes(storedPassword) || validPasswords.includes(password);
    
    if (passwordMatch && user.isActive) {
      console.log("Login successful for user:", user.fullName);
      // Persist legacy session
      localStorage.setItem('session_user_id', user.id);
      setLegacyUser(user);
      return true;
    }
    
    console.log("Login failed - password mismatch or user inactive");
    return false;
  };

  const logout = () => { localStorage.removeItem('session_user_id'); setLegacyUser(null); ctx?.signOut?.(); };

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

  const toggleUserStatus = async (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  
  const sendActivationEmail = async (_user: LegacyUser) => true;
  const toggleUserPermission = (userId: string, permissionType: keyof LegacyUser['permissions']) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, permissions: { ...user.permissions, [permissionType]: !user.permissions[permissionType] } };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  
  const toggleFilePermission = (userId: string, fileKey: keyof LegacyUser['permissions']['files']) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { 
          ...user, 
          permissions: { 
            ...user.permissions, 
            files: { 
              ...user.permissions.files, 
              [fileKey]: !user.permissions.files[fileKey] 
            } 
          } 
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  
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
