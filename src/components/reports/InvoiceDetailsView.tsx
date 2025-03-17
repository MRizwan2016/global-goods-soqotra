
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, FileText, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface InvoiceDetailsViewProps {
  invoice: any;
}

export const InvoiceDetailsView: React.FC<InvoiceDetailsViewProps> = ({ invoice }) => {
  const navigate = useNavigate();

  return (
    <div className="invoice-details-container space-y-6">
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

      {/* Shipping Details Section */}
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

      {/* Package Details Table */}
      <div className="mt-6">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-left">Num</th>
              <th className="border border-gray-300 p-2 text-left">PACKAGE</th>
              <th className="border border-gray-300 p-2 text-center">LENGTH</th>
              <th className="border border-gray-300 p-2 text-center">WIDTH</th>
              <th className="border border-gray-300 p-2 text-center">HEIGHT</th>
              <th className="border border-gray-300 p-2 text-center">VOLUME</th>
              <th className="border border-gray-300 p-2 text-center">WEIGHT</th>
              <th className="border border-gray-300 p-2 text-center">BARCODE</th>
              <th className="border border-gray-300 p-2 text-center">CRNO</th>
              <th className="border border-gray-300 p-2 text-center">LOADED DATE</th>
              <th className="border border-gray-300 p-2 text-center">VRNO</th>
              <th className="border border-gray-300 p-2 text-center">NAME</th>
              <th className="border border-gray-300 p-2 text-center">VOYAGE</th>
              <th className="border border-gray-300 p-2 text-center">CNO</th>
              <th className="border border-gray-300 p-2 text-center">E.T.A</th>
              <th className="border border-gray-300 p-2 text-center">CLEAR</th>
              <th className="border border-gray-300 p-2 text-center">UNLOAD</th>
            </tr>
          </thead>
          <tbody>
            {invoice.packageDetails ? (
              invoice.packageDetails.map((pkg, index) => (
                <tr key={pkg.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{pkg.name}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.length}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.width}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.height}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.volume}</td>
                  <td className="border border-gray-300 p-2 text-center">{pkg.weight || "22.5"}</td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center">0</td>
                  <td className="border border-gray-300 p-2 text-center">00/00/0000</td>
                  <td className="border border-gray-300 p-2 text-center">0</td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center"></td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                  <td className="border border-gray-300 p-2 text-center">//</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 p-2">1</td>
                <td className="border border-gray-300 p-2">TELEVISION SET (P/E)</td>
                <td className="border border-gray-300 p-2 text-center">41</td>
                <td className="border border-gray-300 p-2 text-center">7</td>
                <td className="border border-gray-300 p-2 text-center">26</td>
                <td className="border border-gray-300 p-2 text-center">0.125</td>
                <td className="border border-gray-300 p-2 text-center">22.5</td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center">0</td>
                <td className="border border-gray-300 p-2 text-center">00/00/0000</td>
                <td className="border border-gray-300 p-2 text-center">0</td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center"></td>
                <td className="border border-gray-300 p-2 text-center">//</td>
                <td className="border border-gray-300 p-2 text-center">//</td>
                <td className="border border-gray-300 p-2 text-center">//</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Details Section */}
      <div className="mt-6">
        <div className="bg-green-600 text-white p-2 font-semibold text-center">
          PAYMMENT DETAILS
        </div>
        
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">Num</th>
              <th className="border border-gray-300 p-2 text-center">PAID Num</th>
              <th className="border border-gray-300 p-2 text-center">PAID DATE</th>
              <th className="border border-gray-300 p-2 text-center">PAID AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">RECON. DATE</th>
              <th className="border border-gray-300 p-2 text-center">RECON. Num</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cargo Hold Details */}
      <div className="mt-6">
        <div className="bg-green-600 text-white p-2 font-semibold text-center">
          CARGO HOLD DETAILS
        </div>
        
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">Num</th>
              <th className="border border-gray-300 p-2 text-center">HOLD NO</th>
              <th className="border border-gray-300 p-2 text-center">HOLD DATE</th>
              <th className="border border-gray-300 p-2 text-center">HOLD AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">COLLECT DATE</th>
              <th className="border border-gray-300 p-2 text-center">COLLECT AMOUNT</th>
              <th className="border border-gray-300 p-2 text-center">COLLECT BY</th>
              <th className="border border-gray-300 p-2 text-center">COLLECT RATE</th>
              <th className="border border-gray-300 p-2 text-center">SELLING RATE</th>
              <th className="border border-gray-300 p-2 text-center">VESSEL RNO</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cargo Clear Details */}
      <div className="mt-6">
        <div className="bg-green-600 text-white p-2 font-semibold text-center">
          CARGO CLEAR DETAILS
        </div>
        
        <table className="w-full border border-collapse mt-2">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-300 p-2 text-center">Num</th>
              <th className="border border-gray-300 p-2 text-center">GATE PASS</th>
              <th className="border border-gray-300 p-2 text-center">W/H INVOICE</th>
              <th className="border border-gray-300 p-2 text-center">CLEAR DATE</th>
              <th className="border border-gray-300 p-2 text-center">CLEAR PKG</th>
              <th className="border border-gray-300 p-2 text-center">TIME IN</th>
              <th className="border border-gray-300 p-2 text-center">TIME OUT</th>
              <th className="border border-gray-300 p-2 text-center">NIC</th>
              <th className="border border-gray-300 p-2 text-center">DOB</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
              <td className="border border-gray-300 p-2 text-center"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        
        <Button className="bg-blue-500 hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Print Certificate
        </Button>
        
        <Button className="bg-blue-500 hover:bg-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          Print HBL
        </Button>
        
        <Button 
          className="bg-blue-500 hover:bg-blue-600"
          onClick={() => navigate("/reports/cargo")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
};
