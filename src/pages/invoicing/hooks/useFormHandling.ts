
import { useEffect } from "react";
import { calculateNet } from "../utils/invoiceCalculations";
import { countrySectorMap } from "../constants/countrySectorMap";
import { FormState } from "../types/invoiceForm";
import { warehouseOptions, cityOptions } from "../constants/locationData";

export const useFormHandling = (
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  updatePackagePricing?: () => void
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
        destination: prev.destination || prev.country // Set to country if no destination is set
      }));
      
      // Update package pricing when country changes
      if (updatePackagePricing) {
        updatePackagePricing();
      }
    }
  }, [formState.country]);
  
  // Update branch and district based on country
  useEffect(() => {
    // Special handling for Qatar - set default branch
    if (formState.country === "Qatar") {
      setFormState(prev => ({
        ...prev,
        branch: prev.branch || "HEAD OFFICE",
        district: prev.district || "DOHA"
      }));
    }
    // Update district based on warehouse for Kenya
    else if (formState.country === "Kenya" && formState.warehouse) {
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

  // Update package pricing when destination changes
  useEffect(() => {
    if (formState.destination && updatePackagePricing) {
      updatePackagePricing();
    }
  }, [formState.destination]);
  
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

    // If country changes, update the sector, warehouse, and branch
    if (name === 'country') {
      const sectorForCountry = countrySectorMap[value as keyof typeof countrySectorMap];
      const countryWarehouses = warehouseOptions[value] || [];
      const defaultWarehouse = countryWarehouses.length > 0 ? countryWarehouses[0] : "";
      
      // Set default branch for Qatar
      const defaultBranch = value === "Qatar" ? "HEAD OFFICE" : "";
      // Set default district for Qatar
      const defaultDistrict = value === "Qatar" ? "DOHA" : "";
      
      setFormState(prev => ({
        ...prev,
        sector: sectorForCountry || "",
        warehouse: defaultWarehouse,
        // Set branch for Qatar
        branch: defaultBranch || prev.branch,
        // Set district for Qatar
        district: defaultDistrict || prev.district,
        // Update destination to match country if not set already
        destination: prev.destination || value,
        // Reset city selections when country changes
        shipperCity: ""
      }));
      
      // Update package pricing when country changes
      if (updatePackagePricing) {
        setTimeout(updatePackagePricing, 0);
      }
    }
    
    // If destination changes, reset consignee city and update package pricing
    if (name === 'destination') {
      setFormState(prev => ({
        ...prev,
        consigneeCity: ""
      }));
      
      // Update package pricing when destination changes
      if (updatePackagePricing) {
        setTimeout(updatePackagePricing, 0);
      }
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
