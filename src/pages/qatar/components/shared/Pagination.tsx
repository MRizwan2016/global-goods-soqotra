
import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  indexOfFirstEntry: number;
  indexOfLastEntry: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  indexOfFirstEntry,
  indexOfLastEntry,
  totalItems,
  currentPage,
  totalPages,
  setCurrentPage
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        Showing {totalItems > 0 ? indexOfFirstEntry + 1 : 0} to {Math.min(indexOfLastEntry, totalItems)} of {totalItems} entries
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          Previous
        </Button>
        <Button 
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
