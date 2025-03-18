
import React from "react";
import PrintInvoiceHeader from "../PrintInvoiceHeader";
import PrintShipperConsignee from "../PrintShipperConsignee";
import PrintDestinationInfo from "../PrintDestinationInfo";
import PrintCargoTable from "../PrintCargoTable";
import PrintInvoiceFooter from "../PrintInvoiceFooter";

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
    <div className="border border-black">
      {/* Header Section */}
      <PrintInvoiceHeader 
        invoiceNumber={invoice.invoiceNumber}
        date={invoice.date}
        net={invoice.net}
      />
      
      {/* Shipper/Consignee Section */}
      <PrintShipperConsignee 
        shipper1={invoice.shipper1 || ""}
        shipper2={invoice.shipper2 || ""}
        consignee1={invoice.consignee1 || ""}
        consigneeIdNumber={invoice.consigneeIdNumber || ""}
      />
      
      {/* Destination Info Section */}
      <PrintDestinationInfo 
        warehouse={invoice.warehouse || ""}
      />
      
      {/* Cargo Table Section */}
      <PrintCargoTable 
        packages={packageDetails}
        totalWeight={totalWeight}
        totalVolume={totalVolume}
      />
      
      {/* Footer Section */}
      <PrintInvoiceFooter 
        gross={invoice.gross}
        discount={invoice.discount}
        net={invoice.net}
        paid={invoice.paid}
      />
    </div>
  );
};

export default InvoiceMode;
