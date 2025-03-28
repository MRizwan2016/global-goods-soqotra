
import { toast } from "sonner";
import { FormState } from "../types";
import { Invoice } from "../types";

/**
 * Hook for handling invoice selection
 */
export const useInvoiceSelection = (
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  setSelectedInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>,
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Handle selecting an invoice
  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    
    // Create a consistent mapping for invoice data regardless of source
    setFormState(prevState => ({
      ...prevState,
      invoiceNumber: invoice.invoiceNumber,
      // Handle different property names for bookingForm
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      shipper: invoice.shipper1 || invoice.shipper || "",
      consignee: invoice.consignee1 || invoice.consignee || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || invoice.shipmentType || "",
      grossAmount: invoice.gross || invoice.amount || 0,
      discount: invoice.discount || 0,
      netAmount: (invoice.net || invoice.amount || 0),
      totalPaid: invoice.paid ? (invoice.net || invoice.amount || 0) : 0,
      balanceToPay: invoice.paid ? 0 : (invoice.net || invoice.amount || 0),
      amountPaid: invoice.paid ? 0 : (invoice.net || invoice.amount || 0),
      country: prevState.country,
      currency: prevState.currency
    }));
    
    setShowInvoiceSelector(false);
    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} has been loaded`,
    });
  };

  return { handleSelectInvoice };
};
