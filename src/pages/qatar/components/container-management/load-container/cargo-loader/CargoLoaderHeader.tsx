
import React from "react";
import { Button } from "@/components/ui/button";
import { Package, Barcode } from "lucide-react";

interface CargoLoaderHeaderProps {
  scanning: boolean;
  toggleScanning: () => void;
}

const CargoLoaderHeader: React.FC<CargoLoaderHeaderProps> = ({ scanning, toggleScanning }) => {
  return (
    <div className="pb-2 flex flex-row justify-between items-center">
      <div className="text-lg flex items-center font-medium">
        <Package className="mr-2" size={18} />
        Quick Cargo Entry
      </div>
      <Button 
        onClick={toggleScanning} 
        variant={scanning ? "default" : "outline"} 
        size="sm"
        className={scanning ? "bg-green-600 hover:bg-green-700" : ""}
      >
        <Barcode className="mr-2 h-4 w-4" />
        {scanning ? "Scanner Active" : "Start Scanner"}
      </Button>
    </div>
  );
};

export default CargoLoaderHeader;
