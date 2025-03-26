
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ArrowLeft, Ship } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useContainerManifest from "./hooks/useContainerManifest";
import ContainerDetailsSection from "./manifest/ContainerDetailsSection";
import ManifestActionsBar from "./manifest/ManifestActionsBar";
import ManifestTabsHeader from "./manifest/ManifestTabsHeader";
import TabsContentWrapper from "./manifest/TabsContentWrapper";
import PrintContainerManifest from "../print/container/PrintContainerManifest";

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
    printViewVisible,
    printOptions,
    setPrintOptions,
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
  } = useContainerManifest(containerId, onManifestSubmitted);
  
  if (!container) {
    return <div>Loading container details...</div>;
  }
  
  // Show print view when printing
  if (printViewVisible) {
    return (
      <PrintContainerManifest 
        container={container}
        cargoItems={cargoItems}
        itemList={itemList}
        consigneeList={consigneeList}
        unsettledInvoices={unsettledInvoices}
        totalVolume={totalVolume}
        totalWeight={totalWeight}
        totalPackages={totalPackages}
        confirmDate={confirmDate}
        printOptions={printOptions}
      />
    );
  }
  
  return (
    <Card className="shadow-md animate-fade-in">
      <CardHeader className="bg-green-50 border-b flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
            <FileCheck className="mr-2 text-green-600" size={22} />
            Container Manifest Confirmation
            <span className="ml-2 text-sm font-normal text-gray-600">
              Container: {container.containerNumber} | Status: {container.status}
            </span>
          </CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCancel}
          className="flex items-center gap-1 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-500">
          <div className="flex items-center text-blue-700 mb-2">
            <Ship size={20} className="mr-2" />
            <h3 className="font-semibold">Container Cargo Summary</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Packages:</span> {totalPackages}
            </div>
            <div>
              <span className="font-medium">Total Volume:</span> {formatVolume(totalVolume)} m³
            </div>
            <div>
              <span className="font-medium">Total Weight:</span> {formatWeight(totalWeight)} kg
            </div>
          </div>
        </div>
        
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
        
        <div className="flex items-center gap-4 my-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="print-section">Print Section:</Label>
            <Select 
              value={printOptions.section} 
              onValueChange={(value) => setPrintOptions({
                ...printOptions,
                section: value as "all" | "cargo" | "items" | "consignees" | "invoices"
              })}
            >
              <SelectTrigger id="print-section" className="w-[180px]">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="cargo">Cargo Items</SelectItem>
                <SelectItem value="items">Item List</SelectItem>
                <SelectItem value="consignees">Consignee List</SelectItem>
                <SelectItem value="invoices">Unsettled Invoices</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Label htmlFor="orientation">Page Orientation:</Label>
            <Select 
              value={printOptions.orientation} 
              onValueChange={(value) => setPrintOptions({
                ...printOptions,
                orientation: value as "portrait" | "landscape"
              })}
            >
              <SelectTrigger id="orientation" className="w-[150px]">
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Portrait</SelectItem>
                <SelectItem value="landscape">Landscape</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
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
          onPrint={handlePrint}
        />
      </CardContent>
    </Card>
  );
};

export default ContainerManifest;
