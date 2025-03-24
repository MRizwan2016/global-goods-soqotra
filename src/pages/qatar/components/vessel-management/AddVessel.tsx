
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

interface AddVesselProps {
  onVesselCreated: () => void;
  onCancel: () => void;
}

const AddVessel: React.FC<AddVesselProps> = ({ onVesselCreated, onCancel }) => {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    runningNumber: "",
    vesselName: "",
    voyage: "",
    portOfLoading: "",
    portOfDischarge: "",
    shippingLine: "",
    direction: "MIX",
    masterBL: "",
    etd: "",
    eta: "",
    sector: "COLOMBO"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.runningNumber || !formData.vesselName || !formData.voyage) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would save to an API
    console.log("Saving vessel:", formData);
    
    // Show success message
    toast.success(`Vessel ${formData.vesselName} created successfully`);
    
    // Call callback
    onVesselCreated();
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-green-50 border-b border-green-100">
        <CardTitle className="text-xl text-green-800">Add New Vessel</CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="sector" className="block text-sm font-medium">SECTOR:</label>
                <Select 
                  value={formData.sector} 
                  onValueChange={(value) => handleSelectChange("sector", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COLOMBO">COLOMBO : C</SelectItem>
                    <SelectItem value="GALLE">GALLE : G</SelectItem>
                    <SelectItem value="KURUNEGALA">KURUNEGALA : K</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="runningNumber" className="block text-sm font-medium">RUNNING NUMBER:</label>
                <Input
                  id="runningNumber"
                  name="runningNumber"
                  value={formData.runningNumber}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="shippingLine" className="block text-sm font-medium">SHIPPING LINE:</label>
                <Select 
                  value={formData.shippingLine} 
                  onValueChange={(value) => handleSelectChange("shippingLine", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Shipping Line" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ABUDHABI SHIPPING">ABUDHABI SHIPPING : ADS</SelectItem>
                    <SelectItem value="MAERSK LINE">MAERSK LINE : MSK</SelectItem>
                    <SelectItem value="MSC">MSC</SelectItem>
                    <SelectItem value="CMA CGM">CMA CGM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="vesselName" className="block text-sm font-medium">VESSEL NAME:</label>
                <Input
                  id="vesselName"
                  name="vesselName"
                  value={formData.vesselName}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="masterBL" className="block text-sm font-medium">MASTER BILL OF LADING:</label>
                <Input
                  id="masterBL"
                  name="masterBL"
                  value={formData.masterBL}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="voyage" className="block text-sm font-medium">VOYAGE:</label>
                <Input
                  id="voyage"
                  name="voyage"
                  value={formData.voyage}
                  onChange={handleInputChange}
                  className="w-full"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="portOfLoading" className="block text-sm font-medium">PORT OF LOADING:</label>
                <Input
                  id="portOfLoading"
                  name="portOfLoading"
                  value={formData.portOfLoading}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="portOfDischarge" className="block text-sm font-medium">PORT OF DISCHARGE:</label>
                <Input
                  id="portOfDischarge"
                  name="portOfDischarge"
                  value={formData.portOfDischarge}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="direction" className="block text-sm font-medium">DIRECT/ MIX:</label>
                <Select 
                  value={formData.direction} 
                  onValueChange={(value) => handleSelectChange("direction", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DIRECT">DIRECT</SelectItem>
                    <SelectItem value="MIX">MIX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="etd" className="block text-sm font-medium">E.T.D:</label>
                <Input
                  id="etd"
                  name="etd"
                  type="date"
                  value={formData.etd}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="eta" className="block text-sm font-medium">E.T.A:</label>
                <Input
                  id="eta"
                  name="eta"
                  type="date"
                  value={formData.eta}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddVessel;
