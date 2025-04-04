
export const formatCurrency = (amount: number | string, currency: string = "QAR"): string => {
  // Handle the case when amount is undefined or null
  if (amount === undefined || amount === null) {
    return `${currency} 0.00`;
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
    return `${currency} 0.00`;
  }
  
  return `${currency} ${numAmount.toFixed(2)}`;
};
