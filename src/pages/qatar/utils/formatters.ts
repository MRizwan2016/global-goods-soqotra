
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
  
  // Get currency symbol based on currency code
  const currencySymbol = getCurrencySymbol(currency);
  
  return `${currencySymbol} ${numAmount.toFixed(2)}`;
};

// Helper function to get currency symbol
export const getCurrencySymbol = (currencyCode: string): string => {
  const symbols: Record<string, string> = {
    "QAR": "QR",
    "AED": "AED",
    "USD": "$",
    "EUR": "€",
    "KES": "KSh",
    "INR": "₹",
    "LKR": "Rs"
  };
  
  return symbols[currencyCode] || currencyCode;
};
