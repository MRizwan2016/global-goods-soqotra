import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, X } from "lucide-react";
import { TunisiaVehicle, VEHICLE_RATES } from "../types/tunisiaTypes";
import { TunisiaInvoice } from "../types/tunisiaInvoiceTypes";
import { TunisiaStorageService } from "../services/TunisiaStorageService";

interface VehicleLoadingFormProps {
  onVehicleAdd: (vehicle: Omit<TunisiaVehicle, 'id'>) => void;
  onCancel: () => void;
  maxVehicles: number;
  currentVehicleCount: number;
  invoices: TunisiaInvoice[];
}

const VehicleLoadingForm: React.FC<VehicleLoadingFormProps> = ({
  onVehicleAdd,
  onCancel,
  maxVehicles,
  currentVehicleCount,
  invoices
}) => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<TunisiaInvoice | null>(null);
  const [vehicle, setVehicle] = useState<Partial<TunisiaVehicle>>({
    type: "SEDAN",
    make: "",
    model: "",
    year: "",
    color: "",
    chassisNumber: "",
    plateNumber: "",
    engineNumber: "",
    country: "MADE IN GERMANY",
    hsCode: "870300",
    exportPlate: "",
    photos: [],
    freightCharge: 5500
  });

  const [photoInput, setPhotoInput] = useState("");

  const handleVehicleTypeChange = (type: TunisiaVehicle['type']) => {
    const rate = VEHICLE_RATES.find(r => r.type === type);
    setVehicle({
      ...vehicle,
      type,
      freightCharge: rate?.defaultRate || 5500
    });
  };

  const handleAddPhoto = () => {
    if (photoInput.trim() && (vehicle.photos || []).length < 3) {
      setVehicle({
        ...vehicle,
        photos: [...(vehicle.photos || []), photoInput.trim()]
      });
      setPhotoInput("");
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...(vehicle.photos || [])];
    newPhotos.splice(index, 1);
    setVehicle({
      ...vehicle,
      photos: newPhotos
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && (vehicle.photos || []).length < 3) {
      // Check how many slots are available
      const remainingSlots = 3 - (vehicle.photos || []).length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      
      filesToProcess.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setVehicle(prev => ({
            ...prev,
            photos: [...(prev.photos || []), result]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = () => {
    if (vehicle.make && vehicle.model && vehicle.chassisNumber && vehicle.type) {
      onVehicleAdd({
        ...vehicle,
        loadedAt: new Date().toISOString()
      } as Omit<TunisiaVehicle, 'id'>);
    }
  };

  const canAddVehicle = currentVehicleCount < maxVehicles;

  if (!canAddVehicle) {
    return (
      <Card className="border-red-500 bg-red-50">
        <CardContent className="p-4 text-center">
          <div className="text-red-600 font-medium mb-2">
            Container Full
          </div>
          <div className="text-sm text-red-500">
            Maximum vehicles ({maxVehicles}) already loaded in this container.
          </div>
          <Button variant="outline" onClick={onCancel} className="mt-4">
            Back to Container
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Load Vehicle ({currentVehicleCount + 1}/{maxVehicles})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Vehicle Type and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Vehicle Type</label>
            <Select 
              value={vehicle.type} 
              onValueChange={handleVehicleTypeChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SEDAN">Sedan (QAR 5000-6000)</SelectItem>
                <SelectItem value="SUV">SUV (QAR 6000)</SelectItem>
                <SelectItem value="HILUX">Hilux (QAR 6000)</SelectItem>
                <SelectItem value="DOUBLE_PICKUP">Double Pickup (QAR 6500-7000)</SelectItem>
                <SelectItem value="STATION_WAGON">Station Wagon (QAR 5500-6000)</SelectItem>
                <SelectItem value="SUPER_SALOON">Super Saloon (QAR 5500-6000)</SelectItem>
                <SelectItem value="SALOON">Saloon (QAR 5000-5500)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Freight Charge (QAR)</label>
            <Input
              type="number"
              value={vehicle.freightCharge}
              onChange={(e) => setVehicle({...vehicle, freightCharge: Number(e.target.value)})}
            />
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Make</label>
            <Input
              value={vehicle.make}
              onChange={(e) => setVehicle({...vehicle, make: e.target.value})}
              placeholder="AUDI"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Model</label>
            <Input
              value={vehicle.model}
              onChange={(e) => setVehicle({...vehicle, model: e.target.value})}
              placeholder="A&L SALOON"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Year</label>
            <Input
              value={vehicle.year}
              onChange={(e) => setVehicle({...vehicle, year: e.target.value})}
              placeholder="2024"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Color</label>
            <Input
              value={vehicle.color}
              onChange={(e) => setVehicle({...vehicle, color: e.target.value})}
              placeholder="GREEN"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Chassis Number</label>
            <Input
              value={vehicle.chassisNumber}
              onChange={(e) => setVehicle({...vehicle, chassisNumber: e.target.value})}
              placeholder="ENGUJ189764HJHYGS"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Engine Number</label>
            <Input
              value={vehicle.engineNumber}
              onChange={(e) => setVehicle({...vehicle, engineNumber: e.target.value})}
              placeholder="NJOYTT7865"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Country</label>
            <Input
              value={vehicle.country}
              onChange={(e) => setVehicle({...vehicle, country: e.target.value})}
              placeholder="MADE IN GERMANY"
            />
          </div>
          <div>
            <label className="text-sm font-medium">HS Code</label>
            <Input
              value={vehicle.hsCode}
              onChange={(e) => setVehicle({...vehicle, hsCode: e.target.value})}
              placeholder="870300"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Export Plate</label>
            <Input
              value={vehicle.exportPlate}
              onChange={async (e) => {
                const exportPlate = e.target.value;
                setVehicle({...vehicle, exportPlate});
                
                // Auto-populate from existing invoices using storage service
                if (exportPlate.trim()) {
                  const matchingInvoice = await TunisiaStorageService.getInvoiceByExportPlate(exportPlate);
                  
                  if (matchingInvoice) {
                    setVehicle(prev => ({
                      ...prev,
                      make: matchingInvoice.vehicle.make,
                      model: matchingInvoice.vehicle.model,
                      year: matchingInvoice.vehicle.year,
                      color: matchingInvoice.vehicle.color,
                      chassisNumber: matchingInvoice.vehicle.chassisNumber,
                      plateNumber: matchingInvoice.vehicle.plateNumber,
                      engineNumber: matchingInvoice.vehicle.engineNumber,
                      country: matchingInvoice.vehicle.country,
                      hsCode: matchingInvoice.vehicle.hsCode,
                      type: matchingInvoice.vehicle.type,
                      freightCharge: matchingInvoice.vehicle.freightCharge,
                      photos: matchingInvoice.vehicle.photos || [],
                      customerInfo: matchingInvoice.customer
                    }));
                  }
                }
              }}
              placeholder="3805674 - Auto-fills details from invoice"
              className="bg-yellow-50 border-yellow-300"
            />
            {vehicle.customerInfo && (
              <div className="text-xs text-green-600 mt-1">
                ✓ Auto-filled from invoice for {vehicle.customerInfo.name}
              </div>
            )}
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Vehicle Photos ({(vehicle.photos || []).length}/3)</label>
            {(vehicle.photos || []).length >= 3 && (
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
                Maximum 3 photos allowed
              </span>
            )}
          </div>
          
          {/* Photo Upload Methods */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                placeholder="Paste image URL or take photo"
                disabled={(vehicle.photos || []).length >= 3}
              />
            </div>
            <Button 
              onClick={handleAddPhoto} 
              variant="outline" 
              size="sm"
              disabled={(vehicle.photos || []).length >= 3}
            >
              Add URL
            </Button>
            <label className="cursor-pointer">
              <Button 
                variant="outline" 
                size="sm" 
                asChild
                disabled={(vehicle.photos || []).length >= 3}
              >
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={(vehicle.photos || []).length >= 3}
              />
            </label>
          </div>

          {/* Photo Preview */}
          {vehicle.photos && vehicle.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {vehicle.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Vehicle photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit}
            className="flex-1 bg-primary hover:bg-primary/90"
            disabled={!vehicle.make || !vehicle.model || !vehicle.chassisNumber}
          >
            Load Vehicle
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleLoadingForm;