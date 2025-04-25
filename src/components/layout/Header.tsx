
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
    window.location.href = '/dashboard'; // This will refresh and navigate to dashboard
  };

  return (
    <header className="bg-white border-b border-b-[#e6e6e6] py-4 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img 
          src="/lovable-uploads/10e20b91-b031-4e79-840f-238128cec5b4.png" 
          alt="SOQOTRA LOGO" 
          className="h-10 w-auto cursor-pointer"
          onClick={handleLogoClick}
        />
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
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
    </header>
  );
};

export default Header;
