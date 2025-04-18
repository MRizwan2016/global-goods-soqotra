
export const getPaymentStatus = (invoiceNumber: string, defaultPaid: boolean): boolean => {
  // If invoice is already marked as paid, return true
  if (defaultPaid) return true;
  
  // Check localStorage for payments
  const paymentsStr = localStorage.getItem('payments');
  if (!paymentsStr) return false;
  
  try {
    const payments = JSON.parse(paymentsStr);
    // Find payments for this invoice
    const invoicePayments = payments.filter((p: any) => p.invoiceNumber === invoiceNumber);
    // If we found any payments, consider it paid
    return invoicePayments.length > 0;
  } catch (e) {
    console.error("Error parsing payments:", e);
    return false;
  }
};
