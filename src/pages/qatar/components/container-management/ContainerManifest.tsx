
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  QatarContainer,
  ContainerCargo
} from "../../types/containerTypes";
import { mockCargoItems, mockContainers } from "../../data/mockContainers";

// Import components
import ContainerDetailsSection from "./manifest/ContainerDetailsSection";
import ManifestActionsBar from "./manifest/ManifestActionsBar";
import ManifestTabsHeader from "./manifest/ManifestTabsHeader";
import useContainerManifest from "./manifest/hooks/useContainerManifest";
import TabsContentWrapper from "./manifest/TabsContentWrapper";

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
  const {
    container,
    cargoItems,
    confirmDate,
    setConfirmDate,
    vgmWeight,
    setVgmWeight,
    activeTab,
    setActiveTab,
    totalPackages,
    totalVolume,
    itemList,
    consigneeList,
    unsettledInvoices,
    formatVolume,
    formatWeight,
    handleConfirm
  } = useContainerManifest(containerId, onManifestSubmitted);
  
  if (!container) {
    return <div>Loading container details...</div>;
  }
  
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
          <ManifestTabsHeader />
          
          <TabsContentWrapper
            activeTab={activeTab}
            cargoItems={cargoItems}
            itemList={itemList}
            unsettledInvoices={unsettledInvoices}
            consigneeList={consigneeList}
            formatVolume={formatVolume}
            formatWeight={formatWeight}
          />
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
