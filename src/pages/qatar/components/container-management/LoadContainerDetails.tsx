
import React from "react";
import { QatarContainer } from "../../types/containerTypes";
import ContainerDetailsSection from "./load-container/ContainerDetailsSection";
import LoadContainerHeader from "./load-container/LoadContainerHeader";
import LoadContainerTabs from "./load-container/LoadContainerTabs";
import LoadContainerItems from "./load-container/LoadContainerItems";
import LoadContainerActions from "./load-container/LoadContainerActions";
import { useLoadContainer } from "./load-container/hooks/useLoadContainer";

interface LoadContainerDetailsProps {
  containerId: string;
  containerData?: QatarContainer | null;
  onLoadComplete: () => void;
  onCancel: () => void;
}

const LoadContainerDetails: React.FC<LoadContainerDetailsProps> = ({
  containerId,
  containerData,
  onLoadComplete,
  onCancel,
}) => {
  const {
    cargoItems,
    activeTab,
    setActiveTab,
    scanning,
    toggleScanning,
    handleAddCargo,
    handleRemoveCargo,
    handleLoadComplete
  } = useLoadContainer({
    containerId,
    containerData,
    onLoadComplete
  });

  if (!containerData) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500 p-6 bg-white shadow-md rounded">
          Container data not found. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <LoadContainerHeader
        containerData={containerData}
        containerId={containerId}
        onCancel={onCancel}
        scanning={scanning}
        toggleScanning={toggleScanning}
      />

      <ContainerDetailsSection container={containerData} />

      <LoadContainerTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        containerId={containerId}
        onAddCargo={handleAddCargo}
        existingCargo={cargoItems}
      />

      <LoadContainerItems
        cargoItems={cargoItems}
        onRemoveCargo={handleRemoveCargo}
      />

      <LoadContainerActions
        onLoadComplete={handleLoadComplete}
        disabled={cargoItems.length === 0}
      />
    </div>
  );
};

export default LoadContainerDetails;
