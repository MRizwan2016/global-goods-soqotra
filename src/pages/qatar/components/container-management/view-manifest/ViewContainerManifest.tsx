
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, ArrowLeft, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice } from "../../../types/containerTypes";
import PrintContainerManifest from "../../print/container/PrintContainerManifest";
import CargoItemsTab from "../manifest/CargoItemsTab";
import ItemListTab from "../manifest/ItemListTab";
import ConsigneeListTab from "../manifest/ConsigneeListTab";
import UnsettledInvoicesTab from "../manifest/UnsettledInvoicesTab";
import ManifestTabsHeader from "../manifest/ManifestTabsHeader";

interface ViewContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  unsettledInvoices: UnsettledInvoice[];
  onBack: () => void;
}

const ViewContainerManifest: React.FC<ViewContainerManifestProps> = ({
  container,
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState("cargo");
  const [printViewVisible, setPrintViewVisible] = useState(false);
  const [printOptions, setPrintOptions] = useState({
    section: "all", // "all", "cargo", "items", "consignees", "invoices"
    orientation: "portrait" // "portrait", "landscape"
  });
  
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  
  const totalVolume = cargoItems.reduce((sum, item) => sum + item.volume, 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + item.weight, 0);
  const totalPackages = cargoItems.length;
  
  const handlePrint = () => {
    setPrintViewVisible(true);
    
    // Allow time for the print view to render before printing
    setTimeout(() => {
      window.print();
      
      // Reset after printing
      setTimeout(() => {
        setPrintViewVisible(false);
      }, 500);
    }, 100);
  };
  
  // Show print view when printing
  if (printViewVisible) {
    return (
      <PrintContainerManifest 
        container={container}
        cargoItems={cargoItems}
        itemList={itemList}
        consigneeList={consigneeList}
        totalVolume={totalVolume}
        totalWeight={totalWeight}
        totalPackages={totalPackages}
        confirmDate={container.confirmDate || new Date().toLocaleDateString()}
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
            Container Manifest: {container.containerNumber}
            <span className="ml-2 text-sm font-normal text-gray-600">
              Status: {container.status}
            </span>
          </CardTitle>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onBack}
          className="flex items-center gap-1 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="bg-blue-50 p-4 rounded-md mb-6 border-l-4 border-blue-500">
          <div className="flex items-center text-blue-700 mb-2">
            <FileText size={20} className="mr-2" />
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
        
        <div className="mb-6 bg-gray-50 p-4 rounded-md border">
          <h3 className="font-semibold mb-3">Print Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-2">Section to Print</h4>
              <RadioGroup 
                value={printOptions.section} 
                onValueChange={(value) => setPrintOptions({...printOptions, section: value})}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="section-all" />
                  <Label htmlFor="section-all">All Sections</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cargo" id="section-cargo" />
                  <Label htmlFor="section-cargo">Cargo Items Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="items" id="section-items" />
                  <Label htmlFor="section-items">Item List Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consignees" id="section-consignees" />
                  <Label htmlFor="section-consignees">Consignee List Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="invoices" id="section-invoices" />
                  <Label htmlFor="section-invoices">Unsettled Invoices Only</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Page Orientation</h4>
              <RadioGroup 
                value={printOptions.orientation} 
                onValueChange={(value) => setPrintOptions({...printOptions, orientation: value})}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portrait" id="orientation-portrait" />
                  <Label htmlFor="orientation-portrait">Portrait (A4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landscape" id="orientation-landscape" />
                  <Label htmlFor="orientation-landscape">Landscape (A4)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2 mt-4 hover:scale-105 transition-transform"
            onClick={handlePrint}
          >
            <Printer size={16} />
            Print Manifest
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <ManifestTabsHeader />
          
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
          
          <TabsContent value="consignees">
            <ConsigneeListTab 
              consigneeList={consigneeList}
              formatVolume={formatVolume}
            />
          </TabsContent>
          
          <TabsContent value="invoices">
            <UnsettledInvoicesTab 
              unsettledInvoices={unsettledInvoices}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ViewContainerManifest;
