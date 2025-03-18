
import { useEffect } from "react";
import { toast } from "sonner";
import { FormState, PackageItem } from "../types/invoiceForm";
import { packageOptions, PackageOption } from "@/data/packageOptions";
import { KENYA_PRICING } from "../constants/locationData";

export const usePackageHandling = (
  formState: FormState, 
  setFormState: React.Dispatch<React.SetStateAction<FormState>>,
  packageItems: PackageItem[],
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>
) => {
  
  // Effect to handle Kenya-specific pricing when warehouse changes
  useEffect(() => {
    if (formState.country === "Kenya" && formState.warehouse && formState.packageWeight) {
      const kgRate = KENYA_PRICING[formState.warehouse as keyof typeof KENYA_PRICING] || 0;
      if (kgRate) {
        const weight = parseFloat(formState.packageWeight) || 0;
        const calculatedPrice = (weight * kgRate).toFixed(2);
        
        setFormState(prev => ({
          ...prev,
          price: calculatedPrice,
          // Add the calculated price to other payment fields
          freight: calculatedPrice,
          gross: calculatedPrice,
          total: calculatedPrice
        }));
      }
    }
  }, [formState.country, formState.warehouse, formState.packageWeight, setFormState]);
  
  // Handler for package selection from dropdown
  const handlePackageSelect = (description: string) => {
    if (!description) return;
    
    const selectedPackage = packageOptions.find((pkg: PackageOption) => pkg.description === description);
    
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
  
  // Handler for manual package name update
  const handleManualPackage = (packageName: string, price: string) => {
    if (!packageName) {
      toast.error("Please enter a package name");
      return;
    }
    
    setFormState(prev => ({
      ...prev,
      packagesName: packageName,
      selectedPackage: null,
      price: price || "0"
    }));
    
    toast.success("Package updated manually");
  };
  
  const handleAddPackage = () => {
    if (!formState.packagesName) {
      toast.error("Please select or enter a package");
      return;
    }
    
    const newPackage = {
      id: Date.now().toString(),
      name: formState.packagesName,
      length: formState.length,
      width: formState.width,
      height: formState.height,
      volume: formState.cubicMetre,
      weight: formState.packageWeight || "0",
      boxNumber: formState.boxNumber || "0",
      volumeWeight: formState.volumeWeight || "0",
      price: formState.price,
      documentsFee: formState.documentsFee,
      total: formState.total
    };
    
    setPackageItems([...packageItems, newPackage]);
    
    // Calculate totals for payment section
    const totalPrice = parseFloat(formState.price) || 0;
    const totalDocFee = parseFloat(formState.documentsFee) || 0;
    const packageTotal = totalPrice + totalDocFee;
    
    // Update payment fields
    setFormState(prev => {
      const currentFreight = parseFloat(prev.freight) || 0;
      const newFreight = currentFreight + packageTotal;
      return {
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
        // Update payment section
        freight: newFreight.toFixed(2),
        gross: newFreight.toFixed(2),
        net: newFreight.toFixed(2)
      };
    });
  };
  
  const handleRemovePackage = (id: string) => {
    const packageToRemove = packageItems.find(item => item.id === id);
    if (packageToRemove) {
      // Subtract from payment totals
      const packageTotal = parseFloat(packageToRemove.price) + parseFloat(packageToRemove.documentsFee);
      setFormState(prev => {
        const currentFreight = parseFloat(prev.freight) || 0;
        const newFreight = Math.max(0, currentFreight - packageTotal);
        return {
          ...prev,
          freight: newFreight.toFixed(2),
          gross: newFreight.toFixed(2),
          net: newFreight.toFixed(2)
        };
      });
    }
    
    setPackageItems(packageItems.filter(item => item.id !== id));
  };

  return {
    handlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage
  };
};
