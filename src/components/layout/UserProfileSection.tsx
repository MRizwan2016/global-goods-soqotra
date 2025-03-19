
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Separator } from "@/components/ui/separator";

const UserProfileSection = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="p-4 border-t border-sky-200 bg-gradient-to-r from-sky-50 to-green-50">
      {currentUser ? (
        <div className="flex flex-col space-y-3 animate-fade-in">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-soqotra-green flex items-center justify-center text-white font-medium mr-3 hover-scale shadow-sm">
              {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{currentUser.fullName || 'User'}</span>
              <span className="text-xs text-gray-500">{currentUser.isAdmin ? 'Administrator' : 'User'}</span>
            </div>
          </div>
          <Separator />
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-gray-600 hover:text-rose-600 transition-colors duration-300 hover-scale group"
          >
            <LogOut className="mr-2 h-4 w-4 group-hover:rotate-[-15deg] transition-transform duration-300" />
            Log out
          </button>
        </div>
      ) : (
        <button
          onClick={() => navigate("/admin/login")}
          className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300 hover-scale group"
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:rotate-[-15deg] transition-transform duration-300" />
          Log in
        </button>
      )}
    </div>
  );
};

export default UserProfileSection;
