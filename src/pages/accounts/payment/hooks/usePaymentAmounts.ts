
import { toast } from "sonner";

/**
 * Hook for handling payment amount changes and validation
 */
export const usePaymentAmounts = (currencySymbol: string = "QR") => {
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formState: any
  ) => {
    const value = parseFloat(e.target.value);
    
    if (isNaN(value)) return 0;
    
    // Show warning if overpayment
    if (value > (formState.balanceToPay || 0) && formState.balanceToPay > 0) {
      toast.warning("Overpayment", {
        description: `The amount exceeds the balance due of ${currencySymbol}${(formState.balanceToPay || 0).toFixed(2)}`,
      });
    }
    
    return value;
  };
  
  return { handlePaymentAmountChange };
};
