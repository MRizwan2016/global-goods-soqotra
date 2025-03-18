
import React from "react";

interface CertificateModeProps {
  invoice: any;
  packageDetails: any[];
  totalWeight: string;
  totalVolume: string;
}

const CertificateMode: React.FC<CertificateModeProps> = ({
  invoice,
  packageDetails,
  totalWeight,
  totalVolume,
}) => {
  return (
    <div className="border border-black p-6">
      <h2 className="text-center text-2xl font-bold mb-6">CERTIFICATE OF SHIPMENT</h2>
      
      <div className="mb-6">
        <p className="mb-2">This is to certify that the following consignment has been shipped:</p>
        <p className="mb-2">
          <span className="font-bold">Invoice Number:</span> {invoice.invoiceNumber}
        </p>
        <p className="mb-2">
          <span className="font-bold">Date:</span> {invoice.date}
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h3 className="font-bold mb-2">SHIPPER</h3>
          <p>{invoice.shipper1}</p>
          <p>{invoice.shipper2 || ""}</p>
          <p>DOHA, QATAR</p>
        </div>
        <div className="border p-3">
          <h3 className="font-bold mb-2">CONSIGNEE</h3>
          <p>{invoice.consignee1}</p>
          <p>ID: {invoice.consigneeIdNumber || "N/A"}</p>
          <p>{invoice.warehouse || "COLOMBO"}, SRI LANKA</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-bold mb-2">DESCRIPTION OF GOODS</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-center">Quantity</th>
              <th className="border p-2 text-center">Weight (KG)</th>
              <th className="border p-2 text-center">Volume (CBM)</th>
            </tr>
          </thead>
          <tbody>
            {packageDetails.map((pkg: any, index: number) => (
              <tr key={index}>
                <td className="border p-2">{pkg.name}</td>
                <td className="border p-2 text-center">1</td>
                <td className="border p-2 text-center">{pkg.weight || "22.5"}</td>
                <td className="border p-2 text-center">{pkg.volume}</td>
              </tr>
            ))}
            <tr>
              <td className="border p-2 font-bold">TOTAL</td>
              <td className="border p-2 text-center font-bold">{packageDetails.length}</td>
              <td className="border p-2 text-center font-bold">{totalWeight}</td>
              <td className="border p-2 text-center font-bold">{totalVolume}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mb-6">
        <p className="mb-2">
          <span className="font-bold">Vessel/Shipment:</span> ALMARAAM LOGISTICS SERVICE
        </p>
        <p className="mb-2">
          <span className="font-bold">Port of Loading:</span> DOHA, QATAR
        </p>
        <p className="mb-2">
          <span className="font-bold">Port of Discharge:</span> {invoice.warehouse || "COLOMBO"}, SRI LANKA
        </p>
      </div>
      
      <div className="mt-12">
        <p className="mb-2 font-bold">ALMARAAM LOGISTICS SERVICES & TRADING W.L.L</p>
        <div className="h-16"></div>
        <p>Authorized Signature & Stamp</p>
      </div>
    </div>
  );
};

export default CertificateMode;
