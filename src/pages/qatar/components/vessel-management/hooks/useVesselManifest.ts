
import { useState, useEffect, useRef } from "react";
import { mockVesselData, QatarVessel } from "../mockVesselData";
import mockContainers from "../../../data/mockContainers";
import { toast } from "sonner";

export const useVesselManifest = (vesselId: string, onManifestSubmitted: () => void) => {
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
  
  return {
    vessel,
    showPrintView,
    containerData,
    printRef,
    handlePrint,
    handleConfirm
  };
};

export default useVesselManifest;
