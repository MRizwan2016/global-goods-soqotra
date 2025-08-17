import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, User, MapPin, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SriLankaInvoiceForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    shipperPrefix: '',
    shipperName: '',
    shipperAddress: '',
    shipperMobile: '',
    consigneePrefix: '',
    consigneeName: '',
    consigneeDistrict: '',
    consigneeProvince: '',
    consigneeAddress: '',
    deliveryAddress: '',
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

  // Prefix options
  const NAME_PREFIXES = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];

  // Mock invoice numbers (normally from Invoice Book Stock Management)
  const AVAILABLE_INVOICES = [
    'SL-001', 'SL-002', 'SL-003', 'SL-004', 'SL-005',
    'SL-006', 'SL-007', 'SL-008', 'SL-009', 'SL-010'
  ];

  // Sri Lanka Districts and Provinces
  const SRI_LANKA_DATA = {
    'Northern': ['Jaffna', 'Killinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya'],
    'North Western': ['Puttalam', 'Kurunegala'],
    'Western': ['Gampaha', 'Colombo', 'Kalutara'],
    'North Central': ['Anuradhapura', 'Polonnaruwa'],
    'Central': ['Matale', 'Kandy', 'Nuwara Eliya'],
    'Sabaragamuwa': ['Kegalle', 'Ratnapura'],
    'Eastern': ['Trincomalee', 'Batticaloa', 'Ampara'],
    'Uva': ['Badulla', 'Monaragala'],
    'Southern': ['Hambantota', 'Matara', 'Galle']
  };

  const DISTRICTS = Object.values(SRI_LANKA_DATA).flat();
  const PROVINCES = Object.keys(SRI_LANKA_DATA);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => navigate('/sri-lanka')}
              variant="outline"
              size="sm"
              className="bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sri Lanka Invoice
              </h1>
              <p className="text-gray-600">Create invoice for Sri Lanka destination</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePreview} variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          {/* Basic Information */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-t-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-800">
              <User className="h-5 w-5" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Invoice Number *</label>
                <Select value={formData.invoiceNumber} onValueChange={(value) => handleSelectChange('invoiceNumber', value)}>
                  <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Select invoice number" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {AVAILABLE_INVOICES.map(invoice => (
                      <SelectItem key={invoice} value={invoice}>{invoice}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Date *</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-white/80 border-blue-200 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Service Type *</label>
                <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                  <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {SERVICE_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-500/10 to-teal-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-800">
              <MapPin className="h-5 w-5" />
              Destination Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Destination</label>
                <Select value={formData.destination} onValueChange={(value) => handleSelectChange('destination', value)}>
                  <SelectTrigger className="bg-white/80 border-green-200 focus:border-green-400">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {formData.serviceType === 'Sea Freight' && (
                      <SelectItem value="Colombo Port">Colombo Port</SelectItem>
                    )}
                    {formData.serviceType === 'Air Freight' && (
                      <SelectItem value="Bandaranayake International Airport">Bandaranayake International Airport</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {formData.serviceType === 'Sea Freight' && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Terminal</label>
                  <Select value={formData.terminal} onValueChange={(value) => handleSelectChange('terminal', value)}>
                    <SelectTrigger className="bg-white/80 border-green-200 focus:border-green-400">
                      <SelectValue placeholder="Select terminal" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
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
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-800">
              <User className="h-5 w-5" />
              Shipper Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Prefix</label>
                <Select value={formData.shipperPrefix} onValueChange={(value) => handleSelectChange('shipperPrefix', value)}>
                  <SelectTrigger className="bg-white/80 border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {NAME_PREFIXES.map(prefix => (
                      <SelectItem key={prefix} value={prefix}>{prefix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">Shipper Name *</label>
                <Input
                  name="shipperName"
                  value={formData.shipperName}
                  onChange={handleInputChange}
                  placeholder="Enter shipper name"
                  className="bg-white/80 border-orange-200 focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Mobile Number</label>
                <Input
                  name="shipperMobile"
                  value={formData.shipperMobile}
                  onChange={handleInputChange}
                  placeholder="+974 xxxx xxxx"
                  className="bg-white/80 border-orange-200 focus:border-orange-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                <Input
                  name="shipperAddress"
                  value={formData.shipperAddress}
                  onChange={handleInputChange}
                  placeholder="Enter shipper address"
                  className="bg-white/80 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Consignee Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-800">
              <User className="h-5 w-5" />
              Consignee Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Prefix</label>
                <Select value={formData.consigneePrefix} onValueChange={(value) => handleSelectChange('consigneePrefix', value)}>
                  <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select prefix" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {NAME_PREFIXES.map(prefix => (
                      <SelectItem key={prefix} value={prefix}>{prefix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700">Consignee Name *</label>
                <Input
                  name="consigneeName"
                  value={formData.consigneeName}
                  onChange={handleInputChange}
                  placeholder="Enter consignee name"
                  className="bg-white/80 border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">District</label>
                <Select value={formData.consigneeDistrict} onValueChange={(value) => handleSelectChange('consigneeDistrict', value)}>
                  <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60 overflow-y-auto">
                    {DISTRICTS.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Province</label>
                <Select value={formData.consigneeProvince} onValueChange={(value) => handleSelectChange('consigneeProvince', value)}>
                  <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {PROVINCES.map(province => (
                      <SelectItem key={province} value={province}>{province}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Mobile Number</label>
                <Input
                  name="consigneeMobile"
                  value={formData.consigneeMobile}
                  onChange={handleInputChange}
                  placeholder="+94 xxxx xxxx"
                  className="bg-white/80 border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1 text-gray-700">Address</label>
                <Input
                  name="consigneeAddress"
                  value={formData.consigneeAddress}
                  onChange={handleInputChange}
                  placeholder="Enter consignee address"
                  className="bg-white/80 border-purple-200 focus:border-purple-400"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1 text-gray-700">Delivery Address</label>
                <Input
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Enter delivery address (if different from consignee address)"
                  className="bg-white/80 border-purple-200 focus:border-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">ID/Passport Number</label>
                <Input
                  name="consigneeId"
                  value={formData.consigneeId}
                  onChange={handleInputChange}
                  placeholder="Enter ID or passport number"
                  className="bg-white/80 border-purple-200 focus:border-purple-400"
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-teal-800">
              <Mail className="h-5 w-5" />
              Package Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Number of Packages</label>
                <Input
                  name="packages"
                  type="number"
                  value={formData.packages}
                  onChange={handleInputChange}
                  placeholder="Enter number of packages"
                  className="bg-white/80 border-teal-200 focus:border-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Weight (kg)</label>
                <Input
                  name="weight"
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kg"
                  className="bg-white/80 border-teal-200 focus:border-teal-400"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Package description"
                  className="bg-white/80 border-teal-200 focus:border-teal-400"
                />
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-yellow-800">
              <Phone className="h-5 w-5" />
              Pricing Details
            </h3>
            {formData.serviceType === 'Air Freight' && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">
                  🚀 Air Freight Rate: QAR {AIR_FREIGHT_RATE}/kg | ✈️ Documentation Fee: QAR {DOCUMENTATION_FEE}/HAWB
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Rate (QAR)</label>
                <Input
                  name="rate"
                  type="number"
                  step="0.01"
                  value={formData.rate}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Enter rate"
                  className="bg-white/80 border-yellow-200 focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Documentation Fee (QAR)</label>
                <Input
                  name="documentsFee"
                  type="number"
                  step="0.01"
                  value={formData.documentsFee}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Enter documentation fee"
                  className="bg-white/80 border-yellow-200 focus:border-yellow-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Total (QAR)</label>
                <Input
                  name="total"
                  type="number"
                  step="0.01"
                  value={formData.total}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'Air Freight'}
                  placeholder="Total amount"
                  className="font-bold bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Payment & Additional Details */}
          <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-b-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-indigo-800">
              <Phone className="h-5 w-5" />
              Payment & Additional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Payment Method</label>
                <Select value={formData.paymentMethod} onValueChange={(value) => handleSelectChange('paymentMethod', value)}>
                  <SelectTrigger className="bg-white/80 border-indigo-200 focus:border-indigo-400">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="cash">💵 Cash</SelectItem>
                    <SelectItem value="card">💳 Card</SelectItem>
                    <SelectItem value="bank_transfer">🏦 Bank Transfer</SelectItem>
                    <SelectItem value="cheque">📝 Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Remarks</label>
                <Input
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  placeholder="Additional remarks"
                  className="bg-white/80 border-indigo-200 focus:border-indigo-400"
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