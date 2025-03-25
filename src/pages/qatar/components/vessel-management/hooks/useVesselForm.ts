
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { VesselFormData } from "../types/vesselTypes";

export function useVesselForm(onVesselCreated: () => void) {
  const [formData, setFormData] = useState<VesselFormData>({
    id: uuidv4(),
    runningNumber: "",
    vesselName: "",
    voyage: "",
    portOfLoading: "",
    portOfDischarge: "",
    shippingLine: "",
    direction: "MIX",
    masterBL: "",
    etd: "",
    eta: "",
    sector: "COLOMBO"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.runningNumber || !formData.vesselName || !formData.voyage) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would save to an API
    console.log("Saving vessel:", formData);
    
    // Show success message
    toast.success(`Vessel ${formData.vesselName} created successfully`);
    
    // Call callback
    onVesselCreated();
  };

  return {
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  };
}
