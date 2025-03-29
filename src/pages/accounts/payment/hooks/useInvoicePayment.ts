
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateValue } from "react-day-picker";
import { toast } from "sonner";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { usePaymentSave } from "./usePaymentSave";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { useFormInputHandlers } from "./useFormInputHandlers";
import { amountWithinRange, getBalanceForPayment } from "../utils/amountCalculations";
import { FormState } from "../types";

export const useInvoicePayment = () => {
  const navigate = useNavigate();
  
  // Get the current date
  const today = new Date();
  const [date, setDate] = useState<DateValue>(today);
  
  // Initialize form state
  const [formState, setFormState] = useState<FormState>({
    invoiceNumber: "",
    customerName: "",
    bookingForm: "",
    balanceToPay: 0,
    amountPaid: 0,
    remarks: "",
    receivableAccount: "cash",
    country: "",
    currency: "",
    paymentCollectDate: today.toISOString().split('T')[0],
  });
  
  // Import hooks
  const {
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    setSelectedInvoice,
    handleInvoiceSearch,
  } = useInvoiceSearch();
  
  const {
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleCountryChange,
  } = useCurrencyCountry(formState, setFormState);
  
  const {
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
  } = useFormInputHandlers(formState, setFormState, setDate);
  
  const { handleSave } = usePaymentSave(formState, currencySymbol);
  
  // Handle selecting an invoice
  const handleSelectInvoice = (invoice: any) => {
    // First set the selected invoice
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);
    
    // Get the balance to pay (either from invoice.balanceToPay or calculate it)
    const balanceToPay = getBalanceForPayment(invoice);
    
    // Get customer name from various possible properties
    const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || "";
    
    // Set form state with invoice details
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoice.invoiceNumber,
      customerName: customerName,
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      balanceToPay: balanceToPay,
      amountPaid: balanceToPay, // Default to paying the full amount
      currency: invoice.currency || "", // Use currency from invoice if available
    }));
    
    // If invoice has currency, try to set the matching country
    if (invoice.currency) {
      setFormState(prev => ({
        ...prev,
        currency: invoice.currency,
        country: prev.country || "Qatar" // Default to Qatar if no country set yet
      }));
    }
    
    // Show toast notification
    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} loaded for payment`,
    });
  };
  
  // Handle payment amount change with validation
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    // Check if it's a valid number
    if (isNaN(value)) {
      setFormState(prev => ({ ...prev, amountPaid: 0 }));
      return;
    }
    
    // Check if amount is within valid range
    if (amountWithinRange(value, formState.balanceToPay)) {
      setFormState(prev => ({ ...prev, amountPaid: value }));
    } else if (value > formState.balanceToPay) {
      // Allow overpayment but show warning
      setFormState(prev => ({ ...prev, amountPaid: value }));
      toast.warning("Overpayment", {
        description: `The amount exceeds the balance due of ${currencySymbol}${formState.balanceToPay}`,
      });
    }
  };
  
  return {
    formState,
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    date,
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave,
    handleCountryChange,
    handlePaymentAmountChange
  };
};
