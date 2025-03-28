
import { useContainerData } from "./container-manifest/useContainerData";
import { useManifestData } from "./container-manifest/useManifestData";
import { usePrinting } from "./container-manifest/usePrinting";
import { useManifestConfirmation } from "./container-manifest/useManifestConfirmation";
import { useFormatters } from "./container-manifest/useFormatters";

const useContainerManifest = (containerId: string, onManifestSubmitted: () => void) => {
  // Load container and cargo data
  const {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    isLoading,
    error
  } = useContainerData(containerId);

  // Generate manifest data from cargo items
  const {
    itemList,
    consigneeList,
    unsettledInvoices,
    totalVolume,
    totalWeight,
    totalPackages
  } = useManifestData(cargoItems);

  // Handle printing functionality
  const {
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    isPrinting,
    printOptions,
    setPrintOptions,
    handlePrint
  } = usePrinting();

  // Handle manifest confirmation - pass cargoItems to useManifestConfirmation
  const {
    handleConfirm
  } = useManifestConfirmation(container, containerId, confirmDate, cargoItems, onManifestSubmitted);

  // Formatters for display
  const {
    formatVolume,
    formatWeight
  } = useFormatters();

  return {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    printViewVisible,
    setPrintViewVisible,
    isPrinting,
    printOptions,
    setPrintOptions,
    isLoading,
    error,
    totalPackages,
    totalVolume,
    totalWeight,
    itemList,
    consigneeList,
    unsettledInvoices,
    formatVolume,
    formatWeight,
    handleConfirm,
    handlePrint
  };
};

export default useContainerManifest;
