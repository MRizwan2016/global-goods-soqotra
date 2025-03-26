
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { VesselFormData } from "../types/vesselTypes";
import { DEFAULT_PORT_OF_LOADING, generateRunningNumber } from "../constants/vesselData";
import { mockVesselData } from "../mockVesselData";

export function useVesselForm(onVesselCreated: () => void) {
  // Extract existing running numbers for auto-generation
  const existingRunningNumbers = mockVesselData.map(v => v.runningNumber);
  
  const [formData, setFormData] = useState<VesselFormData>({
    id: uuidv4(),
    runningNumber: generateRunningNumber(existingRunningNumbers),
    vesselName: "",
    voyage: "",
    portOfLoading: DEFAULT_PORT_OF_LOADING,
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
    
    // Show success message with animation
    toast.success(`Vessel ${formData.vesselName} created successfully`, {
      style: { backgroundColor: "#10B981", color: "white" }
    });
    
    // Call callback
    onVesselCreated();
  };

  return {
    formData,
    existingRunningNumbers,
    handleInputChange,
    handleSelectChange,
    handleSubmit
  };
}
