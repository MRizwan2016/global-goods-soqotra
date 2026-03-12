
import { toast } from "sonner";

const toNumber = (value: unknown): number => {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = parseFloat(String(value ?? ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

// Helper to extract string name from possibly nested object
const extractName = (val: any): string => {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && val.name) return String(val.name);
  return String(val) === "[object Object]" ? "" : String(val);
};

// Extract pricing from nested or flat invoice data
const extractPricing = (inv: any): { gross: number; discount: number; net: number } => {
  if (inv.pricing && typeof inv.pricing === "object") {
    const gross = toNumber(inv.pricing.gross);
    const discount = toNumber(inv.pricing.discount);
    const net = toNumber(inv.pricing.net);

    if (gross > 0 || net > 0) {
      return { gross: gross || net + discount, discount, net: net || gross - discount };
    }
  }

  if (inv.formData) {
    const netAmount =
      toNumber(inv.formData.netAmount) ||
      toNumber(inv.formData.totalPrice) ||
      toNumber(inv.formData.totalCharges) ||
      toNumber(inv.formData.total);
    const discount = toNumber(inv.formData.discount);
    return { gross: netAmount + discount, discount, net: netAmount };
  }

  const gross = toNumber(inv.gross) || toNumber(inv.grossAmount) || toNumber(inv.amount);
  const discount = toNumber(inv.discount);
  const net = toNumber(inv.net) || toNumber(inv.netAmount) || toNumber(inv.amount) || gross - discount;
  return { gross: gross || net + discount, discount, net: net || gross - discount };
};

/**
 * Hook for invoice selection logic
 */
export const useInvoiceHandler = () => {
  const handleSelectInvoice = (
    invoice: any,
    setSelectedInvoice: React.Dispatch<React.SetStateAction<any>>,
    setFormState: React.Dispatch<React.SetStateAction<any>>,
    setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);

    let existingPaidAmount = 0;
    try {
      const storedPayments = localStorage.getItem("payments");
      if (storedPayments) {
        const payments = JSON.parse(storedPayments);
        const invoicePayments = payments.filter(
          (p: any) => String(p.invoiceNumber) === String(invoice.invoiceNumber),
        );
        existingPaidAmount = invoicePayments.reduce(
          (sum: number, p: any) => sum + toNumber(p.amount),
          0,
        );
      }
    } catch (e) {
      console.error("Error checking payments:", e);
    }

    const pricing = extractPricing(invoice);
    const grossAmount = pricing.gross;
    const discount = pricing.discount;
    const netAmount = pricing.net;

    const persistedPaid = toNumber(invoice.totalPaid) || toNumber(invoice.paidAmount);
    const rawTotalPaid = existingPaidAmount > 0 ? existingPaidAmount : persistedPaid;
    const totalPaid = Math.min(netAmount, Math.max(0, rawTotalPaid));
    const originalBalanceToPay = Math.max(0, netAmount - totalPaid);
    const isPaid = invoice.paid || originalBalanceToPay <= 0;

    const shipperName =
      extractName(invoice.shipper1) ||
      extractName(invoice.shipper) ||
      extractName(invoice.formData?.shipper1) ||
      extractName(invoice.shipperName) ||
      "";
    const consigneeName =
      extractName(invoice.consignee1) ||
      extractName(invoice.consignee) ||
      extractName(invoice.formData?.consignee1) ||
      extractName(invoice.consigneeName) ||
      "";
    const bookingForm =
      invoice.bookingForm || invoice.bookNumber || invoice.formData?.bookNumber || invoice.jobNumber || invoice.book_no || "";
    const warehouse = invoice.warehouse || invoice.formData?.warehouse || invoice.destination || "";
    const shipmentType =
      invoice.freightType || invoice.shipmentType || invoice.formData?.serviceType || invoice.serviceType || "";

    if (isPaid) {
      toast.warning("Invoice Already Paid", {
        description: `Invoice ${invoice.invoiceNumber} has already been paid.`,
      });
    }

    setFormState((prev: any) => ({
      ...prev,
      invoiceNumber: String(invoice.invoiceNumber || ""),
      customerName: consigneeName,
      bookingForm: String(bookingForm),
      shipper: shipperName,
      consignee: consigneeName,
      warehouse: String(warehouse),
      shipmentType: String(shipmentType),
      grossAmount,
      discount,
      netAmount,
      totalPaid,
      originalBalanceToPay,
      balanceToPay: originalBalanceToPay,
      amountPaid: isPaid ? 0 : originalBalanceToPay,
      currency: invoice.currency || invoice.formData?.currency || prev.currency,
      country: invoice.country || prev.country || "Qatar",
    }));

    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} loaded for payment${isPaid ? " (already paid)" : ""}`,
    });
  };

  return { handleSelectInvoice };
};
