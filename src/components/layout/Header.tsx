
import { Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useAuth();
  const username = currentUser?.fullName || "Guest";

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
