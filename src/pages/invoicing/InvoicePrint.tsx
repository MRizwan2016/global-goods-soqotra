
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { mockInvoiceData } from "@/data/mockData";
import { QRCodeSVG } from "qrcode.react";

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

  // Calculate totals
  const totalVolume = invoice.packageDetails.reduce((sum, pkg) => sum + parseFloat(pkg.volume), 0).toFixed(3);
  const totalWeight = (parseFloat(invoice.weight) || 397.8).toFixed(2);
  
  return (
    <div 
      ref={printRef} 
      className="p-4 max-w-[210mm] mx-auto bg-white text-black text-sm"
      style={{ minHeight: '297mm' }}
    >
      {/* Header Section */}
      <div className="border border-black">
        <div className="flex p-2">
          {/* Logo section */}
          <div className="w-1/4 flex items-center justify-center">
            <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-20 w-20" />
          </div>
          
          {/* QR Code section */}
          <div className="w-1/4 flex items-center justify-center">
            <QRCodeSVG 
              value={`INVOICE:${invoice.invoiceNumber}\nDATE:${invoice.date}\nAMOUNT:${invoice.net} QAR`} 
              size={100} 
              level="M"
            />
          </div>
          
          {/* Company info section */}
          <div className="w-2/4 text-right">
            <h2 className="text-base font-bold">ALMARAAM LOGISTICS SERVICES & TRADING W.L.L</h2>
            <p className="text-xs">P.O.Box: 55861, Manthithu, Doha, Qatar</p>
            <p className="text-xs">Tele:+974 - 44832508</p>
            <p className="text-xs">Fax:+974 - 44832508</p>
            <p className="text-xs">email: ops@almaraam.com</p>
            <p className="text-xs">Print Date: {new Date().toLocaleDateString('en-GB')}</p>
            <p className="text-xs">Print by: Mohammed Rizwan</p>
            <div className="mt-1">
              <span className="font-bold text-lg">INVOICE: </span>
              <span className="font-bold text-lg">{invoice.invoiceNumber}</span>
            </div>
            <div>
              <span className="font-bold">DATE: </span>
              <span className="font-bold">{invoice.date}</span>
            </div>
          </div>
        </div>
        
        {/* Shipper/Consignee Section */}
        <div className="flex border-t border-black">
          {/* Shipper */}
          <div className="w-1/2 border-r border-black p-2">
            <div className="font-bold underline">SHIPPER:</div>
            <div>{invoice.shipper1 || "DISSANAYAKE D P C"}</div>
            <div>{invoice.shipper2 || "-"}</div>
            <div>-</div>
            <div>THUMAMA, DOHA</div>
          </div>
          
          {/* Consignee */}
          <div className="w-1/2 p-2">
            <div className="font-bold underline">CONSIGNEE:</div>
            <div>{invoice.consignee1 || "DISSANAYAKE D P C"}</div>
            <div>NO 47/2</div>
            <div>KOTADENIYA</div>
            <div>DANOWITA, SRI LANKA</div>
            <div>PASSPORT NO : {invoice.passport || "OL7449595"}</div>
          </div>
        </div>
        
        {/* Destination Info Section */}
        <div className="border-t border-black p-2 flex">
          <div className="font-bold">Destination Warehouse: {invoice.warehouse || "Colombo"}</div>
          <div className="mx-4 font-bold">(WAREHOUSE COLLECT)</div>
          <div className="ml-auto font-bold">SEACARGO</div>
        </div>
        
        {/* Cargo Table Section */}
        <div className="border-t border-black">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-16 border border-black p-1 text-center">SL</th>
                <th className="border border-black p-1 text-center">CARGO DESCRIPTION</th>
                <th className="w-12 border border-black p-1 text-center">L</th>
                <th className="w-12 border border-black p-1 text-center">W</th>
                <th className="w-12 border border-black p-1 text-center">H</th>
                <th className="w-24 border border-black p-1 text-center">CBF</th>
                <th className="w-24 border border-black p-1 text-center">CBM</th>
              </tr>
            </thead>
            <tbody>
              {invoice.packageDetails.map((pkg, index) => (
                <tr key={pkg.id}>
                  <td className="border border-black p-1 text-center">({index + 1})</td>
                  <td className="border border-black p-1">{pkg.name} (P/E)</td>
                  <td className="border border-black p-1 text-center">{pkg.length}</td>
                  <td className="border border-black p-1 text-center">{pkg.width}</td>
                  <td className="border border-black p-1 text-center">{pkg.height}</td>
                  <td className="border border-black p-1 text-right">
                    {(parseFloat(pkg.length) * parseFloat(pkg.width) * parseFloat(pkg.height) / 1000).toFixed(3)}
                  </td>
                  <td className="border border-black p-1 text-right">{pkg.volume}</td>
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
                  <td className="border border-black p-1"></td>
                </tr>
              ))}
              
              {/* Totals Row */}
              <tr>
                <td colSpan={2} className="border border-black p-1 font-bold">TOTAL</td>
                <td colSpan={3} className="border border-black p-1 text-center font-bold">WEIGHT {totalWeight} KG</td>
                <td className="border border-black p-1 text-right font-bold">VOLUME (CBM)</td>
                <td className="border border-black p-1 text-right font-bold">{totalVolume}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Footer Section */}
        <div className="border-t border-black flex">
          <div className="w-2/3 p-2 text-xs">
            <p className="uppercase font-bold">In case of dispute over any charges on this invoice please email:</p>
            <p>manager@soqotra@almaraam.com TO US WITHIN SEVEN DAYS FROM THE DATE OF INVOICE.</p>
            <p className="uppercase">Otherwise charges would be deemed as correct and payable to</p>
            <p className="uppercase">without further delay.</p>
            
            <div className="mt-4">
              <p>This invoice must be settle in full within seven days of the above date. Payment method /</p>
              <p>Bank transfer details please contact the office.</p>
              <p>If there is outstanding balance your goods will not be released from the destination port.</p>
              <p>Your goods are not insured through Thos Freight, Thos Freight accept no liability whatsoever</p>
              <p>for any damages or loss incurred during shipping. Thank you for your business.</p>
            </div>
          </div>
          
          <div className="w-1/3 border-l border-black">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="border-b border-black p-1">Freight</td>
                  <td className="border-b border-black p-1 text-right">{parseFloat(invoice.gross).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="border-b border-black p-1">Discount</td>
                  <td className="border-b border-black p-1 text-right">({parseFloat(invoice.discount).toFixed(2)})</td>
                </tr>
                <tr>
                  <td className="border-b border-black p-1 font-bold">Total</td>
                  <td className="border-b border-black p-1 text-right font-bold">{parseFloat(invoice.net).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="border-b border-black p-1 font-bold">Total Due</td>
                  <td className="border-b border-black p-1 text-right font-bold">{parseFloat(invoice.due || invoice.net).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={2} className="h-28 border-b border-black p-1">
                    <div className="h-full flex items-center justify-center">
                      <div className="border border-black p-2 w-32 text-center font-bold text-lg">
                        {invoice.paid ? "PAID" : "UNPAID"}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Print Styles - will only apply when printing */}
      <style type="text/css" media="print">
        {`
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .no-print {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default InvoicePrint;
