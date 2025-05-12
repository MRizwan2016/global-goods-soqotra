
import { useState, useEffect } from "react";
import { QatarContainer } from "../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import mockContainers from "../../data/mockContainers";

export const useContainerData = () => {
  const [containers, setContainers] = useState<QatarContainer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editContainerId, setEditContainerId] = useState<string | null>(null);

  // Load containers with a loading state
  useEffect(() => {
    setIsLoading(true);
    
    try {
      // Load containers from localStorage
      const savedContainers = localStorage.getItem('containers');
      if (savedContainers) {
        const parsedContainers = JSON.parse(savedContainers);
        if (Array.isArray(parsedContainers) && parsedContainers.length > 0) {
          setContainers(parsedContainers);
          console.log("Loaded containers from local storage:", parsedContainers.length);
        }
      } else if (mockContainers.length > 0) {
        // If no saved containers but we have mock data, use it
        setContainers(mockContainers);
        saveContainersToLocalStorage(mockContainers);
        console.log("No saved containers found, using mock data");
      } else {
        // No data at all, just use empty array
        setContainers([]);
        console.log("No container data available");
      }
    } catch (error) {
      console.error("Error loading containers:", error);
      toast.error("Error loading containers");
    } finally {
      // Add a slight delay to make loading state visible
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  const saveContainersToLocalStorage = (containersData: QatarContainer[]) => {
    try {
      localStorage.setItem('containers', JSON.stringify(containersData));
      console.log("Saved containers to localStorage:", containersData.length);
    } catch (error) {
      console.error("Error saving containers to localStorage:", error);
      toast.error("Error saving containers");
    }
  };

  // Generate a running number based on container details
  const generateRunningNumber = (container: QatarContainer) => {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const random = Math.floor(1000 + Math.random() * 9000);
    const prefix = (container.shippingLine?.substring(0, 2) || "XX") + 
                  (container.containerType?.substring(0, 2) || "XX");
    
    return `${prefix}-${year}${month}-${random}`;
  };

  const handleAddContainer = (newContainer: QatarContainer) => {
    console.log("Adding container:", newContainer);
    
    // Generate a unique ID if one is not provided
    if (!newContainer.id) {
      newContainer.id = uuidv4();
    }
    
    // Set status to "Available" if not specified
    if (!newContainer.status) {
      newContainer.status = "Available";
    }
    
    // Generate a running number if not provided
    if (!newContainer.runningNumber) {
      newContainer.runningNumber = generateRunningNumber(newContainer);
    }
    
    // Ensure container has appropriate defaults
    newContainer.packages = newContainer.packages || 0;
    newContainer.weight = newContainer.weight || 0;
    newContainer.volume = newContainer.volume || 0;
    
    // Add to containers list
    const updatedContainers = [...containers, newContainer];
    setContainers(updatedContainers);
    saveContainersToLocalStorage(updatedContainers);
    
    toast.success("Container added successfully", {
      description: `Container ${newContainer.containerNumber} has been added to the system`,
      position: "top-center",
      className: "animate-slide-in-right"
    });

    return updatedContainers;
  };

  const handleEditContainer = (containerId: string) => {
    console.log("Editing container:", containerId);
    setEditContainerId(containerId);
  };

  const handleUpdateContainer = (updatedContainer: QatarContainer) => {
    console.log("Updating container:", updatedContainer);
    
    // Ensure running number exists
    if (!updatedContainer.runningNumber) {
      updatedContainer.runningNumber = generateRunningNumber(updatedContainer);
    }
    
    const updatedContainers = containers.map(container => 
      container.id === updatedContainer.id ? updatedContainer : container
    );
    setContainers(updatedContainers);
    saveContainersToLocalStorage(updatedContainers);
    
    setEditContainerId(null);
    toast.success("Container updated successfully", {
      description: `Container ${updatedContainer.containerNumber} has been updated`,
      position: "top-center",
      className: "animate-slide-in-right"
    });

    return updatedContainers;
  };

  const getCurrentContainer = (id: string | null = null) => {
    const containerIdToUse = id || editContainerId;
    return containers.find(container => container.id === containerIdToUse) || null;
  };

  return {
    containers,
    setContainers,
    isLoading,
    editContainerId,
    setEditContainerId,
    handleAddContainer,
    handleEditContainer,
    handleUpdateContainer,
    getCurrentContainer,
    saveContainersToLocalStorage,
    generateRunningNumber
  };
};
