
import { toast } from "sonner";
import { FormState, PackageItem } from "../types/invoiceForm";

export const useInvoiceSubmit = () => {
  const handleSubmit = async (formState: FormState, packageItems: PackageItem[], isEditing: boolean, id?: string): Promise<string> => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      throw new Error("Invoice number is required");
    }
    
    console.log("Saving invoice:", { ...formState, packageItems });
    
    // In a real app, this would be an API call
    // For now, simulate saving to localStorage
    
    // Generate a unique ID for new invoices or use existing ID
    const invoiceId = isEditing ? (id || `inv-${Date.now()}`) : `inv-${Date.now()}`;
    
    // Get existing invoices from localStorage
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Create the complete invoice object
    const completeInvoice = { 
      ...formState, 
      id: invoiceId, 
      packageDetails: packageItems,
      updatedAt: new Date().toISOString()
    };
    
    if (isEditing && id) {
      // Update existing invoice
      const invoiceIndex = existingInvoices.findIndex((inv: any) => inv.id === id);
      
      if (invoiceIndex >= 0) {
        existingInvoices[invoiceIndex] = completeInvoice;
      } else {
        // If not found (should not happen), just add it
        existingInvoices.push(completeInvoice);
      }
    } else {
      // Add new invoice
      existingInvoices.push(completeInvoice);
    }
    
    // Save to localStorage
    localStorage.setItem('invoices', JSON.stringify(existingInvoices));
    
    console.log(`Invoice ${isEditing ? 'updated' : 'created'} with ID: ${invoiceId}`);
    console.log("Current invoices in localStorage:", existingInvoices);
    
    return invoiceId;
  };

  return { handleSubmit };
};
