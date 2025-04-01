
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface BillOfLadingFiltersProps {
  origin: string;
  setOrigin: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  cargoType: string;
  setCargoType: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  searchText: string;
  setSearchText: (value: string) => void;
}

const BillOfLadingFilters = ({
  origin,
  setOrigin,
  destination,
  setDestination,
  cargoType,
  setCargoType,
  status,
  setStatus,
  searchText,
  setSearchText,
}: BillOfLadingFiltersProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 w-full">
        <select 
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ALL">ALL ORIGINS</option>
          <option value="Doha">DOHA</option>
          <option value="Dubai">DUBAI</option>
          <option value="Colombo">COLOMBO</option>
          <option value="Jeddah">JEDDAH</option>
        </select>
        
        <select 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ALL">ALL DESTINATIONS</option>
          <option value="Colombo">COLOMBO</option>
          <option value="Nairobi">NAIROBI</option>
          <option value="Dubai">DUBAI</option>
          <option value="Mogadishu">MOGADISHU</option>
          <option value="Port Sudan">PORT SUDAN</option>
        </select>
        
        <select 
          value={cargoType}
          onChange={(e) => setCargoType(e.target.value)}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ALL">ALL CARGO TYPES</option>
          <option value="Personal Effects">PERSONAL EFFECTS</option>
          <option value="Household Goods">HOUSEHOLD GOODS</option>
          <option value="Car">CAR</option>
          <option value="Truck">TRUCK</option>
        </select>
        
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
        >
          <option value="ALL">ALL STATUSES</option>
          <option value="Shipped">SHIPPED</option>
          <option value="In Transit">IN TRANSIT</option>
          <option value="Delivered">DELIVERED</option>
        </select>
        
        <Link to="/data-entry/bill-of-lading/new" className="ml-auto">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Add New
          </Button>
        </Link>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>50</option>
            <option>100</option>
            <option>200</option>
          </select>
          <span className="text-sm text-gray-500">entries</span>
        </div>
        
        <div className="relative ml-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9 pr-3 py-1 border border-gray-300 rounded text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
        </div>
      </div>
    </>
  );
};

export default BillOfLadingFilters;
