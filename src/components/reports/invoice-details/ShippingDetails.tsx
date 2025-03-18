
import React from 'react';

interface ShippingDetailsProps {
  invoice: any;
  isFullScreen?: boolean;
}

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
            <div className="p-2">PAOLO</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">SHIPPER 1:</div>
            <div className="p-2">{invoice.shipper1}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">SHIPPER 2:</div>
            <div className="p-2">-</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">ADDRESS:</div>
            <div className="p-2">-</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">POST CODE:</div>
            <div className="p-2">-</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CITY:</div>
            <div className="p-2 bg-blue-400 text-white">DOHA · 171</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">TOWN:</div>
            <div className="p-2">DOHA CITY</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">COUNTRY:</div>
            <div className="p-2">QATAR</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">MOBILE:</div>
            <div className="p-2">{invoice.shipperMobile}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">LAND PHONE:</div>
            <div className="p-2">0</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">PASSPORT /NIC:</div>
            <div className="p-2">N11234009</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-2 bg-gray-100 font-semibold">EMAIL:</div>
            <div className="p-2">-</div>
          </div>
        </div>
        
        <div className="border rounded">
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CONSIGNEE 1:</div>
            <div className="p-2">{invoice.consignee1}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">CONSIGNEE 2:</div>
            <div className="p-2">-</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">ADDRESS:</div>
            <div className="p-2">MAHAGAHAGODA YAKGAHA</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold"></div>
            <div className="p-2">WALAHANDUWA</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">TOWN:</div>
            <div className="p-2">SRI LANKA</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">COUNTRY:</div>
            <div className="p-2">SRI LANKA</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">MOBILE:</div>
            <div className="p-2">{invoice.consigneeMobile}</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">LAND PHONE:</div>
            <div className="p-2">0</div>
          </div>
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">PASSPORT /NIC:</div>
            <div className="p-2">{invoice.passport}</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="p-2 bg-gray-100 font-semibold">EMAIL:</div>
            <div className="p-2">-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
