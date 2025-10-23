
import { useState, useEffect } from "react";
import { PackageOption } from "@/data/packageOptions";
import { toast } from "sonner";

interface UsePackageFormProps {
  existingPackage: PackageOption | null;
  onSave: (packageData: Omit<PackageOption, "id"> | (PackageOption & { id: number })) => void;
}

export const usePackageForm = ({ existingPackage, onSave }: UsePackageFormProps) => {
  const [formState, setFormState] = useState({
    description: existingPackage?.description || "",
    length: existingPackage?.dimensions.length.toString() || "",
    width: existingPackage?.dimensions.width.toString() || "",
    height: existingPackage?.dimensions.height.toString() || "",
    weightInKg: existingPackage?.weightInKg?.toString() || "",
    // Sri Lanka (volume-based)
    sriLankaPrice: existingPackage?.pricing?.sriLanka?.price.toString() || "",
    sriLankaDocFee: existingPackage?.pricing?.sriLanka?.documentsFee.toString() || "0",
    // Philippines (volume-based)
    philippinesPrice: existingPackage?.pricing?.philippines?.price.toString() || "",
    philippinesDocFee: existingPackage?.pricing?.philippines?.documentsFee.toString() || "0",
    // Kenya (weight-based)
    kenyaMombasaPrice: existingPackage?.pricing?.kenya?.mombasa?.price.toString() || "",
    kenyaMombasaDocFee: existingPackage?.pricing?.kenya?.mombasa?.documentsFee.toString() || "35",
    kenyaNairobiPrice: existingPackage?.pricing?.kenya?.nairobi?.price.toString() || "",
    kenyaNairobiDocFee: existingPackage?.pricing?.kenya?.nairobi?.documentsFee.toString() || "35",
    // Eritrea (weight-based)
    eritreaAsmaraPrice: existingPackage?.pricing?.eritrea?.asmara?.price.toString() || "",
    eritreaAsmaraDocFee: existingPackage?.pricing?.eritrea?.asmara?.documentsFee.toString() || "40",
    eritreaHargeisaPrice: existingPackage?.pricing?.eritrea?.hargeisa?.price.toString() || "",
    eritreaHargeisaDocFee: existingPackage?.pricing?.eritrea?.hargeisa?.documentsFee.toString() || "40",
    // Sudan (weight-based)
    sudanPortSudanPrice: existingPackage?.pricing?.sudan?.portSudan?.price.toString() || "",
    sudanPortSudanDocFee: existingPackage?.pricing?.sudan?.portSudan?.documentsFee.toString() || "45",
    // Burundi (weight-based)
    burundiBujumburaPrice: existingPackage?.pricing?.burundi?.bujumbura?.price.toString() || "",
    burundiBujumburaDocFee: existingPackage?.pricing?.burundi?.bujumbura?.documentsFee.toString() || "50",
    // Algeria (weight-based)
    algeriaAlgiersPrice: existingPackage?.pricing?.algeria?.algiers?.price.toString() || "",
    algeriaAlgiersDocFee: existingPackage?.pricing?.algeria?.algiers?.documentsFee.toString() || "45",
    // Ghana (weight-based)
    ghanaAccraPrice: existingPackage?.pricing?.ghana?.accra?.price.toString() || "",
    ghanaAccraDocFee: existingPackage?.pricing?.ghana?.accra?.documentsFee.toString() || "40",
    // Legacy fields
    price: existingPackage?.price.toString() || "",
    documentsFee: existingPackage?.documentsFee.toString() || "0",
  });
  
  const [volumeInMeters, setVolumeInMeters] = useState(existingPackage?.volumeInMeters.toString() || "0");
  const [totals, setTotals] = useState({
    sriLanka: "0",
    philippines: "0",
    kenyaMombasa: "0",
    kenyaNairobi: "0",
    eritreaAsmara: "0",
    eritreaHargeisa: "0",
    sudanPortSudan: "0",
    burundiBujumbura: "0",
    algeriaAlgiers: "0",
    ghanaAccra: "0",
    legacy: existingPackage?.total.toString() || "0"
  });

  // Calculate volume in cubic meters when dimensions change
  useEffect(() => {
    const length = parseFloat(formState.length) || 0;
    const width = parseFloat(formState.width) || 0;
    const height = parseFloat(formState.height) || 0;
    
    // Convert from inches to meters and calculate volume
    const volumeInches = length * width * height;
    const volumeMeters = volumeInches * 0.000016387064; // Convert cubic inches to cubic meters
    
    setVolumeInMeters(volumeMeters.toFixed(3));
    
    // Calculate totals for each destination
    const newTotals = {
      sriLanka: (parseFloat(formState.sriLankaPrice) + parseFloat(formState.sriLankaDocFee)).toFixed(2),
      philippines: (parseFloat(formState.philippinesPrice) + parseFloat(formState.philippinesDocFee)).toFixed(2),
      kenyaMombasa: (parseFloat(formState.kenyaMombasaPrice) + parseFloat(formState.kenyaMombasaDocFee)).toFixed(2),
      kenyaNairobi: (parseFloat(formState.kenyaNairobiPrice) + parseFloat(formState.kenyaNairobiDocFee)).toFixed(2),
      eritreaAsmara: (parseFloat(formState.eritreaAsmaraPrice) + parseFloat(formState.eritreaAsmaraDocFee)).toFixed(2),
      eritreaHargeisa: (parseFloat(formState.eritreaHargeisaPrice) + parseFloat(formState.eritreaHargeisaDocFee)).toFixed(2),
      sudanPortSudan: (parseFloat(formState.sudanPortSudanPrice) + parseFloat(formState.sudanPortSudanDocFee)).toFixed(2),
      burundiBujumbura: (parseFloat(formState.burundiBujumburaPrice) + parseFloat(formState.burundiBujumburaDocFee)).toFixed(2),
      algeriaAlgiers: (parseFloat(formState.algeriaAlgiersPrice) + parseFloat(formState.algeriaAlgiersDocFee)).toFixed(2),
      ghanaAccra: (parseFloat(formState.ghanaAccraPrice) + parseFloat(formState.ghanaAccraDocFee)).toFixed(2),
      legacy: (parseFloat(formState.price) + parseFloat(formState.documentsFee)).toFixed(2)
    };
    
    setTotals(newTotals);
  }, [formState]);

  // Update Kenya and other weight-based prices when weight changes
  useEffect(() => {
    if (formState.weightInKg) {
      const weight = parseFloat(formState.weightInKg);
      if (!isNaN(weight)) {
        // Apply weight-based pricing if no manual values have been set
        if (!formState.kenyaMombasaPrice) {
          const price = (weight * 7.5).toFixed(2);
          setFormState(prev => ({...prev, kenyaMombasaPrice: price}));
        }
        if (!formState.kenyaNairobiPrice) {
          const price = (weight * 8.2).toFixed(2);
          setFormState(prev => ({...prev, kenyaNairobiPrice: price}));
        }
        if (!formState.eritreaAsmaraPrice) {
          const price = (weight * 9.5).toFixed(2);
          setFormState(prev => ({...prev, eritreaAsmaraPrice: price}));
        }
        if (!formState.eritreaHargeisaPrice) {
          const price = (weight * 8.7).toFixed(2);
          setFormState(prev => ({...prev, eritreaHargeisaPrice: price}));
        }
        if (!formState.sudanPortSudanPrice) {
          const price = (weight * 10.2).toFixed(2);
          setFormState(prev => ({...prev, sudanPortSudanPrice: price}));
        }
        if (!formState.burundiBujumburaPrice) {
          const price = (weight * 11.5).toFixed(2);
          setFormState(prev => ({...prev, burundiBujumburaPrice: price}));
        }
        if (!formState.algeriaAlgiersPrice) {
          const price = (weight * 10.8).toFixed(2);
          setFormState(prev => ({...prev, algeriaAlgiersPrice: price}));
        }
        if (!formState.ghanaAccraPrice) {
          const price = (weight * 9.2).toFixed(2);
          setFormState(prev => ({...prev, ghanaAccraPrice: price}));
        }
      }
    }
  }, [formState.weightInKg]);

  // When volume changes, update Sri Lanka and Philippines prices (volume-based)
  useEffect(() => {
    const volume = parseFloat(volumeInMeters);
    if (!isNaN(volume)) {
      // Calculate Sri Lanka price if not manually set (365 per cubic meter)
      if (!formState.sriLankaPrice) {
        const price = (volume * 365).toFixed(2);
        const docFee = volume > 1 ? "50.00" : "0.00";
        setFormState(prev => ({
          ...prev, 
          sriLankaPrice: price,
          sriLankaDocFee: docFee
        }));
      }

      // Calculate Philippines price if not manually set (328 per cubic meter, 10% cheaper)
      if (!formState.philippinesPrice) {
        const price = (volume * 328.5).toFixed(2);
        const docFee = volume > 1 ? "45.00" : "0.00";
        setFormState(prev => ({
          ...prev, 
          philippinesPrice: price,
          philippinesDocFee: docFee
        }));
      }

      // Update legacy price for backward compatibility
      if (!formState.price) {
        setFormState(prev => ({
          ...prev,
          price: (volume * 365).toFixed(2),
          documentsFee: volume > 1 ? "50.00" : "0.00"
        }));
      }
    }
  }, [volumeInMeters]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // Validation
    if (!formState.description) {
      toast.error("Description is required");
      return;
    }
    
    if (!formState.length || !formState.width || !formState.height) {
      toast.error("All dimensions are required");
      return;
    }
    
    if (!formState.weightInKg) {
      toast.error("Weight is required");
      return;
    }
    
    // Create new package object with the enhanced structure
    const newPackage: Omit<PackageOption, "id"> = {
      description: formState.description,
      dimensions: {
        length: parseFloat(formState.length),
        width: parseFloat(formState.width),
        height: parseFloat(formState.height),
      },
      volumeInMeters: parseFloat(volumeInMeters),
      weightInKg: parseFloat(formState.weightInKg),
      pricing: {
        sriLanka: {
          price: parseFloat(formState.sriLankaPrice) || 0,
          documentsFee: parseFloat(formState.sriLankaDocFee) || 0,
          isVolumeBasedPricing: true as const
        },
        philippines: {
          price: parseFloat(formState.philippinesPrice) || 0,
          documentsFee: parseFloat(formState.philippinesDocFee) || 0,
          isVolumeBasedPricing: true as const
        },
        kenya: {
          mombasa: {
            price: parseFloat(formState.kenyaMombasaPrice) || 0,
            documentsFee: parseFloat(formState.kenyaMombasaDocFee) || 0,
            isVolumeBasedPricing: false as const
          },
          nairobi: {
            price: parseFloat(formState.kenyaNairobiPrice) || 0,
            documentsFee: parseFloat(formState.kenyaNairobiDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        },
        eritrea: {
          asmara: {
            price: parseFloat(formState.eritreaAsmaraPrice) || 0,
            documentsFee: parseFloat(formState.eritreaAsmaraDocFee) || 0,
            isVolumeBasedPricing: false as const
          },
          hargeisa: {
            price: parseFloat(formState.eritreaHargeisaPrice) || 0,
            documentsFee: parseFloat(formState.eritreaHargeisaDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        },
        sudan: {
          portSudan: {
            price: parseFloat(formState.sudanPortSudanPrice) || 0,
            documentsFee: parseFloat(formState.sudanPortSudanDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        },
        burundi: {
          bujumbura: {
            price: parseFloat(formState.burundiBujumburaPrice) || 0,
            documentsFee: parseFloat(formState.burundiBujumburaDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        },
        algeria: {
          algiers: {
            price: parseFloat(formState.algeriaAlgiersPrice) || 0,
            documentsFee: parseFloat(formState.algeriaAlgiersDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        },
        ghana: {
          accra: {
            price: parseFloat(formState.ghanaAccraPrice) || 0,
            documentsFee: parseFloat(formState.ghanaAccraDocFee) || 0,
            isVolumeBasedPricing: false as const
          }
        }
      },
      // Legacy fields for backward compatibility
      price: parseFloat(formState.price) || 0,
      documentsFee: parseFloat(formState.documentsFee) || 0,
      total: parseFloat(totals.legacy)
    };
    
    if (existingPackage?.id) {
      onSave({ id: existingPackage.id, ...newPackage });
    } else {
      onSave(newPackage);
    }
  };

  return {
    formState,
    volumeInMeters,
    totals,
    handleInputChange,
    handleSave
  };
};
