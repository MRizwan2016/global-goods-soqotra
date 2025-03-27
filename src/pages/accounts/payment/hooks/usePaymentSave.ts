
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { FormState } from "../types";

/**
 * Hook to handle payment saving logic
 */
export const usePaymentSave = (formState: FormState, currencySymbol: string) => {
  const navigate = useNavigate();
  
  // Validate form before saving
  const validateForm = (): boolean => {
    if (!formState.invoiceNumber) {
      toast({
        title: "Validation Error",
        description: "Please select an invoice first",
        variant: "destructive"
      });
      return false;
    }

    if (formState.amountPaid <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return false;
    }

    if (!formState.currency) {
      toast({
        title: "Validation Error",
        description: "Please select a currency",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  // Handle saving the payment
  const handleSave = () => {
    if (!validateForm()) return;

    // Update stored invoices
    const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const updatedStoredInvoices = storedInvoices.map((inv: any) => {
      if (inv.invoiceNumber === formState.invoiceNumber) {
        return {
          ...inv,
          paid: true
        };
      }
      return inv;
    });
    localStorage.setItem('generatedInvoices', JSON.stringify(updatedStoredInvoices));
    
    // Create a payment record
    const paymentRecord = {
      id: `pay-${Date.now()}`,
      invoiceNumber: formState.invoiceNumber,
      amount: formState.amountPaid,
      currency: formState.currency,
      method: formState.receivableAccount,
      date: formState.paymentCollectDate,
      remarks: formState.remarks
    };
    
    // Save the payment record
    const payments = JSON.parse(localStorage.getItem('invoicePayments') || '[]');
    payments.push(paymentRecord);
    localStorage.setItem('invoicePayments', JSON.stringify(payments));
    
    toast({
      title: "Payment Recorded Successfully",
      description: `Payment of ${currencySymbol}${formState.amountPaid} for invoice ${formState.invoiceNumber} has been recorded.`,
    });

    navigate("/accounts/payments");
  };

  return { handleSave };
};
