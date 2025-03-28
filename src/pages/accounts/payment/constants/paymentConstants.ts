
// Default values for form fields
export const DEFAULT_PAYMENT_FORM_VALUES = {
  amountPaid: 0,
  receivableAccount: "bank-transfer",
  currency: "QAR"
};

// Payment method options
export const PAYMENT_METHODS = [
  { id: "bank-transfer", name: "Bank Transfer" },
  { id: "cash", name: "Cash" },
  { id: "cheque", name: "Cheque" },
  { id: "credit-card", name: "Credit Card" },
  { id: "online", name: "Online Payment" }
];

// Country-currency mapping
export const COUNTRY_CURRENCY_MAP = {
  "Qatar": ["QAR"],
  "Kenya": ["KES"],
  "USA": ["USD"],
  "UAE": ["AED"],
  "India": ["INR"],
  "Sri Lanka": ["LKR"]
};
