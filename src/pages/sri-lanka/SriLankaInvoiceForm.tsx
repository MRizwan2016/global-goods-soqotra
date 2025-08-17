import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SriLankaInvoiceForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    shipperName: '',
    shipperAddress: '',
    shipperMobile: '',
    consigneeName: '',
    consigneeAddress: '',
    consigneeMobile: '',
    consigneeId: '',
    serviceType: '',
    destination: '',
    terminal: '',
    packages: '',
    weight: '',
    description: '',
    rate: '',
    documentsFee: '25',
    total: '',
    paymentMethod: '',
    remarks: ''
  });

  // Sri Lanka specific data
  const SERVICE_TYPES = ['Sea Freight', 'Air Freight'];
  const SEA_TERMINALS = ['JCT Terminal', 'ICIC Terminal', 'P&O Terminal', 'Hambanthota Terminal'];
  const AIR_DESTINATIONS = ['Bandaranayake International Airport'];
  
  // Pricing rates
  const AIR_FREIGHT_RATE = 10; // QAR 10/kg
  const DOCUMENTATION_FEE = 25; // QAR 25/HAWB

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-calculate total for air freight
      if (name === 'weight' && updated.serviceType === 'Air Freight') {
        const weight = parseFloat(value) || 0;
        const rate = AIR_FREIGHT_RATE * weight;
        const total = rate + DOCUMENTATION_FEE;
        updated.rate = rate.toString();
        updated.total = total.toString();
      }
      
      return updated;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Set default values based on service type
      if (name === 'serviceType') {
        if (value === 'Air Freight') {
          updated.destination = 'Bandaranayake International Airport';
          updated.terminal = '';
          updated.documentsFee = DOCUMENTATION_FEE.toString();
          // Calculate rate if weight is available
          if (updated.weight) {
            const weight = parseFloat(updated.weight);
            const rate = AIR_FREIGHT_RATE * weight;
            updated.rate = rate.toString();
            updated.total = (rate + DOCUMENTATION_FEE).toString();
          }
        } else if (value === 'Sea Freight') {
          updated.destination = 'Colombo Port';
          updated.terminal = '';
          updated.rate = '';
          updated.total = '';
        }
      }
      
      return updated;
    });
  };

  const handleSave = () => {
    if (!formData.invoiceNumber || !formData.shipperName || !formData.consigneeName) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Save functionality would go here
    toast.success('Invoice saved successfully');
    console.log('Saving invoice:', formData);
  };

  const handlePreview = () => {
    // Preview functionality would go here
    console.log('Preview invoice:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/sri-lanka')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sri Lanka Invoice</h1>
              <p className="text-gray-600">Create invoice for Sri Lanka destination</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          {/* Basic Information */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Invoice Number *</label>
                <Input
                  name="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={handleInputChange}
                  placeholder="Enter invoice number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date *</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Service Type *</label>
                <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Destination Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Destination</label>
                <Input
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder={formData.serviceType === 'Sea Freight' ? 'Colombo Port' : ''}
                />
              </div>
              {formData.serviceType === 'Sea Freight' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Terminal</label>
                  <Select value={formData.terminal} onValueChange={(value) => handleSelectChange('terminal', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select terminal" />
                    </SelectTrigger>
                    <SelectContent>
                      {SEA_TERMINALS.map(terminal => (
                        <SelectItem key={terminal} value={terminal}>{terminal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Shipper Details */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Shipper Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Shipper Name *</label>
                <Input
                  name="shipperName"
                  value={formData.shipperName}
                  onChange={handleInputChange}
                  placeholder="Enter shipper name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                <Input
                  name="shipperMobile"
                  value={formData.shipperMobile}
                  onChange={handleInputChange}
                  placeholder="+974 xxxx xxxx"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  name="shipperAddress"
                  value={formData.shipperAddress}
                  onChange={handleInputChange}
                  placeholder="Enter shipper address"
                />
              </div>
            </div>
          </div>

          {/* Consignee Details */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Consignee Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Consignee Name *</label>
                <Input
                  name="consigneeName"
                  value={formData.consigneeName}
                  onChange={handleInputChange}
                  placeholder="Enter consignee name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number</label>
                <Input
                  name="consigneeMobile"
                  value={formData.consigneeMobile}
                  onChange={handleInputChange}
                  placeholder="+94 xxxx xxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ID/Passport Number</label>
                <Input
                  name="consigneeId"
                  value={formData.consigneeId}
                  onChange={handleInputChange}
                  placeholder="Enter ID or passport number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  name="consigneeAddress"
                  value={formData.consigneeAddress}
                  onChange={handleInputChange}
                  placeholder="Enter consignee address"
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Package Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Number of Packages</label>
                <Input
                  name="packages"
                  type="number"
                  value={formData.packages}
                  onChange={handleInputChange}
                  placeholder="Enter number of packages"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <Input
                  name="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kg"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Package description"
                />
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg mb-4">Pricing Details</h3>
            {formData.serviceType === 'Air Freight' && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  Air Freight Rate: QAR {AIR_FREIGHT_RATE}/kg | Documentation Fee: QAR {DOCUMENTATION_FEE}/HAWB
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rate (QAR)</label>
                <Input
                  name="rate"
                  type="number"
                  step="0.01"
                  value={formData.rate}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Enter rate"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Documentation Fee (QAR)</label>
                <Input
                  name="documentsFee"
                  type="number"
                  step="0.01"
                  value={formData.documentsFee}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Enter documentation fee"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Total (QAR)</label>
                <Input
                  name="total"
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Total amount"
                  className="font-bold"
                />
              </div>
            </div>
          </div>

          {/* Payment & Additional Details */}
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4">Payment & Additional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Method</label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cheque">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Remarks</label>
                <Input
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Additional remarks"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaInvoiceForm;