
import { useState, useEffect } from "react";
import { COUNTRY_CURRENCY_MAP, CURRENCY_SYMBOLS, DEFAULT_COUNTRY, DEFAULT_CURRENCY } from "../constants/paymentConstants";

/**
 * Hook for managing country and currency selection
 */
export const useCurrencyCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>(DEFAULT_COUNTRY);
  const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>([DEFAULT_CURRENCY]);
  const [currencySymbol, setCurrencySymbol] = useState<string>(CURRENCY_SYMBOLS[DEFAULT_CURRENCY] || DEFAULT_CURRENCY);
  
  // All country options from the map
  const countryOptions = Object.keys(COUNTRY_CURRENCY_MAP);
  
  useEffect(() => {
    // Get currencies for the selected country
    if (selectedCountry) {
      setFilteredCurrencies(COUNTRY_CURRENCY_MAP[selectedCountry] || [DEFAULT_CURRENCY]);
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
