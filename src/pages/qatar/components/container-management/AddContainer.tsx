
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, PackageCheck, ArrowLeft } from "lucide-react";
import { QatarContainer } from "../../types/containerTypes";
import { containerTypes, directionTypes, getNextRunningNumber, mockContainers } from "../../data/mockContainers";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import ShippingLineSelector from "./ShippingLineSelector";

// Update the sectors constant with additional countries
const sectors = [
  { id: "DOHA", name: "DOHA" },
  { id: "SAUDI ARABIA", name: "SAUDI ARABIA" },
  { id: "OMAN", name: "OMAN" },
  { id: "UGANDA", name: "UGANDA" },
  { id: "KENYA", name: "KENYA" },
  { id: "TUNISIA", name: "TUNISIA" },
  { id: "ERITREA", name: "ERITREA" },
  { id: "SUDAN", name: "SUDAN" },
  { id: "SOMALIA", name: "SOMALIA" },
  { id: "ETHIOPIA", name: "ETHIOPIA" }
];

// Update direction types with additional destinations
const destinations = [
  { id: "DIRECT", name: "DIRECT" },
  { id: "MIX", name: "MIX" },
  { id: "MOMBASA CFS", name: "MOMBASA CFS" },
  { id: "NAIROBI CFS", name: "NAIROBI CFS" },
  { id: "ASMARA CFS", name: "ASMARA CFS" },
  { id: "HARGEISA CFS", name: "HARGEISA CFS" },
  { id: "BERBARA CFS", name: "BERBARA CFS" },
  { id: "PORT SUDAN", name: "PORT SUDAN" },
  { id: "TUNIS CFS", name: "TUNIS CFS" },
  { id: "ADDIS ABABA", name: "ADDIS ABABA" },
  { id: "KAMPALA CFS", name: "KAMPALA CFS" },
  { id: "SOHAR CFS", name: "SOHAR CFS" },
  { id: "DAMMAM CFS", name: "DAMMAM CFS" },
  { id: "RIYADH CFS", name: "RIYADH CFS" },
  { id: "JEDDAH CFS", name: "JEDDAH CFS" },
  { id: "GALLE CFS", name: "GALLE CFS" }
];

interface AddContainerProps {
  onContainerCreated: () => void;
  onCancel: () => void;
}

const AddContainer: React.FC<AddContainerProps> = ({ onContainerCreated, onCancel }) => {
  const [sector, setSector] = useState("");
  const [runningNumber, setRunningNumber] = useState(getNextRunningNumber() + " C");
  const [containerNumber, setContainerNumber] = useState("");
  const [sealNumber, setSealNumber] = useState("");
  const [containerType, setContainerType] = useState("");
  const [direction, setDirection] = useState("");
  const [weight, setWeight] = useState("0");
  const [etd, setEtd] = useState("");
  const [eta, setEta] = useState("");
  const [shippingLine, setShippingLine] = useState("");
  
  const handleSave = () => {
    // Validation
    if (!sector || !containerNumber || !sealNumber || !containerType || !direction || !etd || !eta || !shippingLine) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Create new container
    const newContainer: QatarContainer = {
      id: uuidv4(),
      runningNumber: runningNumber.split(" ")[0],
      containerNumber,
      sealNumber,
      containerType: containerType as any,
      direction: direction as any,
      etd,
      eta,
      loadDate: new Date().toLocaleDateString("en-GB"),
      weight: parseFloat(weight),
      status: "NEW",
      sector,
      shippingLine
    };
    
    // Add to mock data (in real app would save to backend)
    mockContainers.push(newContainer);
    
    // Notify parent
    onContainerCreated();
    
    // Show success message
    toast.success("Container added successfully");
  };
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <PlusCircle className="mr-2 text-green-600" size={22} />
          Add Container
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <Label htmlFor="sector" className="font-bold text-gray-700 mb-1 block">SECTOR:</Label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger 
                  id="sector" 
                  className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
                >
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-white z-50">
                  {sectors.map(option => (
                    <SelectItem 
                      key={option.id} 
                      value={option.id}
                      className="py-2 hover:bg-blue-50 transition-colors"
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="runningNumber" className="font-bold text-gray-700 mb-1 block">RUNNING NUMBER:</Label>
              <Input
                id="runningNumber"
                value={runningNumber}
                onChange={(e) => setRunningNumber(e.target.value)}
                className="bg-gray-100 border-gray-300"
                readOnly
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="containerNumber" className="font-bold text-gray-700 mb-1 block">CONTAINER NUMBER:</Label>
              <Input
                id="containerNumber"
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
                placeholder="Enter container number"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="sealNumber" className="font-bold text-gray-700 mb-1 block">SEAL NUMBER:</Label>
              <Input
                id="sealNumber"
                value={sealNumber}
                onChange={(e) => setSealNumber(e.target.value)}
                placeholder="Enter seal number"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="weight" className="font-bold text-gray-700 mb-1 block">WEIGHT:</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            
            <ShippingLineSelector 
              value={shippingLine}
              onChange={setShippingLine}
            />
          </div>
          
          <div>
            <div className="mb-4">
              <Label htmlFor="containerType" className="font-bold text-gray-700 mb-1 block">CONTAINER TYPE:</Label>
              <Select value={containerType} onValueChange={setContainerType}>
                <SelectTrigger 
                  id="containerType" 
                  className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
                >
                  <SelectValue placeholder="Select Container Type" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-white z-50">
                  {containerTypes.map(type => (
                    <SelectItem 
                      key={type.id} 
                      value={type.id}
                      className="py-2 hover:bg-blue-50 transition-colors"
                    >
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="direction" className="font-bold text-gray-700 mb-1 block">DIRECT/MIX:</Label>
              <Select value={direction} onValueChange={setDirection}>
                <SelectTrigger 
                  id="direction" 
                  className="bg-blue-500 text-white font-semibold border-0 hover:bg-blue-600 transition-colors"
                >
                  <SelectValue placeholder="Select Direction" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-white z-50">
                  {destinations.map(direction => (
                    <SelectItem 
                      key={direction.id} 
                      value={direction.id}
                      className="py-2 hover:bg-blue-50 transition-colors"
                    >
                      {direction.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mb-4">
              <Label htmlFor="etd" className="font-bold text-gray-700 mb-1 block">E.T.D:</Label>
              <Input
                id="etd"
                value={etd}
                onChange={(e) => setEtd(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="eta" className="font-bold text-gray-700 mb-1 block">E.T.A:</Label>
              <Input
                id="eta"
                value={eta}
                onChange={(e) => setEta(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
          </div>
        </Grid>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            onClick={handleSave}
          >
            <PackageCheck size={16} />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddContainer;
