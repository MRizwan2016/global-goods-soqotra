import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';

interface SeaManifestProps {
  shipments: any[];
  vesselInfo?: any;
}

const SriLankaSeaManifest: React.FC<SeaManifestProps> = ({ shipments, vesselInfo }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const manifestNumber = `SM${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}001`;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Sea Freight Manifest - ${manifestNumber}</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 11px; }
              .print-container { max-width: 100%; margin: 0 auto; background: white; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
              th, td { border: 1px solid #000; padding: 4px; text-align: left; font-size: 10px; }
              .font-bold { font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .bg-gray { background-color: #f0f0f0; }
              @media print {
                body { margin: 0; padding: 10px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getTotalWeight = () => {
    return shipments.reduce((total, shipment) => total + (parseFloat(shipment.weight) || 0), 0).toFixed(2);
  };

  const getTotalVolume = () => {
    return shipments.reduce((total, shipment) => total + (parseFloat(shipment.volume) || 0), 0).toFixed(3);
  };

  const getTotalPieces = () => {
    return shipments.reduce((total, shipment) => total + (parseInt(shipment.pieces) || 1), 0);
  };

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 border-b no-print">
        <h2 className="text-xl font-bold">Sea Freight Manifest</h2>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print Manifest
          </Button>
        </div>
      </div>

      {/* Manifest Content */}
      <div ref={printRef} className="p-4">
        <div className="border border-black p-3">
          {/* Header */}
          <div className="text-center border-b border-black pb-3 mb-3">
            <div className="flex justify-between items-center">
              <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Logo" className="h-12 w-16 object-contain" />
              <div>
                <h1 className="text-lg font-bold">SEA FREIGHT MANIFEST</h1>
                <p className="text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</p>
              </div>
              <div className="text-right text-xs">
                <div>Manifest No: {manifestNumber}</div>
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>Time: {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* Vessel Information */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">VESSEL NAME</td>
                <td className="font-bold p-2">VOYAGE</td>
                <td className="font-bold p-2">PORT OF LOADING</td>
                <td className="font-bold p-2">PORT OF DISCHARGE</td>
              </tr>
              <tr>
                <td className="p-2">MV SOQOTRA EXPRESS</td>
                <td className="p-2">SQ001</td>
                <td className="p-2">HAMAD PORT, QATAR</td>
                <td className="p-2">COLOMBO PORT, SRI LANKA</td>
              </tr>
            </table>
          </div>

          {/* Cargo Summary */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">TOTAL PACKAGES</td>
                <td className="font-bold p-2">TOTAL WEIGHT (KG)</td>
                <td className="font-bold p-2">TOTAL VOLUME (CBM)</td>
                <td className="font-bold p-2">TOTAL HBL</td>
              </tr>
              <tr>
                <td className="p-2 text-center font-bold">{getTotalPieces()}</td>
                <td className="p-2 text-center font-bold">{getTotalWeight()}</td>
                <td className="p-2 text-center font-bold">{getTotalVolume()}</td>
                <td className="p-2 text-center font-bold">{shipments.length}</td>
              </tr>
            </table>
          </div>

          {/* Terminal Breakdown */}
          <div className="border border-black mb-3">
            <table className="w-full">
              <tr className="bg-gray-100">
                <td className="font-bold p-2">DESTINATION TERMINAL</td>
                <td className="font-bold p-2">PACKAGES</td>
                <td className="font-bold p-2">WEIGHT (KG)</td>
                <td className="font-bold p-2">VOLUME (CBM)</td>
              </tr>
              <tr>
                <td className="p-2">JCT TERMINAL</td>
                <td className="p-2 text-center">{Math.ceil(getTotalPieces() * 0.4)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalWeight()) * 0.4).toFixed(2)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalVolume()) * 0.4).toFixed(3)}</td>
              </tr>
              <tr>
                <td className="p-2">ICIC TERMINAL</td>
                <td className="p-2 text-center">{Math.ceil(getTotalPieces() * 0.3)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalWeight()) * 0.3).toFixed(2)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalVolume()) * 0.3).toFixed(3)}</td>
              </tr>
              <tr>
                <td className="p-2">OTHER TERMINALS</td>
                <td className="p-2 text-center">{Math.ceil(getTotalPieces() * 0.3)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalWeight()) * 0.3).toFixed(2)}</td>
                <td className="p-2 text-center">{(parseFloat(getTotalVolume()) * 0.3).toFixed(3)}</td>
              </tr>
            </table>
          </div>

          {/* Shipment Details */}
          <div className="border border-black">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-1 text-xs">S.No</th>
                  <th className="border border-black p-1 text-xs">HBL No</th>
                  <th className="border border-black p-1 text-xs">SHIPPER</th>
                  <th className="border border-black p-1 text-xs">CONSIGNEE</th>
                  <th className="border border-black p-1 text-xs">TERMINAL</th>
                  <th className="border border-black p-1 text-xs">PKGS</th>
                  <th className="border border-black p-1 text-xs">WEIGHT</th>
                  <th className="border border-black p-1 text-xs">CBM</th>
                  <th className="border border-black p-1 text-xs">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {shipments.length > 0 ? shipments.map((shipment, index) => (
                  <tr key={index}>
                    <td className="border border-black p-1 text-center text-xs">{index + 1}</td>
                    <td className="border border-black p-1 text-xs">HBL-{shipment.invoiceNumber || `SL${index + 1}`}</td>
                    <td className="border border-black p-1 text-xs">{shipment.shipperName || "SHIPPER NAME"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.consigneeName || "CONSIGNEE NAME"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.terminal || "JCT TERMINAL"}</td>
                    <td className="border border-black p-1 text-center text-xs">{shipment.pieces || 1}</td>
                    <td className="border border-black p-1 text-center text-xs">{shipment.weight || "25.0"}</td>
                    <td className="border border-black p-1 text-center text-xs">{shipment.volume || "0.060"}</td>
                    <td className="border border-black p-1 text-xs">{shipment.description || "HOUSEHOLD GOODS"}</td>
                  </tr>
                )) : (
                  // Sample data for demonstration
                  Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index}>
                      <td className="border border-black p-1 text-center text-xs">{index + 1}</td>
                      <td className="border border-black p-1 text-xs">HBL-SL00{index + 1}</td>
                      <td className="border border-black p-1 text-xs">SAMPLE SHIPPER {index + 1}</td>
                      <td className="border border-black p-1 text-xs">SAMPLE CONSIGNEE {index + 1}</td>
                      <td className="border border-black p-1 text-xs">{index % 2 === 0 ? 'JCT TERMINAL' : 'ICIC TERMINAL'}</td>
                      <td className="border border-black p-1 text-center text-xs">1</td>
                      <td className="border border-black p-1 text-center text-xs">25.0</td>
                      <td className="border border-black p-1 text-center text-xs">0.060</td>
                      <td className="border border-black p-1 text-xs">HOUSEHOLD GOODS</td>
                    </tr>
                  ))
                )}
                {/* Empty rows for formatting */}
                {Array.from({ length: Math.max(0, 15 - shipments.length) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="border border-black p-1 h-5"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                    <td className="border border-black p-1"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex border-t border-black mt-3 pt-3">
            <div className="w-1/3 pr-3">
              <div className="text-xs font-bold mb-1">PREPARED BY:</div>
              <div className="text-xs">Mohammed Rizwan</div>
              <div className="text-xs">Cargo Executive</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                SIGNATURE
              </div>
            </div>
            
            <div className="w-1/3 px-3 border-l border-black">
              <div className="text-xs font-bold mb-1">VESSEL AGENT:</div>
              <div className="text-xs">Port Operations</div>
              <div className="text-xs">Colombo Port</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                AGENT SIGNATURE
              </div>
            </div>

            <div className="w-1/3 pl-3 border-l border-black">
              <div className="text-xs font-bold mb-1">APPROVED BY:</div>
              <div className="text-xs">Branch Manager</div>
              <div className="text-xs">SOQOTRA LOGISTICS</div>
              <div className="text-xs">Date: {new Date().toLocaleDateString()}</div>
              <div className="border-t border-black mt-8 pt-1 text-center text-xs">
                MANAGER SIGNATURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaSeaManifest;