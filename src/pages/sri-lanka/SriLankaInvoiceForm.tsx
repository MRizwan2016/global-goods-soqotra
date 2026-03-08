import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, User, MapPin, Phone, Mail, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PackageItem } from '@/pages/invoicing/types/invoiceForm';
import { packageOptions } from '@/data/packageOptions';
import PackageDetailsSection from '@/pages/invoicing/components/PackageDetailsSection';
import PaymentDetailsSection from './components/PaymentDetailsSection';
import OfficialReceipt from './components/OfficialReceipt';
import { 
  calculateAirFreightPricing, 
  calculateSeaFreightPricing,
  getWarehouseDestination,
  calculateVolumeCBM,
  calculateVolumeCBMFromInches,
  AIR_FREIGHT_RATE_PER_KG,
  AIR_FREIGHT_DOCUMENTATION_FEE
} from './utils/sriLankaPricing';
import { 
  getProvinceForDistrict, 
  getAllDistricts, 
  getAllProvinces 
} from './utils/districtProvinceMapping';

const SriLankaInvoiceForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    cargoType: '',
    jobNumber: '',
    shipperPrefix: '',
    shipperName: '',
    shipperCountry: '',
    shipperCity: '',
    shipperCustomCity: '',
    shipperAddress: '',
    shipperMobile: '',
    consigneePrefix: '',
    consigneeName: '',
    consigneeCountry: 'SRI LANKA', // Default to Sri Lanka
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
    volume: '',
    description: '',
    rate: '',
    documentsFee: '0',
    total: '',
    paymentMethod: '',
    paymentStatus: 'UNPAID',
    paymentDate: '',
    receiptNumber: '',
    discount: '0',
    packingCharges: '0',
    transportationFee: '0',
    remarks: '',
    // Package details fields
    packagesName: '',
    length: '',
    width: '',
    height: '',
    price: ''
  });

  // Package items state
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  
  // Receipt modal state
  const [showReceipt, setShowReceipt] = useState(false);
  
  // Load existing invoice if editing
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/edit/')) {
      const invoiceId = currentPath.split('/edit/')[1];
      const storedInvoices = localStorage.getItem('sriLankaInvoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const existingInvoice = invoices.find((inv: any) => inv.id === invoiceId);
        if (existingInvoice) {
          setFormData(existingInvoice);
          if (existingInvoice.packageItems) {
            setPackageItems(existingInvoice.packageItems);
          }
        }
      }
    }
  }, []);

  // Sri Lanka specific data
  const CARGO_TYPES = ['GIFT CARGO', 'UPB CARGO'];
  const SERVICE_TYPES = ['SEA FREIGHT', 'AIR FREIGHT'];
  const SEA_TERMINALS = ['JCT TERMINAL', 'ICIC TERMINAL', 'P&O TERMINAL', 'HAMBANTHOTA TERMINAL'];
  const AIR_DESTINATIONS = ['BANDARANAYAKE INTERNATIONAL AIRPORT'];

  // Prefix options
  const NAME_PREFIXES = ['MR.', 'MS.', 'MRS.', 'DR.', 'PROF.'];

  // Countries and cities as requested
  const COUNTRIES = ['QATAR', 'KSA', 'OMAN', 'KUWAIT', 'KENYA', 'MOZAMBIQUE', 'UGANDA', 'TUNISIA', 'SRI LANKA', 'ETHIOPIA', 'SOMALIA'];
  
  const QATAR_CITIES = [
    'MANSOORA', 'NAJMA', 'WEST BAY', 'LUSAIL', 'AL KHOR', 'HILAL', 'NUAIJA', 'MUAITHAR', 'DUHAIL', 
    'UMM SALAAL ALI', 'UMM SALAAL MOHAMMED', 'PEARL QATAR', 'KATARA', 'MATHAR AL QADEEM', 'DOHA JADEED', 
    'FEREEJ AL SUDAN', 'BIN MAHMOUD', 'BIN OMRAN', 'INDUSTRIAL AREA', 'NEW INDUSTRIAL AREA', 'BAAYA', 
    'AZIZIA', 'AL WAAB', 'THUMMAMA', 'DAFNA', 'BU FANTAS', 'ABU NAKLA', 'ABU HAMOOR', 'ABU SAMRA', 
    'BU SIDRA', 'AIN KHALITH', 'AL ASIRI', 'AL HITMI', 'AL JUMAILIYA', 'AL KEESHA', 'AL MESSILA', 
    'AL MIRQAB', 'AL NASAR STREET', 'SOUQ AL NAJDA', 'WAKRA', 'WUKAIR', 'AL RAWDA', 'AL RUWAIS', 
    'AL WAJBA', 'AL SAAD', 'ASIAN CITY', 'LABOUR CAMP', 'BIRKATH AL AWAMAR', 'BANI HAJAR', 'BARWA CITY', 
    'BARWA MADINA', 'DOHA CITY', 'DUKAAN', 'EDUCATION CITY', 'NEW SALATHA', 'OLD SALATHA', 'SHEHELIYA', 
    'OLD AL GHANAM', 'ONAIZA', 'MUGALINA', 'MESSAIMEER', 'MESHAF', 'MARKEEYA', 'MAMOORA', 'MAKAINIS', 
    'MADEENA KHALEEFA', 'LUAIB', 'LEQTAFIYA', 'LAKTHA', 'GARAFA', 'JEMILIA', 'FURUSIYA STREET', 
    'AL REYYAN', 'FEREEJ ABDUL AZIZ', 'EZDAN OASIA', 'UMM AL AHAMED', 'UMM AL SANEEM', 'UMM LEKHBA', 
    'UMM AL AFFAI', 'UMBAB', 'WAJBA', 'WAREHOUSE STREET NO. 47', 'ZIKREET', 'RAWDATH AL KHAIL', 
    'RAS LAFFAN', 'RUMAILAH', 'SALWA ROAD', 'SHAHANIYA', 'SHAMAL', 'SHAKAMA'
  ];

  const getCitiesForCountry = (country: string) => {
    if (country === 'QATAR') return QATAR_CITIES;
    // For other countries, return empty array so they can use custom input
    return [];
  };

  // Mock invoice numbers (normally from Invoice Book Stock Management)
  const AVAILABLE_INVOICES = [
    'GY-13138406', 'GY-13136939', 'GY-13138380', 'GY-13138520', 'GY-13138523',
    'SL-006', 'SL-007', 'SL-008', 'SL-009', 'SL-010'
  ];

  // Manual entry state
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualInvoiceNumber, setManualInvoiceNumber] = useState('');

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

  // Auto-calculate pricing when relevant fields change
  useEffect(() => {
    if (formData.serviceType === 'AIR FREIGHT' && formData.weight) {
      const weight = parseFloat(formData.weight) || 0;
      const pricing = calculateAirFreightPricing(weight);
      
      setFormData(prev => ({
        ...prev,
        rate: pricing.rate.toString(),
        documentsFee: pricing.documentsFee.toString(),
        total: pricing.total.toString()
      }));
    } else if (formData.serviceType === 'SEA FREIGHT' && formData.volume && formData.terminal) {
      const volume = parseFloat(formData.volume) || 0;
      const warehouseDestination = getWarehouseDestination(formData.terminal);
      const pricing = calculateSeaFreightPricing(volume, warehouseDestination);
      
      setFormData(prev => ({
        ...prev,
        rate: pricing.rate.toString(),
        documentsFee: pricing.documentsFee.toString(),
        total: pricing.total.toString()
      }));
    }
  }, [formData.serviceType, formData.weight, formData.volume, formData.terminal]);

  // Auto-calculate total when rate, documentsFee, discount, packing, or transport changes
  useEffect(() => {
    const rate = parseFloat(formData.rate?.toString() || '0') || 0;
    const docFee = parseFloat(formData.documentsFee?.toString() || '0') || 0;
    const discount = parseFloat(formData.discount?.toString() || '0') || 0;
    const packing = parseFloat(formData.packingCharges?.toString() || '0') || 0;
    const transport = parseFloat(formData.transportationFee?.toString() || '0') || 0;
    const calculatedTotal = rate + docFee - discount + packing + transport;
    
    console.log('Auto-calculation:', { rate, docFee, discount, packing, transport, calculatedTotal });
    
    // Always update the total when any pricing field changes
    if (calculatedTotal >= 0) {
      setFormData(prev => ({
        ...prev,
        total: calculatedTotal.toFixed(2)
      }));
    }
  }, [formData.rate, formData.documentsFee, formData.discount, formData.packingCharges, formData.transportationFee]);

  // Auto-calculate volume from package dimensions
  useEffect(() => {
    if (formData.length && formData.width && formData.height && formData.serviceType) {
      const length = parseFloat(formData.length) || 0;
      const width = parseFloat(formData.width) || 0;
      const height = parseFloat(formData.height) || 0;
      
      let volume: number;
      if (formData.serviceType === 'AIR FREIGHT') {
        // Air freight: dimensions in CM
        volume = calculateVolumeCBM(length, width, height);
      } else if (formData.serviceType === 'SEA FREIGHT') {
        // Sea freight: dimensions in Inches
        volume = calculateVolumeCBMFromInches(length, width, height);
      } else {
        volume = 0;
      }
      
      setFormData(prev => ({
        ...prev,
        volume: volume.toFixed(4)
      }));
    }
  }, [formData.length, formData.width, formData.height, formData.serviceType]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto-update province when district changes
      if (name === 'consigneeDistrict') {
        const province = getProvinceForDistrict(value);
        if (province) {
          updated.consigneeProvince = province;
        }
      }
      
      // Set default values based on service type
      if (name === 'serviceType') {
        if (value === 'AIR FREIGHT') {
          updated.destination = 'BANDARANAYAKE INTERNATIONAL AIRPORT';
          updated.terminal = '';
          updated.documentsFee = AIR_FREIGHT_DOCUMENTATION_FEE.toString();
        } else if (value === 'SEA FREIGHT') {
          updated.destination = 'COLOMBO PORT';
          updated.terminal = '';
          updated.rate = '';
          updated.documentsFee = '';
          updated.total = '';
        }
      }
      
      // Auto-generate receipt number when payment status changes to PAID
      if (name === 'paymentStatus' && value === 'PAID' && !updated.receiptNumber) {
        updated.receiptNumber = `REC-${Date.now()}`;
        updated.paymentDate = new Date().toISOString().split('T')[0];
      }
      
      return updated;
    });
  };

  const handleManualInvoiceSubmit = () => {
    if (!manualInvoiceNumber.trim()) {
      toast.error('Please enter an invoice number');
      return;
    }
    
    // Validate GY format
    const gyPattern = /^GY\d{6}$/;
    if (!gyPattern.test(manualInvoiceNumber)) {
      toast.error('Invoice number must be in GY format (e.g., GY-000123)');
      return;
    }
    
    setFormData(prev => ({ ...prev, invoiceNumber: manualInvoiceNumber }));
    setShowManualEntry(false);
    setManualInvoiceNumber('');
    toast.success('Invoice number set successfully');
  };

  const handleManualInvoiceCancel = () => {
    setShowManualEntry(false);
    setManualInvoiceNumber('');
  };

  const handleSave = () => {
    console.log('Form data before validation:', formData);
    
    // Check all required fields with more precise validation
    const requiredFields = {
      'Invoice Number': formData.invoiceNumber?.trim(),
      'Cargo Type': formData.cargoType?.trim(),
      'Service Type': formData.serviceType?.trim(),
      'Shipper Name': formData.shipperName?.trim(),
      'Consignee Name': formData.consigneeName?.trim(),
      'Total Weight': formData.weight?.trim(),
      'Description': formData.description?.trim()
    };

    console.log('Required fields check:', requiredFields);

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || value === '')
      .map(([field, _]) => field);

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      toast.error(`Please fill in required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Additional validation for pricing
    if (!formData.rate || !formData.total) {
      toast.error('Please ensure pricing is calculated correctly');
      return;
    }
    
    // Validate total calculation
    const rate = parseFloat(formData.rate) || 0;
    const docFee = parseFloat(formData.documentsFee) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const packing = parseFloat(formData.packingCharges) || 0;
    const transport = parseFloat(formData.transportationFee) || 0;
    const expectedTotal = rate + docFee - discount + packing + transport;
    const actualTotal = parseFloat(formData.total) || 0;
    
    if (Math.abs(expectedTotal - actualTotal) > 0.01) {
      console.log('Price mismatch:', { rate, docFee, discount, packing, transport, expectedTotal, actualTotal });
      setFormData(prev => ({
        ...prev,
        total: expectedTotal.toFixed(2)
      }));
      toast.warning('Total price was adjusted to match calculated total');
    }
    
    try {
      // Get existing invoices from localStorage
      const existingInvoices = JSON.parse(localStorage.getItem('sriLankaInvoices') || '[]');
      
      // Auto-generate job number if not present
      const jobNumber = formData.jobNumber || `SL-JOB-${Date.now()}`;
      
      // Create proper invoice structure for printing
      const invoiceData = {
        id: `sri-lanka-${Date.now()}`,
        ...formData,
        jobNumber,
        packageItems: packageItems,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        country: 'SRI LANKA',
        // Map to print structure
        shipper: {
          name: formData.shipperName,
          address: `${formData.shipperCity}, ${formData.shipperCountry}`,
          mobile: formData.shipperMobile
        },
        consignee: {
          name: formData.consigneeName,
          address: `${formData.consigneeAddress}, ${formData.consigneeDistrict}, ${formData.consigneeCountry}`,
          mobile: formData.consigneeMobile,
          idNumber: formData.consigneeId
        },
        packages: packageItems.map(item => ({
          name: item.description,
          length: parseFloat(item.length || '0'),
          width: parseFloat(item.width || '0'),
          height: parseFloat(item.height || '0'),
          volume: (parseFloat(item.length || '0') * parseFloat(item.width || '0') * parseFloat(item.height || '0')) / 1000000
        })),
        totalWeight: parseFloat(formData.weight || '0'),
        pricing: {
          gross: parseFloat(formData.rate || '0') + parseFloat(formData.documentsFee || '0'),
          discount: parseFloat(formData.discount || '0'),
          net: parseFloat(formData.total || '0')
        },
        // Payment details
        paymentStatus: formData.paymentStatus,
        paymentMethod: formData.paymentMethod,
        paymentDate: formData.paymentDate,
        receiptNumber: formData.receiptNumber,
        packingCharges: parseFloat(formData.packingCharges || '0'),
        transportationFee: parseFloat(formData.transportationFee || '0')
      };
      
      // Add to existing invoices
      const updatedInvoices = [...existingInvoices, invoiceData];
      
      // Save back to localStorage
      localStorage.setItem('sriLankaInvoices', JSON.stringify(updatedInvoices));
      
      toast.success('Invoice saved successfully');
      console.log('Invoice saved:', invoiceData);
      
      // Navigate to edit page with the saved invoice ID
      navigate(`/sri-lanka/invoice/edit/${invoiceData.id}`);
      
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Failed to save invoice. Please try again.');
    }
  };

  const handlePrintReceipt = () => {
    if (formData.paymentStatus !== 'PAID') {
      toast.error('Receipt can only be generated for paid invoices');
      return;
    }
    
    if (!formData.receiptNumber) {
      toast.error('Receipt number is required');
      return;
    }
    
    setShowReceipt(true);
  };

  const handlePreview = () => {
    // For existing invoices, use saved ID, otherwise require save first
    const currentInvoiceId = window.location.pathname.includes('/edit/') 
      ? window.location.pathname.split('/edit/')[1] 
      : null;
    
    if (!currentInvoiceId && !formData.invoiceNumber) {
      toast.error('Please save the invoice first before previewing');
      return;
    }
    
    if (currentInvoiceId) {
      window.open(`/sri-lanka/invoice/print/${currentInvoiceId}`, '_blank');
    } else {
      window.open(`/sri-lanka/invoice/print/preview_${formData.invoiceNumber}`, '_blank');
    }
  };

  const handlePrint = () => {
    // For existing invoices, use saved ID, otherwise require save first
    const currentInvoiceId = window.location.pathname.includes('/edit/') 
      ? window.location.pathname.split('/edit/')[1] 
      : null;
    
    if (!currentInvoiceId && !formData.invoiceNumber) {
      toast.error('Please save the invoice first before printing');
      return;
    }
    
    if (currentInvoiceId) {
      window.open(`/sri-lanka/invoice/print/${currentInvoiceId}`, '_blank');
    } else {
      window.open(`/sri-lanka/invoice/print/preview_${formData.invoiceNumber}`, '_blank');
    }
  };

  // Package handlers
  const handlePackageSelect = (description: string) => {
    const selectedPackage = packageOptions.find(pkg => pkg.description === description);
    if (selectedPackage) {
      // Calculate volume from dimensions based on service type
      let volume: number;
      if (formData.serviceType === 'AIR FREIGHT') {
        // Air freight: dimensions in CM
        volume = calculateVolumeCBM(
          selectedPackage.dimensions.length,
          selectedPackage.dimensions.width, 
          selectedPackage.dimensions.height
        );
      } else if (formData.serviceType === 'SEA FREIGHT') {
        // Sea freight: dimensions in Inches
        volume = calculateVolumeCBMFromInches(
          selectedPackage.dimensions.length,
          selectedPackage.dimensions.width, 
          selectedPackage.dimensions.height
        );
      } else {
        volume = 0;
      }
      
      // Calculate weight from volume (assuming 1 CBM = 167 kg for air freight)
      const estimatedWeight = volume * 167;
      
      setFormData(prev => ({
        ...prev,
        packagesName: selectedPackage.description,
        description: 'PERSONAL EFFECTS', // Default description
        length: selectedPackage.dimensions.length.toString(),
        width: selectedPackage.dimensions.width.toString(),
        height: selectedPackage.dimensions.height.toString(),
        volume: volume.toFixed(4),
        weight: estimatedWeight.toFixed(1),
        price: selectedPackage.pricing.sriLanka.price.toString()
      }));
    }
  };

  const handleManualPackage = (packageName: string, price: string) => {
    setFormData(prev => ({
      ...prev,
      packagesName: packageName,
      price: price
    }));
  };

  const handleAddPackage = () => {
    if (!formData.packagesName || !formData.price) {
      toast.error('Please fill in package name and price');
      return;
    }

    // Calculate documentation fee based on service type
    let docFee = 0;
    if (formData.serviceType === 'AIR FREIGHT') {
      docFee = AIR_FREIGHT_DOCUMENTATION_FEE;
    } else if (formData.serviceType === 'SEA FREIGHT') {
      const volume = parseFloat(formData.volume) || 0;
      docFee = volume > 1 ? 50 : 0;
    }

    const price = parseFloat(formData.price) || 0;
    const total = price + docFee;

    const newPackage: PackageItem = {
      id: Date.now().toString(),
      name: formData.packagesName, // Use name field for display
      description: formData.description || 'PERSONAL EFFECTS',
      price: price,
      quantity: 1,
      total: total,
      length: formData.length,
      width: formData.width,
      height: formData.height,
      volume: formData.volume,
      weight: formData.weight,
      documentsFee: docFee.toString(),
      volumeWeight: formData.volume
    };

    setPackageItems(prev => [...prev, newPackage]);
    
    // Update form totals based on all packages
    const updatedPackages = [...packageItems, newPackage];
    const totalVolume = updatedPackages.reduce((sum, pkg) => sum + (parseFloat(pkg.volume || '0') || 0), 0);
    const totalWeight = updatedPackages.reduce((sum, pkg) => sum + (parseFloat(pkg.weight || '0') || 0), 0);
    const totalPrice = updatedPackages.reduce((sum, pkg) => sum + (pkg.total || 0), 0);
    
    setFormData(prev => ({
      ...prev,
      packagesName: '',
      length: '',
      width: '',
      height: '',
      price: '',
      volume: totalVolume.toFixed(4),
      weight: totalWeight.toString(),
      total: totalPrice.toFixed(2),
      packages: updatedPackages.length.toString()
    }));

    toast.success('Package added successfully');
  };

  const handleRemovePackage = (id: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
    toast.success('Package removed');
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
            <Button onClick={handlePrint} variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white">
              <Printer className="h-4 w-4 mr-2" />
              Print
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
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-800 uppercase">
              <User className="h-5 w-5" />
              BASIC INFORMATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">CARGO TYPE *</label>
                <div className="flex gap-2">
                  {CARGO_TYPES.map(type => (
                    <Button
                      key={type}
                      type="button"
                      variant={formData.cargoType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSelectChange('cargoType', type)}
                      className={`flex-1 text-xs uppercase ${
                        formData.cargoType === type 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                          : 'bg-white/80 hover:bg-white'
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">INVOICE NUMBER *</label>
                {!showManualEntry ? (
                  <div className="space-y-2">
                    <Select value={formData.invoiceNumber} onValueChange={(value) => handleSelectChange('invoiceNumber', value)}>
                      <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                        <SelectValue placeholder="SELECT INVOICE NUMBER" className="uppercase" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm">
                        {AVAILABLE_INVOICES.map(invoice => (
                          <SelectItem key={invoice} value={invoice} className="uppercase">{invoice}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      variant="link" 
                      className="p-0 h-auto text-xs text-blue-600"
                      onClick={() => setShowManualEntry(true)}
                    >
                      Enter GY invoice number manually
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter GY invoice number (e.g., GY000123)"
                      value={manualInvoiceNumber}
                      onChange={(e) => setManualInvoiceNumber(e.target.value.toUpperCase())}
                      className="flex-1 bg-white/80 border-blue-200 focus:border-blue-400 w-full min-w-[250px] font-mono text-lg tracking-wider px-4 py-2"
                      maxLength={8}
                      style={{ minWidth: '250px', fontSize: '18px', letterSpacing: '0.1em' }}
                    />
                    <Button 
                      type="button" 
                      onClick={handleManualInvoiceSubmit}
                      className="whitespace-nowrap bg-green-500 hover:bg-green-600"
                    >
                      Submit
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleManualInvoiceCancel}
                      className="whitespace-nowrap"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DATE *</label>
                <Input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-white/80 border-blue-200 focus:border-blue-400 uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">JOB NUMBER</label>
                 <Input
                   name="jobNumber"
                   value={formData.jobNumber}
                   onChange={(e) => {
                     const value = e.target.value;
                     handleInputChange(e);
                     // Auto-fill from Qatar collection/delivery jobs
                     if (value.length >= 3) {
                       try {
                         const scheduleJobs = JSON.parse(localStorage.getItem('qatarJobs') || '[]');
                         const matchedJob = scheduleJobs.find((j: any) => 
                           j.jobNumber?.includes(value) || j.id?.includes(value)
                         );
                         if (matchedJob) {
                           setFormData(prev => ({
                             ...prev,
                             jobNumber: value,
                             shipperName: matchedJob.shipperName || matchedJob.customerName || prev.shipperName,
                             shipperMobile: matchedJob.shipperMobile || matchedJob.mobile || prev.shipperMobile,
                             consigneeName: matchedJob.consigneeName || prev.consigneeName,
                             consigneeMobile: matchedJob.consigneeMobile || prev.consigneeMobile,
                             weight: matchedJob.weight || prev.weight,
                             description: matchedJob.description || prev.description,
                           }));
                           toast.success('Job details auto-filled');
                         }
                       } catch (err) {
                         console.log('No Qatar job data found');
                       }
                     }
                   }}
                   placeholder="ENTER JOB NUMBER"
                   className="bg-white/80 border-blue-200 focus:border-blue-400 placeholder:uppercase"
                 />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">SERVICE TYPE *</label>
                <Select value={formData.serviceType} onValueChange={(value) => handleSelectChange('serviceType', value)}>
                  <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="SELECT SERVICE TYPE" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {SERVICE_TYPES.map(type => (
                      <SelectItem key={type} value={type} className="uppercase">{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Destination Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-500/10 to-teal-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-green-800 uppercase">
              <MapPin className="h-5 w-5" />
              DESTINATION DETAILS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DESTINATION</label>
                <Select value={formData.destination} onValueChange={(value) => handleSelectChange('destination', value)}>
                  <SelectTrigger className="bg-white/80 border-green-200 focus:border-green-400">
                    <SelectValue placeholder="SELECT DESTINATION" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {formData.serviceType === 'SEA FREIGHT' && (
                      <SelectItem value="COLOMBO PORT" className="uppercase">COLOMBO PORT</SelectItem>
                    )}
                    {formData.serviceType === 'AIR FREIGHT' && (
                      <SelectItem value="BANDARANAYAKE INTERNATIONAL AIRPORT" className="uppercase">BANDARANAYAKE INTERNATIONAL AIRPORT</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              {formData.serviceType === 'SEA FREIGHT' && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">TERMINAL</label>
                  <Select value={formData.terminal} onValueChange={(value) => handleSelectChange('terminal', value)}>
                    <SelectTrigger className="bg-white/80 border-green-200 focus:border-green-400">
                      <SelectValue placeholder="SELECT TERMINAL" className="uppercase" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm">
                      {SEA_TERMINALS.map(terminal => (
                        <SelectItem key={terminal} value={terminal} className="uppercase">{terminal}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Shipper Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-500/10 to-red-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-orange-800 uppercase">
              <User className="h-5 w-5" />
              SHIPPER DETAILS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">PREFIX</label>
                <Select value={formData.shipperPrefix} onValueChange={(value) => handleSelectChange('shipperPrefix', value)}>
                  <SelectTrigger className="bg-white/80 border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="SELECT PREFIX" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {NAME_PREFIXES.map(prefix => (
                      <SelectItem key={prefix} value={prefix} className="uppercase">{prefix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">SHIPPER NAME *</label>
                <Input
                  name="shipperName"
                  value={formData.shipperName}
                  onChange={handleInputChange}
                  placeholder="ENTER SHIPPER NAME"
                  className="bg-white/80 border-orange-200 focus:border-orange-400 uppercase placeholder:uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">COUNTRY</label>
                <Select value={formData.shipperCountry} onValueChange={(value) => handleSelectChange('shipperCountry', value)}>
                  <SelectTrigger className="bg-white/80 border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="SELECT COUNTRY" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60 overflow-y-auto">
                    {COUNTRIES.map(country => (
                      <SelectItem key={country} value={country} className="uppercase">{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">CITY</label>
                {formData.shipperCountry && getCitiesForCountry(formData.shipperCountry).length > 0 ? (
                  <Select value={formData.shipperCity} onValueChange={(value) => handleSelectChange('shipperCity', value)}>
                    <SelectTrigger className="bg-white/80 border-orange-200 focus:border-orange-400">
                      <SelectValue placeholder="SELECT CITY" className="uppercase" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60 overflow-y-auto">
                      {getCitiesForCountry(formData.shipperCountry).map(city => (
                        <SelectItem key={city} value={city} className="uppercase">{city}</SelectItem>
                      ))}
                      <SelectItem value="CUSTOM" className="uppercase border-t border-gray-200 font-medium">+ ADD CUSTOM CITY</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    name="shipperCustomCity"
                    value={formData.shipperCustomCity}
                    onChange={handleInputChange}
                    placeholder="ENTER CITY NAME"
                    className="bg-white/80 border-orange-200 focus:border-orange-400 uppercase placeholder:uppercase"
                  />
                )}
                {formData.shipperCity === 'CUSTOM' && (
                  <Input
                    name="shipperCustomCity"
                    value={formData.shipperCustomCity}
                    onChange={handleInputChange}
                    placeholder="ENTER CUSTOM CITY NAME"
                    className="bg-white/80 border-orange-200 focus:border-orange-400 uppercase placeholder:uppercase mt-2"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">MOBILE NUMBER</label>
                <Input
                  name="shipperMobile"
                  value={formData.shipperMobile}
                  onChange={handleInputChange}
                  placeholder="+974 XXXX XXXX"
                  className="bg-white/80 border-orange-200 focus:border-orange-400 placeholder:uppercase"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">ADDRESS</label>
                <Input
                  name="shipperAddress"
                  value={formData.shipperAddress}
                  onChange={handleInputChange}
                  placeholder="ENTER SHIPPER ADDRESS"
                  className="bg-white/80 border-orange-200 focus:border-orange-400 uppercase placeholder:uppercase"
                />
              </div>
            </div>
          </div>

          {/* Consignee Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-purple-800 uppercase">
              <User className="h-5 w-5" />
              CONSIGNEE DETAILS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">PREFIX</label>
                <Select value={formData.consigneePrefix} onValueChange={(value) => handleSelectChange('consigneePrefix', value)}>
                  <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400">
                    <SelectValue placeholder="SELECT PREFIX" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    {NAME_PREFIXES.map(prefix => (
                      <SelectItem key={prefix} value={prefix} className="uppercase">{prefix}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">CONSIGNEE NAME *</label>
                <Input
                  name="consigneeName"
                  value={formData.consigneeName}
                  onChange={handleInputChange}
                  placeholder="ENTER CONSIGNEE NAME"
                  className="bg-white/80 border-purple-200 focus:border-purple-400 uppercase placeholder:uppercase"
                />
              </div>
               <div>
                 <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">COUNTRY</label>
                 <Input
                   name="consigneeCountry"
                   value={formData.consigneeCountry}
                   onChange={handleInputChange}
                   className="bg-white/80 border-purple-200 focus:border-purple-400 uppercase"
                   readOnly
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DISTRICT</label>
                 <Select value={formData.consigneeDistrict} onValueChange={(value) => handleSelectChange('consigneeDistrict', value)}>
                   <SelectTrigger className="bg-white/80 border-purple-200 focus:border-purple-400">
                     <SelectValue placeholder="SELECT DISTRICT" className="uppercase" />
                   </SelectTrigger>
                   <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60 overflow-y-auto">
                     {getAllDistricts().map(district => (
                       <SelectItem key={district} value={district} className="uppercase">{district}</SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">PROVINCE</label>
                 <Input
                   name="consigneeProvince"
                   value={formData.consigneeProvince}
                   onChange={handleInputChange}
                   placeholder="AUTO-FILLED FROM DISTRICT"
                   className="bg-gray-50 border-purple-200 focus:border-purple-400 uppercase placeholder:uppercase"
                   readOnly
                 />
               </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">MOBILE NUMBER</label>
                <Input
                  name="consigneeMobile"
                  value={formData.consigneeMobile}
                  onChange={handleInputChange}
                  placeholder="+94 XXXX XXXX"
                  className="bg-white/80 border-purple-200 focus:border-purple-400 placeholder:uppercase"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">ADDRESS</label>
                <Input
                  name="consigneeAddress"
                  value={formData.consigneeAddress}
                  onChange={handleInputChange}
                  placeholder="ENTER CONSIGNEE ADDRESS"
                  className="bg-white/80 border-purple-200 focus:border-purple-400 uppercase placeholder:uppercase"
                />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DELIVERY ADDRESS</label>
                <Input
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="ENTER DELIVERY ADDRESS (IF DIFFERENT FROM CONSIGNEE ADDRESS)"
                  className="bg-white/80 border-purple-200 focus:border-purple-400 uppercase placeholder:uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">ID/PASSPORT NUMBER</label>
                <Input
                  name="consigneeId"
                  value={formData.consigneeId}
                  onChange={handleInputChange}
                  placeholder="ENTER ID OR PASSPORT NUMBER"
                  className="bg-white/80 border-purple-200 focus:border-purple-400 uppercase placeholder:uppercase"
                />
              </div>
            </div>
          </div>

          {/* Package Details Section */}
          <div className="border-b border-gray-100 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <div className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-cyan-800 uppercase">
                📦 PACKAGE DETAILS
              </h3>
              <PackageDetailsSection 
                formState={formData}
                handleInputChange={handleInputChange}
                packageOptions={packageOptions}
                handlePackageSelect={handlePackageSelect}
                handleManualPackage={handleManualPackage}
                handleAddPackage={handleAddPackage}
                packageItems={packageItems}
                handleRemovePackage={handleRemovePackage}
              />
              
              {/* Volume and Weight Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">VOLUME (CBM)</label>
                  <Input
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    placeholder="AUTO-CALCULATED FROM DIMENSIONS"
                    className="bg-white/80 border-cyan-200 focus:border-cyan-400 placeholder:uppercase"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">TOTAL WEIGHT (KG) *</label>
                  <Input
                    name="weight"
                    type="number"
                    step="0.01"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="ENTER TOTAL WEIGHT"
                    className="bg-white/80 border-cyan-200 focus:border-cyan-400 placeholder:uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DESCRIPTION</label>
                  <Input
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="PACKAGE DESCRIPTION"
                    className="bg-white/80 border-cyan-200 focus:border-cyan-400 uppercase placeholder:uppercase"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Details */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-yellow-800 uppercase">
              <Phone className="h-5 w-5" />
              PRICING DETAILS
            </h3>
            {formData.serviceType === 'AIR FREIGHT' && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium uppercase">
                  🚀 AIR FREIGHT RATE: QAR {AIR_FREIGHT_RATE_PER_KG}/KG | ✈️ DOCUMENTATION FEE: QAR {AIR_FREIGHT_DOCUMENTATION_FEE}/HAWB
                </p>
              </div>
            )}
            {formData.serviceType === 'SEA FREIGHT' && (
              <div className="mb-4 p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium uppercase">
                  🚢 SEA FREIGHT RATES: COLOMBO (QAR 259/CBM) | KURUNEGALA/GALLE (QAR 269/CBM) | 📄 DOC FEE: QAR 50/INVOICE
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">RATE (QAR)</label>
                <Input
                  name="rate"
                  type="number"
                  step="0.01"
                  value={formData.rate}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'AIR FREIGHT'}
                  placeholder="ENTER RATE"
                  className="bg-white/80 border-yellow-200 focus:border-yellow-400 placeholder:uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DOCUMENTATION FEE (QAR)</label>
                <Input
                  name="documentsFee"
                  type="number"
                  step="0.01"
                  value={formData.documentsFee}
                  onChange={handleInputChange}
                  readOnly={formData.serviceType === 'AIR FREIGHT'}
                  placeholder="ENTER DOCUMENTATION FEE"
                  className="bg-white/80 border-yellow-200 focus:border-yellow-400 placeholder:uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">TOTAL (QAR)</label>
                <Input
                  name="total"
                  type="text"
                  value={formData.total}
                  readOnly
                  placeholder="AUTO-CALCULATED"
                  className="font-bold bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 focus:border-green-500 placeholder:uppercase cursor-not-allowed text-lg"
                />
              </div>
            </div>
          </div>

          {/* Payment & Additional Details */}
          <div className="p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-b-xl">
            <PaymentDetailsSection 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
            
            {/* Receipt Print Button */}
            {formData.paymentStatus === 'PAID' && (
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={handlePrintReceipt}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Official Receipt
                </Button>
              </div>
            )}
            
            <div className="mt-4">
              <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">REMARKS</label>
              <Input
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="ADDITIONAL REMARKS"
                className="bg-white/80 border-indigo-200 focus:border-indigo-400 uppercase placeholder:uppercase"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Official Receipt</h2>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    if (printWindow) {
                      const receiptElement = document.getElementById('receipt-content');
                      if (receiptElement) {
                        printWindow.document.write(`
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <title>Official Receipt</title>
                              <style>
                                body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                                table { width: 100%; border-collapse: collapse; }
                                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                                .font-bold { font-weight: bold; }
                                .text-center { text-align: center; }
                                .text-right { text-align: right; }
                                .text-red-600 { color: #dc2626; }
                                .bg-gray-100 { background-color: #f3f4f6; }
                                img { max-width: 100%; height: auto; }
                              </style>
                            </head>
                            <body>
                              ${receiptElement.innerHTML}
                            </body>
                          </html>
                        `);
                        printWindow.document.close();
                        printWindow.print();
                      }
                    }
                  }}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={() => setShowReceipt(false)}>
                  Close
                </Button>
              </div>
            </div>
            <div id="receipt-content" className="p-4">
              <OfficialReceipt 
                receiptData={{
                  receiptNumber: formData.receiptNumber || '',
                  invoiceNumber: formData.invoiceNumber || '',
                  date: formData.date || '',
                  paymentDate: formData.paymentDate || '',
                  consigneeName: formData.consigneeName || '',
                  paymentMethod: formData.paymentMethod || '',
                  total: formData.total || '0',
                  discount: formData.discount || '0',
                  packingCharges: formData.packingCharges || '0',
                  transportationFee: formData.transportationFee || '0'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SriLankaInvoiceForm;