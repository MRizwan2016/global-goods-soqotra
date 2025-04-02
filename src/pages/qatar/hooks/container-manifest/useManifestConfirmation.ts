
import { toast } from "sonner";
import { QatarContainer, ContainerCargo } from "../../types/containerTypes";

export const useManifestConfirmation = (
  container: QatarContainer | null,
  containerId: string,
  confirmDate: string,
  cargoItems: ContainerCargo[],
  onManifestSubmitted: () => void
) => {
  const handleConfirm = () => {
    if (!container) {
      toast.error("Container data is missing");
      return;
    }
    
    if (!confirmDate) {
      toast.error("Please enter a confirmation date");
      return;
    }
    
    // Update container status and save to localStorage
    const updatedContainer = {
      ...container,
      status: "CONFIRMED",
      confirmDate: confirmDate
    };
    
    // Save to localStorage
    localStorage.setItem(`container_${containerId}`, JSON.stringify(updatedContainer));
    
    // Notify parent
    onManifestSubmitted();
    
    toast.success("Container manifest confirmed successfully", {
      action: {
        label: "View Manifest",
        onClick: () => {
          // This will be handled in the parent component
          const event = new CustomEvent('viewContainerManifest', { 
            detail: { containerId } 
          });
          document.dispatchEvent(event);
        }
      }
    });
  };

  return {
    handleConfirm
  };
};
