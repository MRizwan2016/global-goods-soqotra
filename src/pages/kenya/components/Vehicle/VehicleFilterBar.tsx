
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface VehicleFilterBarProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const VehicleFilterBar: React.FC<VehicleFilterBarProps> = ({
  statusFilter,
  setStatusFilter,
  searchText,
  setSearchText,
}) => (
  <div className="flex flex-wrap gap-2 items-center mt-3 md:mt-0">
    <div className="flex items-center gap-2">
      <Button 
        variant={statusFilter === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("all")}
        className="h-8 text-xs"
      >
        All
      </Button>
      <Button 
        variant={statusFilter === "available" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("available")}
        className="h-8 text-xs bg-green-500 hover:bg-green-600 border-green-500"
      >
        Available
      </Button>
      <Button 
        variant={statusFilter === "on-delivery" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("on-delivery")}
        className="h-8 text-xs bg-blue-500 hover:bg-blue-600 border-blue-500"
      >
        On Delivery
      </Button>
      <Button 
        variant={statusFilter === "maintenance" ? "default" : "outline"}
        size="sm"
        onClick={() => setStatusFilter("maintenance")}
        className="h-8 text-xs bg-yellow-500 hover:bg-yellow-600 border-yellow-500"
      >
        Maintenance
      </Button>
    </div>
    <div className="relative ml-auto">
      <Input
        type="text"
        placeholder="Search vehicles..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-9 pr-3 py-1 h-8 border border-gray-300 rounded text-sm w-60"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
    </div>
  </div>
);

export default VehicleFilterBar;
