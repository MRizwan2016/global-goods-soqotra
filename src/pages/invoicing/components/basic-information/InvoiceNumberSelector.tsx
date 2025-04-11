
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle, Plus } from "lucide-react";
import { mockInvoiceBooks } from "../../constants/mockInvoiceBooks";
import { Button } from "@/components/ui/button";

interface InvoiceNumberSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
}

const InvoiceNumberSelector: React.FC<InvoiceNumberSelectorProps> = ({
  formState,
  handleSelectInvoice,
  availableInvoices,
  isEditing
}) => {
  const [activeInvoiceUser, setActiveInvoiceUser] = useState<string>("");
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [availableInvoiceList, setAvailableInvoiceList] = useState<any[]>([]);
  const [showManualEntry, setShowManualEntry] = useState<boolean>(false);
  const [manualInvoiceNumber, setManualInvoiceNumber] = useState<string>("");
  
  // Load available invoice numbers on component mount
  useEffect(() => {
    loadAvailableInvoices();
  }, []);
  
  const loadAvailableInvoices = () => {
    // Get active invoice books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
    // Get used invoice numbers to filter them out
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Also check generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const generatedInvoiceNumbers = generatedInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Combine all used numbers
    const allUsedNumbers = [...usedInvoiceNumbers, ...generatedInvoiceNumbers];
    
    let invoiceList: any[] = [];
    
    // Get invoices from active books
    if (activeBooks.length > 0) {
      activeBooks.forEach((book: any) => {
        if (book.availablePages && book.assignedTo) {
          // Filter out already used invoice numbers
          const availableFromBook = book.availablePages
            .filter((invoiceNo: string) => !allUsedNumbers.includes(invoiceNo))
            .map((invoiceNo: string) => ({
              invoiceNumber: invoiceNo,
              bookNumber: book.bookNumber,
              assignedTo: book.assignedTo
            }));
            
          invoiceList = [...invoiceList, ...availableFromBook];
        }
      });
    } else if (storedBooks.length > 0) {
      // If no active books, try stored books
      storedBooks.forEach((book: any) => {
        if (book.isActivated && book.availablePages) {
          // Filter out already used invoice numbers
          const availableFromBook = book.availablePages
            .filter((invoiceNo: string) => !allUsedNumbers.includes(invoiceNo))
            .map((invoiceNo: string) => ({
              invoiceNumber: invoiceNo,
              bookNumber: book.bookNumber,
              assignedTo: book.assignedTo || 'System User'
            }));
            
          invoiceList = [...invoiceList, ...availableFromBook];
        }
      });
    } 
    
    // If no active books or stored books, use mock data as fallback
    if (invoiceList.length === 0) {
      // Create mock data with GY prefix
      const mockInvoices = [];
      for (let i = 1; i <= 100; i++) {
        const num = i.toString().padStart(6, '0');
        mockInvoices.push(`GY${num}`);
      }
      
      // Filter out used invoice numbers
      const availableMockInvoices = mockInvoices
        .filter(invoiceNo => !allUsedNumbers.includes(invoiceNo))
        .map(invoiceNo => ({
          invoiceNumber: invoiceNo,
          bookNumber: "Default",
          assignedTo: 'System User'
        }));
      
      invoiceList = [...invoiceList, ...availableMockInvoices];
    }
    
    console.log("Available invoice list:", invoiceList);
    setAvailableInvoiceList(invoiceList);
  };
  
  // Check for duplicate invoice numbers when form state changes
  useEffect(() => {
    if (formState.invoiceNumber) {
      checkForDuplicateInvoice(formState.invoiceNumber);
      updateAssignedUser(formState.invoiceNumber);
    }
  }, [formState.invoiceNumber]);
  
  // Function to update the assigned user when an invoice is selected
  const updateAssignedUser = (invoiceNumber: string) => {
    // First check in active books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    let foundUser = "";
    
    // Find the book that contains this invoice
    for (const book of activeBooks) {
      if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
        foundUser = book.assignedTo || "";
        break;
      }
    }
    
    // If not found in active books, check in invoiceBooks
    if (!foundUser) {
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      for (const book of storedBooks) {
        if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
          foundUser = book.assignedTo || "";
          break;
        }
      }
    }
    
    // If not found in active books, check available invoices
    if (!foundUser) {
      const selectedInvoice = availableInvoices.find(
        invoice => invoice.invoiceNumber === invoiceNumber
      );
      
      if (selectedInvoice && selectedInvoice.assignedTo) {
        foundUser = selectedInvoice.assignedTo;
      }
    }
    
    // If still not found, default to System User
    if (!foundUser) {
      foundUser = "System User";
    }
    
    setActiveInvoiceUser(foundUser);
  };

  // Function to check if the invoice number is already in use
  const checkForDuplicateInvoice = (invoiceNumber: string) => {
    // Skip validation for edit mode as we're editing an existing invoice
    if (isEditing) {
      setIsDuplicate(false);
      return;
    }
    
    // Get existing invoices from localStorage
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Check if the invoice number is already used
    const duplicateFound = existingInvoices.some((invoice: any) => 
      invoice.invoiceNumber === invoiceNumber
    );
    
    // Also check in generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const duplicateInGenerated = generatedInvoices.some((invoice: any) => 
      invoice.invoiceNumber === invoiceNumber
    );
    
    // Update the duplicate state
    const isDuplicateFound = duplicateFound || duplicateInGenerated;
    setIsDuplicate(isDuplicateFound);
    
    // Show warning toast if duplicate is found
    if (isDuplicateFound) {
      toast.warning("Duplicate Invoice Number", {
        description: `Invoice number ${invoiceNumber} is already assigned to another customer`,
        duration: 5000,
      });
    }
  };

  // Custom handler for invoice selection
  const onInvoiceSelect = (value: string) => {
    // Display user immediately on selection
    const selectedInvoice = availableInvoiceList.find(inv => inv.invoiceNumber === value);
    if (selectedInvoice && selectedInvoice.assignedTo) {
      setActiveInvoiceUser(selectedInvoice.assignedTo);
    } else {
      setActiveInvoiceUser("System User");
    }
    
    // Check for duplicate before setting
    checkForDuplicateInvoice(value);
    handleSelectInvoice(value);
  };

  // Handle manual invoice entry
  const handleManualSubmit = () => {
    if (!manualInvoiceNumber) {
      toast.error("Please enter an invoice number");
      return;
    }
    
    // Format the invoice number (ensure GY prefix if not present)
    const formattedNumber = manualInvoiceNumber.startsWith("GY") 
      ? manualInvoiceNumber 
      : `GY${manualInvoiceNumber}`;
    
    checkForDuplicateInvoice(formattedNumber);
    handleSelectInvoice(formattedNumber);
    setShowManualEntry(false);
  };

  return (
    <div className="space-y-2">
      <Label>Invoice Number</Label>
      
      {isEditing ? (
        <Input
          name="invoiceNumber"
          value={formState.invoiceNumber || ""}
          readOnly={true}
          className="w-full"
        />
      ) : (
        <>
          {!showManualEntry ? (
            <div className="w-full relative">
              {availableInvoiceList.length > 0 ? (
                <Select
                  value={formState.invoiceNumber || ""}
                  onValueChange={onInvoiceSelect}
                  disabled={isEditing}
                >
                  <SelectTrigger className={`w-full ${isDuplicate ? 'border-red-500 bg-red-50' : ''}`}>
                    <SelectValue placeholder="Select invoice number" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {availableInvoiceList.map((invoice: any) => (
                      <SelectItem 
                        key={invoice.invoiceNumber} 
                        value={invoice.invoiceNumber}
                        className="flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span>{invoice.invoiceNumber}</span>
                          <span className="text-xs text-gray-500">Book {invoice.bookNumber}</span>
                        </div>
                        {invoice.assignedTo && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {invoice.assignedTo}
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex gap-2">
                  <Input 
                    value="No invoice numbers available"
                    readOnly
                    className="w-full bg-gray-100"
                  />
                  <Button 
                    type="button" 
                    onClick={() => setShowManualEntry(true)}
                    className="whitespace-nowrap"
                  >
                    Enter Manually
                  </Button>
                </div>
              )}
              
              {isDuplicate && (
                <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" size={16} />
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Input 
                placeholder="Enter invoice number (e.g., GY000123)"
                value={manualInvoiceNumber}
                onChange={(e) => setManualInvoiceNumber(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleManualSubmit}
                className="whitespace-nowrap"
              >
                Submit
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowManualEntry(false);
                  loadAvailableInvoices();
                }}
                className="whitespace-nowrap"
              >
                Cancel
              </Button>
            </div>
          )}
          
          {!showManualEntry && availableInvoiceList.length > 0 && (
            <div className="mt-1 flex justify-end">
              <Button 
                type="button" 
                variant="link" 
                className="p-0 h-auto text-xs"
                onClick={() => setShowManualEntry(true)}
              >
                <Plus className="h-3 w-3 mr-1" /> Enter invoice number manually
              </Button>
            </div>
          )}
        </>
      )}
      
      <div className="flex gap-2 items-center">
        {activeInvoiceUser && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            {activeInvoiceUser}
          </div>
        )}
        {isDuplicate && !isEditing && (
          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            Duplicate
          </div>
        )}
      </div>
      
      {isDuplicate && !isEditing && (
        <div className="text-sm text-red-600 flex items-center mt-1">
          <AlertCircle size={14} className="mr-1" />
          This invoice number is already assigned to another customer
        </div>
      )}
    </div>
  );
};

export default InvoiceNumberSelector;
