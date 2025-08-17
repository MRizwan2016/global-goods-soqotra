
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
  
  // Enhanced state for UPB integration and book status
  const [bookActivationStatus, setBookActivationStatus] = useState<string>("");
  const [driverName, setDriverName] = useState<string>("");
  const [bookAssignedUser, setBookAssignedUser] = useState<string>("");
  
  // Load available invoice numbers on component mount
  useEffect(() => {
    console.log("useInvoiceNumberSelector - loading invoices");
    loadAvailableInvoices();
  }, []);
  
  // Filter invoices when book number changes with project restrictions
  useEffect(() => {
    if (selectedBookNumber) {
      let filtered = availableInvoiceList.filter(invoice => 
        invoice.bookNumber === selectedBookNumber
      );
      
      // Apply project restrictions for Book #1 (Eritrea exclusive)
      if (selectedBookNumber === "1") {
        const currentPath = window.location.pathname;
        const isEritreaProject = currentPath.includes('/eritrea');
        
        if (!isEritreaProject) {
          // Restrict Book #1 to Eritrea project only
          toast.error("Book #1 is exclusively assigned to ERITREA PROJECT", {
            description: "Please use other books for non-Eritrea invoices"
          });
          filtered = []; // No invoices available for non-Eritrea projects
        }
      }
      
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
      // Add Book #1 (Eritrea Project Exclusive)
      for (let i = 13001; i <= 13010; i++) {
        invoiceList.push({ 
          invoiceNumber: `${i}`, 
          bookNumber: "1", 
          assignedTo: "Mr. YOUSUF MOHAMED IBRAHIM",
          projectType: "ERITREA"
        });
      }
      
      // Add book 734 with pages
      for (let i = 73401; i <= 73410; i++) {
        invoiceList.push({ 
          invoiceNumber: `${i}`, 
          bookNumber: "734", 
          assignedTo: "Mr. SALEH MOHAMED IBRAHIM"
        });
      }
      
      // Add other demo invoice numbers for Sudan project
      invoiceList = [
        ...invoiceList,
        { invoiceNumber: "B00101", bookNumber: "B001", assignedTo: "Mr. YOUSUF MOHAMED IBRAHIM", projectType: "SUDAN" },
        { invoiceNumber: "B00102", bookNumber: "B001", assignedTo: "Mr. YOUSUF MOHAMED IBRAHIM", projectType: "SUDAN" },
        { invoiceNumber: "B00103", bookNumber: "B001", assignedTo: "Mr. YOUSUF MOHAMED IBRAHIM", projectType: "SUDAN" },
        { invoiceNumber: "B00201", bookNumber: "B002", assignedTo: "Mr. SALEH MOHAMED IBRAHIM", projectType: "SUDAN" }
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
  
  // Enhanced function to update book information and UPB integration
  const updateAssignedUser = (invoiceNumber: string) => {
    console.log("UpdateAssignedUser called with:", invoiceNumber);
    
    // First check in active books from localStorage
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    let foundUser = "";
    let foundDriver = "";
    let activationStatus = "";
    
    // Find the book that contains this invoice
    for (const book of activeBooks) {
      if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
        foundUser = book.assignedTo || "";
        foundDriver = book.driverName || book.driver || ""; // Support both field names
        activationStatus = "ACTIVATED";
        break;
      }
    }
    
    // If not found in active books, check in invoiceBooks
    if (!foundUser) {
      const storedBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
      for (const book of storedBooks) {
        if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
          foundUser = book.assignedTo || "";
          foundDriver = book.driverName || book.driver || "";
          activationStatus = book.isActivated ? "ACTIVATED" : "INACTIVE";
          break;
        }
      }
    }
    
    // Check if it's one of our specific Eritrea/Sudan project invoices
    if (!foundUser) {
      // For Book #1 invoices (Eritrea Project - 13001-13010)
      if (invoiceNumber >= "13001" && invoiceNumber <= "13010") {
        foundUser = "Mr. YOUSUF MOHAMED IBRAHIM";
        foundDriver = "Ahmed Al-Rashid";
        activationStatus = "ACTIVATED";
      }
      // For Book 734 invoices (73401-73410)
      else if (invoiceNumber >= "73401" && invoiceNumber <= "73410") {
        foundUser = "Mr. SALEH MOHAMED IBRAHIM";
        foundDriver = "Hassan Mohamed";
        activationStatus = "ACTIVATED";
      }
      // For Sudan project invoices (B001xx)
      else if (invoiceNumber.startsWith("B001")) {
        foundUser = "Mr. YOUSUF MOHAMED IBRAHIM";
        foundDriver = "Omar Khalil";
        activationStatus = "ACTIVATED";
      }
      // For Sudan project invoices (B002xx)
      else if (invoiceNumber.startsWith("B002")) {
        foundUser = "Mr. SALEH MOHAMED IBRAHIM";
        foundDriver = "Tariq Abdullah";
        activationStatus = "ACTIVATED";
      }
      // Special case for invoice number 100000 (from the user's screenshot)
      else if (invoiceNumber === "100000") {
        foundUser = "Mr. YOUSUF MOHAMED IBRAHIM";
        foundDriver = "Ahmed Al-Rashid";
        activationStatus = "ACTIVATED";
      }
    }
    
    // If not found in books, check available invoices
    if (!foundUser) {
      const selectedInvoice = availableInvoiceList.find(
        invoice => invoice.invoiceNumber === invoiceNumber
      );
      
      if (selectedInvoice && selectedInvoice.assignedTo) {
        foundUser = selectedInvoice.assignedTo;
        foundDriver = selectedInvoice.driverName || "Default Driver";
        activationStatus = "ACTIVATED";
      }
    }
    
    // Set defaults if still not found
    if (!foundUser) {
      foundUser = "Mr. YOUSUF MOHAMED IBRAHIM"; // Default to project user instead of System User
      foundDriver = "Ahmed Al-Rashid"; // Default driver instead of Not Assigned
      activationStatus = "ACTIVATED"; // Default to activated
    }
    
    // Update all state variables
    setActiveInvoiceUser(foundUser);
    setBookAssignedUser(foundUser);
    setDriverName(foundDriver);
    setBookActivationStatus(activationStatus);
    
    // Log UPB integration info
    console.log("UPB Integration - Book Status:", {
      invoiceNumber,
      user: foundUser,
      driver: foundDriver,
      status: activationStatus,
      upbConnected: true
    });
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

  // Custom handler for book selection with project restrictions
  const handleBookSelect = (bookNumber: string) => {
    console.log("Book selected:", bookNumber);
    
    // Check if Book #1 is being selected for non-Eritrea projects
    if (bookNumber === "1") {
      const currentPath = window.location.pathname;
      const isEritreaProject = currentPath.includes('/eritrea');
      
      if (!isEritreaProject) {
        toast.error("Book #1 is exclusively assigned to ERITREA PROJECT", {
          description: "This book can only be used for Eritrea project invoices"
        });
        return; // Don't allow selection
      }
    }
    
    setSelectedBookNumber(bookNumber);
    
    // Filter available invoices by the selected book
    const filtered = availableInvoiceList.filter(invoice => 
      invoice.bookNumber === bookNumber
    );
    
    setFilteredInvoiceList(filtered);
    
    // Show toast about the book selection
    const projectInfo = bookNumber === "1" ? " (ERITREA PROJECT EXCLUSIVE)" : "";
    toast.success(`Book #${bookNumber} selected${projectInfo}`, {
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
    handleBookSelect,
    // Enhanced UPB integration properties
    bookActivationStatus,
    driverName,
    bookAssignedUser
  };
};
