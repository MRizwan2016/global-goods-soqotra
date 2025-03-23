import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  PlusCircle, 
  Truck, 
  ShipIcon, 
  FileCheck,
  BarChart, 
  List,
  FilePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <TabsList className="grid grid-cols-5 mb-8">
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
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <FilePlus size={18} />
            <span>Invoice Assignment</span>
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

        <TabsContent value="invoices" className="space-y-4">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Batch Invoice Assignment</h2>
            <p className="text-gray-600 mb-6">
              Assign invoice numbers to container cargo items and manage unsettled invoices.
              Invoice numbers will be automatically generated starting from GY 13136051.
            </p>
            
            <div className="flex justify-end">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  toast.success("All missing invoices have been assigned numbers");
                }}
              >
                <FilePlus className="mr-2 h-4 w-4" />
                Assign All Missing Invoice Numbers
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContainerManagement;
