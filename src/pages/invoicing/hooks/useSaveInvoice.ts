
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
      console.log("Saving invoice with data:", { formState, packageItems, isEditing, id });
      
      // Add updatedAt timestamp for sorting in invoice list
      const updatedFormState = {
        ...formState,
        updatedAt: new Date().toISOString()
      };
      
      // Save the invoice
      const savedId = await handleSubmit(updatedFormState, packageItems, isEditing, id);
      
      // Store the saved invoice ID
      setSavedInvoiceId(savedId);
      
      // Verify the invoice was saved
      const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const saved = invoices.some((inv: any) => inv.id === savedId);
      
      if (saved) {
        toast.success(`Invoice ${isEditing ? 'updated' : 'created'} successfully`);
        
        if (!isEditing) {
          // If creating a new invoice, redirect to edit page
          setTimeout(() => {
            navigate(`/data-entry/invoicing/edit/${savedId}`);
          }, 500);
        }
      } else {
        throw new Error("Failed to save invoice. Please try again.");
      }
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return {
    handleSave,
    savedInvoiceId,
  };
};
