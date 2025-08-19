import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, X, Package } from "lucide-react";
import { PersonalEffects, PERSONAL_EFFECTS_RATE } from "../types/tunisiaTypes";

interface PersonalEffectsFormProps {
  onPersonalEffectsAdd: (effects: Omit<PersonalEffects, 'id'>) => void;
  onCancel: () => void;
}

const PersonalEffectsForm: React.FC<PersonalEffectsFormProps> = ({
  onPersonalEffectsAdd,
  onCancel
}) => {
  const [effects, setEffects] = useState<Partial<PersonalEffects>>({
    description: "",
    quantity: 1,
    volume: 0,
    photos: [],
    hsCode: "980100",
    charges: 0
  });

  const [photoInput, setPhotoInput] = useState("");

  const handleVolumeChange = (volume: number) => {
    setEffects({
      ...effects,
      volume,
      charges: volume * PERSONAL_EFFECTS_RATE
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
    if (effects.description && effects.quantity && effects.volume) {
      onPersonalEffectsAdd(effects as Omit<PersonalEffects, 'id'>);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Personal Effects & Household Goods
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={effects.description}
              onChange={(e) => setEffects({...effects, description: e.target.value})}
              placeholder="PERSONAL EFFECTS & HOUSEHOLD GOODS"
              rows={3}
            />
          </div>
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
            <label className="text-sm font-medium">HS Code</label>
            <Input
              value={effects.hsCode}
              onChange={(e) => setEffects({...effects, hsCode: e.target.value})}
              placeholder="980100"
            />
          </div>
        </div>

        {/* Volume and Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Volume (CBM)</label>
            <Input
              type="number"
              step="0.01"
              value={effects.volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Rate (QAR/CBM)</label>
            <Input
              value={PERSONAL_EFFECTS_RATE}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Total Charges (QAR)</label>
            <Input
              value={effects.charges?.toFixed(2)}
              disabled
              className="bg-gray-100 font-semibold text-primary"
            />
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="space-y-4">
          <label className="text-sm font-medium">Photos</label>
          
          {/* Photo Upload Methods */}
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

          {/* Photo Preview */}
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
            disabled={!effects.description || !effects.quantity || !effects.volume}
          >
            Add Personal Effects
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

export default PersonalEffectsForm;