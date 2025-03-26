
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
  const [isPrinting, setIsPrinting] = useState(false);

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
  
  const handlePrintClick = () => {
    setIsPrinting(true);
    
    // Add a delay to ensure content is fully rendered
    setTimeout(() => {
      onPrint();
      
      // Reset printing state after a delay
      setTimeout(() => {
        setIsPrinting(false);
      }, 1000);
    }, 500);
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="mr-4 hover:scale-105 transition-transform">
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
          
          <Button 
            onClick={handlePrintClick} 
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform"
            disabled={isPrinting}
          >
            <Printer className="h-4 w-4 mr-2" />
            PRINT MANIFEST
          </Button>
        </div>
      </div>
      
      {container && (
        <Card className="mb-6 print-container shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-lg flex items-center">
              CONTAINER #{container.containerNumber}
              {container.runningNumber && (
                <span className="ml-2 text-sm text-gray-500">
                  (Running #: {container.runningNumber})
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">CONTAINER NUMBER:</p>
                <p className="text-lg">{container.containerNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">TYPE:</p>
                <p className="text-lg">{container.containerType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">SEAL NUMBER:</p>
                <p className="text-lg">{container.sealNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">SHIPPING LINE:</p>
                <p className="text-lg">{container.shippingLine || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">SECTOR:</p>
                <p className="text-lg">{container.sector || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">STATUS:</p>
                <p className="text-lg">
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {container.status}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="print-container">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 no-print">
            <TabsTrigger value="container-details" className="transition-colors hover:bg-gray-200">CONTAINER DETAILS</TabsTrigger>
            <TabsTrigger value="cargo-items" className="transition-colors hover:bg-gray-200">CARGO ITEMS ({cargoItems?.length || 0})</TabsTrigger>
            <TabsTrigger value="item-list" className="transition-colors hover:bg-gray-200">ITEM LIST ({itemList?.length || 0})</TabsTrigger>
            <TabsTrigger value="consignee-list" className="transition-colors hover:bg-gray-200">CONSIGNEE LIST ({consigneeList?.length || 0})</TabsTrigger>
            <TabsTrigger value="unsettled-invoices" className="transition-colors hover:bg-gray-200">UNSETTLED INVOICES ({unsettledInvoices?.filter(inv => !inv.paid).length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="container-details" className="animate-fade-in">
            <ContainerList containerData={containerData} />
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CARGO SUMMARY</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">TOTAL PACKAGES:</p>
                    <p className="text-lg">{container?.packages || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">TOTAL VOLUME:</p>
                    <p className="text-lg">{container?.volume || 0} m³</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">TOTAL WEIGHT:</p>
                    <p className="text-lg">{container?.weight || 0} kg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cargo-items" className="animate-fade-in">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CARGO ITEMS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left border">INVOICE</th>
                        <th className="p-2 text-left border">BARCODE</th>
                        <th className="p-2 text-left border">PACKAGE</th>
                        <th className="p-2 text-left border">VOLUME</th>
                        <th className="p-2 text-left border">WEIGHT</th>
                        <th className="p-2 text-left border">SHIPPER</th>
                        <th className="p-2 text-left border">CONSIGNEE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cargoItems && cargoItems.length > 0 ? (
                        cargoItems.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-2 border">{item.invoiceNumber}</td>
                            <td className="p-2 border">{item.barcode || 'N/A'}</td>
                            <td className="p-2 border">{item.packageName}</td>
                            <td className="p-2 border">{item.volume} m³</td>
                            <td className="p-2 border">{item.weight} kg</td>
                            <td className="p-2 border">{item.shipper}</td>
                            <td className="p-2 border">{item.consignee}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-4 text-center text-gray-500 border">
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
          
          <TabsContent value="item-list" className="animate-fade-in">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>ITEM LIST</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left border">INVOICE</th>
                        <th className="p-2 text-left border">SHIPPER</th>
                        <th className="p-2 text-left border">CONSIGNEE</th>
                        <th className="p-2 text-left border">PACKAGES</th>
                        <th className="p-2 text-left border">PACKAGE TYPE</th>
                        <th className="p-2 text-left border">VOLUME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemList && itemList.length > 0 ? (
                        itemList.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-2 border">{item.invoice}</td>
                            <td className="p-2 border">{item.shipper}</td>
                            <td className="p-2 border">{item.consignee}</td>
                            <td className="p-2 border">{item.packages}</td>
                            <td className="p-2 border">{item.packageName || 'PACKAGE'}</td>
                            <td className="p-2 border">{item.volume.toFixed(2)} m³</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500 border">
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
          
          <TabsContent value="consignee-list" className="animate-fade-in">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>CONSIGNEE LIST</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left border">INVOICE</th>
                        <th className="p-2 text-left border">SHIPPER</th>
                        <th className="p-2 text-left border">SHIPPER CONTACT</th>
                        <th className="p-2 text-left border">CONSIGNEE</th>
                        <th className="p-2 text-left border">CONSIGNEE CONTACT</th>
                        <th className="p-2 text-left border">VOLUME</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consigneeList && consigneeList.length > 0 ? (
                        consigneeList.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-2 border">{item.invoice}</td>
                            <td className="p-2 border">{item.shipper}</td>
                            <td className="p-2 border">{item.shipperContact || 'N/A'}</td>
                            <td className="p-2 border">{item.consignee}</td>
                            <td className="p-2 border">{item.consigneeContact || 'N/A'}</td>
                            <td className="p-2 border">{item.volume.toFixed(2)} m³</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500 border">
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
          
          <TabsContent value="unsettled-invoices" className="animate-fade-in">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle>UNSETTLED INVOICES</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        <th className="p-2 text-left border">INVOICE</th>
                        <th className="p-2 text-left border">SHIPPER</th>
                        <th className="p-2 text-left border">CONSIGNEE</th>
                        <th className="p-2 text-left border">AMOUNT</th>
                        <th className="p-2 text-left border">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unsettledInvoices && unsettledInvoices.length > 0 ? (
                        unsettledInvoices.map((item) => (
                          <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                            <td className="p-2 border">{item.invoiceNumber || 'N/A'}</td>
                            <td className="p-2 border">{item.shipper}</td>
                            <td className="p-2 border">{item.consignee}</td>
                            <td className="p-2 border">${item.amount.toFixed(2)}</td>
                            <td className="p-2 border">
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
                          <td colSpan={5} className="p-4 text-center text-gray-500 border">
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
      
      {/* Print styles */}
      <style>
        {`
          @media print {
            @page {
              size: ${printOptions.orientation === "landscape" ? "landscape" : "portrait"};
              margin: 15mm;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
            }
            
            table, th, td {
              border: 1px solid #ddd !important;
            }
            
            th, td {
              padding: 8px;
              text-align: left;
            }
            
            .no-print {
              display: none !important;
            }
            
            /* Make sure all non-printing content is hidden */
            body * {
              visibility: hidden;
            }
            
            .print-container, .print-container * {
              visibility: visible !important;
            }
            
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ViewManifestTab;
