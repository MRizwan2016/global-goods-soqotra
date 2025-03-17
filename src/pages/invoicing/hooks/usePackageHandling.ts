
import { useState } from "react";
import { toast } from "sonner";
import { FormState, PackageItem } from "../types/invoiceForm";

export const usePackageHandling = (formState: FormState, setFormState: React.Dispatch<React.SetStateAction<FormState>>) => {
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  
  const handlePackageSelect = (description: string) => {
    const packageOptions = require('@/data/packageOptions').packageOptions;
    const selectedPackage = packageOptions.find((pkg: any) => pkg.description === description);
    if (selectedPackage) {
      setFormState(prev => ({
        ...prev,
        packagesName: description,
        selectedPackage,
        length: String(selectedPackage.dimensions.length),
        width: String(selectedPackage.dimensions.width),
        height: String(selectedPackage.dimensions.height),
        cubicMetre: String(selectedPackage.volumeInMeters),
        price: String(selectedPackage.price),
        documentsFee: String(selectedPackage.documentsFee),
        total: String(selectedPackage.total)
      }));
    }
  };
  
  const handleAddPackage = () => {
    if (!formState.packagesName) {
      toast.error("Please select a package");
      return;
    }
    
    const newPackage = {
      id: Date.now().toString(),
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
      total: formState.total
    };
    
    setPackageItems([...packageItems, newPackage]);
    
    setFormState(prev => ({
      ...prev,
      packagesName: "",
      selectedPackage: null,
      length: "",
      width: "",
      height: "",
      cubicMetre: "",
      price: "0",
      documentsFee: "0",
      total: "0",
      packageWeight: "0",
      boxNumber: "0",
      volumeWeight: "0",
    }));
  };
  
  const handleRemovePackage = (id: string) => {
    setPackageItems(packageItems.filter(item => item.id !== id));
  };

  return {
    packageItems,
    setPackageItems,
    handlePackageSelect,
    handleAddPackage,
    handleRemovePackage
  };
};
