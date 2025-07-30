import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Save, Eye, Printer, Trash2, FileText } from "lucide-react";
import EritreaInvoicePreview from "./components/EritreaInvoicePreview";
import { useInvoiceNumberSelector } from "../invoicing/hooks/useInvoiceNumberSelector";
import InvoiceNumberSelector from "../invoicing/components/basic-information/InvoiceNumberSelector";
import UPBIntegrationCard from "@/components/invoice/UPBIntegrationCard";
import { useEritreaInvoice, EritreaFormData } from "./hooks/useEritreaInvoice";
import ShipperDetails from "./components/shipping/ShipperDetails";
import ConsigneeDetails from "./components/shipping/ConsigneeDetails";
import { 
  eritreaPorts, 
  eritreaSectors, 
  eritreaSalesReps, 
  eritreaDrivers, 
  eritreaDistricts,
  eritreaPackageTypes,
  doorToDoorPricing,
  eritreaSectorPricing 
} from "./data/eritreaData";
import SectorManagement from "./components/SectorManagement";
import { toast } from "sonner";
import { CustomerDetailsService } from "@/services/CustomerDetailsService";
import { JobNumberService } from "@/services/JobNumberService";

const EritreaInvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [availableSectors, setAvailableSectors] = useState(eritreaSectors);
  const [showSectorManagement, setShowSectorManagement] = useState(false);
  const [associatedJobNumber, setAssociatedJobNumber] = useState("");

  // Use the enhanced Eritrea invoice hook
  const {
    formData,
    packageItems,
    selectedPackageType,
    packageInput,
    handleFormChange,
    handlePackageTypeSelect,
    handlePackageInputChange,
    addPackageItem,
    removePackageItem,
    saveInvoice,
    loadInvoice
  } = useEritreaInvoice(id);

  // Load invoice data if editing
  useEffect(() => {
    if (id) {
      loadInvoice(id);
    }
  }, [id]);

  // Invoice number selector hook for UPB integration
  const handleSelectInvoice = (invoiceNumber: string) => {
    handleFormChange('invoiceNumber', invoiceNumber);
  };
  
  const {
    activeInvoiceUser,
    isDuplicate,
    availableInvoiceList,
    filteredInvoiceList,
    showManualEntry,
    manualInvoiceNumber,
    selectedBookNumber,
    setManualInvoiceNumber,
    setShowManualEntry,
    setSelectedBookNumber,
    onInvoiceSelect,
    handleManualSubmit,
    loadAvailableInvoices,
    handleBookSelect,
    bookActivationStatus,
    driverName,
    bookAssignedUser
  } = useInvoiceNumberSelector({
    formState: { invoiceNumber: formData.invoiceNumber },
    isEditing: !!id,
    handleSelectInvoice
  });

  const handleGoBack = () => {
    navigate("/eritrea");
  };

  const handleSave = async () => {
    // Store customer details before saving
    if (formData.shipperMobile && formData.shipperName) {
      const customerDetails = {
        mobileNumber: formData.shipperMobile,
        shipperPrefix: formData.shipperPrefix,
        shipperName: formData.shipperName,
        shipperCity: formData.shipperCity,
        shipperAddress: formData.shipperAddress,
        shipperEmail: formData.shipperEmail,
        shipperIdNumber: formData.shipperIdNumber,
        shipperCountry: formData.shipperCountry,
        consigneePrefix: formData.consigneePrefix,
        consigneeName: formData.consigneeName,
        consigneeCity: formData.consigneeCity,
        consigneeAddress: formData.consigneeAddress,
        consigneeMobile: formData.consigneeMobile,
        consigneeEmail: formData.consigneeEmail,
        consigneeIdNumber: formData.consigneeIdNumber,
        consigneeCountry: formData.consigneeCountry,
        jobNumber: associatedJobNumber,
        lastUsed: new Date().toISOString()
      };
      CustomerDetailsService.storeCustomerDetails(customerDetails);
    }

    const success = await saveInvoice();
    if (success) {
      navigate("/eritrea");
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    if (id) {
      navigate(`/eritrea/invoice/print/${id}`);
    } else {
      toast.error("Please save the invoice first to print");
    }
  };

  const handlePrintFromPreview = () => {
    setShowPreview(false);
    handlePrint();
  };

  // Load custom sectors from localStorage
  React.useEffect(() => {
    const savedSectors = localStorage.getItem('eritreaCustomSectors');
    if (savedSectors) {
      const customSectors = JSON.parse(savedSectors);
      setAvailableSectors([...eritreaSectors, ...customSectors]);
    }
  }, []);

  // Handle new sector addition
  const handleSectorAdded = (newSector: any) => {
    setAvailableSectors(prev => [...prev, newSector]);
  };

  // Handle mobile number change with auto-fill
  const handleMobileNumberChange = (field: keyof EritreaFormData, value: string) => {
    handleFormChange(field, value);
    
    if (field === 'shipperMobile' && value.length >= 8) {
      // Try to find existing customer details
      const customerDetails = CustomerDetailsService.getCustomerDetailsByMobile(value);
      if (customerDetails) {
        // Auto-fill shipper details
        handleFormChange('shipperName', customerDetails.shipperName);
        handleFormChange('shipperAddress', customerDetails.shipperAddress);
        handleFormChange('shipperCity', customerDetails.shipperCity);
        handleFormChange('shipperEmail', customerDetails.shipperEmail);
        handleFormChange('shipperIdNumber', customerDetails.shipperIdNumber);
        handleFormChange('shipperCountry', customerDetails.shipperCountry);
        
        // Auto-fill consignee details
        handleFormChange('consigneeName', customerDetails.consigneeName);
        handleFormChange('consigneeAddress', customerDetails.consigneeAddress);
        handleFormChange('consigneeCity', customerDetails.consigneeCity);
        handleFormChange('consigneeMobile', customerDetails.consigneeMobile);
        handleFormChange('consigneeEmail', customerDetails.consigneeEmail);
        handleFormChange('consigneeIdNumber', customerDetails.consigneeIdNumber);
        handleFormChange('consigneeCountry', customerDetails.consigneeCountry);
        
        // Try to get associated job number
        const jobNumber = JobNumberService.getJobNumberByMobile(value);
        if (jobNumber) {
          setAssociatedJobNumber(jobNumber);
          toast.success(`Auto-filled details for mobile ${value}. Job Number: ${jobNumber}`);
        } else {
          toast.success(`Auto-filled details for mobile ${value}`);
        }
      } else {
        // Look for job number even if no customer details found
        const jobNumber = JobNumberService.getJobNumberByMobile(value);
        if (jobNumber) {
          setAssociatedJobNumber(jobNumber);
          toast.info(`Found Job Number: ${jobNumber} for mobile ${value}`);
        } else {
          setAssociatedJobNumber("");
        }
      }
    }
  };

  // Calculate pricing using new Eritrea sector pricing system
  const getSectorPricing = () => {
    if (formData.sector) {
      // Check custom pricing first
      const customPricing = JSON.parse(localStorage.getItem('eritreaSectorPricing') || '{}');
      const sectorPricing = customPricing[formData.sector] || eritreaSectorPricing[formData.sector as keyof typeof eritreaSectorPricing];
      
      if (sectorPricing) {
        const freightPerKg = sectorPricing.freightPerKg;
        const doorCharge = formData.doorToDoor === "YES" && sectorPricing.doorToDoor.available 
          ? sectorPricing.doorToDoor.charge 
          : 0;
        const totalFreight = freightPerKg + doorCharge;
        
        return {
          freightPerKg,
          doorCharge,
          totalFreight,
          doorAvailable: sectorPricing.doorToDoor.available
        };
      }
    }
    return {
      freightPerKg: 11.00,
      doorCharge: 0,
      totalFreight: 11.00,
      doorAvailable: false
    };
  };

  // Legacy door-to-door pricing display for compatibility
  const getDoorToDoorPricing = () => {
    const pricing = getSectorPricing();
    if (formData.doorToDoor === "YES" && pricing.doorAvailable) {
      return `${pricing.doorCharge.toFixed(2)} QAR`;
    }
    return pricing.doorAvailable ? "Available" : "Not Available";
  };

  return (
    <Layout title={`${id ? 'Edit' : 'Add New'} Invoice - Eritrea`}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-red-500 rounded"></div>
              <h1 className="text-3xl font-bold text-gray-900">
                {id ? 'Edit' : 'Add New'} Invoice - Eritrea
              </h1>
            </div>
          </div>
        </div>

        {/* Basic Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Port Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">PORT:</label>
                <Select value={formData.port} onValueChange={(value) => handleFormChange('port', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Port" />
                  </SelectTrigger>
                  <SelectContent>
                    {eritreaPorts.map(port => (
                      <SelectItem key={port.value} value={port.value}>
                        {port.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sector Selection */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">SECTOR:</label>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowSectorManagement(!showSectorManagement)}
                  >
                    {showSectorManagement ? 'Hide' : 'Manage'} Sectors
                  </Button>
                </div>
                <Select value={formData.sector} onValueChange={(value) => handleFormChange('sector', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSectors.map(sector => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sales Representative */}
              <div className="space-y-2">
                <label className="text-sm font-medium">SALES REPRESENTATIVE:</label>
                <Select value={formData.salesRep} onValueChange={(value) => handleFormChange('salesRep', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sales Rep" />
                  </SelectTrigger>
                  <SelectContent>
                    {eritreaSalesReps.map(rep => (
                      <SelectItem key={rep.value} value={rep.value}>
                        {rep.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Driver */}
              <div className="space-y-2">
                <label className="text-sm font-medium">DRIVER:</label>
                <Select value={formData.driver} onValueChange={(value) => handleFormChange('driver', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {eritreaDrivers.map(driver => (
                      <SelectItem key={driver.value} value={driver.value}>
                        {driver.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-medium">DISTRICT:</label>
                <Select value={formData.district} onValueChange={(value) => handleFormChange('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {eritreaDistricts.map(district => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Door to Door */}
              <div className="space-y-2">
                <label className="text-sm font-medium">DOOR TO DOOR:</label>
                <Select value={formData.doorToDoor} onValueChange={(value) => handleFormChange('doorToDoor', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NO">NO</SelectItem>
                    <SelectItem value="YES">YES</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Door to Door Price Display */}
              {formData.doorToDoor === "YES" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">DOOR TO DOOR PRICE:</label>
                  <Input 
                    value={getDoorToDoorPricing()}
                    readOnly
                    className="bg-green-50"
                  />
                </div>
              )}

              {/* Invoice Number */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">INVOICE NUMBER (UPB INTEGRATED):</label>
                <InvoiceNumberSelector
                  formState={{ invoiceNumber: formData.invoiceNumber }}
                  handleInputChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
                  showInvoiceSelector={true}
                  setShowInvoiceSelector={() => {}}
                  availableInvoices={availableInvoiceList}
                  handleSelectInvoice={handleSelectInvoice}
                  isEditing={!!id}
                />
              </div>

              {/* Invoice Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">INVOICE DATE:</label>
                <Input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => handleFormChange('invoiceDate', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UPB Integration Status Card */}
        {formData.invoiceNumber && (
          <Card>
            <CardContent className="pt-6">
              <UPBIntegrationCard
                activationStatus={bookActivationStatus}
                userName={bookAssignedUser}
                driverName={driverName}
                invoiceNumber={formData.invoiceNumber}
              />
            </CardContent>
          </Card>
        )}

        {/* Package Details */}
        <Card>
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle>PACKAGE DETAILS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Package Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">PACKAGE TYPE:</label>
                <Select value={selectedPackageType} onValueChange={handlePackageTypeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Package Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eritreaPackageTypes.map((pkg, index) => (
                      <SelectItem key={index} value={pkg.name}>
                        {pkg.name} ({pkg.dimensions.length}x{pkg.dimensions.width}x{pkg.dimensions.height} - {pkg.volume}m³)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Package Input Fields */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKAGE NAME:</label>
                <Input 
                  value={packageInput.name}
                  onChange={(e) => handlePackageInputChange('name', e.target.value)}
                  placeholder="Package name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LENGTH (cm):</label>
                <Input 
                  type="number"
                  value={packageInput.length}
                  onChange={(e) => handlePackageInputChange('length', e.target.value)}
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WIDTH (cm):</label>
                <Input 
                  type="number"
                  value={packageInput.width}
                  onChange={(e) => handlePackageInputChange('width', e.target.value)}
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">HEIGHT (cm):</label>
                <Input 
                  type="number"
                  value={packageInput.height}
                  onChange={(e) => handlePackageInputChange('height', e.target.value)}
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WEIGHT (kg):</label>
                <Input 
                  type="number"
                  value={packageInput.weight}
                  onChange={(e) => handlePackageInputChange('weight', e.target.value)}
                  placeholder="0" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">QUANTITY:</label>
                <Input 
                  type="number"
                  value={packageInput.quantity}
                  onChange={(e) => handlePackageInputChange('quantity', e.target.value)}
                  placeholder="1" 
                />
              </div>
            </div>
            
            <Button onClick={addPackageItem} className="gap-2">
              <Plus className="h-4 w-4" />
              Insert Package
            </Button>
            
            {/* Package Items Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white">No.</TableHead>
                    <TableHead className="text-white">PACKAGE</TableHead>
                    <TableHead className="text-white">DIMENSIONS</TableHead>
                    <TableHead className="text-white">VOLUME (m³)</TableHead>
                    <TableHead className="text-white">WEIGHT (kg)</TableHead>
                    <TableHead className="text-white">QTY</TableHead>
                    <TableHead className="text-white">VOL. WEIGHT</TableHead>
                    <TableHead className="text-white">ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packageItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.length}×{item.width}×{item.height} cm</TableCell>
                      <TableCell>{item.cubicMetre.toFixed(3)}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.volumeWeight.toFixed(2)} kg</TableCell>
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
                  {packageItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                        No packages added yet. Use the form above to add packages.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Package Summary */}
            {packageItems.length > 0 && (
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formData.totalPackages}</div>
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

        {/* Associated Job Number Display */}
        {associatedJobNumber && (
          <Card className="border-green-500 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Associated Job Number:</span>
                </div>
                <div className="text-lg font-bold text-green-600">{associatedJobNumber}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Shipper & Consignee Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ShipperDetails 
            formData={formData} 
            handleFormChange={handleMobileNumberChange} 
          />
          <ConsigneeDetails 
            formData={formData} 
            handleFormChange={handleFormChange} 
          />
        </div>

        {/* Eritrea Sector Pricing Calculator */}
        {formData.sector && (
          <Card>
            <CardHeader className="bg-green-600 text-white">
              <CardTitle>ERITREA PROJECT PRICING</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600">FREIGHT PER KG</div>
                  <div className="text-xl font-bold text-blue-600">QAR {getSectorPricing().freightPerKg.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">DOOR TO DOOR</div>
                  <div className="text-xl font-bold text-orange-600">
                    {getSectorPricing().doorAvailable ? 'YES' : 'NO'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">DOOR CHARGE</div>
                  <div className="text-xl font-bold text-purple-600">QAR {getSectorPricing().doorCharge.toFixed(2)}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">TOTAL FREIGHT</div>
                  <div className="text-xl font-bold text-green-600">QAR {getSectorPricing().totalFreight.toFixed(2)}</div>
                </div>
              </div>
              {!getSectorPricing().doorAvailable && formData.doorToDoor === "YES" && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">
                    ⚠️ Door to Door service is not available for {formData.sector} sector
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Cost Details */}
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
                    <label className="text-sm font-medium">DOCUMENTS FEE:</label>
                    <Input
                      type="number"
                      value={formData.documentsFee}
                      onChange={(e) => handleFormChange('documentsFee', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">LOCAL TRANSPORT:</label>
                    <Input
                      type="number"
                      value={formData.localTransport}
                      onChange={(e) => handleFormChange('localTransport', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DESTINATION TRANSPORT:</label>
                    <Input
                      type="number"
                      value={formData.destinationTransport}
                      onChange={(e) => handleFormChange('destinationTransport', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PACKING:</label>
                    <Input
                      type="number"
                      value={formData.packing}
                      onChange={(e) => handleFormChange('packing', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">STORAGE:</label>
                    <Input
                      type="number"
                      value={formData.storage}
                      onChange={(e) => handleFormChange('storage', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DESTINATION CLEARING:</label>
                    <Input
                      type="number"
                      value={formData.destinationClearing}
                      onChange={(e) => handleFormChange('destinationClearing', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">DOOR DELIVERY:</label>
                    <Input
                      type="number"
                      value={formData.destinationDoorDelivery}
                      onChange={(e) => handleFormChange('destinationDoorDelivery', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      readOnly={formData.doorToDoor === "YES"}
                      className={formData.doorToDoor === "YES" ? "bg-green-50" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">OTHER:</label>
                    <Input
                      type="number"
                      value={formData.other}
                      onChange={(e) => handleFormChange('other', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
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
              
              <div className="space-y-4">
                {/* Totals */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">GROSS TOTAL:</span>
                    <span className="text-lg font-bold">{formData.gross.toFixed(2)} QAR</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">DISCOUNT:</span>
                    <span className="text-lg font-bold text-red-600">-{formData.discount.toFixed(2)} QAR</span>
                  </div>
                  <hr className="border-gray-300" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">NET TOTAL:</span>
                    <span className="text-2xl font-bold text-green-600">{formData.net.toFixed(2)} QAR</span>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">GIFT CARGO:</label>
                    <Select value={formData.giftCargo} onValueChange={(value) => handleFormChange('giftCargo', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NO">NO</SelectItem>
                        <SelectItem value="YES">YES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PRE PAID:</label>
                    <Select value={formData.prePaid} onValueChange={(value) => handleFormChange('prePaid', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NO">NO</SelectItem>
                        <SelectItem value="YES">YES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">FREIGHT BY:</label>
                    <Select value={formData.freightBy} onValueChange={(value) => handleFormChange('freightBy', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SEA">SEA</SelectItem>
                        <SelectItem value="AIR">AIR</SelectItem>
                        <SelectItem value="LAND">LAND</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">PAYMENT STATUS:</label>
                    <Select value={formData.paymentStatus} onValueChange={(value) => handleFormChange('paymentStatus', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UNPAID">UNPAID</SelectItem>
                        <SelectItem value="PAID">PAID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">REMARKS:</label>
                    <Textarea
                      value={formData.remarks}
                      onChange={(e) => handleFormChange('remarks', e.target.value)}
                      placeholder="Enter remarks"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sector Management */}
        {showSectorManagement && (
          <Card>
            <CardHeader>
              <CardTitle>Sector Management</CardTitle>
            </CardHeader>
            <CardContent>
              <SectorManagement onSectorAdded={handleSectorAdded} />
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to List
          </Button>
          
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handlePrint} variant="outline" className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleSave} className="gap-2 bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4" />
              {id ? 'Update' : 'Save'} Invoice
            </Button>
          </div>
        </div>
      </div>

      <EritreaInvoicePreview
        formData={formData}
        packageDetails={packageItems}
        shippingDetails={{
          shipper1: formData.shipperName,
          shipper2: "",
          mobile: formData.shipperMobile,
          email: formData.shipperEmail,
          consignee1: formData.consigneeName,
          consignee2: "",
          consigneeAddress: formData.consigneeAddress,
          consigneeMobile: formData.consigneeMobile,
          consigneeEmail: formData.consigneeEmail
        }}
        costDetails={{
          freight: formData.freight.toString(),
          discount: formData.discount.toString(),
          net: formData.net.toString()
        }}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onPrint={handlePrintFromPreview}
      />
    </Layout>
  );
};

export default EritreaInvoiceForm;