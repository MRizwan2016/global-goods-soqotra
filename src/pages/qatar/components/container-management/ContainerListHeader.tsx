
import React from "react";
import { Button } from "@/components/ui/button";
import { Ship } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContainerListHeaderProps {
  filteredContainers: any[];
  entriesPerPage: string;
  setEntriesPerPage: (value: string) => void;
}

const ContainerListHeader: React.FC<ContainerListHeaderProps> = ({
  filteredContainers,
  entriesPerPage,
  setEntriesPerPage
}) => {
  return (
    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
        <Ship className="mr-2 text-soqotra-blue" size={22} />
        View Container List
        <span className="ml-2 text-sm font-normal text-gray-600">
          {filteredContainers.length} Record(s) Listed
        </span>
      </h2>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <Select value={entriesPerPage} onValueChange={setEntriesPerPage}>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="50" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span>entries</span>
        </div>
      </div>
    </div>
  );
};

export default ContainerListHeader;
