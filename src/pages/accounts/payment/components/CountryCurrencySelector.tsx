import React from "react";
import { motion } from "framer-motion";
import { Globe, CircleDollarSign } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fadeInVariants } from "../utils/animationVariants";
import { COUNTRY_CURRENCY_MAP } from "../constants/paymentConstants";

type CountryOption = typeof COUNTRY_CURRENCY_MAP[number];

interface CurrencyOption {
  value: string;
  label: string;
  symbol?: string;
  countries?: string[];
}

interface CountryCurrencySelectorProps {
  formState: {
    country: string;
    currency: string;
  };
  handleSelectChange: (name: string, value: string) => void;
  countryOptions: readonly CountryOption[];
  filteredCurrencies: CurrencyOption[];
}

const CountryCurrencySelector: React.FC<CountryCurrencySelectorProps> = ({
  formState,
  handleSelectChange,
  countryOptions,
  filteredCurrencies,
}) => {
  return (
    <motion.div 
      initial={fadeInVariants.initial}
      animate={fadeInVariants.animate}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-indigo-100 shadow-inner"
    >
      <h3 className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
        <Globe className="h-5 w-5 text-purple-500" />
        Country and Currency Selection
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Globe className="h-4 w-4 text-indigo-600" />
            Country Office:
          </label>
          <Select
            value={formState.country}
            onValueChange={(value) => handleSelectChange("country", value)}
          >
            <SelectTrigger className="border-indigo-200 focus:ring-indigo-300">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {countryOptions.map((country) => (
                <SelectItem key={country.value} value={country.value} className="cursor-pointer">
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4 text-green-600" />
            Currency:
          </label>
          <Select
            value={formState.currency}
            onValueChange={(value) => handleSelectChange("currency", value)}
          >
            <SelectTrigger className="border-green-200 focus:ring-green-300">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              {filteredCurrencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value} className="cursor-pointer">
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default CountryCurrencySelector;
