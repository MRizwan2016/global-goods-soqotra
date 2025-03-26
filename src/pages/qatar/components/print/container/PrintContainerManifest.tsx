
import React from "react";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem } from "../../../types/containerTypes";
import PrintStyles from "../PrintStyles";

interface PrintContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  totalVolume: number;
  totalWeight: number;
  totalPackages: number;
  confirmDate: string;
  printOptions?: {
    section: string;
    orientation: string;
  };
}

const PrintContainerManifest: React.FC<PrintContainerManifestProps> = ({ 
  container,
  cargoItems,
  itemList,
  consigneeList,
  totalVolume,
  totalWeight,
  totalPackages,
  confirmDate,
  printOptions = { section: "all", orientation: "portrait" }
}) => {
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);

  return (
    <div className="min-h-screen bg-white print-container">
      <PrintStyles orientation={printOptions.orientation} />
      
      <div className="p-8">
        {/* Header - Always show */}
        <div className="flex justify-between items-center mb-6 page-break-after-avoid">
          <div className="flex items-center">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-16 w-16 mr-4" />
            <div>
              <h1 className="text-2xl font-bold company-name">ALMARAAM LOGISTICS SERVICES & TRADING W.L.L</h1>
              <p className="text-sm">P.O.Box: 55861, Manthithu, Doha, Qatar</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm">Print Date: {new Date().toLocaleDateString()}</p>
            <p className="text-sm">Print Time: {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        
        {/* Manifest Title - Always show */}
        <div className="bg-blue-600 text-white p-3 text-center mb-6 page-break-after-avoid">
          <h2 className="text-xl font-bold">CONTAINER MANIFEST</h2>
        </div>
        
        {/* Container Details - Always show */}
        <div className="mb-6 border rounded-md overflow-hidden page-break-after-avoid">
          <div className="bg-blue-600 text-white p-2 text-center">
            <h3 className="font-bold">CONTAINER DETAILS</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-0">
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">CONTAINER NUMBER:</div>
              <div className="p-2">{container.containerNumber}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">SEAL NUMBER:</div>
              <div className="p-2">{container.sealNumber || "-"}</div>
            </div>
            
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">RUNNING NUMBER:</div>
              <div className="p-2">{container.runningNumber}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">CONTAINER TYPE:</div>
              <div className="p-2">{container.containerType}</div>
            </div>
            
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">PACKAGES:</div>
              <div className="p-2">{totalPackages}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">CONTAINER WEIGHT:</div>
              <div className="p-2">{formatWeight(totalWeight)} kg</div>
            </div>
            
            <div className="grid grid-cols-2 border-r">
              <div className="p-2 font-bold bg-gray-100">VOLUME:</div>
              <div className="p-2">{formatVolume(totalVolume)} m³</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-2 font-bold bg-gray-100">DATE CONFIRMED:</div>
              <div className="p-2">{confirmDate}</div>
            </div>
          </div>
        </div>
        
        {/* Cargo Items */}
        {(printOptions.section === "all" || printOptions.section === "cargo") && (
          <div className="mb-6 page-break-before">
            <div className="bg-blue-600 text-white p-2 text-center">
              <h3 className="font-bold">CARGO ITEMS</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 border text-center">No</th>
                    <th className="p-2 border">Invoice</th>
                    <th className="p-2 border">Line No</th>
                    <th className="p-2 border">Package</th>
                    <th className="p-2 border">Volume</th>
                    <th className="p-2 border">Weight</th>
                    <th className="p-2 border">Shipper</th>
                    <th className="p-2 border">Consignee</th>
                  </tr>
                </thead>
                <tbody>
                  {cargoItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{item.invoiceNumber}</td>
                      <td className="p-2 border">{item.lineNumber}</td>
                      <td className="p-2 border">{item.packageName}</td>
                      <td className="p-2 border">{formatVolume(item.volume)}</td>
                      <td className="p-2 border">{formatWeight(item.weight)}</td>
                      <td className="p-2 border">{item.shipper}</td>
                      <td className="p-2 border">{item.consignee}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td className="p-2 border text-right font-bold" colSpan={4}>Total:</td>
                    <td className="p-2 border font-bold">{formatVolume(totalVolume)}</td>
                    <td className="p-2 border font-bold">{formatWeight(totalWeight)}</td>
                    <td className="p-2 border" colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        
        {/* Item List */}
        {(printOptions.section === "all" || printOptions.section === "items") && (
          <div className="mb-6 page-break-before">
            <div className="bg-blue-600 text-white p-2 text-center">
              <h3 className="font-bold">ITEM LIST</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 border text-center">No</th>
                    <th className="p-2 border">Invoice</th>
                    <th className="p-2 border">Package Name</th>
                    <th className="p-2 border">Quantity</th>
                    <th className="p-2 border">Packages</th>
                    <th className="p-2 border">Volume</th>
                    <th className="p-2 border">Shipper</th>
                    <th className="p-2 border">Consignee</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{item.invoice}</td>
                      <td className="p-2 border">{item.packageName || "N/A"}</td>
                      <td className="p-2 border text-center">{item.quantity || "-"}</td>
                      <td className="p-2 border text-center">{item.packages}</td>
                      <td className="p-2 border">{formatVolume(item.volume)}</td>
                      <td className="p-2 border">{item.shipper}</td>
                      <td className="p-2 border">{item.consignee}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td className="p-2 border text-right font-bold" colSpan={5}>Total:</td>
                    <td className="p-2 border font-bold">{formatVolume(itemList.reduce((sum, item) => sum + item.volume, 0))}</td>
                    <td className="p-2 border" colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        
        {/* Consignee List */}
        {(printOptions.section === "all" || printOptions.section === "consignees") && (
          <div className="mb-6 page-break-before">
            <div className="bg-blue-600 text-white p-2 text-center">
              <h3 className="font-bold">CONSIGNEE LIST</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 border text-center">No</th>
                    <th className="p-2 border">Invoice</th>
                    <th className="p-2 border">Shipper</th>
                    <th className="p-2 border">Contact</th>
                    <th className="p-2 border">Consignee</th>
                    <th className="p-2 border">Contact</th>
                    <th className="p-2 border">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {consigneeList.map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{item.invoice}</td>
                      <td className="p-2 border">{item.shipper}</td>
                      <td className="p-2 border">{item.shipperContact || "-"}</td>
                      <td className="p-2 border">{item.consignee}</td>
                      <td className="p-2 border">{item.consigneeContact || "-"}</td>
                      <td className="p-2 border">{formatVolume(item.volume)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100">
                    <td className="p-2 border text-right font-bold" colSpan={6}>Total:</td>
                    <td className="p-2 border font-bold">{formatVolume(consigneeList.reduce((sum, item) => sum + item.volume, 0))}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        
        {/* Unsettled Invoices */}
        {(printOptions.section === "all" || printOptions.section === "invoices") && (
          <div className="mb-6 page-break-before">
            <div className="bg-blue-600 text-white p-2 text-center">
              <h3 className="font-bold">UNSETTLED INVOICES</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-2 border text-center">No</th>
                    <th className="p-2 border">Invoice</th>
                    <th className="p-2 border">GY</th>
                    <th className="p-2 border">Shipper</th>
                    <th className="p-2 border">Consignee</th>
                    <th className="p-2 border">Amount</th>
                    <th className="p-2 border">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.reduce((unsettledList, item) => {
                    const invoice = {
                      id: item.id,
                      invoiceNumber: item.invoice,
                      shipper: item.shipper,
                      consignee: item.consignee,
                      amount: parseFloat((item.volume * 100).toFixed(2)),
                      paid: false
                    };
                    
                    if (!unsettledList.some(i => i.invoiceNumber === invoice.invoiceNumber)) {
                      unsettledList.push(invoice);
                    }
                    
                    return unsettledList;
                  }, [] as any[]).map((item, index) => (
                    <tr key={item.id}>
                      <td className="p-2 border text-center">{index + 1}</td>
                      <td className="p-2 border">{item.invoiceNumber}</td>
                      <td className="p-2 border">{item.gy || "-"}</td>
                      <td className="p-2 border">{item.shipper}</td>
                      <td className="p-2 border">{item.consignee}</td>
                      <td className="p-2 border text-right">{item.amount.toFixed(2)}</td>
                      <td className="p-2 border text-center">{item.paid ? "PAID" : "UNPAID"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Signature Section - Always show at the end */}
        <div className="mt-16 grid grid-cols-3 gap-8 page-break-before">
          <div className="text-center">
            <p className="font-bold">PREPARED BY</p>
            <div className="border-t mt-12 pt-2">Name & Signature</div>
          </div>
          
          <div className="text-center">
            <p className="font-bold">CHECKED BY</p>
            <div className="border-t mt-12 pt-2">Name & Signature</div>
          </div>
          
          <div className="text-center">
            <p className="font-bold">AUTHORIZED BY</p>
            <div className="border-t mt-12 pt-2">Name & Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintContainerManifest;
