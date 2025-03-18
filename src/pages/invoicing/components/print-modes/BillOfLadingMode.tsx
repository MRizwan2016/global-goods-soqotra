
import React from "react";

interface BillOfLadingModeProps {
  invoice: any;
  packageDetails: any[];
  totalWeight: string;
  totalVolume: string;
}

const BillOfLadingMode: React.FC<BillOfLadingModeProps> = ({
  invoice,
  packageDetails,
  totalWeight,
  totalVolume,
}) => {
  return (
    <div className="border border-black p-6">
      <h2 className="text-center text-2xl font-bold mb-4">HOUSE BILL OF LADING</h2>
      <div className="text-right mb-6">
        <p className="font-bold">BL Number: {invoice.invoiceNumber}-BL</p>
        <p>Date: {invoice.date}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h3 className="font-bold mb-2">SHIPPER</h3>
          <p>{invoice.shipper1}</p>
          <p>{invoice.shipper2 || ""}</p>
          <p>THUMAMA, DOHA</p>
        </div>
        <div className="border p-3">
          <h3 className="font-bold mb-2">CONSIGNEE</h3>
          <p>{invoice.consignee1}</p>
          <p>PASSPORT NO: {invoice.consigneeIdNumber || "N/A"}</p>
        </div>
      </div>
      
      <div className="border p-3 mb-6">
        <h3 className="font-bold mb-2">NOTIFY PARTY</h3>
        <p>Same as Consignee</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h3 className="font-bold mb-2">PORT OF LOADING</h3>
          <p>DOHA, QATAR</p>
        </div>
        <div className="border p-3">
          <h3 className="font-bold mb-2">PORT OF DISCHARGE</h3>
          <p>{invoice.warehouse || "COLOMBO"}, SRI LANKA</p>
        </div>
      </div>
      
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr>
            <th className="border p-2">MARKS & NUMBERS</th>
            <th className="border p-2">DESCRIPTION OF GOODS</th>
            <th className="border p-2">WEIGHT (KG)</th>
            <th className="border p-2">VOLUME (CBM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">AS ADDRESSED</td>
            <td className="border p-2">
              {packageDetails.map((pkg: any, index: number) => (
                <div key={index}>
                  {pkg.name} {index < packageDetails.length - 1 ? ", " : ""}
                </div>
              ))}
              SAID TO CONTAIN USED PERSONAL EFFECTS
            </td>
            <td className="border p-2 text-center">{totalWeight}</td>
            <td className="border p-2 text-center">{totalVolume}</td>
          </tr>
        </tbody>
      </table>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border p-3">
          <h3 className="font-bold mb-2">FREIGHT DETAILS</h3>
          <p>FREIGHT {invoice.paid ? "PREPAID" : "COLLECT"}</p>
        </div>
        <div className="border p-3">
          <h3 className="font-bold mb-2">DECLARATION</h3>
          <p>SHIPPER'S LOAD, COUNT & SEAL</p>
        </div>
      </div>
      
      <div className="mt-12 grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold">FOR THE CARRIER</p>
          <div className="h-16"></div>
          <p>AUTHORIZED SIGNATURE</p>
        </div>
        <div>
          <p className="font-bold">DATE OF ISSUE</p>
          <p>{invoice.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BillOfLadingMode;
