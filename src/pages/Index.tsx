
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Index page: checking authentication status:", isAuthenticated);
    // If authenticated, redirect to dashboard, otherwise to login
    if (isAuthenticated) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate("/dashboard");
    } else {
      console.log("User is not authenticated, redirecting to login");
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default Index;
