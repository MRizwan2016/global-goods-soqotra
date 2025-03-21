
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Grid } from "@/components/ui/grid";
import { 
  FileCheck, 
  ArrowLeft, 
  Printer,
  Save,
  Box,
  PackageCheck,
  Database
} from "lucide-react";
import { ContainerCargo, ItemListEntry, QatarContainer, ConsigneeListItem, UnsettledInvoice } from "../../types/containerTypes";
import { mockCargoItems, mockConsigneeList, mockContainers, mockItemList, mockUnsettledInvoices } from "../../data/mockContainers";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell, 
  TableFooter
} from "@/components/ui/table";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        <div className="bg-blue-600 text-white text-center py-2 mb-4 font-bold">
          CONTAINER DETAILS
        </div>
        
        <Grid className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-bold text-gray-700 mb-1 block">SECTOR:</Label>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                  {container.sector}
                </div>
              </div>
              
              <div>
                <Label className="font-bold text-gray-700 mb-1 block">RUNNING NUMBER:</Label>
                <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                  {container.runningNumber}
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">CONTAINER NUMBER:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.containerNumber}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">SEAL NUMBER:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.sealNumber}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">DATE CONFIRM:</Label>
              <Input
                value={confirmDate}
                onChange={(e) => setConfirmDate(e.target.value)}
              />
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">V.G.M. WEIGHT:</Label>
              <Input
                value={vgmWeight}
                onChange={(e) => setVgmWeight(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <div>
              <Label className="font-bold text-gray-700 mb-1 block">CONTAINER TYPE:</Label>
              <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
                {container.containerType}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">DIRECT/ MIX:</Label>
              <div className="bg-blue-500 text-white p-2 rounded text-center font-semibold">
                {container.direction}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">E.T.D:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.etd}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">E.T.A:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {container.eta}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">PACKAGES:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {totalPackages}
              </div>
            </div>
            
            <div className="mt-3">
              <Label className="font-bold text-gray-700 mb-1 block">VOLUME:</Label>
              <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                {formatVolume(totalVolume)}
              </div>
            </div>
          </div>
        </Grid>
        
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
          
          <TabsContent value="cargo" className="space-y-4">
            <div className="bg-blue-600 text-white py-1 mb-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-white font-semibold text-center">Num</TableHead>
                    <TableHead className="text-white font-semibold">INVOICE</TableHead>
                    <TableHead className="text-white font-semibold">L. Num</TableHead>
                    <TableHead className="text-white font-semibold">BARCODE</TableHead>
                    <TableHead className="text-white font-semibold">PACKAGE</TableHead>
                    <TableHead className="text-white font-semibold">VOLUME</TableHead>
                    <TableHead className="text-white font-semibold">WEIGHT</TableHead>
                    <TableHead className="text-white font-semibold">CONSIGNEE</TableHead>
                    <TableHead className="text-white font-semibold">SHIPPER</TableHead>
                    <TableHead className="text-white font-semibold">W/H</TableHead>
                    <TableHead className="text-white font-semibold">D2D</TableHead>
                    <TableHead className="text-white font-semibold text-center">UNLOAD</TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            
            <Table>
              <TableBody>
                {cargoItems.map((item, index) => (
                  <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{item.invoiceNumber}</TableCell>
                    <TableCell>{item.lineNumber}</TableCell>
                    <TableCell>{item.barcode || "-"}</TableCell>
                    <TableCell>{item.packageName}</TableCell>
                    <TableCell>{formatVolume(item.volume)}</TableCell>
                    <TableCell>
                      <Input
                        value={formatWeight(item.weight)}
                        onChange={() => {}}
                        className="w-full p-1 text-sm"
                      />
                    </TableCell>
                    <TableCell>{item.consignee}</TableCell>
                    <TableCell>{item.shipper}</TableCell>
                    <TableCell>{item.wh}</TableCell>
                    <TableCell>{item.d2d ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-center">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 whitespace-normal p-2 h-auto text-xs"
                      >
                        {item.packageName}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="items" className="space-y-4">
            <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
              ITEM LIST
            </div>
            
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
                  <TableHead className="font-bold text-blue-800">ITEM NAME</TableHead>
                  <TableHead className="font-bold text-blue-800 text-center">QUANTITY</TableHead>
                  <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemList.map((item, index) => (
                  <TableRow key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-center">{formatVolume(item.volume)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={2} className="text-right font-bold">TOTAL:</TableCell>
                  <TableCell className="text-center font-bold">{itemList.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                  <TableCell className="text-center font-bold">{formatVolume(itemList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TabsContent>
          
          <TabsContent value="invoices" className="space-y-4">
            <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
              UNSETTLED INVOICES
            </div>
            
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
                  <TableHead className="font-bold text-blue-800 text-center">GY</TableHead>
                  <TableHead className="font-bold text-blue-800">SHIPPER</TableHead>
                  <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
                  <TableHead className="font-bold text-blue-800 text-right">NET</TableHead>
                  <TableHead className="font-bold text-blue-800 text-right">PAID</TableHead>
                  <TableHead className="font-bold text-blue-800 text-right">DUE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unsettledInvoices.map((invoice, index) => (
                  <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{invoice.gy}</TableCell>
                    <TableCell>{invoice.shipper}</TableCell>
                    <TableCell>{invoice.consignee}</TableCell>
                    <TableCell className="text-right">{invoice.net}</TableCell>
                    <TableCell className="text-right">{invoice.paid}</TableCell>
                    <TableCell className="text-right">{invoice.due}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="consignees" className="space-y-4">
            <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
              CONSIGNEE LIST
            </div>
            
            <Table>
              <TableHeader className="bg-blue-50">
                <TableRow>
                  <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
                  <TableHead className="font-bold text-blue-800 text-center">INVOICE</TableHead>
                  <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
                  <TableHead className="font-bold text-blue-800 text-center">VOLUME</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {consigneeList.map((consignee, index) => (
                  <TableRow key={consignee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{consignee.invoice}</TableCell>
                    <TableCell>{consignee.consignee}</TableCell>
                    <TableCell className="text-center">{formatVolume(consignee.volume)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={3} className="text-right font-bold">TOTAL:</TableCell>
                  <TableCell className="text-center font-bold">{formatVolume(consigneeList.reduce((sum, item) => sum + item.volume, 0))}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              onClick={handleConfirm}
            >
              <Save size={16} />
              Save
            </Button>
          </div>
          
          <Button 
            variant="default" 
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <Printer size={16} />
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContainerManifest;
