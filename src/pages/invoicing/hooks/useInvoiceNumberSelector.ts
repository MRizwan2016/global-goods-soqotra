
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
    setManualInvoiceNumber("");
    setShowManualEntry(false);
    
    // Show success toast
    toast.success(`Invoice number ${formattedNumber} selected manually`);
  };

  return {
    activeInvoiceUser,
    isDuplicate,
    availableInvoiceList,
    showManualEntry,
    manualInvoiceNumber,
    setManualInvoiceNumber,
    setShowManualEntry,
    onInvoiceSelect,
    handleManualSubmit,
    loadAvailableInvoices
  };
};
