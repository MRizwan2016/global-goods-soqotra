
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
 * Update form amounts and return the updated form state
 */
export const recalculateAmounts = (formState: {
  grossAmount: number;
  discount: number;
  totalPaid: number;
  netAmount: number;
  balanceToPay: number;
  amountPaid: number;
}): {
  netAmount: number;
  balanceToPay: number;
  amountPaid: number;
} => {
  const netAmount = calculateNetAmount(formState.grossAmount, formState.discount);
  const balanceToPay = calculateBalanceToPay(netAmount, formState.totalPaid);
  const amountPaid = getSuggestedPaymentAmount(balanceToPay);
  
  return { netAmount, balanceToPay, amountPaid };
};
