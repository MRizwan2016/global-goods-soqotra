
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Book, User } from "../booking-form-stock/types";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { syncBookStockToExternal } from "@/lib/externalSync";

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
  { id: "14", name: "Mr. Yousuf" },
  { id: "15", name: "Mr. Saleh" },
  { id: "16", name: "Mr. Abdul Qader" },
];

export function useBookStock() {
  const { users: authUsers } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedTab, setSelectedTab] = useState("active");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const loadBooks = useCallback(async () => {
    console.log("=== LOADING BOOKS FROM DATABASE ===");
    try {
      const { data, error } = await supabase
        .from("manage_invoice_book_stock")
        .select("*")
        .order("book_number");

      if (error) {
        console.error("Error loading books from DB:", error);
        toast.error("Failed to load books");
        return;
      }

      const transformedBooks: Book[] = (data || []).map((row: any) => ({
        id: row.id,
        bookNumber: row.book_number,
        startPage: row.start_page,
        endPage: row.end_page,
        available: Array.isArray(row.available_pages) ? row.available_pages : [],
        assignedTo: row.assigned_to_sales_rep || undefined,
        status: (row.status || "available").toUpperCase() === "AVAILABLE" ? "ACTIVE" : (row.status || "").toUpperCase(),
        isAssigned: !!row.assigned_to_sales_rep,
        assignedDate: row.assigned_date || undefined,
        country: row.country || "Qatar",
      }));

      console.log("Loaded books from DB:", transformedBooks.length);
      setBooks(transformedBooks);
    } catch (err) {
      console.error("Unexpected error loading books:", err);
    }
  }, []);

  useEffect(() => {
    loadBooks();

    // Subscribe to realtime changes
    const channel = supabase
      .channel("book-stock-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "manage_invoice_book_stock" },
        () => {
          console.log("Realtime book update detected, reloading...");
          loadBooks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadBooks]);

  const handleAssignUser = (book: Book) => {
    setSelectedBook(book);
    setSelectedUserId("");
    setIsAssignDialogOpen(true);
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  const confirmAssignment = async () => {
    if (!selectedBook || !selectedUserId) {
      toast.error("Please select a user to assign this book");
      return;
    }

    const selectedUser = availableUsers.find(user => user.id === selectedUserId);
    if (!selectedUser) {
      toast.error("Invalid user selection");
      return;
    }

    try {
      const updateData = {
        assigned_to_sales_rep: selectedUser.name,
        assigned_date: new Date().toISOString(),
        status: "assigned",
      };

      const { error } = await supabase
        .from("manage_invoice_book_stock")
        .update(updateData)
        .eq("book_number", selectedBook.bookNumber);

      if (error) throw error;

      const totalPages = Math.max(50, Number(selectedBook.endPage) - Number(selectedBook.startPage) + 1 || 50);
      void syncBookStockToExternal({
        book_number: selectedBook.bookNumber,
        start_page: selectedBook.startPage,
        end_page: selectedBook.endPage,
        total_pages: totalPages,
        pages_used: totalPages - (selectedBook.available?.length || 0),
        available_pages: selectedBook.available || [],
        assigned_to_sales_rep: selectedUser.name,
        assigned_date: updateData.assigned_date,
        status: updateData.status,
        country: selectedBook.country || "Qatar",
      });

      setIsAssignDialogOpen(false);
      toast.success(`Book #${selectedBook.bookNumber} has been assigned to ${selectedUser.name}`);
      loadBooks();
    } catch (error: any) {
      console.error("Error saving book assignment:", error);
      toast.error(error.message || "Failed to assign user to book");
    }
  };

  // Combine auth users with mock users for book assignment
  const availableUsers = [
    ...mockUsers,
    ...authUsers
      .filter(authUser => !authUser.isAdmin && authUser.isActive)
      .map(authUser => ({
        id: authUser.id,
        name: authUser.fullName
      }))
  ];

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
    mockUsers: availableUsers,
    loadBooks
  };
}
