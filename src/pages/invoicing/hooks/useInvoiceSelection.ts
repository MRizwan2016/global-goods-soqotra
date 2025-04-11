
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { mockInvoiceBooks } from "../constants/mockInvoiceBooks";
import { FormState } from "../types/invoiceForm";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";

export const useInvoiceSelection = (
  isEditing: boolean,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
) => {
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    if (isEditing) return;
    
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
    
    if (activeBooks.length > 0) {
      // Use active books from localStorage
      const activeInvoices = activeBooks.flatMap((book: any) => {
        // Filter out already used invoice numbers
        const availablePages = book.availablePages.filter(
          (page: string) => !allUsedNumbers.includes(page)
        );
        
        return availablePages.map((pageNumber: string) => ({
          bookNumber: book.bookNumber,
          invoiceNumber: pageNumber,
          assignedTo: book.assignedTo || 'Unassigned'
        }));
      });
      
      console.log("Available active invoices:", activeInvoices);
      setAvailableInvoices(activeInvoices);
    } else if (allStoredBooks.length > 0) {
      // If no active books but we have stored books
      const storedInvoices = allStoredBooks
        .filter((book: any) => book.isActivated)
        .flatMap((book: any) => {
          // Filter out already used invoice numbers
          const availablePages = book.availablePages.filter(
            (page: string) => !allUsedNumbers.includes(page)
          );
          
          return availablePages.map((pageNumber: string) => ({
            bookNumber: book.bookNumber,
            invoiceNumber: pageNumber,
            assignedTo: book.assignedTo || 'System User'
          }));
        });
      
      console.log("Available stored invoices:", storedInvoices);
      setAvailableInvoices(storedInvoices);
    } else {
      // Fall back to mock data if no active books in localStorage
      const allInvoices = mockInvoiceBooks.flatMap(book => {
        // Filter out already used invoice numbers
        const availablePages = book.available.filter(
          (page) => !allUsedNumbers.includes(page)
        );
        
        return availablePages.map(num => ({
          bookNumber: book.bookNumber,
          invoiceNumber: num,
          assignedTo: book.assignedTo || 'Default User'
        }));
      });
      
      console.log("Available mock invoices:", allInvoices);
      setAvailableInvoices(allInvoices);
    }
  }, [isEditing]);
  
  const handleSelectInvoice = (invoiceNumber: string) => {
    // Find the selected invoice in our available invoices
    const selectedInvoice = availableInvoices.find(
      invoice => invoice.invoiceNumber === invoiceNumber
    );
    
    setFormState(prev => ({
      ...prev,
      invoiceNumber
    }));
    
    // Show toast with user assignment if available
    if (selectedInvoice && selectedInvoice.assignedTo) {
      toast.success(`Invoice number ${invoiceNumber} selected (assigned to ${selectedInvoice.assignedTo})`);
    } else {
      toast.success(`Invoice number ${invoiceNumber} selected`);
    }
    
    setShowInvoiceSelector(false);
  };
  
  return {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice
  };
};
