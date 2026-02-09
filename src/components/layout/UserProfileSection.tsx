
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const UserProfileSection = () => {
  const navigate = useNavigate();
  const { currentUser, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const handleLogin = () => {
    navigate("/admin/login");
  };

  return (
    <div className="p-4 border-t border-[#2a3a4e] bg-[#182232]">
      {currentUser ? (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white text-sm font-medium mr-3">
              {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200">{currentUser.fullName || 'User'}</span>
              <span className="text-xs text-slate-500">{currentUser.isAdmin ? 'Administrator' : 'User'}</span>
            </div>
          </div>
          <Separator className="bg-[#2a3a4e]" />
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center justify-start text-sm text-slate-400 hover:text-red-400 hover:bg-[#253549] transition-colors duration-200 p-0 m-0 h-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          onClick={handleLogin}
          className="flex items-center justify-start text-sm text-slate-400 hover:text-white hover:bg-[#253549] transition-colors duration-200 p-0 m-0 h-auto w-full"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Log in
        </Button>
      )}
    </div>
  );
};

export default UserProfileSection;
