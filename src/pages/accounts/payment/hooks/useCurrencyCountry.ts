
import { useState, useEffect } from "react";
import { COUNTRY_CURRENCY_MAP, CURRENCY_SYMBOLS, DEFAULT_COUNTRY, DEFAULT_CURRENCY } from "../constants/paymentConstants";

/**
 * Hook for managing country and currency selection
 */
export const useCurrencyCountry = () => {
  // Use Qatar and QAR as defaults
  const [selectedCountry, setSelectedCountry] = useState<string>("Qatar");
  const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>(["QAR"]);
  const [currencySymbol, setCurrencySymbol] = useState<string>("QR");
  
  // All country options from the map
  const countryOptions = Object.keys(COUNTRY_CURRENCY_MAP);
  
  useEffect(() => {
    // Get currencies for the selected country
    if (selectedCountry) {
      setFilteredCurrencies(COUNTRY_CURRENCY_MAP[selectedCountry] || ["QAR"]);
    }
  }, [selectedCountry]);
  
  // Update currency symbol when currency changes
  useEffect(() => {
    if (filteredCurrencies.length > 0) {
      const currency = filteredCurrencies[0];
      setCurrencySymbol(CURRENCY_SYMBOLS[currency] || currency);
    }
  }, [filteredCurrencies]);
  
  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };
  
  return {
    selectedCountry,
    currencySymbol,
    countryOptions,
    filteredCurrencies,
    handleCountryChange
  };
};
