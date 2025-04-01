import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PackageItem, FormState } from "../types/invoiceForm";

interface UsePackageHandlingProps {
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  packageItems: PackageItem[];
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>;
}

// Package dimension presets for common package types
const PACKAGE_PRESETS: Record<string, { length: string; width: string; height: string }> = {
  "Medium Carton Box": { length: "50", width: "40", height: "35" },
  "Small Carton Box": { length: "30", width: "25", height: "20" },
  "Large Carton Box": { length: "60", width: "50", height: "45" },
  "Extra Large Carton Box": { length: "70", width: "60", height: "55" },
};

export const usePackageHandling = ({
  formState,
  setFormState,
  packageItems,
  setPackageItems
}: UsePackageHandlingProps) => {
  const [showManualPackageModal, setShowManualPackageModal] = useState(false);
  const [manualPackageName, setManualPackageName] = useState("");
  const [manualPackagePrice, setManualPackagePrice] = useState("");
  
  const handlePackageSelect = (packageDescription: string) => {
    const packageOption = packageDescription.split(" - ");
    const packageName = packageOption[0];
    const packagePrice = packageOption[1]?.replace(/[^0-9.]/g, "") || "0";
    
    const nextBoxNumber = (packageItems.length + 1).toString();
    
    // Set standard dimensions based on the package name if available
    const dimensions = PACKAGE_PRESETS[packageName] || { length: "", width: "", height: "" };
    
    setFormState(prev => {
      // Calculate cubic meter if dimensions are available
      let cubicMetre = "";
      if (dimensions.length && dimensions.width && dimensions.height) {
        const l = parseFloat(dimensions.length);
        const w = parseFloat(dimensions.width);
        const h = parseFloat(dimensions.height);
        cubicMetre = ((l * w * h) / 1000000).toFixed(3);
      }
      
      return {
        ...prev,
        packagesName: packageName,
        price: packagePrice,
        boxNumber: nextBoxNumber,
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        cubicMetre: cubicMetre
      };
    });
  };
  
  const handleManualPackage = (packageName: string, packagePrice: string) => {
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
  
  const handleAddPackage = () => {
    if (!formState.packagesName) {
      console.error("Package name is required");
      return;
    }
    
    const volume = calculateVolume(formState.length, formState.width, formState.height);
    const volumeWeight = calculateVolumeWeight(volume);
    
    const price = parseFloat(formState.price) || 0;
    const docFee = parseFloat(formState.documentsFee) || 0;
    const total = price + docFee;
    
    const newItem: PackageItem = {
      id: uuidv4(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: volume.toString(),
      weight: formState.packageWeight,
      boxNumber: formState.boxNumber || (packageItems.length + 1).toString(),
      volumeWeight: volumeWeight.toString(),
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: total.toString()
    };
    
    setPackageItems(prev => [...prev, newItem]);
    
    updatePackageTotals([...packageItems, newItem]);
    
    resetPackageFields();
  };
  
  const handleRemovePackage = (id: string) => {
    const updatedItems = packageItems.filter(item => item.id !== id);
    setPackageItems(updatedItems);
    
    const renumberedItems = updatedItems.map((item, index) => ({
      ...item,
      boxNumber: (index + 1).toString()
    }));
    
    setPackageItems(renumberedItems);
    
    updatePackageTotals(renumberedItems);
  };
  
  const calculateVolume = (length: string, width: string, height: string) => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    
    const volumeInCm = l * w * h;
    const volumeInM = volumeInCm / 1000000;
    
    return parseFloat(volumeInM.toFixed(6));
  };
  
  const calculateVolumeWeight = (volume: number) => {
    const volumeWeight = volume * 167;
    return parseFloat(volumeWeight.toFixed(2));
  };
  
  const updatePackageTotals = (items: PackageItem[]) => {
    const totalVolume = items.reduce((sum, item) => sum + (parseFloat(item.volume) || 0), 0);
    const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);
    const totalVolumeWeight = items.reduce((sum, item) => sum + (parseFloat(item.volumeWeight) || 0), 0);
    const totalPackages = items.length;
    
    setFormState(prev => ({
      ...prev,
      volume: totalVolume.toFixed(6),
      weight: totalWeight.toString(),
      packages: totalPackages.toString(),
    }));
  };
  
  const resetPackageFields = () => {
    setFormState(prev => ({
      ...prev,
      packagesName: "",
      length: "",
      width: "",
      height: "",
      packageWeight: "",
      boxNumber: (packageItems.length + 1).toString(),
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
