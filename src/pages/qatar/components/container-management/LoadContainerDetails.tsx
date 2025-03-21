
import React, { useState, useEffect } from "react";
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
import { 
  Package, 
  ArrowLeft, 
  Search, 
  Barcode, 
  LayoutList,
  Plus,
  Trash2,
  Save
} from "lucide-react";
import { ContainerCargo, QatarContainer } from "../../types/containerTypes";
import { mockCargoItems, mockConsigneeList, mockContainers, mockUnsettledInvoices } from "../../data/mockContainers";
import { v4 as uuidv4 } from "uuid";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { toast } from "sonner";

interface LoadContainerDetailsProps {
  containerId: string;
  onCargoLoaded: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({ 
  containerId, 
  onCargoLoaded, 
  onCancel 
}) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  
  // Form fields for adding items
  const [searchBy, setSearchBy] = useState("GY");
  const [bookingForm, setBookingForm] = useState("");
  const [barcode, setBarcode] = useState("");
  const [packageNumber, setPackageNumber] = useState("");
  const [packageName, setPackageName] = useState("");
  const [shipper, setShipper] = useState("");
  
  // Mock data for currently entered cargo
  const [currentCargo, setCurrentCargo] = useState<ContainerCargo[]>([]);
  
  // Load container data
  useEffect(() => {
    const foundContainer = mockContainers.find(c => c.id === containerId);
    if (foundContainer) {
      setContainer(foundContainer);
    }
    
    // Get cargo items for this container
    const containerCargoItems = mockCargoItems.filter(item => item.containerId === containerId);
    setCargoItems(containerCargoItems);
  }, [containerId]);
  
  const handleInsertCargo = () => {
    if (!packageName || !shipper) {
      toast.error("Package name and shipper are required");
      return;
    }
    
    const newCargoItem: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber: bookingForm || "/00000000/N",
      lineNumber: "1",
      barcode: barcode || undefined,
      packageName,
      volume: 0.1,
      weight: 10,
      shipper,
      consignee: shipper,
      wh: "K",
      d2d: false
    };
    
    setCurrentCargo([...currentCargo, newCargoItem]);
    
    // Clear form fields
    setPackageName("");
    setShipper("");
    setBarcode("");
    
