
import React from 'react';

interface InvoiceFinancialDetailsProps {
  invoice: any;
  isFullScreen?: boolean;
}

const InvoiceFinancialDetails: React.FC<InvoiceFinancialDetailsProps> = ({ 
  invoice, 
  isFullScreen = false 
}) => {
  const freight = Number(invoice.freight || 0);
  const destinationTransport = Number(invoice.destinationTransport || 0);
  const documentsFee = Number(invoice.documentsFee || 0);
  const localTransport = Number(invoice.localTransport || 0);
  const packingCharges = Number(invoice.packingCharges || 0);
  const storage = Number(invoice.storage || 0);
  const destinationClearing = Number(invoice.destinationClearing || 0);
  const destinationDoorDelivery = Number(invoice.destinationDoorDelivery || 0);
  const other = Number(invoice.other || 0);
  const gross = Number(invoice.pricing?.gross || invoice.gross || 0);
  const discount = Number(invoice.pricing?.discount || invoice.discount || 0);
  const net = Number(invoice.pricing?.net || invoice.net || 0);
  const totalPaid = Number(invoice.totalPaid || 0);
  const due = net - totalPaid;

  // Determine freight by from serviceType
  const getFreightBy = () => {
    const svc = (invoice.serviceType || invoice.freightBy || '').toUpperCase();
    if (svc.includes('SEA')) return 'SEA';
    if (svc.includes('AIR')) return 'AIR';
    return svc || '-';
  };

  // Package count from packageDetails array or totalPackages
  const packageCount = Array.isArray(invoice.packageDetails) 
    ? invoice.packageDetails.length 
    : (invoice.totalPackages || 0);

  const volume = invoice.totalVolume || invoice.volume || 0;
  const weight = invoice.totalWeight || invoice.weight || 0;

  return (
    <div className={`grid grid-cols-2 gap-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="border rounded">
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">FREIGHT:</div>
          <div className="p-2">{freight.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION TRANSPORT:</div>
          <div className="p-2">{destinationTransport}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DOCUMENT:</div>
          <div className="p-2">{documentsFee}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">LOCAL TRANSPORT:</div>
          <div className="p-2">{localTransport}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PACKING:</div>
          <div className="p-2">{packingCharges}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">STORAGE:</div>
          <div className="p-2">{storage}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION CLEARING:</div>
          <div className="p-2">{destinationClearing}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION DOOR DELIVERY:</div>
          <div className="p-2">{destinationDoorDelivery}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">OTHER:</div>
          <div className="p-2">{other}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">GROSS:</div>
          <div className="p-2">{gross.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DISCOUNT:</div>
          <div className="p-2">{discount}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">NET:</div>
          <div className="p-2">{net.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PAID:</div>
          <div className="p-2">{totalPaid.toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 bg-gray-100 font-semibold">DUE:</div>
          <div className="p-2">{due.toFixed(2)}</div>
        </div>
      </div>

      <div className="border rounded">
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">INVOICE NUMBER:</div>
          <div className="p-2">{invoice.invoiceNumber}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">INVOICE DATE:</div>
          <div className="p-2">{invoice.date}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">BRANCH:</div>
          <div className="p-2">{invoice.shipperCity?.toUpperCase() || 'DOHA'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SECTOR:</div>
          <div className="p-2">{invoice.sector || invoice.destination || 'COLOMBO'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">WAREHOUSE:</div>
          <div className="p-2">{invoice.warehouse || '-'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">FREIGHT BY:</div>
          <div className="p-2">{getFreightBy()}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">VOLUME:</div>
          <div className="p-2">{typeof volume === 'number' ? volume.toFixed(4) : volume}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">WEIGHT:</div>
          <div className="p-2">{typeof weight === 'number' ? weight.toFixed(1) : weight}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PACKAGES:</div>
          <div className="p-2">{packageCount}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DOOR TO DOOR:</div>
          <div className="p-2">{invoice.doorToDoor || 'NO'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">CAT/ ZONE:</div>
          <div className="p-2">{invoice.zone || invoice.cargoType || '-'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DISTRICT:</div>
          <div className="p-2">{invoice.consigneeDistrict || invoice.district || '-'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SUB ZONE:</div>
          <div className="p-2">{invoice.consigneeProvince || '-'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">REMARKS:</div>
          <div className="p-2">{invoice.remarks || '-'}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SALES REP:</div>
          <div className="p-2">{invoice.salesRepresentative || '-'}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 bg-gray-100 font-semibold">PRE PAID:</div>
          <div className="p-2">{invoice.prePaid || (invoice.paid ? "Y" : "N")}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFinancialDetails;
