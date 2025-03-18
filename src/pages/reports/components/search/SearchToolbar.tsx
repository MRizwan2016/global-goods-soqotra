
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchToolbarProps {
  searchText: string;
  setSearchText: (value: string) => void;
  searchField: string;
  setSearchField: (value: string) => void;
  entriesPerPage?: number;
}

const SearchToolbar: React.FC<SearchToolbarProps> = ({
  searchText,
  setSearchText,
  searchField,
  setSearchField,
  entriesPerPage = 50
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Show</span>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors">
          <option>{entriesPerPage}</option>
          <option>100</option>
          <option>200</option>
        </select>
        <span className="text-sm text-gray-500">entries</span>
      </div>
      
      <div className="flex grow items-center gap-2 ml-auto">
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm hover:border-blue-400 transition-colors"
        >
          <option value="all">All Fields</option>
          <option value="invoiceNumber">Invoice Number</option>
          <option value="shipperName">Shipper Name</option>
          <option value="shipperMobile">Shipper Mobile</option>
          <option value="consigneeName">Consignee Name</option>
          <option value="consigneeMobile">Consignee Mobile</option>
        </select>
        
        <div className="relative grow">
          <Input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="pl-9 pr-3 py-1 h-8 text-sm w-full focus:ring-2 focus:ring-blue-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
        </div>
      </div>
    </div>
  );
};

export default SearchToolbar;
