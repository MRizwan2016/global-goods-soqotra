
import { useState, useEffect } from "react";
import { calculateNet } from "../utils/invoiceCalculations";
import { countrySectorMap } from "../constants/countrySectorMap";
import { FormState } from "../types/invoiceForm";
import { warehouseOptions, cityOptions, DEFAULT_WAREHOUSE } from "../constants/locationData";

export const useFormHandling = (initialState: FormState) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  
  // Initialize warehouse based on country if not already set
  useEffect(() => {
    if (formState.country && !formState.warehouse) {
      const countryWarehouses = warehouseOptions[formState.country] || [];
      if (countryWarehouses.length > 0) {
        setFormState(prev => ({
          ...prev,
          warehouse: countryWarehouses[0]
        }));
      }
    }
  }, [formState.country]);
  
  // Update district based on warehouse for Kenya
  useEffect(() => {
    if (formState.country === "Kenya" && formState.warehouse) {
      // Set district based on warehouse location
      const district = formState.warehouse.includes("Nairobi") ? "Nairobi" : 
                       formState.warehouse.includes("Mombasa") ? "Mombasa" : 
                       formState.district;
                       
      setFormState(prev => ({
        ...prev,
        district: district
      }));
    }
  }, [formState.country, formState.warehouse]);
  
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
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // If country changes, update the sector and warehouse
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      const countryWarehouses = warehouseOptions[value] || [];
      const defaultWarehouse = countryWarehouses.length > 0 ? countryWarehouses[0] : "";
      
      setFormState(prev => ({
        ...prev,
        sector: sectorForCountry || "",
        warehouse: defaultWarehouse,
        // Reset city selections when country changes
        shipperCity: "",
        consigneeCity: ""
      }));
    }
    
    // If warehouse changes for Kenya, update district
    if (name === 'warehouse' && formState.country === "Kenya") {
      const district = value.includes("Nairobi") ? "Nairobi" : 
                      value.includes("Mombasa") ? "Mombasa" : 
                      formState.district;
                      
      setFormState(prev => ({
        ...prev,
        district: district
      }));
    }
  };

  // Get available cities based on country
  const getAvailableCities = (country: string) => {
    return cityOptions[country] || [];
  };

  return {
    formState,
    setFormState,
    handleInputChange,
    handleSelectChange,
    getAvailableCities
  };
};
