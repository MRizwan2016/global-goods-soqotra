
import React from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/layout/Layout";
import { useVesselManagement } from "./components/vessel-management/hooks/useVesselManagement";
import VesselManagementHeader from "./components/vessel-management/VesselManagementHeader";
import VesselTabs from "./components/vessel-management/VesselTabs";

const VesselManagement: React.FC = () => {
  const {
    activeTab,
    selectedVesselId,
    vesselLoaded,
    manifestSubmitted,
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
      <div className="container py-6 mx-auto animate-fade-in">
        <VesselManagementHeader 
          activeTab={activeTab}
          selectedVesselId={selectedVesselId}
          manifestSubmitted={manifestSubmitted}
          handleBackToList={handleBackToList}
          handleViewManifest={handleViewManifest}
          navigateToCargoManifest={navigateToCargoManifest}
          setActiveTab={(tab) => handleTabChange(tab)}
        />

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
      </div>
    </Layout>
  );
};

export default VesselManagement;
