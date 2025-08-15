import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Book } from "../../booking-form-stock/types";
import { RotateCcw } from "lucide-react";

interface CancelledBook extends Book {
  cancelledDate?: string;
  deletedDate?: string;
  reason?: string;
}

interface CancelledBooksHistoryProps {
  cancelledBooks: CancelledBook[];
  onRestoreBook: (book: CancelledBook) => void;
}

export const CancelledBooksHistory: React.FC<CancelledBooksHistoryProps> = ({ 
  cancelledBooks, 
  onRestoreBook 
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Cancelled/Deleted Books History
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          View and manage previously cancelled or deleted invoice books
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-50">
              <TableHead className="font-semibold text-red-900">Book #</TableHead>
              <TableHead className="font-semibold text-red-900">Page Range</TableHead>
              <TableHead className="font-semibold text-red-900">Was Assigned To</TableHead>
              <TableHead className="font-semibold text-red-900">Status</TableHead>
              <TableHead className="font-semibold text-red-900">Date Cancelled/Deleted</TableHead>
              <TableHead className="font-semibold text-red-900">Reason</TableHead>
              <TableHead className="font-semibold text-red-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cancelledBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No cancelled or deleted books found.
                </TableCell>
              </TableRow>
            ) : (
              cancelledBooks.map((book) => (
                <TableRow key={book.id || book.bookNumber} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{book.bookNumber}</TableCell>
                  <TableCell>{book.startPage} - {book.endPage}</TableCell>
                  <TableCell>
                    <span className="text-gray-600">{book.assignedTo || 'Not Assigned'}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      book.status === 'CANCELLED' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.status || 'DELETED'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {book.cancelledDate || book.deletedDate || 'Unknown'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {book.reason || 'No reason provided'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-green-600 hover:text-green-800 hover:bg-green-50"
                      onClick={() => onRestoreBook(book)}
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};