import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { User, AuthContextType } from "@/types/auth";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { ensureUserPermissions, hasFilePermission as checkFilePermission } from "@/utils/auth-utils";
import { useUserOperations } from "@/hooks/use-user-operations";
import { useAuthOperations } from "@/hooks/use-auth-operations";
import PasswordChangeDialog from "@/components/PasswordChangeDialog";

// Create the context with an undefined initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  // Get user operations
  const { toggleUserStatus, toggleUserPermission, toggleFilePermission } = useUserOperations(users, setUsers);
  
  // Get auth operations
  const { login: baseLogin, logout, register, requestPasswordReset, resetPassword } = useAuthOperations(users, setUsers, setCurrentUser);
  
  // Wrap login to handle first login password change
  const login = async (email: string, password: string): Promise<boolean> => {
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    const success = await baseLogin(email, password);
    
    if (success && user) {
      // Check if it's first login (password is still the initial password)
      const storedPassword = userPasswords[user.id];
      if (password === storedPassword && password === "123456") {
        setIsFirstLogin(true);
        setShowPasswordChange(true);
      }
    }
    
    return success;
  };

  // Load data from localStorage on initial load
  useEffect(() => {
    // Force clear localStorage to fix login issues
    localStorage.removeItem("users");
    localStorage.removeItem("userPasswords");
    localStorage.removeItem("currentUser");
    
    console.log("=== FORCED REINITIALIZATION ===");
    initializeDefaultUsersAndAdmin();
    
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userWithCheckedPermissions = ensureUserPermissions(parsedUser);
        setCurrentUser(userWithCheckedPermissions);
      } catch (error) {
        console.error("Failed to parse current user:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  // Function to initialize the default admin user and test users
  const initializeDefaultUsersAndAdmin = () => {
    const defaultUsers: User[] = [
      {
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
          cargoDelivery: true,
          accountFunctions: true,
          accountRegistrations: true,
          accountFinancialEntities: true,
          accountCountryReconciliations: true,
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
      },
      {
        id: "user-1742197681223",
        fullName: "MOHAMED RIZWAN",
        email: "mzmrizwan2016@gmail.com",
        mobileNumber: "+974 1234 5678",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: true,
          dataEntry: true,
          reports: true,
          downloads: true,
          accounting: true,
          controlPanel: false,
          cargoDelivery: true,
          accountFunctions: false,
          accountRegistrations: false,
          accountFinancialEntities: false,
          accountCountryReconciliations: false,
          files: {}
        }
      },
      {
        id: "user-1744301929974",
        fullName: "MOHAMED JAVED",
        email: "javed@soqotra.com",
        mobileNumber: "+974 2345 6789",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: false,
          dataEntry: true,
          reports: true,
          downloads: false,
          accounting: false,
          controlPanel: false,
          cargoDelivery: true,
          accountFunctions: false,
          accountRegistrations: false,
          accountFinancialEntities: false,
          accountCountryReconciliations: false,
          files: {}
        }
      },
      {
        id: "user-1753610771083",
        fullName: "LAHIRU CHATHURANGA",
        email: "lahiru@soqotra.com",
        mobileNumber: "+974 3456 7890",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: false,
          dataEntry: true,
          reports: false,
          downloads: false,
          accounting: false,
          controlPanel: false,
          cargoDelivery: true,
          accountFunctions: false,
          accountRegistrations: false,
          accountFinancialEntities: false,
          accountCountryReconciliations: false,
          files: {}
        }
      },
      {
        id: "user-1755499093379",
        fullName: "MOHAMED IDRIS MOHAMED",
        email: "gm@almaraamcc.com",
        mobileNumber: "+974 5555 1234",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
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
            profitLoss: true,
            accountFunctionFiles: true,
            accountRegistrationFiles: true,
            accountFinancialFiles: true,
            accountCountryFiles: true
          }
        }
      },
      {
        id: "user-documentation",
        fullName: "DOCUMENTATION USER",
        email: "documentation@almaraamcc.com",
        mobileNumber: "+974 6666 7777",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: false,
          dataEntry: true,
          reports: true,
          downloads: false,
          accounting: false,
          controlPanel: false,
          cargoDelivery: true,
          accountFunctions: false,
          accountRegistrations: false,
          accountFinancialEntities: false,
          accountCountryReconciliations: false,
          files: {}
        }
      },
      {
        id: "user-accounts",
        fullName: "ACCOUNTS USER",
        email: "accounts@almaraamcc.com",
        mobileNumber: "+974 7777 8888",
        country: "Qatar",
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: true,
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
            profitLoss: true,
            accountFunctionFiles: true,
            accountRegistrationFiles: true,
            accountFinancialFiles: true,
            accountCountryFiles: true
          }
        }
      }
    ];
    
    setUsers(defaultUsers);
    localStorage.setItem("users", JSON.stringify(defaultUsers));
    console.log("Initialized with default users:", defaultUsers);
    
    // Set admin password in localStorage
    localStorage.setItem("admin-password", ADMIN_PASSWORD);
    
    // Setup initial userPasswords object with default passwords for all users
    const userPasswords = { 
      "admin-1": ADMIN_PASSWORD,
      "user-1742197681223": "123456", // MOHAMED RIZWAN
      "user-1744301929974": "123456", // MOHAMED JAVED  
      "user-1753610771083": "123456", // LAHIRU CHATHURANGA
      "user-1755499093379": "123456", // MOHAMED IDRIS MOHAMED (GM)
      "user-documentation": "123456", // DOCUMENTATION USER
      "user-accounts": "123456"       // ACCOUNTS USER
    };
    
    // Ensure passwords are accessible immediately
    console.log("Setting up initial user passwords for: ", Object.keys(userPasswords));
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
  };

  // Function to ensure all users have passwords set and are active
  const ensureUserPasswordsExist = () => {
    const currentUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    
    let passwordsUpdated = false;
    let usersUpdated = false;
    
    const updatedUsers = currentUsers.map((user: User) => {
      let updatedUser = { ...user };
      
      // Ensure password exists
      if (!userPasswords[user.id]) {
        if (user.isAdmin) {
          userPasswords[user.id] = ADMIN_PASSWORD;
        } else {
          userPasswords[user.id] = "123456"; // Default password for all users
        }
        passwordsUpdated = true;
        console.log(`Set default password for user: ${user.fullName} (${user.id})`);
      }
      
      // Ensure registered users are active (they should be able to login)
      if (!user.isAdmin && !user.isActive) {
        updatedUser.isActive = true;
        usersUpdated = true;
        console.log(`Activating registered user: ${user.fullName} (${user.id})`);
      }
      
      return updatedUser;
    });
    
    // Force set password for gm@almaraamcc.com if it doesn't exist
    const gmUser = updatedUsers.find((u: User) => u.email === "gm@almaraamcc.com");
    if (gmUser && !userPasswords[gmUser.id]) {
      userPasswords[gmUser.id] = "123456";
      passwordsUpdated = true;
      console.log(`Force set password for GM user: ${gmUser.fullName} (${gmUser.id})`);
    }
    
    if (passwordsUpdated) {
      localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
      console.log("Updated userPasswords:", Object.keys(userPasswords));
    }
    
    if (usersUpdated) {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      console.log("Activated registered users for login");
    }
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

  // Handle password change for first login
  const handlePasswordChange = (newPassword: string) => {
    if (currentUser) {
      const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
      userPasswords[currentUser.id] = newPassword;
      localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
      setIsFirstLogin(false);
      toast.success("Password updated successfully");
    }
  };

  // Provide all the auth context values
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
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

  return (
    <AuthContext.Provider value={value}>
      {children}
      
      {currentUser && (
        <PasswordChangeDialog
          open={showPasswordChange}
          onOpenChange={setShowPasswordChange}
          userEmail={currentUser.email}
          onPasswordChange={handlePasswordChange}
        />
      )}
    </AuthContext.Provider>
  );
};

// Remove duplicate useAuth definition here to prevent conflicts
// The main useAuth hook is defined in @/hooks/use-auth.ts

export type { User } from "@/types/auth";
