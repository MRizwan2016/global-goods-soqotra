
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
    const savedBooks = localStorage.getItem('invoiceBooks');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        // Transform the format if needed
        const transformedBooks = parsedBooks.map((book: any) => ({
          ...book,
          status: book.isActivated ? "ACTIVE" : "INACTIVE",
          available: book.availablePages || []
        }));
        setBooks(transformedBooks);
      } catch (error) {
        console.error("Error loading books from localStorage:", error);
        setBooks([]);
      }
    } else {
      setBooks([]);
    }
  }, []);

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

    const updatedBooks = books.map(book => 
      book.bookNumber === selectedBook.bookNumber 
        ? { ...book, assignedTo: selectedUser.name }
        : book
    );
    
    setBooks(updatedBooks);
    
    try {
      localStorage.setItem('bookingFormBooks', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error("Error saving books to localStorage:", error);
    }

    setIsAssignDialogOpen(false);
    toast.success(`Book #${selectedBook.bookNumber} has been assigned to ${selectedUser.name}`);
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
    mockUsers
  };
}
