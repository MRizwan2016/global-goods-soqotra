
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, PlusCircle, Anchor, FileCheck } from "lucide-react";
import VesselList from "./VesselList";
import AddVessel from "./AddVessel";
import LoadVesselDetails from "./LoadVesselDetails";
import VesselManifest from "./VesselManifest";

interface VesselTabsProps {
  activeTab: string;
  selectedVesselId: string | null;
  vesselLoaded: boolean;
  manifestSubmitted: boolean;
  handleTabChange: (tab: string) => void;
  handleVesselSelect: (vesselId: string) => void;
  handleVesselCreated: () => void;
  handleContainersLoaded: () => void;
  handleManifestSubmitted: () => void;
  handleBackToList: () => void;
}

const VesselTabs: React.FC<VesselTabsProps> = ({
  activeTab,
  selectedVesselId,
  vesselLoaded,
  manifestSubmitted,
  handleTabChange,
  handleVesselSelect,
  handleVesselCreated,
  handleContainersLoaded,
  handleManifestSubmitted,
  handleBackToList
}) => {
  return (
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
  );
};

export default VesselTabs;
