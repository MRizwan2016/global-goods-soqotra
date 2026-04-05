import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow,
  BookingTableHead,
  BookingTableCell
} from "@/components/ui/table";
import { PenLine, UserCheck, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { normalizeCountryName, syncBookStockToExternal } from "@/lib/externalSync";

// Define the user type
interface User {
  id: string;
  name: string;
}

// Define the book type with activation info
interface InvoiceBook {
  id: string;
  bookNumber: string;
  startPage: string;
  endPage: string;
  isIssued: boolean;
  isActivated: boolean;
  assignedTo?: string;
  pagesUsed: number;
  availablePages: string[];
   country?: string;
   driverName?: string;
}

// Mock users for the system
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
  { id: "14", name: "Mr. YOUSUF MOHAMED IBRAHIM" }, // Eritrea & Sudan Project
  { id: "15", name: "Mr. SALEH MOHAMED IBRAHIM" },  // Eritrea & Sudan Project
];

const InvoiceBookStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBookData] = useState<InvoiceBook[]>([]);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<InvoiceBook | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  
  // Function to load book data
  const loadBookData = async () => {
    try {
      const { data, error } = await supabase
        .from("manage_invoice_book_stock")
        .select("id, book_number, start_page, end_page, status, assigned_to_sales_rep, assigned_to_driver, pages_used, available_pages, country")
        .order("book_number");

      if (!error && data && data.length > 0) {
        const mappedBooks = data.map((book: any) => ({
          id: book.id,
          bookNumber: String(book.book_number),
          startPage: String(book.start_page),
          endPage: String(book.end_page),
          isIssued: false,
          isActivated: String(book.status || "available") !== "available",
          assignedTo: book.assigned_to_sales_rep || undefined,
          pagesUsed: Number(book.pages_used || 0),
          availablePages: Array.isArray(book.available_pages) ? book.available_pages.map(String) : [],
          country: book.country || undefined,
          driverName: book.assigned_to_driver || undefined,
        }));

        setBookData(mappedBooks);
      }
    } catch (error) {
      console.error("Error loading books from database:", error);
      setBookData([]);
    }
  };
  
  // Load book data on component mount and focus
  useEffect(() => {
    loadBookData();
    
    // Also reload when component gets focus (user navigates back)
    window.addEventListener('focus', loadBookData);
    
    // Listen for storage events to reload when changes happen elsewhere
    window.addEventListener('storage', loadBookData);
    
    return () => {
      window.removeEventListener('focus', loadBookData);
      window.removeEventListener('storage', loadBookData);
    };
  }, []);

  
  // Filter booking data based on search term
  const filteredData = bookData.filter(item => {
    if (!searchTerm) return true;
    return (
      item.bookNumber.includes(searchTerm) || 
      item.startPage.includes(searchTerm) || 
      item.endPage.includes(searchTerm) ||
      (item.assignedTo && item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  
  const handleActivateBook = (book: InvoiceBook) => {
    setSelectedBook(book);
    setSelectedUserId("");
    setIsActivateDialogOpen(true);
  };

  const handleViewBook = (book: InvoiceBook) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };
  
  const confirmActivation = async () => {
    if (!selectedBook || !selectedUserId) {
      toast.error("Please select a user to activate this book");
      return;
    }
    
    const selectedUser = mockUsers.find(user => user.id === selectedUserId);
    
    if (!selectedUser) {
      toast.error("Invalid user selection");
      return;
    }
    
    const updatedBook = {
      ...selectedBook,
      isActivated: true,
      assignedTo: selectedUser.name,
    };

    setBookData(prev => prev.map(book => book.id === selectedBook.id ? updatedBook : book));

    const bookRecord = {
      book_number: selectedBook.bookNumber,
      country: normalizeCountryName(selectedBook.country || ""),
      country_id_number: selectedBook.startPage.length > 6 ? selectedBook.startPage.slice(0, 2) : null,
      start_page: selectedBook.startPage,
      end_page: selectedBook.endPage,
      total_pages: Math.max(1, Number(selectedBook.endPage) - Number(selectedBook.startPage) + 1 || 50),
      pages_used: selectedBook.pagesUsed || 0,
      available_pages: selectedBook.availablePages || [],
      assigned_to_sales_rep: selectedUser.name,
      assigned_to_driver: selectedBook.driverName || null,
      assigned_date: new Date().toISOString(),
      status: "assigned",
    };

    try {
      const { data: existingBook, error: existingBookError } = await supabase
        .from("manage_invoice_book_stock")
        .select("id")
        .eq("book_number", selectedBook.bookNumber)
        .maybeSingle();

      if (existingBookError) throw existingBookError;

      if (existingBook?.id) {
        const { error } = await supabase
          .from("manage_invoice_book_stock")
          .update(bookRecord)
          .eq("id", existingBook.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("manage_invoice_book_stock")
          .insert(bookRecord);

        if (error) throw error;
      }

      // Also save to sl_book_assignments for Sri Lanka books
      const country = normalizeCountryName(selectedBook.country || "");
      if (country.toLowerCase().includes("sri lanka")) {
        await supabase
          .from("sl_book_assignments")
          .upsert({
            book_number: selectedBook.bookNumber,
            start_page_no: selectedBook.startPage,
            end_page_no: selectedBook.endPage,
            staff_name: selectedUser.name,
            assigned_date: bookRecord.assigned_date,
            status: "assigned",
            country: "Sri Lanka",
            pages_used: selectedBook.pagesUsed || 0,
          }, { onConflict: "book_number,country" });
      }

      await syncBookStockToExternal(bookRecord);
    } catch (error) {
      console.error("Book activation sync error:", error);
      toast.error("Backend sync failed. Please try again.");
    }
    
    setIsActivateDialogOpen(false);
    toast.success(`Book #${selectedBook.bookNumber} has been successfully activated for ${selectedUser.name}`);
    loadBookData();
  };
  
  return (
    <Layout title="Manage Invoice Book Stock">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fade-in">
        <div className="p-4 bg-blue-50 border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">
            Manage Invoice Book Stock
          </h3>
          <p className="text-sm text-blue-600">Master Records</p>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
              <span className="text-sm">entries</span>
            </div>
            
            <div className="flex gap-3">
              <Link to="/master/book/new">
                <Button className="bg-blue-500 hover:bg-blue-600 transition-colors hover:scale-105 transform duration-200">
                  Add New Book
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm">Search:</span>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-40 h-9"
                />
              </div>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded overflow-hidden hover-scale transition-transform duration-300">
            <Table>
              <TableHeader>
                <TableRow>
                  <BookingTableHead>Num</BookingTableHead>
                  <BookingTableHead>BOOK NUMBER</BookingTableHead>
                  <BookingTableHead>START PAGE</BookingTableHead>
                  <BookingTableHead>END PAGE</BookingTableHead>
                  <BookingTableHead>STATUS</BookingTableHead>
                  <BookingTableHead>ASSIGNED TO</BookingTableHead>
                  <BookingTableHead>PAGES USED</BookingTableHead>
                  <BookingTableHead>ACTIONS</BookingTableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50/50 transition-colors">
                      <BookingTableCell className="text-center">{item.id}</BookingTableCell>
                      <BookingTableCell>{item.bookNumber}</BookingTableCell>
                      <BookingTableCell>{item.startPage}</BookingTableCell>
                      <BookingTableCell>{item.endPage}</BookingTableCell>
                      <BookingTableCell className="text-center">
                        {item.isActivated ? 
                          <span className="text-green-600 font-medium">Activated</span> : 
                          <span className="text-gray-600">Inactive</span>
                        }
                      </BookingTableCell>
                      <BookingTableCell>
                        {item.assignedTo || (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </BookingTableCell>
                      <BookingTableCell className="text-center">
                        {item.pagesUsed} / 50
                      </BookingTableCell>
                      <BookingTableCell className="text-center">
                        {!item.isActivated ? (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="hover:bg-green-100 transition-colors"
                            onClick={() => handleActivateBook(item)}
                          >
                            <UserCheck size={16} className="inline text-green-500 mr-1" />
                            Activate
                          </Button>
                        ) : (
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-blue-100 transition-colors"
                              onClick={() => handleViewBook(item)}
                            >
                              <FileText size={16} className="inline text-blue-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="hover:bg-blue-100 transition-colors"
                              onClick={() => handleActivateBook(item)}
                            >
                              <UserCheck size={16} className="inline text-green-500" />
                            </Button>
                          </div>
                        )}
                      </BookingTableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <BookingTableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No invoice books found. Please add a new book.
                    </BookingTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              Showing {filteredData.length > 0 ? '1' : '0'} to {filteredData.length} of {filteredData.length} entries
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Activate Book Dialog */}
      <Dialog open={isActivateDialogOpen} onOpenChange={setIsActivateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate Invoice Book</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-gray-600 mb-4">
              Select a user to activate Book #{selectedBook?.bookNumber}
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
            <Button variant="outline" onClick={() => setIsActivateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmActivation}>
              Activate Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Book Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Invoice Book #{selectedBook?.bookNumber} Details</DialogTitle>
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
                    <dt className="text-sm font-medium text-gray-500">Pages Used</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">{selectedBook?.pagesUsed} / 50</dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">
                      {selectedBook?.assignedTo || "Not assigned"}
                    </dd>
                  </div>
                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900 sm:col-span-2">
                      {selectedBook?.isActivated ? 
                        <span className="text-green-600 font-medium">Activated</span> : 
                        <span className="text-gray-600">Inactive</span>
                      }
                    </dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Available Invoice Numbers</h3>
                <div className="bg-gray-50 rounded-lg p-3 max-h-64 overflow-y-auto">
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedBook?.availablePages.slice(0, 10).map((pageNumber, index) => (
                      <li key={index} className="text-sm text-gray-700 py-1 px-2 bg-white rounded border border-gray-200">
                        {pageNumber}
                      </li>
                    ))}
                    {selectedBook && selectedBook.availablePages.length > 10 && (
                      <li className="text-sm text-gray-500 py-1 px-2">
                        ...and {selectedBook.availablePages.length - 10} more
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
            {selectedBook?.isActivated ? (
              <Button 
                variant="default" 
                className="bg-yellow-500 hover:bg-yellow-600" 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleActivateBook(selectedBook);
                }}
              >
                <UserCheck className="h-4 w-4 mr-1" />
                Reassign User
              </Button>
            ) : (
              <Button onClick={() => {
                setIsViewDialogOpen(false);
                handleActivateBook(selectedBook!);
              }}>
                <UserCheck className="h-4 w-4 mr-1" />
                Activate Book
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default InvoiceBookStock;
