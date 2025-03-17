
import React from 'react';

interface InvoiceDetailsViewProps {
  invoice: any;
}

export const InvoiceDetailsView: React.FC<InvoiceDetailsViewProps> = ({ invoice }) => {
  return (
    <div className="invoice-details-container">
      <div className="bg-green-100 p-3 mb-4 rounded">
        <h2 className="text-green-800 font-medium text-lg">Display Invoice</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded">
          <div className="grid grid-cols-2 border-b">
            <div className="p-2 bg-gray-100 font-semibold">FREIGHT:</div>
            <div className="p-2">{invoice.net / 3}</div>
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
            <div className="p-2">{invoice.gross}</div>
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

      <div className="mt-6">
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
            <div className="grid grid-cols-2">
              <div className="p-2 bg-gray-100 font-semibold">MOBILE:</div>
              <div className="p-2">{invoice.shipperMobile}</div>
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
            <div className="grid grid-cols-2">
              <div className="p-2 bg-gray-100 font-semibold">PASSPORT /NIC:</div>
              <div className="p-2">{invoice.passport}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
