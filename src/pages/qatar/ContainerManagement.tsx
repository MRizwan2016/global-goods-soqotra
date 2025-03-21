
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  PlusCircle, 
  Truck, 
  ShipIcon, 
  FileCheck,
  BarChart, 
  List
} from "lucide-react";
import ContainerList from "./components/container-management/ContainerList";
import AddContainer from "./components/container-management/AddContainer";
import LoadContainerDetails from "./components/container-management/LoadContainerDetails";
import ContainerManifest from "./components/container-management/ContainerManifest";
import { toast } from "sonner";

const ContainerManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  
  const handleContainerSelect = (containerId: string) => {
    setSelectedContainerId(containerId);
    setActiveTab("load");
    toast.success("Container selected for loading");
  };

  const handleContainerCreated = () => {
    setActiveTab("list");
    toast.success("Container created successfully");
  };

  const handleCargoLoaded = () => {
    setActiveTab("manifest");
    toast.success("Cargo loaded successfully");
  };

  const handleManifestSubmitted = () => {
    setActiveTab("list");
    toast.success("Manifest submitted successfully");
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setSelectedContainerId(null);
  };

  return (
    <div className="container py-6 mx-auto animate-fade-in">
      <div className="mb-6 flex items-center">
        <ShipIcon size={32} className="mr-3 text-soqotra-blue" />
        <h1 className="text-3xl font-bold text-gray-800">Container Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List size={18} />
            <span>Container List</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2">
            <PlusCircle size={18} />
            <span>Add Container</span>
          </TabsTrigger>
          <TabsTrigger value="load" disabled={!selectedContainerId} className="flex items-center gap-2">
            <Package size={18} />
            <span>Load Cargo</span>
          </TabsTrigger>
          <TabsTrigger value="manifest" disabled={!selectedContainerId} className="flex items-center gap-2">
            <FileCheck size={18} />
            <span>Manifest</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <ContainerList onContainerSelect={handleContainerSelect} />
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <AddContainer 
            onContainerCreated={handleContainerCreated} 
            onCancel={handleBackToList} 
          />
        </TabsContent>

        <TabsContent value="load" className="space-y-4">
          {selectedContainerId && (
            <LoadContainerDetails 
              containerId={selectedContainerId} 
              onCargoLoaded={handleCargoLoaded} 
              onCancel={handleBackToList} 
            />
          )}
        </TabsContent>

        <TabsContent value="manifest" className="space-y-4">
          {selectedContainerId && (
            <ContainerManifest 
              containerId={selectedContainerId} 
              onManifestSubmitted={handleManifestSubmitted} 
              onCancel={handleBackToList} 
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContainerManagement;
