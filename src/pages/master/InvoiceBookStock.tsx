
import { useState } from "react";
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
import { PenLine, UserCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

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
}

// Mock users for the system
const mockUsers: User[] = [
  { id: "1", name: "Mr. Lahiru" },
  { id: "2", name: "Mr. Evans" },
  { id: "3", name: "Mr. Paul Onchana" },
  { id: "4", name: "Mr. Paulo Fernando" },
  { id: "5", name: "Mr. Edwin Mbuguo" },
  { id: "6", name: "Mr. Ali Hussain" },
];

// Initialize mock data with available pages
const initialBookData: InvoiceBook[] = Array.from({ length: 10 }, (_, i) => {
  const startPage = i === 0 ? 10000 : (10000 + (i * 50));
  const availablePages = Array.from({ length: 50 }, (_, j) => (startPage + j).toString().padStart(6, '0'));
  
  return {
    id: (i + 1).toString(),
    bookNumber: (722 + i).toString(),
    startPage: startPage.toString().padStart(6, '0'),
    endPage: (startPage + 49).toString().padStart(6, '0'),
    isIssued: false,
    isActivated: false,
    pagesUsed: 0,
    availablePages
  };
});

const InvoiceBookStock = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBookData] = useState<InvoiceBook[]>(initialBookData);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<InvoiceBook | null>(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  
  // Filter booking data based on search term
  const filteredData = bookData.filter(item => {
    if (!searchTerm) return true;
    return (
      item.bookNumber.includes(searchTerm) || 
      item.startPage.includes(searchTerm) || 
      item.endPage.includes(searchTerm)
    );
  });
  
  const handleActivateBook = (book: InvoiceBook) => {
    setSelectedBook(book);
    setSelectedUserId("");
    setIsActivateDialogOpen(true);
  };
  
  const confirmActivation = () => {
    if (!selectedBook || !selectedUserId) {
      toast.error("Please select a user to activate this book");
      return;
    }
    
    const selectedUser = mockUsers.find(user => user.id === selectedUserId);
    
    if (!selectedUser) {
      toast.error("Invalid user selection");
      return;
    }
    
    // Update the book data with activation info
    setBookData(prev => 
      prev.map(book => 
        book.id === selectedBook.id 
        ? { 
            ...book, 
            isActivated: true, 
            assignedTo: selectedUser.name
          } 
        : book
      )
    );
    
    setIsActivateDialogOpen(false);
    toast.success(`Book #${selectedBook.bookNumber} has been successfully activated for ${selectedUser.name}`);
    
    // Store activation data in localStorage for use in invoice form
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    activeBooks.push({
      bookNumber: selectedBook.bookNumber,
      assignedTo: selectedUser.name,
      availablePages: selectedBook.availablePages,
      pagesUsed: 0
    });
    localStorage.setItem('activeInvoiceBooks', JSON.stringify(activeBooks));
  };
  
  return (
    <Layout title="Invoice Book Stock">
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
              <Link to="/master/invoice-book/add">
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
                {filteredData.map((item) => (
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
                    <BookingTableCell>{item.assignedTo || "-"}</BookingTableCell>
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
                        <Button variant="ghost" size="sm" className="hover:bg-blue-100 transition-colors">
                          <PenLine size={16} className="inline text-blue-500" />
                        </Button>
                      )}
                    </BookingTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm">
              Showing 1 to {filteredData.length} of {filteredData.length} entries
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-blue-500 text-white">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </div>
      </div>

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
    </Layout>
  );
};

export default InvoiceBookStock;
