import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Eye, User, MapPin, Phone, Mail, Printer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
import { syncInvoiceToExternal } from '@/lib/externalSync';

const SriLankaInvoiceForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: new Date().toISOString().split('T')[0],
    cargoType: '',
    jobNumber: '',
    bookNumber: '',
    pageNumber: '',
    salesRepresentative: '',
    driverName: '',
    whatsappNumber: '',
    shipperPrefix: '',
    shipperName: '',
    shipperCountry: '',
    shipperCity: '',
    shipperCustomCity: '',
    shipperAddress: '',
    shipperMobile: '',
    consigneePrefix: '',
    consigneeName: '',
    consigneeCountry: 'SRI LANKA',
    consigneeDistrict: '',
    consigneeProvince: '',
    consigneeAddress: '',
    deliveryAddress: '',
    consigneeMobile: '',
    consigneeId: '',
    serviceType: '',
    destination: '',
    terminal: '',
    warehouse: '',
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

  // Database-driven book data
  const [dbBooks, setDbBooks] = useState<any[]>([]);
  const [availablePages, setAvailablePages] = useState<string[]>([]);

  // Load Sri Lanka invoice books from database
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from('manage_invoice_book_stock')
          .select('*')
          .eq('country', 'Sri Lanka')
          .in('status', ['available', 'assigned']);
        
        if (error) {
          console.error('Error fetching Sri Lanka books:', error);
          return;
        }
        if (data) {
          console.log('Loaded Sri Lanka invoice books:', data);
          setDbBooks(data);
        }
      } catch (err) {
        console.error('Error loading books:', err);
      }
    };
    fetchBooks();
  }, []);

  // Auto-fill when book number changes - lookup from DB
  const handleBookNumberChange = useCallback((bookNum: string) => {
    setFormData(prev => ({ ...prev, bookNumber: bookNum }));
    
    if (!bookNum) {
      setAvailablePages([]);
      return;
    }

    // Find matching book in DB (book_number field stores like "#800")
    const matchedBook = dbBooks.find(b => 
      b.book_number === `#${bookNum}` || 
      b.book_number === bookNum ||
      b.book_number?.replace('#', '') === bookNum
    );

    if (matchedBook) {
      console.log('Matched book from DB:', matchedBook);
      
      // Parse available pages
      const pages = Array.isArray(matchedBook.available_pages) 
        ? matchedBook.available_pages as string[]
        : [];
      setAvailablePages(pages);
      
      // Auto-fill sales rep from book assignment
      const salesRep = matchedBook.assigned_to_sales_rep || '';
      const nextPage = pages.length > 0 ? pages[0] : '';
      
      setFormData(prev => ({
        ...prev,
        bookNumber: bookNum,
        salesRepresentative: salesRep || prev.salesRepresentative,
        pageNumber: nextPage || prev.pageNumber,
        // Auto-set invoice number from page number
        invoiceNumber: nextPage || prev.invoiceNumber,
        whatsappNumber: matchedBook.whatsapp_number || prev.whatsappNumber,
        driverName: matchedBook.assigned_to_driver || prev.driverName,
      }));
      
      if (salesRep) {
        toast.success(`Book #${bookNum} assigned to ${salesRep}`);
      }
    } else {
      console.log('No matching book found for:', bookNum);
      setAvailablePages([]);
    }
  }, [dbBooks]);

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
  const SEA_WAREHOUSES = ['Colombo Warehouse', 'Kurunegala UPB Warehouse', 'Galle UPB Warehouse'];
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

  // Mock invoice numbers - DEPRECATED, now using DB-driven invoice books
  const AVAILABLE_INVOICES: string[] = [];

  // Manual entry state  
  const [showManualEntry, setShowManualEntry] = useState(true); // Always show direct input
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
    } else if (formData.serviceType === 'SEA FREIGHT' && formData.warehouse) {
      // Calculate total CBM from all package items
      const totalCBM = packageItems.length > 0
        ? packageItems.reduce((sum, pkg) => sum + (parseFloat(pkg.volume || '0') || 0), 0)
        : parseFloat(formData.volume || '0') || 0;
      
      if (totalCBM > 0) {
        const pricing = calculateSeaFreightPricing(totalCBM, formData.warehouse);
        const discount = parseFloat(formData.discount?.toString() || '0') || 0;
        const packing = parseFloat(formData.packingCharges?.toString() || '0') || 0;
        const transport = parseFloat(formData.transportationFee?.toString() || '0') || 0;
        // RATE = per-CBM rate, TOTAL = (CBM × rate) + docFee - discount + packing + transport
        const calculatedTotal = pricing.freightCharge + pricing.documentsFee - discount + packing + transport;
        
        setFormData(prev => ({
          ...prev,
          rate: pricing.ratePerCBM.toString(),
          documentsFee: pricing.documentsFee.toString(),
          total: calculatedTotal.toFixed(2)
        }));
      }
    }
  }, [formData.serviceType, formData.weight, formData.volume, formData.warehouse, formData.discount, formData.packingCharges, formData.transportationFee, packageItems]);

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
    
    // Accept numeric invoice numbers (e.g., 13140835) or GY format
    const numericPattern = /^\d{6,10}$/;
    const gyPattern = /^GY-?\d{6,8}$/;
    if (!numericPattern.test(manualInvoiceNumber) && !gyPattern.test(manualInvoiceNumber)) {
      toast.error('Invoice number must be numeric (e.g., 13140835) or GY format (e.g., GY-000123)');
      return;
    }
    
    setFormData(prev => ({ ...prev, invoiceNumber: manualInvoiceNumber }));
    setManualInvoiceNumber('');
    toast.success('Invoice number set successfully');
  };

  const handleManualInvoiceCancel = () => {
    setShowManualEntry(false);
    setManualInvoiceNumber('');
  };

  const handleSave = async () => {
    console.log('Form data before validation:', formData);
    
    // Check all required fields with more precise validation
    const safeStr = (val: any) => String(val || '').trim();
    const requiredFields = {
      'Invoice Number': safeStr(formData.invoiceNumber),
      'Cargo Type': safeStr(formData.cargoType),
      'Service Type': safeStr(formData.serviceType),
      'Shipper Name': safeStr(formData.shipperName),
      'Consignee Name': safeStr(formData.consigneeName),
      'Total Weight': safeStr(formData.weight),
      'Description': safeStr(formData.description)
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
    
    // Default pricing to 0 if not set
    const saveRate = formData.rate || '0';
    const saveTotal = formData.total || '0';

    
    // Validate total calculation
    const rate = parseFloat(saveRate) || 0;
    const volume = parseFloat(formData.volume || '0') || 0;
    const docFee = parseFloat(formData.documentsFee) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const packing = parseFloat(formData.packingCharges) || 0;
    const transport = parseFloat(formData.transportationFee) || 0;
    const freightCharge = formData.serviceType === 'SEA FREIGHT' ? volume * rate : rate;
    const expectedTotal = freightCharge + docFee - discount + packing + transport;
    const actualTotal = parseFloat(saveTotal) || 0;
    
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
      
      // Check if we're editing an existing invoice
      const currentPath = window.location.pathname;
      const isEditing = currentPath.includes('/edit/');
      const existingId = isEditing ? currentPath.split('/edit/')[1] : null;
      
      // Auto-generate job number if not present
      const jobNumber = formData.jobNumber || `SL-JOB-${Date.now()}`;
      
      // Use existing ID if editing, otherwise generate new one
      const invoiceId = existingId || `sri-lanka-${Date.now()}`;
      
      // Create proper invoice structure for printing
      const invoiceData = {
        id: invoiceId,
        ...formData,
        jobNumber,
        packageItems: packageItems,
        createdAt: isEditing ? (existingInvoices.find((inv: any) => inv.id === existingId)?.createdAt || new Date().toISOString()) : new Date().toISOString(),
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
        pricing: (() => {
          const vol = parseFloat(formData.volume || '0') || 0;
          const r = parseFloat(formData.rate || '0') || 0;
          const df = parseFloat(formData.documentsFee || '0') || 0;
          const disc = parseFloat(formData.discount || '0') || 0;
          const pack = parseFloat(formData.packingCharges || '0') || 0;
          const trans = parseFloat(formData.transportationFee || '0') || 0;
          const fc = formData.serviceType === 'SEA FREIGHT' ? vol * r : r;
          const net = fc + df - disc + pack + trans;
          return { gross: net + disc, discount: disc, net };
        })(),
        // Payment details
        paymentStatus: formData.paymentStatus,
        paymentMethod: formData.paymentMethod,
        paymentDate: formData.paymentDate,
        receiptNumber: formData.receiptNumber,
        packingCharges: parseFloat(formData.packingCharges || '0'),
        transportationFee: parseFloat(formData.transportationFee || '0')
      };
      
      // Update existing or add new
      let updatedInvoices;
      if (isEditing) {
        updatedInvoices = existingInvoices.map((inv: any) => inv.id === existingId ? invoiceData : inv);
        // If not found (first save after creation), add it
        if (!existingInvoices.some((inv: any) => inv.id === existingId)) {
          updatedInvoices = [...existingInvoices, invoiceData];
        }
      } else {
        updatedInvoices = [...existingInvoices, invoiceData];
      }
      
      // Save back to localStorage
      localStorage.setItem('sriLankaInvoices', JSON.stringify(updatedInvoices));
      await syncInvoiceToExternal(invoiceData);
      
      toast.success('Invoice saved successfully');
      console.log('Invoice saved:', invoiceData);
      
      // Navigate to edit page with the saved invoice ID
      if (!isEditing) {
        navigate(`/sri-lanka/invoice/edit/${invoiceData.id}`);
      }
      
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

  const storeAndOpenPrint = (invoiceId: string) => {
    // Use localStorage (shared across tabs) instead of sessionStorage (per-tab only)
    const printData = { ...formData, id: invoiceId, packageItems };
    localStorage.setItem('printInvoiceData', JSON.stringify(printData));
    window.open(`/sri-lanka/invoice/print/${invoiceId}`, '_blank');
  };

  const handlePreview = () => {
    const currentInvoiceId = window.location.pathname.includes('/edit/') 
      ? window.location.pathname.split('/edit/')[1] 
      : null;
    
    if (!currentInvoiceId && !formData.invoiceNumber) {
      toast.error('Please save the invoice first before previewing');
      return;
    }
    
    storeAndOpenPrint(currentInvoiceId || `preview_${formData.invoiceNumber}`);
  };

  const handlePrint = () => {
    const currentInvoiceId = window.location.pathname.includes('/edit/') 
      ? window.location.pathname.split('/edit/')[1] 
      : null;
    
    if (!currentInvoiceId && !formData.invoiceNumber) {
      toast.error('Please save the invoice first before printing');
      return;
    }
    
    storeAndOpenPrint(currentInvoiceId || `preview_${formData.invoiceNumber}`);
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

  const handleManualPackage = (packageName: string, price: string, dimensions?: string, volume?: string, pricingType?: string, docsFee?: string) => {
    const parsedPrice = parseFloat(price) || 0;
    const parsedDocFee = parseFloat(docsFee || '0') || 0;
    const total = parsedPrice + parsedDocFee;
    
    // Parse dimensions if provided
    let length = '', width = '', height = '';
    if (dimensions) {
      const parts = dimensions.split(/\s*[xX×]\s*/);
      if (parts.length === 3) {
        length = parts[0].trim();
        width = parts[1].trim();
        height = parts[2].trim();
      }
    }

    const newPackage: PackageItem = {
      id: Date.now().toString(),
      name: packageName,
      description: formData.description || 'PERSONAL EFFECTS',
      price: parsedPrice,
      quantity: 1,
      total: total,
      length,
      width,
      height,
      volume: volume || '',
      weight: '',
      documentsFee: parsedDocFee.toString(),
      volumeWeight: volume || ''
    };

    setPackageItems(prev => [...prev, newPackage]);
    
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

    toast.success('Manual package added successfully');
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
                <div className="flex gap-2">
                  {formData.invoiceNumber ? (
                    <div className="flex items-center gap-2 w-full">
                      <Input 
                        value={formData.invoiceNumber}
                        readOnly
                        className="flex-1 bg-green-50 border-green-300 font-mono text-lg font-bold tracking-wider"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setFormData(prev => ({ ...prev, invoiceNumber: '' }))}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Input 
                        placeholder="Enter invoice number (e.g., 13140835)"
                        value={manualInvoiceNumber}
                        onChange={(e) => setManualInvoiceNumber(e.target.value.toUpperCase())}
                        className="flex-1 bg-white/80 border-blue-200 focus:border-blue-400 font-mono text-lg tracking-wider"
                        maxLength={12}
                      />
                      <Button 
                        type="button" 
                        onClick={handleManualInvoiceSubmit}
                        className="whitespace-nowrap bg-green-500 hover:bg-green-600"
                      >
                        Set
                      </Button>
                    </>
                  )}
                </div>
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
                       // Auto-fill from Qatar collection/delivery jobs - check both localStorage AND database
                       if (value.length >= 3) {
                         try {
                           // Check localStorage first
                            const jobs1 = JSON.parse(localStorage.getItem('jobs') || '[]');
                            const jobs2 = JSON.parse(localStorage.getItem('qatarJobs') || '[]');
                            const jobs3 = JSON.parse(localStorage.getItem('sriLankaJobs') || '[]');
                            const jobs4 = JSON.parse(localStorage.getItem('saudiArabiaJobs') || '[]');
                            const allJobs = [...jobs1, ...jobs2, ...jobs3, ...jobs4];
                           
                           const matchedJob = allJobs.find((j: any) => 
                             j.jobNumber === value || 
                             j.jobNumber?.includes(value) || 
                             j.id?.includes(value)
                           );
                           if (matchedJob) {
                             console.log('Matched job from localStorage:', matchedJob);
                             
                             // Auto-fill all available fields from the completed job
                             const updatedFields: any = {
                               jobNumber: value,
                               shipperName: matchedJob.customer || matchedJob.shipperName || matchedJob.customerName || matchedJob.shipper1 || '',
                               shipperMobile: matchedJob.mobileNumber || matchedJob.shipperMobile || matchedJob.mobile || matchedJob.shipperPhone || '',
                               shipperCity: matchedJob.town || matchedJob.city || matchedJob.shipperCity || '',
                               shipperAddress: matchedJob.location || matchedJob.shipperAddress || matchedJob.address || '',
                               consigneeName: matchedJob.consigneeName || matchedJob.consignee1 || '',
                               consigneeMobile: matchedJob.consigneeMobile || matchedJob.consigneePhone || '',
                               weight: matchedJob.weight || matchedJob.totalWeight || '',
                               description: matchedJob.description || matchedJob.remarks || matchedJob.packageDetails || '',
                               volume: matchedJob.volume || matchedJob.totalVolume || '',
                               packages: matchedJob.packages || matchedJob.totalPackages || '',
                               driverName: matchedJob.driver || matchedJob.driverName || '',
                             };
                             
                             // Auto-fill invoice number from completed job
                             if (matchedJob.invoiceNumber) {
                               updatedFields.invoiceNumber = matchedJob.invoiceNumber;
                               updatedFields.pageNumber = matchedJob.invoiceNumber;
                             }
                             
                             // Try to find matching book for this invoice to auto-fill book number, sales rep
                             if (matchedJob.invoiceNumber && dbBooks.length > 0) {
                               for (const book of dbBooks) {
                                 const pages = Array.isArray(book.available_pages) ? book.available_pages as string[] : [];
                                 if (pages.includes(matchedJob.invoiceNumber) || 
                                     book.job_number === value ||
                                     book.job_number === matchedJob.jobNumber) {
                                   updatedFields.bookNumber = book.book_number?.replace('#', '') || book.book_number || '';
                                   updatedFields.salesRepresentative = book.assigned_to_sales_rep || '';
                                   updatedFields.driverName = book.assigned_to_driver || updatedFields.driverName;
                                   
                                   // Set available pages for the matched book
                                   setAvailablePages(pages);
                                   break;
                                 }
                               }
                             }
                             
                             // Only set non-empty values to avoid overwriting existing data
                             setFormData(prev => {
                               const merged = { ...prev };
                               for (const [key, val] of Object.entries(updatedFields)) {
                                 if (val) (merged as any)[key] = val;
                               }
                               return merged;
                             });
                             
                             toast.success('Job details auto-filled from completed job');
                             return;
                           }
                         } catch (err) {
                           console.log('localStorage lookup failed:', err);
                         }

                         // Also check database schedule_jobs
                         const fetchJobFromDB = async () => {
                           try {
                             const { data: scheduleJobs, error } = await supabase
                               .from('schedule_jobs')
                               .select('job_data, schedule_id');
                             
                             if (error || !scheduleJobs) return;
                             
                             for (const sj of scheduleJobs) {
                               const jobData = sj.job_data as any;
                               if (jobData && (jobData.jobNumber === value || jobData.jobNumber?.includes(value))) {
                                 console.log('Matched job from DB schedule_jobs:', jobData);
                                 
                                 // Fetch schedule details for driver/sales rep
                                 let scheduleDriver = '';
                                 let scheduleSalesRep = '';
                                 let scheduleVehicle = '';
                                 if (sj.schedule_id) {
                                   const { data: schedule } = await supabase
                                     .from('schedules')
                                     .select('driver, sales_rep, vehicle')
                                     .eq('id', sj.schedule_id)
                                     .maybeSingle();
                                   if (schedule) {
                                     scheduleDriver = schedule.driver || '';
                                     scheduleSalesRep = schedule.sales_rep || '';
                                     scheduleVehicle = schedule.vehicle || '';
                                   }
                                 }
                                 
                                 const updatedFields: any = {
                                   jobNumber: value,
                                   shipperName: jobData.customer || jobData.shipperName || jobData.customerName || jobData.shipper1 || '',
                                   shipperMobile: jobData.mobileNumber || jobData.shipperMobile || jobData.mobile || jobData.shipperPhone || '',
                                   shipperCity: jobData.town || jobData.city || jobData.shipperCity || '',
                                   shipperAddress: jobData.location || jobData.shipperAddress || jobData.address || '',
                                   consigneeName: jobData.consigneeName || jobData.consignee1 || '',
                                   consigneeMobile: jobData.consigneeMobile || jobData.consigneePhone || '',
                                   weight: jobData.weight || jobData.totalWeight || '',
                                   description: jobData.description || jobData.remarks || jobData.packageDetails || '',
                                   volume: jobData.volume || jobData.totalVolume || '',
                                   packages: jobData.packages || jobData.totalPackages || '',
                                   driverName: scheduleDriver || jobData.driver || jobData.driverName || '',
                                   salesRepresentative: scheduleSalesRep || jobData.salesRep || '',
                                 };
                                 
                                 if (jobData.invoiceNumber) {
                                   updatedFields.invoiceNumber = jobData.invoiceNumber;
                                   updatedFields.pageNumber = jobData.invoiceNumber;
                                 }
                                 
                                 // Find matching book
                                 if (jobData.invoiceNumber && dbBooks.length > 0) {
                                   for (const book of dbBooks) {
                                     const pages = Array.isArray(book.available_pages) ? book.available_pages as string[] : [];
                                     if (pages.includes(jobData.invoiceNumber) || 
                                         book.job_number === value ||
                                         book.job_number === jobData.jobNumber) {
                                       updatedFields.bookNumber = book.book_number?.replace('#', '') || book.book_number || '';
                                       updatedFields.salesRepresentative = book.assigned_to_sales_rep || updatedFields.salesRepresentative;
                                       updatedFields.driverName = book.assigned_to_driver || updatedFields.driverName;
                                       setAvailablePages(pages);
                                       break;
                                     }
                                   }
                                 }
                                 
                                 setFormData(prev => {
                                   const merged = { ...prev };
                                   for (const [key, val] of Object.entries(updatedFields)) {
                                     if (val) (merged as any)[key] = val;
                                   }
                                   return merged;
                                 });
                                 
                                 toast.success('Job details auto-filled from database');
                                 return;
                               }
                             }
                           } catch (err) {
                             console.log('DB job lookup failed:', err);
                           }
                         };
                         fetchJobFromDB();
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
            
            {/* Book Assignment & WhatsApp Details */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-blue-200">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">BOOK NUMBER</label>
                <Input
                  name="bookNumber"
                  value={formData.bookNumber}
                  onChange={(e) => handleBookNumberChange(e.target.value)}
                  placeholder="E.G. 800"
                  className="bg-white/80 border-blue-200 focus:border-blue-400 placeholder:uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">PAGE NUMBER</label>
                {availablePages.length > 0 ? (
                  <Select value={formData.pageNumber} onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, pageNumber: value, invoiceNumber: value }));
                  }}>
                    <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="SELECT PAGE" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60">
                      {availablePages.map((page: string) => (
                        <SelectItem key={page} value={page}>{page}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    name="pageNumber"
                    value={formData.pageNumber}
                    onChange={handleInputChange}
                    placeholder="ENTER PAGE NUMBER"
                    className="bg-white/80 border-blue-200 focus:border-blue-400 placeholder:uppercase"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">SALES REP</label>
                <Select value={formData.salesRepresentative} onValueChange={(value) => handleSelectChange('salesRepresentative', value)}>
                  <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="SELECT REP" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="Mr. Lahiru Chathuranga">Mr. Lahiru Chathuranga</SelectItem>
                    <SelectItem value="Mr. Sajjad">Mr. Sajjad</SelectItem>
                    <SelectItem value="Mr. Imam Ubaidulla">Mr. Imam Ubaidulla</SelectItem>
                    <SelectItem value="Mr. Ranatunghe">Mr. Ranatunghe</SelectItem>
                    <SelectItem value="Mr. Mohamed Rizwan">Mr. Mohamed Rizwan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DRIVER</label>
                <Select value={formData.driverName} onValueChange={(value) => handleSelectChange('driverName', value)}>
                  <SelectTrigger className="bg-white/80 border-blue-200 focus:border-blue-400">
                    <SelectValue placeholder="SELECT DRIVER" className="uppercase" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur-sm">
                    <SelectItem value="Ashoka Udesh">Ashoka Udesh</SelectItem>
                    <SelectItem value="Johnny Venakady">Johnny Venakady</SelectItem>
                    <SelectItem value="Kanaya">Kanaya</SelectItem>
                    <SelectItem value="Bakeeth Idris">Bakeeth Idris</SelectItem>
                    <SelectItem value="Idries Karar">Idries Karar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">WHATSAPP NUMBER</label>
                <Input
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="+94 XXX XXX XXXX"
                  className="bg-white/80 border-blue-200 focus:border-blue-400"
                />
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
                <>
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
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700 uppercase">DESTINATION WAREHOUSE *</label>
                    <Select value={formData.warehouse} onValueChange={(value) => handleSelectChange('warehouse', value)}>
                      <SelectTrigger className="bg-white/80 border-green-200 focus:border-green-400">
                        <SelectValue placeholder="SELECT WAREHOUSE" className="uppercase" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm">
                        {SEA_WAREHOUSES.map(wh => (
                          <SelectItem key={wh} value={wh} className="uppercase">{wh}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
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