    toast.success("Item added to cargo list");
  };
  
  const handleSave = () => {
    if (currentCargo.length === 0) {
      toast.error("No cargo items to save");
      return;
    }
    
    // In a real app, we would save to the backend
    // For now, just update the mock data
    mockCargoItems.push(...currentCargo);
    
    // Update container status
    if (container) {
      container.status = "LOADED";
      container.packages = currentCargo.length;
      
      // Calculate total volume
      const totalVolume = currentCargo.reduce((sum, item) => sum + item.volume, 0);
      container.volume = parseFloat(totalVolume.toFixed(3));
      
      // Calculate total weight
      const totalWeight = currentCargo.reduce((sum, item) => sum + item.weight, 0);
      container.weight = parseFloat(totalWeight.toFixed(2));
    }
    
    // Notify parent
    onCargoLoaded();
    
    toast.success("Container cargo saved successfully");
  };
  
  const handleRemoveItem = (id: string) => {
    setCurrentCargo(currentCargo.filter(item => item.id !== id));
    toast.success("Item removed from cargo list");
  };
  
  if (!container) {
    return <div>Loading container details...</div>;
  }
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <Package className="mr-2 text-blue-600" size={22} />
          Load Sea Cargo
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="bg-blue-600 text-white text-center py-2 mb-4 font-bold">
          CONTAINER DETAILS
        </div>
        
        <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-bold text-gray-700 mb-1 block">SECTOR:</Label>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                  {container.sector}
                </div>
              </div>
              
              <div>
                <Label className="font-bold text-gray-700 mb-1 block">RUNNING NUMBER:</Label>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                  {container.runningNumber}
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">CONTAINER NUMBER:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.containerNumber}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">SEAL NUMBER:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.sealNumber}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">DATE LOAD:</Label>
              <Input
                value={container.loadDate}
                onChange={(e) => {
                  setContainer({...container, loadDate: e.target.value});
                }}
              />
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">WEIGHT:</Label>
              <Input
                type="number"
                value={container.weight?.toString() || "0"}
                onChange={(e) => {
                  setContainer({...container, weight: parseFloat(e.target.value)});
                }}
              />
            </div>
          </div>
          
          <div>
            <div>
              <Label className="font-bold text-gray-700 mb-1 block">CONTAINER TYPE:</Label>
              <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
                {container.containerType}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">DIRECT/ MIX:</Label>
              <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
                {container.direction}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">E.T.D:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.etd}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">E.T.A:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.eta}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">PACKAGES:</Label>
              <Input
                type="number"
                value={(container.packages || 0).toString()}
                onChange={(e) => {
                  setContainer({...container, packages: parseInt(e.target.value)});
                }}
              />
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">VOLUME:</Label>
              <Input
                type="number"
                value={(container.volume || 0).toString()}
                onChange={(e) => {
                  setContainer({...container, volume: parseFloat(e.target.value)});
                }}
              />
            </div>
          </div>
        </Grid>
        
        <div className="mt-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="font-bold text-gray-700 mb-1 block">SEARCH BY:</Label>
              <Select value={searchBy} onValueChange={setSearchBy}>
                <SelectTrigger className="bg-blue-500 text-white">
                  <SelectValue placeholder="GY" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GY">GY</SelectItem>
                  <SelectItem value="BARCODE">BARCODE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="col-span-2">
              <Label className="font-bold text-gray-700 mb-1 block">SEARCH BOOKING FORM:</Label>
              <div className="flex gap-2">
                <Input
                  value={bookingForm}
                  onChange={(e) => setBookingForm(e.target.value)}
                  placeholder="Enter booking form number"
                  className="flex-1"
                />
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Insert
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">SEARCH BARCODE:</Label>
            <div className="flex gap-2 items-center">
              <Barcode size={24} className="text-gray-700" />
              <Input
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="BARCODE"
                className="flex-1"
              />
            </div>
          </div>
          
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">BOOKING FORM:</Label>
            <Input
              value={bookingForm}
              onChange={(e) => setBookingForm(e.target.value)}
              className="bg-gray-100"
              readOnly
            />
          </div>
          
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NUMBER:</Label>
            <Input
              value={packageNumber}
              onChange={(e) => setPackageNumber(e.target.value)}
            />
          </div>
          
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">PACKAGE NAME:</Label>
            <Input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
          </div>
          
          <div>
            <Label className="font-bold text-gray-700 mb-1 block">SHIPPER:</Label>
            <Input
              value={shipper}
              onChange={(e) => setShipper(e.target.value)}
            />
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={handleInsertCargo}
            >
              <Plus size={18} />
              Insert
            </Button>
          </div>
        </div>
        
        {currentCargo.length > 0 && (
          <div className="mt-6">
            <div className="bg-blue-600 text-white py-1 mb-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white font-semibold text-center">Num</TableHead>
                    <TableHead className="text-white font-semibold">INVOICE</TableHead>
                    <TableHead className="text-white font-semibold">PACKAGE Num</TableHead>
                    <TableHead className="text-white font-semibold">PACKAGE</TableHead>
                    <TableHead className="text-white font-semibold">VOLUME</TableHead>
                    <TableHead className="text-white font-semibold">WEIGHT</TableHead>
                    <TableHead className="text-white font-semibold">SHIPPER</TableHead>
                    <TableHead className="text-white font-semibold">CONSIGNEE</TableHead>
                    <TableHead className="text-white font-semibold text-center">REMOVE</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            
            <Table>
              <TableBody>
                {currentCargo.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{item.invoiceNumber}</TableCell>
                    <TableCell>{item.lineNumber}</TableCell>
                    <TableCell>{item.packageName}</TableCell>
                    <TableCell>{item.volume.toFixed(3)}</TableCell>
                    <TableCell>{item.weight.toFixed(2)}</TableCell>
                    <TableCell>{item.shipper}</TableCell>
                    <TableCell>{item.consignee}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 p-1 h-auto"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
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
            <Save size={16} />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadContainerDetails;
