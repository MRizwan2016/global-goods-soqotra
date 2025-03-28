
/**
 * Payment method options
 */
export const PAYMENT_METHODS = [
  { id: "CASH_IN_HAND", name: "Cash in Hand" },
  { id: "BANK_TRANSFER", name: "Bank Transfer" },
  { id: "CREDIT_CARD", name: "Credit Card" },
  { id: "CHEQUE", name: "Cheque" },
  { id: "MOBILE_MONEY", name: "Mobile Money" }
] as const;

/**
 * Payment method types with distinct styling
 */
export const PAYMENT_METHOD_TYPES = {
  BANK: "Bank",
  CASH: "Cash",
  CARD: "Card",
  DIGITAL: "Digital"
} as const;

/**
 * Payment status options
 */
export const PAYMENT_STATUSES = [
  { id: "pending", name: "Pending", color: "bg-amber-100 text-amber-800" },
  { id: "partial", name: "Partially Paid", color: "bg-blue-100 text-blue-800" },
  { id: "paid", name: "Paid", color: "bg-green-100 text-green-800" },
  { id: "overdue", name: "Overdue", color: "bg-red-100 text-red-800" }
] as const;

/**
 * Default form state values
 */
export const DEFAULT_PAYMENT_FORM_VALUES = {
  amountPaid: 0,
  receivableAccount: "CASH_IN_HAND",
  currency: "QAR"
};

/**
 * Country currency mapping
 */
export const COUNTRY_CURRENCY_MAP = [
  { value: "Qatar", label: "Qatar", currency: "QAR", symbol: "QAR" },
  { value: "Kenya", label: "Kenya", currency: "KES", symbol: "KSh" },
  { value: "UAE", label: "UAE", currency: "AED", symbol: "AED" },
  { value: "Saudi Arabia", label: "Saudi Arabia", currency: "SAR", symbol: "SAR" }
] as const;

/**
 * Type definitions for payment method and status
 */
export type PaymentMethodId = typeof PAYMENT_METHODS[number]['id'];
export type PaymentStatusId = typeof PAYMENT_STATUSES[number]['id'];
export type PaymentMethodType = typeof PAYMENT_METHOD_TYPES[keyof typeof PAYMENT_METHOD_TYPES];
export type CountryCode = typeof COUNTRY_CURRENCY_MAP[number]['value'];
export type CurrencyCode = typeof COUNTRY_CURRENCY_MAP[number]['currency'];
