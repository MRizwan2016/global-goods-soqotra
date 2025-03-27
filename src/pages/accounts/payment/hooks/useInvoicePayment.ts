
import { useState } from "react";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { usePaymentForm } from "./usePaymentForm";
import { Invoice } from "../types";

/**
 * Main hook for the invoice payment functionality
 */
export const useInvoicePayment = () => {
  // Invoice states
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Use the invoice search hook
  const { 
    invoicePrefix, 
    setInvoicePrefix, 
    matchingInvoices, 
    showInvoiceSelector, 
    setShowInvoiceSelector, 
    handleInvoiceSearch 
  } = useInvoiceSearch(setSelectedInvoice);
  
  // Use the currency and country hook
  const { 
    selectedCountry, 
    filteredCurrencies, 
    currencySymbol, 
    countryOptions,
    handleCountryChange
  } = useCurrencyCountry();
  
  // Use the payment form hook
  const { 
    formState, 
    date, 
    handleInputChange, 
    handleSelectChange: handleFormSelectChange, 
    handleDateSelect, 
    handleSelectInvoice, 
    handleSave 
  } = usePaymentForm(
    selectedInvoice,
    setSelectedInvoice,
    setShowInvoiceSelector,
    selectedCountry,
    currencySymbol
  );
  
  // Combine select change handlers
  const handleSelectChange = (name: string, value: string) => {
    handleFormSelectChange(name, value);
    
    if (name === "country") {
      handleCountryChange(value);
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
    selectedCountry,
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave
  };
};
