
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const auth = useAuth();
  const { login, isAuthenticated, users } = auth || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [browserInfo, setBrowserInfo] = useState<string>("");

  // Get the redirect path from the location state, or default to admin panel
  const from = location.state?.from?.pathname || "/dashboard";

  // Gather browser information for debugging
  useEffect(() => {
    const info = `Browser: ${navigator.userAgent}, Platform: ${navigator.platform}, Screen: ${window.screen.width}x${window.screen.height}, Date: ${new Date().toISOString()}`;
    setBrowserInfo(info);
    console.log("Login page loaded with browser info:", info);
    
    // Also log localStorage size for debugging
    const localStorageSize = new TextEncoder().encode(
      Object.entries(localStorage)
        .map(([k, v]) => k + v)
        .join('')
    ).length;
    console.log(`LocalStorage usage: ${(localStorageSize / 1024).toFixed(2)} KB`);
    
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User is authenticated, navigating to:", from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Debug: Log available users when component mounts
  useEffect(() => {
    console.log("Available users for login:", users.map(u => ({
      id: u.id,
      email: u.email,
      isActive: u.isActive
    })));
    
    // Debug: Check password store
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    console.log("User passwords available for IDs:", Object.keys(userPasswords));
  }, [users]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setError(null);
    setIsLoading(true);
    try {
      console.log(`Login attempt: ${values.email} with browser info: ${browserInfo}`);
      
      // Check if user exists
      const user = users.find(u => u.email.toLowerCase() === values.email.toLowerCase() && u.isActive);
      if (user) {
        console.log(`Found user: ${user.fullName} (${user.id})`);
      } else {
        console.log(`No user found with email: ${values.email}`);
      }
      
      const success = await login(values.email, values.password);
      if (success) {
        console.log("Login successful, navigating to:", from);
        // Navigate to the redirect path or default
        navigate(from, { replace: true });
      } else {
        console.log("Login failed");
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 bg-[url('/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png')] bg-no-repeat bg-center bg-contain opacity-10 blur-sm"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 to-indigo-600/10 z-0"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl z-0"></div>
      
      {/* Glass container */}
      <div className="w-full max-w-md relative z-10 backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 p-8 overflow-hidden">
        {/* Decorative elements inside the container */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
        
        {/* Logo and header */}
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
            alt="Soqotra Logo" 
            className="h-24 mx-auto mb-6 drop-shadow-lg animate-fade-in"
          />
          <h1 className="text-2xl font-bold text-white mb-1 animate-fade-in">SOQOTRA LOGISTICS SERVICES</h1>
          <p className="text-white/80 text-sm animate-fade-in">TRANSPORTATION & TRADING WLL.</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-500/20 border-red-500/50 text-white">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <label htmlFor="email" className="text-white/90 text-sm font-medium ml-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/80">
                  <User size={18} />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          id="email"
                          placeholder="Enter your email" 
                          className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-500 focus-visible:border-blue-500" 
                          {...field} 
                          autoComplete="username"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <label htmlFor="password" className="text-white/90 text-sm font-medium ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/80">
                  <Lock size={18} />
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                            {...field}
                            autoComplete="current-password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/70 hover:text-white"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium rounded-md shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </Button>
            
            <div className="text-center pt-4">
              <Link to="/admin/forgot-password" className="text-blue-300 hover:text-blue-200 hover:underline font-medium text-sm transition-colors">
                Forgot Password?
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
