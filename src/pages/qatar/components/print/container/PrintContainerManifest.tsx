
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
}

const PrintContainerManifest: React.FC<PrintContainerManifestProps> = ({ 
  container,
  cargoItems,
  itemList,
  consigneeList,
  totalVolume,
  totalWeight,
  totalPackages,
  confirmDate
}) => {
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);

  return (
    <div className="min-h-screen bg-white print-container">
      <PrintStyles />
      
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
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
        
        {/* Manifest Title */}
        <div className="bg-blue-600 text-white p-3 text-center mb-6">
          <h2 className="text-xl font-bold">CONTAINER MANIFEST</h2>
        </div>
        
        {/* Container Details */}
        <div className="mb-6 border rounded-md overflow-hidden">
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
        <div className="mb-6">
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
        
        {/* Consignee List */}
        <div className="mb-6">
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
        
        {/* Signature Section */}
        <div className="mt-16 grid grid-cols-3 gap-8">
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
