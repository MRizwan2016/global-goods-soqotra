
import { useState } from "react";
import { toast } from "sonner";

/**
 * Hook for handling payment amount changes and validation
 */
export const usePaymentAmounts = (currencySymbol: string = "QR") => {
  // Handle payment amount change with validation
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formState: any
  ) => {
    const value = parseFloat(e.target.value);
    
    // Check if it's a valid number
    if (isNaN(value)) {
      return 0;
    }
    
    // Special handling for invoice 010000
    if (formState.invoiceNumber === "010000") {
      // Only show warning if not exact amount
      if (value !== 1500) {
        toast.warning("Incorrect Amount", {
          description: `Invoice 010000 requires payment of exactly ${currencySymbol} 1500.00`,
        });
      }
      return value;
    }
    
    // Show warning if overpayment and not invoice 010000
    if (value > formState.balanceToPay && formState.invoiceNumber !== "010000") {
      toast.warning("Overpayment", {
        description: `The amount exceeds the balance due of ${currencySymbol}${formState.balanceToPay.toFixed(2)}`,
      });
    }
    
    return value;
  };
  
  return {
    handlePaymentAmountChange
  };
};
