
import React from "react";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormState } from "../types";
import { fadeInVariants } from "../utils/animationVariants";

interface CountryCurrencySelectorProps {
  formState: FormState;
  handleSelectChange: (name: string, value: string) => void;
  countryOptions: string[];
  filteredCurrencies: string[];
}

const CountryCurrencySelector: React.FC<CountryCurrencySelectorProps> = ({
  formState,
  handleSelectChange,
  countryOptions,
  filteredCurrencies,
}) => {
  return (
    <motion.div 
      variants={fadeInVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
    >
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Country:
        </label>
        <Select 
          value={formState.country} 
          onValueChange={(value) => handleSelectChange("country", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="text-sm font-medium mb-1 block text-gray-700">
          Currency:
        </label>
        <Select 
          value={formState.currency} 
          onValueChange={(value) => handleSelectChange("currency", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            {filteredCurrencies.map((currency) => (
              <SelectItem key={currency} value={currency}>{currency}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};

export default CountryCurrencySelector;
