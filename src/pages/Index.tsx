
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Always redirect to dashboard, whether authenticated or not
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

export default Index;
