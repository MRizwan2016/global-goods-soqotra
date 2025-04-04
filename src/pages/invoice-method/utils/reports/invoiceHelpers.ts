
import { Invoice } from "../../components/status-tabs/Invoice";

// Helper function to fetch invoices from storage
export const fetchInvoices = (): Invoice[] => {
  try {
    // Get invoices from localStorage (in a real app, this would be an API call)
    const storedInvoices = localStorage.getItem('invoices');
    const invoices = storedInvoices ? JSON.parse(storedInvoices) : [];
    
    // Also check if there are any generated invoices
    const generatedInvoices = localStorage.getItem('generatedInvoices');
    const additionalInvoices = generatedInvoices ? JSON.parse(generatedInvoices) : [];
    
    // Combine all invoices
    return [...invoices, ...additionalInvoices];
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return [];
  }
};

// Helper to get payment status categories
export const categorizeInvoices = (invoices: Invoice[]) => {
  const paid: Invoice[] = [];
  const unpaid: Invoice[] = [];
  const partial: Invoice[] = [];
  
  invoices.forEach(invoice => {
    const netAmount = invoice.netAmount || 0;
    const paidAmount = invoice.paidAmount || 0;
    
    if (paidAmount <= 0) {
      unpaid.push(invoice);
    } else if (paidAmount >= netAmount) {
      paid.push(invoice);
    } else {
      partial.push(invoice);
    }
  });
  
  return { paid, unpaid, partial };
};

// Calculate total amounts
export const calculateTotals = (invoices: Invoice[]) => {
  const { paid, unpaid, partial } = categorizeInvoices(invoices);
  
  const totalPaidAmount = paid.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  const totalUnpaidAmount = unpaid.reduce((sum, inv) => sum + (inv.netAmount || 0), 0);
  const totalPartialInvoiceAmount = partial.reduce((sum, inv) => sum + (inv.netAmount || 0), 0);
  const totalPartialPaidAmount = partial.reduce((sum, inv) => sum + (inv.paidAmount || 0), 0);
  const totalPartialRemainingAmount = totalPartialInvoiceAmount - totalPartialPaidAmount;
  
  return {
    totalPaidAmount,
    totalUnpaidAmount,
    totalPartialInvoiceAmount,
    totalPartialPaidAmount,
    totalPartialRemainingAmount,
    paidCount: paid.length,
    unpaidCount: unpaid.length,
    partialCount: partial.length
  };
};
