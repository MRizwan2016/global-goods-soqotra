
import React from "react";
import { Grid } from "@/components/ui/grid";
import { PackageOpen } from "lucide-react";
import { ContainerCargo } from "../../../types/containerTypes";
import { useCargoSearchForm } from "./hooks/useCargoSearchForm";
import InvoiceInformationSection from "./form-sections/InvoiceInformationSection";
import PackageDetailsSection from "./form-sections/PackageDetailsSection";
import CargoFormActions from "./form-sections/CargoFormActions";

interface CargoSearchFormProps {
  containerId: string;
  onAddCargo: (cargo: ContainerCargo) => void;
  existingCargo: ContainerCargo[];
}

const CargoSearchForm: React.FC<CargoSearchFormProps> = ({
  containerId,
  onAddCargo,
  existingCargo
}) => {
  const {
    // Form state
    invoiceNumber,
    lineNumber,
    packageName,
    volume,
    weight,
    quantity,
    shipper,
    consignee,
    barcode,
    d2d,
    warehouse,
    showSuggestions,
    
    // Setters
    setInvoiceNumber,
    setLineNumber,
    setPackageName,
    setVolume,
    setWeight,
    setQuantity,
    setShipper,
    setConsignee,
    setBarcode,
    setD2d,
    setWarehouse,
    setShowSuggestions,
    
    // Handlers
    handleSelectInvoice,
    handleSubmit
  } = useCargoSearchForm({
    containerId,
    onAddCargo,
    existingCargo
  });

  return (
    <form onSubmit={handleSubmit}>
      <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <InvoiceInformationSection 
          invoiceNumber={invoiceNumber}
          lineNumber={lineNumber}
          shipper={shipper}
          consignee={consignee}
          warehouse={warehouse}
          showSuggestions={showSuggestions}
          setInvoiceNumber={setInvoiceNumber}
          setLineNumber={setLineNumber}
          setShipper={setShipper}
          setConsignee={setConsignee}
          setWarehouse={setWarehouse}
          setShowSuggestions={setShowSuggestions}
          onSelectInvoice={handleSelectInvoice}
        />
        
        <PackageDetailsSection 
          packageName={packageName}
          volume={volume}
          weight={weight}
          quantity={quantity}
          barcode={barcode}
          setPackageName={setPackageName}
          setVolume={setVolume}
          setWeight={setWeight}
          setQuantity={setQuantity}
          setBarcode={setBarcode}
        />
      </Grid>
      
      <CargoFormActions onSubmit={handleSubmit} />
    </form>
  );
};

export default CargoSearchForm;
