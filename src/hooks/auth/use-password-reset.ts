
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
    
    // Check if user is active
    if (!user.isActive) {
      toast({
        title: "Account Inactive",
        description: "Your account is not active. Please contact an administrator.",
        variant: "destructive"
      });
      return false;
    }
    
    // Generate a reset token
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetExpiry = Date.now() + 3600000; // 1 hour from now
    
    // Store token in localStorage
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    resetTokens[user.id] = {
      token: resetToken,
      expiry: resetExpiry
    };
    localStorage.setItem("resetTokens", JSON.stringify(resetTokens));
    
    // Create reset URL
    const resetUrl = `${window.location.origin}/admin/reset-password?userId=${user.id}&token=${resetToken}`;
    
    // Simulate sending email
    console.log(`Reset URL for ${user.email}: ${resetUrl}`);
    
    // For demonstration, we'll simulate email sending
    const emailSent = await simulateEmailSending(user.email, resetUrl);
    
    if (emailSent) {
      toast({
        title: "Password Reset Email Sent",
        description: `A password reset link has been sent to ${user.email}. Please check your inbox and spam folder.`,
      });
      
      // For demo purposes, also show the reset link in console and toast
      setTimeout(() => {
        toast({
          title: "Demo: Reset Link",
          description: `For testing, the reset link is: ${resetUrl}`,
          duration: 15000,
        });
      }, 2000);
      
      return true;
    } else {
      toast({
        title: "Email Send Failed",
        description: "There was an error sending the reset email. Please try again later.",
        variant: "destructive"
      });
      return false;
    }
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

// Simulate email sending function
async function simulateEmailSending(email: string, resetUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, we'll always return true
      // In a real application, this would integrate with an email service like:
      // - EmailJS
      // - SendGrid
      // - AWS SES
      // - Nodemailer (if you have a backend)
      
      console.log(`Simulated email sent to: ${email}`);
      console.log(`Email content would include: ${resetUrl}`);
      
      // Simulate successful email sending
      resolve(true);
    }, 1500);
  });
}
