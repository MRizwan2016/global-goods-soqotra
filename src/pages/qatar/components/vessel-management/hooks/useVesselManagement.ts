
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
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load vessel data from localStorage on init
  useEffect(() => {
    setIsLoading(true);
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
    } finally {
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleVesselSelect = (vesselId: string) => {
    setSelectedVesselId(vesselId);
    setActiveTab("details");
  };

  const handleVesselCreated = (newVessel?: QatarVessel) => {
    // If a new vessel is provided, add it to the vessels array
    if (newVessel) {
      const updatedVessels = [newVessel, ...vessels];
      setVessels(updatedVessels);
      
      // Save to localStorage
      try {
        localStorage.setItem('vesselData', JSON.stringify(updatedVessels));
      } catch (error) {
        console.error("Error saving vessel data to localStorage:", error);
      }
    } else {
      // Reload vessel data from mockVesselData
      setVessels([...mockVesselData]);
    }
    
    setActiveTab("list");
    toast.success("Vessel created successfully", {
      position: "top-center",
      className: "animate-slide-in-right"
    });
  };

  const handleContainersLoaded = () => {
    setVesselLoaded(true);
    setActiveTab("details");
    
    // Find the current vessel and update its status
    if (selectedVesselId) {
      const updatedVessels = vessels.map(vessel => {
        if (vessel.id === selectedVesselId) {
          return {
            ...vessel,
            status: "LOADING_COMPLETE",
            loadDate: new Date().toISOString().split('T')[0]
          };
        }
        return vessel;
      });
      
      setVessels(updatedVessels);
      
      // Save to localStorage
      try {
        localStorage.setItem('vesselData', JSON.stringify(updatedVessels));
      } catch (error) {
        console.error("Error saving vessel data to localStorage:", error);
      }
    }
    
    toast.success("Containers loaded to vessel", {
      description: "The container manifest is ready to be submitted",
      position: "top-center",
      className: "animate-slide-in-right"
    });
  };

  const handleManifestSubmitted = () => {
    setManifestSubmitted(true);
    setActiveTab("details");
    
    // Find the current vessel and update its status
    if (selectedVesselId) {
      const updatedVessels = vessels.map(vessel => {
        if (vessel.id === selectedVesselId) {
          return {
            ...vessel,
            status: "MANIFEST_SUBMITTED"
          };
        }
        return vessel;
      });
      
      setVessels(updatedVessels);
      
      // Save to localStorage
      try {
        localStorage.setItem('vesselData', JSON.stringify(updatedVessels));
      } catch (error) {
        console.error("Error saving vessel data to localStorage:", error);
      }
    }
    
    toast.success("Cargo manifest submitted successfully", {
      position: "top-center",
      className: "animate-slide-in-right"
    });
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
      toast.error("No vessel selected", {
        position: "top-center"
      });
    }
  };

  return {
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
  };
};

export default useVesselManagement;
