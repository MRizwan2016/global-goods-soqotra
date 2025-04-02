import React, { createContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { User, AuthContextType } from "@/types/auth";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { ensureUserPermissions, hasFilePermission as checkFilePermission } from "@/utils/auth-utils";
import { useUserOperations } from "@/hooks/use-user-operations";
import { useAuthOperations } from "@/hooks/use-auth-operations";

// Create the context with an undefined initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Get user operations
  const { toggleUserStatus, toggleUserPermission, toggleFilePermission } = useUserOperations(users, setUsers);
  
  // Get auth operations
  const { login, logout, register } = useAuthOperations(users, setUsers, setCurrentUser);

  // Load data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(ensureUserPermissions(parsedUser));
      } catch (error) {
        console.error("Failed to parse current user:", error);
        localStorage.removeItem("currentUser");
      }
    }
    
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        
        const updatedUsers = parsedUsers.map((user: any) => ensureUserPermissions(user));
        
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        console.log("Loaded users from localStorage:", updatedUsers);
      } catch (error) {
        console.error("Failed to parse users:", error);
        initializeDefaultAdmin();
      }
    } else {
      initializeDefaultAdmin();
    }
  }, []);

  // Function to initialize the default admin user
  const initializeDefaultAdmin = () => {
    const adminUser: User = {
      id: "admin-1",
      fullName: "System Administrator",
      email: ADMIN_EMAIL,
      mobileNumber: "+974 5555 5555",
      country: "Qatar",
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
        files: {
          salesRep: true,
          town: true,
          item: true,
          packageOptions: true,
          sellingRates: true,
          container: true,
          vessel: true,
          invoiceBook: true,
          driverHelper: true,
          invoicing: true,
          paymentReceivable: true,
          loadContainer: true,
          loadVessel: true,
          loadAirCargo: true,
          packingList: true,
          cargoReports: true,
          financialReports: true,
          shippingReports: true,
          paymentMethods: true,
          reconciliation: true,
          profitLoss: true
        }
      }
    };
    
    setUsers([adminUser]);
    localStorage.setItem("users", JSON.stringify([adminUser]));
    console.log("Initialized with admin user:", [adminUser]);
    
    localStorage.setItem("admin-password", ADMIN_PASSWORD);
  };

  // Save users to localStorage whenever they change
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Function to check if a user has permission for a specific file
  const hasFilePermission = (user: User | null, fileKey: keyof User['permissions']['files']): boolean => {
    return checkFilePermission(user, fileKey);
  };

  // Provide all the auth context values
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
    login,
    logout,
    register,
    users,
    toggleUserStatus,
    sendActivationEmail: async (user: User) => {
      const { sendActivationEmail } = await import('@/utils/auth-utils');
      return sendActivationEmail(user);
    },
    toggleUserPermission,
    toggleFilePermission,
    hasFilePermission
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type { User } from "@/types/auth";
