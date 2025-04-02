
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
  // Format package details for proper display
  const formatPackageDetails = () => {
    if (!packageDetails || packageDetails.length === 0) {
      return "PERSONAL EFFECTS";
    }
    
    return packageDetails.map((pkg: any, index: number) => {
      const name = pkg.name || pkg.packageName || "";
      const description = pkg.description || "";
      return (
        <span key={index} className="block">
          {name}{description ? ` - ${description}` : ""}
          {index < packageDetails.length - 1 ? "," : ""}
        </span>
      );
    });
  };

  return (
    <div className="border border-black p-6 house-bill-of-lading">
      <h2 className="text-center text-xl font-bold mb-2">HOUSE BILL OF LADING</h2>
      <div className="text-right mb-3">
        <p className="font-bold break-words bl-number">BL Number: {invoice.invoiceNumber}-BL</p>
        <p>Date: {invoice.date}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">SHIPPER</h3>
          <p className="text-sm">{invoice.shipper1}</p>
          <p className="text-sm">{invoice.shipper2 || ""}</p>
          <p className="text-sm">THUMAMA, DOHA</p>
        </div>
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">CONSIGNEE</h3>
          <p className="text-sm">{invoice.consignee1}</p>
          <p className="text-sm">PASSPORT NO: {invoice.consigneeIdNumber || "N/A"}</p>
        </div>
      </div>
      
      <div className="border p-2 mb-3">
        <h3 className="font-bold mb-1 text-sm">NOTIFY PARTY</h3>
        <p className="text-sm">Same as Consignee</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">PORT OF LOADING</h3>
          <p className="text-sm">DOHA, QATAR</p>
        </div>
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">PORT OF DISCHARGE</h3>
          <p className="text-sm">{invoice.warehouse || "COLOMBO"}, SRI LANKA</p>
        </div>
      </div>
      
      <table className="w-full border-collapse mb-3 text-sm">
        <thead>
          <tr>
            <th className="border p-1">MARKS & NUMBERS</th>
            <th className="border p-1">DESCRIPTION OF GOODS</th>
            <th className="border p-1">WEIGHT (KG)</th>
            <th className="border p-1">VOLUME (CBM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-1">AS ADDRESSED</td>
            <td className="border p-1 whitespace-pre-line break-words">
              {formatPackageDetails()}
              <div className="mt-1">SAID TO CONTAIN USED PERSONAL EFFECTS</div>
            </td>
            <td className="border p-1 text-center">{totalWeight}</td>
            <td className="border p-1 text-center">{totalVolume}</td>
          </tr>
        </tbody>
      </table>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">FREIGHT DETAILS</h3>
          <p className="text-sm">FREIGHT {invoice.paid ? "PREPAID" : "COLLECT"}</p>
        </div>
        <div className="border p-2">
          <h3 className="font-bold mb-1 text-sm">DECLARATION</h3>
          <p className="text-sm">SHIPPER'S LOAD, COUNT & SEAL</p>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          <p className="font-bold text-sm">FOR THE CARRIER</p>
          <div className="h-10"></div>
          <p className="text-sm">AUTHORIZED SIGNATURE</p>
        </div>
        <div>
          <p className="font-bold text-sm">DATE OF ISSUE</p>
          <p className="text-sm">{invoice.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BillOfLadingMode;
