
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QatarContainer, ContainerCargo } from "../../types/containerTypes";
import { ArrowLeft, Package, Truck } from "lucide-react";
import { toast } from "sonner";
import ContainerDetailsSection from "./load-container/ContainerDetailsSection";
import CargoSearchForm from "./load-container/CargoSearchForm";
import CargoTable from "./load-container/CargoTable";

interface LoadContainerDetailsProps {
  containerId: string;
  containerData?: QatarContainer | null;
  onLoadComplete: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({
  containerId,
  containerData,
  onLoadComplete,
  onCancel,
}) => {
  // State to track loaded cargo items
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  
  // Handle adding cargo to the container
  const handleAddCargo = (cargo: ContainerCargo) => {
    setCargoItems(prev => [...prev, cargo]);
    toast.success(`Cargo item added to container`);
  };
  
  // Handle removing cargo from the container
  const handleRemoveCargo = (cargoId: string) => {
    setCargoItems(prev => prev.filter(item => item.id !== cargoId));
    toast.info(`Cargo item removed`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={onCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">
          Load Container: {containerData?.containerNumber || containerId}
        </h2>
      </div>

      {containerData && (
        <ContainerDetailsSection container={containerData} onContainerChange={() => {}} />
      )}

      <Card className="mb-6 mt-6">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Cargo Search
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CargoSearchForm 
            containerId={containerId} 
            onAddCargo={handleAddCargo}
            existingCargo={cargoItems}
          />
        </CardContent>
      </Card>

      {cargoItems.length > 0 && (
        <Card className="mb-6">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">Cargo Items ({cargoItems.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <CargoTable 
              cargoItems={cargoItems} 
              onRemoveCargo={handleRemoveCargo}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end">
        <Button 
          onClick={onLoadComplete} 
          className="bg-blue-600 hover:bg-blue-700"
          disabled={cargoItems.length === 0}
        >
          <Truck className="h-4 w-4 mr-2" />
          Proceed to Manifest
        </Button>
      </div>
    </div>
  );
};

export default LoadContainerDetails;
