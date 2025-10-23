import { toast } from "sonner";

export interface InvoiceUpdateData {
  invoiceNumber: string;
  packageItems: Array<{
    id: string;
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
    cubicMetre: number;
    description: string;
  }>;
}

/**
 * Service to update existing invoice data
 */
export class InvoiceUpdateService {
  /**
   * Update specific invoice with new package details
   */
  static updateInvoicePackageDetails(updateData: InvoiceUpdateData): boolean {
    try {
      const { invoiceNumber, packageItems } = updateData;
      
      // Load existing invoices
      const existingInvoices = JSON.parse(localStorage.getItem("eritreaInvoices") || "[]");
      const invoiceIndex = existingInvoices.findIndex((inv: any) => 
        inv.invoiceNumber === invoiceNumber || inv.id === invoiceNumber
      );
      
      if (invoiceIndex === -1) {
        toast.error(`Invoice ${invoiceNumber} not found`);
        return false;
      }
      
      // Update the invoice with new package details
      const invoice = existingInvoices[invoiceIndex];
      invoice.packageItems = packageItems;
      
      // Recalculate totals
      const totalPackages = packageItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalWeight = packageItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
      const totalVolume = packageItems.reduce((sum, item) => sum + (item.cubicMetre * item.quantity), 0);
      
      // Update form data totals
      invoice.totalPackages = totalPackages;
      invoice.totalWeight = totalWeight;
      invoice.totalVolume = totalVolume;
      
      // Update the invoice in the array
      existingInvoices[invoiceIndex] = invoice;
      
      // Save back to localStorage
      localStorage.setItem("eritreaInvoices", JSON.stringify(existingInvoices));
      
      console.log(`✅ Invoice ${invoiceNumber} updated successfully:`, invoice);
      toast.success(`Invoice ${invoiceNumber} updated successfully`);
      return true;
      
    } catch (error) {
      console.error("Failed to update invoice:", error);
      toast.error("Failed to update invoice");
      return false;
    }
  }
  
  /**
   * Get invoice details by invoice number
   */
  static getInvoiceByNumber(invoiceNumber: string): any | null {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem("eritreaInvoices") || "[]");
      return existingInvoices.find((inv: any) => 
        inv.invoiceNumber === invoiceNumber || inv.id === invoiceNumber
      ) || null;
    } catch (error) {
      console.error("Failed to get invoice:", error);
      return null;
    }
  }
}