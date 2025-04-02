
import { useState } from "react";
import { toast } from "sonner";

export function useVesselManagement() {
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

  const navigateToCargoManifest = () => {
    window.location.href = '#/qatar/cargo-manifest';
  };

  return {
    activeTab,
    selectedVesselId,
    vesselLoaded,
    manifestSubmitted,
    setActiveTab,
    handleTabChange,
    handleVesselSelect,
    handleVesselCreated,
    handleContainersLoaded,
    handleManifestSubmitted,
    handleBackToList,
    handleViewManifest,
    navigateToCargoManifest
  };
}
