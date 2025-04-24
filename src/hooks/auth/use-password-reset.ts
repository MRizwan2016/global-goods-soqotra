
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

export function usePasswordReset(users: User[]) {
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

  return { requestPasswordReset, resetPassword };
}
