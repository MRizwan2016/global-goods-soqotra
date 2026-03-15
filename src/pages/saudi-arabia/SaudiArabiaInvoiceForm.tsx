import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Save, Eye, Printer, Trash2 } from "lucide-react";
import SaudiArabiaInvoicePreview from "./components/SaudiArabiaInvoicePreview";
import { useInvoiceNumberSelector } from "../invoicing/hooks/useInvoiceNumberSelector";
import InvoiceNumberSelector from "../invoicing/components/basic-information/InvoiceNumberSelector";
import UPBIntegrationCard from "@/components/invoice/UPBIntegrationCard";
import { useSaudiArabiaInvoice } from "./hooks/useSaudiArabiaInvoice";
import { lookupJobData } from "@/hooks/useJobAutoFill";
import { supabase } from "@/integrations/supabase/client";
import ShipperDetails from "./components/shipping/ShipperDetails";
import ConsigneeDetails from "./components/shipping/ConsigneeDetails";
import { 
  saudiArabiaPorts, 
  saudiArabiaSectors, 
  saudiArabiaSalesReps, 
  saudiArabiaDrivers, 
  saudiArabiaDistricts,
  saudiArabiaPackageTypes,
  doorToDoorPricing 
} from "./data/saudiArabiaData";
import { toast } from "sonner";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const SaudiArabiaInvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [dbBooks, setDbBooks] = useState<any[]>([]);

  // Load Saudi Arabia invoice books from database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('invoice_books')
          .select('*')
          .eq('country', 'Saudi Arabia')
          .in('status', ['available', 'assigned']);
        if (!error && data) setDbBooks(data);
      } catch (err) {
        console.error('Error loading SA books:', err);
      }
    };
    fetchBooks();
  }, []);

  // Use the enhanced Saudi Arabia invoice hook
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
  } = useSaudiArabiaInvoice(id);

  // Job number auto-fill handler
  const handleJobNumberChange = useCallback(async (value: string) => {
    handleFormChange('jobNumber', value);
    if (value.length >= 3) {
      const result = await lookupJobData(value, dbBooks);
      if (result) {
        // Map to Saudi Arabia form fields
        if (result.shipperName) handleFormChange('shipperName', result.shipperName);
        if (result.shipperMobile) handleFormChange('shipperMobile', result.shipperMobile);
        if (result.shipperCity) handleFormChange('shipperCity', result.shipperCity);
        if (result.shipperAddress) handleFormChange('shipperAddress', result.shipperAddress);
        if (result.consigneeName) handleFormChange('consigneeName', result.consigneeName);
        if (result.consigneeMobile) handleFormChange('consigneeMobile', result.consigneeMobile);
        if (result.driverName) handleFormChange('driver', result.driverName);
        if (result.salesRepresentative) handleFormChange('salesRep', result.salesRepresentative);
        if (result.invoiceNumber) handleFormChange('invoiceNumber', result.invoiceNumber);
        if (result.bookNumber) handleFormChange('bookNumber', result.bookNumber);
        if (result.description) handleFormChange('remarks', result.description);
        
        const { toast } = await import('sonner');
        toast.success('Job details auto-filled');
      }
    }
  }, [dbBooks, handleFormChange]);

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
    navigate("/saudi-arabia");
  };

  const handleSave = async () => {
    const success = await saveInvoice();
    if (success) {
      navigate("/saudi-arabia");
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    if (id) {
      navigate(`/saudi-arabia/invoice/print/${id}`);
    } else {
      toast.error("Please save the invoice first to print");
    }
  };

  const handlePrintFromPreview = () => {
    setShowPreview(false);
    handlePrint();
  };

  // Calculate door-to-door pricing display
  const getDoorToDoorPricing = () => {
    if (formData.doorToDoor === "YES" && formData.sector) {
      const pricing = doorToDoorPricing[formData.sector as keyof typeof doorToDoorPricing];
      return pricing ? `${pricing.price} ${pricing.currency}` : "Not Available";
    }
    return "N/A";
  };

  return (
    <Layout title={`${id ? 'Edit' : 'Add New'} Invoice - Saudi Arabia`}>
      <PageBreadcrumb className="mb-4" />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <div className="flex items-center gap-4">
               <div className="w-12 h-8 bg-gradient-to-r from-[#3b5998] to-[#1e2a3a] rounded"></div>
              <h1 className="text-3xl font-bold text-[#1e2a3a]">
                {id ? 'Edit' : 'Add New'} Invoice - Saudi Arabia
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
                    {saudiArabiaPorts.map(port => (
                      <SelectItem key={port.value} value={port.value}>
                        {port.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sector Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">SECTOR:</label>
                <Select value={formData.sector} onValueChange={(value) => handleFormChange('sector', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {saudiArabiaSectors.map(sector => (
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
                    {saudiArabiaSalesReps.map(rep => (
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
                    {saudiArabiaDrivers.map(driver => (
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
                    {saudiArabiaDistricts.map(district => (
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

              {/* Job Number with Auto-fill */}
              <div className="space-y-2">
                <label className="text-sm font-medium">JOB NUMBER:</label>
                <Input
                  value={formData.jobNumber}
                  onChange={(e) => handleJobNumberChange(e.target.value)}
                  placeholder="Enter job number to auto-fill"
                  className="border-orange-300 focus:border-orange-500"
                />
                <p className="text-xs text-muted-foreground">Type a job number to auto-fill shipper, driver, sales rep & more</p>
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

        {/* Shipper Details */}
        <ShipperDetails 
          formData={formData}
          handleFormChange={handleFormChange}
        />

        {/* Consignee Details */}
        <ConsigneeDetails 
          formData={formData}
          handleFormChange={handleFormChange}
        />

        {/* Package Details */}
        <Card>
          <CardHeader className="bg-[#1e2a3a] text-white">
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
                    {saudiArabiaPackageTypes.map((pkg, index) => (
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
                  <TableRow className="bg-[#1e2a3a] hover:bg-[#1e2a3a]">
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
                  <div className="text-2xl font-bold text-[#3b5998]">{formData.totalPackages}</div>
                  <div className="text-sm text-gray-600">Total Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#5a7ab5]">{formData.totalWeight.toFixed(2)} kg</div>
                  <div className="text-sm text-gray-600">Total Weight</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#7b9acc]">{formData.totalVolume.toFixed(3)} m³</div>
                  <div className="text-sm text-gray-600">Total Volume</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Costs Details */}
        <Card>
          <CardHeader className="bg-[#3b5998] text-white">
            <CardTitle>COSTS & PRICING</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">FREIGHT (QAR):</label>
                <Input 
                  type="number"
                  value={formData.freight}
                  onChange={(e) => handleFormChange('freight', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DOCUMENTS FEE (QAR):</label>
                <Input 
                  type="number"
                  value={formData.documentsFee}
                  onChange={(e) => handleFormChange('documentsFee', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">PACKING (QAR):</label>
                <Input 
                  type="number"
                  value={formData.packing}
                  onChange={(e) => handleFormChange('packing', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">TRANSPORTATION (QAR):</label>
                <Input 
                  type="number"
                  value={formData.destinationTransport}
                  onChange={(e) => handleFormChange('destinationTransport', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">DISCOUNT (QAR):</label>
                <Input 
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleFormChange('discount', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Totals Display */}
            <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3b5998]">{formData.gross.toFixed(2)} QAR</div>
                <div className="text-sm text-gray-600">Gross Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">-{formData.discount.toFixed(2)} QAR</div>
                <div className="text-sm text-gray-600">Discount</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#1e2a3a]">{formData.net.toFixed(2)} QAR</div>
                <div className="text-sm text-gray-600">Net Total</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>ADDITIONAL DETAILS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <label className="text-sm font-medium">PRE-PAID:</label>
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

              <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-medium">REMARKS:</label>
                <Textarea 
                  value={formData.remarks}
                  onChange={(e) => handleFormChange('remarks', e.target.value)}
                  placeholder="Enter any additional remarks..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={handleGoBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={handlePreview}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handlePrint}
                  className="gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                
                <Button 
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  {id ? 'Update' : 'Save'} Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Modal */}
        <SaudiArabiaInvoicePreview
          formData={formData}
          packageDetails={packageItems}
          shippingDetails={{
            shipper1: formData.shipperName,
            consignee1: formData.consigneeName,
            shipperMobile: formData.shipperMobile,
            consigneeMobile: formData.consigneeMobile
          }}
          costDetails={{
            freight: formData.freight,
            discount: formData.discount,
            net: formData.net
          }}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onPrint={handlePrintFromPreview}
        />
      </div>
    </Layout>
  );
};

export default SaudiArabiaInvoiceForm;