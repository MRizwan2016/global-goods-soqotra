
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { mockInvoiceData } from "@/data/mockData";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const InvoicePrint = () => {
  const { id } = useParams();
  const printRef = useRef<HTMLDivElement>(null);
  
  const invoice = mockInvoiceData.find(inv => inv.id === id);
  
  useEffect(() => {
    if (invoice) {
      // Trigger print dialog on component mount
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [invoice]);
  
  if (!invoice) {
    return <div className="p-8 text-center">Invoice not found</div>;
  }
  
  return (
    <div 
      ref={printRef} 
      className="p-4 max-w-[210mm] mx-auto bg-white"
      style={{ minHeight: '297mm' }}
    >
      {/* Header with Logo and Company Info */}
      <div className="flex mb-4">
        <div className="w-1/3 text-left text-xs leading-tight">
          <div className="uppercase font-semibold">International</div>
          <div className="uppercase font-semibold">Freight Forwarding</div>
          <div className="uppercase font-semibold">Relocation</div>
          <div className="uppercase font-semibold">Specialize in Handling</div>
          <div className="uppercase font-semibold">Personal Effects</div>
          
          <div className="mt-3 text-[10px]">
            <p>Office 3, 1st Floor, Building: 53,</p>
            <p>Street 76, Azizta Commercial Street,</p>
            <p>Zone 53, Doha, State of Qatar.</p>
            
            <div className="mt-1">
              <p>Tel: +974 4441 9187</p>
              <p>Mobile: +974 5037 4111</p>
              <p>+974 3335 3390</p>
              <p>+974 5080 5560</p>
              <p>+974 3080 3377</p>
            </div>
            
            <div className="mt-1 font-semibold">
              <p>Warehouse</p>
              <p>Building 25, Street 47,</p>
              <p>Zone 57, Doha, State of Qatar.</p>
              <p>Tel: +974 4441 2770</p>
              <p>+974 4441 2773</p>
            </div>
            
            <div className="mt-1 font-semibold">
              <p>ERITREA</p>
              <p>DHL EXPRESS</p>
              <p>- ASMARA BRANCH</p>
              <p>Mr. Amanuel Akole</p>
              <p>Mobile: +291 1126595</p>
              <p>Tel: +291 120210</p>
              <p>Fax: +291 1123882</p>
              <p>Email:</p>
              <p>amanuelakole@dhlexpress.com</p>
              <p>aakole@gmail.com</p>
            </div>
            
            <div className="mt-1 font-semibold">
              <p>DHL EXPRESS</p>
              <p>- MUSSAWA BRANCH</p>
              <p>Mr. Idries Omar Idries</p>
              <p>Mobile: +291 7159848</p>
            </div>
            
            <div className="mt-1 font-semibold">
              <p>PORT SUDAN</p>
              <p>JAMEL CLEARANCE</p>
              <p>CUSTOMS AND TRANSPORT</p>
              <p>Mr. Ossama Mohamed Nor</p>
              <p>Mobile: +249 117214361</p>
              <p>+249 960 637999</p>
              <p>+249 920 080385</p>
              <p>Email:</p>
              <p>osamagami13@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div className="w-2/3 flex flex-col items-center">
          <div className="text-4xl font-bold mb-1">SO<span className="text-green-600">Q</span>OTRA</div>
          <div className="text-xl uppercase font-semibold mb-1">Logistics Services and Trading</div>
          <div className="text-xs">A Member of</div>
          <div className="text-sm font-medium">Al Maraam Logistics Services & Trading W.L.L.</div>
          
          <div className="w-full mt-4">
            <div className="flex justify-end mb-2">
              <div className="border border-black grid grid-cols-2 w-60">
                <div className="border-r border-black px-2 text-center font-semibold">ERITREA</div>
                <div className="px-2 text-center font-semibold">SUDAN</div>
              </div>
            </div>
            
            <div className="flex justify-end mb-2">
              <div className="border border-black w-60">
                <div className="px-2 text-xs">GY No:</div>
              </div>
            </div>
            
            <div className="flex mb-2">
              <div className="text-sm">Date: {invoice.date}</div>
            </div>
            
            {/* Shipper & Consignee Section */}
            <div className="grid grid-cols-2 gap-4 border border-black">
              <div className="border-r border-black p-2">
                <div className="font-semibold bg-gray-100 mb-1 px-1">SHIPPER</div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name1</div>
                    <div className="flex-1 border-b border-gray-400 ml-1">{invoice.shipper1}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name 2</div>
                    <div className="flex-1 border-b border-gray-400 ml-1">{invoice.shipper2 || ''}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name 3</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-start">
                    <div className="w-16 text-sm">Address</div>
                    <div className="flex-1 border-b border-gray-400 ml-1 h-12"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Tel:</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">QID No</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">ID Card No</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <div className="font-semibold bg-gray-100 mb-1 px-1">CONSIGNEE</div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name1</div>
                    <div className="flex-1 border-b border-gray-400 ml-1">{invoice.consignee1}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name 2</div>
                    <div className="flex-1 border-b border-gray-400 ml-1">{invoice.consignee2 || ''}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Name 3</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-start">
                    <div className="w-16 text-sm">Address</div>
                    <div className="flex-1 border-b border-gray-400 ml-1 h-12">{invoice.address}</div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Tel:</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">Passport No</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-16 text-sm">ID Card No</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="flex items-center">
                    <div className="w-24 text-[10px]">Value for Customs Purposes</div>
                    <div className="flex-1 border-b border-gray-400 ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cargo Details Table */}
      <div className="mt-2 w-full">
        <table className="w-full border border-black text-sm">
          <thead>
            <tr>
              <th className="border border-black p-1 text-center w-16">QTY</th>
              <th className="border border-black p-1 text-center">Cargo Type and Description</th>
              <th className="border border-black p-1 text-center w-12">L</th>
              <th className="border border-black p-1 text-center w-12">W</th>
              <th className="border border-black p-1 text-center w-12">H</th>
              <th className="border border-black p-1 text-center w-24">Volume</th>
            </tr>
          </thead>
          <tbody>
            {invoice.packageDetails.map((pkg, index) => (
              <tr key={pkg.id}>
                <td className="border border-black p-1 text-center">{index + 1}</td>
                <td className="border border-black p-1">{pkg.name}</td>
                <td className="border border-black p-1 text-center">{pkg.length}</td>
                <td className="border border-black p-1 text-center">{pkg.width}</td>
                <td className="border border-black p-1 text-center">{pkg.height}</td>
                <td className="border border-black p-1 text-center">{pkg.volume}</td>
              </tr>
            ))}
            {/* Add empty rows to match template */}
            {Array.from({ length: Math.max(10 - invoice.packageDetails.length, 0) }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border border-black p-1 h-7"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
                <td className="border border-black p-1"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Additional Info Section */}
      <div className="mt-2 border border-black">
        <div className="border-b border-black p-1">
          <div className="flex items-center">
            <div className="mr-2">Packing not in good condition</div>
            <div className="ml-auto flex items-center">
              <div className="mr-2">Item:</div>
              <div className="border border-black w-64 h-6"></div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-black p-1">
          <div>Client have to settle the final destination chargers</div>
        </div>
        
        <div className="flex">
          <div className="w-1/2 border-r border-black p-2">
            <div className="mb-1">HANDLED BY</div>
            <div className="h-16"></div>
            <div className="font-semibold">I/We declare these details are true and correct.</div>
            <div className="text-xs">
              Company is not liable to any damages or losses on transit, unless customer require Marine Insurance Cover.
            </div>
            
            <div className="mt-2">
              <div className="font-semibold">Shipper's Declaration:</div>
              <div className="text-[8px] mt-1">
                I/We hereby declare that the container doesn't contain liquid mercury, weapons, ammunition, alcohol, narcotics, tobacco nor currency. This shipment doesn't contain illegal items, cash, jewellery or dangerous goods. Perishable & breakable items are shipped at my own risk. "Soqotra Logistics Services, Transportation and Trading W.L.L." is not liable for any lost, damaged or undeclared items. Shipper / Consignee is responsible for destination charges. I/We understand that the delivery time is just estimated and it may be subject to change, such schedule may be advanced, delayed or cancelled with or without prior notice.
                I/We hereby confirm that the above information is true and accurate.
                I/We undertake to comply with the above-mentioned terms and conditions.
              </div>
            </div>
          </div>
          
          <div className="w-1/2 p-2">
            <div className="flex justify-between">
              <div>Total Volume</div>
              <div className="text-right">{invoice.volume} m³</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Freight @____per Cu.M</div>
              <div className="text-right border-b border-black w-32">{invoice.gross}</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Documents</div>
              <div className="text-right border-b border-black w-32">0</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Collection</div>
              <div className="text-right border-b border-black w-32">0</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Storage</div>
              <div className="text-right border-b border-black w-32">0</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Packing</div>
              <div className="text-right border-b border-black w-32">0</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Insurance</div>
              <div className="text-right border-b border-black w-32"></div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Total</div>
              <div className="text-right border-b border-black w-32">{invoice.gross}</div>
            </div>
            
            <div className="flex justify-between mt-1">
              <div>Discount</div>
              <div className="text-right border-b border-black w-32">{invoice.discount}</div>
            </div>
            
            <div className="flex justify-between mt-2">
              <div className="font-semibold">Net Amount</div>
              <div className="border border-black p-1 w-32 text-right font-semibold">{invoice.net}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="mt-4 pt-3 flex justify-between text-sm">
        <div>
          <div className="border-t border-black w-64 mx-auto mt-16"></div>
          <div className="text-center">Signature - Customer/Shipper</div>
        </div>
        
        <div>
          <div className="border-t border-black w-64 mx-auto mt-16"></div>
          <div className="text-center">Full Payment Received - Signature & Date</div>
        </div>
      </div>
      
      {/* Bottom Country Section */}
      <div className="mt-4 flex">
        <div className="border border-black grid grid-cols-2 w-60">
          <div className="border-r border-black px-2 text-center font-semibold">ERITREA</div>
          <div className="px-2 text-center font-semibold">SUDAN</div>
        </div>
        <div className="border border-black ml-2 w-28">
          <div className="px-2 text-xs">GY No:</div>
        </div>
      </div>
      
      {/* Print Styles - will only apply when printing */}
      <style type="text/css" media="print">
        {`
          @page {
            size: A4;
            margin: 5mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;
