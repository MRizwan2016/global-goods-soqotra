
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";

const Header = ({ title }: { title: string }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  const handleLogoClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <header className="relative bg-gradient-to-r from-white to-gray-50 border-b border-b-[#e6e6e6] py-6 px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-5 bg-[url('/lovable-uploads/81322d22-b18c-4569-ae70-12c21928d063.png')] 
        bg-center bg-cover mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="relative flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8 flex-1">
          <img 
            src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
            alt="SOQOTRA LOGO" 
            className="h-16 w-auto cursor-pointer transition-transform hover:scale-105"
            onClick={handleLogoClick}
          />
          <h1 className="text-2xl font-semibold text-gray-900 tracking-wide text-center flex-1">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              onClick={handleLogin}
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
