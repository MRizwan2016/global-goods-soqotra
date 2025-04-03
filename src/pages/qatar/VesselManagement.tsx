
import React from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { useVesselManagement } from "./components/vessel-management/hooks/useVesselManagement";
import VesselManagementHeader from "./components/vessel-management/VesselManagementHeader";
import VesselTabs from "./components/vessel-management/VesselTabs";
import LoadingState from "./components/shared/LoadingState";
import { motion } from "framer-motion";

const VesselManagement: React.FC = () => {
  const {
    vessels,
    activeTab,
    selectedVesselId,
    vesselLoaded,
    manifestSubmitted,
    isLoading,
    handleTabChange,
    handleVesselSelect,
    handleVesselCreated,
    handleContainersLoaded,
    handleManifestSubmitted,
    handleBackToList,
    handleViewManifest,
    navigateToCargoManifest
  } = useVesselManagement();

  return (
    <Layout title="VESSEL MANAGEMENT">
      <motion.div 
        className="container py-6 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <VesselManagementHeader 
          activeTab={activeTab}
          selectedVesselId={selectedVesselId}
          manifestSubmitted={manifestSubmitted}
          handleBackToList={handleBackToList}
          handleViewManifest={handleViewManifest}
          navigateToCargoManifest={navigateToCargoManifest}
          setActiveTab={(tab) => handleTabChange(tab)}
        />

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingState type="vessel" text="Loading vessel management data..." />
          </motion.div>
        ) : (
          <VesselTabs 
            activeTab={activeTab}
            selectedVesselId={selectedVesselId}
            vesselLoaded={vesselLoaded}
            manifestSubmitted={manifestSubmitted}
            handleTabChange={handleTabChange}
            handleVesselSelect={handleVesselSelect}
            handleVesselCreated={handleVesselCreated}
            handleContainersLoaded={handleContainersLoaded}
            handleManifestSubmitted={handleManifestSubmitted}
            handleBackToList={handleBackToList}
          />
        )}
      </motion.div>
    </Layout>
  );
};

export default VesselManagement;
