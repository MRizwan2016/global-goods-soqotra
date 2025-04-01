
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormState, PackageItem } from "../types/invoiceForm";
import { packageOptions } from "@/data/packageOptions";

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
      
      // Set default price if available
      let price = formState.price;
      if (selectedPackage.price) {
        price = String(selectedPackage.price);
      }
      
      // Set dimensions based on package type
      let length = formState.length;
      let width = formState.width;
      let height = formState.height;
      let packageWeight = formState.packageWeight;
      
      // Set specific dimensions for different package types
      if (description.includes("MEDIUM")) {
        console.log("Setting medium carton box dimensions");
        if (description === "MEDIUM") {
          // Standard medium carton box
          length = "21";
          width = "21";
          height = "30";
          packageWeight = "80";
        } else {
          // Medium carton box
          length = "19";
          width = "19";
          height = "29";
          packageWeight = "70";
        }
      } else if (description.includes("SMALL")) {
        length = "19";
        width = "19";
        height = "19";
        packageWeight = "65";
      } else if (description.includes("LARGE")) {
        length = "23";
        width = "23";
        height = "23";
        packageWeight = "80";
      } else if (description.includes("EXTRA LARGE")) {
        length = "23";
        width = "23";
        height = "28";
        packageWeight = "100";
      } else if (description.includes("JUMBO")) {
        length = "24";
        width = "24";
        height = "26";
        packageWeight = "115";
      } else if (description.includes("SUPER JUMBO")) {
        length = "30";
        width = "30";
        height = "30";
        packageWeight = "135";
      } else if (description.includes("BULILIT")) {
        length = "14";
        width = "14";
        height = "12";
        packageWeight = "10";
      }
      
      // Calculate cubic meter based on the dimensions
      let cubicMetre = "";
      if (length && width && height) {
        const l = parseFloat(length);
        const w = parseFloat(width);
        const h = parseFloat(height);
        if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
          cubicMetre = ((l * w * h) / 1000000).toFixed(6);
        }
      }
      
      setFormState(prev => ({
        ...prev,
        packagesName: description,
        selectedPackage,
        price,
        length,
        width,
        height,
        packageWeight,
        cubicMetre
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
    const newPackage: PackageItem = {
      id: uuidv4(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: formState.cubicMetre,
      weight: formState.packageWeight,
      boxNumber: formState.boxNumber,
      volumeWeight: formState.volumeWeight,
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: calculateTotal(formState.price, formState.documentsFee)
    };
    
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
  
  // Helper functions
  const calculateTotal = (price: string, docFee: string): string => {
    const p = parseFloat(price || "0");
    const d = parseFloat(docFee || "0");
    return (p + d).toFixed(2);
  };
  
  const updateFormTotals = (packages: PackageItem[]) => {
    // Calculate totals from all packages
    let totalVolume = 0;
    let totalWeight = 0;
    let totalAmount = 0;
    let packageCount = packages.length;
    
    packages.forEach(pkg => {
      totalVolume += parseFloat(pkg.volume || "0");
      totalWeight += parseFloat(pkg.weight || "0");
      totalAmount += parseFloat(pkg.total || "0");
    });
    
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
