
import { useState } from "react";
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { ensureUserPermissions } from "@/utils/auth-utils";

export function useAuthOperations(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", email);
    
    // Special case for admin
    if (email === ADMIN_EMAIL) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      if (password === adminPassword) {
        const adminUser = users.find(user => user.email === ADMIN_EMAIL);
        if (adminUser) {
          console.log("Admin login successful");
          setCurrentUser(adminUser);
          localStorage.setItem("currentUser", JSON.stringify(adminUser));
          toast({
            title: "Login Successful",
            description: "Welcome, Administrator!",
          });
          return true;
        }
      }
    }

    // Regular user login - first check for exact email match
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
    
    console.log("Found user:", user);
    
    if (user) {
      console.log("Password check:", userPasswords[user.id] === password);
      
      if (userPasswords[user.id] === password) {
        // Ensure user has all required permissions properly set up
        const userWithPermissions = ensureUserPermissions(user);
        setCurrentUser(userWithPermissions);
        localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.fullName}!`,
        });
        return true;
      }
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }): Promise<boolean> => {
    // Check if email already exists (case-insensitive comparison)
    if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered.",
        variant: "destructive"
      });
      return false;
    }

    // Create new user with default permissions
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      country: userData.country,
      isActive: false,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      permissions: {
        masterData: false,
        dataEntry: false,
        reports: false,
        downloads: false,
        accounting: false,
        controlPanel: false,
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
          paymentReceivable: true
        }
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
    
    console.log("User registered:", newUser);
    console.log("Updated users list:", updatedUsers);
    
    toast({
      title: "Registration Successful",
      description: "Your account is pending approval by an administrator.",
    });
    
    return true;
  };

  return {
    login,
    logout,
    register
  };
}
