
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  country: string;
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt"> & { password: string }) => Promise<boolean>;
  users: User[];
  toggleUserStatus: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin user
const ADMIN_EMAIL = "admin@soqotra.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load data from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedUsers = localStorage.getItem("users");

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with admin user if no users exist
      const adminUser: User = {
        id: "admin-1",
        fullName: "System Administrator",
        email: ADMIN_EMAIL,
        mobileNumber: "+974 5555 5555",
        country: "Qatar",
        isActive: true,
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      
      setUsers([adminUser]);
      localStorage.setItem("users", JSON.stringify([adminUser]));
      
      // Also store admin password separately
      localStorage.setItem("admin-password", ADMIN_PASSWORD);
    }
  }, []);

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

  const login = async (email: string, password: string): Promise<boolean> => {
    // Special case for admin
    if (email === ADMIN_EMAIL) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      if (password === adminPassword) {
        const adminUser = users.find(user => user.email === ADMIN_EMAIL);
        if (adminUser) {
          setCurrentUser(adminUser);
          toast({
            title: "Login Successful",
            description: "Welcome, Administrator!",
          });
          return true;
        }
      }
    }

    // Regular user login - in a real app, this would be an API call
    // Here we're simulating by checking against our users array
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email === email && u.isActive);
    
    if (user && userPasswords[user.id] === password) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt"> & { password: string }): Promise<boolean> => {
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered.",
        variant: "destructive"
      });
      return false;
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      country: userData.country,
      isActive: false, // Users start inactive until approved by admin
      isAdmin: false,
      createdAt: new Date().toISOString()
    };

    // Store user password separately (in real app, would be hashed)
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    userPasswords[newUser.id] = userData.password;
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));

    // Add to users list
    setUsers(prev => [...prev, newUser]);
    
    toast({
      title: "Registration Successful",
      description: "Your account is pending approval by an administrator.",
    });
    
    return true;
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: !user.isActive } 
          : user
      )
    );

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: `User ${user.isActive ? "Deactivated" : "Activated"}`,
        description: `${user.fullName}'s account has been ${user.isActive ? "deactivated" : "activated"}.`,
      });
      
      // In a real app, this would trigger an email to the user
      console.log(`Email sent to ${user.email} notifying them that their account is now ${!user.isActive ? "active" : "inactive"}`);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
    login,
    logout,
    register,
    users,
    toggleUserStatus
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
