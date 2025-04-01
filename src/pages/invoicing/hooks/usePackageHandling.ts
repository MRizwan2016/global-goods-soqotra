
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormState, PackageItem } from "../types/invoiceForm";
import { generateNextBoxNumber } from "../utils/autoGenerators";

export const usePackageHandling = (
  formState: FormState,
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  packageItems: PackageItem[],
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>
) => {
  const [isManualPackage, setIsManualPackage] = useState(false);
  
  // Get existing box numbers from package items
  const existingBoxNumbers = packageItems.map(item => item.boxNumber);
  
  const handlePackageSelect = (description: string) => {
    const packageOption = description;
    setFormState(prev => ({
      ...prev,
      packagesName: packageOption
    }));
  };
  
  const handleManualPackage = (packageName: string, price: string) => {
    setFormState(prev => ({
      ...prev,
      packagesName: packageName,
      price: price,
      isManualPackage: true
    }));
    setIsManualPackage(true);
  };
  
  const calculateVolumeWeight = (length: string, width: string, height: string) => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    
    // Calculate volume
    const volumeCubicMeter = (l * w * h) / 1000000; // Convert cm³ to m³
    const volumeCubicFeet = volumeCubicMeter * 35.3147; // Convert m³ to ft³
    
    // Volume weight calculation standard for air freight (kg)
    const volumeWeight = (l * w * h) / 5000;
    
    return {
      cubicMetre: volumeCubicMeter.toFixed(4),
      cubicFeet: volumeCubicFeet.toFixed(4),
      volumeWeight: volumeWeight.toFixed(2),
    };
  };
  
  const calculateTotal = (price: string, weight: string, documentsFee: string) => {
    const priceValue = parseFloat(price) || 0;
    const weightValue = parseFloat(weight) || 0;
    const docFee = parseFloat(documentsFee) || 0;
    
    return (priceValue * weightValue + docFee).toFixed(2);
  };
  
  const handleAddPackage = () => {
    // Generate next box number
    const nextBoxNumber = generateNextBoxNumber(existingBoxNumbers);
    
    // Calculate volume and weight
    const volumeCalc = calculateVolumeWeight(
      formState.length, 
      formState.width, 
      formState.height
    );
    
    // Calculate chargeable weight (use higher of actual or volume weight)
    const actualWeight = parseFloat(formState.packageWeight) || 0;
    const volumeWeight = parseFloat(volumeCalc.volumeWeight) || 0;
    const chargeableWeight = Math.max(actualWeight, volumeWeight);
    
    // Calculate total price
    const total = calculateTotal(
      formState.price, 
      chargeableWeight.toString(), 
      formState.documentsFee
    );
    
    // Create package item
    const newPackage: PackageItem = {
      id: uuidv4(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: volumeCalc.cubicMetre,
      weight: formState.packageWeight,
      boxNumber: nextBoxNumber,
      volumeWeight: volumeCalc.volumeWeight,
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: total
    };
    
    // Add package to list
    setPackageItems(prev => [...prev, newPackage]);
    
    // Update total packages count
    const totalPackages = packageItems.length + 1;
    setFormState(prev => ({
      ...prev,
      packages: totalPackages.toString(),
      // Reset package form fields
      packagesName: "",
      length: "",
      width: "",
      height: "",
      cubicMetre: "",
      cubicFeet: "",
      packageWeight: "",
      boxNumber: "",
      volumeWeight: "",
      selectedPackage: null
    }));
  };
  
  const handleRemovePackage = (id: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
    
    // Update total packages count
    const totalPackages = packageItems.length - 1;
    setFormState(prev => ({
      ...prev,
      packages: Math.max(0, totalPackages).toString()
    }));
  };
  
  return {
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    isManualPackage
  };
};
