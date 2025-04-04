
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
    containerCargoData,
    printRef,
    printSection,
    setPrintSection,
    orientation,
    setOrientation,
    handlePrint,
    handleConfirm,
    totalWeight,
    totalVolume,
    totalPackages
  } = useVesselManifest(vesselId, onManifestSubmitted);
  
  if (!vessel) {
    return <div className="p-8 text-center animate-pulse">Loading vessel details...</div>;
  }
  
  // Show print view when printing
  if (showPrintView) {
    return (
      <div ref={printRef}>
        <PrintVesselManifest 
          vessel={vessel} 
          containerData={containerData} 
          containerCargoData={containerCargoData}
          printSection={printSection}
          orientation={orientation}
          totalWeight={totalWeight}
          totalVolume={totalVolume}
          totalPackages={totalPackages}
        />
        
        {/* Print styles */}
        <style>
          {`
            @media print {
              @page {
                size: ${orientation === "landscape" ? "landscape" : "portrait"};
                margin: 15mm;
              }
              
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              
              table {
                border-collapse: collapse;
                width: 100%;
              }
              
              table, th, td {
                border: 1px solid #ddd !important;
              }
              
              th, td {
                padding: 8px;
                text-align: left;
              }
              
              h1, h2, h3, h4 {
                color: black !important;
              }
              
              .print-header {
                text-align: center;
                margin-bottom: 20px;
                font-size: 24px;
                font-weight: bold;
                border-bottom: 2px solid #333;
                padding-bottom: 10px;
              }
              
              .page-break-before {
                page-break-before: always;
              }
            }
          `}
        </style>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md hover:shadow-lg transition-shadow">
        <ManifestHeader vessel={vessel} />
        
        <CardContent className="p-6">
          <VesselDetails 
            vessel={vessel} 
            totalWeight={totalWeight}
            totalVolume={totalVolume}
            totalPackages={totalPackages}
          />
          
          <ContainerList 
            containerData={containerData} 
            containerCargoData={containerCargoData}
          />
          
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
