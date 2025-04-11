
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { mockInvoiceBooks } from "../../constants/mockInvoiceBooks";

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
  
  // Load available invoice numbers on component mount
  useEffect(() => {
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
    
    if (invoiceList.length === 0) {
      // Fallback to mock data if no invoices found in storage
      mockInvoiceBooks.forEach(book => {
        // Filter out already used invoice numbers
        const availableFromBook = book.available
          .filter((invoiceNo) => !allUsedNumbers.includes(invoiceNo))
          .map((invoiceNo) => ({
            invoiceNumber: invoiceNo,
            bookNumber: book.bookNumber,
            assignedTo: book.assignedTo || 'Default User'
          }));
          
        invoiceList = [...invoiceList, ...availableFromBook];
      });
    }
    
    setAvailableInvoiceList(invoiceList);
  }, []);
  
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
    
    // If still not found, check mock data
    if (!foundUser) {
      for (const book of mockInvoiceBooks) {
        if (book.available.includes(invoiceNumber)) {
          foundUser = book.assignedTo || '';
          break;
        }
      }
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
    }
    
    // Check for duplicate before setting
    checkForDuplicateInvoice(value);
    handleSelectInvoice(value);
  };

  return (
    <div className="space-y-2">
      <Label>Invoice Number</Label>
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <Input
            name="invoiceNumber"
            value={formState.invoiceNumber || ""}
            readOnly={true}
            className="w-full"
          />
        ) : (
          <div className="w-full relative">
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
            {isDuplicate && (
              <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" size={16} />
            )}
          </div>
        )}
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
