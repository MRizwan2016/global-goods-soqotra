
import { useState } from "react";
import { Invoice } from "../types";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { usePaymentForm } from "./usePaymentForm";

/**
 * Hook for managing invoice payment flow
 */
export const useInvoicePayment = () => {
  // Use invoice search functionality
  const {
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    setSelectedInvoice,
    handleInvoiceSearch
  } = useInvoiceSearch();

  // Use currency and country selection
  const {
    selectedCountry,
    currencySymbol,
    countryOptions,
    filteredCurrencies,
    handleCountryChange
  } = useCurrencyCountry();

  // Use payment form management
  const {
    formState,
    date,
    handleInputChange,
    handleSelectChange,
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
    handleCountryChange
  };
};
