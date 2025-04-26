
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { QatarVehicle } from "../../types/vehicleTypes";
import { v4 as uuidv4 } from 'uuid';

interface VehicleFormProps {
  vehicleToEdit?: QatarVehicle;
  onCancel: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ vehicleToEdit, onCancel }) => {
  const isEditMode = !!vehicleToEdit;
  
  const [formData, setFormData] = useState<Partial<QatarVehicle>>({
    id: vehicleToEdit?.id || uuidv4(),
    number: vehicleToEdit?.number || "",
    type: vehicleToEdit?.type || "LORRY",
    description: vehicleToEdit?.description || "",
    status: vehicleToEdit?.status || "RUN",
    licenseExpiry: vehicleToEdit?.licenseExpiry || "",
    insuranceExpiry: vehicleToEdit?.insuranceExpiry || "",
    mileage: vehicleToEdit?.mileage || "0"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.number || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real application, this would save the vehicle data to a backend API
    console.log("Saving vehicle:", formData);
    
    // For demonstration purposes, we'll update localStorage
    try {
      const existingVehicles = JSON.parse(localStorage.getItem('qatarVehicles') || JSON.stringify([]));
      
      if (isEditMode) {
        // Update existing vehicle
        const updatedVehicles = existingVehicles.map((vehicle: QatarVehicle) => 
          vehicle.id === formData.id ? {...formData as QatarVehicle} : vehicle
        );
        localStorage.setItem('qatarVehicles', JSON.stringify(updatedVehicles));
      } else {
        // Add new vehicle
        existingVehicles.push(formData);
        localStorage.setItem('qatarVehicles', JSON.stringify(existingVehicles));
      }
      
      toast.success(`Vehicle ${isEditMode ? "updated" : "added"} successfully`);
      onCancel();
    } catch (error) {
      console.error("Error saving vehicle data:", error);
      toast.error("Failed to save vehicle data");
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-blue-50">
        <CardTitle>{isEditMode ? "Edit Vehicle" : "Add New Vehicle"}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="number">Vehicle Number *</Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Enter vehicle number"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Vehicle Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LORRY">Lorry</SelectItem>
                  <SelectItem value="TRUCK">Truck</SelectItem>
                  <SelectItem value="FORK LIFT">Fork Lift</SelectItem>
                  <SelectItem value="PICKUP">Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter vehicle description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange("status", value as "RUN" | "GARAGE" | "MAINTENANCE")}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RUN">RUN</SelectItem>
                  <SelectItem value="GARAGE">GARAGE</SelectItem>
                  <SelectItem value="MAINTENANCE">MAINTENANCE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="licenseExpiry">License Expiry</Label>
              <Input
                id="licenseExpiry"
                name="licenseExpiry"
                type="text"
                value={formData.licenseExpiry}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceExpiry">Insurance Expiry</Label>
              <Input
                id="insuranceExpiry"
                name="insuranceExpiry"
                type="text"
                value={formData.insuranceExpiry}
                onChange={handleInputChange}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="Enter current mileage"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditMode ? "Update Vehicle" : "Add Vehicle"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
