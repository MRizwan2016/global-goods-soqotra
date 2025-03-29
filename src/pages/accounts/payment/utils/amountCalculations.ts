
/**
 * Utility functions for payment amount calculations
 */

/**
 * Calculate the net amount based on gross amount and discount
 */
export const calculateNetAmount = (grossAmount: number, discount: number): number => {
  return grossAmount - discount;
};

/**
 * Calculate the balance to pay based on net amount and total paid
 */
export const calculateBalanceToPay = (netAmount: number, totalPaid: number): number => {
  return netAmount - totalPaid;
};

/**
 * Generate the suggested payment amount (defaults to the balance to pay)
 */
export const getSuggestedPaymentAmount = (balanceToPay: number): number => {
  return balanceToPay > 0 ? balanceToPay : 0;
};

/**
 * Check if the amount is within valid payment range (0 to balance)
 */
export const amountWithinRange = (amount: number, balance: number): boolean => {
  return amount >= 0 && amount <= balance;
};

/**
 * Get the balance to pay from an invoice object
 */
export const getBalanceForPayment = (invoice: any): number => {
  // If invoice has balanceToPay property, use it
  if (invoice.balanceToPay !== undefined) {
    return invoice.balanceToPay;
  }
  
  // Otherwise calculate from net minus any payments
  const net = invoice.net || 0;
  const paid = invoice.paidAmount || 0;
  return net - paid;
};

/**
 * Update form amounts and return the updated form state
 */
export const recalculateAmounts = (formState: {
  grossAmount?: number;
  discount?: number;
  totalPaid?: number;
  netAmount?: number;
  balanceToPay?: number;
  amountPaid?: number;
}): {
  netAmount: number;
  balanceToPay: number;
  amountPaid: number;
} => {
  const grossAmount = formState.grossAmount || 0;
  const discount = formState.discount || 0;
  const totalPaid = formState.totalPaid || 0;
  
  const netAmount = calculateNetAmount(grossAmount, discount);
  const balanceToPay = calculateBalanceToPay(netAmount, totalPaid);
  const amountPaid = getSuggestedPaymentAmount(balanceToPay);
  
  return { netAmount, balanceToPay, amountPaid };
};
