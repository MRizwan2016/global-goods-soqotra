
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, User, FileDown } from "lucide-react";
import { Book } from "./types";

interface BookingTabTableProps {
  books: Book[];
  tab: "active" | "assigned" | "completed";
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
}

const BookingTabTable: React.FC<BookingTabTableProps> = ({ books, tab, onAssignUser, onViewDetails }) => {
  if (tab === "completed") {
    return (
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">721</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136050</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Multiple Staff</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <FileDown className="h-4 w-4" />
                    <span className="sr-only">Export</span>
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  const tableBooks = tab === "active"
    ? books.filter(book => book.status === "ACTIVE")
    : books.filter(book => book.assignedTo);

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
            {tableBooks.map((book, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.startPage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.endPage}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.available.length} pages</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tab === "active" && !book.assignedTo ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAssignUser(book)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Assign User
                    </Button>
                  ) : (book.assignedTo || "-")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    ACTIVE
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => onViewDetails(book)}
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    {tab === "active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => onAssignUser(book)}
                      >
                        <User className="h-4 w-4" />
                        <span className="sr-only">Assign</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BookingTabTable;
