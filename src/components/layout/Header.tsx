
import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  username?: string;
}

const Header = ({ title, username = "Admin User" }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soqotra-green focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{username}</span>
            <div className="w-9 h-9 rounded-full bg-soqotra-blue text-white flex items-center justify-center font-semibold">
              {username.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
