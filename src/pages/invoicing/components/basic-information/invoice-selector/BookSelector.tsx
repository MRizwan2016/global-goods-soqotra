
import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookSelectorProps {
  onBookSelect: (bookNumber: string) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({ onBookSelect }) => {
  const [availableBooks, setAvailableBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  
  useEffect(() => {
    // Load available books
    const loadAvailableBooks = () => {
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      
      // Get unique book numbers
      const books = new Set<string>();
      
      activeBooks.forEach((book: any) => {
        if (book.bookNumber) books.add(book.bookNumber);
      });
      
      storedBooks.forEach((book: any) => {
        if (book.bookNumber) books.add(book.bookNumber);
      });
      
      // If no books found, create some demo ones
      if (books.size === 0) {
        ["734", "B001", "B002", "B003"].forEach((bookNum) => books.add(bookNum));
      }
      
      setAvailableBooks(Array.from(books));
    };
    
    loadAvailableBooks();
  }, []);
  
  const handleSelectBook = (value: string) => {
    setSelectedBook(value);
    onBookSelect(value);
  };
  
  return (
    <div className="mb-4">
      <Label className="mb-1 block">Select Book Number</Label>
      <div className="flex gap-2 items-center">
        <BookOpen className="h-4 w-4 text-blue-500" />
        <Select value={selectedBook} onValueChange={handleSelectBook}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose Book Number" />
          </SelectTrigger>
          <SelectContent>
            {availableBooks.map((bookNumber) => (
              <SelectItem key={bookNumber} value={bookNumber}>
                Book #{bookNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookSelector;
