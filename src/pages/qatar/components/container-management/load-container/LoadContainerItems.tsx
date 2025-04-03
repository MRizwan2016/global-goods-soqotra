
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import { ContainerCargo } from "../../../types/containerTypes";
import CargoTable from "./CargoTable";

interface LoadContainerItemsProps {
  cargoItems: ContainerCargo[];
  onRemoveCargo: (cargoId: string) => void;
}

const LoadContainerItems: React.FC<LoadContainerItemsProps> = ({
  cargoItems,
  onRemoveCargo
}) => {
  if (cargoItems.length === 0) {
    return null;
  }

  return (
    <Card className="mt-6 mb-6">
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Cargo Items ({cargoItems.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <CargoTable 
          cargoItems={cargoItems} 
          onRemoveCargo={onRemoveCargo}
        />
      </CardContent>
    </Card>
  );
};

export default LoadContainerItems;
