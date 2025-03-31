
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { FormState } from "../types";

export const usePaymentSave = (formState: FormState, currencySymbol: string = "") => {
  const navigate = useNavigate();

  const handleSave = () => {
    // Validate the form
    if (!formState.invoiceNumber) {
      toast.error("Missing Information", {
        description: "Please select an invoice to proceed"
      });
      return;
    }

    if (!formState.amountPaid || formState.amountPaid <= 0) {
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
      const paymentId = uuidv4();
      const receiptNumber = `R-${Date.now().toString().substring(6)}`;
      
      const newPayment = {
        id: paymentId,
        receiptNumber: receiptNumber,
        invoiceNumber: formState.invoiceNumber,
        customerName: formState.customerName || formState.consignee,
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
      
      // Also save to invoicePayments for receipt viewing
      const invoicePaymentsStr = localStorage.getItem('invoicePayments');
      const invoicePayments = invoicePaymentsStr ? JSON.parse(invoicePaymentsStr) : [];
      invoicePayments.push(newPayment);
      localStorage.setItem('invoicePayments', JSON.stringify(invoicePayments));
      
      // Update invoice status to paid if needed
      updateInvoiceStatus(formState.invoiceNumber, formState.amountPaid, formState.balanceToPay);
      
      // Show success toast
      toast.success("Payment Saved", {
        description: `Payment of ${currencySymbol}${formState.amountPaid.toFixed(2)} has been recorded successfully`
      });
      
      // Check if we need to show reconciliation reminder
      checkReconciliationReminder(existingPayments);
      
      // Navigate back to payment receivable page after saving
      setTimeout(() => {
        navigate('/invoice-method/payment-receivable');
      }, 1500);
      
      return {
        success: true,
        paymentId,
        receiptNumber
      };
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("Error Saving Payment", {
        description: "There was an error saving the payment. Please try again."
      });
      return { success: false };
    }
  };
  
  // Check if a reconciliation reminder should be shown
  const checkReconciliationReminder = (payments: any[]) => {
    // Get only the payments that haven't been reconciled yet
    const unreconciled = payments.filter(p => !p.reconciled);
    
    if (unreconciled.length >= 10) {
      // Show reconciliation reminder toast
      toast.warning("Reconciliation Reminder", {
        description: `You have ${unreconciled.length} unreconciled payments. Please reconcile them soon.`,
        duration: 8000,
        action: {
          label: "Reconcile Now",
          onClick: () => {
            navigate('/accounts/payments/reconciliation');
          }
        }
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
            console.log(`Marking invoice ${invoiceNumber} as paid`);
            return { 
              ...invoice, 
              paid: true, 
              paidAmount: invoice.net || invoice.amount || 0,
              totalPaid: invoice.net || invoice.amount || 0,
              balanceToPay: 0
            };
          }
          
          // For partial payments, just update the amount paid so far
          const currentPaid = invoice.paidAmount || 0;
          const totalPaid = currentPaid + amountPaid;
          const invoiceAmount = invoice.net || invoice.amount || 0;
          const newBalanceToPay = invoiceAmount - totalPaid;
          
          return { 
            ...invoice, 
            paidAmount: totalPaid,
            totalPaid: totalPaid,
            balanceToPay: newBalanceToPay,
            paid: totalPaid >= invoiceAmount
          };
        }
        return invoice;
      });
      
      // Save updated invoices back to localStorage
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      
      // Trigger storage event for other components to refresh
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };
  
  return { handleSave };
};
