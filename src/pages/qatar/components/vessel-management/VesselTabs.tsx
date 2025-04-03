
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, PlusCircle, Anchor, FileCheck } from "lucide-react";
import VesselList from "./VesselList";
import AddVessel from "./AddVessel";
import LoadVesselDetails from "./LoadVesselDetails";
import VesselManifest from "./VesselManifest";
import { motion } from "framer-motion";

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
  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      {/* We'll hide the TabsList since we're using a custom header now */}
      <div className="hidden">
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
      </div>

      <TabsContent value="list">
        <motion.div
          key="list"
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <VesselList onVesselSelect={handleVesselSelect} />
        </motion.div>
      </TabsContent>

      <TabsContent value="add">
        <motion.div
          key="add"
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <AddVessel 
            onVesselCreated={handleVesselCreated} 
            onCancel={handleBackToList} 
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="load">
        {selectedVesselId && (
          <motion.div
            key="load"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoadVesselDetails 
              vesselId={selectedVesselId} 
              onContainersLoaded={handleContainersLoaded} 
              onCancel={handleBackToList} 
            />
          </motion.div>
        )}
      </TabsContent>

      <TabsContent value="manifest">
        {selectedVesselId && (
          <motion.div
            key="manifest"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <VesselManifest 
              vesselId={selectedVesselId} 
              onManifestSubmitted={handleManifestSubmitted} 
              onCancel={handleBackToList} 
            />
          </motion.div>
        )}
      </TabsContent>

      <TabsContent value="details">
        {selectedVesselId && (
          <motion.div
            key="details"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <LoadVesselDetails 
              vesselId={selectedVesselId} 
              onContainersLoaded={handleContainersLoaded} 
              onCancel={handleBackToList}
              isViewMode={true}
            />
          </motion.div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default VesselTabs;
