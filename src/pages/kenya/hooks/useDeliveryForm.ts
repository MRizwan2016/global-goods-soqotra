
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";

export const useDeliveryForm = (navigate: NavigateFunction) => {
  const [formState, setFormState] = useState({
    invoiceNumber: "",
    senderName: "",
    senderContact: "",
    senderAddress: "",
    receiverName: "",
    receiverContact: "",
    receiverAddress: "",
    county: "Nairobi",
    district: "",
    originWarehouse: "Mombasa CFS",
    destinationWarehouse: "Nairobi CFS",
    isDoorToDoor: true,
    weight: "",
    volume: "",
    packages: "",
    description: "",
    collectionDate: "",
    estimatedDeliveryDate: "",
    driverId: "",
    vehicleId: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormState(prev => ({
      ...prev,
      isDoorToDoor: checked
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    if (!formState.receiverName || !formState.receiverContact || !formState.receiverAddress) {
      toast.error("Please enter receiver information");
      return;
    }
    
    if (!formState.county || !formState.district) {
      toast.error("Please select a county and district");
      return;
    }
    
    if (!formState.collectionDate || !formState.estimatedDeliveryDate) {
      toast.error("Please enter collection and estimated delivery dates");
      return;
    }
    
    // Success case
    toast.success("Delivery successfully created");
    navigate("/kenya/deliveries");
  };

  return {
    formState,
    handleInputChange,
    handleCheckboxChange,
    handleSelectChange,
    handleSubmit
  };
};
