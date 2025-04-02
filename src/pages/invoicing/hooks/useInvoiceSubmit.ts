
import { toast } from "sonner";
import { FormState, PackageItem } from "../types/invoiceForm";

export const useInvoiceSubmit = () => {
  const handleSubmit = async (formState: FormState, packageItems: PackageItem[], isEditing: boolean, id?: string): Promise<string> => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      throw new Error("Invoice number is required");
    }
    
    // Check for duplicate invoice number if creating a new invoice
    if (!isEditing) {
      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      const isDuplicate = existingInvoices.some((invoice: any) => 
        invoice.invoiceNumber === formState.invoiceNumber && 
        (!id || invoice.id !== id) // Allow same invoice number for the same record when editing
      );
      
      // Also check generated invoices
      const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
      const isDuplicateInGenerated = generatedInvoices.some((invoice: any) => 
        invoice.invoiceNumber === formState.invoiceNumber
      );
      
      if (isDuplicate || isDuplicateInGenerated) {
        toast.error(`Invoice number ${formState.invoiceNumber} is already assigned to another customer`);
        throw new Error("Duplicate invoice number");
      }
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
      // Double check for duplicates just before saving
      const isDuplicateBeforeSave = existingInvoices.some((invoice: any) => 
        invoice.invoiceNumber === formState.invoiceNumber
      );
      
      if (isDuplicateBeforeSave) {
        toast.error(`Invoice number ${formState.invoiceNumber} was just assigned to another customer`);
        throw new Error("Duplicate invoice number detected before saving");
      }
      
      // Add new invoice
      existingInvoices.push(completeInvoice);
    }
    
    // Save to localStorage
    localStorage.setItem('invoices', JSON.stringify(existingInvoices));
    
    // Also save an easily accessible list of invoice numbers for checking duplicates
    try {
      const invoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
      localStorage.setItem('usedInvoiceNumbers', JSON.stringify(invoiceNumbers));
    } catch (error) {
      console.error("Error saving invoice numbers list:", error);
    }
    
    console.log(`Invoice ${isEditing ? 'updated' : 'created'} with ID: ${invoiceId}`);
    console.log("Current invoices in localStorage:", existingInvoices);
    
    return invoiceId;
  };

  return { handleSubmit };
};
