
import React from "react";
import PrintInvoiceHeader from "../PrintInvoiceHeader";
import PrintShipperConsignee from "../PrintShipperConsignee";
import PrintDestinationInfo from "../PrintDestinationInfo";
import PrintCargoTable from "../PrintCargoTable";
import PrintInvoiceFooter from "../PrintInvoiceFooter";
import { QRCodeSVG } from "qrcode.react";

interface InvoiceModeProps {
  invoice: any;
  packageDetails: any[];
  totalWeight: string;
  totalVolume: string;
}

const InvoiceMode: React.FC<InvoiceModeProps> = ({
  invoice,
  packageDetails,
  totalWeight,
  totalVolume,
}) => {
  return (
    <div className="shadow-sm">
      {/* Header Section */}
      <div className="p-6 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-16 w-16 mr-4" />
            <div>
              <h1 className="text-xl font-bold">SOQOTRA LOGISTICS SERVICES & TRADING W.L.L</h1>
              <p className="text-sm">P.O.Box: 55861, Manthithu, Doha, Qatar</p>
              <p className="text-sm">Tel: +974 - 44832508 | Email: ops@almaraam.com</p>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <QRCodeSVG 
                value={`INVOICE:${invoice.invoiceNumber}\nDATE:${invoice.date}\nAMOUNT:${invoice.net} QAR`} 
                size={80} 
                level="M"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold">INVOICE #{invoice.invoiceNumber}</h2>
              <p className="text-sm">Date: {invoice.date}</p>
              <p className="text-sm">Print Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Shipper/Consignee Section */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50">
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-bold border-b pb-1 mb-2">SHIPPER</h3>
          <p className="font-medium">{invoice.shipper1 || ""}</p>
          {invoice.shipper2 && <p>{invoice.shipper2}</p>}
          <p className="mt-2">THUMAMA, DOHA</p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Mobile: </span>
            {invoice.shipperMobile || "Not provided"}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-bold border-b pb-1 mb-2">CONSIGNEE</h3>
          <p className="font-medium">{invoice.consignee1 || ""}</p>
          {invoice.consignee2 && <p>{invoice.consignee2}</p>}
          <p className="mt-2">{invoice.address || "NO 47/2, KOTADENIYA"}</p>
          <p>DANOWITA, {invoice.country || "SRI LANKA"}</p>
          <p className="text-sm mt-2">
            <span className="font-semibold">Mobile: </span>
            {invoice.consigneeMobile || "Not provided"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">ID/Passport: </span>
            {invoice.consigneeIdNumber || "Not provided"}
          </p>
        </div>
      </div>
      
      {/* Destination Info Section */}
      <div className="p-4 bg-white">
        <h3 className="font-bold border-b pb-1 mb-2">SHIPPING DETAILS</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-semibold">Warehouse:</p>
            <p>{invoice.warehouse || "QA Warehouse"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Sector:</p>
            <p>{invoice.sector || "SL"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Payment Status:</p>
            <p className={invoice.paid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
              {invoice.paid ? "PAID" : "UNPAID"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Payment Method:</p>
            <p>{invoice.paymentMethod || "Cash"}</p>
          </div>
        </div>
      </div>
      
      {/* Cargo Table Section */}
      <div className="p-4">
        <h3 className="font-bold border-b pb-1 mb-2">CARGO DETAILS</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">No.</th>
              <th className="border p-2 text-left">Package Type</th>
              <th className="border p-2 text-left">Qty</th>
              <th className="border p-2 text-left">Weight (kg)</th>
              <th className="border p-2 text-left">Volume (m³)</th>
              <th className="border p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {packageDetails.map((pkg, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{pkg.packageName}</td>
                <td className="border p-2">{pkg.quantity}</td>
                <td className="border p-2">{parseFloat(pkg.weight).toFixed(2)}</td>
                <td className="border p-2">{parseFloat(pkg.volume).toFixed(3)}</td>
                <td className="border p-2">{pkg.description || "General Cargo"}</td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td colSpan={2} className="border p-2 text-right">Total:</td>
              <td className="border p-2">{packageDetails.reduce((sum, pkg) => sum + parseInt(pkg.quantity), 0)}</td>
              <td className="border p-2">{totalWeight} kg</td>
              <td className="border p-2">{totalVolume} m³</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Footer Section */}
      <div className="mt-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm">
            <p className="font-bold mb-2">TERMS & CONDITIONS:</p>
            <p>In case of dispute over any charges on this invoice please email:</p>
            <p>manager@soqotra@almaraam.com TO US WITHIN SEVEN DAYS FROM THE DATE OF INVOICE.</p>
            <p>Otherwise charges would be deemed as correct and payable without further delay.</p>
            <p className="mt-2">This invoice must be settle in full within seven days of the above date.</p>
            <p>Your goods are not insured through Soqotra Logistics Services, we accept no liability</p>
            <p>whatsoever for any damages or loss incurred during shipping.</p>
          </div>
          
          <div className="border-l pl-4">
            <div className="mb-4">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="p-1">Freight</td>
                    <td className="p-1 text-right">{parseFloat(String(invoice.gross)).toFixed(2)} QAR</td>
                  </tr>
                  <tr>
                    <td className="p-1">Discount</td>
                    <td className="p-1 text-right">({parseFloat(String(invoice.discount)).toFixed(2)}) QAR</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="p-1 border-t">Total</td>
                    <td className="p-1 text-right border-t">{parseFloat(String(invoice.net)).toFixed(2)} QAR</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="p-1">Total Due</td>
                    <td className="p-1 text-right">{parseFloat(String(invoice.net)).toFixed(2)} QAR</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-center">
              <div className={`border-2 p-2 w-32 text-center font-bold text-xl ${invoice.paid ? "border-green-600 text-green-600" : "border-red-600 text-red-600"}`}>
                {invoice.paid ? "PAID" : "UNPAID"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-xs text-gray-500">
          <p>Thank you for your business. For any inquiries, please contact us at ops@almaraam.com</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceMode;
