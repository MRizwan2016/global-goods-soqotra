
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DeliveryPaginationFooterProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstEntry: number;
  indexOfLastEntry: number;
  totalEntries: number;
  setCurrentPage: (page: number) => void;
}

const DeliveryPaginationFooter: React.FC<DeliveryPaginationFooterProps> = ({
  currentPage,
  totalPages,
  indexOfFirstEntry,
  indexOfLastEntry,
  totalEntries,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-2">
      <div className="text-sm text-gray-500">
        Showing {totalEntries > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline" 
          size="sm"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default DeliveryPaginationFooter;
