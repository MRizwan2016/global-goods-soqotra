
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

/**
 * Payment status options
 */
export const PAYMENT_STATUSES = [
  { value: "paid", label: "Paid", color: "bg-green-100 text-green-800" },
  { value: "unpaid", label: "Unpaid", color: "bg-amber-100 text-amber-800" },
  { value: "partial", label: "Partial", color: "bg-blue-100 text-blue-800" },
  { value: "overdue", label: "Overdue", color: "bg-red-100 text-red-800" }
];

/**
 * Default values for payment form
 */
export const DEFAULT_PAYMENT_FORM_VALUES = {
  amountPaid: 0,
  receivableAccount: "cash",
  currency: "QAR"
};
