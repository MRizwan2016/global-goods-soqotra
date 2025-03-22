
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { ContainerCargo, QatarContainer } from "../../types/containerTypes";
import { mockCargoItems, mockContainers } from "../../data/mockContainers";
import { toast } from "sonner";
import ContainerDetailsSection from "./load-container/ContainerDetailsSection";
import CargoSearchForm from "./load-container/CargoSearchForm";
import CargoTable from "./load-container/CargoTable";
import LoadContainerActionsBar from "./load-container/LoadContainerActionsBar";

interface LoadContainerDetailsProps {
  containerId: string;
  onCargoLoaded: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({ 
  containerId, 
  onCargoLoaded, 
  onCancel 
}) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  
  // Mock data for currently entered cargo
  const [currentCargo, setCurrentCargo] = useState<ContainerCargo[]>([]);
  
  // Load container data
  useEffect(() => {
    const foundContainer = mockContainers.find(c => c.id === containerId);
    if (foundContainer) {
      setContainer(foundContainer);
    }
    
    // Get cargo items for this container
    const containerCargoItems = mockCargoItems.filter(item => item.containerId === containerId);
    setCargoItems(containerCargoItems);
  }, [containerId]);
  
  const handleAddCargo = (newCargoItem: ContainerCargo) => {
    setCurrentCargo([...currentCargo, newCargoItem]);
  };
  
  const handleSave = () => {
    if (currentCargo.length === 0) {
      toast.error("No cargo items to save");
      return;
    }
    
    // In a real app, we would save to the backend
    // For now, just update the mock data
    mockCargoItems.push(...currentCargo);
    
    // Update container status
    if (container) {
      container.status = "LOADED";
      container.packages = currentCargo.length;
      
      // Calculate total volume
      const totalVolume = currentCargo.reduce((sum, item) => sum + item.volume, 0);
      container.volume = parseFloat(totalVolume.toFixed(3));
      
      // Calculate total weight
      const totalWeight = currentCargo.reduce((sum, item) => sum + item.weight, 0);
      container.weight = parseFloat(totalWeight.toFixed(2));
    }
    
    // Notify parent
    onCargoLoaded();
    
    toast.success("Container cargo saved successfully");
  };
  
  const handleRemoveItem = (id: string) => {
    setCurrentCargo(currentCargo.filter(item => item.id !== id));
    toast.success("Item removed from cargo list");
  };
  
  const handleContainerChange = (updatedContainer: QatarContainer) => {
    setContainer(updatedContainer);
  };
  
  if (!container) {
    return <div>Loading container details...</div>;
  }
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <Package className="mr-2 text-blue-600" size={22} />
          Load Sea Cargo
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <ContainerDetailsSection 
          container={container} 
          onContainerChange={handleContainerChange} 
        />
        
        <CargoSearchForm 
          containerId={containerId}
          onAddCargo={handleAddCargo}
        />
        
        <CargoTable 
          cargoItems={currentCargo}
          onRemoveItem={handleRemoveItem}
        />
        
        <LoadContainerActionsBar 
          onCancel={onCancel}
          onSave={handleSave}
          disabled={currentCargo.length === 0}
        />
      </CardContent>
    </Card>
  );
};

export default LoadContainerDetails;
