
export const formatCurrency = (amount: number | string): string => {
  // Handle the case when amount is undefined or null
  if (amount === undefined || amount === null) {
    return "QAR 0.00";
  }
  
  let numAmount: number;
  
  // Convert string to number if necessary
  if (typeof amount === 'string') {
    numAmount = parseFloat(amount);
  } else {
    numAmount = amount;
  }
  
  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return "QAR 0.00";
  }
  
  return `QAR ${numAmount.toFixed(2)}`;
};
