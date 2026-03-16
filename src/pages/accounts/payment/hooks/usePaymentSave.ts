
import { toast } from "sonner";
import { FormState } from "../types";
import { ExternalInvoiceService } from "@/services/ExternalInvoiceService";

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * Hook for handling payment saving
 */
export const usePaymentSave = (formState: FormState, currencySymbol: string) => {
  const handleSave = (): boolean => {
    try {
      if (!formState.invoiceNumber) {
        toast.error("Invoice number is required");
        return false;
      }

      const netAmount = toNumber(formState.netAmount);
      const totalPaid = toNumber(formState.totalPaid);
      const remainingBalance =
        formState.originalBalanceToPay !== undefined
          ? toNumber(formState.originalBalanceToPay)
          : Math.max(0, netAmount - totalPaid);

      if (remainingBalance <= 0) {
        toast.warning("Invoice already paid", {
          description: `Invoice ${formState.invoiceNumber} has no remaining balance.`,
        });
        return false;
      }

      const requestedAmount = toNumber(formState.amountPaid);
      if (requestedAmount <= 0) {
        toast.error("Enter a valid payment amount");
        return false;
      }

      const paymentAmount = Math.min(requestedAmount, remainingBalance);
      if (requestedAmount > remainingBalance) {
        toast.warning("Amount adjusted", {
          description: `Payment amount was capped to remaining balance (${currencySymbol} ${remainingBalance.toFixed(2)}).`,
        });
      }

      const payment = {
        id: `payment-${Date.now()}`,
        invoiceNumber: formState.invoiceNumber,
        customerName: formState.consignee || formState.customerName || "Unknown",
        date: formState.paymentCollectDate || new Date().toISOString().split("T")[0],
        amount: paymentAmount,
        currency: formState.currency || "QAR",
        method: formState.receivableAccount || "cash",
        remarks: formState.remarks || "",
        timestamp: new Date().toISOString(),
      };

      const existingPayments = JSON.parse(localStorage.getItem("payments") || "[]");
      localStorage.setItem("payments", JSON.stringify([...existingPayments, payment]));

      ExternalInvoiceService.updateInvoicePaidStatus(formState.invoiceNumber, paymentAmount);

      try {
        const existingInvoicesJSON = localStorage.getItem("invoices") || "[]";
        const existingInvoices = JSON.parse(existingInvoicesJSON);
        const updatedInvoices = existingInvoices.map((invoice: any) => {
          if (String(invoice.invoiceNumber) === String(formState.invoiceNumber)) {
            const invoiceAmount = toNumber(invoice.net) || toNumber(invoice.amount);
            const previousPaid = toNumber(invoice.totalPaid);
            const newTotalPaid = Math.min(invoiceAmount || previousPaid + paymentAmount, previousPaid + paymentAmount);

            return {
              ...invoice,
              totalPaid: newTotalPaid,
              paidAmount: newTotalPaid,
              paid: invoiceAmount > 0 ? newTotalPaid >= invoiceAmount : true,
            };
          }
          return invoice;
        });
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      } catch (e) {
        console.error("Error updating invoices:", e);
      }

      window.dispatchEvent(new Event("storage"));

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
