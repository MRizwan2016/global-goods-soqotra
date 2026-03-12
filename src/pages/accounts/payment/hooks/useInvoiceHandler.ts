
import { toast } from "sonner";

// Helper to extract string name from possibly nested object
const extractName = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.name) return String(val.name);
  return String(val) === '[object Object]' ? '' : String(val);
};

// Extract pricing from nested or flat invoice data
const extractPricing = (inv: any): { gross: number; discount: number; net: number } => {
  if (inv.pricing && typeof inv.pricing === 'object') {
    return {
      gross: parseFloat(inv.pricing.gross) || 0,
      discount: parseFloat(inv.pricing.discount) || 0,
      net: parseFloat(inv.pricing.net) || 0,
    };
  }
  if (inv.formData) {
    const netAmount = parseFloat(inv.formData.netAmount) || parseFloat(inv.formData.totalPrice) || 0;
    const discount = parseFloat(inv.formData.discount) || 0;
    return { gross: netAmount + discount, discount, net: netAmount };
  }
  const gross = parseFloat(inv.gross) || parseFloat(inv.grossAmount) || parseFloat(inv.amount) || 0;
  const discount = parseFloat(inv.discount) || 0;
  const net = parseFloat(inv.net) || parseFloat(inv.netAmount) || parseFloat(inv.amount) || gross - discount || 0;
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
    setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);
    
    // Check existing payments for this invoice
    let existingPaidAmount = 0;
    try {
      const storedPayments = localStorage.getItem('payments');
      if (storedPayments) {
        const payments = JSON.parse(storedPayments);
        const invoicePayments = payments.filter((p: any) => String(p.invoiceNumber) === String(invoice.invoiceNumber));
        existingPaidAmount = invoicePayments.reduce((sum: number, p: any) => sum + (parseFloat(p.amount) || 0), 0);
      }
    } catch (e) {
      console.error("Error checking payments:", e);
    }

    // Extract pricing - handles nested pricing objects (Sri Lanka) and flat formats
    const pricing = extractPricing(invoice);
    const grossAmount = pricing.gross;
    const discount = pricing.discount;
    const netAmount = pricing.net;
    const totalPaid = existingPaidAmount || parseFloat(invoice.totalPaid) || parseFloat(invoice.paidAmount) || 0;
    const balanceToPay = Math.max(0, netAmount - totalPaid);
    const isPaid = invoice.paid || totalPaid >= netAmount;
    
    // Extract names - handles both string and object formats
    const shipperName = extractName(invoice.shipper1) || extractName(invoice.shipper) || extractName(invoice.formData?.shipper1) || extractName(invoice.shipperName) || '';
    const consigneeName = extractName(invoice.consignee1) || extractName(invoice.consignee) || extractName(invoice.formData?.consignee1) || extractName(invoice.consigneeName) || '';
    const bookingForm = invoice.bookingForm || invoice.bookNumber || invoice.formData?.bookNumber || invoice.jobNumber || invoice.book_no || '';
    const warehouse = invoice.warehouse || invoice.formData?.warehouse || invoice.destination || '';
    const shipmentType = invoice.freightType || invoice.shipmentType || invoice.formData?.serviceType || invoice.serviceType || '';
    
    console.log("Invoice selection - pricing:", { grossAmount, discount, netAmount, totalPaid, balanceToPay, isPaid });
    
    if (isPaid) {
      toast.warning("Invoice Already Paid", {
        description: `Invoice ${invoice.invoiceNumber} has already been paid.`
      });
    }
    
    setFormState((prev: any) => ({
      ...prev,
      invoiceNumber: String(invoice.invoiceNumber || ''),
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
      balanceToPay,
      amountPaid: isPaid ? 0 : balanceToPay,
      currency: invoice.currency || invoice.formData?.currency || prev.currency,
      country: invoice.country || prev.country || 'Qatar',
    }));
    
    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} loaded for payment${isPaid ? ' (already paid)' : ''}`
    });
  };
  
  return { handleSelectInvoice };
};
