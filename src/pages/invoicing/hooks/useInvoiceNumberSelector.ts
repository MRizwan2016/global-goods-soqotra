
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ensureInvoiceAvailability } from "../utils/invoiceNumberGenerator";

interface UseInvoiceNumberSelectorProps {
  formState: any;
  isEditing: boolean;
  handleSelectInvoice: (invoiceNumber: string) => void;
}

export const useInvoiceNumberSelector = ({
  formState,
  isEditing,
  handleSelectInvoice
}: UseInvoiceNumberSelectorProps) => {
  const [activeInvoiceUser, setActiveInvoiceUser] = useState<string>("");
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [availableInvoiceList, setAvailableInvoiceList] = useState<any[]>([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState<any[]>([]);
  const [selectedBookNumber, setSelectedBookNumber] = useState<string>("");
  const [showManualEntry, setShowManualEntry] = useState<boolean>(false);
  const [manualInvoiceNumber, setManualInvoiceNumber] = useState<string>("");
  
  // Load available invoice numbers on component mount
  useEffect(() => {
    console.log("useInvoiceNumberSelector - loading invoices");
    loadAvailableInvoices();
  }, []);
  
  // Filter invoices when book number changes
  useEffect(() => {
    if (selectedBookNumber) {
      const filtered = availableInvoiceList.filter(invoice => 
        invoice.bookNumber === selectedBookNumber
      );
      console.log(`Filtered invoices by book ${selectedBookNumber}:`, filtered);
      setFilteredInvoiceList(filtered);
      
      // If we have filtered invoices available, select the first one automatically
      if (filtered.length > 0 && !formState.invoiceNumber) {
        const firstInvoice = filtered[0].invoiceNumber;
        handleSelectInvoice(firstInvoice);
        toast.success(`Book #${selectedBookNumber} selected with invoice ${firstInvoice}`);
      }
    } else {
      setFilteredInvoiceList(availableInvoiceList);
    }
  }, [selectedBookNumber, availableInvoiceList, formState.invoiceNumber, handleSelectInvoice]);
  
  const loadAvailableInvoices = () => {
    // First, make sure we have invoice numbers available
    ensureInvoiceAvailability();
    
    console.log("Loading available invoices...");
    
    // Get active invoice books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
    console.log("Active books:", activeBooks);
    console.log("Stored books:", storedBooks);
    
    // Get used invoice numbers to filter them out
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Also check generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const generatedInvoiceNumbers = generatedInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Combine all used numbers
    const allUsedNumbers = [...usedInvoiceNumbers, ...generatedInvoiceNumbers];
    
    let invoiceList: any[] = [];
    
    // Check if we have active books
    if (activeBooks.length > 0) {
      console.log("Processing active books...");
      activeBooks.forEach((book: any) => {
        if (book.availablePages && Array.isArray(book.availablePages)) {
          console.log(`Book ${book.bookNumber} has ${book.availablePages.length} pages`);
          
          // Map all available pages to invoice objects
          const availableFromBook = book.availablePages
            .filter((invoiceNo: string) => !allUsedNumbers.includes(invoiceNo))
            .map((invoiceNo: string) => ({
              invoiceNumber: invoiceNo,
              bookNumber: book.bookNumber,
              assignedTo: book.assignedTo || undefined
            }));
            
          invoiceList = [...invoiceList, ...availableFromBook];
        } else {
          console.log(`Book ${book.bookNumber} has no available pages or pages is not an array`);
        }
      });
    } else if (storedBooks.length > 0) {
      // If no active books, try stored books
      console.log("No active books found, using stored books");
      storedBooks.forEach((book: any) => {
        if (book.isActivated && book.availablePages && Array.isArray(book.availablePages)) {
          const availableFromBook = book.availablePages
            .filter((invoiceNo: string) => !allUsedNumbers.includes(invoiceNo))
            .map((invoiceNo: string) => ({
              invoiceNumber: invoiceNo,
              bookNumber: book.bookNumber,
              assignedTo: book.assignedTo || undefined
            }));
            
          invoiceList = [...invoiceList, ...availableFromBook];
        }
      });
    }
    
    // If still no invoices, create some demo ones
    if (invoiceList.length === 0) {
      console.log("No invoices found in books, creating demo invoices");
      // Add book 734 with pages 1001-1010
      for (let i = 1001; i <= 1010; i++) {
        invoiceList.push({ 
          invoiceNumber: `734-${i}`, 
          bookNumber: "734", 
          assignedTo: undefined
        });
      }
      
      // Add other demo invoice numbers
      invoiceList = [
        ...invoiceList,
        { invoiceNumber: "GY100001", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY100002", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY100003", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY200001", bookNumber: "B002", assignedTo: undefined }
      ];
    }
    
    console.log("Available invoice list:", invoiceList);
    setAvailableInvoiceList(invoiceList);
    setFilteredInvoiceList(invoiceList);
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
      const selectedInvoice = availableInvoiceList.find(
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

  // Custom handler for book selection
  const handleBookSelect = (bookNumber: string) => {
    console.log("Book selected:", bookNumber);
    setSelectedBookNumber(bookNumber);
    
    // Filter available invoices by the selected book
    const filtered = availableInvoiceList.filter(invoice => 
      invoice.bookNumber === bookNumber
    );
    
    setFilteredInvoiceList(filtered);
    
    // Show toast about the book selection
    toast.success(`Book #${bookNumber} selected`, {
      description: `${filtered.length} invoice pages available in this book`,
    });
  };

  // Custom handler for invoice selection
  const onInvoiceSelect = (value: string) => {
    console.log("Invoice selected:", value);
    
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
    setManualInvoiceNumber("");
    setShowManualEntry(false);
    
    // Show success toast
    toast.success(`Invoice number ${formattedNumber} selected manually`);
  };

  return {
    activeInvoiceUser,
    isDuplicate,
    availableInvoiceList,
    filteredInvoiceList,
    showManualEntry,
    manualInvoiceNumber,
    selectedBookNumber,
    setManualInvoiceNumber,
    setShowManualEntry,
    setSelectedBookNumber,
    onInvoiceSelect,
    handleManualSubmit,
    loadAvailableInvoices,
    handleBookSelect
  };
};
