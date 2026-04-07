import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface SAHBLDocumentProps {
  invoiceData: any;
}

const SAHBLDocument: React.FC<SAHBLDocumentProps> = ({ invoiceData }) => {
  const packages = invoiceData.packages || invoiceData.packageItems || [];
  const totalWeight = packages.reduce((s: number, p: any) => s + (parseFloat(p.weight) || 0), 0);
  const totalVolume = packages.reduce((s: number, p: any) => s + (parseFloat(p.cubicMetre || p.volume) || 0), 0);
  const blNumber = `${invoiceData.invoiceNumber}-HBL`;

  return (
    <div style={{ border: "3px solid #000", fontFamily: "Arial, sans-serif", fontSize: "11pt" }}>
      {/* Header */}
      <div className="p-4 border-b-2 border-black text-center">
        <div className="flex items-center justify-between">
          <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Logo" className="w-28 h-auto" />
          <div className="flex-1">
            <h1 className="text-xl font-bold">HOUSE BILL OF LADING</h1>
            <p className="text-sm font-bold mt-1">SOQOTRA SOLUTIONS WLL - KSA</p>
            <p className="text-xs">Eastern Province, Saudi Arabia | accounts-ksa@soqotralogistics.com</p>
          </div>
          <QRCodeSVG value={`HBL:${blNumber}|DATE:${invoiceData.invoiceDate || invoiceData.date}`} size={80} level="M" />
        </div>
      </div>

      {/* BL Details */}
      <div className="flex border-b-2 border-black">
        <div className="flex-1 border-r border-black p-2">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td className="font-bold px-1 py-0.5">B/L NUMBER:</td><td className="px-1 py-0.5">{blNumber}</td></tr>
              <tr><td className="font-bold px-1 py-0.5">DATE:</td><td className="px-1 py-0.5">{invoiceData.invoiceDate || invoiceData.date}</td></tr>
              <tr><td className="font-bold px-1 py-0.5">REFERENCE:</td><td className="px-1 py-0.5">{invoiceData.invoiceNumber}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 p-2">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td className="font-bold px-1 py-0.5">MODE:</td><td className="px-1 py-0.5">LAND CARGO</td></tr>
              <tr><td className="font-bold px-1 py-0.5">TERMS:</td><td className="px-1 py-0.5">FREIGHT {invoiceData.paymentStatus === "PAID" ? "PREPAID" : "COLLECT"}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipper */}
      <div className="border-b border-black p-2">
        <div className="font-bold text-sm bg-gray-100 px-2 py-1 mb-1">SHIPPER / EXPORTER</div>
        <p className="text-sm px-2">{invoiceData.shipperName || invoiceData.shipper?.name || "N/A"}</p>
        <p className="text-sm px-2">{invoiceData.shipperAddress || invoiceData.shipper?.address || "N/A"}</p>
        <p className="text-sm px-2">Tel: {invoiceData.shipperMobile || invoiceData.shipper?.mobile || "N/A"}</p>
      </div>

      {/* Consignee */}
      <div className="border-b border-black p-2">
        <div className="font-bold text-sm bg-gray-100 px-2 py-1 mb-1">CONSIGNEE</div>
        <p className="text-sm px-2">{invoiceData.consigneeName || invoiceData.consignee?.name || "N/A"}</p>
        <p className="text-sm px-2">{invoiceData.consigneeAddress || invoiceData.consignee?.address || "N/A"}</p>
        <p className="text-sm px-2">Tel: {invoiceData.consigneeMobile || invoiceData.consignee?.mobile || "N/A"}</p>
        <p className="text-sm px-2">ID/PP: {invoiceData.consigneeIdNumber || invoiceData.consignee?.idNumber || "N/A"}</p>
      </div>

      {/* Notify Party */}
      <div className="border-b-2 border-black p-2">
        <div className="font-bold text-sm bg-gray-100 px-2 py-1 mb-1">NOTIFY PARTY</div>
        <p className="text-sm px-2">Same as Consignee</p>
      </div>

      {/* Ports */}
      <div className="flex border-b-2 border-black">
        <div className="flex-1 border-r border-black p-2">
          <div className="font-bold text-sm">PLACE OF RECEIPT</div>
          <p className="text-sm">DOHA, QATAR</p>
        </div>
        <div className="flex-1 border-r border-black p-2">
          <div className="font-bold text-sm">PORT OF LOADING</div>
          <p className="text-sm">DOHA, QATAR</p>
        </div>
        <div className="flex-1 border-r border-black p-2">
          <div className="font-bold text-sm">PORT OF DISCHARGE</div>
          <p className="text-sm">{invoiceData.port || "DAMMAM"}, SAUDI ARABIA</p>
        </div>
        <div className="flex-1 p-2">
          <div className="font-bold text-sm">FINAL DESTINATION</div>
          <p className="text-sm">{invoiceData.sector || invoiceData.district || "RIYADH"}, KSA</p>
        </div>
      </div>

      {/* Goods Table */}
      <div className="border-b-2 border-black">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-gray-100">MARKS & NUMBERS</th>
              <th className="border border-black px-2 py-1 bg-gray-100">NO. OF PKGS</th>
              <th className="border border-black px-2 py-1 bg-gray-100">DESCRIPTION OF GOODS</th>
              <th className="border border-black px-2 py-1 bg-gray-100">GROSS WEIGHT (KG)</th>
              <th className="border border-black px-2 py-1 bg-gray-100">VOLUME (CBM)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 align-top">AS ADDRESSED</td>
              <td className="border border-black px-2 py-1 text-center align-top">
                {packages.reduce((s: number, p: any) => s + (parseInt(p.quantity) || 1), 0) || 1}
              </td>
              <td className="border border-black px-2 py-1">
                {packages.map((p: any, i: number) => (
                  <div key={i}>{p.name || "PACKAGE"} - {p.quantity || 1} PCS</div>
                ))}
                <div className="mt-2 font-bold">SAID TO CONTAIN USED PERSONAL EFFECTS AND HOUSEHOLD GOODS</div>
              </td>
              <td className="border border-black px-2 py-1 text-center align-top">{totalWeight.toFixed(1)}</td>
              <td className="border border-black px-2 py-1 text-center align-top">{totalVolume.toFixed(3)}</td>
            </tr>
            {/* Empty rows for layout */}
            {Array.from({ length: 3 }).map((_, i) => (
              <tr key={i}><td className="border border-black px-2 py-3"></td><td className="border border-black px-2 py-3"></td><td className="border border-black px-2 py-3"></td><td className="border border-black px-2 py-3"></td><td className="border border-black px-2 py-3"></td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Declaration */}
      <div className="p-3 border-b border-black text-xs">
        <p className="font-bold mb-1">DECLARATION:</p>
        <p>Shipped in apparent good order and condition. The goods described above are received by the carrier for transport from the place of receipt to the port of discharge. The carrier shall be entitled to sub-contract on any terms the whole or any part of the transport.</p>
      </div>

      {/* Signatures */}
      <div className="flex">
        <div className="flex-1 border-r border-black p-4 text-center">
          <p className="font-bold text-sm mb-16">FOR THE CARRIER</p>
          <div className="border-t border-black pt-1 text-sm">AUTHORIZED SIGNATURE</div>
        </div>
        <div className="flex-1 border-r border-black p-4 text-center">
          <p className="font-bold text-sm mb-2">DATE OF ISSUE</p>
          <p className="text-sm">{invoiceData.invoiceDate || invoiceData.date}</p>
          <p className="text-sm mt-2">PLACE: DOHA, QATAR</p>
        </div>
        <div className="flex-1 p-4 text-center">
          <p className="font-bold text-sm mb-16">SHIPPER SIGNATURE</p>
          <div className="border-t border-black pt-1 text-sm">DATE & STAMP</div>
        </div>
      </div>
    </div>
  );
};

export default SAHBLDocument;
