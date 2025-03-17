
import { useState } from "react";
import { calculateNet } from "../utils/invoiceCalculations";
import { countrySectorMap } from "../constants/countrySectorMap";
import { FormState } from "../types/invoiceForm";

export const useFormHandling = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'freight') {
      setFormState(prev => ({
        ...prev,
        gross: value,
        net: calculateNet(String(value), String(prev.discount))
      }));
    }
    
    if (name === 'discount') {
      setFormState(prev => ({
        ...prev,
        net: calculateNet(String(prev.gross), String(value))
      }));
    }
    
    // If country changes, update the sector
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      if (sectorForCountry) {
        setFormState(prev => ({
          ...prev,
          sector: sectorForCountry
        }));
      }
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // If country changes through select, update the sector
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      if (sectorForCountry) {
        setFormState(prev => ({
          ...prev,
          sector: sectorForCountry
        }));
      }
    }
  };

  return {
    formState,
    setFormState,
    handleInputChange,
    handleSelectChange
  };
};
