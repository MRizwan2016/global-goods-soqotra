
import { useEffect } from "react";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { usePaymentSave } from "./usePaymentSave";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { useFormHandler } from "./useFormHandler";
import { useDateHandling } from "./useDateHandling";
import { usePaymentAmounts } from "./usePaymentAmounts";
import { useInvoiceHandler } from "./useInvoiceHandler";
import { FormState } from "../types";

export const useInvoicePayment = () => {
  
  
  const { date, handleDateSelect } = useDateHandling();
  
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
  
  const { 
    formState, 
    setFormState, 
    handleInputChange, 
    handleSelectChange 
  } = useFormHandler(initialFormState);
  
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
  } = useCurrencyCountry();
  
  const { handlePaymentAmountChange: paymentAmountHandler } = usePaymentAmounts(currencySymbol);
  const { handleSelectInvoice: invoiceSelectHandler } = useInvoiceHandler();
  
  const { handleSave } = usePaymentSave(formState, currencySymbol);
  
  const handleDateSelectWithFormUpdate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const dateString = handleDateSelect(selectedDate);
      setFormState(prev => ({ ...prev, paymentCollectDate: dateString }));
    }
  };
  
  const handleSelectInvoice = (invoice: any) => {
    invoiceSelectHandler(invoice, setSelectedInvoice, setFormState, setShowInvoiceSelector);
  };
  
  // Payment amount change that also updates totalPaid and balanceToPay dynamically
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = paymentAmountHandler(e, formState);
    setFormState(prev => {
      const netAmount = prev.netAmount || 0;
      const existingPaid = prev.totalPaid || 0;
      // Balance is net minus what's already paid (not counting current input)
      const balance = Math.max(0, netAmount - existingPaid);
      return {
        ...prev,
        amountPaid: amount,
        // Show how balance would look after this payment
        balanceToPay: Math.max(0, balance - amount),
      };
    });
  };
  
  useEffect(() => {
    const storedInvoice = sessionStorage.getItem('selectedInvoice');
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        handleSelectInvoice(parsedInvoice);
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
