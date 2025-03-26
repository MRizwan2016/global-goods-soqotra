
import React, { useEffect } from "react";
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
  
  // When the component mounts, add a class to the body for printing purposes
  useEffect(() => {
    document.body.classList.add('print-only-manifest');
    
    return () => {
      document.body.classList.remove('print-only-manifest');
    };
  }, []);
  
  // Function to determine if a section should be shown
  const shouldShowSection = (section: "cargo" | "items" | "consignees" | "invoices") => {
    return printOptions.section === "all" || printOptions.section === section;
  };
  
  return (
    <div className={`print-container ${printOptions.orientation === "landscape" ? "landscape" : "portrait"}`}>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-container, .print-container * {
            visibility: visible;
          }
          .print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: ${printOptions.orientation === "landscape" ? "landscape" : "portrait"};
            margin: 15mm;
          }
          .page-break-before {
            page-break-before: always;
          }
        }
      `}</style>
      
      <div className="print-manifest">
        <div className="print-header">
          <div className="logo-container">
            <img src="/soqotra-logo.png" alt="SOQOTRA LOGO" className="h-16" />
          </div>
          <h1 className="text-xl font-bold text-center my-4 uppercase">CONTAINER MANIFEST</h1>
        </div>
        
        <div className="container-details p-4 border rounded-md mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>CONTAINER NUMBER:</strong> {container.containerNumber}</p>
              <p><strong>CONTAINER TYPE:</strong> {container.containerType}</p>
              <p><strong>SEAL NUMBER:</strong> {container.sealNumber || "N/A"}</p>
            </div>
            <div>
              <p><strong>CONFIRMATION DATE:</strong> {confirmDate}</p>
              <p><strong>TOTAL PACKAGES:</strong> {totalPackages}</p>
              <p><strong>TOTAL VOLUME:</strong> {formatVolume(totalVolume)} m³</p>
              <p><strong>TOTAL WEIGHT:</strong> {formatWeight(totalWeight)} kg</p>
            </div>
          </div>
        </div>
        
        {shouldShowSection("cargo") && (
          <div className="cargo-items mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <Package className="mr-2 h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold uppercase">CARGO ITEMS</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left uppercase">INVOICE</th>
                  <th className="border p-2 text-left uppercase">LINE #</th>
                  <th className="border p-2 text-left uppercase">PACKAGE</th>
                  <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
                  <th className="border p-2 text-left uppercase">WEIGHT (kg)</th>
                  <th className="border p-2 text-left uppercase">SHIPPER</th>
                  <th className="border p-2 text-left uppercase">CONSIGNEE</th>
                </tr>
              </thead>
              <tbody>
                {cargoItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="border p-4 text-center uppercase">NO CARGO ITEMS FOUND</td>
                  </tr>
                ) : (
                  cargoItems.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="border p-2 uppercase">{item.invoiceNumber}</td>
                      <td className="border p-2">{item.lineNumber}</td>
                      <td className="border p-2 uppercase">{item.packageName}</td>
                      <td className="border p-2">{formatVolume(item.volume)}</td>
                      <td className="border p-2">{formatWeight(item.weight)}</td>
                      <td className="border p-2 uppercase">{item.shipper}</td>
                      <td className="border p-2 uppercase">{item.consignee}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("items") && (
          <div className="item-list mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <FileCheck className="mr-2 h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold uppercase">ITEM LIST BY INVOICE</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left uppercase">INVOICE</th>
                  <th className="border p-2 text-left uppercase">SHIPPER</th>
                  <th className="border p-2 text-left uppercase">CONSIGNEE</th>
                  <th className="border p-2 text-left uppercase">PACKAGES</th>
                  <th className="border p-2 text-left uppercase">PACKAGE TYPE</th>
                  <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
                </tr>
              </thead>
              <tbody>
                {itemList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border p-4 text-center uppercase">NO ITEMS FOUND</td>
                  </tr>
                ) : (
                  itemList.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="border p-2 uppercase">{item.invoice}</td>
                      <td className="border p-2 uppercase">{item.shipper}</td>
                      <td className="border p-2 uppercase">{item.consignee}</td>
                      <td className="border p-2">{item.packages}</td>
                      <td className="border p-2 uppercase">{item.packageName}</td>
                      <td className="border p-2">{formatVolume(item.volume)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("consignees") && (
          <div className="consignee-list mb-8 page-break-before">
            <div className="flex items-center mb-2">
              <Users className="mr-2 h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold uppercase">CONSIGNEE CONTACT LIST</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left uppercase">INVOICE</th>
                  <th className="border p-2 text-left uppercase">SHIPPER</th>
                  <th className="border p-2 text-left uppercase">SHIPPER CONTACT</th>
                  <th className="border p-2 text-left uppercase">CONSIGNEE</th>
                  <th className="border p-2 text-left uppercase">CONSIGNEE CONTACT</th>
                  <th className="border p-2 text-left uppercase">VOLUME (m³)</th>
                </tr>
              </thead>
              <tbody>
                {consigneeList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="border p-4 text-center uppercase">NO CONSIGNEES FOUND</td>
                  </tr>
                ) : (
                  consigneeList.map(consignee => (
                    <tr key={consignee.id} className="border-b">
                      <td className="border p-2 uppercase">{consignee.invoice}</td>
                      <td className="border p-2 uppercase">{consignee.shipper}</td>
                      <td className="border p-2 uppercase">{consignee.shipperContact}</td>
                      <td className="border p-2 uppercase">{consignee.consignee}</td>
                      <td className="border p-2 uppercase">{consignee.consigneeContact}</td>
                      <td className="border p-2">{formatVolume(consignee.volume)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {shouldShowSection("invoices") && unsettledInvoices && unsettledInvoices.length > 0 && (
          <div className="unsettled-invoices page-break-before">
            <div className="flex items-center mb-2">
              <CreditCard className="mr-2 h-5 w-5 text-red-600" />
              <h2 className="text-lg font-semibold uppercase">UNSETTLED INVOICES</h2>
            </div>
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left uppercase">INVOICE NUMBER</th>
                  <th className="border p-2 text-left uppercase">SHIPPER</th>
                  <th className="border p-2 text-left uppercase">CONSIGNEE</th>
                  <th className="border p-2 text-left uppercase">AMOUNT</th>
                  <th className="border p-2 text-left uppercase">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {unsettledInvoices.filter(invoice => !invoice.paid).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="border p-4 text-center uppercase">NO UNSETTLED INVOICES FOUND</td>
                  </tr>
                ) : (
                  unsettledInvoices.filter(invoice => !invoice.paid).map(invoice => (
                    <tr key={invoice.id} className="border-b">
                      <td className="border p-2 uppercase">{invoice.invoiceNumber}</td>
                      <td className="border p-2 uppercase">{invoice.shipper}</td>
                      <td className="border p-2 uppercase">{invoice.consignee}</td>
                      <td className="border p-2">{formatCurrency(invoice.amount)}</td>
                      <td className="border p-2 text-red-600 font-semibold uppercase">OUTSTANDING</td>
                    </tr>
                  ))
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
