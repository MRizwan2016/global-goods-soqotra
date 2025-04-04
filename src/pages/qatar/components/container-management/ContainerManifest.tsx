
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ContainerManifestProps } from "../../types/containerTypes";
import useContainerManifest from "../../hooks/useContainerManifest";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TabsContentWrapper from "./manifest/TabsContentWrapper";

const ContainerManifest: React.FC<ContainerManifestProps> = ({
  containerId,
  onClose
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
    printViewVisible,
    handleConfirm,
    handlePrint,
    formatVolume,
    formatWeight,
    itemList,
    consigneeList,
    unsettledInvoices,
    totalVolume,
    totalWeight,
    totalPackages
  } = useContainerManifest(containerId, onClose);

  if (!container) {
    return (
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Loading container information...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>
            Container Manifest - {container.containerNumber}
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-slate-50 p-4 rounded">
          <div>
            <p className="text-sm text-slate-500">Container Number</p>
            <p className="font-medium">{container.containerNumber}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium">{container.status}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Seal Number</p>
            <p className="font-medium">{container.sealNumber || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Packages</p>
            <p className="font-medium">{totalPackages}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Volume</p>
            <p className="font-medium">{formatVolume(totalVolume)} m³</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Weight</p>
            <p className="font-medium">{formatWeight(totalWeight)} kg</p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="cargo">Cargo Items</TabsTrigger>
            <TabsTrigger value="items">Item List</TabsTrigger>
            <TabsTrigger value="consignees">Consignee List</TabsTrigger>
            <TabsTrigger value="invoices">Unsettled Invoices</TabsTrigger>
          </TabsList>
          
          <TabsContentWrapper 
            activeTab={activeTab}
            cargoItems={cargoItems}
            itemList={itemList}
            consigneeList={consigneeList}
            unsettledInvoices={unsettledInvoices}
            formatVolume={formatVolume}
            formatWeight={formatWeight}
          />
        </Tabs>
        
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Confirm Manifest
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerManifest;
