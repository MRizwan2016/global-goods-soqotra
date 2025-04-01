
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FormState } from "../types";

/**
 * Hook for handling payment saving
 */
export const usePaymentSave = (formState: FormState, currencySymbol: string) => {
  const navigate = useNavigate();

  /**
   * Save payment to localStorage
   * @returns boolean indicating if save was successful
   */
  const handleSave = (): boolean => {
    try {
      console.log("Saving payment:", formState);
      
      // Validate required fields
      if (!formState.invoiceNumber) {
        toast.error("Invoice number is required");
        return false;
      }
      
      if (formState.amountPaid <= 0) {
        toast.error("Payment amount must be greater than zero");
        return false;
      }
      
      // Create payment object
      const payment = {
        id: `payment-${Date.now()}`,
        invoiceNumber: formState.invoiceNumber,
        customerName: formState.consignee || formState.customerName || "Unknown",
        date: formState.paymentCollectDate || new Date().toISOString().split('T')[0],
        amount: formState.amountPaid,
        currency: formState.currency || "QAR",
        method: formState.receivableAccount || "cash",
        remarks: formState.remarks || "",
        timestamp: new Date().toISOString()
      };
      
      // Load existing payments
      const existingPaymentsJSON = localStorage.getItem('payments') || '[]';
      const existingPayments = JSON.parse(existingPaymentsJSON);
      
      // Add new payment
      const updatedPayments = [...existingPayments, payment];
      
      // Save to localStorage
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      
      // Update invoices in localStorage to reflect payment
      const existingInvoicesJSON = localStorage.getItem('invoices') || '[]';
      const existingInvoices = JSON.parse(existingInvoicesJSON);
      
      // Find the invoice to update
      const updatedInvoices = existingInvoices.map((invoice: any) => {
        if (invoice.invoiceNumber === formState.invoiceNumber) {
          // Calculate total paid amount including this payment
          const previousPaid = invoice.totalPaid || 0;
          const newTotalPaid = previousPaid + formState.amountPaid;
          const invoiceAmount = invoice.net || invoice.amount || 0;
          
          // Update invoice payment status
          return {
            ...invoice,
            totalPaid: newTotalPaid,
            paidAmount: newTotalPaid,
            paid: newTotalPaid >= invoiceAmount
          };
        }
        return invoice;
      });
      
      // Save updated invoices
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      
      // Trigger a storage event to notify other components about the update
      window.dispatchEvent(new Event('storage'));
      
      toast.success("Payment Saved", {
        description: `Payment of ${currencySymbol} ${formState.amountPaid.toFixed(2)} for invoice ${formState.invoiceNumber} has been recorded`,
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
