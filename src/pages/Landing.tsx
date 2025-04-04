
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

      {/* Hero Section - Centered content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <img 
            src="/lovable-uploads/a673e02e-b1ad-4d72-96c4-9d7fead8a9a4.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-32 w-auto mx-auto mb-8"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold text-soqotra-navy mb-4">
            SOQOTRA LOGISTICS
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-soqotra-slate mb-12">
            SERVICES, TRANSPORTATION & TRADING WLL
          </h2>
          
          <div className="flex justify-center mt-8">
            <Link to="/admin/login">
              <Button size="lg" className="bg-soqotra-blue hover:bg-blue-600 text-white px-8 py-6 text-lg flex items-center gap-2">
                <LogIn size={22} />
                <span>Login to System</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-soqotra-slate">
        <p>© {new Date().getFullYear()} SOQOTRA LOGISTICS SERVICES. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
