import React, { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useBookStock } from "./hooks/useBookStock";
import BookStockHeader from "./components/book-stock/BookStockHeader";
import BookStockTabs from "./components/book-stock/BookStockTabs";
import BookStockDialogs from "./booking-form-stock/BookStockDialogs";
import { CancelledBooksHistory } from "./components/book-stock/CancelledBooksHistory";
import { PageSelectionDialog } from "./components/book-stock/PageSelectionDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book } from "./booking-form-stock/types";

interface CancelledBook extends Book {
  cancelledDate?: string;
  deletedDate?: string;
  reason?: string;
  cancelledPages?: string[];
}

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
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [pageSelectionOpen, setPageSelectionOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<"cancel" | "delete">("cancel");
  const [bookToAction, setBookToAction] = useState<Book | null>(null);
  const [cancelledBooks, setCancelledBooks] = useState<CancelledBook[]>([]);

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

  // Updated handlers to use page selection
  const handleCancelBook = (book: Book) => {
    setBookToAction(book);
    setCurrentAction("cancel");
    setPageSelectionOpen(true);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToAction(book);
    setCurrentAction("delete");
    setPageSelectionOpen(true);
  };

  // Updated confirmation handler for page-level operations
  const confirmPageAction = (pageNumbers: string[], reason: string) => {
    if (!bookToAction || pageNumbers.length === 0) return;

    const currentTime = new Date().toISOString();
    const isCancel = currentAction === "cancel";
    
    // Create cancelled book entry
    const cancelledBook: CancelledBook = {
      ...bookToAction,
      cancelledPages: pageNumbers,
      status: isCancel ? 'CANCELLED' : 'DELETED',
      reason,
      [isCancel ? 'cancelledDate' : 'deletedDate']: currentTime
    };

    // Update cancelled books history
    const existingCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
    const updatedCancelled = [...existingCancelled, cancelledBook];
    localStorage.setItem('cancelledBooks', JSON.stringify(updatedCancelled));
    setCancelledBooks(updatedCancelled);

    // Update the original book by removing the cancelled/deleted pages
    const existingBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    const updatedBooks = existingBooks.map((book: Book) => {
      if (book.bookNumber === bookToAction.bookNumber) {
        const remainingPages = book.available.filter(page => !pageNumbers.includes(page));
        return {
          ...book,
          available: remainingPages
        };
      }
      return book;
    });

    localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));
    loadBooks();

    toast.success(`Pages ${isCancel ? 'Cancelled' : 'Deleted'}`, {
      description: `${pageNumbers.length} page(s) have been ${isCancel ? 'cancelled' : 'deleted'} from Book #${bookToAction.bookNumber}`
    });

    // Reset states
    setPageSelectionOpen(false);
    setBookToAction(null);
  };

  // Restore book handler
  const handleRestoreBook = (book: CancelledBook) => {
    if (!book.cancelledPages) {
      // Original full book restore logic
      const restoredBook: Book = {
        bookNumber: book.bookNumber,
        startPage: book.startPage,
        endPage: book.endPage,
        available: book.available,
        assignedTo: book.assignedTo,
        status: "ACTIVE"
      };

      // Add back to active books
      const existingBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      const updatedBooks = [...existingBooks, restoredBook];
      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));

      // Remove from cancelled books
      const existingCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
      const updatedCancelled = existingCancelled.filter((cb: CancelledBook) => 
        !(cb.bookNumber === book.bookNumber && cb.cancelledDate === book.cancelledDate && cb.deletedDate === book.deletedDate)
      );
      localStorage.setItem('cancelledBooks', JSON.stringify(updatedCancelled));
      setCancelledBooks(updatedCancelled);
    } else {
      // Restore specific pages back to the original book
      const existingBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      const updatedBooks = existingBooks.map((existingBook: Book) => {
        if (existingBook.bookNumber === book.bookNumber) {
          // Add the cancelled pages back to available pages
          const restoredPages = [...existingBook.available, ...book.cancelledPages];
          return {
            ...existingBook,
            available: restoredPages.sort()
          };
        }
        return existingBook;
      });

      localStorage.setItem('invoiceBooks', JSON.stringify(updatedBooks));

      // Remove from cancelled books
      const existingCancelled = JSON.parse(localStorage.getItem('cancelledBooks') || '[]');
      const updatedCancelled = existingCancelled.filter((cb: CancelledBook) => 
        !(cb.bookNumber === book.bookNumber && cb.cancelledPages === book.cancelledPages && 
          cb.cancelledDate === book.cancelledDate && cb.deletedDate === book.deletedDate)
      );
      localStorage.setItem('cancelledBooks', JSON.stringify(updatedCancelled));
      setCancelledBooks(updatedCancelled);
    }

    loadBooks();

    toast.success("Pages Restored", {
      description: book.cancelledPages 
        ? `${book.cancelledPages.length} page(s) restored to Book #${book.bookNumber}`
        : `Book #${book.bookNumber} has been restored successfully.`
    });
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

      {/* Page Selection Dialog */}
      <PageSelectionDialog
        open={pageSelectionOpen}
        onOpenChange={setPageSelectionOpen}
        book={bookToAction}
        action={currentAction}
        onConfirm={confirmPageAction}
      />

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