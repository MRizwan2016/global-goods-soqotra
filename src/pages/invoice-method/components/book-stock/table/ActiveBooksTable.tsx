
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";
import { Book } from "../../../booking-form-stock/types";
import { ActionButtons, AssignUserButton, StatusBadge } from "./TableComponents";

interface ActiveBooksTableProps {
  books: Book[];
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

const ActiveBooksTable: React.FC<ActiveBooksTableProps> = ({ books, onAssignUser, onViewDetails }) => {
  // Debug logging
  console.log("ActiveBooksTable rendered with books:", books);
  
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Range</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Pages</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Pages</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No active books found. Please add a new book or activate existing ones.
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{book.bookNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-blue-600 font-mono">GY {book.startPage} - GY {book.endPage}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {parseInt(book.endPage) - parseInt(book.startPage) + 1} pages
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="text-green-600 font-semibold">{book.available.length} available</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <AssignUserButton book={book} onAssignUser={onAssignUser} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <ActionButtons book={book} onViewDetails={onViewDetails} onAssignUser={onAssignUser} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ActiveBooksTable;
