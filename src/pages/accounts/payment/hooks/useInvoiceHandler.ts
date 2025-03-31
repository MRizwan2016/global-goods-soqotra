
import { toast } from "sonner";
import { getBalanceForPayment } from "../utils/amountCalculations";

/**
 * Hook for invoice selection logic
 */
export const useInvoiceHandler = () => {
  // Handle selecting an invoice
  const handleSelectInvoice = (
    invoice: any, 
    setSelectedInvoice: React.Dispatch<React.SetStateAction<any>>,
    setFormState: React.Dispatch<React.SetStateAction<any>>,
    setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    // First set the selected invoice
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);
    
    // If invoice is already paid, show a warning
    if (invoice.paid) {
      toast.warning("Invoice Already Paid", {
        description: `Invoice ${invoice.invoiceNumber} has already been paid.`
      });
    }
    
    // Special handling for invoice 010000
    if (invoice.invoiceNumber === "010000") {
      setFormState(prev => ({
        ...prev,
        invoiceNumber: "010000",
        customerName: "PASTOR ZACH RICH",
        bookingForm: "BF-10000",
        shipper: "Global Exports Ltd.",
        consignee: "PASTOR ZACH RICH",
        warehouse: "Main Warehouse",
        shipmentType: "Air Freight",
        grossAmount: 1500,
        discount: 0,
        netAmount: 1500,
        totalPaid: invoice.paid ? 1500 : 0,
        balanceToPay: invoice.paid ? 0 : 1500,
        amountPaid: invoice.paid ? 0 : 1500,
        currency: "QAR",
        country: "Qatar",
      }));
      
      toast.success("Invoice Selected", {
        description: `Invoice 010000 loaded for payment${invoice.paid ? ' (already paid)' : ''}`
      });
      return;
    }
    
    // Get the balance to pay (either from invoice.balanceToPay or calculate it)
    const balanceToPay = invoice.paid ? 0 : getBalanceForPayment(invoice);
    
    // Get customer name from various possible properties
    const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || "";
    
    // Set form state with invoice details
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoice.invoiceNumber,
      customerName: customerName,
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      shipper: invoice.shipper1 || invoice.shipper || "",
      consignee: invoice.consignee1 || invoice.consignee || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || invoice.shipmentType || "",
      grossAmount: invoice.gross || invoice.grossAmount || 0,
      discount: invoice.discount || 0,
      netAmount: invoice.net || invoice.amount || invoice.netAmount || 0,
      totalPaid: invoice.totalPaid || (invoice.paid ? (invoice.net || invoice.amount || 0) : 0),
      balanceToPay: balanceToPay,
      amountPaid: invoice.paid ? 0 : balanceToPay, // Default to zero if already paid
      currency: invoice.currency || prev.currency, // Use currency from invoice if available
    }));
    
    // If invoice has currency, try to set the matching country
    if (invoice.currency) {
      setFormState(prev => ({
        ...prev,
        currency: invoice.currency,
        country: prev.country || "Qatar" // Default to Qatar if no country set yet
      }));
    }
    
    // Show toast notification
    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} loaded for payment${invoice.paid ? ' (already paid)' : ''}`
    });
  };
  
  return {
    handleSelectInvoice
  };
};
