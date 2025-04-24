
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
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      if (password === adminPassword) {
        const adminUser = users.find(user => user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
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

    // Regular user login - using case-insensitive email comparison
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
    
    console.log("Found user:", user?.email);
    
    if (user) {
      console.log("Password check for user:", user.id);
      
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
      } else {
        console.log("Password mismatch");
      }
    } else {
      console.log("No active user found with that email");
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

    // Create new user with all permissions disabled by default
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
          masterData: false,
          salesRep: false,
          town: false,
          item: false,
          packageOptions: false,
          sellingRates: false,
          container: false,
          vessel: false,
          invoiceBook: false,
          driverHelper: false,
          invoicing: false,
          paymentReceivable: false
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

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      toast({
        title: "Password Reset Failed",
        description: "No account found with this email address.",
        variant: "destructive"
      });
      return false;
    }
    
    // Generate a reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetExpiry = Date.now() + 3600000; // 1 hour from now
    
    // Store token in localStorage
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    resetTokens[user.id] = {
      token: resetToken,
      expiry: resetExpiry
    };
    localStorage.setItem("resetTokens", JSON.stringify(resetTokens));
    
    // In a real app, send an email with a link containing the token
    console.log(`Reset token for ${user.email}: ${resetToken}`);
    
    toast({
      title: "Password Reset Requested",
      description: "If this email is registered, you will receive reset instructions. (For demo purposes, check console for reset token)",
    });
    
    return true;
  };

  const resetPassword = async (userId: string, token: string, newPassword: string): Promise<boolean> => {
    // Verify token
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    const tokenData = resetTokens[userId];
    
    if (!tokenData || tokenData.token !== token || Date.now() > tokenData.expiry) {
      toast({
        title: "Password Reset Failed",
        description: "Invalid or expired reset token.",
        variant: "destructive"
      });
      return false;
    }
    
    // Update password
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    userPasswords[userId] = newPassword;
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
    
    // Remove used token
    delete resetTokens[userId];
    localStorage.setItem("resetTokens", JSON.stringify(resetTokens));
    
    toast({
      title: "Password Reset Successful",
      description: "Your password has been updated. You can now log in with your new password.",
    });
    
    return true;
  };

  return {
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword
  };
}
