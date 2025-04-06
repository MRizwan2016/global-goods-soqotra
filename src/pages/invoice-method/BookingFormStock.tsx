
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Plus, 
  User,
  FileDown
} from "lucide-react";
import { mockInvoiceBooks } from "@/pages/invoicing/constants/mockInvoiceBooks";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

// Define the Book type
interface Book {
  bookNumber: string;
  startPage: string;
  endPage: string;
  available: string[];
  assignedTo: string;
  status?: string;
}

// Define the User type
interface User {
  id: string;
  name: string;
}

// Mock users for the dropdown
const mockUsers: User[] = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Mary Johnson" },
  { id: "3", name: "Mr. Lahiru" },
  { id: "4", name: "Mr. Evans" },
  { id: "5", name: "Mr. Paul Onchana" },
  { id: "6", name: "Mr. Paulo Fernando" },
  { id: "7", name: "Mr. Edwin Mbuguo" },
  { id: "8", name: "Mr. Ali Hussain" },
];

const BookingFormStock = () => {
  const [books, setBooks] = useState<Book[]>(mockInvoiceBooks.map(book => ({
    ...book,
    status: "ACTIVE"
  })));
  
  const [selectedTab, setSelectedTab] = useState("active");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Handle assigning a user to a book
  const handleAssignUser = (book: Book) => {
    setSelectedBook(book);
    setSelectedUserId("");
    setIsAssignDialogOpen(true);
  };

  // Handle viewing details
  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  // Confirm user assignment
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

    // Update the book with the assigned user
    setBooks(prev => 
      prev.map(book => 
        book.bookNumber === selectedBook.bookNumber 
          ? { ...book, assignedTo: selectedUser.name }
          : book
      )
    );
    
    // Update localStorage
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

  // Handle adding a new book
  const handleAddNewBook = () => {
    // This would typically open a form to add a new book
    // For now, we'll just add a mock book
    const lastBook = books[books.length - 1];
    const newBookNumber = (parseInt(lastBook.bookNumber) + 1).toString();
    const startPage = (parseInt(lastBook.endPage) + 1).toString();
    const endPage = (parseInt(startPage) + 49).toString();
    
    const newBook: Book = {
      bookNumber: newBookNumber,
      startPage,
      endPage,
      available: Array.from({ length: 50 }, (_, i) => (parseInt(startPage) + i).toString()),
      assignedTo: "",
      status: "ACTIVE"
    };
    
    setBooks([...books, newBook]);
    toast.success(`New book #${newBookNumber} has been added`);
  };

  // Handle generating report
  const handleGenerateReport = () => {
    toast.success("Generating report...", {
      description: "The report is being generated and will be downloaded shortly."
    });
    
    // Mock download by showing success after a short delay
    setTimeout(() => {
      toast.success("Report generated successfully");
    }, 1500);
  };

  return (
    <Layout title="Booking Form Stock">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">BOOKING FORM STOCK MANAGEMENT</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleGenerateReport}>
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            <Button className="gap-2" onClick={handleAddNewBook}>
              <Plus className="h-4 w-4" />
              Add New Book
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="active">Active Books</TabsTrigger>
            <TabsTrigger value="assigned">Assigned</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available Pages
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.filter(book => book.status === "ACTIVE").map((book, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.startPage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.endPage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.available.length} pages</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {book.assignedTo ? book.assignedTo : (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleAssignUser(book)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <User className="h-4 w-4 mr-1" />
                              Assign User
                            </Button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ACTIVE
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2" 
                              onClick={() => handleViewDetails(book)}
                            >
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2" 
                              onClick={() => handleAssignUser(book)}
                            >
                              <User className="h-4 w-4" />
                              <span className="sr-only">Assign</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="assigned" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Available Pages
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {books.filter(book => book.assignedTo).map((book, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.bookNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.startPage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.endPage}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.available.length} pages</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.assignedTo}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ACTIVE
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 px-2"
                            onClick={() => handleViewDetails(book)}
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-4">
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Book #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Page
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Used By
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Completion Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">721</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136001</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">13136050</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Multiple Staff</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2"
                        >
                          <FileDown className="h-4 w-4" />
                          <span className="sr-only">Export</span>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* User Assignment Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign User to Book #{selectedBook?.bookNumber}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Select a user to assign to this booking form book
            </p>
            
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAssignment}>
              Assign User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Book #{selectedBook?.bookNumber} Details</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Book Information</h3>
                <dl className="divide-y divide-gray-100">
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Book Number</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.bookNumber}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Start Page</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.startPage}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">End Page</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.endPage}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Available Pages</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.available.length}</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">
                      {selectedBook?.assignedTo || "Not assigned"}
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Available Invoice Numbers</h3>
                <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedBook?.available.slice(0, 10).map((pageNumber, index) => (
                      <li key={index} className="text-sm text-gray-700 py-1 px-2 bg-white rounded border border-gray-200">
                        {pageNumber}
                      </li>
                    ))}
                    {selectedBook && selectedBook.available.length > 10 && (
                      <li className="text-sm text-gray-500 py-1 px-2">
                        ...and {selectedBook.available.length - 10} more
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {!selectedBook?.assignedTo && (
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleAssignUser(selectedBook!);
              }}>
                <User className="h-4 w-4 mr-1" />
                Assign User
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default BookingFormStock;
