
import React from 'react';

interface ShippingDetailsProps {
  invoice: any;
  isFullScreen?: boolean;
}

const safeStr = (val: any, fallback = "-"): string => {
  if (val == null || val === "") return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  if (typeof val === "object") {
    return val.name || val.label || val.value || JSON.stringify(val);
  }
  return String(val);
};

const ShippingDetails: React.FC<ShippingDetailsProps> = ({ 
  invoice, 
  isFullScreen = false 
}) => {
  return (
    <div className={`mt-6 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="bg-blue-600 text-white p-2 font-semibold">
        SHIPPING DETAILS
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="border rounded">
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">HAND-OVER BY:</div>
            <div className="p-2">{safeStr(invoice.driverName || invoice.handOverBy)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">SHIPPER 1:</div>
            <div className="p-2">{safeStr(invoice.shipper1)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">SHIPPER 2:</div>
            <div className="p-2">{safeStr(invoice.shipper2)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">ADDRESS:</div>
            <div className="p-2">{safeStr(invoice.shipperAddress)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">POST CODE:</div>
            <div className="p-2">{safeStr(invoice.shipperPostCode)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CITY:</div>
            <div className="p-2">{safeStr(invoice.shipperCity, "DOHA")}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">TOWN:</div>
            <div className="p-2">{safeStr(invoice.shipperTown, safeStr(invoice.shipperCity, "DOHA"))}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">COUNTRY:</div>
            <div className="p-2">{safeStr(invoice.shipperCountry, "QATAR")}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">MOBILE:</div>
            <div className="p-2">{safeStr(invoice.shipperMobile)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">LAND PHONE:</div>
            <div className="p-2">{safeStr(invoice.shipperLandPhone, "0")}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">PASSPORT /NIC:</div>
            <div className="p-2">{safeStr(invoice.shipperIdNumber)}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-2 bg-gray-100 font-semibold">EMAIL:</div>
            <div className="p-2">{safeStr(invoice.shipperEmail)}</div>
          </div>
        </div>
        
        <div className="border rounded">
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CONSIGNEE 1:</div>
            <div className="p-2">{safeStr(invoice.consignee1)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CONSIGNEE 2:</div>
            <div className="p-2">{safeStr(invoice.consignee2)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">ADDRESS:</div>
            <div className="p-2">{safeStr(invoice.consigneeAddress)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">DELIVERY ADDRESS:</div>
            <div className="p-2">{safeStr(invoice.consigneeDeliveryAddress)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">TOWN:</div>
            <div className="p-2">{safeStr(invoice.consigneeCity || invoice.consigneeCountry || invoice.country)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">COUNTRY:</div>
            <div className="p-2">{safeStr(invoice.consigneeCountry || invoice.country)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">MOBILE:</div>
            <div className="p-2">{safeStr(invoice.consigneeMobile)}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">LAND PHONE:</div>
            <div className="p-2">{safeStr(invoice.consigneeLandPhone, "0")}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">PASSPORT /NIC:</div>
            <div className="p-2 font-semibold text-blue-600">{safeStr(invoice.consigneeIdNumber)}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-2 bg-gray-100 font-semibold">EMAIL:</div>
            <div className="p-2">{safeStr(invoice.consigneeEmail)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
