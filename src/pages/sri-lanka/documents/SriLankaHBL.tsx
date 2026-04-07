import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface HBLProps {
  invoiceData: any;
  onPrint: () => void;
}

const SriLankaHBL: React.FC<HBLProps> = ({ invoiceData, onPrint }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const getHBLNumber = () => {
    return `HBL-${invoiceData.invoiceNumber || 'SAMPLE'}`;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>HBL - ${getHBLNumber()}</title>
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
        <h2 className="text-xl font-bold">House Bill of Lading (HBL)</h2>
        <div className="flex gap-2">
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print HBL
          </Button>
        </div>
      </div>

      {/* HBL Content */}
      <div ref={printRef} className="p-6">
        <div className="border border-black">
          {/* Header */}
          <div className="border-b border-black p-4">
            <div className="flex justify-between items-center">
              <div>
                <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-16 w-24 object-contain" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold">HOUSE BILL OF LADING (HBL)</h1>
                <p className="text-lg font-semibold">{getHBLNumber()}</p>
              </div>
              <div className="text-right">
                <QRCodeSVG 
                  value={`HBL:${getHBLNumber()}\nVESSEL:${invoiceData.terminal || 'JCT'}\nDATE:${invoiceData.date}`} 
                  size={80} 
                />
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="border-b border-black p-3">
            <div className="text-center">
              <h2 className="font-bold text-lg">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</h2>
              <p className="text-sm">Office No. 3, 1st Floor, Zone 55, Building No.53, Street No.76</p>
              <p className="text-sm">Azizia Commercial Street, P.O.Box: 55861, Azizia - Qatar</p>
              <p className="text-sm">Tel: +974-44832508 | Email: accounts@soqotralogistics.com</p>
            </div>
          </div>

          {/* Vessel Details */}
          <div className="border-b border-black">
            <table className="w-full">
              <tr>
                <td className="border-r border-black p-2 font-bold w-1/4">VESSEL:</td>
                <td className="border-r border-black p-2 w-1/4">MV SOQOTRA EXPRESS</td>
                <td className="border-r border-black p-2 font-bold w-1/4">VOYAGE:</td>
                <td className="p-2 w-1/4">SQ001</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">PORT OF LOADING:</td>
                <td className="border-r border-black p-2">HAMAD PORT, QATAR</td>
                <td className="border-r border-black p-2 font-bold">PORT OF DISCHARGE:</td>
                <td className="p-2">COLOMBO PORT, SRI LANKA</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">TERMINAL:</td>
                <td className="border-r border-black p-2">{invoiceData.terminal || "JCT TERMINAL"}</td>
                <td className="border-r border-black p-2 font-bold">ETD:</td>
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

          {/* Notify Party */}
          <div className="border-b border-black p-3">
            <div className="font-bold text-sm mb-2">NOTIFY PARTY:</div>
            <div className="text-sm">
              {invoiceData.consignee?.name || invoiceData.consigneeName || "SAME AS CONSIGNEE"}
            </div>
          </div>

          {/* Cargo Details */}
          <div className="border-b border-black">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-black p-2">CONTAINER/PACKAGE</th>
                  <th className="border border-black p-2">DESCRIPTION</th>
                  <th className="border border-black p-2">GROSS WEIGHT</th>
                  <th className="border border-black p-2">MEASUREMENT</th>
                  <th className="border border-black p-2">CBM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 text-center">{invoiceData.packages?.length || 1} PACKAGES</td>
                  <td className="border border-black p-2">{invoiceData.description || "PERSONAL EFFECTS & HOUSEHOLD GOODS"}</td>
                  <td className="border border-black p-2 text-center">{invoiceData.weight || invoiceData.totalWeight || "25.0"} KG</td>
                  <td className="border border-black p-2 text-center">
                    {invoiceData.length && invoiceData.width && invoiceData.height 
                      ? invoiceData.serviceType === 'SEA FREIGHT' 
                        ? `${invoiceData.length}x${invoiceData.width}x${invoiceData.height}in`
                        : `${invoiceData.length}x${invoiceData.width}x${invoiceData.height}cm`
                      : invoiceData.serviceType === 'SEA FREIGHT' 
                        ? "20x16x12in"
                        : "50x40x30cm"
                    }
                  </td>
                  <td className="border border-black p-2 text-center">{invoiceData.volume || "0.0600"}</td>
                </tr>
                {/* Additional rows for formatting */}
                {Array.from({ length: 4 }).map((_, index) => (
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

          {/* Freight Details */}
          <div className="border-b border-black">
            <table className="w-full">
              <tr>
                <td className="border-r border-black p-2 font-bold w-1/3">FREIGHT & CHARGES:</td>
                <td className="border-r border-black p-2 w-1/3">QAR {invoiceData.rate || "259.00"}</td>
                <td className="p-2 w-1/3 font-bold">PREPAID</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">DOCUMENTATION FEE:</td>
                <td className="border-r border-black p-2">QAR {invoiceData.documentsFee || "50.00"}</td>
                <td className="p-2 font-bold">PREPAID</td>
              </tr>
              <tr>
                <td className="border-r border-black p-2 font-bold">TOTAL FREIGHT:</td>
                <td className="border-r border-black p-2 font-bold">QAR {invoiceData.total || "309.00"}</td>
                <td className="p-2 font-bold">PREPAID</td>
              </tr>
            </table>
          </div>

          {/* Terms & Conditions */}
          <div className="border-b border-black p-3">
            <div className="font-bold text-sm mb-2">TERMS & CONDITIONS:</div>
            <div className="text-xs space-y-1">
              <div>• This House Bill of Lading is subject to the terms and conditions on the reverse side</div>
              <div>• Cargo is delivered warehouse to warehouse</div>
              <div>• All customs duties and charges are for consignee account</div>
              <div>• Goods are released only against surrender of original bills of lading</div>
              <div>• Company liability is limited as per carriage conditions</div>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex">
            <div className="w-1/3 border-r border-black p-3">
              <div className="font-bold text-sm mb-2">PLACE & DATE OF ISSUE:</div>
              <div className="text-sm">DOHA, QATAR</div>
              <div className="text-sm">{new Date().toLocaleDateString()}</div>
              <div className="mt-8 border-t border-black pt-2 text-center text-sm">
                FREIGHT FORWARDER
              </div>
            </div>
            
            <div className="w-1/3 border-r border-black p-3">
              <div className="font-bold text-sm mb-2">NUMBER OF ORIGINAL B/L:</div>
              <div className="text-sm">THREE (3) ORIGINALS</div>
              <div className="mt-8 border-t border-black pt-2 text-center text-sm">
                CARRIER SIGNATURE
              </div>
            </div>

            <div className="w-1/3 p-3">
              <div className="font-bold text-sm mb-2">ISSUED BY:</div>
              <div className="text-sm">SOQOTRA LOGISTICS</div>
              <div className="text-sm">AS AGENT FOR CARRIER</div>
              <div className="mt-8 border-t border-black pt-2 text-center text-sm">
                AGENT SIGNATURE & STAMP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SriLankaHBL;