
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { mockDrivers, mockVehicles } from "./data/mockDeliveryData";

// Import components
import FormHeader from "./components/FormHeader";
import InvoiceSelector from "./components/InvoiceSelector";
import SenderInformation from "./components/SenderInformation";
import ReceiverInformation from "./components/ReceiverInformation";
import DeliveryLocation from "./components/DeliveryLocation";
import CargoDetails from "./components/CargoDetails";
import WarehouseSchedule from "./components/WarehouseSchedule";
import TransportAssignment from "./components/TransportAssignment";
import FormActions from "./components/FormActions";

// Import types
import { mockInvoiceData } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const NewDeliveryForm = () => {
  const navigate = useNavigate();
  
  // Form state
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
  
  // Kenya counties
  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu", "Machakos", "Nyeri", 
    "Kakamega", "Kilifi", "Uasin Gishu", "Turkana", "Garissa"
  ];
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormState(prev => ({
      ...prev,
      isDoorToDoor: checked
    }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Load invoice data
  const handleInvoiceSelect = (invoiceNumber: string) => {
    const selectedInvoice = mockInvoiceData.find(inv => inv.invoiceNumber === invoiceNumber);
    
    if (selectedInvoice) {
      setFormState(prev => ({
        ...prev,
        invoiceNumber: selectedInvoice.invoiceNumber,
        senderName: selectedInvoice.shipper1 || "",
        senderContact: selectedInvoice.shipperMobile || "",
        senderAddress: selectedInvoice.collectionAddress || "",
        receiverName: selectedInvoice.consignee1 || "",
        receiverContact: selectedInvoice.consigneeMobile || "",
        receiverAddress: selectedInvoice.address || "",
        weight: selectedInvoice.weight?.toString() || "",
        volume: selectedInvoice.volume?.toString() || "",
        packages: selectedInvoice.packages?.toString() || "",
        isDoorToDoor: selectedInvoice.doorToDoor === true,
      }));
    }
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
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
  
  return (
    <Layout title="Create New Delivery">
      <div className="space-y-6">
        {/* Header */}
        <FormHeader />
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Invoice Selection */}
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg">Invoice Information</CardTitle>
                <CardDescription>
                  Link this delivery to an existing invoice or create a new delivery record
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceSelector 
                  invoiceNumber={formState.invoiceNumber} 
                  onInvoiceSelect={handleInvoiceSelect} 
                />
              </CardContent>
            </Card>
            
            {/* Sender, Receiver & Location */}
            <SenderInformation 
              senderName={formState.senderName}
              senderContact={formState.senderContact}
              senderAddress={formState.senderAddress}
              onInputChange={handleInputChange}
            />
            
            <ReceiverInformation 
              receiverName={formState.receiverName}
              receiverContact={formState.receiverContact}
              receiverAddress={formState.receiverAddress}
              onInputChange={handleInputChange}
            />
            
            <DeliveryLocation 
              county={formState.county}
              district={formState.district}
              isDoorToDoor={formState.isDoorToDoor}
              counties={counties}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onCheckboxChange={handleCheckboxChange}
            />
            
            {/* Cargo, Warehouse & Transport */}
            <CargoDetails 
              weight={formState.weight}
              volume={formState.volume}
              packages={formState.packages}
              description={formState.description}
              onInputChange={handleInputChange}
            />
            
            <WarehouseSchedule 
              originWarehouse={formState.originWarehouse}
              destinationWarehouse={formState.destinationWarehouse}
              collectionDate={formState.collectionDate}
              estimatedDeliveryDate={formState.estimatedDeliveryDate}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            
            <TransportAssignment 
              driverId={formState.driverId}
              vehicleId={formState.vehicleId}
              drivers={mockDrivers}
              vehicles={mockVehicles}
              onSelectChange={handleSelectChange}
            />
          </div>
          
          {/* Form Actions */}
          <FormActions onSubmit={handleSubmit} />
        </form>
      </div>
    </Layout>
  );
};

export default NewDeliveryForm;
