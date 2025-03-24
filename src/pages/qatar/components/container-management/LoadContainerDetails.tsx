
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
  
  // State for currently entered cargo
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
    setCurrentCargo(prev => [...prev, newCargoItem]);
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
    
    // Notify parent to move to manifest section
    onCargoLoaded();
    
    toast.success("Container cargo saved successfully. Proceeding to manifest section.");
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
  
  // Calculate totals ensuring we handle any edge cases where reduce would return NaN
  const calculateTotalVolume = () => {
    if (currentCargo.length === 0) return "0.000";
    const total = currentCargo.reduce((sum, item) => {
      const itemVolume = typeof item.volume === 'number' ? item.volume : 0;
      return sum + itemVolume;
    }, 0);
    return total.toFixed(3);
  };
  
  const calculateTotalWeight = () => {
    if (currentCargo.length === 0) return "0.00";
    const total = currentCargo.reduce((sum, item) => {
      const itemWeight = typeof item.weight === 'number' ? item.weight : 0;
      return sum + itemWeight;
    }, 0);
    return total.toFixed(2);
  };
  
  const totalVolume = calculateTotalVolume();
  const totalWeight = calculateTotalWeight();
  
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
          existingCargo={currentCargo}
        />
        
        {currentCargo.length > 0 && (
          <div className="mt-6">
            <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-blue-700">Current Cargo Summary</h3>
                <p className="text-sm text-blue-600">
                  Packages: {currentCargo.length} | 
                  Total Volume: {totalVolume} m³ | 
                  Total Weight: {totalWeight} kg
                </p>
              </div>
            </div>
            
            <CargoTable 
              cargoItems={currentCargo}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        )}
        
        <LoadContainerActionsBar 
          onCancel={onCancel}
          onSave={handleSave}
          disabled={currentCargo.length === 0}
          totalItems={currentCargo.length}
          totalVolume={totalVolume}
          totalWeight={totalWeight}
        />
      </CardContent>
    </Card>
  );
};

export default LoadContainerDetails;
