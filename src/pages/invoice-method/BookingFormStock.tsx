
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useBookStock } from "./hooks/useBookStock";
import BookStockHeader from "./components/book-stock/BookStockHeader";
import BookStockTabs from "./components/book-stock/BookStockTabs";
import BookStockDialogs from "./booking-form-stock/BookStockDialogs";
import { CancelledBooksHistory } from "./components/book-stock/CancelledBooksHistory";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

  // State for cancel/delete dialogs
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [bookToAction, setBookToAction] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelledBooks, setCancelledBooks] = useState([]);

  // Load cancelled books from localStorage
  useEffect(() => {
    const loadCancelledBooks = () => {
      const cancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
      setCancelledBooks(cancelled);
    };
    
    loadCancelledBooks();
  }, []);

  // Force refresh books when component mounts
  useEffect(() => {
    console.log("BookingFormStock component mounted, loading books...");
    loadBooks();
    
    // Manually trigger a refresh when this component is focused
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page visibility changed to visible, refreshing books...");
        loadBooks();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Create a custom internal event listener for book updates
    const handleBookUpdate = () => {
      console.log("Book update event detected, refreshing books...");
      loadBooks();
    };
    
    window.addEventListener('book-update', handleBookUpdate);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('book-update', handleBookUpdate);
    };
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

  // Cancel book handler
  const handleCancelBook = (book) => {
    setBookToAction(book);
    setCancelDialogOpen(true);
  };

  // Delete book handler
  const handleDeleteBook = (book) => {
    setBookToAction(book);
    setDeleteDialogOpen(true);
  };

  // Confirm cancel
  const confirmCancelBook = () => {
    if (bookToAction) {
      const cancelledBook = {
        ...bookToAction,
        status: 'CANCELLED',
        cancelledDate: new Date().toISOString().split('T')[0],
        reason: cancelReason || 'No reason provided'
      };

      const existingCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
      localStorage.setItem('cancelledBooks', JSON.stringify([...existingCancelled, cancelledBook]));

      const currentBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      const updatedBooks = currentBooks.filter(book => book.id !== bookToAction.id);
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));

      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const updatedActiveBooks = activeBooks.filter(book => book.id !== bookToAction.id);
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));

      loadBooks();
      setCancelledBooks(JSON.parse(localStorage.getItem('cancelledBooks') || '[]'));
      toast.success(`Book ${bookToAction.bookNumber} cancelled successfully`);
    }
    setCancelDialogOpen(false);
    setBookToAction(null);
    setCancelReason("");
  };

  // Confirm delete
  const confirmDeleteBook = () => {
    if (bookToAction) {
      const deletedBook = {
        ...bookToAction,
        status: 'DELETED',
        deletedDate: new Date().toISOString().split('T')[0],
        reason: cancelReason || 'Permanently deleted'
      };

      const existingCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
      localStorage.setItem('cancelledBooks', JSON.stringify([...existingCancelled, deletedBook]));

      const currentBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      const updatedBooks = currentBooks.filter(book => book.id !== bookToAction.id);
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));

      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const updatedActiveBooks = activeBooks.filter(book => book.id !== bookToAction.id);
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(updatedActiveBooks));

      loadBooks();
      setCancelledBooks(JSON.parse(localStorage.getItem('cancelledBooks') || '[]'));
      toast.success(`Book ${bookToAction.bookNumber} deleted successfully`);
    }
    setDeleteDialogOpen(false);
    setBookToAction(null);
    setCancelReason("");
  };

  // Restore book handler
  const handleRestoreBook = (book) => {
    const currentCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
    const updatedCancelled = currentCancelled.filter(b => b.id !== book.id);
    localStorage.setItem('cancelledBooks', JSON.stringify(updatedCancelled));

    const restoredBook = {
      ...book,
      status: 'ACTIVE',
      cancelledDate: undefined,
      deletedDate: undefined,
      reason: undefined
    };

    const currentBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    localStorage.setItem('invoiceBooks', JSON.stringify([...currentBooks, restoredBook]));

    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    localStorage.setItem('activeInvoiceBooks', JSON.stringify([...activeBooks, restoredBook]));

    loadBooks();
    setCancelledBooks(updatedCancelled);
    toast.success(`Book ${book.bookNumber} restored successfully`);
  };

  return (
    <Layout title="Booking Form Stock">
      <div className="space-y-6">
        <BookStockHeader 
          onGenerateReport={handleGenerateReport}
          onAddNewBook={handleAddNewBook}
          onViewHistory={() => setHistoryDialogOpen(true)}
        />
        
        <BookStockTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          books={books}
          onAssignUser={handleAssignUser}
          onViewDetails={handleViewDetails}
          onAddNewBook={handleAddNewBook}
          onCancelBook={handleCancelBook}
          onDeleteBook={handleDeleteBook}
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

      {/* Cancel Book Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Book #{bookToAction?.bookNumber}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to cancel this book? This action can be undone later.
            </p>
            <div>
              <Label htmlFor="cancel-reason">Reason for cancellation</Label>
              <Textarea
                id="cancel-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter reason for cancellation..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Book
            </Button>
            <Button variant="destructive" onClick={confirmCancelBook}>
              Cancel Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Book Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Book #{bookToAction?.bookNumber}</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <p className="text-sm text-muted-foreground text-red-600">
              Warning: This will permanently delete this book. This action can be undone from the history.
            </p>
            <div>
              <Label htmlFor="delete-reason">Reason for deletion</Label>
              <Textarea
                id="delete-reason"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter reason for deletion..."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Keep Book
            </Button>
            <Button variant="destructive" onClick={confirmDeleteBook}>
              Delete Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Cancelled/Deleted Books History</DialogTitle>
          </DialogHeader>
          <div className="py-4 overflow-y-auto">
            <CancelledBooksHistory
              cancelledBooks={cancelledBooks}
              onRestoreBook={handleRestoreBook}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setHistoryDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BookingFormStock;
