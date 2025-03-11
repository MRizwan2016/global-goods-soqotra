
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

// Mock data for Bill of Lading
const mockBLData = [
  { 
    id: "1", 
    blNumber: "BL001", 
    date: "2023-05-10", 
    shipper: "Ahmed Mohammad", 
    shipperAddress: "P.O. Box 123, Doha, Qatar",
    consignee: "Sri Lankan Cargo", 
    consigneeAddress: "123 Main St, Colombo, Sri Lanka",
    notifyParty: "Sri Lankan Customs",
    notifyPartyAddress: "456 Port Road, Colombo, Sri Lanka",
    origin: "Doha", 
    destination: "Colombo",
    cargoType: "Personal Effects",
    vessel: "MSC Gülsün",
    voyageNo: "QA235",
    loadingPort: "Doha Port",
    dischargePort: "Colombo Port",
    grossWeight: "500",
    netWeight: "450",
    measurement: "3.5",
    packages: "10",
    marksAndNumbers: "SHLC001-010",
    goodsDescription: "Used household items and personal effects",
    containerNo: "MSDU1234567",
    sealNo: "SL9876543",
    status: "Shipped",
    shippingMarks: "Handle with care",
    freightCharges: "Prepaid",
    placeOfIssue: "Doha, Qatar",
    dateOfIssue: "2023-05-08",
  },
  { 
    id: "2", 
    blNumber: "BL002", 
    date: "2023-06-15", 
    shipper: "Mohammed Ali", 
    shipperAddress: "P.O. Box 456, Doha, Qatar",
    consignee: "Tunisian Cargo Services", 
    consigneeAddress: "25 Port Avenue, Tunis, Tunisia",
    notifyParty: "Tunisian Customs Authority",
    notifyPartyAddress: "12 Harbor Road, Tunis, Tunisia",
    origin: "Doha", 
    destination: "Tunis",
    cargoType: "Car",
    vessel: "CMA CGM Antoine",
    voyageNo: "QT127",
    loadingPort: "Doha Port",
    dischargePort: "Tunis Port",
    grossWeight: "1250",
    netWeight: "1150",
    measurement: "15.0",
    packages: "1",
    marksAndNumbers: "TNCS001",
    goodsDescription: "Toyota Land Cruiser 2020, White, VIN: JT3DJ81W0Y420",
    containerNo: "CMAU1987654",
    sealNo: "TN7654321",
    status: "In Transit",
    shippingMarks: "Vehicle - Fragile",
    freightCharges: "Prepaid",
    placeOfIssue: "Doha, Qatar",
    dateOfIssue: "2023-06-10",
  },
];

const BillOfLadingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const existingBL = isEditing 
    ? mockBLData.find(bl => bl.id === id) 
    : null;
    
  const [formState, setFormState] = useState({
    blNumber: existingBL?.blNumber || "",
    date: existingBL?.date || "",
    shipper: existingBL?.shipper || "",
    shipperAddress: existingBL?.shipperAddress || "",
    consignee: existingBL?.consignee || "",
    consigneeAddress: existingBL?.consigneeAddress || "",
    notifyParty: existingBL?.notifyParty || "",
    notifyPartyAddress: existingBL?.notifyPartyAddress || "",
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
  });

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
    
    console.log("Saving Bill of Lading:", formState);
    toast.success("Bill of Lading saved successfully");
    
    navigate("/data-entry/bill-of-lading");
  };
  
  return (
    <Layout title={isEditing ? "Update Bill of Lading" : "Create Bill of Lading"}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">
            {isEditing ? "Update Bill of Lading" : "Create New Bill of Lading"}
          </h3>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">BL NUMBER:</label>
              <Input 
                name="blNumber"
                value={formState.blNumber}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">DATE:</label>
              <Input 
                type="date"
                name="date"
                value={formState.date}
                onChange={handleInputChange}
                className="border border-gray-300"
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">STATUS:</label>
              <select
                name="status"
                value={formState.status}
                onChange={handleInputChange}
                className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
              >
                <option value="Shipped">SHIPPED</option>
                <option value="In Transit">IN TRANSIT</option>
                <option value="Delivered">DELIVERED</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
              PARTIES INFORMATION
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">SHIPPER:</label>
                <Input 
                  name="shipper"
                  value={formState.shipper}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CONSIGNEE:</label>
                <Input 
                  name="consignee"
                  value={formState.consignee}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">SHIPPER ADDRESS:</label>
                <Textarea 
                  name="shipperAddress"
                  value={formState.shipperAddress}
                  onChange={handleInputChange}
                  className="border border-gray-300 min-h-[80px]"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CONSIGNEE ADDRESS:</label>
                <Textarea 
                  name="consigneeAddress"
                  value={formState.consigneeAddress}
                  onChange={handleInputChange}
                  className="border border-gray-300 min-h-[80px]"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">NOTIFY PARTY:</label>
                <Input 
                  name="notifyParty"
                  value={formState.notifyParty}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">FREIGHT CHARGES:</label>
                <select
                  name="freightCharges"
                  value={formState.freightCharges}
                  onChange={handleInputChange}
                  className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
                >
                  <option value="Prepaid">PREPAID</option>
                  <option value="Collect">COLLECT</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">NOTIFY PARTY ADDRESS:</label>
                <Textarea 
                  name="notifyPartyAddress"
                  value={formState.notifyPartyAddress}
                  onChange={handleInputChange}
                  className="border border-gray-300 min-h-[80px]"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
              SHIPPING DETAILS
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">ORIGIN:</label>
                <Input 
                  name="origin"
                  value={formState.origin}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DESTINATION:</label>
                <select
                  name="destination"
                  value={formState.destination}
                  onChange={handleInputChange}
                  className="border border-gray-300 py-2 px-3 rounded"
                >
                  <option value="">Select Destination</option>
                  {destinations.map((dest, idx) => (
                    <option key={idx} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CARGO TYPE:</label>
                <select
                  name="cargoType"
                  value={formState.cargoType}
                  onChange={handleInputChange}
                  className="bg-blue-500 text-white py-2 px-3 rounded text-sm"
                >
                  {getCargoTypes(formState.destination).map((type, idx) => (
                    <option key={idx} value={type}>{type.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">VESSEL:</label>
                <Input 
                  name="vessel"
                  value={formState.vessel}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">VOYAGE NO:</label>
                <Input 
                  name="voyageNo"
                  value={formState.voyageNo}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">LOADING PORT:</label>
                <Input 
                  name="loadingPort"
                  value={formState.loadingPort}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DISCHARGE PORT:</label>
                <Input 
                  name="dischargePort"
                  value={formState.dischargePort}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PLACE OF ISSUE:</label>
                <Input 
                  name="placeOfIssue"
                  value={formState.placeOfIssue}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">DATE OF ISSUE:</label>
                <Input 
                  type="date"
                  name="dateOfIssue"
                  value={formState.dateOfIssue}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="bg-soqotra-blue text-white py-2 px-4 font-medium">
              CARGO DETAILS
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">GROSS WEIGHT (KG):</label>
                <Input 
                  name="grossWeight"
                  value={formState.grossWeight}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">NET WEIGHT (KG):</label>
                <Input 
                  name="netWeight"
                  value={formState.netWeight}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">MEASUREMENT (CBM):</label>
                <Input 
                  name="measurement"
                  value={formState.measurement}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">PACKAGES:</label>
                <Input 
                  name="packages"
                  value={formState.packages}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">CONTAINER NO:</label>
                <Input 
                  name="containerNo"
                  value={formState.containerNo}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">SEAL NO:</label>
                <Input 
                  name="sealNo"
                  value={formState.sealNo}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">MARKS AND NUMBERS:</label>
                <Input 
                  name="marksAndNumbers"
                  value={formState.marksAndNumbers}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">SHIPPING MARKS:</label>
                <Input 
                  name="shippingMarks"
                  value={formState.shippingMarks}
                  onChange={handleInputChange}
                  className="border border-gray-300"
                />
              </div>
              
              <div className="flex flex-col md:col-span-3">
                <label className="text-sm font-medium mb-1">GOODS DESCRIPTION:</label>
                <Textarea 
                  name="goodsDescription"
                  value={formState.goodsDescription}
                  onChange={handleInputChange}
                  className="border border-gray-300 min-h-[100px]"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save
            </Button>
            <Button 
              onClick={() => navigate("/data-entry/bill-of-lading")}
              variant="outline"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BillOfLadingForm;

