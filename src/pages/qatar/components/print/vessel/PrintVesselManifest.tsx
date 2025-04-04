
import React from "react";
import { QatarContainer } from "../../../types/containerTypes";
import { QatarVessel } from "../../../components/vessel-management/types/vesselTypes";
import PrintStyles from "../PrintStyles";

interface PrintVesselManifestProps {
  vessel: QatarVessel;
  containerData: QatarContainer[];
  printSection?: "all" | "cargo" | "summary";
  orientation?: "portrait" | "landscape";
  totalWeight?: number;
  totalVolume?: number;
  totalPackages?: number;
}

const PrintVesselManifest: React.FC<PrintVesselManifestProps> = ({ 
  vessel, 
  containerData,
  printSection = "all",
  orientation = "portrait",
  totalWeight,
  totalVolume,
  totalPackages
}) => {
  return (
    <div className="print-container">
      <PrintStyles orientation={orientation} />
      
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <img src="/lovable-uploads/a673e02e-b1ad-4d72-96c4-9d7fead8a9a4.png" alt="Logo" className="h-16 w-auto mr-4" />
        </div>
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">VESSEL MANIFEST</h1>
          <p className="text-gray-600">Print Date: {new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Vessel Information */}
        {(printSection === "all" || printSection === "summary") && (
          <div className="mb-6">
            <div className="bg-blue-600 text-white p-2 text-center mb-2">
              <h3 className="font-semibold">VESSEL INFORMATION</h3>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border p-2 bg-gray-100 font-semibold w-1/4">Vessel Name:</td>
                    <td className="border p-2">{vessel.vesselName || vessel.runningNumber}</td>
                    <td className="border p-2 bg-gray-100 font-semibold w-1/4">Running Number:</td>
                    <td className="border p-2">{vessel.runningNumber}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-100 font-semibold">Voyage:</td>
                    <td className="border p-2">{vessel.voyage || "N/A"}</td>
                    <td className="border p-2 bg-gray-100 font-semibold">Direction:</td>
                    <td className="border p-2">{vessel.direction}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-100 font-semibold">Port of Loading:</td>
                    <td className="border p-2">{vessel.portOfLoading || "N/A"}</td>
                    <td className="border p-2 bg-gray-100 font-semibold">Port of Discharge:</td>
                    <td className="border p-2">{vessel.portOfDischarge || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-100 font-semibold">ETD:</td>
                    <td className="border p-2">{vessel.etd || "N/A"}</td>
                    <td className="border p-2 bg-gray-100 font-semibold">ETA:</td>
                    <td className="border p-2">{vessel.eta || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="border p-2 bg-gray-100 font-semibold">Shipping Line:</td>
                    <td className="border p-2">{vessel.shippingLine || "N/A"}</td>
                    <td className="border p-2 bg-gray-100 font-semibold">Master B/L:</td>
                    <td className="border p-2">{vessel.masterBL || "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Container List - Always show */}
        <div className={printSection === "all" ? "mb-6" : "mb-6 page-break-before"}>
          <div className="bg-blue-600 text-white p-2 text-center mb-2">
            <h3 className="font-semibold">CARGO MANIFEST</h3>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-2 text-left">No.</th>
                  <th className="border p-2 text-left">Container No.</th>
                  <th className="border p-2 text-left">Seal No.</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Weight (kg)</th>
                  <th className="border p-2 text-left">Packages</th>
                  <th className="border p-2 text-left">Volume (m³)</th>
                </tr>
              </thead>
              <tbody>
                {containerData.length > 0 ? (
                  containerData.map((container, index) => (
                    <tr key={container.id}>
                      <td className="border p-2">{index + 1}</td>
                      <td className="border p-2">{container.containerNumber}</td>
                      <td className="border p-2">{container.sealNumber || "N/A"}</td>
                      <td className="border p-2">{container.containerType}</td>
                      <td className="border p-2">{container.weight || 0}</td>
                      <td className="border p-2">{container.packages || 0}</td>
                      <td className="border p-2">{container.volume || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="border p-4 text-center text-gray-500">
                      No containers assigned to this vessel
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100">
                  <td colSpan={4} className="border p-2 text-right font-semibold">Total:</td>
                  <td className="border p-2">
                    {totalWeight !== undefined ? totalWeight.toFixed(2) : 
                     containerData.reduce((sum, c) => sum + (c.weight || 0), 0).toFixed(2)}
                  </td>
                  <td className="border p-2">
                    {totalPackages !== undefined ? totalPackages : 
                     containerData.reduce((sum, c) => sum + (c.packages || 0), 0)}
                  </td>
                  <td className="border p-2">
                    {totalVolume !== undefined ? totalVolume.toFixed(3) : 
                     containerData.reduce((sum, c) => sum + (c.volume || 0), 0).toFixed(3)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        
        {/* Signature Section */}
        <div className="mt-16 grid grid-cols-3 gap-8 page-break-inside-avoid">
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

export default PrintVesselManifest;
