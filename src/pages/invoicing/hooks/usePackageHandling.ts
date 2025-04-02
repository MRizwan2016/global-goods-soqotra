
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
  
  // Handle selecting a package from the dropdown
  const handlePackageSelect = (description: string) => {
    // Find the package option that matches the description
    const selectedPackage = packageOptions.find(option => option.description === description);
    
    if (selectedPackage) {
      console.log("Selected package:", selectedPackage);
      
      // Get dimensions and price based on package type
      const { length, width, height, packageWeight, price } = getDimensionsForPackage(description);
      
      // Calculate cubic meter based on the dimensions
      let cubicMetre = calculateCubicMeter(length, width, height);
      
      // Calculate price based on destination if applicable
      const destination = formState.destination || "";
      const { price: destinationPrice, documentsFee } = calculatePriceByDestination(cubicMetre, destination);
      
      // Use destination-specific price if available, otherwise use standard price
      const finalPrice = destinationPrice || price || String(selectedPackage.price);
      const finalDocFee = documentsFee || formState.documentsFee || "0";
      
      setFormState(prev => ({
        ...prev,
        packagesName: description,
        selectedPackage,
        price: finalPrice,
        documentsFee: finalDocFee,
        length,
        width,
        height,
        packageWeight,
        cubicMetre,
        total: calculateTotal(finalPrice, finalDocFee)
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
  
  return {
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage
  };
};
