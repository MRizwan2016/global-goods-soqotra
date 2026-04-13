
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import { CountryConfig, ContainerData, VesselData } from "./types";
import { useVesselContainerManagement } from "./hooks/useVesselContainerManagement";
import VesselListView from "./VesselListView";
import ContainerListView from "./ContainerListView";
import AddVesselForm from "./AddVesselForm";
import AddContainerForm from "./AddContainerForm";
import ContainerLoadingPanel from "./ContainerLoadingPanel";
import VesselLoadingPanel from "./VesselLoadingPanel";
import SeaCargoManifest from "./SeaCargoManifest";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VesselContainerPageProps {
  config: CountryConfig;
}

const VesselContainerPage: React.FC<VesselContainerPageProps> = ({ config }) => {
  const {
    viewMode,
    setViewMode,
    selectedSector,
    setSelectedSector,
    confirmFilter,
    setConfirmFilter,
    searchTerm,
    setSearchTerm,
    entriesPerPage,
    setEntriesPerPage,
    vesselForm,
    setVesselForm,
    containerForm,
    setContainerForm,
    initVesselForm,
    initContainerForm,
    saveVessel,
    saveContainer,
    filteredVessels,
    filteredContainers,
    vessels,
    containers,
    updateVesselContainers,
  } = useVesselContainerManagement(config);

  const [activeContainer, setActiveContainer] = useState<ContainerData | null>(null);
  const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);

  const isListMode = viewMode === "vessel-list" || viewMode === "container-list";
  const activeTab = viewMode === "vessel-list" || viewMode === "add-vessel" ? "vessels" : "containers";

  const handleLoadContainer = (container: ContainerData) => {
    setActiveContainer(container);
    setViewMode("load-container");
  };

  const handleViewManifest = (container: ContainerData) => {
    setActiveContainer(container);
    setViewMode("manifest-view");
  };

  const handleEditVessel = (vessel: VesselData) => {
    setVesselForm(vessel);
    setViewMode("add-vessel");
  };

  const handleEditContainer = (container: ContainerData) => {
    setContainerForm(container);
    setViewMode("add-container");
  };

  const handleLoadVessel = (vessel: VesselData) => {
    setActiveVessel(vessel);
    setViewMode("load-vessel");
  };

  const handleVesselLoadComplete = (vesselId: string, containerRunningNumbers: string[]) => {
    updateVesselContainers(vesselId, containerRunningNumbers);
    setViewMode("vessel-list");
  };

  const handleViewVesselManifest = (vessel: VesselData) => {
    // Show manifest for the first container in the vessel, with vessel details
    if (vessel.containers && vessel.containers.length > 0) {
      const firstContainerRN = vessel.containers[0];
      const container = containers.find(
        (c) => c.runningNumber === firstContainerRN || c.id === firstContainerRN
      );
      if (container) {
        setActiveContainer(container);
        setActiveVessel(vessel);
        setViewMode("manifest-view");
        return;
      }
    }
    // If no containers loaded, still show manifest with vessel info
    setActiveVessel(vessel);
    setActiveContainer(null);
    setViewMode("vessel-manifest");
  };

  // Find the vessel that contains this container
  const findVesselForContainer = (container: ContainerData) => {
    return vessels.find((v) =>
      v.containers?.includes(container.runningNumber) ||
      v.containers?.includes(container.id)
    ) || null;
  };

  return (
    <Layout title={`Dashboard - ${config.country}`}>
      <PageBreadcrumb className="mb-4" />
      <div className="bg-gray-100 border rounded-lg p-3 mb-4">
        <span className="text-sm text-gray-600">Dashboard</span>
      </div>

      {isListMode && (
        <div className="mb-4">
          <Tabs value={activeTab} onValueChange={(v) => setViewMode(v === "vessels" ? "vessel-list" : "container-list")}>
            <TabsList className="bg-white border">
              <TabsTrigger value="vessels" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-6">
                Vessel Management
              </TabsTrigger>
              <TabsTrigger value="containers" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-6">
                Container Management
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      {viewMode === "vessel-list" && (
        <VesselListView
          config={config}
          vessels={filteredVessels}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          onAddNew={initVesselForm}
          onEditVessel={handleEditVessel}
          onLoadVessel={handleLoadVessel}
          onViewVesselManifest={handleViewVesselManifest}
        />
      )}

      {viewMode === "container-list" && (
        <ContainerListView
          config={config}
          containers={filteredContainers}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          confirmFilter={confirmFilter}
          setConfirmFilter={setConfirmFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          entriesPerPage={entriesPerPage}
          setEntriesPerPage={setEntriesPerPage}
          onAddNew={initContainerForm}
          onLoadContainer={handleLoadContainer}
          onViewManifest={handleViewManifest}
          onEditContainer={handleEditContainer}
        />
      )}

      {viewMode === "add-vessel" && (
        <AddVesselForm
          config={config}
          form={vesselForm}
          setForm={setVesselForm}
          onSave={saveVessel}
          onCancel={() => setViewMode("vessel-list")}
        />
      )}

      {viewMode === "add-container" && (
        <AddContainerForm
          config={config}
          form={containerForm}
          setForm={setContainerForm}
          onSave={saveContainer}
          onCancel={() => setViewMode("container-list")}
        />
      )}

      {viewMode === "load-container" && activeContainer && (
        <ContainerLoadingPanel
          container={activeContainer}
          countryName={config.country}
          onBack={() => setViewMode("container-list")}
          onLoadingComplete={() => {}}
        />
      )}

      {viewMode === "load-vessel" && activeVessel && (
        <VesselLoadingPanel
          vessel={activeVessel}
          allContainers={containers}
          onBack={() => setViewMode("vessel-list")}
          onLoadComplete={handleVesselLoadComplete}
        />
      )}

      {viewMode === "manifest-view" && activeContainer && (
        <SeaCargoManifest
          container={activeContainer}
          vessel={activeVessel || findVesselForContainer(activeContainer)}
          countryName={config.country}
          onBack={() => { setActiveVessel(null); setViewMode("container-list"); }}
        />
      )}

      {viewMode === "vessel-manifest" && activeVessel && (
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center text-gray-500">
          <p className="text-lg font-medium mb-2">No containers loaded into this vessel yet.</p>
          <p>Use the "Load" button to assign containers to vessel <strong>{activeVessel.vesselName}</strong> first.</p>
          <div className="mt-4">
            <button onClick={() => setViewMode("vessel-list")} className="text-blue-600 underline">Go Back</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default VesselContainerPage;
