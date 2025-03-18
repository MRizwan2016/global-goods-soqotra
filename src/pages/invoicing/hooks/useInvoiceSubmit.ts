
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
    
    // Generate a unique ID for new invoices
    const invoiceId = isEditing ? (id || `inv-${Date.now()}`) : `inv-${Date.now()}`;
    
    // Get existing invoices from localStorage
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    if (isEditing && id) {
      // Update existing invoice
      const updatedInvoices = existingInvoices.map((inv: any) => 
        inv.id === id ? { ...formState, id, packageItems } : inv
      );
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
    } else {
      // Add new invoice
      const newInvoice = { ...formState, id: invoiceId, packageItems };
      localStorage.setItem('invoices', JSON.stringify([...existingInvoices, newInvoice]));
    }
    
    return invoiceId;
  };

  return { handleSubmit };
};
