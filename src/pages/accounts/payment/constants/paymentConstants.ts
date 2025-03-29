
/**
 * Constants used for payment processing
 */

/**
 * Map of countries to their available currencies
 */
export const COUNTRY_CURRENCY_MAP: Record<string, string[]> = {
  "Qatar": ["QAR"],
  "UAE": ["AED"],
  "USA": ["USD"],
  "Kenya": ["KES"],
  "India": ["INR"],
  "Sri Lanka": ["LKR"],
  "European Union": ["EUR"]
};

/**
 * Currency symbols for display
 */
export const CURRENCY_SYMBOLS: Record<string, string> = {
  "QAR": "QR",
  "AED": "AED",
  "USD": "$",
  "EUR": "€",
  "KES": "KSh",
  "INR": "₹",
  "LKR": "Rs"
};

/**
 * Payment method options
 */
export const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "card", label: "Card/POS" },
  { value: "bank", label: "Bank Transfer" },
  { value: "cheque", label: "Cheque" },
  { value: "other", label: "Other" }
];
