
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockVesselData } from '../mockVesselData';
import { QatarVessel } from '../types/vesselTypes';
import { toast } from 'sonner';

export const useVesselManagement = () => {
  const [vessels, setVessels] = useState<QatarVessel[]>(mockVesselData);
  const [activeTab, setActiveTab] = useState("list");
  const [selectedVesselId, setSelectedVesselId] = useState<string | null>(null);
  const [vesselLoaded, setVesselLoaded] = useState(false);
  const [manifestSubmitted, setManifestSubmitted] = useState(false);
  const navigate = useNavigate();

  // Load vessel data from localStorage on init
  useEffect(() => {
    try {
      const savedVesselData = localStorage.getItem('vesselData');
      if (savedVesselData) {
        const parsedData = JSON.parse(savedVesselData);
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          setVessels(parsedData);
        }
      }
    } catch (error) {
      console.error("Error loading vessel data from localStorage:", error);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleVesselSelect = (vesselId: string) => {
    setSelectedVesselId(vesselId);
    setActiveTab("details");
  };

  const handleVesselCreated = () => {
    // Reload vessel data from mockVesselData
    setVessels([...mockVesselData]);
    setActiveTab("list");
    toast.success("Vessel created successfully");
  };

  const handleContainersLoaded = () => {
    setVesselLoaded(true);
    setActiveTab("details");
    toast.success("Containers loaded to vessel");
  };

  const handleManifestSubmitted = () => {
    setManifestSubmitted(true);
    setActiveTab("details");
    toast.success("Cargo manifest submitted successfully");
  };

  const handleBackToList = () => {
    setSelectedVesselId(null);
    setVesselLoaded(false);
    setManifestSubmitted(false);
    setActiveTab("list");
  };

  const handleViewManifest = () => {
    if (selectedVesselId) {
      navigate(`/qatar/cargo-manifest?vesselId=${selectedVesselId}`);
    }
  };
  
  const navigateToCargoManifest = () => {
    if (selectedVesselId) {
      // Store the current vessel ID in localStorage for later reference
      localStorage.setItem('currentVesselId', selectedVesselId);
      navigate('/qatar/cargo-manifest');
    } else {
      toast.error("No vessel selected");
    }
  };

  return {
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
  };
};

export default useVesselManagement;
