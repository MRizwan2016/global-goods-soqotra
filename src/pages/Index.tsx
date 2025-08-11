
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index page: checking authentication status:", isAuthenticated);
    
    // If authenticated, redirect to dashboard, otherwise to registration (default page)
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    } else {
      console.log("User is not authenticated, redirecting to registration");
      navigate("/admin/register", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default Index;
