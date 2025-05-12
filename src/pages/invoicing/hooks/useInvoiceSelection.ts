
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";
// Import the utility directly using ES modules
import { ensureInvoiceAvailability } from "../utils/invoiceNumberGenerator";

export const useInvoiceSelection = (
  isEditing: boolean,
  setFormState: React.Dispatch<React.SetStateAction<any>>
) => {
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    if (isEditing) return;
    
    loadAvailableInvoices();
  }, [isEditing]);
  
  const loadAvailableInvoices = () => {
    console.log("Loading available invoices...");
    
    // Get active invoice books from localStorage
    let activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    let allStoredBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
    // Create demo books if none exist
    if (activeBooks.length === 0 && allStoredBooks.length === 0) {
      console.log("Creating demo invoice books");
      const demoBook1 = {
        id: "book1",
        bookNumber: "B001",
        startNumber: "GY100001",
        endNumber: "GY100050",
        availablePages: [
          "GY100001", "GY100002", "GY100003", "GY100004", "GY100005",
          "GY100006", "GY100007", "GY100008", "GY100009", "GY100010"
        ],
        isActivated: true,
        country: "Qatar",
        branch: "Doha"
      };
      
      const demoBook2 = {
        id: "book2",
        bookNumber: "B002",
        startNumber: "GY200001",
        endNumber: "GY200050",
        availablePages: [
          "GY200001", "GY200002", "GY200003", "GY200004", "GY200005"
        ],
        isActivated: true,
        country: "Qatar",
        branch: "Al Rayyan"
      };
      
      activeBooks = [demoBook1, demoBook2];
      localStorage.setItem('activeInvoiceBooks', JSON.stringify(activeBooks));
      
      allStoredBooks = [...activeBooks];
      localStorage.setItem('invoiceBooks', JSON.stringify(allStoredBooks));
    }
    
    // Get used invoice numbers to filter them out
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Also check generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const generatedInvoiceNumbers = generatedInvoices.map((inv: any) => inv.invoiceNumber);
    
    // Combine all used numbers
    const allUsedNumbers = [...usedInvoiceNumbers, ...generatedInvoiceNumbers];
    
    let invoiceList: any[] = [];
    
    if (activeBooks.length > 0) {
      // Use active books from localStorage
      activeBooks.forEach((book: any) => {
        if (book.availablePages && Array.isArray(book.availablePages)) {
          // Filter out already used invoice numbers
          const availablePages = book.availablePages.filter(
            (page: string) => !allUsedNumbers.includes(page)
          );
          
          // Add detailed information for each invoice
          invoiceList = [
            ...invoiceList,
            ...availablePages.map((pageNumber: string) => ({
              bookNumber: book.bookNumber,
              invoiceNumber: pageNumber,
              assignedTo: book.assignedTo || undefined
            }))
          ];
        }
      });
    } 
    
    if (invoiceList.length === 0 && allStoredBooks.length > 0) {
      // If no active books but we have stored books
      allStoredBooks
        .filter((book: any) => book.isActivated && !book.assignedTo)
        .forEach((book: any) => {
          if (book.availablePages && Array.isArray(book.availablePages)) {
            // Filter out already used invoice numbers
            const availablePages = book.availablePages.filter(
              (page: string) => !allUsedNumbers.includes(page)
            );
            
            invoiceList = [
              ...invoiceList,
              ...availablePages.map((pageNumber: string) => ({
                bookNumber: book.bookNumber,
                invoiceNumber: pageNumber,
                assignedTo: book.assignedTo || undefined
              }))
            ];
          }
        });
    }
    
    // If still no invoices available, create demo ones
    if (invoiceList.length === 0) {
      invoiceList = [
        { invoiceNumber: "GY100001", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY100002", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY100003", bookNumber: "B001", assignedTo: undefined },
        { invoiceNumber: "GY200001", bookNumber: "B002", assignedTo: undefined }
      ];
    }
    
    console.log("Available invoices:", invoiceList);
    setAvailableInvoices(invoiceList);
  };
  
  const handleSelectInvoice = (invoiceNumber: string) => {
    console.log(`Selecting invoice number: ${invoiceNumber}`);
    
    // Get any linked job number
    const jobNumber = JobStorageService.getJobNumberByInvoiceNumber(invoiceNumber) || "";
    
    // Get the book info for this invoice for display purposes
    const bookInfo = getBookInfoByInvoiceNumber(invoiceNumber);
    const assignedInfo = bookInfo?.assignedTo ? ` (assigned to ${bookInfo.assignedTo})` : "";
    
    // Update form state with the selected invoice number and job number if available
    setFormState(prev => ({
      ...prev,
      invoiceNumber,
      jobNumber
    }));
    
    // Show toast with book and job number info
    let toastMessage = `Invoice ${invoiceNumber} selected from Book #${bookInfo?.bookNumber || "Unknown"}${assignedInfo}`;
    if (jobNumber) {
      toastMessage += ` - Job #${jobNumber}`;
    }
    toast.success(toastMessage);
    
    setShowInvoiceSelector(false);
  };
  
  // Helper function to get book information for an invoice number
  const getBookInfoByInvoiceNumber = (invoiceNumber: string) => {
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const allStoredBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    const allBooks = [...activeBooks, ...allStoredBooks];
    
    for (const book of allBooks) {
      if (book.availablePages && book.availablePages.includes(invoiceNumber)) {
        return {
          bookNumber: book.bookNumber,
          assignedTo: book.assignedTo
        };
      }
    }
    
    // Check if it's one of our demo invoices
    if (invoiceNumber.startsWith("GY1000")) {
      return { bookNumber: "B001", assignedTo: undefined };
    } else if (invoiceNumber.startsWith("GY2000")) {
      return { bookNumber: "B002", assignedTo: undefined };
    }
    
    return null;
  };
  
  return {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice,
    loadAvailableInvoices
  };
};
