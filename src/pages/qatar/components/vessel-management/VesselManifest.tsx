
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PrintVesselManifest from "../print/vessel/PrintVesselManifest";
import useVesselManifest from "./hooks/useVesselManifest";
import ManifestHeader from "./manifest/ManifestHeader";
import VesselDetails from "./manifest/VesselDetails";
import ContainerList from "./manifest/ContainerList";
import ManifestActions from "./manifest/ManifestActions";

interface VesselManifestProps {
  vesselId: string;
  onManifestSubmitted: () => void;
  onCancel: () => void;
}

const VesselManifest: React.FC<VesselManifestProps> = ({
  vesselId,
  onManifestSubmitted,
  onCancel
}) => {
  const {
    vessel,
    showPrintView,
    containerData,
    printRef,
    handlePrint,
    handleConfirm
  } = useVesselManifest(vesselId, onManifestSubmitted);
  
  if (!vessel) {
    return <div>Loading vessel details...</div>;
  }
  
  // Show print view when printing
  if (showPrintView) {
    return (
      <div ref={printRef}>
        <PrintVesselManifest vessel={vessel} containerData={containerData} />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <ManifestHeader vessel={vessel} />
        
        <CardContent className="p-6">
          <VesselDetails vessel={vessel} />
          
          <ContainerList containerData={containerData} />
          
          <ManifestActions 
            onCancel={onCancel}
            onConfirm={handleConfirm}
            onPrint={handlePrint}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselManifest;
