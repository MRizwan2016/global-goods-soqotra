import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface SAInvoiceDocumentProps {
  invoiceData: any;
}

const SAInvoiceDocument: React.FC<SAInvoiceDocumentProps> = ({ invoiceData }) => {
  const packages = invoiceData.packages || invoiceData.packageItems || [];
  const totalWeight = packages.reduce((s: number, p: any) => s + (parseFloat(p.weight) || 0), 0);
  const totalVolume = packages.reduce((s: number, p: any) => s + (parseFloat(p.cubicMetre || p.volume) || 0), 0);

  return (
    <div style={{ border: "3px solid #000", fontFamily: "Arial, sans-serif", fontSize: "11pt" }}>
      {/* Header */}
      <div className="relative p-4 border-b-2 border-black">
        <div className="absolute top-2 left-2">
          <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Logo" className="w-36 h-auto" />
        </div>
        <div className="text-center pt-6">
          <h1 className="text-lg font-bold">SOQOTRA SOLUTIONS WLL</h1>
          <p className="text-xs">Building No. 15, Region: Eastern Province, District: Al-Badiyah</p>
          <p className="text-xs">Mobile: 00966 547381189 | Email: accounts-ksa@soqotralogistics.com</p>
        </div>
      </div>

      {/* Invoice Info + QR */}
      <div className="flex border-b-2 border-black">
        <div className="flex-1 p-3 border-r border-black flex justify-center items-center">
          <QRCodeSVG
            value={`INV:${invoiceData.invoiceNumber}|DATE:${invoiceData.invoiceDate || invoiceData.date}|AMT:${invoiceData.net || invoiceData.pricing?.net || 0} SAR`}
            size={100} level="M"
          />
        </div>
        <div className="flex-1 p-3">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td className="border border-black px-2 py-1 font-bold bg-gray-100">INVOICE</td><td className="border border-black px-2 py-1">{invoiceData.invoiceNumber}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold bg-gray-100">DATE</td><td className="border border-black px-2 py-1">{invoiceData.invoiceDate || invoiceData.date}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold bg-gray-100">SALES REP</td><td className="border border-black px-2 py-1">{invoiceData.salesRep || "N/A"}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipper & Consignee */}
      <div className="flex border-b-2 border-black">
        <div className="flex-1 border-r border-black">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td colSpan={2} className="border border-black px-2 py-1 font-bold bg-gray-100">SHIPPER</td></tr>
              <tr><td colSpan={2} className="border border-black px-2 py-1">{invoiceData.shipperName || invoiceData.shipper?.name || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">ADDRESS</td><td className="border border-black px-2 py-1">{invoiceData.shipperAddress || invoiceData.shipper?.address || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">MOBILE</td><td className="border border-black px-2 py-1">{invoiceData.shipperMobile || invoiceData.shipper?.mobile || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">QID / PP NO</td><td className="border border-black px-2 py-1">{invoiceData.shipperIdNumber || "N/A"}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td colSpan={2} className="border border-black px-2 py-1 font-bold bg-gray-100">CONSIGNEE</td></tr>
              <tr><td colSpan={2} className="border border-black px-2 py-1">{invoiceData.consigneeName || invoiceData.consignee?.name || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">ADDRESS</td><td className="border border-black px-2 py-1">{invoiceData.consigneeAddress || invoiceData.consignee?.address || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">MOBILE</td><td className="border border-black px-2 py-1">{invoiceData.consigneeMobile || invoiceData.consignee?.mobile || "N/A"}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">ID / PP NO</td><td className="border border-black px-2 py-1">{invoiceData.consigneeIdNumber || invoiceData.consignee?.idNumber || "N/A"}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Details */}
      <div className="border-b-2 border-black">
        <div className="bg-gray-100 p-1 font-bold text-center text-sm border-b border-black">SHIPPING DETAILS</div>
        <table className="w-full text-sm border-collapse">
          <tbody>
            <tr>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">WAREHOUSE</td>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">SECTOR</td>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">PAYMENT STATUS</td>
              <td className="border border-black px-2 py-1 font-bold bg-gray-100">ORIGIN</td>
            </tr>
            <tr>
              <td className="border border-black px-2 py-1">{invoiceData.port || "DAMMAM"}</td>
              <td className="border border-black px-2 py-1">{invoiceData.sector || "SAUDI ARABIA"}</td>
              <td className="border border-black px-2 py-1 font-bold">{invoiceData.paymentStatus || (invoiceData.pricing?.net > 0 ? "UNPAID" : "PAID")}</td>
              <td className="border border-black px-2 py-1">QATAR</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cargo Table */}
      <div className="border-b-2 border-black">
        <div className="bg-gray-100 p-1 font-bold text-center text-sm border-b border-black">CARGO DETAILS</div>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="border border-black px-2 py-1 bg-gray-100">SL</th>
              <th className="border border-black px-2 py-1 bg-gray-100">PACKAGE TYPE</th>
              <th className="border border-black px-2 py-1 bg-gray-100">QTY</th>
              <th className="border border-black px-2 py-1 bg-gray-100">WEIGHT</th>
              <th className="border border-black px-2 py-1 bg-gray-100">DIMENSION</th>
              <th className="border border-black px-2 py-1 bg-gray-100">VOLUME</th>
              <th className="border border-black px-2 py-1 bg-gray-100">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? packages.map((pkg: any, i: number) => (
              <tr key={i}>
                <td className="border border-black px-2 py-1 text-center">{i + 1}</td>
                <td className="border border-black px-2 py-1">{pkg.name || "CARTON BOX"}</td>
                <td className="border border-black px-2 py-1 text-center">{pkg.quantity || 1}</td>
                <td className="border border-black px-2 py-1 text-center">{pkg.weight || 0}</td>
                <td className="border border-black px-2 py-1 text-center">{pkg.length || 0}x{pkg.width || 0}x{pkg.height || 0}</td>
                <td className="border border-black px-2 py-1 text-center">{(parseFloat(pkg.cubicMetre || pkg.volume) || 0).toFixed(3)}</td>
                <td className="border border-black px-2 py-1">PERSONAL EFFECTS</td>
              </tr>
            )) : (
              <tr><td colSpan={7} className="border border-black px-2 py-1 text-center text-gray-400">No packages</td></tr>
            )}
            <tr className="font-bold">
              <td colSpan={2} className="border border-black px-2 py-1 text-center">TOTAL</td>
              <td className="border border-black px-2 py-1 text-center">{packages.reduce((s: number, p: any) => s + (parseInt(p.quantity) || 1), 0)}</td>
              <td className="border border-black px-2 py-1 text-center">{totalWeight.toFixed(1)}</td>
              <td className="border border-black px-2 py-1"></td>
              <td className="border border-black px-2 py-1 text-center">{totalVolume.toFixed(3)}</td>
              <td className="border border-black px-2 py-1"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Terms & Pricing */}
      <div className="flex">
        <div className="flex-1 border-r border-black p-2">
          <div className="font-bold text-sm mb-1">TERMS & CONDITIONS:</div>
          <div className="text-[9pt] space-y-0.5">
            <p>1. Contents fully and accurately described; no illegal items.</p>
            <p>2. Perishable & breakable items shipped at shipper's own risk.</p>
            <p>3. Shipper/Consignee responsible for destination charges.</p>
            <p>4. Delivery time is indicative and may change.</p>
            <p>5. Storage charges applicable after 30 days.</p>
          </div>
          <div className="mt-6 text-center">
            <div className="border-t border-black mt-10 pt-1 font-bold text-sm">CUSTOMER SIGNATURE</div>
          </div>
        </div>
        <div className="flex-1 p-2">
          <table className="w-full text-sm border-collapse">
            <tbody>
              <tr><td className="border border-black px-2 py-1 font-bold">FREIGHT</td><td className="border border-black px-2 py-1">SAR</td><td className="border border-black px-2 py-1 text-right">{(invoiceData.freight || invoiceData.pricing?.gross || 0).toFixed(2)}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">DOCS FEE</td><td className="border border-black px-2 py-1">SAR</td><td className="border border-black px-2 py-1 text-right">{(invoiceData.documentsFee || 0).toFixed(2)}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">DISCOUNT</td><td className="border border-black px-2 py-1">SAR</td><td className="border border-black px-2 py-1 text-right">{(invoiceData.discount || invoiceData.pricing?.discount || 0).toFixed(2)}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">PACKING</td><td className="border border-black px-2 py-1">SAR</td><td className="border border-black px-2 py-1 text-right">{(invoiceData.packing || 0).toFixed(2)}</td></tr>
              <tr><td className="border border-black px-2 py-1 font-bold">TRANSPORT</td><td className="border border-black px-2 py-1">SAR</td><td className="border border-black px-2 py-1 text-right">{(invoiceData.destinationTransport || 0).toFixed(2)}</td></tr>
              <tr className="bg-gray-100"><td className="border border-black px-2 py-1 font-bold">TOTAL</td><td className="border border-black px-2 py-1 font-bold">SAR</td><td className="border border-black px-2 py-1 text-right font-bold">{(invoiceData.net || invoiceData.pricing?.net || 0).toFixed(2)}</td></tr>
            </tbody>
          </table>
          <div className="mt-6 text-center">
            <div className="border-t border-black mt-10 pt-1 font-bold text-sm">AUTHORIZED SIGNATURE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAInvoiceDocument;
