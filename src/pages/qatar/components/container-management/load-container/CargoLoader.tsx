
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, Archive } from "lucide-react";
import { ContainerCargo } from "../../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import EnhancedBarcodeScanner from "./cargo-search/EnhancedBarcodeScanner";
import CargoDetailsInputs from "./cargo-search/CargoDetailsInputs";
import InsertCargoButton from "./cargo-search/InsertCargoButton";

interface CargoLoaderProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoLoader: React.FC<CargoLoaderProps> = ({
  containerId,
  onAddCargo
}) => {
  const [scanning, setScanning] = useState(false);
  const [packageNumber, setPackageNumber] = useState("");
  const [packageName, setPackageName] = useState("");
  const [shipper, setShipper] = useState("");
  
  // Handle barcode detection
  const handleBarcodeDetected = (barcode: string) => {
    // In a real app, you would look up the barcode in a database
    // For demo purposes, we'll just set the barcode and generate random data
    setPackageNumber(Math.floor(Math.random() * 1000).toString());
    setPackageName("Wooden Box");
    setShipper("Qatar Shipping Co.");
    
    toast.success(`Barcode processed: ${barcode}`);
  };
  
  // Handle insert cargo
  const handleInsertCargo = () => {
    if (!packageName || !shipper) {
      toast.error("Package name and shipper are required");
      return;
    }
    
    const newCargoItem: ContainerCargo = {
      id: uuidv4(),
      containerId,
      invoiceNumber: "/00000000/N",
      lineNumber: packageNumber || "1",
      barcode: uuidv4().substring(0, 8),
      packageName,
      volume: 0.1,
      weight: 10,
      quantity: 1, // Added the required property
      shipper,
      consignee: shipper,
      wh: "K",
      d2d: false
    };
    
    onAddCargo(newCargoItem);
    
    // Clear form fields
    setPackageName("");
    setPackageNumber("");
    
    toast.success("Item added to cargo list");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-blue-50 pb-2">
        <CardTitle className="text-lg flex items-center">
          <Package className="mr-2 h-5 w-5 text-blue-600" />
          Quick Cargo Loader
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <EnhancedBarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
        
        <CargoDetailsInputs 
          bookingForm=""
          packageNumber={packageNumber}
          packageName={packageName}
          shipper={shipper}
          onPackageNumberChange={setPackageNumber}
          onPackageNameChange={setPackageName}
          onShipperChange={setShipper}
        />
        
        <div className="flex justify-end">
          <Button
            onClick={handleInsertCargo}
            disabled={!packageName || !shipper}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus size={18} className="mr-2" />
            Add Package to Container
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CargoLoader;
