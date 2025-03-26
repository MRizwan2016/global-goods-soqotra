
import React from "react";
import { QatarContainer, ContainerCargo, ItemListEntry, ConsigneeListItem, PrintOptions, UnsettledInvoice } from "../../../types/containerTypes";
import { FileCheck, Package, Users, CreditCard } from "lucide-react";

interface PrintContainerManifestProps {
  container: QatarContainer;
  cargoItems: ContainerCargo[];
  itemList: ItemListEntry[];
  consigneeList: ConsigneeListItem[];
  totalVolume: number;
  totalWeight: number;
  totalPackages: number;
  confirmDate: string;
  printOptions: PrintOptions;
  unsettledInvoices?: UnsettledInvoice[];
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
  printOptions,
  unsettledInvoices = []
}) => {
  const formatVolume = (volume: number) => volume.toFixed(3);
  const formatWeight = (weight: number) => weight.toFixed(2);
  const formatCurrency = (amount: number) => `QAR ${amount.toFixed(2)}`;
  
  // Function to determine if a section should be shown
  const shouldShowSection = (section: "cargo" | "items" | "consignees" | "invoices") => {
    return printOptions.section === "all" || printOptions.section === section;
  };
  
  return (
    <div className={`print-container ${printOptions.orientation === "landscape" ? "landscape" : "portrait"}`}>
      <div className="print-manifest">
        <div className="print-header">
          <div className="logo-container">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-16" />
          </div>
          <h1 className="text-xl font-bold text-center my-4">CONTAINER MANIFEST</h1>
        </div>
        
        <div className="container-details p-4 border rounded-md mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Container Number:</strong> {container.containerNumber}</p>
              <p><strong>Container Type:</strong> {container.containerType}</p>
              <p><strong>Seal Number:</strong> {container.sealNumber || "N/A"}</p>
            </div>
            <div>
              <p><strong>Confirmation Date:</strong> {confirmDate}</p>
              <p><strong>Total Packages:</strong> {totalPackages}</p>
              <p><strong>Total Volume:</strong> {formatVolume(totalVolume)} m³</p>
              <p><strong>Total Weight:</strong> {formatWeight(totalWeight)} kg</p>
            </div>
          </div>
        </div>
        
        {shouldShowSection("cargo") && (
          <div className="cargo-items mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <Package className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Cargo Items</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Invoice</th>
                  <th className="border p-2 text-left">Line #</th>
                  <th className="border p-2 text-left">Package</th>
                  <th className="border p-2 text-left">Volume (m³)</th>
                  <th className="border p-2 text-left">Weight (kg)</th>
                  <th className="border p-2 text-left">Shipper</th>
                  <th className="border p-2 text-left">Consignee</th>
                </tr>
              </thead>
              <tbody>
                {cargoItems.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="border p-2">{item.invoiceNumber}</td>
                    <td className="border p-2">{item.lineNumber}</td>
                    <td className="border p-2">{item.packageName}</td>
                    <td className="border p-2">{formatVolume(item.volume)}</td>
                    <td className="border p-2">{formatWeight(item.weight)}</td>
                    <td className="border p-2">{item.shipper}</td>
                    <td className="border p-2">{item.consignee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("items") && (
          <div className="item-list mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <FileCheck className="mr-2 h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold">Item List by Invoice</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Invoice</th>
                  <th className="border p-2 text-left">Shipper</th>
                  <th className="border p-2 text-left">Consignee</th>
                  <th className="border p-2 text-left">Packages</th>
                  <th className="border p-2 text-left">Package Type</th>
                  <th className="border p-2 text-left">Volume (m³)</th>
                </tr>
              </thead>
              <tbody>
                {itemList.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="border p-2">{item.invoice}</td>
                    <td className="border p-2">{item.shipper}</td>
                    <td className="border p-2">{item.consignee}</td>
                    <td className="border p-2">{item.packages}</td>
                    <td className="border p-2">{item.packageName}</td>
                    <td className="border p-2">{formatVolume(item.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("consignees") && (
          <div className="consignee-list mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Consignee Contact List</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Invoice</th>
                  <th className="border p-2 text-left">Shipper</th>
                  <th className="border p-2 text-left">Shipper Contact</th>
                  <th className="border p-2 text-left">Consignee</th>
                  <th className="border p-2 text-left">Consignee Contact</th>
                  <th className="border p-2 text-left">Volume (m³)</th>
                </tr>
              </thead>
              <tbody>
                {consigneeList.map(consignee => (
                  <tr key={consignee.id} className="border-b">
                    <td className="border p-2">{consignee.invoice}</td>
                    <td className="border p-2">{consignee.shipper}</td>
                    <td className="border p-2">{consignee.shipperContact}</td>
                    <td className="border p-2">{consignee.consignee}</td>
                    <td className="border p-2">{consignee.consigneeContact}</td>
                    <td className="border p-2">{formatVolume(consignee.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("invoices") && unsettledInvoices && unsettledInvoices.length > 0 && (
          <div className="unsettled-invoices page-break-before">
            <div className="flex items-center mb-2">
              <CreditCard className="mr-2 h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold">Unsettled Invoices</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Invoice Number</th>
                  <th className="border p-2 text-left">Shipper</th>
                  <th className="border p-2 text-left">Consignee</th>
                  <th className="border p-2 text-left">Amount</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {unsettledInvoices.filter(invoice => !invoice.paid).map(invoice => (
                  <tr key={invoice.id} className="border-b">
                    <td className="border p-2">{invoice.invoiceNumber}</td>
                    <td className="border p-2">{invoice.shipper}</td>
                    <td className="border p-2">{invoice.consignee}</td>
                    <td className="border p-2">{formatCurrency(invoice.amount)}</td>
                    <td className="border p-2 text-red-600 font-semibold">Outstanding</td>
                  </tr>
                ))}
                {unsettledInvoices.filter(invoice => !invoice.paid).length === 0 && (
                  <tr>
                    <td colSpan={5} className="border p-4 text-center">No unsettled invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintContainerManifest;
