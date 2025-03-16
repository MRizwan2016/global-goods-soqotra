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
  permissions: {
    masterData: boolean;
    dataEntry: boolean;
    reports: boolean;
    downloads: boolean;
  };
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }) => Promise<boolean>;
  users: User[];
  toggleUserStatus: (userId: string) => Promise<void>;
  sendActivationEmail: (user: User) => Promise<boolean>;
  toggleUserPermission: (userId: string, permissionType: keyof User['permissions']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default admin user
const ADMIN_EMAIL = "admin@soqotra.com";
const ADMIN_PASSWORD = "admin123";

// Email service configuration - using EmailJS
const EMAIL_SERVICE_URL = "https://api.emailjs.com/api/v1.0/email/send";
const EMAIL_SERVICE_ID = "service_demo"; // Replace with your EmailJS service ID
const EMAIL_TEMPLATE_ID = "template_activation"; // Replace with your EmailJS template ID
const EMAIL_USER_ID = "user_demo"; // Replace with your EmailJS user ID

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
      console.log("Loaded users from localStorage:", JSON.parse(storedUsers)); // Debug log
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
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: true,
          dataEntry: true,
          reports: true,
          downloads: true
        }
      };
      
      setUsers([adminUser]);
      localStorage.setItem("users", JSON.stringify([adminUser]));
      console.log("Initialized with admin user:", [adminUser]); // Debug log
      
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

  const register = async (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }): Promise<boolean> => {
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
      createdAt: new Date().toISOString(),
      permissions: {
        masterData: false,
        dataEntry: false,
        reports: false,
        downloads: false
      }
    };

    // Store user password separately (in real app, would be hashed)
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    userPasswords[newUser.id] = userData.password;
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));

    // Add to users list and update localStorage
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    console.log("User registered:", newUser); // Debug log
    console.log("Updated users list:", updatedUsers); // Debug log
    
    toast({
      title: "Registration Successful",
      description: "Your account is pending approval by an administrator.",
    });
    
    return true;
  };

  const sendActivationEmail = async (user: User): Promise<boolean> => {
    try {
      // Using EmailJS service to send email
      const response = await fetch(EMAIL_SERVICE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAIL_SERVICE_ID,
          template_id: EMAIL_TEMPLATE_ID,
          user_id: EMAIL_USER_ID,
          template_params: {
            to_name: user.fullName,
            to_email: user.email,
            status: user.isActive ? "activated" : "deactivated",
            login_url: window.location.origin + "/login",
          },
        }),
      });

      if (response.ok) {
        console.log(`Email sent to ${user.email} notifying them that their account is now ${user.isActive ? "active" : "inactive"}`);
        return true;
      } else {
        console.error("Failed to send email:", await response.text());
        return false;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  };

  const toggleUserStatus = async (userId: string) => {
    // Find the user first so we can get their current status
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    // New status will be the opposite of current status
    const newStatus = !userToUpdate.isActive;
    
    // Update the users array
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, isActive: newStatus } 
          : user
      )
    );

    // Show toast notification
    toast({
      title: `User ${newStatus ? "Activated" : "Deactivated"}`,
      description: `${userToUpdate.fullName}'s account has been ${newStatus ? "activated" : "deactivated"}.`,
    });
    
    // If the user is being activated, send an email
    if (newStatus) {
      const emailSent = await sendActivationEmail({...userToUpdate, isActive: newStatus});
      
      if (emailSent) {
        toast({
          title: "Email Notification Sent",
          description: `An email has been sent to ${userToUpdate.email} regarding their account activation.`,
        });
      } else {
        toast({
          title: "Email Notification Failed",
          description: "Could not send email notification. Please try again later.",
          variant: "destructive"
        });
      }
    }
  };

  const toggleUserPermission = (userId: string, permissionType: keyof User['permissions']) => {
    // Find the user
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) return;

    // Update the user's permissions
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const updatedPermissions = {
            ...user.permissions,
            [permissionType]: !user.permissions[permissionType]
          };
          return {
            ...user,
            permissions: updatedPermissions
          };
        }
        return user;
      })
    );

    // Show toast notification
    toast({
      title: `Permission Updated`,
      description: `${userToUpdate.fullName}'s access to ${permissionType} has been ${!userToUpdate.permissions[permissionType] ? 'granted' : 'revoked'}.`,
    });
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.isAdmin || false,
    login,
    logout,
    register,
    users,
    toggleUserStatus,
    sendActivationEmail,
    toggleUserPermission
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
