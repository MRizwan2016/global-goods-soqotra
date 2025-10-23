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
import { Book } from "../../../booking-form-stock/types";
import { ActionButtons, StatusBadge } from "./TableComponents";
import { Trash2, X } from "lucide-react";

interface ActiveBooksTableEnhancedProps {
  books: Book[];
  onAssignUser: (book: Book) => void;
  onViewDetails: (book: Book) => void;
  onCancelBook: (book: Book) => void;
  onDeleteBook: (book: Book) => void;
}

export const ActiveBooksTableEnhanced: React.FC<ActiveBooksTableEnhancedProps> = ({ 
  books, 
  onAssignUser, 
  onViewDetails,
  onCancelBook,
  onDeleteBook
}) => {
  // Filter to show only active and assigned books
  const activeAssignedBooks = books.filter(book => 
    book.status === 'ACTIVE' && book.assignedTo && book.assignedTo !== 'NOT ASSIGNED'
  );

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold text-blue-900">Book #</TableHead>
              <TableHead className="font-semibold text-blue-900">Page Range</TableHead>
              <TableHead className="font-semibold text-blue-900">Total Pages</TableHead>
              <TableHead className="font-semibold text-blue-900">Available Pages</TableHead>
              <TableHead className="font-semibold text-blue-900">Assigned To</TableHead>
              <TableHead className="font-semibold text-blue-900">Status</TableHead>
              <TableHead className="font-semibold text-blue-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeAssignedBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No active assigned books found. Please assign users to books or activate existing ones.
                </TableCell>
              </TableRow>
            ) : (
              activeAssignedBooks.map((book) => {
                const totalPages = book.available?.length || 0;
                const usedPages = totalPages - (book.available?.length || 0);
                const availablePages = book.available?.length || 0;
                
                return (
                  <TableRow key={book.id || book.bookNumber} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{book.bookNumber}</TableCell>
                    <TableCell>{book.startPage} - {book.endPage}</TableCell>
                    <TableCell>{totalPages}</TableCell>
                    <TableCell className="text-green-600 font-semibold">{availablePages}</TableCell>
                    <TableCell>
                      <span className="text-blue-600 font-medium">{book.assignedTo}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <ActionButtons 
                          book={book} 
                          onViewDetails={onViewDetails} 
                          onAssignUser={onAssignUser} 
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50"
                          onClick={() => onCancelBook(book)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => onDeleteBook(book)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};