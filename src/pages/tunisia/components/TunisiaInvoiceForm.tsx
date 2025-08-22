import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2, Upload, Camera } from "lucide-react";
import { TunisiaInvoice, TunisiaCustomer } from "../types/tunisiaInvoiceTypes";
import { VEHICLE_RATES, PERSONAL_EFFECTS_RATE } from "../types/tunisiaTypes";

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
    if (url.trim()) {
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
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleAddVehiclePhoto(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addPersonalEffect = () => {
    setPersonalEffects(prev => [...prev, {
      description: "",
      quantity: 1,
      volume: 1,
      charges: PERSONAL_EFFECTS_RATE,
      photos: []
    }]);
  };

  const updatePersonalEffect = (index: number, field: string, value: any) => {
    setPersonalEffects(prev => prev.map((effect, i) => {
      if (i === index) {
        const updated = { ...effect, [field]: value };
        if (field === 'volume') {
          updated.charges = value * PERSONAL_EFFECTS_RATE;
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

  const handleSave = () => {
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
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter customer name"
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
                onChange={(e) => setVehicle(prev => ({ ...prev, make: e.target.value }))}
                placeholder="e.g., ISUZU"
              />
            </div>
            <div>
              <Label>Model *</Label>
              <Input
                value={vehicle.model}
                onChange={(e) => setVehicle(prev => ({ ...prev, model: e.target.value }))}
                placeholder="e.g., D-MAX PICKUP"
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
              <Input
                value={vehicle.country}
                onChange={(e) => setVehicle(prev => ({ ...prev, country: e.target.value }))}
                placeholder="e.g., MADE IN INDIA"
              />
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
              <div className="flex gap-2">
                <Input
                  placeholder="Enter photo URL"
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
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="vehicle-file-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('vehicle-file-upload')?.click()}
                >
                  <Upload className="h-4 w-4" />
                </Button>
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Personal Effects & Household Goods</CardTitle>
            <Button onClick={addPersonalEffect} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
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
                    <h4 className="font-medium">Item {index + 1}</h4>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removePersonalEffect(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Description</Label>
                      <Input
                        value={effect.description}
                        onChange={(e) => updatePersonalEffect(index, 'description', e.target.value)}
                        placeholder="Describe the items"
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={effect.quantity}
                        onChange={(e) => updatePersonalEffect(index, 'quantity', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label>Volume (CBM)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={effect.volume}
                        onChange={(e) => updatePersonalEffect(index, 'volume', Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Charges: QAR {effect.charges.toLocaleString()} (QAR 600/CBM)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Invoice Number:</span>
              <Input
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-48 text-right"
              />
            </div>
            <div className="flex justify-between">
              <span>House B/L Number:</span>
              <Input
                value={hblNumber}
                onChange={(e) => setHblNumber(e.target.value)}
                className="w-48 text-right"
                placeholder="2025/XXXXX"
              />
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