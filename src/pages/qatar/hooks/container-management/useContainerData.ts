
import { useState, useEffect } from "react";
import { QatarContainer } from "../../types/containerTypes";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import mockContainers from "../../data/mockContainers";

export const useContainerData = () => {
  const [containers, setContainers] = useState<QatarContainer[]>(mockContainers);
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
        }
      }
    } catch (error) {
      console.error("Error loading containers:", error);
    } finally {
      // Add a slight delay to make loading state visible
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  const saveContainersToLocalStorage = (containersData: QatarContainer[]) => {
    try {
      localStorage.setItem('containers', JSON.stringify(containersData));
    } catch (error) {
      console.error("Error saving containers to localStorage:", error);
    }
  };

  const handleAddContainer = (newContainer: QatarContainer) => {
    // Generate a unique ID if one is not provided
    if (!newContainer.id) {
      newContainer.id = uuidv4();
    }
    
    // Set status to "Available" if not specified
    if (!newContainer.status) {
      newContainer.status = "Available";
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
    setEditContainerId(containerId);
  };

  const handleUpdateContainer = (updatedContainer: QatarContainer) => {
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

  const getCurrentContainer = () => {
    return containers.find(container => container.id === editContainerId) || null;
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
    saveContainersToLocalStorage
  };
};
