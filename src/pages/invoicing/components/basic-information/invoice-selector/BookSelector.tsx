
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
import { mockInvoiceBooks } from "../../../constants/mockInvoiceBooks";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookSelectorProps {
  onBookSelect: (bookNumber: string) => void;
}

const BookSelector: React.FC<BookSelectorProps> = ({ onBookSelect }) => {
  const [availableBooks, setAvailableBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const { language } = useLanguage();
  
  useEffect(() => {
    // Load available books
    const loadAvailableBooks = () => {
      // Get books from mockInvoiceBooks first
      const mockBooks = mockInvoiceBooks.map(book => book.bookNumber);
      
      // Try to get books from localStorage
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      
      // Get unique book numbers from all sources
      const books = new Set<string>();
      
      // Add mock books first
      mockBooks.forEach(book => books.add(book));
      
      // Add books from localStorage
      activeBooks.forEach((book: any) => {
        if (book.bookNumber) books.add(book.bookNumber);
      });
      
      storedBooks.forEach((book: any) => {
        if (book.bookNumber && book.isActivated) books.add(book.bookNumber);
      });
      
      console.log("BookSelector - Available books loaded:", Array.from(books));
      
      setAvailableBooks(Array.from(books));
    };
    
    loadAvailableBooks();
    
    // Listen for storage changes to reload books
    const handleStorageChange = () => {
      loadAvailableBooks();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('book-update', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('book-update', handleStorageChange);
    };
  }, []);
  
  const handleSelectBook = (value: string) => {
    setSelectedBook(value);
    onBookSelect(value);
  };
  
  return (
    <div className="mb-4">
      <Label className="mb-1 block">{language === 'ar' ? 'اختر رقم الكتاب' : 'Select Book Number'}</Label>
      <div className={`flex gap-2 items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <BookOpen className="h-4 w-4 text-blue-500" />
        <Select value={selectedBook} onValueChange={handleSelectBook}>
          <SelectTrigger className={`w-full ${language === 'ar' ? 'text-right' : ''}`}>
            <SelectValue placeholder={language === 'ar' ? 'اختر رقم الكتاب' : 'Choose Book Number'} />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {availableBooks.map((bookNumber) => (
              <SelectItem key={bookNumber} value={bookNumber}>
                {language === 'ar' ? `كتاب #${bookNumber}` : `Book #${bookNumber}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BookSelector;
