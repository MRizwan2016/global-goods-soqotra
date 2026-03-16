
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  const userId = searchParams.get('userId');
  const token = searchParams.get('token');

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    // Validate token on component mount
    if (!userId || !token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    // Check if token is valid
    const resetTokens = JSON.parse(localStorage.getItem("resetTokens") || "{}");
    const tokenData = resetTokens[userId];
    
    if (!tokenData || tokenData.token !== token || Date.now() > tokenData.expiry) {
      setError("This reset link has expired or is invalid. Please request a new password reset.");
      return;
    }

    setIsValidToken(true);
  }, [userId, token]);

  const onSubmit = async (values: ResetPasswordValues) => {
    if (!userId || !token || !isValidToken) {
      setError("Invalid reset parameters.");
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      const success = await resetPassword(userId, token, values.password);
      if (success) {
        navigate("/login", { 
          state: { 
            message: "Password reset successful! You can now log in with your new password." 
          }
        });
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("An error occurred while resetting your password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#1976d2] text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png"
            alt="Soqotra Logo" 
            className="h-20 mx-auto mb-4 bg-white p-2 rounded"
          />
          <h1 className="text-3xl font-bold mb-1">SOQOTRA LOGISTICS SERVICES</h1>
          <p className="text-xl">TRANSPORTATION & TRADING WLL.</p>
        </div>
      </div>
      
      {/* Reset Password form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            RESET PASSWORD
          </h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!isValidToken ? (
            <div className="text-center">
              <Button asChild className="mt-4 bg-[#1976d2] hover:bg-blue-600">
                <Link to="/forgot-password">Request New Reset Link</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Enter your new password" 
                          {...field} 
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-sm text-red-500">{fieldState.error.message}</p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Confirm your new password" 
                          {...field} 
                        />
                      </FormControl>
                      {fieldState.error && (
                        <p className="text-sm text-red-500">{fieldState.error.message}</p>
                      )}
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-[#1976d2] hover:bg-blue-600 text-white text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "RESETTING PASSWORD..." : "RESET PASSWORD"}
                </Button>
                
                <div className="text-center pt-2">
                  <Link to="/login" className="text-blue-500 hover:underline">
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
