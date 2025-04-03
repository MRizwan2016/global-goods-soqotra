
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { QatarContainer } from "../../types/containerTypes";

interface AddContainerProps {
  containerData?: QatarContainer;
  isEditing?: boolean;
  onSubmit: (container: QatarContainer) => void;
  onCancel: () => void;
}

const AddContainer: React.FC<AddContainerProps> = ({
  containerData,
  isEditing = false,
  onSubmit,
  onCancel
}) => {
  const [container, setContainer] = useState<QatarContainer>({
    id: uuidv4(),
    containerNumber: "",
    containerType: "20FT",
    runningNumber: "",
    status: "Available",
    shippingLine: "MSC",
    direction: "Export",
    sector: "QAT-KEN",
    etd: "",
    eta: "",
    ...containerData
  });
  
  const handleChange = (field: string, value: string) => {
    setContainer(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNumberChange = (field: string, value: string) => {
    // For fields that should be numbers
    const numValue = value === "" ? 0 : parseFloat(value);
    setContainer(prev => ({
      ...prev,
      [field]: numValue
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate running number if not provided
    if (!container.runningNumber) {
      const date = new Date();
      const year = date.getFullYear().toString().substring(2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      
      setContainer(prev => ({
        ...prev,
        runningNumber: `C${year}${month}${random}`
      }));
    }
    
    onSubmit(container);
  };

  useEffect(() => {
    // If editing, update the state with the container data
    if (containerData && isEditing) {
      setContainer(containerData);
    }
  }, [containerData, isEditing]);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          {isEditing ? "Edit Container" : "Add New Container"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="containerNumber" className="font-semibold">
                Container Number*
              </Label>
              <Input
                id="containerNumber"
                value={container.containerNumber}
                onChange={(e) => handleChange("containerNumber", e.target.value)}
                placeholder="e.g., ABCD1234567"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="containerType" className="font-semibold">
                Container Type
              </Label>
              <Select
                value={container.containerType}
                onValueChange={(value) => handleChange("containerType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select container type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20FT">20FT</SelectItem>
                  <SelectItem value="40FT">40FT</SelectItem>
                  <SelectItem value="40HC">40HC</SelectItem>
                  <SelectItem value="45HC">45HC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="sector" className="font-semibold">
                Sector
              </Label>
              <Select
                value={container.sector || "QAT-KEN"}
                onValueChange={(value) => handleChange("sector", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="QAT-KEN">QAT-KEN</SelectItem>
                  <SelectItem value="QAT-LKA">QAT-LKA</SelectItem>
                  <SelectItem value="QAT-IND">QAT-IND</SelectItem>
                  <SelectItem value="QAT-PAK">QAT-PAK</SelectItem>
                  <SelectItem value="QAT-BGD">QAT-BGD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status" className="font-semibold">
                Status
              </Label>
              <Select
                value={container.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Loading">Loading</SelectItem>
                  <SelectItem value="Loaded">Loaded</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="runningNumber" className="font-semibold">
                Running Number
              </Label>
              <Input
                id="runningNumber"
                value={container.runningNumber || ""}
                onChange={(e) => handleChange("runningNumber", e.target.value)}
                placeholder="Auto-generated if left empty"
              />
            </div>
            
            <div>
              <Label htmlFor="shippingLine" className="font-semibold">
                Shipping Line
              </Label>
              <Select
                value={container.shippingLine || "MSC"}
                onValueChange={(value) => handleChange("shippingLine", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping line" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MSC">MSC</SelectItem>
                  <SelectItem value="CMA CGM">CMA CGM</SelectItem>
                  <SelectItem value="MAERSK">MAERSK</SelectItem>
                  <SelectItem value="EVERGREEN">EVERGREEN</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="direction" className="font-semibold">
                Direction
              </Label>
              <Select
                value={container.direction || "Export"}
                onValueChange={(value) => handleChange("direction", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Export">Export</SelectItem>
                  <SelectItem value="Import">Import</SelectItem>
                  <SelectItem value="Transit">Transit</SelectItem>
                  <SelectItem value="MIX">Mix</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="etd" className="font-semibold">
                  ETD (Departure)
                </Label>
                <Input
                  id="etd"
                  type="date"
                  value={container.etd || ""}
                  onChange={(e) => handleChange("etd", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="eta" className="font-semibold">
                  ETA (Arrival)
                </Label>
                <Input
                  id="eta"
                  type="date"
                  value={container.eta || ""}
                  onChange={(e) => handleChange("eta", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            {isEditing ? "Update Container" : "Save Container"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddContainer;
