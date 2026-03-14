
import React from 'react';

interface InvoiceFinancialDetailsProps {
  invoice: any;
  isFullScreen?: boolean;
}

const InvoiceFinancialDetails: React.FC<InvoiceFinancialDetailsProps> = ({ 
  invoice, 
  isFullScreen = false 
}) => {
  return (
    <div className={`grid grid-cols-2 gap-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
      <div className="border rounded">
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">FREIGHT:</div>
          <div className="p-2">{((invoice.pricing?.net || invoice.net || 0) / 3).toFixed(2)}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION TRANSPORT:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DOCUMENT:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">LOCAL TRANSPORT:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PACKING:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">STORAGE:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION CLEARING:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DESTINATION DOOR DELIVERY:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">OTHER:</div>
          <div className="p-2">0</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">GROSS:</div>
          <div className="p-2">{invoice.pricing?.gross || invoice.gross || 0}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DISCOUNT:</div>
          <div className="p-2">{invoice.discount}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">NET:</div>
          <div className="p-2">{invoice.net}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PAID:</div>
          <div className="p-2">{invoice.paid ? invoice.net : 0}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 bg-gray-100 font-semibold">DUE:</div>
          <div className="p-2">{invoice.due}</div>
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
          <div className="p-2">DOHA</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SECTOR:</div>
          <div className="p-2">COLOMBO</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">WAREHOUSE:</div>
          <div className="p-2">{invoice.warehouse}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">FREIGHT BY:</div>
          <div className="p-2">{invoice.transport === "SEA" ? "S" : "A"}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">VOLUME:</div>
          <div className="p-2">{invoice.volume}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">WEIGHT:</div>
          <div className="p-2">{invoice.weight}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">PACKAGES:</div>
          <div className="p-2">{invoice.packages}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DOOR TO DOOR:</div>
          <div className="p-2">{invoice.doorToDoor ? "Yes" : "No"}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">CAT/ ZONE:</div>
          <div className="p-2">{invoice.zone}</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">DISTRICT:</div>
          <div className="p-2 bg-blue-400 text-white">GALLE · G · · G</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SUB ZONE:</div>
          <div className="p-2 bg-blue-400 text-white">1 · Colombo</div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">REMARKS:</div>
          <div className="p-2"></div>
        </div>
        <div className="grid grid-cols-2 border-b">
          <div className="p-2 bg-gray-100 font-semibold">SALES REP:</div>
          <div className="p-2">PAOLO FERNANDO</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-2 bg-gray-100 font-semibold">PRE PAID:</div>
          <div className="p-2">{invoice.paid ? "Y" : "N"}</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFinancialDetails;
