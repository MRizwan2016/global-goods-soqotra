
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
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/a673e02e-b1ad-4d72-96c4-9d7fead8a9a4.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-12 w-auto mr-3"
          />
        </div>
        <div>
          <Link to="/admin/login">
            <Button variant="outline" className="bg-white hover:bg-gray-50 text-soqotra-navy border-soqotra-navy">
              <LogIn size={18} className="mr-2" />
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <div className={`transform transition-all duration-1000 max-w-3xl ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Dashboard Preview Image */}
          <div className="mb-12 flex justify-center">
            <img 
              src="/lovable-uploads/10c60ae9-cab7-47d0-bc0e-cf57d5845442.png" 
              alt="SOQOTRA Dashboard" 
              className="max-w-md shadow-lg rounded-md border border-gray-200"
            />
          </div>
          
          {/* Company Name - Large */}
          <h1 className="text-4xl md:text-6xl font-bold text-soqotra-blue mb-4">
            SOQOTRA LOGISTICS
          </h1>
          
          {/* Company Tagline */}
          <h2 className="text-xl md:text-2xl font-medium text-gray-600 mb-12">
            SERVICES, TRANSPORTATION & TRADING WLL
          </h2>
          
          {/* Login Button - Prominent */}
          <div className="flex justify-center mt-8">
            <Link to="/admin/login">
              <Button size="lg" className="bg-soqotra-blue hover:bg-blue-700 text-white px-8 py-6 text-lg flex items-center gap-2">
                <LogIn size={22} />
                <span>Login to System</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-600">
        <p>© {new Date().getFullYear()} SOQOTRA LOGISTICS SERVICES. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
