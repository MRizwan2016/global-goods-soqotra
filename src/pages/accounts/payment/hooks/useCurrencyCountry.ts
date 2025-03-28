
import { useState, useEffect } from "react";
import { COUNTRY_CURRENCY_MAP, type CountryCode } from "../constants/paymentConstants";

// Define types to match the readonly constants
type CountryOption = typeof COUNTRY_CURRENCY_MAP[number];
type CurrencyOption = { label: string; value: string };

export const useCurrencyCountry = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("Qatar");
  const [currencySymbol, setCurrencySymbol] = useState<string>("QAR");
  
  // Country options from constants
  const countryOptions = COUNTRY_CURRENCY_MAP;
  
  // Currencies filtered by country
  const [filteredCurrencies, setFilteredCurrencies] = useState<CurrencyOption[]>([
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
  const handleCountryChange = (country: CountryCode) => {
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
