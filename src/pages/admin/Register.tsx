
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  mobileNumber: z.string().min(8, { message: "Please enter a valid mobile number" }),
  country: z.string().min(1, { message: "Please select a country" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      country: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const { confirmPassword, ...userData } = values;
      const success = await register({
        email: userData.email,
        fullName: userData.fullName,
        password: userData.password,
        mobileNumber: userData.mobileNumber,
        country: userData.country
      });
      
      if (success) {
        navigate("/admin/login", { 
          state: { 
            message: "Registration successful! Please wait for admin approval to access your account." 
          }
        });
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const countries = [
    "Qatar", "Saudi Arabia", "UAE", "Kuwait", "Bahrain", "Oman",
    "Egypt", "Jordan", "Lebanon", "Syria", "Iraq", "Yemen",
    "Other"
  ];

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
      
      {/* Registration form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            CREATE ACCOUNT
          </h2>
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your mobile number" {...field} />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.error && (
                      <p className="text-sm text-red-500">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
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
                {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
              </Button>
              
              <div className="text-center pt-2">
                <Link to="/admin/login" className="text-blue-500 hover:underline">
                  Already have an account? Login here
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
