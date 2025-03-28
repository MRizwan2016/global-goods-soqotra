
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

// Payment status options
export const PAYMENT_STATUSES = [
  { id: "pending", name: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { id: "partial", name: "Partially Paid", color: "bg-blue-100 text-blue-800" },
  { id: "completed", name: "Completed", color: "bg-green-100 text-green-800" },
  { id: "canceled", name: "Canceled", color: "bg-red-100 text-red-800" }
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
