
import { toast } from "sonner";

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Hook for handling payment amount changes and validation
 */
export const usePaymentAmounts = (currencySymbol: string = "QR") => {
  const handlePaymentAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    formState: any,
  ) => {
    const value = toNumber(e.target.value);

    const outstandingBalance =
      formState?.originalBalanceToPay !== undefined
        ? toNumber(formState.originalBalanceToPay)
        : Math.max(0, toNumber(formState?.netAmount) - toNumber(formState?.totalPaid));

    if (value > outstandingBalance && outstandingBalance > 0) {
      toast.warning("Overpayment", {
        description: `The amount exceeds the remaining balance of ${currencySymbol}${outstandingBalance.toFixed(2)}`,
      });
    }

    return value;
  };

  return { handlePaymentAmountChange };
};
