import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableHead, 
  TableHeader, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { RotateCcw, Globe } from "lucide-react";
import { Book } from "../../booking-form-stock/types";
import { toast } from "sonner";

interface ReturnedBook extends Book {
  returnedDate: string;
  returnedReason: string;
  previousCountry: string;
  previousAssignee?: string;
  previousAssignments?: Array<{
    country: string;
    assignee?: string;
    returnedDate: string;
    returnedReason: string;
  }>;
}

interface ReturnedStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReassign: () => void;
}

const countries = ["Qatar", "Sudan", "Eritrea", "Yemen", "Somalia"];

export const ReturnedStockDialog: React.FC<ReturnedStockDialogProps> = ({
  open,
  onOpenChange,
  onReassign
}) => {
  const [returnedBooks, setReturnedBooks] = useState<ReturnedBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<ReturnedBook | null>(null);
  const [newCountry, setNewCountry] = useState("");

  useEffect(() => {
    if (open) {
      loadReturnedBooks();
    }
  }, [open]);

  const loadReturnedBooks = () => {
    const returned = JSON.parse(localStorage.getItem('returnedStockBooks') || '[]');
    setReturnedBooks(returned);
  };

  const handleReassignToCountry = (book: ReturnedBook, country: string) => {
    if (!country) return;

    // Add book back to active inventory with new country
    const activeBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    const reassignedBook = {
      ...book,
      country: country,
      status: 'ACTIVE',
      assignedTo: undefined,
      assignedDate: undefined,
      reassignedDate: new Date().toISOString(),
      previousAssignments: [
        ...(book.previousAssignments || []),
        {
          country: book.previousCountry,
          assignee: book.previousAssignee,
          returnedDate: book.returnedDate,
          returnedReason: book.returnedReason
        }
      ]
    };

    const updatedActiveBooks = [...activeBooks, reassignedBook];
    localStorage.setItem('invoiceBooks', JSON.stringify(updatedActiveBooks));

    // Remove from returned stock
    const updatedReturnedBooks = returnedBooks.filter(b => 
      !(b.bookNumber === book.bookNumber && b.returnedDate === book.returnedDate)
    );
    localStorage.setItem('returnedStockBooks', JSON.stringify(updatedReturnedBooks));
    setReturnedBooks(updatedReturnedBooks);

    toast.success("Book Reassigned", {
      description: `Book #${book.bookNumber} has been reassigned to ${country}`
    });

    onReassign();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Returned Stock - Available for Reassignment
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="text-sm text-gray-600">
            <p>These books have been returned to stock and are available for reassignment to other countries.</p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="font-semibold text-blue-900">Book #</TableHead>
                    <TableHead className="font-semibold text-blue-900">Page Range</TableHead>
                    <TableHead className="font-semibold text-blue-900">Available Pages</TableHead>
                    <TableHead className="font-semibold text-blue-900">Previous Country</TableHead>
                    <TableHead className="font-semibold text-blue-900">Previous Assignee</TableHead>
                    <TableHead className="font-semibold text-blue-900">Returned Date</TableHead>
                    <TableHead className="font-semibold text-blue-900">Return Reason</TableHead>
                    <TableHead className="font-semibold text-blue-900">Reassign to Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {returnedBooks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No returned books available for reassignment.
                      </TableCell>
                    </TableRow>
                  ) : (
                    returnedBooks.map((book) => (
                      <TableRow key={`${book.bookNumber}-${book.returnedDate}`} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{book.bookNumber}</TableCell>
                        <TableCell>{book.startPage} - {book.endPage}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {book.available.length} pages
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-gray-100">
                            {book.previousCountry}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-gray-600">
                            {book.previousAssignee || 'Not Assigned'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {new Date(book.returnedDate).toLocaleDateString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-gray-600">
                            {book.returnedReason || 'No reason provided'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select onValueChange={(country) => handleReassignToCountry(book, country)}>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                {countries
                                  .filter(country => country !== book.previousCountry)
                                  .map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};