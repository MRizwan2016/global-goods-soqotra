
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { mockInvoiceBooks } from "../constants/mockInvoiceBooks";
import { FormState } from "../types/invoiceForm";

export const useInvoiceSelection = (isEditing: boolean) => {
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    if (isEditing) return;
    
    const allInvoices = mockInvoiceBooks.flatMap(book => 
      book.available.map(num => ({
        bookNumber: book.bookNumber,
        invoiceNumber: num
      }))
    );
    
    setAvailableInvoices(allInvoices);
  }, [isEditing]);
  
  const handleSelectInvoice = (invoiceNumber: string, setFormState: React.Dispatch<React.SetStateAction<FormState>>) => {
    setFormState(prev => ({
      ...prev,
      invoiceNumber
    }));
    setShowInvoiceSelector(false);
    toast.success(`Invoice number ${invoiceNumber} selected`);
  };
  
  return {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice
  };
};
