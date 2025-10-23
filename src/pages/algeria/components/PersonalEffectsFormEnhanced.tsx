import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Package } from "lucide-react";
import { PersonalEffects, PERSONAL_EFFECTS_RATE } from "../types/algeriaTypes";
import { HOUSEHOLD_ITEMS, ITEM_CATEGORIES, HouseholdItem } from "../data/householdItems";

interface PersonalEffectsFormEnhancedProps {
  onPersonalEffectsAdd: (effects: Omit<PersonalEffects, 'id'>) => void;
  onCancel: () => void;
  vehicleOwnerName?: string;
}

const PersonalEffectsFormEnhanced: React.FC<PersonalEffectsFormEnhancedProps> = ({
  onPersonalEffectsAdd,
  onCancel,
  vehicleOwnerName = ""
}) => {
  const [effects, setEffects] = useState<Partial<PersonalEffects>>({
    description: "",
    quantity: 1,
    volume: 0,
    weight: 0,
    photos: [],
    hsCode: "980100",
    charges: 0,
    ownerName: vehicleOwnerName,
    loadingLocation: "OUTSIDE_CAR",
    requiresHBL: true,
    itemCategory: ""
  });

  const [photoInput, setPhotoInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<HouseholdItem | null>(null);

  const calculateWeightFromVolume = (volume: number): number => {
    return volume * 1000;
  };

  const handleItemSelect = (itemName: string) => {
    const item = HOUSEHOLD_ITEMS.find(i => i.name === itemName);
    if (item) {
      setSelectedItem(item);
      const volume = item.avgVolumeCBM || 0;
      const weight = calculateWeightFromVolume(volume);
      
      setEffects(prev => ({
        ...prev,
        description: item.name,
        itemCategory: item.category,
        volume,
        weight,
        charges: prev.loadingLocation === "OUTSIDE_CAR" ? volume * PERSONAL_EFFECTS_RATE : 0
      }));
    }
  };

  const handleVolumeChange = (volume: number) => {
    const weight = calculateWeightFromVolume(volume);
    setEffects(prev => {
      const charges = prev.loadingLocation === "OUTSIDE_CAR" ? volume * PERSONAL_EFFECTS_RATE : 0;
      const requiresHBL = prev.loadingLocation === "OUTSIDE_CAR";
      return {
        ...prev,
        volume,
        weight,
        charges,
        requiresHBL
      };
    });
  };

  const handleLoadingLocationChange = (location: "INSIDE_CAR" | "OUTSIDE_CAR") => {
    setEffects(prev => {
      const charges = location === "OUTSIDE_CAR" ? (prev.volume || 0) * PERSONAL_EFFECTS_RATE : 0;
      const requiresHBL = location === "OUTSIDE_CAR";
      return {
        ...prev,
        loadingLocation: location,
        charges,
        requiresHBL
      };
    });
  };

  const handleAddPhoto = () => {
    if (photoInput.trim()) {
      setEffects({
        ...effects,
        photos: [...(effects.photos || []), photoInput.trim()]
      });
      setPhotoInput("");
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...(effects.photos || [])];
    newPhotos.splice(index, 1);
    setEffects({
      ...effects,
      photos: newPhotos
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEffects({
          ...effects,
          photos: [...(effects.photos || []), result]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (effects.description && effects.quantity && effects.volume && effects.ownerName) {
      onPersonalEffectsAdd(effects as Omit<PersonalEffects, 'id'>);
    }
  };

  const handleSubmitAndAddAnother = () => {
    if (effects.description && effects.quantity && effects.volume && effects.ownerName) {
      onPersonalEffectsAdd(effects as Omit<PersonalEffects, 'id'>);
      setEffects({
        description: '',
        quantity: 1,
        volume: 0,
        weight: 0,
        hsCode: '980100',
        ownerName: vehicleOwnerName || '',
        loadingLocation: 'INSIDE_CAR',
        requiresHBL: false,
        charges: 0,
        photos: [],
        itemCategory: ''
      });
      setPhotoInput('');
      setSelectedCategory('All');
      setSelectedItem(null);
    }
  };

  const filteredItems = selectedCategory === "All" 
    ? HOUSEHOLD_ITEMS 
    : HOUSEHOLD_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Personal Effects & Household Goods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Item Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Item Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {ITEM_CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Predefined Items</label>
            <Select onValueChange={handleItemSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select an item or enter manually" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {filteredItems.map(item => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name} ({item.avgVolumeCBM || 0} CBM)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description *</label>
            <Input
              value={effects.description}
              onChange={(e) => setEffects({...effects, description: e.target.value})}
              placeholder="Describe the items"
              className="border-2 border-red-300"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Owner Name *</label>
            <Input
              value={effects.ownerName}
              onChange={(e) => setEffects({...effects, ownerName: e.target.value})}
              placeholder="Enter owner's name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Loading Location *</label>
            <Select 
              value={effects.loadingLocation} 
              onValueChange={(value) => handleLoadingLocationChange(value as "INSIDE_CAR" | "OUTSIDE_CAR")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OUTSIDE_CAR">Outside Car (Charges Apply)</SelectItem>
                <SelectItem value="INSIDE_CAR">Inside Car (No Charges)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quantity and Volume */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium">Quantity</label>
            <Input
              type="number"
              value={effects.quantity}
              onChange={(e) => setEffects({...effects, quantity: Number(e.target.value)})}
              min="1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Volume (CBM)</label>
            <Input
              type="number"
              step="0.001"
              value={effects.volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              placeholder="1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Gross Weight (KG)</label>
            <Input
              type="number"
              step="0.1"
              value={effects.weight}
              onChange={(e) => setEffects({...effects, weight: Number(e.target.value)})}
              placeholder="0"
              className="bg-gray-50"
              readOnly
            />
            <p className="text-xs text-muted-foreground mt-1">Auto-calculated: 1 CBM = 1000 KG</p>
          </div>
          <div>
            <label className="text-sm font-medium">HS Code</label>
            <Input
              value={effects.hsCode}
              onChange={(e) => setEffects({...effects, hsCode: e.target.value})}
              placeholder="980100"
            />
          </div>
        </div>

        {/* Charging Information */}
        <div className={`p-4 rounded-lg border-2 ${effects.loadingLocation === "INSIDE_CAR" ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {effects.loadingLocation === "INSIDE_CAR" 
                  ? "✓ No charges applied - Personal effects loaded inside the car"
                  : `⚠️ CHARGES: QAR ${effects.charges?.toFixed(0)} (QAR ${PERSONAL_EFFECTS_RATE}/CBM)`
                }
              </p>
              {effects.loadingLocation === "OUTSIDE_CAR" && (
                <p className="text-xs text-blue-600 mt-1 font-medium">
                  HBL REQUIRED
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-4">
          <label className="text-sm font-medium">Photos</label>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                placeholder="Paste image URL or take photo"
              />
            </div>
            <Button onClick={handleAddPhoto} variant="outline" size="sm">
              Add URL
            </Button>
            <label className="cursor-pointer">
              <Button variant="outline" size="sm" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {effects.photos && effects.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {effects.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Personal effects photo ${index + 1}`}
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
            disabled={!effects.description || !effects.quantity || !effects.volume || !effects.ownerName}
          >
            Add Package
          </Button>
          <Button 
            onClick={handleSubmitAndAddAnother}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            disabled={!effects.description || !effects.quantity || !effects.volume || !effects.ownerName}
          >
            Add & Continue
          </Button>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex-1"
          >
            Done
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalEffectsFormEnhanced;
