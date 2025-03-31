
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { usePaymentSave } from "./usePaymentSave";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { useFormHandler } from "./useFormHandler";
import { useDateHandling } from "./useDateHandling";
import { usePaymentAmounts } from "./usePaymentAmounts";
import { useInvoiceHandler } from "./useInvoiceHandler";
import { FormState } from "../types";

export const useInvoicePayment = () => {
  const navigate = useNavigate();
  
  // Use the date handling hook
  const { date, handleDateSelect } = useDateHandling();
  
  // Initialize form state
  const initialFormState: FormState = {
    invoiceNumber: "",
    customerName: "",
    bookingForm: "",
    balanceToPay: 0,
    amountPaid: 0,
    remarks: "",
    receivableAccount: "cash",
    country: "Qatar",
    currency: "QAR",
    paymentCollectDate: date.toISOString().split('T')[0],
  };
  
  // Use form handler hook
  const { 
    formState, 
    setFormState, 
    handleInputChange, 
    handleSelectChange 
  } = useFormHandler(initialFormState);
  
  // Use invoice search hook
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
  
  // Use currency country hook
  const {
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleCountryChange,
  } = useCurrencyCountry();
  
  // Use payment amounts hook
  const { handlePaymentAmountChange: paymentAmountHandler } = usePaymentAmounts(currencySymbol);
  
  // Use invoice handler hook
  const { handleSelectInvoice: invoiceSelectHandler } = useInvoiceHandler();
  
  // Get payment save handler
  const { handleSave } = usePaymentSave(formState, currencySymbol);
  
  // Handle date selection with form update
  const handleDateSelectWithFormUpdate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const dateString = handleDateSelect(selectedDate);
      setFormState(prev => ({ ...prev, paymentCollectDate: dateString }));
    }
  };
  
  // Wrapper for invoice selection
  const handleSelectInvoice = (invoice: any) => {
    invoiceSelectHandler(invoice, setSelectedInvoice, setFormState, setShowInvoiceSelector);
  };
  
  // Wrapper for payment amount change
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = paymentAmountHandler(e, formState);
    setFormState(prev => ({ ...prev, amountPaid: amount }));
  };
  
  // Check for invoice in session storage (from direct payment link)
  useEffect(() => {
    const storedInvoice = sessionStorage.getItem('selectedInvoice');
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        handleSelectInvoice(parsedInvoice);
        // Clear session storage after using it
        sessionStorage.removeItem('selectedInvoice');
      } catch (error) {
        console.error("Error parsing stored invoice:", error);
      }
    }
  }, []);
  
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
    handleDateSelect: handleDateSelectWithFormUpdate,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave,
    handleCountryChange,
    handlePaymentAmountChange
  };
};
