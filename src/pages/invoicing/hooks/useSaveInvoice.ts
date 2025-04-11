
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FormState, PackageItem } from "../types/invoiceForm";
import { useInvoiceSubmit } from "./useInvoiceSubmit";
import { JobStorageService } from "@/pages/qatar/services/JobStorageService";

// Define the input interface for better type safety
interface SaveInvoiceProps {
  formState: FormState;
  packageItems: PackageItem[];
  isEditing: boolean;
  id?: string;
}

export const useSaveInvoice = ({
  formState,
  packageItems,
  isEditing,
  id
}: SaveInvoiceProps) => {
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
    
    // Check for duplicate invoice number before saving (as an extra precaution)
    if (!isEditing) {
      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const isDuplicate = existingInvoices.some((invoice: any) => 
        invoice.invoiceNumber === formState.invoiceNumber && 
        (!id || invoice.id !== id)
      );
      
      if (isDuplicate) {
        toast.error(`Invoice number ${formState.invoiceNumber} is already assigned to another customer`);
        return;
      }
    }
    
    try {
      console.log("Saving invoice with data:", { formState, packageItems, isEditing, id });
      
      // Check for linked jobs to get job number
      let jobNumber = formState.jobNumber || "";
      if (!jobNumber) {
        // Try to find if this invoice is already linked to a job
        const allJobs = JobStorageService.getAllJobs();
        const linkedJob = allJobs.find(job => job.invoiceNumber === formState.invoiceNumber);
        if (linkedJob && linkedJob.jobNumber) {
          jobNumber = linkedJob.jobNumber;
        }
      }
      
      // Add updatedAt timestamp and job number for sorting in invoice list
      const updatedFormState = {
        ...formState,
        jobNumber: jobNumber,
        updatedAt: new Date().toISOString()
      };
      
      // Save the invoice - call handleSubmit with all required params
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
