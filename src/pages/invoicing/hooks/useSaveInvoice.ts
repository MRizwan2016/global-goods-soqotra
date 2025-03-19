
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FormState, PackageItem } from "../types/invoiceForm";
import { useInvoiceSubmit } from "./useInvoiceSubmit";

export const useSaveInvoice = (
  formState: FormState,
  packageItems: PackageItem[],
  isEditing: boolean,
  id?: string
) => {
  const navigate = useNavigate();
  const [savedInvoiceId, setSavedInvoiceId] = useState<string | null>(id || null);
  const { handleSubmit } = useInvoiceSubmit();
  
  // Handle saving the invoice
  const handleSave = async () => {
    // Validate required fields
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    if (!formState.consignee1) {
      toast.error("Please enter a consignee name");
      return;
    }
    
    try {
      // In a real app, this would be an API call
      const savedId = await handleSubmit(formState, packageItems, isEditing, id);
      
      // Store the saved invoice ID
      setSavedInvoiceId(savedId);
      
      toast.success(`Invoice ${isEditing ? 'updated' : 'created'} successfully`);
      
      if (!isEditing) {
        // If creating a new invoice, redirect to edit page
        setTimeout(() => {
          navigate(`/data-entry/invoicing/edit/${savedId}`);
        }, 500);
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return {
    handleSave,
    savedInvoiceId,
  };
};
