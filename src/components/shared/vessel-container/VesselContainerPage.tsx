
import React from "react";
import Layout from "@/components/layout/Layout";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";
import { CountryConfig } from "./types";
import { useVesselContainerManagement } from "./hooks/useVesselContainerManagement";
import VesselListView from "./VesselListView";
import ContainerListView from "./ContainerListView";
import AddVesselForm from "./AddVesselForm";
import AddContainerForm from "./AddContainerForm";
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
  } = useVesselContainerManagement(config);

  const isListMode = viewMode === "vessel-list" || viewMode === "container-list";
  const activeTab = viewMode === "vessel-list" || viewMode === "add-vessel" ? "vessels" : "containers";

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
    </Layout>
  );
};

export default VesselContainerPage;
