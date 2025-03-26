import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContainerList from "./components/container-management/ContainerList";
import AddContainer from "./components/container-management/AddContainer";
import LoadContainerDetails from "./components/container-management/LoadContainerDetails";
import ContainerManifest from "./components/container-management/ContainerManifest";
import ViewContainerManifest from "./components/container-management/view-manifest/ViewContainerManifest";
import Layout from "@/components/layout/Layout";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "./types/containerTypes";
import { toast } from "sonner";
import PrintStyles from "./components/print/PrintStyles";

// Mock data imports - in a real application, this would be fetched from an API
import mockContainers, { mockCargoItems } from "./data/mockContainers";

const ContainerManagement: React.FC = () => {
  const [containers, setContainers] = useState<QatarContainer[]>(mockContainers);
  const [activeTab, setActiveTab] = useState("containers");
  const [editContainerId, setEditContainerId] = useState<string | null>(null);
  const [viewManifestId, setViewManifestId] = useState<string | null>(null);
  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    section: "all",
    orientation: "portrait"
  });

  // Add event listener for manifest view
  useEffect(() => {
    const handleViewManifest = (event: CustomEvent) => {
      if (event.detail && event.detail.containerId) {
        setViewManifestId(event.detail.containerId);
        setActiveTab("view-manifest");
      }
    };
    
    // Listen for both event types (for backward compatibility)
    document.addEventListener('viewManifest', handleViewManifest as EventListener);
    document.addEventListener('viewContainerManifest', handleViewManifest as EventListener);
    
    return () => {
      document.removeEventListener('viewManifest', handleViewManifest as EventListener);
      document.removeEventListener('viewContainerManifest', handleViewManifest as EventListener);
    };
  }, []);

  // Mock data for the manifest view
  const getMockCargoItems = (): ContainerCargo[] => [
    {
      id: "cargo1",
      containerId: viewManifestId || "",
      invoiceNumber: "INV-2023-001",
      lineNumber: "L1",
      barcode: "BC12345",
      packageName: "Carton Box",
      volume: 1.25,
      weight: 45.6,
      shipper: "Qatar Logistics",
      consignee: "Dubai Warehousing",
      wh: "WH-001",
      d2d: true
    },
    {
      id: "cargo2",
      containerId: viewManifestId || "",
      invoiceNumber: "INV-2023-002",
      lineNumber: "L2",
      packageName: "Wooden Crate",
      volume: 2.15,
      weight: 120.75,
      shipper: "Soqotra Shipping",
      consignee: "Abu Dhabi Trading",
      wh: "WH-002",
      d2d: false
    },
  ];

  const getMockItemList = (): ItemListEntry[] => [
    {
      id: "item1",
      invoice: "INV-2023-001",
      shipper: "Qatar Logistics",
      consignee: "Dubai Warehousing",
      packages: 5,
      volume: 1.25,
      packageName: "Carton Box",
      quantity: 10
    },
    {
      id: "item2",
      invoice: "INV-2023-002",
      shipper: "Soqotra Shipping",
      consignee: "Abu Dhabi Trading",
      packages: 2,
      volume: 2.15,
      packageName: "Wooden Crate",
      quantity: 2
    },
  ];

  const getMockConsigneeList = (): ConsigneeListItem[] => [
    {
      id: "cons1",
      invoice: "INV-2023-001",
      shipper: "Qatar Logistics",
      shipperContact: "+974 1234 5678",
      consignee: "Dubai Warehousing",
      consigneeContact: "+971 9876 5432",
      volume: 1.25
    },
    {
      id: "cons2",
      invoice: "INV-2023-002",
      shipper: "Soqotra Shipping",
      shipperContact: "+974 8765 4321",
      consignee: "Abu Dhabi Trading",
      consigneeContact: "+971 1234 5678",
      volume: 2.15
    },
  ];

  const getMockUnsettledInvoices = (): UnsettledInvoice[] => [
    {
      id: "inv1",
      invoiceNumber: "INV-2023-001",
      shipper: "Qatar Logistics",
      consignee: "Dubai Warehousing",
      amount: 1250.75,
      paid: false,
      gy: "GY-001",
      net: 1100.50,
      due: 150.25
    },
    {
      id: "inv2",
      invoiceNumber: "INV-2023-002",
      shipper: "Soqotra Shipping",
      consignee: "Abu Dhabi Trading",
      amount: 2750.50,
      paid: false,
      gy: "GY-002",
      net: 2500.00,
      due: 250.50
    },
  ];

  const handleAddContainer = (newContainer: QatarContainer) => {
    setContainers([...containers, newContainer]);
    setActiveTab("containers");
    toast.success("Container added successfully");
  };

  const handleEditContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("edit");
  };

  const handleUpdateContainer = (updatedContainer: QatarContainer) => {
    const updatedContainers = containers.map(container => 
      container.id === updatedContainer.id ? updatedContainer : container
    );
    setContainers(updatedContainers);
    setActiveTab("containers");
    setEditContainerId(null);
    toast.success("Container updated successfully");
  };

  const handleCancelEdit = () => {
    setActiveTab("containers");
    setEditContainerId(null);
  };

  const handleLoadContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("load");
  };

  const handleManifestContainer = (containerId: string) => {
    setEditContainerId(containerId);
    setActiveTab("manifest");
  };

  const handleViewManifest = (containerId: string) => {
    setViewManifestId(containerId);
    setActiveTab("view-manifest");
  };

  const handleManifestSubmitted = () => {
    // Update container status to "Loaded" or similar
    const updatedContainers = containers.map(container => 
      container.id === editContainerId ? { ...container, status: "Loaded" } : container
    );
    setContainers(updatedContainers);
    setActiveTab("containers");
    
    // Show success message with view manifest option
    toast.success("Container manifest submitted successfully", {
      action: {
        label: "View Manifest",
        onClick: () => {
          // Create and dispatch a custom event
          const event = new CustomEvent('viewContainerManifest', { 
            detail: { containerId: editContainerId } 
          });
          document.dispatchEvent(event);
        }
      }
    });
  };

  const getCurrentContainer = () => {
    return containers.find(container => container.id === (editContainerId || viewManifestId)) || null;
  };

  const handlePrintOptionsChange = (options: Partial<PrintOptions>) => {
    setPrintOptions(prev => ({ ...prev, ...options }));
  };

  const handlePrint = () => {
    window.print();
  };

  // Get cargo items for the current container
  const getCurrentCargoItems = () => {
    const containerId = viewManifestId || editContainerId;
    if (!containerId) return [];
    return mockCargoItems.filter(item => item.containerId === containerId);
  };

  return (
    <Layout title="Container Management">
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none px-4 bg-gray-50">
                <TabsTrigger value="containers" className="data-[state=active]:bg-white">
                  Container List
                </TabsTrigger>
                <TabsTrigger value="add" className="data-[state=active]:bg-white">
                  Add Container
                </TabsTrigger>
                {activeTab === "edit" && (
                  <TabsTrigger value="edit" className="data-[state=active]:bg-white">
                    Edit Container
                  </TabsTrigger>
                )}
                {activeTab === "load" && (
                  <TabsTrigger value="load" className="data-[state=active]:bg-white">
                    Load Container
                  </TabsTrigger>
                )}
                {activeTab === "manifest" && (
                  <TabsTrigger value="manifest" className="data-[state=active]:bg-white">
                    Container Manifest
                  </TabsTrigger>
                )}
                {activeTab === "view-manifest" && (
                  <TabsTrigger value="view-manifest" className="data-[state=active]:bg-white">
                    View Manifest
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="containers" className="p-0 border-0">
                <ContainerList 
                  onEditContainer={handleEditContainer}
                  onLoadContainer={handleLoadContainer} 
                  onViewManifest={handleViewManifest}
                  onCreateManifest={handleManifestContainer}
                  containersList={containers}
                />
              </TabsContent>

              <TabsContent value="add" className="p-0 border-0">
                <AddContainer 
                  onSubmit={handleAddContainer} 
                  onCancel={() => setActiveTab("containers")} 
                />
              </TabsContent>

              <TabsContent value="edit" className="p-0 border-0">
                {editContainerId && (
                  <AddContainer 
                    containerData={getCurrentContainer()} 
                    onSubmit={handleUpdateContainer}
                    onCancel={handleCancelEdit}
                    isEditing={true}
                  />
                )}
              </TabsContent>

              <TabsContent value="load" className="p-0 border-0">
                {editContainerId && (
                  <LoadContainerDetails 
                    containerId={editContainerId}
                    containerData={getCurrentContainer()}
                    onLoadComplete={() => {
                      handleManifestContainer(editContainerId);
                    }}
                    onCancel={handleCancelEdit}
                  />
                )}
              </TabsContent>

              <TabsContent value="manifest" className="p-0 border-0">
                {editContainerId && (
                  <ContainerManifest 
                    containerId={editContainerId}
                    onManifestSubmitted={handleManifestSubmitted}
                    onCancel={handleCancelEdit}
                  />
                )}
              </TabsContent>

              <TabsContent value="view-manifest" className="p-0 border-0">
                {viewManifestId && getCurrentContainer() && (
                  <>
                    <PrintStyles orientation={printOptions.orientation} />
                    <ViewContainerManifest 
                      container={getCurrentContainer() as QatarContainer}
                      cargoItems={getCurrentCargoItems()}
                      itemList={getCurrentCargoItems().reduce((acc: ItemListEntry[], item) => {
                        const existingIndex = acc.findIndex(entry => entry.invoice === item.invoiceNumber);
                        if (existingIndex >= 0) {
                          acc[existingIndex].packages += 1;
                          acc[existingIndex].volume += item.volume;
                        } else {
                          acc.push({
                            id: item.id,
                            invoice: item.invoiceNumber,
                            shipper: item.shipper,
                            consignee: item.consignee,
                            packages: 1,
                            volume: item.volume,
                            packageName: item.packageName
                          });
                        }
                        return acc;
                      }, [])}
                      consigneeList={getCurrentCargoItems().reduce((acc: ConsigneeListItem[], item) => {
                        const existingIndex = acc.findIndex(
                          entry => entry.consignee === item.consignee && entry.invoice === item.invoiceNumber
                        );
                        if (existingIndex >= 0) {
                          acc[existingIndex].volume += item.volume;
                        } else {
                          acc.push({
                            id: item.id,
                            invoice: item.invoiceNumber,
                            shipper: item.shipper,
                            shipperContact: "Mobile: +974 " + Math.floor(10000000 + Math.random() * 90000000),
                            consignee: item.consignee,
                            consigneeContact: "Mobile: +94 " + Math.floor(700000000 + Math.random() * 90000000),
                            volume: item.volume
                          });
                        }
                        return acc;
                      }, [])}
                      unsettledInvoices={getCurrentCargoItems().reduce((acc: UnsettledInvoice[], item) => {
                        const existingIndex = acc.findIndex(entry => 
                          entry.invoiceNumber === item.invoiceNumber && 
                          entry.shipper === item.shipper &&
                          entry.consignee === item.consignee
                        );
                        if (existingIndex === -1) {
                          acc.push({
                            id: item.id,
                            invoiceNumber: item.invoiceNumber,
                            shipper: item.shipper,
                            consignee: item.consignee,
                            amount: Math.floor(5000 + Math.random() * 10000) / 100,
                            paid: Math.random() > 0.3
                          });
                        }
                        return acc;
                      }, [])}
                      onBack={() => setActiveTab("containers")}
                      printOptions={printOptions}
                      onPrintOptionsChange={handlePrintOptionsChange}
                      onPrint={handlePrint}
                    />
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ContainerManagement;
