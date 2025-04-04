
import { useState, useEffect, useRef } from "react";
import { mockVesselData } from "../mockVesselData";
import { QatarVessel } from "../types/vesselTypes";
import mockContainers from "../../../data/mockContainers";
import { toast } from "sonner";
import { QatarContainer, ContainerCargo } from "../../../types/containerTypes";

export const useVesselManifest = (vesselId: string, onManifestSubmitted: () => void) => {
  const [vessel, setVessel] = useState<QatarVessel | null>(null);
  const [showPrintView, setShowPrintView] = useState(false);
  const [containerData, setContainerData] = useState<QatarContainer[]>([]);
  const [containerCargoData, setContainerCargoData] = useState<{[containerId: string]: ContainerCargo[]}>({});
  const [printSection, setPrintSection] = useState<"all" | "cargo" | "summary">("all");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const printRef = useRef<HTMLDivElement>(null);
  
  // Find vessel data
  useEffect(() => {
    const foundVessel = mockVesselData.find(v => v.id === vesselId);
    if (foundVessel) {
      setVessel(foundVessel);
      
      // Check for saved vessel data in localStorage first
      const savedVesselData = localStorage.getItem(`vessel_${vesselId}`);
      if (savedVesselData) {
        try {
          const parsedVessel = JSON.parse(savedVesselData);
          setVessel(parsedVessel);
          console.log("Loaded vessel data from localStorage:", parsedVessel);
        } catch (error) {
          console.error("Error parsing saved vessel data:", error);
        }
      }
      
      // Get containers data
      if (foundVessel.containers && foundVessel.containers.length > 0) {
        // Try to load containers from localStorage first
        const savedContainers = JSON.parse(localStorage.getItem('containers') || '[]');
        
        const containers: QatarContainer[] = [];
        const containerCargo: {[containerId: string]: ContainerCargo[]} = {};
        
        // For each container in the vessel, find its data and cargo
        foundVessel.containers.forEach(containerRunningNumber => {
          // Try to find container in localStorage first by running number or ID
          const container = savedContainers.find((c: QatarContainer) => 
            c.runningNumber === containerRunningNumber || 
            c.id === containerRunningNumber
          ) || mockContainers.find(c => c.runningNumber === containerRunningNumber);
          
          if (container) {
            containers.push(container);
            
            // Load cargo items for this container
            try {
              // First check container-specific storage
              const containerSpecificCargo = localStorage.getItem(`cargoItems_${container.id}`);
              if (containerSpecificCargo) {
                const parsedCargo = JSON.parse(containerSpecificCargo);
                containerCargo[container.id] = parsedCargo;
                console.log(`Loaded ${parsedCargo.length} cargo items for container ${container.id} from container-specific storage`);
              } else {
                // Check global cargo storage
                const allCargoItems = JSON.parse(localStorage.getItem('cargoItems') || '[]');
                const containerItems = allCargoItems.filter((item: ContainerCargo) => item.containerId === container.id);
                
                if (containerItems.length > 0) {
                  containerCargo[container.id] = containerItems;
                  console.log(`Loaded ${containerItems.length} cargo items for container ${container.id} from global storage`);
                  
                  // Save to container-specific storage for future reference
                  localStorage.setItem(`cargoItems_${container.id}`, JSON.stringify(containerItems));
                } else {
                  containerCargo[container.id] = [];
                  console.log(`No cargo items found for container ${container.id}`);
                }
              }
            } catch (error) {
              console.error(`Error loading cargo for container ${container.id}:`, error);
              containerCargo[container.id] = [];
            }
            
            // Update container weight, volume, and packages based on cargo
            if (containerCargo[container.id]?.length > 0) {
              const cargo = containerCargo[container.id];
              const updatedContainer = {
                ...container,
                weight: cargo.reduce((sum, item) => sum + (parseFloat(item.weight.toString()) || 0), 0),
                volume: cargo.reduce((sum, item) => sum + (parseFloat(item.volume.toString()) || 0), 0),
                packages: cargo.length
              };
              
              // Update in our containers array
              const containerIndex = containers.findIndex(c => c.id === container.id);
              if (containerIndex >= 0) {
                containers[containerIndex] = updatedContainer;
              }
              
              // Save updated container to container-specific storage
              localStorage.setItem(`container_${container.id}`, JSON.stringify(updatedContainer));
            }
          }
        });
        
        setContainerData(containers);
        setContainerCargoData(containerCargo);
        console.log("Container data loaded for vessel:", containers);
        console.log("Container cargo data:", containerCargo);
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
    if (!vessel) return;
    
    // Update vessel status
    const updatedVessel = {
      ...vessel,
      status: "MANIFEST_SUBMITTED",
      loadDate: new Date().toISOString().split('T')[0]
    };
    
    // Save to localStorage
    try {
      // Update in vessels list
      const allVessels = JSON.parse(localStorage.getItem('vesselData') || '[]');
      const updatedVessels = allVessels.map((v: any) => v.id === vessel.id ? updatedVessel : v);
      localStorage.setItem('vesselData', JSON.stringify(updatedVessels));
      
      // Save vessel-specific data
      localStorage.setItem(`vessel_${vessel.id}`, JSON.stringify(updatedVessel));
      
      console.log("Vessel manifest confirmed and saved:", updatedVessel);
    } catch (error) {
      console.error("Error saving vessel manifest confirmation:", error);
    }
    
    // In a real app, save to database
    toast.success("Vessel manifest created successfully", {
      action: {
        label: "View Manifest",
        onClick: () => {
          // Create and dispatch a custom event
          const event = new CustomEvent('viewVesselManifest', { 
            detail: { vesselId: vesselId } 
          });
          document.dispatchEvent(event);
        }
      }
    });
    
    onManifestSubmitted();
  };
  
  // Calculate totals for all containers
  const totalWeight = containerData.reduce((sum, container) => sum + (container.weight || 0), 0);
  const totalVolume = containerData.reduce((sum, container) => sum + (container.volume || 0), 0);
  const totalPackages = containerData.reduce((sum, container) => sum + (container.packages || 0), 0);
  
  return {
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
  };
};

export default useVesselManifest;
