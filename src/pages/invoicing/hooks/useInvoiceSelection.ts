
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
    const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
    const allStoredBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
    
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
        if (book.availablePages) {
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
          if (book.availablePages) {
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
    
    // We no longer add mock invoices - let's create real GY invoices if needed
    if (invoiceList.length === 0) {
      // We'll use the utility function to ensure invoice availability
      ensureInvoiceAvailability();
      
      // After ensuring availability, try loading again
      const refreshedActiveBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      
      refreshedActiveBooks
        .filter((book: any) => !book.assignedTo)
        .forEach((book: any) => {
          if (book.availablePages) {
            // Filter out already used invoice numbers
            const availablePages = book.availablePages.filter(
              (page: string) => !allUsedNumbers.includes(page)
            );
            
            invoiceList = [
              ...invoiceList,
              ...availablePages.map((pageNumber: string) => ({
                invoiceNumber: pageNumber,
                bookNumber: book.bookNumber,
                assignedTo: book.assignedTo || undefined
              }))
            ];
          }
        });
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
