import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, UnsettledInvoice, PrintOptions } from "../../../types/containerTypes";
import { ArrowLeft, Printer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import PrintContainerManifest from "../../print/container/PrintContainerManifest";
import PrintStyles from "../../print/PrintStyles";

interface ViewContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  unsettledInvoices: UnsettledInvoice[];
  onBack: () => void;
  printOptions: PrintOptions;
  onPrintOptionsChange: (options: Partial<PrintOptions>) => void;
  onPrint: () => void;
}

const ViewContainerManifest: React.FC<ViewContainerManifestProps> = ({
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
  const [isPrinting, setIsPrinting] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  
  const totalVolume = cargoItems.reduce((sum, item) => sum + Number(item.volume), 0);
  const totalWeight = cargoItems.reduce((sum, item) => sum + Number(item.weight), 0);
  const totalPackages = cargoItems.reduce((sum, item) => sum + 1, 0);
  
  useEffect(() => {
    return () => {
      document.body.classList.remove('print-only-manifest');
    };
  }, []);
  
  const handlePrintClick = () => {
    setIsPrinting(true);
    setShowPrintView(true);
    
    document.body.classList.add('print-only-manifest');
    
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      
      console.log('Preparing to print manifest for container:', container.containerNumber);
      
      setTimeout(() => {
        console.log('Triggering print dialog');
        window.print();
        
        setTimeout(() => {
          setIsPrinting(false);
        }, 1000);
      }, 300);
    }, 500);
  };

  return (
    <div className="p-6">
      {showPrintView && (
        <div className="print-only" id="view-manifest-print-container">
          <PrintContainerManifest 
            container={container}
            cargoItems={cargoItems}
            itemList={itemList}
            consigneeList={consigneeList}
            unsettledInvoices={unsettledInvoices}
            totalVolume={totalVolume}
            totalWeight={totalWeight}
            totalPackages={totalPackages}
            confirmDate={container.confirmDate || new Date().toLocaleDateString()}
            printOptions={printOptions}
          />
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onBack} className="no-print">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Container List
          </Button>
          <h2 className="text-2xl font-bold ml-4">
            Container Manifest: {container.containerNumber}
          </h2>
        </div>
        <div className="flex items-center gap-4 no-print">
          <div className="flex items-center gap-2">
            <Label htmlFor="print-section">Print Section:</Label>
            <Select 
              value={printOptions.section} 
              onValueChange={(value) => onPrintOptionsChange({ 
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
              onValueChange={(value) => onPrintOptionsChange({ 
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
          
          <Button 
            onClick={handlePrintClick} 
            className="ml-4"
            disabled={isPrinting}
          >
            <Printer className="h-4 w-4 mr-2" />
            {isPrinting ? "Preparing..." : "Print Manifest"}
          </Button>
        </div>
      </div>

      <Card className="mb-6 print-container">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg company-name">Container Details</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Container Number</p>
              <p className="font-medium">{container.containerNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Seal Number</p>
              <p className="font-medium">{container.sealNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Type</p>
              <p className="font-medium">{container.containerType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{container.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Weight</p>
              <p className="font-medium">{container.weight || 0} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="font-medium">{container.volume || 0} m³</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Packages</p>
              <p className="font-medium">{container.packages || 0}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Shipping Line</p>
              <p className="font-medium">{container.shippingLine || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="cargo-items" className="print-tabs">
        <TabsList className="no-print">
          <TabsTrigger value="cargo-items">Cargo Items</TabsTrigger>
          <TabsTrigger value="item-list">Item List</TabsTrigger>
          <TabsTrigger value="consignee-list">Consignee List</TabsTrigger>
          <TabsTrigger value="unsettled-invoices">Unsettled Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="cargo-items" className={printOptions.section === "all" || printOptions.section === "cargo" ? "block page-break-after" : "hidden"}>
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg company-name">Cargo Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-2 text-left">Invoice #</th>
                      <th className="p-2 text-left">Line #</th>
                      <th className="p-2 text-left">Barcode</th>
                      <th className="p-2 text-left">Package</th>
                      <th className="p-2 text-left">Volume (m³)</th>
                      <th className="p-2 text-left">Weight (kg)</th>
                      <th className="p-2 text-left">Shipper</th>
                      <th className="p-2 text-left">Consignee</th>
                      <th className="p-2 text-left">WH</th>
                      <th className="p-2 text-left">D2D</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cargoItems.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{item.invoiceNumber}</td>
                        <td className="p-2">{item.lineNumber}</td>
                        <td className="p-2">{item.barcode || "N/A"}</td>
                        <td className="p-2">{item.packageName}</td>
                        <td className="p-2">{item.volume}</td>
                        <td className="p-2">{item.weight}</td>
                        <td className="p-2">{item.shipper}</td>
                        <td className="p-2">{item.consignee}</td>
                        <td className="p-2">{item.wh}</td>
                        <td className="p-2">{item.d2d ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="item-list" className={printOptions.section === "all" || printOptions.section === "items" ? "block page-break-after" : "hidden"}>
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg company-name">Item List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-2 text-left">Invoice</th>
                      <th className="p-2 text-left">Shipper</th>
                      <th className="p-2 text-left">Consignee</th>
                      <th className="p-2 text-left">Packages</th>
                      <th className="p-2 text-left">Volume (m³)</th>
                      <th className="p-2 text-left">Package Type</th>
                      <th className="p-2 text-left">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemList.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{item.invoice}</td>
                        <td className="p-2">{item.shipper}</td>
                        <td className="p-2">{item.consignee}</td>
                        <td className="p-2">{item.packages}</td>
                        <td className="p-2">{item.volume}</td>
                        <td className="p-2">{item.packageName || "N/A"}</td>
                        <td className="p-2">{item.quantity || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="consignee-list" className={printOptions.section === "all" || printOptions.section === "consignees" ? "block page-break-after" : "hidden"}>
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg company-name">Consignee List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-2 text-left">Invoice</th>
                      <th className="p-2 text-left">Shipper</th>
                      <th className="p-2 text-left">Shipper Contact</th>
                      <th className="p-2 text-left">Consignee</th>
                      <th className="p-2 text-left">Consignee Contact</th>
                      <th className="p-2 text-left">Volume (m³)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {consigneeList.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{item.invoice}</td>
                        <td className="p-2">{item.shipper}</td>
                        <td className="p-2">{item.shipperContact || "N/A"}</td>
                        <td className="p-2">{item.consignee}</td>
                        <td className="p-2">{item.consigneeContact || "N/A"}</td>
                        <td className="p-2">{item.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unsettled-invoices" className={printOptions.section === "all" || printOptions.section === "invoices" ? "block" : "hidden"}>
          <Card>
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg company-name">Unsettled Invoices</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="p-2 text-left">Invoice Number</th>
                      <th className="p-2 text-left">Shipper</th>
                      <th className="p-2 text-left">Consignee</th>
                      <th className="p-2 text-left">GY</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Net</th>
                      <th className="p-2 text-left">Due</th>
                      <th className="p-2 text-left">Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unsettledInvoices.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-gray-50">
                        <td className="p-2">{item.invoiceNumber || "N/A"}</td>
                        <td className="p-2">{item.shipper}</td>
                        <td className="p-2">{item.consignee}</td>
                        <td className="p-2">{item.gy || "N/A"}</td>
                        <td className="p-2">${item.amount.toFixed(2)}</td>
                        <td className="p-2">${item.net?.toFixed(2) || "N/A"}</td>
                        <td className="p-2">${item.due?.toFixed(2) || "N/A"}</td>
                        <td className="p-2">{item.paid ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PrintStyles orientation={printOptions.orientation} />
    </div>
  );
};

export default ViewContainerManifest;
