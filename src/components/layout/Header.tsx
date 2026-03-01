
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
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    window.location.href = '/dashboard';
  };

  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1">
          <img 
            src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
            alt="SOQOTRA LOGO" 
            className="h-12 w-auto cursor-pointer transition-opacity hover:opacity-80"
            onClick={handleLogoClick}
          />
          <h1 className="text-lg font-semibold text-[#1e2a3a] tracking-wide">
            {title}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2 text-slate-500 hover:text-[#1e2a3a] hover:bg-slate-100"
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
