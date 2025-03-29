
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
    
    // Get the correct amount values from the invoice
    const grossAmount = invoice.gross || invoice.grossAmount || 0;
    const discount = invoice.discount || 0;
    const netAmount = invoice.net || invoice.amount || invoice.netAmount || 0;
    const totalPaid = invoice.totalPaid || 0;
    const balanceToPay = netAmount - totalPaid;
    
    console.log("Selected invoice data:", invoice);
    console.log("Amount calculations:", { grossAmount, discount, netAmount, totalPaid, balanceToPay });
    
    // Create a consistent mapping for invoice data regardless of source
    setFormState(prevState => ({
      ...prevState,
      invoiceNumber: invoice.invoiceNumber || "",
      // Handle different property names for bookingForm
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      shipper: invoice.shipper1 || invoice.shipper || "",
      consignee: invoice.consignee1 || invoice.consignee || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || invoice.shipmentType || "",
      // Ensure all amount fields are properly populated
      grossAmount: grossAmount,
      discount: discount,
      netAmount: netAmount,
      totalPaid: totalPaid,
      balanceToPay: balanceToPay,
      amountPaid: balanceToPay,  // Set suggested payment amount to balance
      paymentCollectDate: invoice.date || prevState.paymentCollectDate,
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
