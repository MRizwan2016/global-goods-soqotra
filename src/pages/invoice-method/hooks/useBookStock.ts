
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Book, User } from "../booking-form-stock/types";

export const mockUsers: User[] = [
  { id: "1", name: "Mr. Lahiru Chathuranga" },
  { id: "2", name: "Mr. M.P.A. Ranatunghe" },
  { id: "3", name: "Mr. Gamage Kashmika Gayashan" },
  { id: "4", name: "Mr. Daminda" },
  { id: "5", name: "Mr. Ali Hussain Mufees" },
  { id: "6", name: "Mr. Paolo Fernando" },
  { id: "7", name: "Mr. Jun Jun Santos Manuel" },
  { id: "8", name: "Mr. Raymond" },
  { id: "9", name: "John Smith" },
  { id: "10", name: "Mary Johnson" },
  { id: "11", name: "Mr. Evans" },
  { id: "12", name: "Mr. Paul Onchana" },
  { id: "13", name: "Mr. Edwin Mbuguo" },
];

export function useBookStock() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedTab, setSelectedTab] = useState("active");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Load books from localStorage on component mount
  useEffect(() => {
    loadBooks();
    
    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Add event listener for book updates
    window.addEventListener('book-update', loadBooks);
    
    // Reload when window gets focus
    window.addEventListener('focus', loadBooks);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('book-update', loadBooks);
      window.removeEventListener('focus', loadBooks);
    };
  }, []);
  
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'invoiceBooks' || event.key === null) {
      console.log("Storage change detected for invoiceBooks, reloading books...");
      loadBooks();
    }
  };
  
  const loadBooks = () => {
    console.log("Loading books from localStorage...");
    console.log("All localStorage keys:", Object.keys(localStorage));
    console.log("localStorage 'invoiceBooks':", localStorage.getItem('invoiceBooks'));
    console.log("localStorage 'activeInvoiceBooks':", localStorage.getItem('activeInvoiceBooks'));
    const savedBooks = localStorage.getItem('invoiceBooks');
    console.log("Raw localStorage data:", savedBooks);
    
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        console.log("Parsed books from localStorage:", parsedBooks);
        
        // Transform the format if needed
        const transformedBooks = parsedBooks.map((book: any) => ({
          ...book,
          id: book.id || String(Date.now() + Math.floor(Math.random() * 1000)),
          bookNumber: book.bookNumber,
          startPage: book.startPage || book.startNumber,
          endPage: book.endPage || book.endNumber,
          status: book.isActivated ? "ACTIVE" : "INACTIVE",
          available: book.availablePages || [],
          assignedTo: book.assignedTo || book.salesRepresentative || undefined
        }));
        console.log("Transformed books:", transformedBooks);
        setBooks(transformedBooks);
      } catch (error) {
        console.error("Error loading books from localStorage:", error);
        setBooks([]);
      }
    } else {
      console.log("No books found in localStorage");
      setBooks([]);
    }
  };

  const handleAssignUser = (book: Book) => {
    setSelectedBook(book);
    setSelectedUserId("");
    setIsAssignDialogOpen(true);
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  const confirmAssignment = () => {
    if (!selectedBook || !selectedUserId) {
      toast.error("Please select a user to assign this book");
      return;
    }

    const selectedUser = mockUsers.find(user => user.id === selectedUserId);
    if (!selectedUser) {
      toast.error("Invalid user selection");
      return;
    }

    // Get the original books from localStorage to update
    const storedBooks = localStorage.getItem('invoiceBooks');
    if (!storedBooks) {
      toast.error("Could not find book data");
      return;
    }

    try {
      const originalBooks = JSON.parse(storedBooks);
      
      // Update the specific book with the assigned user and mark it as assigned
      const updatedOriginalBooks = originalBooks.map((book: any) => 
        book.bookNumber === selectedBook.bookNumber 
          ? { 
              ...book, 
              assignedTo: selectedUser.name,
              isAssigned: true, // Mark as assigned to prevent reuse
              assignedDate: new Date().toISOString()
            }
          : book
      );
      
      // Save back to localStorage
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedOriginalBooks));

      // Also update active invoice books if needed
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const updatedActiveBooks = activeBooks.map((book: any) => 
        book.bookNumber === selectedBook.bookNumber 
          ? { 
              ...book, 
              assignedTo: selectedUser.name,
              isAssigned: true,
              assignedDate: new Date().toISOString()
            }
          : book
      );
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));

      // Update the state
      const updatedBooks = books.map(book => 
        book.bookNumber === selectedBook.bookNumber 
          ? { 
              ...book, 
              assignedTo: selectedUser.name,
              isAssigned: true,
              assignedDate: new Date().toISOString()
            }
          : book
      );
      
      console.log("=== USER ASSIGNMENT SUCCESS ===");
      console.log("Updated books with user assignment:", updatedBooks);
      
      setBooks(updatedBooks);
      
      setIsAssignDialogOpen(false);
      toast.success(`Book #${selectedBook.bookNumber} has been assigned to ${selectedUser.name}`);
      
      // Reload books to ensure we have the latest data
      loadBooks();
      
      // Notify other components about the change
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error("Error saving book assignment:", error);
      toast.error("Failed to assign user to book");
    }
  };

  return {
    books,
    selectedTab,
    setSelectedTab,
    isAssignDialogOpen,
    setIsAssignDialogOpen,
    selectedBook,
    selectedUserId,
    setSelectedUserId,
    isViewDialogOpen,
    setIsViewDialogOpen,
    handleAssignUser,
    handleViewDetails,
    confirmAssignment,
    mockUsers,
    loadBooks
  };
}
