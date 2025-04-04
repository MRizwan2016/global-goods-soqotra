
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    
    // Set loaded state for animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f0f7ff] text-center">
      {/* Logo section at the top */}
      <div className="w-full pt-10">
        <div className="flex justify-center">
          <img 
            src="/lovable-uploads/bd08a72d-ffa3-4e82-8e5b-e915483b5fea.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-20 w-auto"
          />
        </div>
      </div>

      {/* Middle section with the example screenshot */}
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6">
          <img 
            src="/lovable-uploads/bd08a72d-ffa3-4e82-8e5b-e915483b5fea.png" 
            alt="SOQOTRA INTERFACE" 
            className="max-w-xs md:max-w-md lg:max-w-lg shadow-lg rounded-md border border-gray-200 mb-8"
          />
        </div>
        
        {/* Company Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#3366FF] mb-4 uppercase">
          SOQOTRA LOGISTICS
        </h1>
        
        {/* Company Subtitle */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-8 uppercase">
          SERVICES, TRANSPORTATION &amp; TRADING WLL
        </h2>
        
        {/* Login Button */}
        <Link to="/login">
          <Button 
            size="lg" 
            className="bg-[#3366FF] hover:bg-blue-600 text-white py-5 px-8 text-lg flex items-center gap-2 rounded-md"
          >
            <LogIn size={20} />
            <span className="uppercase">LOGIN TO SYSTEM</span>
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="p-6 text-gray-600">
        <p>© 2025 SOQOTRA LOGISTICS SERVICES. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default Landing;
