
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Barcode } from "lucide-react";
import { QatarContainer } from "../../../types/containerTypes";

interface LoadContainerHeaderProps {
  containerData?: QatarContainer | null;
  containerId: string;
  onCancel: () => void;
  scanning: boolean;
  toggleScanning: () => void;
}

const LoadContainerHeader: React.FC<LoadContainerHeaderProps> = ({
  containerData,
  containerId,
  onCancel,
  scanning,
  toggleScanning
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          Load Container: {containerData?.containerNumber || containerId}
        </h2>
      </div>
      
      <Button 
        variant={scanning ? "default" : "outline"}
        onClick={toggleScanning}
        className={scanning ? "bg-green-600 hover:bg-green-700" : ""}
      >
        <Barcode className="h-4 w-4 mr-2" />
        {scanning ? "Scanner Active" : "Activate Scanner"}
      </Button>
    </div>
  );
};

export default LoadContainerHeader;
