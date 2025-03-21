
import React from "react";
import { Button } from "@/components/ui/button";

interface ContainerPaginationProps {
  entriesPerPage: string;
  setEntriesPerPage: (value: string) => void;
  filteredContainers: any[];
}

const ContainerPagination: React.FC<ContainerPaginationProps> = ({
  entriesPerPage,
  setEntriesPerPage,
  filteredContainers
}) => {
  return (
    <div className="p-3 bg-white border-t border-gray-200 flex justify-between items-center">
      <div>
        Showing 1 to {Math.min(filteredContainers.length, parseInt(entriesPerPage))} of {filteredContainers.length} entries
      </div>
      <div className="flex gap-1">
        <Button variant="outline" size="sm" disabled className="text-sm">Previous</Button>
        <Button variant="default" size="sm" className="bg-blue-600 text-white text-sm">1</Button>
        <Button variant="outline" size="sm" disabled className="text-sm">Next</Button>
      </div>
    </div>
  );
};

export default ContainerPagination;
