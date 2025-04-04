
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ContainerCargo } from "../../../../types/containerTypes";
import CargoLoaderForm from "./CargoLoaderForm";
import CargoLoaderHeader from "./CargoLoaderHeader";
import { useCargoLoader } from "./useCargoLoader";

interface CargoLoaderProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoLoader: React.FC<CargoLoaderProps> = ({ containerId, onAddCargo }) => {
  const { scanning, toggleScanning } = useCargoLoader({ containerId, onAddCargo });

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CargoLoaderHeader scanning={scanning} toggleScanning={toggleScanning} />
      </CardHeader>
      
      <CardContent>
        <CargoLoaderForm 
          containerId={containerId} 
          onAddCargo={onAddCargo} 
        />
      </CardContent>
    </Card>
  );
};

export default CargoLoader;
