import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Eye, Printer, Plus, Settings } from "lucide-react";
import { toast } from "sonner";

// Import Sudan-specific components and data
import { useSudanInvoice } from "./hooks/useSudanInvoice";
import SudanInvoicePreview from "./components/SudanInvoicePreview";
import { sudanSectors, sudanSalesReps, sudanDrivers, sudanDistricts, sudanPorts } from "./data/sudanData";

// Remove problematic imports for now
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { calculateCubicMeter } from "@/pages/invoicing/utils/packageDimensions";
import {
  namePrefixes,
  qatarCities,
  sudanCities,
  destinationCountries,
  countryCodes
} from "./data/sudanData";
import { Checkbox } from "@/components/ui/checkbox";

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
      // Save customer details first
      const customerData = {
        mobile: formData.shipperMobile,
        name: formData.shipperName,
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
      toast.success(`Invoice ${id ? 'updated' : 'saved'} successfully`);
      navigate("/sudan");
    } catch (error) {
      console.error('Save error:', error);
      toast.error(`Failed to ${id ? 'update' : 'save'} invoice`);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    if (id) {
      navigate(`/sudan/invoice/print/${id}`);
    } else {
      toast.error("Please save the invoice first");
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
        handleFormChange('shipperName', existingCustomer.name || '');
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
              Preview
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              {id ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Invoice Form Content - Similar to Eritrea but Sudan-specific */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
              />
            </div>
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
              <Label htmlFor="jobNumber">Job Number</Label>
              <Input
                id="jobNumber"
                value={formData.jobNumber}
                onChange={(e) => handleFormChange('jobNumber', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Basic Shipping/Consignee forms would go here - simplified for now */}

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
              <Select value={formData.doorToDoor} onValueChange={(value) => handleFormChange('doorToDoor', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button onClick={() => setShowManualDialog(true)} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Manual Package
              </Button>
              <Button onClick={() => setShowSpecialDialog(true)} variant="outline" size="sm" className="ml-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Special Product
              </Button>
            </div>
            {packageItems.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Package Summary</h4>
                <p>Total Packages: {packageItems.length}</p>
                <p>Total Weight: {formData.totalWeight} kg</p>
                <p>Total Volume: {formData.totalVolume} m³</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cost Details */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="freight">Freight (QAR)</Label>
              <Input
                type="number"
                id="freight"
                value={formData.freight}
                onChange={(e) => handleFormChange('freight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="doorCharges">Door Charges (QAR)</Label>
              <Input
                type="number"
                id="doorCharges"
                value={formData.doorCharges}
                onChange={(e) => handleFormChange('doorCharges', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="totalFreight">Total Freight (QAR)</Label>
              <Input
                type="number"
                id="totalFreight"
                value={formData.totalFreight}
                onChange={(e) => handleFormChange('totalFreight', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (QAR)</Label>
              <Input
                type="number"
                id="discount"
                value={formData.discount}
                onChange={(e) => handleFormChange('discount', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="netAmount">Net Amount (QAR)</Label>
              <Input
                type="number"
                id="netAmount"
                value={formData.netAmount}
                onChange={(e) => handleFormChange('netAmount', parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select value={formData.paymentStatus} onValueChange={(value) => handleFormChange('paymentStatus', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">PAID</SelectItem>
                  <SelectItem value="UNPAID">UNPAID</SelectItem>
                </SelectContent>
              </Select>
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

        {/* Package dialogs would be implemented here */}
      </div>
    </Layout>
  );
};

export default SudanInvoiceForm;
