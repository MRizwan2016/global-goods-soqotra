import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockInvoiceBooks } from "@/pages/invoicing/constants/mockInvoiceBooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BookingFormActions from "./booking-form-stock/BookingFormActions";
import BookingTabTable from "./booking-form-stock/BookingTabTable";
import AssignUserDialog from "./booking-form-stock/AssignUserDialog";
import ViewBookDialog from "./booking-form-stock/ViewBookDialog";
import { Book, User } from "./booking-form-stock/types";

const mockUsers: User[] = [
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

const BookingFormStock = () => {
  const navigate = useNavigate();
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

    setBooks(prev => 
      prev.map(book => 
        book.bookNumber === selectedBook.bookNumber 
          ? { ...book, assignedTo: selectedUser.name }
          : book
      )
    );
    
    try {
      localStorage.setItem('bookingFormBooks', JSON.stringify(
        books.map(book => 
          book.bookNumber === selectedBook.bookNumber 
            ? { ...book, assignedTo: selectedUser.name }
            : book
        )
      ));
    } catch (error) {
      console.error("Error saving books to localStorage:", error);
    }

    setIsAssignDialogOpen(false);
    toast.success(`Book #${selectedBook.bookNumber} has been assigned to ${selectedUser.name}`);
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">BOOKING FORM STOCK MANAGEMENT</h1>
          <BookingFormActions
            onGenerateReport={handleGenerateReport}
            onAddNewBook={handleAddNewBook}
          />
        </div>
        
        <Tabs
          defaultValue="active"
          className="w-full"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active Books</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            {books.length > 0 ? (
              <BookingTabTable
                books={books}
                tab="active"
                onAssignUser={handleAssignUser}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-500 mb-4">No active books found.</p>
                <Button 
                  onClick={handleAddNewBook}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Add New Book
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="assigned" className="space-y-4 mt-4">
            {books.filter(book => book.assignedTo).length > 0 ? (
              <BookingTabTable
                books={books}
                tab="assigned"
                onAssignUser={handleAssignUser}
                onViewDetails={handleViewDetails}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-500">No assigned books found.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-4">
            <BookingTabTable
              books={books}
              tab="completed"
              onAssignUser={handleAssignUser}
              onViewDetails={handleViewDetails}
            />
          </TabsContent>
        </Tabs>
      </div>

      <AssignUserDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        selectedBook={selectedBook}
        users={mockUsers}
        selectedUserId={selectedUserId}
        onUserChange={setSelectedUserId}
        onConfirm={confirmAssignment}
      />

      <ViewBookDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        selectedBook={selectedBook}
        onAssignUser={handleAssignUser}
      />
    </Layout>
  );
};

export default BookingFormStock;
