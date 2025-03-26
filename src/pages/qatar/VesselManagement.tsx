
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Ship, 
  PlusCircle, 
  List,
  FileCheck,
  Anchor,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import VesselList from "./components/vessel-management/VesselList";
import AddVessel from "./components/vessel-management/AddVessel";
import LoadVesselDetails from "./components/vessel-management/LoadVesselDetails";
import VesselManifest from "./components/vessel-management/VesselManifest";
import { toast } from "sonner";

const VesselManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedVesselId, setSelectedVesselId] = useState<string | null>(null);
  const [vesselLoaded, setVesselLoaded] = useState(false);
  const [manifestSubmitted, setManifestSubmitted] = useState(false);
  
  // Prevent users from manually switching tabs if they haven't completed the current step
  const handleTabChange = (tab: string) => {
    if (tab === "manifest" && selectedVesselId && !vesselLoaded) {
      toast.error("Please complete loading containers before proceeding to manifest");
      return;
    }
    
    setActiveTab(tab);
  };
  
  const handleVesselSelect = (vesselId: string) => {
    setSelectedVesselId(vesselId);
    setVesselLoaded(false);
    setManifestSubmitted(false);
    setActiveTab("load");
    toast.success("Vessel selected for loading");
  };

  const handleVesselCreated = () => {
    setActiveTab("list");
    toast.success("Vessel created successfully");
  };

  const handleContainersLoaded = () => {
    setVesselLoaded(true);
    setActiveTab("manifest");
    toast.success("Containers loaded successfully. Proceeding to manifest section.");
  };

  const handleManifestSubmitted = () => {
    setManifestSubmitted(true);
    setActiveTab("list");
    toast.success("Manifest submitted successfully", {
      description: "You can now view or print the manifest",
      action: {
        label: "View Manifest",
        onClick: () => {
          setActiveTab("manifest");
        }
      }
    });
  };

  const handleBackToList = () => {
    setActiveTab("list");
    setSelectedVesselId(null);
    setVesselLoaded(false);
    setManifestSubmitted(false);
  };
  
  const handleViewManifest = () => {
    if (selectedVesselId) {
      setActiveTab("manifest");
    }
  };

  return (
    <div className="container py-6 mx-auto animate-fade-in">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Ship size={32} className="mr-3 text-soqotra-blue" />
          <h1 className="text-3xl font-bold text-gray-800">Vessel Management</h1>
        </div>
        
        {activeTab === "list" && (
          <div className="flex gap-2">
            {selectedVesselId && manifestSubmitted && (
              <Button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
                onClick={handleViewManifest}
              >
                <Printer size={18} />
                View Manifest
              </Button>
            )}
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform"
              onClick={() => setActiveTab("add")}
            >
              <PlusCircle size={18} />
              Add New Vessel
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            <List size={18} />
            <span>Vessel List</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <PlusCircle size={18} />
            <span>Add Vessel</span>
          </TabsTrigger>
          <TabsTrigger 
            value="load" 
            disabled={!selectedVesselId} 
            className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
          >
            <Anchor size={18} />
            <span>Load Containers</span>
          </TabsTrigger>
          <TabsTrigger 
            value="manifest" 
            disabled={!selectedVesselId || (!vesselLoaded && !manifestSubmitted)} 
            className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
          >
            <FileCheck size={18} />
            <span>Manifest</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <VesselList onVesselSelect={handleVesselSelect} />
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <AddVessel 
            onVesselCreated={handleVesselCreated} 
            onCancel={handleBackToList} 
          />
        </TabsContent>

        <TabsContent value="load" className="space-y-4">
          {selectedVesselId && (
            <LoadVesselDetails 
              vesselId={selectedVesselId} 
              onContainersLoaded={handleContainersLoaded} 
              onCancel={handleBackToList} 
            />
          )}
        </TabsContent>

        <TabsContent value="manifest" className="space-y-4">
          {selectedVesselId && (
            <VesselManifest 
              vesselId={selectedVesselId} 
              onManifestSubmitted={handleManifestSubmitted} 
              onCancel={handleBackToList} 
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VesselManagement;
