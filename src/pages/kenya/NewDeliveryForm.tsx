
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowLeft, Plus, Truck, User, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import { mockDrivers, mockVehicles } from "./data/mockDeliveryData";

const NewDeliveryForm = () => {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      
      setSelectedInvoice(invoiceNumber);
      setShowInvoiceSelector(false);
      toast.success(`Invoice #${invoiceNumber} data loaded successfully`);
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-1">
            <Link to="/kenya/deliveries">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowLeft size={16} />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Delivery
            </h1>
          </div>
          <p className="text-gray-500">
            Add new cargo for delivery in Kenya - link to an existing invoice or create a new record
          </p>
        </div>
        
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
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="invoiceNumber"
                        name="invoiceNumber"
                        value={formState.invoiceNumber}
                        onChange={handleInputChange}
                        placeholder="Enter invoice number"
                        className="flex-1"
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowInvoiceSelector(true)}
                      >
                        Select Invoice
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Selector */}
                {showInvoiceSelector && (
                  <div className="mt-4 border rounded-md p-4 bg-gray-50">
                    <div className="mb-2 flex justify-between items-center">
                      <h4 className="font-medium">Select Invoice</h4>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowInvoiceSelector(false)}
                      >
                        Close
                      </Button>
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      {mockInvoiceData.map(invoice => (
                        <div 
                          key={invoice.id} 
                          className="border-b py-2 flex justify-between hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleInvoiceSelect(invoice.invoiceNumber)}
                        >
                          <div>
                            <div className="font-medium">{invoice.invoiceNumber}</div>
                            <div className="text-sm text-gray-500">
                              {invoice.consignee1} | {invoice.date}
                            </div>
                          </div>
                          <div>
                            <Button variant="ghost" size="sm">
                              Select
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Sender & Receiver */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User size={18} />
                  Sender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    name="senderName"
                    value={formState.senderName}
                    onChange={handleInputChange}
                    placeholder="Enter sender's name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="senderContact">Contact Number</Label>
                  <Input
                    id="senderContact"
                    name="senderContact"
                    value={formState.senderContact}
                    onChange={handleInputChange}
                    placeholder="Enter sender's contact number"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="senderAddress">Address</Label>
                  <Textarea
                    id="senderAddress"
                    name="senderAddress"
                    value={formState.senderAddress}
                    onChange={handleInputChange}
                    placeholder="Enter sender's address"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User size={18} />
                  Receiver Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="receiverName">Receiver Name</Label>
                  <Input
                    id="receiverName"
                    name="receiverName"
                    value={formState.receiverName}
                    onChange={handleInputChange}
                    placeholder="Enter receiver's name"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="receiverContact">Contact Number</Label>
                  <Input
                    id="receiverContact"
                    name="receiverContact"
                    value={formState.receiverContact}
                    onChange={handleInputChange}
                    placeholder="Enter receiver's contact number"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="receiverAddress">Address</Label>
                  <Textarea
                    id="receiverAddress"
                    name="receiverAddress"
                    value={formState.receiverAddress}
                    onChange={handleInputChange}
                    placeholder="Enter receiver's address"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin size={18} />
                  Delivery Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="county">County</Label>
                  <Select
                    value={formState.county} 
                    onValueChange={(value) => handleSelectChange("county", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {counties.map(county => (
                        <SelectItem key={county} value={county}>{county}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="district">District/Area</Label>
                  <Input
                    id="district"
                    name="district"
                    value={formState.district}
                    onChange={handleInputChange}
                    placeholder="Enter district or area"
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <Checkbox 
                    id="isDoorToDoor" 
                    checked={formState.isDoorToDoor}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="isDoorToDoor" className="font-normal cursor-pointer">
                    Door to Door Delivery
                  </Label>
                </div>
              </CardContent>
            </Card>
            
            {/* Cargo Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Package size={18} />
                  Cargo Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={formState.weight}
                      onChange={handleInputChange}
                      placeholder="Weight"
                      className="mt-1"
                      type="number"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="volume">Volume (m³)</Label>
                    <Input
                      id="volume"
                      name="volume"
                      value={formState.volume}
                      onChange={handleInputChange}
                      placeholder="Volume"
                      className="mt-1"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="packages">Packages</Label>
                    <Input
                      id="packages"
                      name="packages"
                      value={formState.packages}
                      onChange={handleInputChange}
                      placeholder="Packages"
                      className="mt-1"
                      type="number"
                      min="1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Cargo Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formState.description}
                    onChange={handleInputChange}
                    placeholder="Describe the cargo contents"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Warehouse & Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck size={18} />
                  Warehouse & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="originWarehouse">Origin Warehouse</Label>
                  <Select
                    value={formState.originWarehouse} 
                    onValueChange={(value) => handleSelectChange("originWarehouse", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mombasa CFS">Mombasa CFS</SelectItem>
                      <SelectItem value="Nairobi CFS">Nairobi CFS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="destinationWarehouse">Destination Warehouse</Label>
                  <Select
                    value={formState.destinationWarehouse} 
                    onValueChange={(value) => handleSelectChange("destinationWarehouse", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mombasa CFS">Mombasa CFS</SelectItem>
                      <SelectItem value="Nairobi CFS">Nairobi CFS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="collectionDate">Collection Date</Label>
                  <Input
                    id="collectionDate"
                    name="collectionDate"
                    value={formState.collectionDate}
                    onChange={handleInputChange}
                    type="date"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="estimatedDeliveryDate">Estimated Delivery Date</Label>
                  <Input
                    id="estimatedDeliveryDate"
                    name="estimatedDeliveryDate"
                    value={formState.estimatedDeliveryDate}
                    onChange={handleInputChange}
                    type="date"
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Transport Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck size={18} />
                  Transport Assignment (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="driverId">Assign Driver</Label>
                  <Select
                    value={formState.driverId} 
                    onValueChange={(value) => handleSelectChange("driverId", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">-- No Driver Selected --</SelectItem>
                      {mockDrivers
                        .filter(driver => driver.status === 'available')
                        .map(driver => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name} - {driver.licenseNumber}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="vehicleId">Assign Vehicle</Label>
                  <Select
                    value={formState.vehicleId} 
                    onValueChange={(value) => handleSelectChange("vehicleId", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">-- No Vehicle Selected --</SelectItem>
                      {mockVehicles
                        .filter(vehicle => vehicle.status === 'available')
                        .map(vehicle => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.registrationNumber} - {vehicle.type} ({vehicle.capacity})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <Link to="/kenya/deliveries">
              <Button variant="outline" type="button">Cancel</Button>
            </Link>
            <Button type="submit">Create Delivery</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewDeliveryForm;
