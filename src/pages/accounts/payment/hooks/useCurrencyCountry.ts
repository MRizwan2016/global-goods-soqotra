
import { useState, useEffect } from "react";
import { COUNTRY_CURRENCY_MAP } from "../constants/paymentConstants";

/**
 * Hook for managing country and currency selection
 */
export const useCurrencyCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Qatar");
  const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>(["QAR"]);
  const [currencySymbol, setCurrencySymbol] = useState<string>("QR");
  
  // All country options from the map
  const countryOptions = Object.keys(COUNTRY_CURRENCY_MAP);
  
  useEffect(() => {
    // Get currencies for the selected country
    if (selectedCountry) {
      setFilteredCurrencies(COUNTRY_CURRENCY_MAP[selectedCountry] || []);
    }
  }, [selectedCountry]);
  
  // Update currency symbol when currency changes
  useEffect(() => {
    if (filteredCurrencies.length > 0) {
      const currency = filteredCurrencies[0];
      
      if (currency === "USD") {
        setCurrencySymbol("$");
      } else if (currency === "EUR") {
        setCurrencySymbol("€");
      } else if (currency === "QAR") {
        setCurrencySymbol("QR");
      } else if (currency === "AED") {
        setCurrencySymbol("AED");
      } else if (currency === "KES") {
        setCurrencySymbol("KSh");
      } else if (currency === "INR") {
        setCurrencySymbol("₹");
      } else if (currency === "LKR") {
        setCurrencySymbol("Rs");
      } else {
        setCurrencySymbol(currency);
      }
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
