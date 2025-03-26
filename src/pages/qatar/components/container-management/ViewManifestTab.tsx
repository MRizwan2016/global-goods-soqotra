
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PrintOptions, QatarContainer } from "../../types/containerTypes";
import { ArrowLeft, Printer } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ContainerList from "./ContainerList";

interface ViewContainerManifestProps {
  container: QatarContainer | null;
  cargoItems: any[];
  itemList: any[];
  consigneeList: any[];
  unsettledInvoices: any[];
  onBack: () => void;
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
}

const ViewManifestTab: React.FC<ViewContainerManifestProps> = ({
  container,
  cargoItems,
  itemList,
  consigneeList,
  unsettledInvoices,
  onBack,
  printOptions,
  onPrintOptionsChange,
  onPrint
}) => {
  const [activeTab, setActiveTab] = useState("container-details");

  // Format container data for the ContainerList component
  const containerData = container ? [
    {
      ...container, // Spread all existing container properties
      // Ensure all required properties from QatarContainer exist
      id: container.id,
      containerNumber: container.containerNumber,
      containerType: container.containerType,
      runningNumber: container.runningNumber || "",
      status: container.status,
      sealNumber: container.sealNumber || "N/A",
      weight: container.weight || 0,
      packages: container.packages || 0,
      volume: container.volume || 0
    }
  ] : [];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            BACK
          </Button>
          <h2 className="text-2xl font-bold">CONTAINER MANIFEST</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">PRINT SECTION:</span>
            <Select 
              value={printOptions.section} 
              onValueChange={(value) => onPrintOptionsChange({ section: value as any })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="SELECT SECTION" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">ALL SECTIONS</SelectItem>
                <SelectItem value="cargo">CARGO DETAILS</SelectItem>
                <SelectItem value="items">ITEM LIST</SelectItem>
                <SelectItem value="consignees">CONSIGNEE LIST</SelectItem>
                <SelectItem value="invoices">UNSETTLED INVOICES</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">LAYOUT:</span>
            <Select 
              value={printOptions.orientation} 
              onValueChange={(value) => onPrintOptionsChange({ orientation: value as any })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="SELECT ORIENTATION" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">PORTRAIT</SelectItem>
                <SelectItem value="landscape">LANDSCAPE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={onPrint} className="bg-blue-600 hover:bg-blue-700">
            <Printer className="h-4 w-4 mr-2" />
            PRINT MANIFEST
          </Button>
        </div>
      </div>
      
      {container && (
        <Card className="mb-6 print-container">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg">CONTAINER #{container.containerNumber}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium">CONTAINER NUMBER:</p>
                <p className="text-lg">{container.containerNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">TYPE:</p>
                <p className="text-lg">{container.containerType}</p>
              </div>
              <div>
                <p className="text-sm font-medium">SEAL NUMBER:</p>
                <p className="text-lg">{container.sealNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">SHIPPING LINE:</p>
                <p className="text-lg">{container.shippingLine || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">SECTOR:</p>
                <p className="text-lg">{container.sector || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium">STATUS:</p>
                <p className="text-lg">{container.status}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="print-container">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 no-print">
            <TabsTrigger value="container-details">CONTAINER DETAILS</TabsTrigger>
            <TabsTrigger value="cargo-items">CARGO ITEMS ({cargoItems?.length || 0})</TabsTrigger>
            <TabsTrigger value="item-list">ITEM LIST ({itemList?.length || 0})</TabsTrigger>
            <TabsTrigger value="consignee-list">CONSIGNEE LIST ({consigneeList?.length || 0})</TabsTrigger>
            <TabsTrigger value="unsettled-invoices">UNSETTLED INVOICES ({unsettledInvoices?.filter(inv => !inv.paid).length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="container-details">
            <ContainerList containerData={containerData} />
            
            <Card>
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CARGO SUMMARY</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium">TOTAL PACKAGES:</p>
                    <p className="text-lg">{container?.packages || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">TOTAL VOLUME:</p>
                    <p className="text-lg">{container?.volume || 0} m³</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">TOTAL WEIGHT:</p>
                    <p className="text-lg">{container?.weight || 0} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cargo-items">
            <Card>
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CARGO ITEMS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left">INVOICE</th>
                        <th className="p-2 text-left">BARCODE</th>
                        <th className="p-2 text-left">PACKAGE</th>
                        <th className="p-2 text-left">VOLUME</th>
                        <th className="p-2 text-left">WEIGHT</th>
                        <th className="p-2 text-left">SHIPPER</th>
                        <th className="p-2 text-left">CONSIGNEE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cargoItems && cargoItems.length > 0 ? (
                        cargoItems.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{item.invoiceNumber}</td>
                            <td className="p-2">{item.barcode || 'N/A'}</td>
                            <td className="p-2">{item.packageName}</td>
                            <td className="p-2">{item.volume} m³</td>
                            <td className="p-2">{item.weight} kg</td>
                            <td className="p-2">{item.shipper}</td>
                            <td className="p-2">{item.consignee}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-gray-500">
                            NO CARGO ITEMS FOUND
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="item-list">
            <Card>
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>ITEM LIST</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left">INVOICE</th>
                        <th className="p-2 text-left">SHIPPER</th>
                        <th className="p-2 text-left">CONSIGNEE</th>
                        <th className="p-2 text-left">PACKAGES</th>
                        <th className="p-2 text-left">PACKAGE TYPE</th>
                        <th className="p-2 text-left">VOLUME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList && itemList.length > 0 ? (
                        itemList.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{item.invoice}</td>
                            <td className="p-2">{item.shipper}</td>
                            <td className="p-2">{item.consignee}</td>
                            <td className="p-2">{item.packages}</td>
                            <td className="p-2">{item.packageName || 'PACKAGE'}</td>
                            <td className="p-2">{item.volume.toFixed(2)} m³</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            NO ITEMS FOUND
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consignee-list">
            <Card>
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CONSIGNEE LIST</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left">INVOICE</th>
                        <th className="p-2 text-left">SHIPPER</th>
                        <th className="p-2 text-left">SHIPPER CONTACT</th>
                        <th className="p-2 text-left">CONSIGNEE</th>
                        <th className="p-2 text-left">CONSIGNEE CONTACT</th>
                        <th className="p-2 text-left">VOLUME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consigneeList && consigneeList.length > 0 ? (
                        consigneeList.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{item.invoice}</td>
                            <td className="p-2">{item.shipper}</td>
                            <td className="p-2">{item.shipperContact || 'N/A'}</td>
                            <td className="p-2">{item.consignee}</td>
                            <td className="p-2">{item.consigneeContact || 'N/A'}</td>
                            <td className="p-2">{item.volume.toFixed(2)} m³</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            NO CONSIGNEES FOUND
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="unsettled-invoices">
            <Card>
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>UNSETTLED INVOICES</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left">INVOICE</th>
                        <th className="p-2 text-left">SHIPPER</th>
                        <th className="p-2 text-left">CONSIGNEE</th>
                        <th className="p-2 text-left">AMOUNT</th>
                        <th className="p-2 text-left">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unsettledInvoices && unsettledInvoices.length > 0 ? (
                        unsettledInvoices.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{item.invoiceNumber || 'N/A'}</td>
                            <td className="p-2">{item.shipper}</td>
                            <td className="p-2">{item.consignee}</td>
                            <td className="p-2">${item.amount.toFixed(2)}</td>
                            <td className="p-2">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                item.paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}>
                                {item.paid ? "PAID" : "UNPAID"}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-gray-500">
                            NO UNSETTLED INVOICES
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ViewManifestTab;
