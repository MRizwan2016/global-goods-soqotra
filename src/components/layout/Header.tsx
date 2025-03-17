
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const username = currentUser?.fullName || "Guest";

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800 transition-all duration-300 hover:text-soqotra-green">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soqotra-green focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{username}</span>
            <div className="w-9 h-9 rounded-full bg-soqotra-green text-white flex items-center justify-center font-semibold shadow-md transition-transform duration-300 hover:scale-105">
              {username.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
