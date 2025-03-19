
export const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) {
    return "QAR 0.00";
  }
  
  return `QAR ${numAmount.toFixed(2)}`;
};
