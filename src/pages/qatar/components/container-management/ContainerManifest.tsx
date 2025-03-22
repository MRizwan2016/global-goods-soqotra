
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Box, PackageCheck, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  QatarContainer,
  ContainerCargo,
  ItemListEntry,
  ConsigneeListItem, 
  UnsettledInvoice 
} from "../../types/containerTypes";
import { mockCargoItems, mockConsigneeList, mockContainers, mockItemList, mockUnsettledInvoices } from "../../data/mockContainers";

// Import refactored components
import ContainerDetailsSection from "./manifest/ContainerDetailsSection";
import CargoItemsTab from "./manifest/CargoItemsTab";
import ItemListTab from "./manifest/ItemListTab";
import UnsettledInvoicesTab from "./manifest/UnsettledInvoicesTab";
import ConsigneeListTab from "./manifest/ConsigneeListTab";
import ManifestActionsBar from "./manifest/ManifestActionsBar";

interface ContainerManifestProps {
  containerId: string;
  onManifestSubmitted: () => void;
  onCancel: () => void;
}

const ContainerManifest: React.FC<ContainerManifestProps> = ({ 
  containerId, 
  onManifestSubmitted, 
  onCancel 
}) => {
  const [container, setContainer] = useState<QatarContainer | null>(null);
  const [cargoItems, setCargoItems] = useState<ContainerCargo[]>([]);
  const [confirmDate, setConfirmDate] = useState("");
  const [vgmWeight, setVgmWeight] = useState("");
  const [activeTab, setActiveTab] = useState("cargo");
  
  // Get mock data for display
  const itemList = mockItemList;
  const consigneeList = mockConsigneeList;
  const unsettledInvoices = mockUnsettledInvoices;
  
  // Load container data
  useEffect(() => {
    const foundContainer = mockContainers.find(c => c.id === containerId);
    if (foundContainer) {
      setContainer(foundContainer);
      setVgmWeight(foundContainer.weight?.toString() || "0");
    }
    
    // Get cargo items for this container
    const containerCargoItems = mockCargoItems.filter(item => item.containerId === containerId);
    setCargoItems(containerCargoItems);
    
    // Set confirm date to today
    setConfirmDate(new Date().toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"}));
  }, [containerId]);
  
  const handleConfirm = () => {
    if (!confirmDate) {
      toast.error("Please enter a confirmation date");
      return;
    }
    
    // Update container status
    if (container) {
      container.status = "CONFIRMED";
      // In a real app, we would save to the backend
    }
    
    // Notify parent
    onManifestSubmitted();
    
    toast.success("Container manifest confirmed successfully");
  };
  
  if (!container) {
    return <div>Loading container details...</div>;
  }
  
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  
  // Calculate totals
  const totalVolume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
  const totalPackages = cargoItems.length;
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b">
        <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
          <FileCheck className="mr-2 text-green-600" size={22} />
          Load Sea Cargo - Check & Confirm
          <span className="ml-2 text-sm font-normal text-gray-600">
            Running Number: {container.runningNumber} ## Container Number: ({container.containerNumber}) Record found.
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <ContainerDetailsSection 
          container={container}
          confirmDate={confirmDate}
          setConfirmDate={setConfirmDate}
          vgmWeight={vgmWeight}
          setVgmWeight={setVgmWeight}
          totalPackages={totalPackages}
          totalVolume={totalVolume}
          formatVolume={formatVolume}
        />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="cargo" className="flex items-center gap-2">
              <Box size={18} />
              <span>Cargo Items</span>
            </TabsTrigger>
            <TabsTrigger value="items" className="flex items-center gap-2">
              <PackageCheck size={18} />
              <span>Item List</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <Database size={18} />
              <span>Unsettled Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="consignees" className="flex items-center gap-2">
              <FileCheck size={18} />
              <span>Consignee List</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cargo">
            <CargoItemsTab 
              cargoItems={cargoItems}
              formatVolume={formatVolume}
              formatWeight={formatWeight}
            />
          </TabsContent>
          
          <TabsContent value="items">
            <ItemListTab 
              itemList={itemList}
              formatVolume={formatVolume}
            />
          </TabsContent>
          
          <TabsContent value="invoices">
            <UnsettledInvoicesTab 
              unsettledInvoices={unsettledInvoices}
            />
          </TabsContent>
          
          <TabsContent value="consignees">
            <ConsigneeListTab 
              consigneeList={consigneeList}
              formatVolume={formatVolume}
            />
          </TabsContent>
        </Tabs>
        
        <ManifestActionsBar 
          onCancel={onCancel}
          onConfirm={handleConfirm}
        />
      </CardContent>
    </Card>
  );
};

export default ContainerManifest;
