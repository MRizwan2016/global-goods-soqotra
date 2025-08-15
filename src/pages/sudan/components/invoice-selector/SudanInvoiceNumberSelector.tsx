import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface SudanInvoiceNumberSelectorProps {
  formData: any;
  handleFormChange: (field: string, value: any) => void;
  onSalesRepChange?: (rep: string) => void;
  onDriverChange?: (driver: string) => void;
}

const SudanInvoiceNumberSelector: React.FC<SudanInvoiceNumberSelectorProps> = ({
  formData,
  handleFormChange,
  onSalesRepChange,
  onDriverChange
}) => {
  const [selectedBookNumber, setSelectedBookNumber] = useState("");
  const [availableInvoices, setAvailableInvoices] = useState([]);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null);
  const [availableBooks, setAvailableBooks] = useState([]);

  // Load available books from booking form stock
  useEffect(() => {
    const loadBooks = () => {
      try {
        const bookingFormStock = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
        
        const activeBooks = bookingFormStock.filter(book => 
          book.status === 'ACTIVE' && 
          book.assignedTo && 
          book.available && 
          book.available.length > 0 &&
          book.country === 'SUDAN'
        );
        
        setAvailableBooks(activeBooks);
      } catch (error) {
        console.error('Error loading books:', error);
        setAvailableBooks([]);
      }
    };

    loadBooks();
    
    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === 'invoiceBooks') {
        loadBooks();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Load available invoice numbers when book is selected
  useEffect(() => {
    if (selectedBookNumber) {
      const book = availableBooks.find(b => b.bookNumber === selectedBookNumber);
      if (book && book.available) {
        const invoiceNumbers = book.available.map(invoiceNum => ({
          invoiceNumber: invoiceNum,
          bookNumber: selectedBookNumber,
          assignedTo: book.assignedTo,
          // Get driver from local storage or set default
          driverName: localStorage.getItem(`driver_${selectedBookNumber}`) || 'AVAILABLE'
        }));
        setAvailableInvoices(invoiceNumbers);
      } else {
        setAvailableInvoices([]);
      }
    } else {
      setAvailableInvoices([]);
    }
  }, [selectedBookNumber, availableBooks]);

  // Handle book selection
  const handleBookSelect = (bookNumber: string) => {
    setSelectedBookNumber(bookNumber);
    handleFormChange('selectedBookNumber', bookNumber);
    
    // Clear previous invoice selection
    setSelectedInvoiceData(null);
    handleFormChange('invoiceNumber', '');
    
    // Auto-fill sales rep from book assignment
    const book = availableBooks.find(b => b.bookNumber === bookNumber);
    if (book && book.assignedTo) {
      handleFormChange('salesRep', book.assignedTo);
      if (onSalesRepChange) {
        onSalesRepChange(book.assignedTo);
      }
      toast.success(`Book ${bookNumber} selected. Sales Rep: ${book.assignedTo}`);
    }
  };

  // Handle invoice selection
  const handleInvoiceSelect = (invoiceNumber: string) => {
    const invoice = availableInvoices.find(inv => inv.invoiceNumber === invoiceNumber);
    if (invoice) {
      setSelectedInvoiceData(invoice);
      handleFormChange('invoiceNumber', invoiceNumber);
      handleFormChange('selectedBookNumber', invoice.bookNumber);
      handleFormChange('assignedUser', invoice.assignedTo);
      
      // Auto-fill sales rep and driver
      if (invoice.assignedTo) {
        handleFormChange('salesRep', invoice.assignedTo);
        if (onSalesRepChange) {
          onSalesRepChange(invoice.assignedTo);
        }
      }
      
      if (invoice.driverName && invoice.driverName !== 'AVAILABLE') {
        handleFormChange('driver', invoice.driverName);
        if (onDriverChange) {
          onDriverChange(invoice.driverName);
        }
      }
      
      toast.success(`Invoice ${invoiceNumber} selected from Book ${invoice.bookNumber}`);
    }
  };

  return (
    <Card>
      <CardHeader className="bg-indigo-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          INVOICE NUMBER SELECTION (UPB INTEGRATED)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Number Selection */}
          <div className="space-y-2">
            <Label htmlFor="bookNumber">SELECT BOOK NUMBER</Label>
            <Select value={selectedBookNumber} onValueChange={handleBookSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select book number" />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
                {availableBooks.length > 0 ? (
                  availableBooks.map((book) => (
                    <SelectItem key={book.bookNumber} value={book.bookNumber}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{book.bookNumber}</span>
                        </div>
                        <div className="flex flex-col text-xs text-gray-500 ml-2">
                          <span>Pages: {book.startPage}-{book.endPage}</span>
                          <span>Available: {book.available?.length || 0}</span>
                          <span>Rep: {book.assignedTo}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-gray-500 text-center">
                    No active books available
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Invoice Number Selection */}
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">SELECT INVOICE NUMBER</Label>
            <Select 
              value={formData.invoiceNumber || ""} 
              onValueChange={handleInvoiceSelect}
              disabled={!selectedBookNumber}
            >
              <SelectTrigger>
                <SelectValue placeholder={
                  selectedBookNumber ? "Select invoice number" : "Select book first"
                } />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
                {availableInvoices.length > 0 ? (
                  availableInvoices.map((invoice) => (
                    <SelectItem key={invoice.invoiceNumber} value={invoice.invoiceNumber}>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-500" />
                          <span className="font-medium">{invoice.invoiceNumber}</span>
                        </div>
                        <div className="flex flex-col text-xs text-gray-500 ml-2">
                          <span>Book: {invoice.bookNumber}</span>
                          <span>Rep: {invoice.assignedTo}</span>
                          <span>Driver: {invoice.driverName}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : selectedBookNumber ? (
                  <div className="p-2 text-gray-500 text-center">
                    No invoices available in this book
                  </div>
                ) : (
                  <div className="p-2 text-gray-500 text-center">
                    Select a book first
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selection Status */}
        {selectedInvoiceData && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
              <User className="h-4 w-4" />
              SELECTION STATUS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Invoice:</span> {selectedInvoiceData.invoiceNumber}
              </div>
              <div>
                <span className="font-medium">Book:</span> {selectedInvoiceData.bookNumber}
              </div>
              <div>
                <span className="font-medium">Sales Rep:</span> {selectedInvoiceData.assignedTo}
              </div>
              <div>
                <span className="font-medium">Driver:</span> {selectedInvoiceData.driverName}
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Alternative */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <Label htmlFor="manualInvoiceNumber">OR ENTER MANUAL INVOICE NUMBER</Label>
            <Input
              id="manualInvoiceNumber"
              value={formData.invoiceNumber || ""}
              onChange={(e) => {
                handleFormChange('invoiceNumber', e.target.value);
                // Clear book selection if manual entry is used
                if (e.target.value && !selectedInvoiceData) {
                  setSelectedBookNumber("");
                  setSelectedInvoiceData(null);
                  handleFormChange('selectedBookNumber', '');
                }
              }}
              placeholder="Enter invoice number manually"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SudanInvoiceNumberSelector;