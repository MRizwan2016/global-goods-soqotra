
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    setError(null);
    setIsLoading(true);
    try {
      const success = await requestPasswordReset(values.email);
      if (success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Password reset error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with logo and company name */}
      <div className="bg-[#1976d2] text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <img 
            src="/lovable-uploads/SOQO_NEW_LOGO.jpeg"
            alt="Soqotra Logo" 
            className="h-20 mx-auto mb-4 bg-white p-2 rounded"
          />
          <h1 className="text-3xl font-bold mb-1">SOQOTRA LOGISTICS SERVICES</h1>
          <p className="text-xl">TRANSPORTATION & TRADING WLL.</p>
        </div>
      </div>
      
      {/* Forgot Password form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {isSubmitted ? "CHECK YOUR EMAIL" : "FORGOT PASSWORD"}
          </h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                <p>If an account exists with this email, you will receive password reset instructions.</p>
                <p className="mt-2">Check your email inbox and spam folder.</p>
              </div>
              <Button 
                asChild
                className="mt-4 bg-[#1976d2] hover:bg-blue-600"
              >
                <Link to="/login">Return to Login</Link>
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-700 block mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-500">
                      <User size={20} />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              id="email"
                              placeholder="Enter your email address" 
                              className="pl-10 py-6" 
                              {...field}
                            />
                          </FormControl>
                          {fieldState.error && (
                            <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-6 bg-[#1976d2] hover:bg-blue-600 text-white text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "SENDING..." : "RESET PASSWORD"}
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

export default ForgotPassword;
