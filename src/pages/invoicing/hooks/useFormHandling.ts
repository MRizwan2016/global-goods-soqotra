
import { useEffect } from "react";
import { calculateNet } from "../utils/invoiceCalculations";
import { countrySectorMap } from "../constants/countrySectorMap";
import { FormState } from "../types/invoiceForm";
import { warehouseOptions, cityOptions } from "../constants/locationData";

export const useFormHandling = (
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
) => {
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
  }, [formState.country, formState.warehouse]);
  
  // If no destination is set initially, don't auto-set it to match country
  useEffect(() => {
    if (formState.country && !formState.destination) {
      // Don't auto-set destination to match country
      setFormState(prev => ({
        ...prev,
        destination: prev.destination || "Kenya" // Only set if not already set
      }));
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
  }, [formState.country, formState.warehouse, formState.district]);
  
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
    
    // Calculate net for any payment component
    if (['freight', 'destinationTransport', 'document', 'localTransport', 'packing', 
         'storage', 'destinationClearing', 'destinationDoorDelivery', 'other'].includes(name)) {
      
      // Sum up all payment components
      setTimeout(() => {
        let total = 0;
        total += parseFloat(formState.freight) || 0;
        total += parseFloat(formState.destinationTransport) || 0;
        total += parseFloat(formState.document) || 0;
        total += parseFloat(formState.localTransport) || 0;
        total += parseFloat(formState.packing) || 0;
        total += parseFloat(formState.storage) || 0;
        total += parseFloat(formState.destinationClearing) || 0;
        total += parseFloat(formState.destinationDoorDelivery) || 0;
        total += parseFloat(formState.other) || 0;
        
        const discount = parseFloat(formState.discount) || 0;
        const net = total - discount;
        
        setFormState(prev => ({
          ...prev,
          gross: total.toString(),
          net: net.toString()
        }));
      }, 0);
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // If country changes, update the sector and warehouse only
    // But DON'T update destination
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      const countryWarehouses = warehouseOptions[value] || [];
      const defaultWarehouse = countryWarehouses.length > 0 ? countryWarehouses[0] : "";
      
      setFormState(prev => ({
        ...prev,
        sector: sectorForCountry || "",
        warehouse: defaultWarehouse,
        // Reset city selections when country changes
        shipperCity: ""
      }));
    }
    
    // If destination changes, reset consignee city
    if (name === 'destination') {
      setFormState(prev => ({
        ...prev,
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
    
    // Auto-generate box number for new packages
    if (name === 'boxNumber' && !value) {
      // Get box count and add 1
      const boxCount = parseFloat(formState.packages) || 0;
      const newBoxNumber = (boxCount + 1).toString();
      
      setFormState(prev => ({
        ...prev,
        boxNumber: newBoxNumber
      }));
    }
  };

  // Get available cities based on country
  const getAvailableCities = (country: string) => {
    return cityOptions[country] || [];
  };

  return {
    handleInputChange,
    handleSelectChange,
    getAvailableCities
  };
};
