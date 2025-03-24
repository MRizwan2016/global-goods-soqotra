
import React from "react";
import { QatarVessel } from "../../vessel-management/mockVesselData";
import PrintStyles from "../PrintStyles";

interface PrintVesselManifestProps {
  vessel: QatarVessel;
  containerData: any[];
}

const PrintVesselManifest: React.FC<PrintVesselManifestProps> = ({ vessel, containerData }) => {
  // Calculate summary data
  const totalPackages = containerData.reduce((sum, container) => sum + (container.packages || 0), 0);
  const totalVolume = containerData.reduce((sum, container) => sum + (container.volume || 0), 0);
  const totalWeight = containerData.reduce((sum, container) => sum + (container.weight || 0), 0);

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
          <h2 className="text-xl font-bold">MANIFEST SEA CARGO</h2>
        </div>
        
        {/* Vessel Details */}
        <div className="mb-6 border rounded-md overflow-hidden">
          <div className="bg-blue-600 text-white p-2 text-center">
            <h3 className="font-bold">VESSEL DETAILS</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">SECTOR:</div>
              <div className="p-2">{vessel.sector || "COLOMBO"}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">P.O.L:</div>
              <div className="p-2">{vessel.portOfLoading || "HAMAD SEA PORT"}</div>
            </div>
            
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">RUNNING NUMBER:</div>
              <div className="p-2">{vessel.runningNumber}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">P.O.D:</div>
              <div className="p-2">{vessel.portOfDischarge || "COLOMBO"}</div>
            </div>
            
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">VESSEL NAME:</div>
              <div className="p-2">{vessel.vesselName || ""}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">DIRECT/ MIX:</div>
              <div className="p-2">{vessel.direction === "MIX" ? "Mix Vessel" : "Direct"}</div>
            </div>
            
            <div className="grid grid-cols-2 border-b border-r">
              <div className="p-2 font-bold bg-gray-100">VOYAGE:</div>
              <div className="p-2">{vessel.voyage || ""}</div>
            </div>
            <div className="grid grid-cols-2 border-b">
              <div className="p-2 font-bold bg-gray-100">E.T.D:</div>
              <div className="p-2">{vessel.etd || ""}</div>
            </div>
            
            <div className="grid grid-cols-2 border-r">
              <div className="p-2 font-bold bg-gray-100">DATE CONFIRM:</div>
              <div className="p-2">{new Date().toLocaleDateString()}</div>
            </div>
            <div className="grid grid-cols-2">
              <div className="p-2 font-bold bg-gray-100">E.T.A:</div>
              <div className="p-2">{vessel.eta || ""}</div>
            </div>
          </div>
        </div>
        
        {/* Container Details */}
        {containerData.map((container, index) => (
          <div key={container.id} className="mb-6 border rounded-md overflow-hidden">
            <div className="bg-blue-600 text-white p-2 text-center">
              <h3 className="font-bold">{index + 1} CONTAINER DETAILS: {container.containerNumber}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="grid grid-cols-2 border-b border-r">
                <div className="p-2 font-bold bg-gray-100">RUNNING NUMBER:</div>
                <div className="p-2">{container.runningNumber}</div>
              </div>
              <div className="grid grid-cols-2 border-b">
                <div className="p-2 font-bold bg-gray-100">SEAL NUMBER:</div>
                <div className="p-2">{container.sealNumber || ""}</div>
              </div>
              
              <div className="grid grid-cols-2 border-b border-r">
                <div className="p-2 font-bold bg-gray-100">PACKAGES:</div>
                <div className="p-2">{container.packages || "0"}</div>
              </div>
              <div className="grid grid-cols-2 border-b">
                <div className="p-2 font-bold bg-gray-100">CONTAINER TYPE:</div>
                <div className="p-2">{container.containerType || ""}</div>
              </div>
              
              <div className="grid grid-cols-2 border-r">
                <div className="p-2 font-bold bg-gray-100">VOLUME:</div>
                <div className="p-2">{container.volume ? container.volume.toFixed(3) : "0.000"}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="p-2 font-bold bg-gray-100">CONTAINER WEIGHT:</div>
                <div className="p-2">{container.weight || "0"}</div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Summary Table */}
        <div className="mb-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-center p-2 bg-blue-600 text-white" colSpan={8}>TOTAL SUMMARY</th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="p-2 border text-center">Total Containers</th>
                  <th className="p-2 border text-center">Total Packages</th>
                  <th className="p-2 border text-center">Total Volume (m³)</th>
                  <th className="p-2 border text-center">Total Weight (kg)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border text-center">{containerData.length}</td>
                  <td className="p-2 border text-center">{totalPackages}</td>
                  <td className="p-2 border text-center">{totalVolume.toFixed(3)}</td>
                  <td className="p-2 border text-center">{totalWeight}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
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

export default PrintVesselManifest;
