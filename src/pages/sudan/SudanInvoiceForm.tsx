import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Printer, Settings } from "lucide-react";
import { toast } from "sonner";

// Import Sudan-specific components and data
import { useSudanInvoice } from "./hooks/useSudanInvoice";
import SudanInvoicePreview from "./components/SudanInvoicePreview";
import { sudanSectors, sudanSalesReps, sudanDrivers, sudanDistricts, sudanPorts } from "./data/sudanData";

// Import shipping components
import ShipperDetails from "./components/shipping/ShipperDetails";
import ConsigneeDetails from "./components/shipping/ConsigneeDetails";
import SudanInvoiceNumberSelector from "./components/invoice-selector/SudanInvoiceNumberSelector";

// Import dialog components
import ManualPackageDialog from "./components/dialogs/ManualPackageDialog";
import SpecialProductDialog from "./components/dialogs/SpecialProductDialog";

// Import components needed for the form
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { 
  sudanPackageTypes,
  namePrefixes,
  qatarCities,
  sudanCities,
  destinationCountries,
  countryCodes
} from "./data/sudanData";
import { calculateCubicMeter } from "@/pages/invoicing/utils/packageDimensions";

const SudanInvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State management
  const [showPreview, setShowPreview] = useState(false);
  const [showSectorManagement, setShowSectorManagement] = useState(false);
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [showSpecialDialog, setShowSpecialDialog] = useState(false);
  
  // Custom sectors
  const [customSectors, setCustomSectors] = useState([]);
  
  // State for package input form
  const [packageInput, setPackageInput] = useState({
    name: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    quantity: '1'
  });

  // Sudan invoice hook
  const {
    formData,
    packageItems,
    handleFormChange,
    handlePackageTypeSelect,
    handlePackageInputChange,
    addPackageItem,
    addManualPackageItem,
    removePackageItem,
    updatePackageItem,
    saveInvoice,
    loadInvoice,
    setFormData,
    setPackageItems,
  } = useSudanInvoice();

  // Simplified UPB state
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState("");
  const [selectedBookNumber, setSelectedBookNumber] = useState("");
  const [isBookActivated, setIsBookActivated] = useState(false);
  const [assignedUser, setAssignedUser] = useState("");

  // Load invoice data if editing
  useEffect(() => {
    if (id) {
      const invoice = loadInvoice(id);
      if (!invoice) {
        toast.error("Invoice not found");
        navigate("/sudan");
      }
    }
  }, [id]);

  // Load custom sectors
  useEffect(() => {
    const storedSectors = localStorage.getItem('sudanCustomSectors');
    if (storedSectors) {
      setCustomSectors(JSON.parse(storedSectors));
    }
  }, []);

  // UPB Integration - Auto-fill invoice number
  useEffect(() => {
    if (selectedInvoiceNumber) {
      handleFormChange('selectedInvoiceNumber', selectedInvoiceNumber);
      handleFormChange('selectedBookNumber', selectedBookNumber);
      handleFormChange('isBookActivated', isBookActivated);
      handleFormChange('assignedUser', assignedUser);
    }
  }, [selectedInvoiceNumber, selectedBookNumber, isBookActivated, assignedUser]);

  // Event handlers
  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.invoiceNumber) {
        toast.error("Please enter an invoice number");
        return;
      }
      
      if (!formData.shipperName1) {
        toast.error("Please enter shipper name 1");
        return;
      }
      
      if (!formData.consigneeName1) {
        toast.error("Please enter consignee name 1");
        return;
      }

      // Save customer details first
      const customerData = {
        mobile: formData.shipperMobile,
        name: formData.shipperName1,
        name2: formData.shipperName2,
        prefix: formData.shipperPrefix,
        country: formData.shipperCountry,
        city: formData.shipperCity,
        address: formData.shipperAddress,
        email: formData.shipperEmail,
        idNumber: formData.shipperIdNumber,
      };

      // Store customer for auto-fill
      const existingCustomers = JSON.parse(localStorage.getItem('sudanCustomers') || '[]');
      const existingIndex = existingCustomers.findIndex(c => c.mobile === customerData.mobile);
      
      if (existingIndex !== -1) {
        existingCustomers[existingIndex] = customerData;
      } else {
        existingCustomers.push(customerData);
      }
      
      localStorage.setItem('sudanCustomers', JSON.stringify(existingCustomers));

      // Save invoice
      const invoiceId = await saveInvoice(id);
      
      // Store the current invoice ID for printing if it's a new invoice
      if (!id) {
        // Update the URL to include the new invoice ID
        window.history.replaceState({}, '', `/sudan/invoice/edit/${invoiceId}`);
      }
      
      toast.success(`Invoice ${id ? 'updated' : 'saved'} successfully`);
      
      // Don't navigate away, stay on the form for further actions
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`Failed to ${id ? 'update' : 'save'} invoice`);
    }
  };

  const handlePreview = async () => {
    // Auto-save before preview if there are changes
    try {
      if (!formData.invoiceNumber) {
        toast.error("Please enter an invoice number before preview");
        return;
      }
      
      // Save the invoice first
      const invoiceId = await saveInvoice(id);
      
      // Update the current ID if it's a new invoice
      if (!id) {
        window.history.replaceState({}, '', `/sudan/invoice/edit/${invoiceId}`);
      }
      
      // Now show preview
      setShowPreview(true);
    } catch (error) {
      toast.error("Please save the invoice first");
    }
  };

  const handlePrint = async () => {
    try {
      // Auto-save before printing
      if (!formData.invoiceNumber) {
        toast.error("Please enter an invoice number before printing");
        return;
      }
      
      const invoiceId = await saveInvoice(id);
      
      // Update URL if it's a new invoice
      if (!id) {
        window.history.replaceState({}, '', `/sudan/invoice/edit/${invoiceId}`);
      }
      
      // Open print page in new tab
      window.open(`/sudan/invoice/print/${invoiceId}`, '_blank');
    } catch (error) {
      toast.error("Failed to save invoice before printing");
    }
  };

  const handlePrintFromPreview = () => {
    setShowPreview(false);
    handlePrint();
  };

  // Auto-fill shipper details based on mobile number
  const handleMobileNumberChange = (mobile: string) => {
    handleFormChange('shipperMobile', mobile);
    
    if (mobile.length >= 8) {
      const customers = JSON.parse(localStorage.getItem('sudanCustomers') || '[]');
      const existingCustomer = customers.find(c => c.mobile === mobile);
      
      if (existingCustomer) {
        handleFormChange('shipperName1', existingCustomer.name || '');
        handleFormChange('shipperName2', existingCustomer.name2 || '');
        handleFormChange('shipperPrefix', existingCustomer.prefix || 'MR.');
        handleFormChange('shipperCountry', existingCustomer.country || 'QATAR');
        handleFormChange('shipperCity', existingCustomer.city || '');
        handleFormChange('shipperAddress', existingCustomer.address || '');
        handleFormChange('shipperEmail', existingCustomer.email || '');
        handleFormChange('shipperIdNumber', existingCustomer.idNumber || '');
        
        // Auto-fill job numbers
        const jobNumbers = JSON.parse(localStorage.getItem('sudanJobNumbers') || '[]');
        const jobsForMobile = jobNumbers.filter(j => j.mobile === mobile);
        if (jobsForMobile.length > 0) {
          const latestJob = jobsForMobile[jobsForMobile.length - 1];
          handleFormChange('jobNumber', latestJob.jobNumber);
        }
      }
    }
  };

  // Add new sector
  const handleSectorAdded = (newSector) => {
    const updatedSectors = [...customSectors, newSector];
    setCustomSectors(updatedSectors);
    localStorage.setItem('sudanCustomSectors', JSON.stringify(updatedSectors));
  };

  // Get sector pricing
  const getSectorPricing = () => {
    // Implementation for Sudan-specific pricing
    const sector = formData.sector;
    const district = formData.district;
    
    // Base pricing logic for Sudan
    let freight = 59;
    let doorCharges = 0;
    
    switch (sector) {
      case 'KASSALA':
        freight = 65;
        doorCharges = formData.doorToDoor === 'YES' ? 15 : 0;
        break;
      case 'KHARTOUM':
        freight = 70;
        doorCharges = formData.doorToDoor === 'YES' ? 20 : 0;
        break;
      case 'PORT_SUDAN':
        freight = 55;
        doorCharges = formData.doorToDoor === 'YES' ? 12 : 0;
        break;
      case 'GEDAREF':
        freight = 68;
        doorCharges = formData.doorToDoor === 'YES' ? 18 : 0;
        break;
      default:
        freight = 59;
        doorCharges = formData.doorToDoor === 'YES' ? 15 : 0;
    }
    
    return { freight, doorCharges };
  };

  // Get door to door pricing
  const getDoorToDoorPricing = () => {
    const sector = formData.sector;
    const pricing = getSectorPricing();
    
    return {
      available: true,
      charge: pricing.doorCharges
    };
  };

  return (
    <Layout title={`${id ? 'Edit' : 'Add New'} Invoice - Sudan`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/sudan")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-16 h-10 bg-gradient-to-r from-red-500 via-white to-black rounded shadow-md"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id ? 'Edit' : 'Add New'} Invoice - Sudan
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Print Preview
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Invoice
            </Button>
          </div>
        </div>

        {/* Invoice Number Selection with UPB Integration */}
        <SudanInvoiceNumberSelector
          formData={formData}
          handleFormChange={handleFormChange}
          onSalesRepChange={(rep) => handleFormChange('salesRep', rep)}
          onDriverChange={(driver) => handleFormChange('driver', driver)}
        />

        {/* Basic Details */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                type="date"
                id="invoiceDate"
                value={formData.invoiceDate}
                onChange={(e) => handleFormChange('invoiceDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="jobNumber">Job Number (Auto-filled)</Label>
              <Input
                id="jobNumber"
                value={formData.jobNumber}
                onChange={(e) => handleFormChange('jobNumber', e.target.value)}
                className={formData.jobNumber ? "bg-green-50 border-green-300" : ""}
                placeholder="Job number will auto-fill"
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipper Details */}
        <ShipperDetails
          formData={formData}
          handleFormChange={handleFormChange}
          onMobileNumberChange={handleMobileNumberChange}
        />

        {/* Consignee Details */}
        <ConsigneeDetails
          formData={formData}
          handleFormChange={handleFormChange}
        />

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="port">Port</Label>
              <Select value={formData.port} onValueChange={(value) => handleFormChange('port', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select port" />
                </SelectTrigger>
                <SelectContent>
                  {sudanPorts.map((port) => (
                    <SelectItem key={port.value} value={port.value}>
                      {port.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="warehouse">Warehouse</Label>
              <Input
                id="warehouse"
                value={formData.warehouse}
                onChange={(e) => handleFormChange('warehouse', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="sector">Sector</Label>
              <Select value={formData.sector} onValueChange={(value) => handleFormChange('sector', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {[...sudanSectors, ...customSectors].map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                  <SelectItem value="add_new_sector" className="text-blue-500">
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add New Sector
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="salesRep">Sales Rep</Label>
              <Select value={formData.salesRep} onValueChange={(value) => handleFormChange('salesRep', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sales rep" />
                </SelectTrigger>
                <SelectContent>
                  {sudanSalesReps.map((rep) => (
                    <SelectItem key={rep.value} value={rep.value}>
                      {rep.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="driver">Driver</Label>
              <Select value={formData.driver} onValueChange={(value) => handleFormChange('driver', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select driver" />
                </SelectTrigger>
                <SelectContent>
                  {sudanDrivers.map((driver) => (
                    <SelectItem key={driver.value} value={driver.value}>
                      {driver.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="district">District</Label>
              <Select value={formData.district} onValueChange={(value) => handleFormChange('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {sudanDistricts.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doorToDoor">Door to Door</Label>
              <Select value={formData.doorToDoor} onValueChange={(value) => {
                handleFormChange('doorToDoor', value);
                // Auto-calculate price when Door to Door is selected
                if (value === 'YES' && formData.totalWeight > 0) {
                  const doorCharges = getSectorPricing().doorCharges;
                  const weightBasedCharges = formData.totalWeight * 5; // Example calculation
                  const totalDoorCharges = doorCharges + weightBasedCharges;
                  handleFormChange('doorCharges', totalDoorCharges);
                  toast.success(`Door to door charges calculated: QAR ${totalDoorCharges.toFixed(2)}`);
                }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.doorToDoor === 'YES' && (
              <div>
                <Label htmlFor="doorCharges">Door to Door Charges (Auto-calculated)</Label>
                <Input
                  id="doorCharges"
                  type="number"
                  value={formData.doorCharges || 0}
                  onChange={(e) => handleFormChange('doorCharges', parseFloat(e.target.value) || 0)}
                  className="bg-green-50 border-green-300"
                  placeholder="Auto-calculated based on weight"
                />
              </div>
            )}
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Enter remarks"
                value={formData.remarks}
                onChange={(e) => handleFormChange('remarks', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Package Details - Complete Implementation */}
        <Card>
          <CardHeader className="bg-orange-500 text-white">
            <CardTitle>PACKAGE DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Package Type Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKAGE TYPE:</label>
                <Select 
                  value="" 
                  onValueChange={(value) => {
                    const packageType = sudanPackageTypes.find(p => p.name === value);
                    if (packageType) {
                      handlePackageTypeSelect(packageType);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sudanPackageTypes.map((pkg) => (
                      <SelectItem key={pkg.name} value={pkg.name}>
                        {pkg.name} ({pkg.length}×{pkg.width}×{pkg.height} cm)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowManualDialog(true)}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSpecialDialog(true)}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Special Product
                </Button>
              </div>
            </div>

            {/* Package Input Form */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <label className="text-sm font-medium">LENGTH (cm):</label>
                <Input
                  type="number"
                  value={packageInput.length || ""}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, length: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WIDTH (cm):</label>
                <Input
                  type="number"
                  value={packageInput.width || ""}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, width: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">HEIGHT (cm):</label>
                <Input
                  type="number"
                  value={packageInput.height || ""}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WEIGHT (kg):</label>
                <Input
                  type="number"
                  value={packageInput.weight || ""}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">QUANTITY:</label>
                <Input
                  type="number"
                  value={packageInput.quantity || "1"}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="1"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKAGE NAME:</label>
                <Input
                  value={packageInput.name || ""}
                  onChange={(e) => setPackageInput(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Package name"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="button"
                onClick={() => {
                  if (packageInput.length && packageInput.width && packageInput.height && packageInput.name) {
                    const length = parseFloat(packageInput.length) / 100; // cm to m
                    const width = parseFloat(packageInput.width) / 100;
                    const height = parseFloat(packageInput.height) / 100;
                    const volume = length * width * height;
                    const volumeWeight = volume * 167; // Standard calculation

                    // Create package item and add to table first (without weight)
                    const newPackage = {
                      id: `package-${Date.now()}`,
                      name: packageInput.name,
                      length: parseFloat(packageInput.length),
                      width: parseFloat(packageInput.width),
                      height: parseFloat(packageInput.height),
                      weight: 0, // Weight starts as 0, can be manually added later
                      quantity: parseInt(packageInput.quantity) || 1,
                      cubicMetre: volume,
                      cubicFeet: volume * 35.3147,
                      volumeWeight: volumeWeight,
                      isPending: true // Flag to indicate weight is pending
                    };

                    addPackageItem(newPackage);
                    setPackageInput({
                      name: '',
                      length: '',
                      width: '',
                      height: '',
                      weight: '',
                      quantity: '1'
                    });
                    toast.success("Package added to table. Please enter weight manually for calculations.");
                  } else {
                    toast.error("Please fill package name and dimensions");
                  }
                }}
                className="w-40"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Table
              </Button>
            </div>

            {/* Package Table with Weight Input */}
            {packageItems.length > 0 && (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-500 hover:bg-blue-500">
                      <TableHead className="text-white">No.</TableHead>
                      <TableHead className="text-white">PACKAGE NAME</TableHead>
                      <TableHead className="text-white">DIMENSIONS</TableHead>
                      <TableHead className="text-white">VOLUME (m³)</TableHead>
                      <TableHead className="text-white">GROSS WEIGHT (kg)</TableHead>
                      <TableHead className="text-white">QTY</TableHead>
                      <TableHead className="text-white">VOL. WEIGHT</TableHead>
                      <TableHead className="text-white">ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packageItems.map((item, index) => (
                      <TableRow key={item.id} className={item.isPending ? "bg-yellow-50" : ""}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.length}×{item.width}×{item.height} cm</TableCell>
                        <TableCell>{item.cubicMetre?.toFixed(3) || '0.000'}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.weight || ""}
                            onChange={(e) => {
                              const weight = parseFloat(e.target.value) || 0;
                              updatePackageItem(item.id, { 
                                weight, 
                                isPending: weight === 0 
                              });
                              // Auto-calculate door charges if Door to Door is YES
                              if (formData.doorToDoor === 'YES') {
                                const totalWeight = packageItems.reduce((sum, pkg) => 
                                  sum + (pkg.id === item.id ? weight : pkg.weight || 0), 0
                                );
                                const doorCharges = getSectorPricing().doorCharges + (totalWeight * 5);
                                handleFormChange('doorCharges', doorCharges);
                              }
                            }}
                            placeholder="Enter weight"
                            className={item.isPending ? "border-yellow-400 bg-yellow-50" : ""}
                          />
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.volumeWeight?.toFixed(2) || '0.00'} kg</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => removePackageItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Package Summary */}
            {packageItems.length > 0 && (
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formData.packageCount}</div>
                  <div className="text-sm text-gray-600">Total Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{formData.totalWeight.toFixed(2)} kg</div>
                  <div className="text-sm text-gray-600">Total Weight</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{formData.totalVolume.toFixed(3)} m³</div>
                  <div className="text-sm text-gray-600">Total Volume</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sudan Sector Pricing Calculator */}
        {formData.sector && (
          <Card>
            <CardHeader className="bg-green-600 text-white">
              <CardTitle>SUDAN PROJECT PRICING</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600">FREIGHT</div>
                  <div className="text-xl font-bold text-blue-600">QAR {getSectorPricing().freight.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">DOOR TO DOOR</div>
                  <div className="text-xl font-bold text-orange-600">
                    {formData.doorToDoor === 'YES' ? 'YES' : 'NO'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">DOOR CHARGE</div>
                  <div className="text-xl font-bold text-purple-600">QAR {getSectorPricing().doorCharges.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">TOTAL FREIGHT</div>
                  <div className="text-xl font-bold text-green-600">QAR {(getSectorPricing().freight + getSectorPricing().doorCharges).toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Cost Details */}
        <Card>
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle>CHARGES BREAKDOWN</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">FREIGHT:</label>
                    <Input
                      type="number"
                      value={formData.freight}
                      onChange={(e) => handleFormChange('freight', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">FREIGHT TYPE:</label>
                    <Select value={formData.freightType || "PREPAID"} onValueChange={(value) => handleFormChange('freightType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PREPAID">PREPAID</SelectItem>
                        <SelectItem value="COLLECT">COLLECT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DOOR CHARGES:</label>
                    <Input
                      type="number"
                      value={formData.doorCharges}
                      onChange={(e) => handleFormChange('doorCharges', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className={formData.doorToDoor === 'YES' ? "bg-green-50 border-green-300" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PACKING CHARGES:</label>
                    <Input
                      type="number"
                      value={formData.packingCharges || 0}
                      onChange={(e) => handleFormChange('packingCharges', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">TOTAL FREIGHT:</label>
                    <Input
                      type="number"
                      value={formData.totalFreight}
                      onChange={(e) => handleFormChange('totalFreight', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="bg-blue-50 border-blue-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">FREIGHT STATUS:</label>
                    <Select value={formData.freightStatus || "UNPAID"} onValueChange={(value) => handleFormChange('freightStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PAID">PAID</SelectItem>
                        <SelectItem value="UNPAID">UNPAID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DISCOUNT:</label>
                    <Input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Summary */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <h3 className="font-semibold text-gray-800">CHARGES SUMMARY</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>FREIGHT ({formData.freightType || 'PREPAID'}):</span>
                    <span>{formData.freight.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DOOR CHARGES:</span>
                    <span>{formData.doorCharges.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PACKING CHARGES:</span>
                    <span>{(formData.packingCharges || 0).toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TOTAL FREIGHT:</span>
                    <span>{formData.totalFreight.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DISCOUNT:</span>
                    <span>({formData.discount.toFixed(2)}) QAR</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>NET AMOUNT:</span>
                    <span className="text-green-600">{formData.netAmount.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>FREIGHT STATUS:</span>
                    <span className={formData.freightStatus === 'PAID' ? 'text-green-600' : 'text-red-600'}>
                      {formData.freightStatus || 'UNPAID'}
                    </span>
                  </div>
                </div>
                
                {/* Payment Status */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">PAYMENT STATUS:</label>
                  <Select value={formData.paymentStatus} onValueChange={(value) => handleFormChange('paymentStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PAID">PAID</SelectItem>
                      <SelectItem value="UNPAID">UNPAID</SelectItem>
                      <SelectItem value="PARTIAL">PARTIAL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Remarks */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">REMARKS:</label>
                  <Input
                    value={formData.remarks}
                    onChange={(e) => handleFormChange('remarks', e.target.value)}
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Dialogs */}
        <SudanInvoicePreview
          formData={formData}
          packageDetails={packageItems}
          shippingDetails={{}}
          costDetails={{}}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onPrint={handlePrintFromPreview}
        />

        {/* Package Entry Dialogs */}
        <ManualPackageDialog
          isOpen={showManualDialog}
          onClose={() => setShowManualDialog(false)}
          onAddPackage={addManualPackageItem}
        />
        
        <SpecialProductDialog
          isOpen={showSpecialDialog}
          onClose={() => setShowSpecialDialog(false)}
          onAddPackage={addManualPackageItem}
        />
      </div>
    </Layout>
  );
};

export default SudanInvoiceForm;
