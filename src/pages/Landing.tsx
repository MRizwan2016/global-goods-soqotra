
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Package, Ship, Truck } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/soqotra-logo.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-12 w-auto mr-3"
          />
          <h1 className="text-2xl font-bold text-white hidden md:block">SOQOTRA LOGISTICS</h1>
        </div>
        <div>
          <Link to="/admin/login">
            <Button variant="outline" className="bg-white hover:bg-blue-50 text-blue-900 flex items-center gap-2">
              <LogIn size={18} />
              <span>Login</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className={`transform transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <img 
            src="/soqotra-logo.png" 
            alt="SOQOTRA LOGISTICS" 
            className="h-32 w-auto mx-auto mb-6 animate-pulse"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="block animate-fade-in">SOQOTRA LOGISTICS</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl font-medium text-blue-100 mb-8 opacity-90">
            <span className="block transition-all duration-1000 delay-300 transform 
              ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
              SERVICES, TRANSPORTATION & TRADING WLL
            </span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <Link to="/admin/login">
              <Button className="bg-white hover:bg-blue-50 text-blue-900 flex items-center gap-2 text-lg px-6 py-6">
                <LogIn size={20} />
                <span>Login to System</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className={`py-12 px-6 transition-all duration-1000 delay-500 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-white text-center">
              <Ship className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Shipping Services</h3>
              <p className="text-blue-100">Efficient shipping solutions for all your logistics needs. We handle cargo globally.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-white text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Container Management</h3>
              <p className="text-blue-100">Complete container tracking and management systems for operational efficiency.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all">
            <CardContent className="p-6 text-white text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-xl font-bold mb-2">Logistics Solutions</h3>
              <p className="text-blue-100">End-to-end logistics solutions including transportation, storage and delivery.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-blue-200 bg-blue-950">
        <p>© {new Date().getFullYear()} SOQOTRA LOGISTICS SERVICES. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
