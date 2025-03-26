
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
      toast.error("PLEASE COMPLETE LOADING CONTAINERS BEFORE PROCEEDING TO MANIFEST");
      return;
    }
    
    setActiveTab(tab);
  };
  
  const handleVesselSelect = (vesselId: string) => {
    setSelectedVesselId(vesselId);
    setVesselLoaded(false);
    setManifestSubmitted(false);
    setActiveTab("load");
    toast.success("VESSEL SELECTED FOR LOADING");
  };

  const handleVesselCreated = () => {
    setActiveTab("list");
    toast.success("VESSEL CREATED SUCCESSFULLY");
  };

  const handleContainersLoaded = () => {
    setVesselLoaded(true);
    setActiveTab("manifest");
    toast.success("CONTAINERS LOADED SUCCESSFULLY. PROCEEDING TO MANIFEST SECTION.");
  };

  const handleManifestSubmitted = () => {
    setManifestSubmitted(true);
    setActiveTab("list");
    toast.success("MANIFEST SUBMITTED SUCCESSFULLY", {
      description: "You can now view or print the manifest",
      action: {
        label: "VIEW MANIFEST",
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
          <h1 className="text-3xl font-bold text-gray-800 uppercase">VESSEL MANAGEMENT</h1>
        </div>
        
        {activeTab === "list" && (
          <div className="flex gap-2">
            {selectedVesselId && manifestSubmitted && (
              <Button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform uppercase"
                onClick={handleViewManifest}
              >
                <Printer size={18} />
                VIEW MANIFEST
              </Button>
            )}
            <Button 
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 hover:scale-105 transition-transform uppercase"
              onClick={() => setActiveTab("add")}
            >
              <PlusCircle size={18} />
              ADD NEW VESSEL
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white uppercase">
            <List size={18} />
            <span>VESSEL LIST</span>
          </TabsTrigger>
          <TabsTrigger value="add" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white uppercase">
            <PlusCircle size={18} />
            <span>ADD VESSEL</span>
          </TabsTrigger>
          <TabsTrigger 
            value="load" 
            disabled={!selectedVesselId} 
            className="flex items-center gap-2 data-[state=active]:bg-amber-600 data-[state=active]:text-white uppercase"
          >
            <Anchor size={18} />
            <span>LOAD CONTAINERS</span>
          </TabsTrigger>
          <TabsTrigger 
            value="manifest" 
            disabled={!selectedVesselId || (!vesselLoaded && !manifestSubmitted)} 
            className="flex items-center gap-2 data-[state=active]:bg-teal-600 data-[state=active]:text-white uppercase"
          >
            <FileCheck size={18} />
            <span>MANIFEST</span>
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
