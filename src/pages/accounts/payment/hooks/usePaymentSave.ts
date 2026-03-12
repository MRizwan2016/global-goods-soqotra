
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormState } from "../types";
import { ExternalInvoiceService } from "@/services/ExternalInvoiceService";

/**
 * Hook for handling payment saving
 */
export const usePaymentSave = (formState: FormState, currencySymbol: string) => {
  const navigate = useNavigate();

  const handleSave = (): boolean => {
    try {
      console.log("Saving payment:", formState);
      
      if (!formState.invoiceNumber) {
        toast.error("Invoice number is required");
        return false;
      }
      
      const paymentAmount = formState.amountPaid || 0;
      
      // Create payment object
      const payment = {
        id: `payment-${Date.now()}`,
        invoiceNumber: formState.invoiceNumber,
        customerName: formState.consignee || formState.customerName || "Unknown",
        date: formState.paymentCollectDate || new Date().toISOString().split('T')[0],
        amount: paymentAmount,
        currency: formState.currency || "QAR",
        method: formState.receivableAccount || "cash",
        remarks: formState.remarks || "",
        timestamp: new Date().toISOString()
      };
      
      // Save to payments list
      const existingPayments = JSON.parse(localStorage.getItem('payments') || '[]');
      localStorage.setItem('payments', JSON.stringify([...existingPayments, payment]));
      
      // Update invoice paid status across ALL country storage keys
      ExternalInvoiceService.updateInvoicePaidStatus(formState.invoiceNumber, paymentAmount);
      
      // Also update the 'invoices' key specifically for legacy compatibility
      try {
        const existingInvoicesJSON = localStorage.getItem('invoices') || '[]';
        const existingInvoices = JSON.parse(existingInvoicesJSON);
        const updatedInvoices = existingInvoices.map((invoice: any) => {
          if (String(invoice.invoiceNumber) === String(formState.invoiceNumber)) {
            const previousPaid = invoice.totalPaid || 0;
            const newTotalPaid = previousPaid + paymentAmount;
            const invoiceAmount = invoice.net || invoice.amount || 0;
            return {
              ...invoice,
              totalPaid: newTotalPaid,
              paidAmount: newTotalPaid,
              paid: newTotalPaid >= invoiceAmount
            };
          }
          return invoice;
        });
        localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      } catch (e) {
        console.error("Error updating invoices:", e);
      }
      
      // Trigger storage event for all listening components
      window.dispatchEvent(new Event('storage'));
      
      toast.success("Payment Saved", {
        description: `Payment of ${currencySymbol} ${paymentAmount.toFixed(2)} for invoice ${formState.invoiceNumber} has been recorded`,
      });
      
      return true;
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("Failed to save payment");
      return false;
    }
  };

  return { handleSave };
};
