
import { useState, useEffect } from "react";
import { cityVehicleMapping } from "../data/cityVehicleMapping";
import { toast } from "sonner";

export const useSchedulePrintForm = (
  selectedVehicle: string | null,
  selectedCity: string | null
) => {
  // Form data for the schedule
  const [formData, setFormData] = useState({
    scheduleNumber: Math.floor(Math.random() * 10000).toString(),
    vehicle: selectedVehicle || "",
    salesRep: "",
    driver: "",
    helper: "",
    scheduleDate: new Date().toISOString().split('T')[0],
    city: selectedCity || ""
  });

  // Update form data when vehicle or city selection changes
  useEffect(() => {
    if (selectedVehicle) {
      setFormData(prev => ({
        ...prev,
        vehicle: selectedVehicle,
        city: ""
      }));
    } else if (selectedCity) {
      const recommendedVehicles = cityVehicleMapping[selectedCity] || [];
      setFormData(prev => ({
        ...prev,
        city: selectedCity,
        vehicle: recommendedVehicles.length > 0 ? recommendedVehicles[0] : prev.vehicle
      }));
    }
  }, [selectedVehicle, selectedCity]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.vehicle) {
      toast.error("Please select a vehicle before printing");
      return false;
    }
    if (!formData.driver) {
      toast.warning("Driver information is missing");
    }
    if (!formData.salesRep) {
      toast.warning("Sales Rep information is missing");
    }
    return true;
  };

  const handlePrint = () => {
    if (validateForm()) {
      window.print();
    }
  };

  return {
    formData,
    setFormData,
    handleFormChange,
    handleSelectChange,
    handlePrint,
  };
};
