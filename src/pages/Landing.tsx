
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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-blue-50 to-gray-100 text-center">
      {/* Logo section */}
      <div className="w-full pt-10 animate-fade-in">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/b4cd42be-7824-4f8b-a647-00c816cc0045.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-24 w-auto hover-scale pulse-animation"
          />
        </div>
      </div>

      {/* Main Content Section */}
      <div className={`transform transition-all duration-1000 flex flex-col items-center ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Dashboard Preview Image */}
        <div className="mb-8 hover-scale float-animation">
          <img 
            src="/lovable-uploads/10c60ae9-cab7-47d0-bc0e-cf57d5845442.png" 
            alt="SOQOTRA DASHBOARD" 
            className="max-w-md shadow-lg rounded-md border border-gray-200"
          />
        </div>
        
        {/* Company Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#3366FF] mb-4 animate-fade-in uppercase">
          SOQOTRA LOGISTICS
        </h1>
        
        {/* Company Subtitle */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-8 animate-fade-in uppercase">
          SERVICES, TRANSPORTATION & TRADING WLL
        </h2>
        
        {/* Login Button */}
        <Link to="/login" className="hover-scale">
          <Button 
            size="lg" 
            className="bg-[#3366FF] hover:bg-blue-600 text-white py-6 px-8 text-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105 pulse-animation uppercase"
          >
            <LogIn size={24} />
            <span>LOGIN TO SYSTEM</span>
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="p-6 text-gray-600 w-full uppercase">
        <p>© {new Date().getFullYear()} SOQOTRA LOGISTICS SERVICES. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default Landing;
