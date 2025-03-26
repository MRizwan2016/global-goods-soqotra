
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PrintVesselManifest from "../print/vessel/PrintVesselManifest";
import useVesselManifest from "./hooks/useVesselManifest";
import ManifestHeader from "./manifest/ManifestHeader";
import VesselDetails from "./manifest/VesselDetails";
import ContainerList from "./manifest/ContainerList";
import ManifestActions from "./manifest/ManifestActions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    printSection,
    setPrintSection,
    orientation,
    setOrientation,
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
        <PrintVesselManifest 
          vessel={vessel} 
          containerData={containerData} 
          printSection={printSection}
          orientation={orientation}
        />
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
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Label htmlFor="print-section">Print Section:</Label>
              <Select 
                value={printSection} 
                onValueChange={(value) => setPrintSection(value as "all" | "cargo" | "summary")}
              >
                <SelectTrigger id="print-section" className="w-[180px]">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="cargo">Cargo Only</SelectItem>
                  <SelectItem value="summary">Vessel Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="orientation">Page Orientation:</Label>
              <Select 
                value={orientation} 
                onValueChange={(value) => setOrientation(value as "portrait" | "landscape")}
              >
                <SelectTrigger id="orientation" className="w-[150px]">
                  <SelectValue placeholder="Select orientation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
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
