
export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case "USD": return "$";
    case "EUR": return "€";
    case "QAR": return "QR";
    case "AED": return "AED";
    case "KES": return "KSh";
    case "INR": return "₹";
    case "LKR": return "Rs";
    default: return currency;
  }
};
