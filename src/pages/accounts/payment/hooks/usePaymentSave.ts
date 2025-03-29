
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { FormState } from "../types";

export const usePaymentSave = (formState: FormState) => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Validate the form
    if (!formState.invoiceNumber) {
      toast.error("Missing Information", {
        description: "Please select an invoice to proceed"
      });
      return;
    }

    if (formState.amountPaid <= 0) {
      toast.error("Invalid Amount", {
        description: "Payment amount must be greater than zero"
      });
      return;
    }

    if (!formState.country || !formState.currency) {
      toast.error("Missing Information", {
        description: "Please select a country and currency"
      });
      return;
    }

    try {
      // Get existing payments from localStorage or initialize empty array
      const existingPaymentsStr = localStorage.getItem('payments');
      const existingPayments = existingPaymentsStr ? JSON.parse(existingPaymentsStr) : [];
      
      // Create a new payment record
      const newPayment = {
        id: uuidv4(),
        invoiceNumber: formState.invoiceNumber,
        customerName: formState.customerName,
        amount: formState.amountPaid,
        currency: formState.currency,
        country: formState.country,
        date: formState.paymentCollectDate,
        paymentMethod: formState.receivableAccount,
        remarks: formState.remarks,
        timestamp: new Date().toISOString(),
        bookingForm: formState.bookingForm || '',
      };
      
      // Add the new payment to the array
      existingPayments.push(newPayment);
      
      // Save back to localStorage
      localStorage.setItem('payments', JSON.stringify(existingPayments));
      
      // Update invoice status to paid if needed
      updateInvoiceStatus(formState.invoiceNumber, formState.amountPaid, formState.balanceToPay);
      
      // Show success toast
      toast.success("Payment Saved", {
        description: "Payment has been recorded successfully"
      });
      
      // Navigate back to payments list
      navigate("/accounts/payments");
      
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("Error Saving Payment", {
        description: "There was an error saving the payment. Please try again."
      });
    }
  };
  
  // Function to update invoice status if paid
  const updateInvoiceStatus = (invoiceNumber: string, amountPaid: number, balanceToPay: number) => {
    try {
      // Get existing invoices
      const existingInvoicesStr = localStorage.getItem('invoices');
      if (!existingInvoicesStr) return;
      
      const existingInvoices = JSON.parse(existingInvoicesStr);
      
      // Find the invoice by number
      const updatedInvoices = existingInvoices.map((invoice: any) => {
        if (invoice.invoiceNumber === invoiceNumber) {
          // Mark as paid if payment covers the full balance
          if (amountPaid >= balanceToPay) {
            return { ...invoice, paid: true };
          }
          
          // For partial payments, just update the amount paid so far
          const currentPaid = invoice.paidAmount || 0;
          return { 
            ...invoice, 
            paidAmount: currentPaid + amountPaid 
          };
        }
        return invoice;
      });
      
      // Save updated invoices back to localStorage
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };
  
  return { handleSave };
};
