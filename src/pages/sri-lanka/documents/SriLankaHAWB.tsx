import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface HAWBProps {
  invoiceData: any;
  onPrint: () => void;
}

const SriLankaHAWB: React.FC<HAWBProps> = ({ invoiceData, onPrint }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const getHAWBNumber = () => {
    return `HAWB-${invoiceData.invoiceNumber || 'SAMPLE'}`;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>HAWB - ${getHAWBNumber()}</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 12px; }
              .print-container { max-width: 800px; margin: 0 auto; background: white; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              .font-bold { font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .border { border: 1px solid #000; }
              .p-2 { padding: 8px; }
              @media print {
                body { margin: 0; padding: 0; }
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

  return (
    <div className="bg-white">
      {/* Toolbar */}
      <div className="flex justify-between items-center p-4 border-b no-print">
        <h2 className="text-xl font-bold">House Air Waybill (HAWB)</h2>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print HAWB
          </Button>
        </div>
      </div>

      {/* HAWB Content */}
      <div ref={printRef} className="p-6">
        <div className="border border-black">
          {/* Header */}
          <div className="border-b border-black p-4">
            <div className="flex justify-between items-center">
              <div>
                <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Almaraam Logo" className="h-16 w-24 object-contain" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold">HOUSE AIR WAYBILL (HAWB)</h1>
                <p className="text-lg font-semibold">{getHAWBNumber()}</p>
              </div>
              <div className="text-right">
                <QRCodeSVG 
                  value={`HAWB:${getHAWBNumber()}\nFLIGHT:${invoiceData.destination || 'CMB'}\nDATE:${invoiceData.date}`} 
                  size={80} 
                />
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="border-b border-black p-3">
            <div className="text-center">
              <h2 className="font-bold text-lg">ALMARAAM LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</h2>
              <p className="text-sm">Office No. 3, 1st Floor, Zone 55, Building No.53, Street No.76</p>
              <p className="text-sm">Azizia Commercial Street, P.O.Box: 55861, Azizia - Qatar</p>
              <p className="text-sm">Tel: +974-44832508 | Email: accounts@almaraamlogistics.com</p>
            </div>
          </div>

          {/* Flight Details */}
          <div className="border-b border-black">
            <table className="w-full">
              <tr>
                <td className="border-r border-black p-2 font-bold w-1/4">FLIGHT NO:</td>
                <td className="border-r border-black p-2 w-1/4">QR XXX</td>
                <td className="border-r border-black p-2 font-bold w-1/4">DEPARTURE:</td>
                <td className="p-2 w-1/4">DOH</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">DESTINATION:</td>
                <td className="border-r border-black p-2">CMB</td>
                <td className="border-r border-black p-2 font-bold">DATE:</td>
                <td className="p-2">{invoiceData.date || new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>

          {/* Shipper/Consignee */}
          <div className="border-b border-black flex">
            <div className="w-1/2 border-r border-black p-3">
              <div className="font-bold text-sm mb-2">SHIPPER:</div>
              <div className="text-sm space-y-1">
                <div>{invoiceData.shipper?.name || invoiceData.shipperName || "SAMPLE SHIPPER"}</div>
                <div>{invoiceData.shipper?.address || invoiceData.shipperAddress || "DOHA, QATAR"}</div>
                <div>Mobile: {invoiceData.shipper?.mobile || invoiceData.shipperMobile || "+974 1234 5678"}</div>
              </div>
            </div>
            
            <div className="w-1/2 p-3">
              <div className="font-bold text-sm mb-2">CONSIGNEE:</div>
              <div className="text-sm space-y-1">
                <div>{invoiceData.consignee?.name || invoiceData.consigneeName || "SAMPLE CONSIGNEE"}</div>
                <div>{invoiceData.consignee?.address || invoiceData.consigneeAddress || "COLOMBO, SRI LANKA"}</div>
                <div>District: {invoiceData.consigneeDistrict || "COLOMBO"}</div>
                <div>Province: {invoiceData.consigneeProvince || "WESTERN"}</div>
                <div>Mobile: {invoiceData.consignee?.mobile || invoiceData.consigneeMobile || "+94 77 123 4567"}</div>
                <div>ID: {invoiceData.consignee?.idNumber || invoiceData.consigneeId || "123456789V"}</div>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="border-b border-black">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2">PIECES</th>
                  <th className="border border-black p-2">DESCRIPTION</th>
                  <th className="border border-black p-2">WEIGHT (KG)</th>
                  <th className="border border-black p-2">DIMENSIONS</th>
                  <th className="border border-black p-2">VOLUME (CBM)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">{invoiceData.packages?.length || 1}</td>
                  <td className="border border-black p-2">{invoiceData.description || "PERSONAL EFFECTS"}</td>
                  <td className="border border-black p-2 text-center">{invoiceData.weight || invoiceData.totalWeight || "25.0"}</td>
                  <td className="border border-black p-2 text-center">
                    {invoiceData.length && invoiceData.width && invoiceData.height 
                      ? `${invoiceData.length}x${invoiceData.width}x${invoiceData.height}cm`
                      : "50x40x30cm"
                    }
                  </td>
                  <td className="border border-black p-2 text-center">{invoiceData.volume || "0.0600"}</td>
                </tr>
                {/* Additional rows for formatting */}
                {Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 h-8"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Charges */}
          <div className="border-b border-black">
            <table className="w-full">
              <tr>
                <td className="border-r border-black p-2 font-bold w-1/3">FREIGHT CHARGES:</td>
                <td className="border-r border-black p-2 w-1/3">QAR {invoiceData.rate || (parseFloat(invoiceData.weight || "25") * 10).toFixed(2)}</td>
                <td className="p-2 w-1/3 font-bold">PREPAID</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">DOCUMENTATION FEE:</td>
                <td className="border-r border-black p-2">QAR {invoiceData.documentsFee || "25.00"}</td>
                <td className="p-2 font-bold">PREPAID</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">TOTAL CHARGES:</td>
                <td className="border-r border-black p-2 font-bold">QAR {invoiceData.total || "275.00"}</td>
                <td className="p-2 font-bold">PREPAID</td>
              </tr>
            </table>
          </div>

          {/* Special Instructions */}
          <div className="border-b border-black p-3">
            <div className="font-bold text-sm mb-2">SPECIAL INSTRUCTIONS:</div>
            <div className="text-sm space-y-1">
              <div>• Handle with care - Personal effects</div>
              <div>• Destination warehouse delivery</div>
              <div>• Contact consignee upon arrival</div>
              <div>• Customs clearance required</div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex">
            <div className="w-1/2 border-r border-black p-3">
              <div className="font-bold text-sm mb-2">ISSUED BY:</div>
              <div className="text-sm">ALMARAAM LOGISTICS SERVICES</div>
              <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
              <div className="mt-8 border-t border-black pt-2 text-center text-sm">
                AUTHORIZED SIGNATURE
              </div>
            </div>
            
            <div className="w-1/2 p-3">
              <div className="font-bold text-sm mb-2">AGENT DETAILS:</div>
              <div className="text-sm">Agent: ALMARAAM LOGISTICS</div>
              <div className="text-sm">Code: AL001</div>
              <div className="text-sm">License: LL/2024/001</div>
              <div className="mt-8 border-t border-black pt-2 text-center text-sm">
                AGENT STAMP & SIGNATURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaHAWB;