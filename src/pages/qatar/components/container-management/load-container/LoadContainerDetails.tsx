
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PackageCheck, PackagePlus, List, Archive } from "lucide-react";
import { QatarContainer, ContainerCargo } from "../../../types/containerTypes";
import { toast } from "sonner";
import CargoSearchForm from "./CargoSearchForm";
import CargoTable from "./CargoTable";
import ContainerDetailsSection from "./ContainerDetailsSection";
import LoadContainerActionsBar from "./LoadContainerActionsBar";
import CargoLoader from "./CargoLoader";

interface LoadContainerDetailsProps {
  containerId: string;
  containerData: QatarContainer | null;
  onLoadComplete: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({
  containerId,
  containerData,
  onLoadComplete,
  onCancel
}) => {
  const [activeTab, setActiveTab] = useState("search");
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  
  // Initialize the cargo items
  useEffect(() => {
    // In a real app, you would fetch cargo items for this container from the database
    // For now, we'll use an empty array
    const savedCargoItems = localStorage.getItem(`cargoItems_${containerId}`);
    if (savedCargoItems) {
      try {
        const parsedItems = JSON.parse(savedCargoItems);
        setCargoItems(parsedItems);
        
        // Calculate totals
        const volume = parsedItems.reduce((sum: number, item: ContainerCargo) => sum + item.volume, 0);
        const weight = parsedItems.reduce((sum: number, item: ContainerCargo) => sum + item.weight, 0);
        setTotalVolume(volume);
        setTotalWeight(weight);
      } catch (error) {
        console.error("Error parsing saved cargo items:", error);
      }
    }
  }, [containerId]);
  
  // Update totals when cargo items change
  useEffect(() => {
    const volume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
    const weight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
    setTotalVolume(volume);
    setTotalWeight(weight);
    
    // Save cargo items to localStorage
    localStorage.setItem(`cargoItems_${containerId}`, JSON.stringify(cargoItems));
  }, [cargoItems, containerId]);
  
  const handleAddCargo = (cargo: ContainerCargo) => {
    setCargoItems(prevItems => [...prevItems, cargo]);
  };
  
  const handleRemoveCargo = (cargoId: string) => {
    setCargoItems(prevItems => prevItems.filter(item => item.id !== cargoId));
    toast.success("Item removed from cargo list");
  };
  
  const handleSave = () => {
    if (cargoItems.length === 0) {
      toast.error("Please add at least one cargo item before proceeding");
      return;
    }
    
    // In a real app, you would save the cargo items to the database here
    
    // Show success message
    toast.success(`${cargoItems.length} cargo items saved to container`, {
      description: `Total volume: ${totalVolume.toFixed(3)} m³, Total weight: ${totalWeight.toFixed(2)} kg`
    });
    
    // Mark container as loaded
    containerData!.packages = cargoItems.length;
    containerData!.volume = totalVolume;
    containerData!.weight = totalWeight;
    containerData!.status = "LOADED";
    
    // Call the onLoadComplete callback
    onLoadComplete();
  };
  
  const formatVolume = (volume: number): string => {
    return volume.toFixed(3);
  };
  
  const formatWeight = (weight: number): string => {
    return weight.toFixed(2);
  };

  if (!containerData) {
    return (
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            Container data not found. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-md">
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-xl text-blue-800 flex items-center">
            <Archive className="mr-2" size={20} />
            Load Container - {containerData.containerNumber}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <ContainerDetailsSection containerData={containerData} />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <PackagePlus size={16} />
                <span>Search & Add Cargo</span>
              </TabsTrigger>
              <TabsTrigger value="quick-add" className="flex items-center gap-2">
                <List size={16} />
                <span>Quick Cargo Loader</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-4">
              <CargoSearchForm 
                containerId={containerId} 
                onAddCargo={handleAddCargo}
                existingCargo={cargoItems}
              />
            </TabsContent>
            
            <TabsContent value="quick-add" className="space-y-4">
              <CargoLoader 
                containerId={containerId} 
                onAddCargo={handleAddCargo}
              />
            </TabsContent>
          </Tabs>
          
          {cargoItems.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center mb-4">
                <PackageCheck className="mr-2 text-green-600" size={20} />
                <h3 className="text-lg font-medium">Cargo Items</h3>
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {cargoItems.length} Items
                </span>
              </div>
              
              <CargoTable 
                cargoItems={cargoItems} 
                onRemove={handleRemoveCargo}
                formatVolume={formatVolume}
                formatWeight={formatWeight}
              />
            </div>
          )}
          
          <LoadContainerActionsBar
            onCancel={onCancel}
            onSave={handleSave}
            disabled={cargoItems.length === 0}
            totalItems={cargoItems.length}
            totalVolume={formatVolume(totalVolume)}
            totalWeight={formatWeight(totalWeight)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadContainerDetails;
