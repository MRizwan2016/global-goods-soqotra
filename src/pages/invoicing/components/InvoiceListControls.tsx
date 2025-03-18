
import React from "react";
import { Search } from "lucide-react";

interface InvoiceListControlsProps {
  searchText: string;
  setSearchText: (value: string) => void;
}

const InvoiceListControls: React.FC<InvoiceListControlsProps> = ({
  searchText,
  setSearchText,
}) => {
  return (
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
  );
};

export default InvoiceListControls;
