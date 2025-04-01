
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { mockBLData } from "./components/mockData";
import BLHeader from "./components/BLHeader";
import PartyInformation from "./components/PartyInformation";
import ShippingDetails from "./components/ShippingDetails";
import CargoDetails from "./components/CargoDetails";
import FormActions from "./components/FormActions";
import { getBillOfLadingById, saveBillOfLading } from "./services/BillOfLadingService";

const BillOfLadingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  // Get the existing record from our service
  const existingBL = isEditing ? getBillOfLadingById(id!) : null;
    
  const [formState, setFormState] = useState({
    blNumber: existingBL?.blNumber || "",
    date: existingBL?.date || "",
    shipper: existingBL?.shipper || "",
    shipperAddress: existingBL?.shipperAddress || "",
    consignee: existingBL?.consignee || "",
    consigneeAddress: existingBL?.consigneeAddress || "",
    notifyParty: existingBL?.notifyParty || "",
    notifyPartyAddress: existingBL?.notifyPartyAddress || "",
    deliveryAgent: existingBL?.deliveryAgent || "",
    origin: existingBL?.origin || "",
    destination: existingBL?.destination || "",
    cargoType: existingBL?.cargoType || "Personal Effects",
    vessel: existingBL?.vessel || "",
    voyageNo: existingBL?.voyageNo || "",
    loadingPort: existingBL?.loadingPort || "",
    dischargePort: existingBL?.dischargePort || "",
    grossWeight: existingBL?.grossWeight || "",
    netWeight: existingBL?.netWeight || "",
    measurement: existingBL?.measurement || "",
    packages: existingBL?.packages || "",
    marksAndNumbers: existingBL?.marksAndNumbers || "",
    goodsDescription: existingBL?.goodsDescription || "",
    containerNo: existingBL?.containerNo || "",
    sealNo: existingBL?.sealNo || "",
    status: existingBL?.status || "Shipped",
    shippingMarks: existingBL?.shippingMarks || "",
    freightCharges: existingBL?.freightCharges || "Prepaid",
    placeOfIssue: existingBL?.placeOfIssue || "",
    dateOfIssue: existingBL?.dateOfIssue || "",
    vehicleMake: existingBL?.vehicleMake || "",
    vehicleModel: existingBL?.vehicleModel || "",
    vehicleYear: existingBL?.vehicleYear || "",
    vehicleColor: existingBL?.vehicleColor || "",
    chassisNumber: existingBL?.chassisNumber || "",
    specialInstructions: existingBL?.specialInstructions || "",
  });

  // Use useEffect to update form state if existingBL changes (for example, if data is loaded asynchronously)
  useEffect(() => {
    if (isEditing && existingBL) {
      setFormState({
        blNumber: existingBL.blNumber || "",
        date: existingBL.date || "",
        shipper: existingBL.shipper || "",
        shipperAddress: existingBL.shipperAddress || "",
        consignee: existingBL.consignee || "",
        consigneeAddress: existingBL.consigneeAddress || "",
        notifyParty: existingBL.notifyParty || "",
        notifyPartyAddress: existingBL.notifyPartyAddress || "",
        deliveryAgent: existingBL.deliveryAgent || "",
        origin: existingBL.origin || "",
        destination: existingBL.destination || "",
        cargoType: existingBL.cargoType || "Personal Effects",
        vessel: existingBL.vessel || "",
        voyageNo: existingBL.voyageNo || "",
        loadingPort: existingBL.loadingPort || "",
        dischargePort: existingBL.dischargePort || "",
        grossWeight: existingBL.grossWeight || "",
        netWeight: existingBL.netWeight || "",
        measurement: existingBL.measurement || "",
        packages: existingBL.packages || "",
        marksAndNumbers: existingBL.marksAndNumbers || "",
        goodsDescription: existingBL.goodsDescription || "",
        containerNo: existingBL.containerNo || "",
        sealNo: existingBL.sealNo || "",
        status: existingBL.status || "Shipped",
        shippingMarks: existingBL.shippingMarks || "",
        freightCharges: existingBL.freightCharges || "Prepaid",
        placeOfIssue: existingBL.placeOfIssue || "",
        dateOfIssue: existingBL.dateOfIssue || "",
        vehicleMake: existingBL.vehicleMake || "",
        vehicleModel: existingBL.vehicleModel || "",
        vehicleYear: existingBL.vehicleYear || "",
        vehicleColor: existingBL.vehicleColor || "",
        chassisNumber: existingBL.chassisNumber || "",
        specialInstructions: existingBL.specialInstructions || "",
      });
    }
  }, [isEditing, existingBL]);

  // Destination countries
  const destinations = [
    "Colombo", 
    "Nairobi", 
    "Asmara", // Eritrea
    "Khartoum", // Sudan
    "Riyadh", // Saudi Arabia
    "Dubai", // UAE
    "Abu Dhabi", // UAE
    "Mogadishu", // Somalia
    "Tunis", // Tunisia - Added Tunisia
    "Manila", // Philippines
    "Other"
  ];

  // Define cargo types based on destination
  const getCargoTypes = (destination: string) => {
    if (destination === "Tunis") {
      return [
        "Personal Effects",
        "Household Goods",
        "Car",
        "Truck"
      ];
    }
    
    return [
      "Personal Effects",
      "Household Goods",
      "Car",
      "Truck",
      "Commercial Goods",
      "Other"
    ];
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for destination to reset cargo type when destination changes
    if (name === 'destination') {
      setFormState(prev => ({
        ...prev,
        [name]: value,
        cargoType: "Personal Effects" // Reset to default
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSave = () => {
    if (!formState.blNumber) {
      toast.error("Please enter a BL number");
      return;
    }
    
    if (!formState.date) {
      toast.error("Please enter a date");
      return;
    }
    
    if (!formState.shipper) {
      toast.error("Please enter shipper information");
      return;
    }
    
    if (!formState.consignee) {
      toast.error("Please enter consignee information");
      return;
    }
    
    try {
      const blToSave = {
        id: id || undefined,
        ...formState
      };
      
      const savedBL = saveBillOfLading(blToSave);
      console.log("Saved Bill of Lading:", savedBL);
      toast.success("Bill of Lading saved successfully");
      
      navigate("/data-entry/bill-of-lading");
    } catch (error) {
      console.error("Error saving Bill of Lading:", error);
      toast.error("Failed to save Bill of Lading");
    }
  };
  
  return (
    <Layout title={isEditing ? "Update Bill of Lading" : "Create Bill of Lading"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <BLHeader 
          formState={formState} 
          handleInputChange={handleInputChange} 
          isEditing={isEditing} 
        />
        
        <div className="p-4">
          <PartyInformation 
            formState={formState} 
            handleInputChange={handleInputChange} 
          />
          
          <ShippingDetails 
            formState={formState} 
            handleInputChange={handleInputChange} 
            destinations={destinations}
            getCargoTypes={getCargoTypes}
          />
          
          <CargoDetails 
            formState={formState} 
            handleInputChange={handleInputChange} 
          />
          
          <FormActions handleSave={handleSave} />
        </div>
      </div>
    </Layout>
  );
};

export default BillOfLadingForm;
