
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  filteredDataLength: number;
  indexOfFirstEntry: number;
  indexOfLastEntry: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
  filteredDataLength,
  indexOfFirstEntry,
  indexOfLastEntry
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm text-gray-500">
        Showing {filteredDataLength > 0 ? indexOfFirstEntry + 1 : 0} to{" "}
        {Math.min(indexOfLastEntry, filteredDataLength)} of {filteredDataLength} entries
      </div>
      
      <div className="flex gap-2">
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-[#33C3F0] hover:text-white hover:border-[#33C3F0] transition-colors"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
        </button>
        <button
          className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 hover:bg-[#33C3F0] hover:text-white hover:border-[#33C3F0] transition-colors"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
