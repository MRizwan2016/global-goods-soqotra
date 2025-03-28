
import { toast } from "sonner";
import { QatarContainer } from "../../types/containerTypes";
import mockContainers from "../../data/mockContainers";

export const useManifestConfirmation = (container: QatarContainer | null, containerId: string, confirmDate: string, onManifestSubmitted: () => void) => {
  const handleConfirm = () => {
    if (!confirmDate) {
      toast.error("PLEASE ENTER A CONFIRMATION DATE");
      return;
    }
    
    if (!container) {
      toast.error("CONTAINER DATA NOT FOUND");
      return;
    }
    
    // Update container status
    try {
      // Find the container in the mockContainers array
      const containerIndex = mockContainers.findIndex(c => c.id === container.id);
      if (containerIndex >= 0) {
        mockContainers[containerIndex].status = "CONFIRMED";
        mockContainers[containerIndex].confirmDate = confirmDate;
        // In a real app, we would save to the backend
      }
      
      // Store the containerId in localStorage so we can retrieve it later
      // This ensures the manifest can be viewed after being confirmed
      localStorage.setItem('lastConfirmedContainerId', containerId);
      
      // Notify parent of successful submission
      onManifestSubmitted();
      
      toast.success("CONTAINER MANIFEST CONFIRMED SUCCESSFULLY", {
        action: {
          label: "VIEW MANIFEST",
          onClick: () => {
            // This will be handled in the parent component
            const event = new CustomEvent('viewContainerManifest', { 
              detail: { containerId } 
            });
            document.dispatchEvent(event);
          }
        }
      });
    } catch (err) {
      console.error("Error confirming manifest:", err);
      toast.error("FAILED TO CONFIRM MANIFEST");
    }
  };

  return {
    handleConfirm
  };
};
