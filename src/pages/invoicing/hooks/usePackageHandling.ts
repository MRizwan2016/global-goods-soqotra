
import { v4 as uuidv4 } from "uuid";
import { FormState, PackageItem } from "../types/invoiceForm";
import { packageOptions } from "@/data/packageOptions";
import { 
  getDimensionsForPackage, 
  calculateCubicMeter, 
  calculateTotal,
  calculatePriceByDestination 
} from "../utils/packageDimensions";
import { calculateTotalsFromPackages, createPackageItemFromForm } from "../utils/packageCalculations";

interface PackageHandlingProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  packageItems: PackageItem[];
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>;
}

export const usePackageHandling = ({
  formState, 
  setFormState, 
  packageItems, 
  setPackageItems
}: PackageHandlingProps) => {
  
  // Helper function to get country-specific pricing
  const getCountryBasedPricing = (selectedPackage: any, weight: string, volume: string) => {
    // Default to Sri Lanka pricing if no country is selected or pricing is not found
    let price = "";
    let documentsFee = "0";

    // Get country and destination info
    const country = formState.country || "";
    const destination = formState.destination || "";
    
    if (!selectedPackage?.pricing) {
      return { price, documentsFee };
    }
    
    // Weight in kg
    const weightInKg = parseFloat(weight) || 0;
    // Volume in cubic meters
    const volumeInM3 = parseFloat(volume) || 0;
    
    // Check for exact destination match first
    if (destination.includes("Sri Lanka") || destination.includes("COLOMBO")) {
      price = selectedPackage.pricing.sriLanka.price.toString();
      documentsFee = selectedPackage.pricing.sriLanka.documentsFee.toString();
    } 
    else if (destination.includes("Philippines") || destination.includes("MANILA") || destination.includes("CEBU")) {
      price = selectedPackage.pricing.philippines.price.toString();
      documentsFee = selectedPackage.pricing.philippines.documentsFee.toString();
    }
    else if (destination.includes("Kenya") && destination.includes("Mombasa")) {
      price = selectedPackage.pricing.kenya.mombasa.price.toString();
      documentsFee = selectedPackage.pricing.kenya.mombasa.documentsFee.toString();
    }
    else if (destination.includes("Kenya") && destination.includes("Nairobi")) {
      price = selectedPackage.pricing.kenya.nairobi.price.toString();
      documentsFee = selectedPackage.pricing.kenya.nairobi.documentsFee.toString();
    }
    else if (destination.includes("Eritrea") && destination.includes("Asmara")) {
      price = selectedPackage.pricing.eritrea.asmara.price.toString();
      documentsFee = selectedPackage.pricing.eritrea.asmara.documentsFee.toString();
    }
    else if (destination.includes("Eritrea") && destination.includes("Hargeisa")) {
      price = selectedPackage.pricing.eritrea.hargeisa.price.toString();
      documentsFee = selectedPackage.pricing.eritrea.hargeisa.documentsFee.toString();
    }
    else if (destination.includes("Sudan") || destination.includes("Port Sudan")) {
      price = selectedPackage.pricing.sudan.portSudan.price.toString();
      documentsFee = selectedPackage.pricing.sudan.portSudan.documentsFee.toString();
    }
    // Fall back to country-based pricing if no specific destination matches
    else if (country === "Sri Lanka") {
      price = selectedPackage.pricing.sriLanka.price.toString();
      documentsFee = selectedPackage.pricing.sriLanka.documentsFee.toString();
    }
    else if (country === "Philippines") {
      price = selectedPackage.pricing.philippines.price.toString();
      documentsFee = selectedPackage.pricing.philippines.documentsFee.toString();
    }
    else if (country === "Kenya") {
      // Default to Nairobi pricing for Kenya
      price = selectedPackage.pricing.kenya.nairobi.price.toString();
      documentsFee = selectedPackage.pricing.kenya.nairobi.documentsFee.toString();
    }
    else if (country === "Eritrea") {
      // Default to Asmara pricing for Eritrea
      price = selectedPackage.pricing.eritrea.asmara.price.toString();
      documentsFee = selectedPackage.pricing.eritrea.asmara.documentsFee.toString();
    }
    else if (country === "Sudan") {
      price = selectedPackage.pricing.sudan.portSudan.price.toString();
      documentsFee = selectedPackage.pricing.sudan.portSudan.documentsFee.toString();
    }
    else if (country === "Burundi") {
      price = selectedPackage.pricing.burundi.bujumbura.price.toString();
      documentsFee = selectedPackage.pricing.burundi.bujumbura.documentsFee.toString();
    }
    else if (country === "Algeria") {
      price = selectedPackage.pricing.algeria.algiers.price.toString();
      documentsFee = selectedPackage.pricing.algeria.algiers.documentsFee.toString();
    }
    else if (country === "Ghana") {
      price = selectedPackage.pricing.ghana.accra.price.toString();
      documentsFee = selectedPackage.pricing.ghana.accra.documentsFee.toString();
    }
    // If no country-specific pricing or fallbacks match, use legacy pricing
    else {
      price = selectedPackage.price.toString();
      documentsFee = selectedPackage.documentsFee.toString();
    }

    return { price, documentsFee };
  };
  
  // Handle selecting a package from the dropdown
  const handlePackageSelect = (description: string) => {
    // Find the package option that matches the description
    const selectedPackage = packageOptions.find(option => option.description === description);
    
    if (selectedPackage) {
      console.log("Selected package:", selectedPackage);
      
      // Get dimensions and weight based on package type
      const { length, width, height, packageWeight } = getDimensionsForPackage(description);
      
      // Calculate cubic meter based on the dimensions
      let cubicMetre = calculateCubicMeter(length, width, height);
      
      // Get country-specific pricing
      const { price, documentsFee } = getCountryBasedPricing(
        selectedPackage, 
        packageWeight, 
        cubicMetre
      );
      
      // Set the form state with the package details and pricing
      setFormState(prev => ({
        ...prev,
        packagesName: description,
        selectedPackage,
        price: price || String(selectedPackage.price),
        documentsFee: documentsFee || String(selectedPackage.documentsFee),
        length,
        width,
        height,
        packageWeight,
        cubicMetre,
        total: calculateTotal(
          price || String(selectedPackage.price), 
          documentsFee || String(selectedPackage.documentsFee)
        )
      }));
    }
  };
  
  // Handle manual package input
  const handleManualPackage = (packageName: string, price: string) => {
    setFormState(prev => ({
      ...prev,
      packagesName: packageName,
      selectedPackage: { description: packageName, price: parseFloat(price) },
      price
    }));
  };
  
  // Add a package to the list
  const handleAddPackage = () => {
    const newPackage = createPackageItemFromForm(
      uuidv4(),
      formState.packagesName,
      formState.length,
      formState.width,
      formState.height,
      formState.cubicMetre,
      formState.packageWeight,
      formState.boxNumber,
      formState.volumeWeight,
      formState.price,
      formState.documentsFee,
      calculateTotal(formState.price, formState.documentsFee)
    );
    
    setPackageItems(prev => [...prev, newPackage]);
    
    // Update the form state with the new package totals
    updateFormTotals([...packageItems, newPackage]);
    
    // Reset package form
    setFormState(prev => ({
      ...prev,
      packagesName: "",
      selectedPackage: null,
      length: "",
      width: "",
      height: "",
      cubicMetre: "",
      cubicFeet: "",
      packageWeight: "",
      boxNumber: "",
      volumeWeight: "",
      price: "",
      documentsFee: "",
      total: ""
    }));
  };
  
  // Remove a package from the list
  const handleRemovePackage = (id: string) => {
    const updatedPackages = packageItems.filter(item => item.id !== id);
    setPackageItems(updatedPackages);
    
    // Update the form state with the new package totals
    updateFormTotals(updatedPackages);
  };
  
  // Update form totals based on the package items
  const updateFormTotals = (packages: PackageItem[]) => {
    // Calculate totals from all packages
    const { totalVolume, totalWeight, totalAmount, packageCount } = calculateTotalsFromPackages(packages);
    
    setFormState(prev => ({
      ...prev,
      volume: totalVolume.toFixed(3),
      weight: totalWeight.toFixed(2),
      packages: String(packageCount),
      gross: totalAmount.toFixed(2),
      net: (totalAmount - parseFloat(prev.discount || "0")).toFixed(2)
    }));
  };
  
  // Update package pricing when country or destination changes
  const updatePackagePricingByCountry = () => {
    if (formState.selectedPackage) {
      const { price, documentsFee } = getCountryBasedPricing(
        formState.selectedPackage,
        formState.packageWeight,
        formState.cubicMetre
      );
      
      if (price) {
        setFormState(prev => ({
          ...prev,
          price,
          documentsFee,
          total: calculateTotal(price, documentsFee)
        }));
      }
    }
  };
  
  return {
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    updatePackagePricingByCountry
  };
};
