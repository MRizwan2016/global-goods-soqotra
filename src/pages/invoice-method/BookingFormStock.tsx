
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useBookStock } from "./hooks/useBookStock";
import BookStockHeader from "./components/book-stock/BookStockHeader";
import BookStockTabs from "./components/book-stock/BookStockTabs";
import BookStockDialogs from "./booking-form-stock/BookStockDialogs";

const BookingFormStock = () => {
  const navigate = useNavigate();
  const {
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
  } = useBookStock();

  // Listen for storage events to reload books when changes happen
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage change detected, refreshing books...");
      loadBooks();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadBooks]);

  const handleAddNewBook = () => {
    navigate("/master/book/new");
  };

  const handleGenerateReport = () => {
    toast.success("Generating report...", {
      description: "The report is being generated and will be downloaded shortly."
    });
    
    setTimeout(() => {
      toast.success("Report generated successfully");
    }, 1500);
  };

  return (
    <Layout title="Booking Form Stock">
      <div className="space-y-6">
        <BookStockHeader 
          onGenerateReport={handleGenerateReport}
          onAddNewBook={handleAddNewBook}
        />
        
        <BookStockTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          books={books}
          onAssignUser={handleAssignUser}
          onViewDetails={handleViewDetails}
          onAddNewBook={handleAddNewBook}
        />
      </div>

      <BookStockDialogs
        isAssignDialogOpen={isAssignDialogOpen}
        setIsAssignDialogOpen={setIsAssignDialogOpen}
        isViewDialogOpen={isViewDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        selectedBook={selectedBook}
        selectedUserId={selectedUserId}
        onUserChange={setSelectedUserId}
        onConfirmAssignment={confirmAssignment}
        onAssignUser={handleAssignUser}
        users={mockUsers}
      />
    </Layout>
  );
};

export default BookingFormStock;
