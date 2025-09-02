import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Upload, Camera } from "lucide-react";
import { TunisiaInvoice, TunisiaCustomer } from "../types/tunisiaInvoiceTypes";
import { VEHICLE_RATES, PERSONAL_EFFECTS_RATE } from "../types/tunisiaTypes";
import { TunisiaStorageService } from "../services/TunisiaStorageService";
import { TunisiaInvoiceBookService, TunisiaInvoiceBook } from "../services/TunisiaInvoiceBookService";
import PersonalEffectsFormEnhanced from "./PersonalEffectsFormEnhanced";
import { toast } from "sonner";

interface TunisiaInvoiceFormProps {
  onBack: () => void;
  onInvoiceSave: (invoice: TunisiaInvoice) => void;
  existingInvoice?: TunisiaInvoice;
}

const TunisiaInvoiceForm: React.FC<TunisiaInvoiceFormProps> = ({
  onBack,
  onInvoiceSave,
  existingInvoice
}) => {
  const [customer, setCustomer] = useState<TunisiaCustomer>(
    existingInvoice?.customer || {
      id: "",
      prefix: "MR.",
      name: "",
      address: "",
      mobile: "",
      metrashMobile: "",
      email: "",
      idNumber: ""
    }
  );

  const [vehicle, setVehicle] = useState(
    existingInvoice?.vehicle || {
      make: "",
      model: "",
      year: "",
      color: "",
      chassisNumber: "",
      plateNumber: "",
      engineNumber: "",
      country: "MADE IN INDIA",
      hsCode: "87032112",
      exportPlate: "",
      type: "SEDAN" as const,
      freightCharge: 5500,
      photos: []
    }
  );

  const [personalEffects, setPersonalEffects] = useState(
    existingInvoice?.personalEffects || []
  );

  const [invoiceNumber, setInvoiceNumber] = useState(
    existingInvoice?.invoiceNumber || `2025/${String(Date.now()).slice(-6)}`
  );
  
  const [supportingDocuments, setSupportingDocuments] = useState<string[]>(
    existingInvoice?.supportingDocuments || []
  );

  const [hblNumber, setHblNumber] = useState(
    existingInvoice?.hblNumber || `2025/`
  );

  // HBL Number generation state
  const [availableFileNumbers, setAvailableFileNumbers] = useState<string[]>([]);
  
  // Generate file numbers for HBL
  const generateFileNumbers = () => {
    const fileNumbers = [];
    // Starting from 04746 with 10 numbers
    for (let i = 4746; i <= 4755; i++) {
      fileNumbers.push(i.toString().padStart(5, '0'));
    }
    // Continue from 15160 onwards
    for (let i = 15160; i <= 15169; i++) {
      fileNumbers.push(i.toString());
    }
    return fileNumbers;
  };

  useEffect(() => {
    setAvailableFileNumbers(generateFileNumbers());
  }, []);

  // Book and page selection state
  const [availableBooks, setAvailableBooks] = useState<TunisiaInvoiceBook[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [availablePages, setAvailablePages] = useState<string[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("");

  // Load available books on component mount
  useEffect(() => {
    TunisiaInvoiceBookService.initializeDefaultBooks();
    loadAvailableBooks();
  }, []);

  const loadAvailableBooks = () => {
    const books = TunisiaInvoiceBookService.getAvailableBooks();
    setAvailableBooks(books);
  };

  const handleBookSelect = (bookId: string) => {
    setSelectedBookId(bookId);
    setSelectedPage("");
    
    const book = availableBooks.find(b => b.id === bookId);
    if (book) {
      setAvailablePages(book.available);
    } else {
      setAvailablePages([]);
    }
  };

  const handlePageSelect = (pageNumber: string) => {
    setSelectedPage(pageNumber);
    // Update invoice number with the selected page format
    setInvoiceNumber(`2025/${pageNumber}`);
  };

  const handleVehicleTypeChange = (type: string) => {
    const selectedType = type as "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP";
    const rate = VEHICLE_RATES.find(r => r.type === selectedType);
    setVehicle(prev => ({
      ...prev,
      type: selectedType,
      freightCharge: rate?.defaultRate || 5500
    }));
  };

  const handleAddVehiclePhoto = (url: string) => {
    if (url.trim() && vehicle.photos.length < 3) {
      setVehicle(prev => ({
        ...prev,
        photos: [...prev.photos, url.trim()]
      }));
    }
  };

  const handleRemoveVehiclePhoto = (index: number) => {
    setVehicle(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Check if adding these files would exceed the limit
      const remainingSlots = 3 - vehicle.photos.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          handleAddVehiclePhoto(result);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const [showPersonalEffectsForm, setShowPersonalEffectsForm] = useState(false);

  const addPersonalEffect = () => {
    setShowPersonalEffectsForm(true);
  };

  const handlePersonalEffectsAdd = (effects: any) => {
    setPersonalEffects(prev => [...prev, effects]);
    setShowPersonalEffectsForm(false);
  };

  const updatePersonalEffect = (index: number, field: string, value: any) => {
    setPersonalEffects(prev => prev.map((effect, i) => {
      if (i === index) {
        const updated = { ...effect, [field]: value };
        if (field === 'volume') {
          updated.charges = effect.loadingLocation === "OUTSIDE_CAR" ? value * PERSONAL_EFFECTS_RATE : 0;
        }
        if (field === 'loadingLocation') {
          updated.charges = value === "OUTSIDE_CAR" ? effect.volume * PERSONAL_EFFECTS_RATE : 0;
          updated.requiresHBL = value === "OUTSIDE_CAR";
        }
        return updated;
      }
      return effect;
    }));
  };

  const removePersonalEffect = (index: number) => {
    setPersonalEffects(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const vehicleTotal = vehicle.freightCharge;
    const effectsTotal = personalEffects.reduce((sum, effect) => sum + effect.charges, 0);
    return vehicleTotal + effectsTotal;
  };

  const handleAddDocument = (url: string) => {
    if (url.trim()) {
      setSupportingDocuments(prev => [...prev, url.trim()]);
    }
  };

  const handleRemoveDocument = (index: number) => {
    setSupportingDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAddDocument(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      // Load existing invoices for duplicate checking
      const existingInvoices = await TunisiaStorageService.loadInvoices();
      
      // Check for duplicate invoice number (skip check if editing existing invoice)
      if (!existingInvoice) {
        const duplicateInvoiceNumber = existingInvoices.find(inv => 
          inv.invoiceNumber === invoiceNumber
        );
        if (duplicateInvoiceNumber) {
          toast.error(`Invoice number ${invoiceNumber} already exists. Please use a different number.`);
          return;
        }
      } else {
        // For existing invoice, check duplicates excluding current invoice
        const duplicateInvoiceNumber = existingInvoices.find(inv => 
          inv.invoiceNumber === invoiceNumber && inv.id !== existingInvoice.id
        );
        if (duplicateInvoiceNumber) {
          toast.error(`Invoice number ${invoiceNumber} already exists. Please use a different number.`);
          return;
        }
      }
      
      // Check for duplicate export plate (if export plate is provided)
      if (vehicle.exportPlate?.trim()) {
        const duplicateExportPlate = existingInvoices.find(inv => 
          inv.vehicle.exportPlate?.toLowerCase().trim() === vehicle.exportPlate.toLowerCase().trim() && 
          inv.id !== existingInvoice?.id
        );
        if (duplicateExportPlate) {
          toast.error(`Export plate ${vehicle.exportPlate} already exists for another vehicle. Please check the plate number.`);
          return;
        }
      }

      const invoice: TunisiaInvoice = {
        id: existingInvoice?.id || Date.now().toString(),
        invoiceNumber,
        hblNumber,
        customer: {
          ...customer,
          id: customer.id || Date.now().toString()
        },
        vehicle,
        personalEffects: personalEffects.length > 0 ? personalEffects : undefined,
        supportingDocuments: supportingDocuments.length > 0 ? supportingDocuments : undefined,
        totalAmount: calculateTotal(),
        date: new Date().toISOString().split('T')[0],
        status: "DRAFT"
      };

      onInvoiceSave(invoice);
      toast.success(`Invoice ${existingInvoice ? 'updated' : 'created'} successfully!`);
    } catch (error) {
      console.error('Error saving invoice:', error);
      toast.error('Failed to save invoice. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {existingInvoice ? 'Edit' : 'Create'} Tunisia Invoice
        </h1>
      </div>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Prefix</Label>
                  <Select value={customer.prefix} onValueChange={(value) => setCustomer(prev => ({ ...prev, prefix: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MR.">MR.</SelectItem>
                      <SelectItem value="MRS.">MRS.</SelectItem>
                      <SelectItem value="MS.">MS.</SelectItem>
                      <SelectItem value="DR.">DR.</SelectItem>
                      <SelectItem value="PROF.">PROF.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label>Customer Name *</Label>
                  <Input
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                    placeholder="ENTER CUSTOMER NAME"
                    className="uppercase"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Mobile Number *</Label>
              <Input
                value={customer.mobile}
                onChange={(e) => setCustomer(prev => ({ ...prev, mobile: e.target.value }))}
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <Label>Metrash Registered Mobile No.</Label>
              <Input
                value={customer.metrashMobile}
                onChange={(e) => setCustomer(prev => ({ ...prev, metrashMobile: e.target.value }))}
                placeholder="Enter Metrash mobile number"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Address *</Label>
              <Textarea
                value={customer.address}
                onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Enter customer address"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={customer.email}
                onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label>ID Number</Label>
              <Input
                value={customer.idNumber}
                onChange={(e) => setCustomer(prev => ({ ...prev, idNumber: e.target.value }))}
                placeholder="Enter ID number"
              />
            </div>
          </div>
          
          {/* Supporting Documents */}
          <div>
            <Label>Supporting Documents</Label>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter document URL"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddDocument((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <input
                  type="file"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleDocumentUpload}
                  style={{ display: 'none' }}
                  id="document-file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('document-file-upload')?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              {supportingDocuments.length > 0 && (
                <div className="space-y-2">
                  {supportingDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm truncate">{doc.slice(0, 50)}...</span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveDocument(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Vehicle Type *</Label>
              <Select value={vehicle.type} onValueChange={handleVehicleTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SEDAN">Sedan</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="HILUX">Hilux</SelectItem>
                  <SelectItem value="DOUBLE_PICKUP">Double Pickup</SelectItem>
                  <SelectItem value="STATION_WAGON">Station Wagon</SelectItem>
                  <SelectItem value="SUPER_SALOON">Super Saloon</SelectItem>
                  <SelectItem value="SALOON">Saloon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Make *</Label>
              <Input
                value={vehicle.make}
                onChange={(e) => setVehicle(prev => ({ ...prev, make: e.target.value.toUpperCase() }))}
                placeholder="E.G., ISUZU"
                className="uppercase"
              />
            </div>
            <div>
              <Label>Model *</Label>
              <Input
                value={vehicle.model}
                onChange={(e) => setVehicle(prev => ({ ...prev, model: e.target.value.toUpperCase() }))}
                placeholder="E.G., D-MAX PICKUP"
                className="uppercase"
              />
            </div>
            <div>
              <Label>Year *</Label>
              <Input
                value={vehicle.year}
                onChange={(e) => setVehicle(prev => ({ ...prev, year: e.target.value }))}
                placeholder="e.g., 2024"
              />
            </div>
            <div>
              <Label>Color *</Label>
              <Input
                value={vehicle.color}
                onChange={(e) => setVehicle(prev => ({ ...prev, color: e.target.value }))}
                placeholder="e.g., GREY"
              />
            </div>
            <div>
              <Label>Country *</Label>
              <div className="space-y-2">
                <Select value={vehicle.country} onValueChange={(value) => setVehicle(prev => ({ ...prev, country: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MADE IN INDIA">MADE IN INDIA</SelectItem>
                    <SelectItem value="P R C CHINA">P R C CHINA</SelectItem>
                    <SelectItem value="MADE IN GERMANY">MADE IN GERMANY</SelectItem>
                    <SelectItem value="MADE IN SOUTH KOREA">MADE IN SOUTH KOREA</SelectItem>
                    <SelectItem value="MADE IN NORTH KOREA">MADE IN NORTH KOREA</SelectItem>
                    <SelectItem value="MADE IN SWITZERLAND">MADE IN SWITZERLAND</SelectItem>
                    <SelectItem value="MADE IN POLAND">MADE IN POLAND</SelectItem>
                    <SelectItem value="MADE IN NEW ZEALAND">MADE IN NEW ZEALAND</SelectItem>
                    <SelectItem value="MADE IN JAPAN">MADE IN JAPAN</SelectItem>
                    <SelectItem value="MADE IN TAIWAN">MADE IN TAIWAN</SelectItem>
                    <SelectItem value="MADE IN VIETNAM">MADE IN VIETNAM</SelectItem>
                    <SelectItem value="MADE IN THAILAND">MADE IN THAILAND</SelectItem>
                    <SelectItem value="MADE IN AUSTRIA">MADE IN AUSTRIA</SelectItem>
                    <SelectItem value="MADE IN AUSTRALIA">MADE IN AUSTRALIA</SelectItem>
                    <SelectItem value="MADE IN USA">MADE IN USA</SelectItem>
                    <SelectItem value="MADE IN UK">MADE IN UK</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="OR ENTER COUNTRY MANUALLY"
                  className="uppercase text-xs"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value.toUpperCase();
                      if (value.trim()) {
                        setVehicle(prev => ({ ...prev, country: value.trim() }));
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <Label>Chassis Number *</Label>
              <Input
                value={vehicle.chassisNumber}
                onChange={(e) => setVehicle(prev => ({ ...prev, chassisNumber: e.target.value }))}
                placeholder="Enter chassis number"
              />
            </div>
            <div>
              <Label>Plate Number</Label>
              <Input
                value={vehicle.plateNumber}
                onChange={(e) => setVehicle(prev => ({ ...prev, plateNumber: e.target.value }))}
                placeholder="Enter plate number"
              />
            </div>
            <div>
              <Label>Engine Number</Label>
              <Input
                value={vehicle.engineNumber}
                onChange={(e) => setVehicle(prev => ({ ...prev, engineNumber: e.target.value }))}
                placeholder="Enter engine number"
              />
            </div>
            <div>
              <Label>HS Code</Label>
              <Input
                value={vehicle.hsCode}
                onChange={(e) => setVehicle(prev => ({ ...prev, hsCode: e.target.value }))}
                placeholder="e.g., 87032112"
              />
            </div>
            <div>
              <Label>Export Plate</Label>
              <Input
                value={vehicle.exportPlate}
                onChange={(e) => setVehicle(prev => ({ ...prev, exportPlate: e.target.value }))}
                placeholder="Enter export plate"
              />
            </div>
            <div>
              <Label>Freight Charge (QAR)</Label>
              <Input
                type="number"
                value={vehicle.freightCharge}
                onChange={(e) => setVehicle(prev => ({ ...prev, freightCharge: Number(e.target.value) }))}
              />
            </div>
          </div>

          {/* Vehicle Photos */}
          <div>
            <Label>Vehicle Photos</Label>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Vehicle Photos ({vehicle.photos.length}/3)</span>
                  {vehicle.photos.length >= 3 && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                      Maximum 3 photos allowed
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter photo URL"
                    disabled={vehicle.photos.length >= 3}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddVehiclePhoto((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="vehicle-file-upload"
                    disabled={vehicle.photos.length >= 3}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={vehicle.photos.length >= 3}
                    onClick={() => document.getElementById('vehicle-file-upload')?.click()}
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicle.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Vehicle ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleRemoveVehiclePhoto(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Effects */}
      {showPersonalEffectsForm ? (
        <PersonalEffectsFormEnhanced 
          onPersonalEffectsAdd={handlePersonalEffectsAdd}
          onCancel={() => setShowPersonalEffectsForm(false)}
          vehicleOwnerName={customer.name}
        />
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Personal Effects & Household Goods</CardTitle>
              <div className="flex gap-2">
                <Button onClick={addPersonalEffect} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Package
                </Button>
                {personalEffects.length > 0 && (
                  <div className="text-sm text-muted-foreground flex items-center">
                    Total Packages: <span className="font-semibold ml-1">{personalEffects.length}</span>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {personalEffects.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No personal effects added. Click "Add Item" to include household goods.
              </p>
            ) : (
              <div className="space-y-4">
                {personalEffects.map((effect, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Item {index + 1}: {effect.description}</h4>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removePersonalEffect(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Owner:</span> {effect.ownerName}
                      </div>
                      <div>
                        <span className="font-medium">Volume:</span> {effect.volume} CBM
                      </div>
                      <div>
                        <span className="font-medium">Weight:</span> {effect.grossWeight} KG
                      </div>
                      <div>
                        <span className="font-medium">Charges:</span> QAR {effect.charges}
                      </div>
                    </div>
                    
                    {/* Charging Information */}
                    <div className={`p-3 rounded-lg border ${effect.loadingLocation === "INSIDE_CAR" ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {effect.loadingLocation === "INSIDE_CAR" 
                            ? "✓ No charges - Inside car loading"
                            : `⚠️ Charges: QAR ${effect.charges.toLocaleString()} (QAR ${PERSONAL_EFFECTS_RATE}/CBM)`
                          }
                        </span>
                        {effect.requiresHBL && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            HBL Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Book Number Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Book Number</Label>
                <Select value={selectedBookId} onValueChange={handleBookSelect}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select book number" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[100]">
                    {availableBooks.map((book) => (
                      <SelectItem key={book.id} value={book.id}>
                        {book.bookNumber} ({book.startPage} - {book.endPage})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Page Number Selection */}
              <div>
                <Label>Page Number</Label>
                <Select 
                  value={selectedPage} 
                  onValueChange={handlePageSelect}
                  disabled={!selectedBookId || availablePages.length === 0}
                >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select page number" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[100] max-h-60 overflow-y-auto">
                    {availablePages.map((page) => (
                      <SelectItem key={page} value={page}>
                        {page}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Invoice Number:</span>
                <Input
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-48 text-right"
                  placeholder="2025/000000"
                />
              </div>
              <div className="flex justify-between items-center">
                <span>House B/L Number:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">2025/</span>
                  <Select 
                    value={hblNumber.split('/')[1] || ''} 
                    onValueChange={(value) => setHblNumber(`2025/${value}`)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select file no." />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-[100] max-h-60">
                      {availableFileNumbers.map((fileNum) => (
                        <SelectItem key={fileNum} value={fileNum}>
                          {fileNum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Vehicle Freight:</span>
                <span>QAR {vehicle.freightCharge.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Personal Effects:</span>
                <span>QAR {personalEffects.reduce((sum, effect) => sum + effect.charges, 0).toLocaleString()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>QAR {calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!customer.name || !vehicle.make || !vehicle.chassisNumber}>
          {existingInvoice ? 'Update' : 'Save'} Invoice
        </Button>
      </div>
    </div>
  );
};

export default TunisiaInvoiceForm;