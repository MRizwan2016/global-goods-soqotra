
import { useState, useEffect } from "react";

export const useCurrencyCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("Qatar");
  const [currencySymbol, setCurrencySymbol] = useState<string>("QAR");
  
  // Mock country options
  const countryOptions = [
    { label: "Qatar", value: "Qatar", currency: "QAR" },
    { label: "Kenya", value: "Kenya", currency: "KES" },
    { label: "UAE", value: "UAE", currency: "AED" },
    { label: "Saudi Arabia", value: "Saudi Arabia", currency: "SAR" }
  ];
  
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
