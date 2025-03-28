
import { useState, useEffect } from "react";
import { COUNTRY_CURRENCY_MAP } from "../constants/paymentConstants";

export const useCurrencyCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Qatar");
  const [currencySymbol, setCurrencySymbol] = useState<string>("QAR");
  
  // Country options from constants
  const countryOptions = COUNTRY_CURRENCY_MAP;
  
  // Currencies filtered by country
  const [filteredCurrencies, setFilteredCurrencies] = useState<{ label: string; value: string }[]>([
    { label: "QAR", value: "QAR" }
  ]);
  
  // Update currencies when country changes
  useEffect(() => {
    const country = countryOptions.find(c => c.value === selectedCountry);
    if (country) {
      setCurrencySymbol(country.currency);
      setFilteredCurrencies([{ label: country.currency, value: country.currency }]);
    }
  }, [selectedCountry]);
  
  // Handle country change
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
  };
  
  return {
    selectedCountry,
    handleCountryChange,
    currencySymbol,
    countryOptions,
    filteredCurrencies
  };
};
