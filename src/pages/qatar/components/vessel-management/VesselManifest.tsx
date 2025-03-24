
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer, Save } from "lucide-react";
import { mockVesselData, QatarVessel } from "./mockVesselData";
import { mockContainers } from "../../data/mockContainers";
import { toast } from "sonner";
import PrintVesselManifest from "../print/vessel/PrintVesselManifest";

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
  const [vessel, setVessel] = useState<QatarVessel | null>(null);
  const [showPrintView, setShowPrintView] = useState(false);
  const [containerData, setContainerData] = useState<any[]>([]);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Find vessel data
  useEffect(() => {
    const foundVessel = mockVesselData.find(v => v.id === vesselId);
    if (foundVessel) {
      setVessel(foundVessel);
      
      // Get containers data
      if (foundVessel.containers && foundVessel.containers.length > 0) {
        const containers = foundVessel.containers.map(containerRunningNumber => {
          const container = mockContainers.find(c => c.runningNumber === containerRunningNumber);
          return container || null;
        }).filter(Boolean);
        
        setContainerData(containers);
      }
    }
  }, [vesselId]);
  
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowPrintView(true);
    // Allow time for state to update and render
    setTimeout(() => {
      window.print();
      // Reset after printing
      setTimeout(() => {
        setShowPrintView(false);
      }, 500);
    }, 100);
  };
  
  const handleConfirm = () => {
    // In a real app, save to database
    toast.success("Vessel manifest created successfully");
    onManifestSubmitted();
  };
  
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
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="text-xl text-blue-800">
            Vessel Manifest - {vessel.vesselName || vessel.runningNumber}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-3 text-lg">Vessel Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-gray-600">Running Number:</div>
                <div className="font-medium">{vessel.runningNumber}</div>
                
                <div className="text-gray-600">Vessel Name:</div>
                <div className="font-medium">{vessel.vesselName || "Not Set"}</div>
                
                <div className="text-gray-600">Voyage:</div>
                <div className="font-medium">{vessel.voyage || "Not Set"}</div>
                
                <div className="text-gray-600">Port of Loading:</div>
                <div className="font-medium">{vessel.portOfLoading || "Not Set"}</div>
                
                <div className="text-gray-600">Port of Discharge:</div>
                <div className="font-medium">{vessel.portOfDischarge || "Not Set"}</div>
                
                <div className="text-gray-600">Direction:</div>
                <div className="font-medium">{vessel.direction}</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-3 text-lg">Schedule Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="text-gray-600">ETD:</div>
                <div className="font-medium">{vessel.etd || "Not Set"}</div>
                
                <div className="text-gray-600">ETA:</div>
                <div className="font-medium">{vessel.eta || "Not Set"}</div>
                
                <div className="text-gray-600">Master B/L:</div>
                <div className="font-medium">{vessel.masterBL || "Not Set"}</div>
                
                <div className="text-gray-600">Shipping Line:</div>
                <div className="font-medium">{vessel.shippingLine || "Not Set"}</div>
                
                <div className="text-gray-600">Sector:</div>
                <div className="font-medium">{vessel.sector}</div>
                
                <div className="text-gray-600">Containers:</div>
                <div className="font-medium">{containerData.length}</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium mb-3 text-lg">Container List</h3>
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-2 text-left">No.</th>
                    <th className="p-2 text-left">Container Number</th>
                    <th className="p-2 text-left">Seal Number</th>
                    <th className="p-2 text-left">Type</th>
                    <th className="p-2 text-left">Weight</th>
                    <th className="p-2 text-left">Packages</th>
                    <th className="p-2 text-left">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {containerData.length > 0 ? (
                    containerData.map((container, index) => (
                      <tr key={container.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{container.containerNumber}</td>
                        <td className="p-2">{container.sealNumber}</td>
                        <td className="p-2">{container.containerType}</td>
                        <td className="p-2">{container.weight} kg</td>
                        <td className="p-2">{container.packages || 0}</td>
                        <td className="p-2">{container.volume || 0} m³</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-gray-500">
                        No containers assigned to this vessel
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Go Back
              </Button>
              
              <Button 
                onClick={handleConfirm}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Save size={16} />
                Confirm Manifest
              </Button>
            </div>
            
            <Button 
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Printer size={16} />
              Print Manifest
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselManifest;
