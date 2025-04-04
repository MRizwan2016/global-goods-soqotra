
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CargoFormFields from "./CargoFormFields";
import { useCargoLoader } from "./useCargoLoader";
import { ContainerCargo } from "../../../../types/containerTypes";

interface CargoLoaderFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
}

const CargoLoaderForm: React.FC<CargoLoaderFormProps> = ({ containerId, onAddCargo }) => {
  const { 
    cargoForm, 
    handleChange, 
    handleAddCargo, 
    findInvoiceByNumber,
    handleInvoiceBarcodeDetected,
    handlePackageBarcodeDetected,
    scanning,
    toggleScanning
  } = useCargoLoader({ containerId, onAddCargo });

  return (
    <form onSubmit={handleAddCargo} className="space-y-4">
      <CargoFormFields 
        cargoForm={cargoForm}
        handleChange={handleChange}
        findInvoiceByNumber={findInvoiceByNumber}
        scanning={scanning}
        toggleScanning={toggleScanning}
      />
      
      <div className="flex justify-end">
        <Button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus size={16} />
          Add Cargo
        </Button>
      </div>
    </form>
  );
};

export default CargoLoaderForm;
