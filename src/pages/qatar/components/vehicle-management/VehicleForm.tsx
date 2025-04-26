
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface VehicleFormProps {
  onCancel: () => void;
  initialData?: any;
  isEditing?: boolean;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onCancel, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: initialData?.vehicleNumber || "",
    type: initialData?.type || "LORRY",
    make: initialData?.make || "",
    model: initialData?.model || "",
    year: initialData?.year || new Date().getFullYear(),
    plateNumber: initialData?.plateNumber || "",
    registrationDate: initialData?.registrationDate || new Date().toISOString().split('T')[0],
    status: initialData?.status || "RUN",
    driver: initialData?.driver || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.vehicleNumber || !formData.make || !formData.model) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Here we would normally save the vehicle
    console.log("Saving vehicle:", formData);
    
    toast.success(`Vehicle ${isEditing ? "updated" : "added"} successfully!`);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-1">
          <Label htmlFor="vehicleNumber">Vehicle Number *</Label>
          <Input
            id="vehicleNumber"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleInputChange}
            placeholder="Enter Vehicle Number"
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="type">Vehicle Type *</Label>
          <Select
            name="type"
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LORRY">Lorry</SelectItem>
              <SelectItem value="TRUCK">Truck</SelectItem>
              <SelectItem value="VAN">Van</SelectItem>
              <SelectItem value="PICKUP">Pickup</SelectItem>
              <SelectItem value="FORK LIFT">Fork Lift</SelectItem>
              <SelectItem value="CRANE TRUCK">Crane Truck</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="make">Make *</Label>
          <Input
            id="make"
            name="make"
            value={formData.make}
            onChange={handleInputChange}
            placeholder="Enter Make"
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            name="model"
            value={formData.model}
            onChange={handleInputChange}
            placeholder="Enter Model"
            required
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            placeholder="Enter Year"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="plateNumber">Plate Number</Label>
          <Input
            id="plateNumber"
            name="plateNumber"
            value={formData.plateNumber}
            onChange={handleInputChange}
            placeholder="Enter Plate Number"
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="registrationDate">Registration Date</Label>
          <Input
            id="registrationDate"
            name="registrationDate"
            type="date"
            value={formData.registrationDate}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            value={formData.status}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RUN">Running</SelectItem>
              <SelectItem value="MAINTENANCE">In Maintenance</SelectItem>
              <SelectItem value="GARAGE">In Garage</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="driver">Assigned Driver</Label>
          <Input
            id="driver"
            name="driver"
            value={formData.driver}
            onChange={handleInputChange}
            placeholder="Enter Driver Name"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update" : "Save"} Vehicle
        </Button>
      </div>
    </form>
  );
};

export default VehicleForm;
