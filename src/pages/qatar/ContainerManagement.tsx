
import React, { useState, useEffect } from "react";
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
import InvoiceAssignment from "./components/container-management/invoice-assignment/InvoiceAssignment";

const ContainerManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);
  
  // Add event listener for tab changes
  useEffect(() => {
    const handleTabChange = (event: CustomEvent) => {
      if (event.detail && event.detail.tab) {
        setActiveTab(event.detail.tab);
      }
    };
    
    document.addEventListener('changeContainerTab', handleTabChange as EventListener);
    
    return () => {
      document.removeEventListener('changeContainerTab', handleTabChange as EventListener);
    };
  }, []);
  
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
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <ShipIcon size={32} className="mr-3 text-soqotra-blue" />
          <h1 className="text-3xl font-bold text-gray-800">Container Management</h1>
        </div>
        
        {activeTab === "list" && (
          <Button 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={() => setActiveTab("add")}
          >
            <PlusCircle size={18} />
            Add New Container
          </Button>
        )}
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
          <InvoiceAssignment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContainerManagement;
