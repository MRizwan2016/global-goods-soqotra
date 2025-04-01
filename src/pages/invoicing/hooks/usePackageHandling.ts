
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PackageItem, FormState } from "../types/invoiceForm";

interface UsePackageHandlingProps {
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
}: UsePackageHandlingProps) => {
  const [showManualPackageModal, setShowManualPackageModal] = useState(false);
  const [manualPackageName, setManualPackageName] = useState("");
  const [manualPackagePrice, setManualPackagePrice] = useState("");
  
  // Handler to select package from options
  const handlePackageSelect = (packageDescription: string) => {
    const packageOption = packageDescription.split(" - ");
    const packageName = packageOption[0];
    const packagePrice = packageOption[1]?.replace(/[^0-9.]/g, "") || "0";
    
    // Auto-generate the next box number
    const nextBoxNumber = (packageItems.length + 1).toString();
    
    setFormState(prev => ({
      ...prev,
      packagesName: packageName,
      price: packagePrice,
      boxNumber: nextBoxNumber,
    }));
  };
  
  // Handler for manual package creation
  const handleManualPackage = (packageName: string, packagePrice: string) => {
    // Auto-generate the next box number
    const nextBoxNumber = (packageItems.length + 1).toString();
    
    setFormState(prev => ({
      ...prev,
      packagesName: packageName,
      price: packagePrice,
      boxNumber: nextBoxNumber,
    }));
    
    setManualPackageName("");
    setManualPackagePrice("");
    setShowManualPackageModal(false);
  };
  
  // Add package to list
  const handleAddPackage = () => {
    if (!formState.packagesName) {
      console.error("Package name is required");
      return;
    }
    
    const volume = calculateVolume(formState.length, formState.width, formState.height);
    const volumeWeight = calculateVolumeWeight(volume);
    
    // Calculate total for this package
    const price = parseFloat(formState.price) || 0;
    const docFee = parseFloat(formState.documentsFee) || 0;
    const total = price + docFee;
    
    // Create new package item
    const newItem: PackageItem = {
      id: uuidv4(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: volume.toString(),
      weight: formState.packageWeight,
      boxNumber: formState.boxNumber || (packageItems.length + 1).toString(), // Auto-numbered if empty
      volumeWeight: volumeWeight.toString(),
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: total.toString()
    };
    
    // Add to package items list
    setPackageItems(prev => [...prev, newItem]);
    
    // Update form state with running totals
    updatePackageTotals([...packageItems, newItem]);
    
    // Reset package input fields
    resetPackageFields();
  };
  
  // Remove package from list
  const handleRemovePackage = (id: string) => {
    const updatedItems = packageItems.filter(item => item.id !== id);
    setPackageItems(updatedItems);
    
    // Renumber boxes sequentially after removing
    const renumberedItems = updatedItems.map((item, index) => ({
      ...item,
      boxNumber: (index + 1).toString()
    }));
    
    setPackageItems(renumberedItems);
    
    // Update form state with new totals
    updatePackageTotals(renumberedItems);
  };
  
  // Calculate volume from dimensions
  const calculateVolume = (length: string, width: string, height: string) => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    
    const volumeInCm = l * w * h;
    const volumeInM = volumeInCm / 1000000; // Convert to cubic meters
    
    return parseFloat(volumeInM.toFixed(6));
  };
  
  // Calculate volume weight (for air freight)
  const calculateVolumeWeight = (volume: number) => {
    // Standard conversion: 1 cubic meter = 167 kg volumetric weight
    const volumeWeight = volume * 167;
    return parseFloat(volumeWeight.toFixed(2));
  };
  
  // Update package totals
  const updatePackageTotals = (items: PackageItem[]) => {
    // Calculate totals
    const totalVolume = items.reduce((sum, item) => sum + (parseFloat(item.volume) || 0), 0);
    const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
    const totalVolumeWeight = items.reduce((sum, item) => sum + (parseFloat(item.volumeWeight) || 0), 0);
    const totalPackages = items.length;
    
    // Update form state
    setFormState(prev => ({
      ...prev,
      volume: totalVolume.toFixed(6),
      weight: totalWeight.toString(),
      packages: totalPackages.toString(),
    }));
  };
  
  // Reset package input fields
  const resetPackageFields = () => {
    setFormState(prev => ({
      ...prev,
      packagesName: "",
      length: "",
      width: "",
      height: "",
      packageWeight: "",
      boxNumber: (packageItems.length + 1).toString(), // Set to next number
      price: "",
      documentsFee: "",
    }));
  };
  
  return {
    showManualPackageModal,
    setShowManualPackageModal,
    manualPackageName,
    setManualPackageName,
    manualPackagePrice,
    setManualPackagePrice,
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
  };
};
