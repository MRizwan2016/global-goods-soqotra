
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BillOfLadingPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  indexOfFirstEntry: number;
  indexOfLastEntry: number;
  totalEntries: number;
}

const BillOfLadingPagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  indexOfFirstEntry,
  indexOfLastEntry,
  totalEntries
}: BillOfLadingPaginationProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Showing {totalEntries > 0 ? indexOfFirstEntry + 1 : 0} to{" "}
        {Math.min(indexOfLastEntry, totalEntries)} of {totalEntries} entries
      </div>
      
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
        </button>
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default BillOfLadingPagination;
