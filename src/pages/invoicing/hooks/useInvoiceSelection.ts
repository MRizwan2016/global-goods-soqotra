
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { mockInvoiceBooks } from "../constants/mockInvoiceBooks";
import { FormState } from "../types/invoiceForm";

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
    
    if (activeBooks.length > 0) {
      // Use active books from localStorage
      const activeInvoices = activeBooks.flatMap((book: any) => 
        book.availablePages.map((pageNumber: string) => ({
          bookNumber: book.bookNumber,
          invoiceNumber: pageNumber,
          assignedTo: book.assignedTo
        }))
      );
      setAvailableInvoices(activeInvoices);
    } else {
      // Fall back to mock data if no active books in localStorage
      const allInvoices = mockInvoiceBooks.flatMap(book => 
        book.available.map(num => ({
          bookNumber: book.bookNumber,
          invoiceNumber: num,
          assignedTo: book.assignedTo || 'Default User'
        }))
      );
      setAvailableInvoices(allInvoices);
    }
  }, [isEditing]);
  
  const handleSelectInvoice = (invoiceNumber: string) => {
    // Check if this invoice number is already used
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const isDuplicate = existingInvoices.some((inv: any) => inv.invoiceNumber === invoiceNumber);
    
    // Also check generated invoices
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const isDuplicateInGenerated = generatedInvoices.some((inv: any) => inv.invoiceNumber === invoiceNumber);
    
    if (isDuplicate || isDuplicateInGenerated) {
      toast.warning("Duplicate Invoice Number", { 
        description: `Invoice number ${invoiceNumber} is already assigned to another customer`,
        duration: 5000
      });
    }
    
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
