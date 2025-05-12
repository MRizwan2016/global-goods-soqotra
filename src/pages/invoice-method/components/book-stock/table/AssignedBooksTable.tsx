
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User } from "lucide-react";
import { Book } from "../../../booking-form-stock/types";
import { ActionButtons } from "./TableComponents";
import { StatusBadge } from "./TableComponents";

interface AssignedBooksTableProps {
  books: Book[];
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

const AssignedBooksTable: React.FC<AssignedBooksTableProps> = ({ books, onAssignUser, onViewDetails }) => {
  return (
    <Card className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Page</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Pages</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.startPage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.endPage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.available.length} pages</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.assignedTo}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <ActionButtons book={book} onViewDetails={onViewDetails} onAssignUser={onAssignUser} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default AssignedBooksTable;
