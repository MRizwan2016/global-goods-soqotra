
import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "sonner";
import { NavigateFunction } from "react-router-dom";
import { DeliveryFormState } from "../types/deliveryForm";

export const useDeliveryForm = (navigate: NavigateFunction) => {
  const [formState, setFormState] = useState<DeliveryFormState>({
    invoiceNumber: "",
    invoiceDate: "",
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
    loadingDate: "", // New field for date of loading
    receiveDate: "", // New field for date received
    deliveryDate: "", // New field for loading for delivery date
    paymentStatus: "pending",
    paymentApproved: false,
    receivedPackages: "",
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
      toast.error("Please enter GY invoice number");
      return;
    }
    
    if (!formState.senderName) {
      toast.error("Please enter shipper name");
      return;
    }
    
    if (!formState.receiverName) {
      toast.error("Please enter consignee information");
      return;
    }

    if (!formState.packages) {
      toast.error("Please enter number of packages");
      return;
    }
    
    if (!formState.loadingDate) {
      toast.error("Please enter date of loading");
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
