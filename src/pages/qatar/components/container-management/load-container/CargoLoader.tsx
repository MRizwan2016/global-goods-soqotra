import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ContainerCargo } from "../../../types/containerTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Package, Plus } from "lucide-react";

interface CargoLoaderProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoLoader: React.FC<CargoLoaderProps> = ({ containerId, onAddCargo }) => {
  const [cargoForm, setCargoForm] = useState({
    invoiceNumber: "",
    lineNumber: "",
    barcode: "",
    packageName: "",
    volume: "",
    weight: "",
    shipper: "",
    consignee: "",
    wh: "WH001",
    d2d: false,
    quantity: "1"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCargoForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleAddCargo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!cargoForm.invoiceNumber || !cargoForm.packageName || !cargoForm.volume || !cargoForm.weight) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create cargo item
    const newCargo: ContainerCargo = {
      id: uuidv4(),
      containerId: containerId,
      invoiceNumber: cargoForm.invoiceNumber,
      lineNumber: cargoForm.lineNumber || `LN${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: cargoForm.barcode || `BC${Math.floor(100000000 + Math.random() * 900000000)}`,
      packageName: cargoForm.packageName,
      volume: parseFloat(cargoForm.volume),
      weight: parseFloat(cargoForm.weight),
      shipper: cargoForm.shipper,
      consignee: cargoForm.consignee,
      wh: cargoForm.wh,
      d2d: cargoForm.d2d,
      quantity: parseInt(cargoForm.quantity) || 1
    };
    
    // Add to parent component
    onAddCargo(newCargo);
    
    // Reset form for invoice number only, keep other fields
    setCargoForm(prev => ({
      ...prev,
      invoiceNumber: "",
      lineNumber: "",
      barcode: ""
    }));
    
    // Show success toast
    toast.success("Cargo added successfully");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Package className="mr-2" size={18} />
          Quick Cargo Entry
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleAddCargo} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number*</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={cargoForm.invoiceNumber}
                onChange={handleChange}
                placeholder="e.g. INV12345"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="lineNumber">Line Number</Label>
              <Input
                id="lineNumber"
                name="lineNumber"
                value={cargoForm.lineNumber}
                onChange={handleChange}
                placeholder="e.g. LN001"
              />
            </div>
            
            <div>
              <Label htmlFor="barcode">Barcode</Label>
              <Input
                id="barcode"
                name="barcode"
                value={cargoForm.barcode}
                onChange={handleChange}
                placeholder="e.g. BC123456789"
              />
            </div>
            
            <div>
              <Label htmlFor="packageName">Package Name*</Label>
              <Input
                id="packageName"
                name="packageName"
                value={cargoForm.packageName}
                onChange={handleChange}
                placeholder="e.g. Electronics"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="volume">Volume (m³)*</Label>
              <Input
                id="volume"
                name="volume"
                type="number"
                step="0.001"
                value={cargoForm.volume}
                onChange={handleChange}
                placeholder="e.g. 1.5"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="weight">Weight (kg)*</Label>
              <Input
                id="weight"
                name="weight"
                type="number"
                step="0.01"
                value={cargoForm.weight}
                onChange={handleChange}
                placeholder="e.g. 250"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantity*</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                value={cargoForm.quantity}
                onChange={handleChange}
                placeholder="e.g. 1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="shipper">Shipper</Label>
              <Input
                id="shipper"
                name="shipper"
                value={cargoForm.shipper}
                onChange={handleChange}
                placeholder="e.g. ABC Company"
              />
            </div>
            
            <div>
              <Label htmlFor="consignee">Consignee</Label>
              <Input
                id="consignee"
                name="consignee"
                value={cargoForm.consignee}
                onChange={handleChange}
                placeholder="e.g. XYZ Company"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Plus size={16} />
              Add Cargo
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CargoLoader;
