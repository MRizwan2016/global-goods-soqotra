import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Save, Eye, Printer, Trash2 } from "lucide-react";
import SudanInvoicePreview from "./components/SudanInvoicePreview";
import { toast } from "sonner";

const SudanInvoiceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    port: 'PORT_SUDAN',
    sector: 'KASSALA',
    shipperCountry: 'QATAR',
    paymentStatus: 'UNPAID'
  });

  const [shippingDetails, setShippingDetails] = useState({
    shipper1: '',
    shipper2: '',
    town: '',
    mobile: '',
    consignee1: '',
    consignee2: '',
    consigneeAddress: '',
    consigneeTown: '',
    consigneeMobile: '',
    consigneePassportNic: ''
  });

  const [packageItems, setPackageItems] = useState([]);
  const [packageInput, setPackageInput] = useState({
    name: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    quantity: '1'
  });

  const [costDetails, setCostDetails] = useState({
    freight: '59.00',
    discount: '0.00',
    net: '59.00'
  });

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    setShippingDetails(prev => ({ ...prev, [field]: value }));
  };

  const handlePackageInputChange = (field, value) => {
    setPackageInput(prev => ({ ...prev, [field]: value }));
  };

  const addPackageItem = () => {
    if (!packageInput.name || !packageInput.length || !packageInput.width || !packageInput.height) {
      toast.error("Please fill all package details");
      return;
    }

    const length = parseFloat(packageInput.length) / 100; // cm to m
    const width = parseFloat(packageInput.width) / 100;
    const height = parseFloat(packageInput.height) / 100;
    const volume = length * width * height;

    const newItem = {
      id: Date.now(),
      name: packageInput.name,
      length: packageInput.length,
      width: packageInput.width,
      height: packageInput.height,
      weight: packageInput.weight || '0',
      quantity: packageInput.quantity || '1',
      cubicMetre: volume.toFixed(3)
    };

    setPackageItems(prev => [...prev, newItem]);
    setPackageInput({
      name: '',
      length: '',
      width: '',
      height: '',
      weight: '',
      quantity: '1'
    });
  };

  const removePackageItem = (id) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotals = () => {
    const totalWeight = packageItems.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0);
    const totalVolume = packageItems.reduce((sum, item) => sum + parseFloat(item.cubicMetre || 0), 0);
    return { totalWeight: totalWeight.toFixed(2), totalVolume: totalVolume.toFixed(3) };
  };

  const handleSave = async () => {
    if (!formData.invoiceNumber) {
      toast.error("Please enter an invoice number");
      return;
    }

    const invoiceData = {
      id: id || Date.now().toString(),
      formData,
      shippingDetails,
      packageDetails: packageItems,
      costDetails,
      ...calculateTotals(),
      createdAt: new Date().toISOString()
    };

    try {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      
      if (id) {
        const index = existingInvoices.findIndex(inv => inv.id === id);
        if (index !== -1) {
          existingInvoices[index] = invoiceData;
        }
      } else {
        existingInvoices.push(invoiceData);
      }

      localStorage.setItem('sudanInvoices', JSON.stringify(existingInvoices));
      toast.success("Invoice saved successfully");
      navigate("/sudan");
    } catch (error) {
      toast.error("Failed to save invoice");
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handlePrint = () => {
    if (id) {
      navigate(`/sudan/invoice/print/${id}`);
    } else {
      toast.error("Please save the invoice first to print");
    }
  };

  // Load invoice if editing
  useEffect(() => {
    if (id) {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      const invoice = existingInvoices.find(inv => inv.id === id);
      if (invoice) {
        setFormData(invoice.formData || {});
        setShippingDetails(invoice.shippingDetails || {});
        setPackageItems(invoice.packageDetails || []);
        setCostDetails(invoice.costDetails || {});
      }
    }
  }, [id]);

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
              <div className="w-12 h-8 bg-gradient-to-r from-red-500 via-white to-black rounded"></div>
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
              Save
            </Button>
          </div>
        </div>

        {/* Basic Invoice Details */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Invoice Number:</label>
                <Input
                  value={formData.invoiceNumber}
                  onChange={(e) => handleFormChange('invoiceNumber', e.target.value)}
                  placeholder="Enter invoice number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Invoice Date:</label>
                <Input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) => handleFormChange('invoiceDate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Status:</label>
                <Select value={formData.paymentStatus} onValueChange={(value) => handleFormChange('paymentStatus', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAID">PAID</SelectItem>
                    <SelectItem value="UNPAID">UNPAID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Details */}
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Shipper Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    placeholder="Shipper Name 1"
                    value={shippingDetails.shipper1}
                    onChange={(e) => handleShippingChange('shipper1', e.target.value)}
                  />
                  <Input
                    placeholder="Shipper Name 2"
                    value={shippingDetails.shipper2}
                    onChange={(e) => handleShippingChange('shipper2', e.target.value)}
                  />
                  <Input
                    placeholder="Town/City"
                    value={shippingDetails.town}
                    onChange={(e) => handleShippingChange('town', e.target.value)}
                  />
                  <Input
                    placeholder="Mobile Number"
                    value={shippingDetails.mobile}
                    onChange={(e) => handleShippingChange('mobile', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Consignee Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    placeholder="Consignee Name 1"
                    value={shippingDetails.consignee1}
                    onChange={(e) => handleShippingChange('consignee1', e.target.value)}
                  />
                  <Input
                    placeholder="Consignee Name 2"
                    value={shippingDetails.consignee2}
                    onChange={(e) => handleShippingChange('consignee2', e.target.value)}
                  />
                  <Input
                    placeholder="Address"
                    value={shippingDetails.consigneeAddress}
                    onChange={(e) => handleShippingChange('consigneeAddress', e.target.value)}
                  />
                  <Input
                    placeholder="Town/City"
                    value={shippingDetails.consigneeTown}
                    onChange={(e) => handleShippingChange('consigneeTown', e.target.value)}
                  />
                  <Input
                    placeholder="Mobile Number"
                    value={shippingDetails.consigneeMobile}
                    onChange={(e) => handleShippingChange('consigneeMobile', e.target.value)}
                  />
                  <Input
                    placeholder="ID/Passport Number"
                    value={shippingDetails.consigneePassportNic}
                    onChange={(e) => handleShippingChange('consigneePassportNic', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Input 
                placeholder="Package name"
                value={packageInput.name}
                onChange={(e) => handlePackageInputChange('name', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Length (cm)"
                value={packageInput.length}
                onChange={(e) => handlePackageInputChange('length', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Width (cm)"
                value={packageInput.width}
                onChange={(e) => handlePackageInputChange('width', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Height (cm)"
                value={packageInput.height}
                onChange={(e) => handlePackageInputChange('height', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Weight (kg)"
                value={packageInput.weight}
                onChange={(e) => handlePackageInputChange('weight', e.target.value)}
              />
              <Input 
                type="number"
                placeholder="Quantity"
                value={packageInput.quantity}
                onChange={(e) => handlePackageInputChange('quantity', e.target.value)}
              />
            </div>
            
            <Button onClick={addPackageItem} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Package
            </Button>
            
            {packageItems.length > 0 && (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package</TableHead>
                      <TableHead>Dimensions (cm)</TableHead>
                      <TableHead>Volume (m³)</TableHead>
                      <TableHead>Weight (kg)</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packageItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.length}×{item.width}×{item.height}</TableCell>
                        <TableCell>{item.cubicMetre}</TableCell>
                        <TableCell>{item.weight}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
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
          </CardContent>
        </Card>

        {/* Cost Details */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Freight (QAR):</label>
                <Input
                  type="number"
                  value={costDetails.freight}
                  onChange={(e) => setCostDetails(prev => ({ ...prev, freight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount (QAR):</label>
                <Input
                  type="number"
                  value={costDetails.discount}
                  onChange={(e) => setCostDetails(prev => ({ ...prev, discount: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Net Amount (QAR):</label>
                <Input
                  type="number"
                  value={costDetails.net}
                  onChange={(e) => setCostDetails(prev => ({ ...prev, net: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Modal */}
      <SudanInvoicePreview
        formData={formData}
        packageDetails={packageItems}
        shippingDetails={shippingDetails}
        costDetails={costDetails}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onPrint={handlePrint}
      />
    </Layout>
  );
};

export default SudanInvoiceForm;