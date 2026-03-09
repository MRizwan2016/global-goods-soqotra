import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import SriLankaHAWB from './documents/SriLankaHAWB';
import SriLankaAirManifest from './documents/SriLankaAirManifest';
import { toast } from 'sonner';

const SriLankaInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [mode, setMode] = useState<'invoice' | 'hawb' | 'hbl' | 'air-manifest' | 'sea-manifest'>('invoice');

  useEffect(() => {
    if (id) {
      console.log('Loading invoice with ID:', id);
      const storedInvoices = localStorage.getItem('sriLankaInvoices');
      console.log('Stored invoices:', storedInvoices);
      
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const invoice = invoices.find((inv: any) => inv.id === id);
        console.log('Found invoice:', invoice);
        
        if (invoice) {
          // Ensure proper data structure for printing
          const processedInvoice = {
            ...invoice,
            packages: invoice.packageItems?.map((pkg: any) => ({
              id: pkg.id,
              name: pkg.name || pkg.description || "PACKAGE",
              length: parseFloat(pkg.length || '0'),
              width: parseFloat(pkg.width || '0'),
              height: parseFloat(pkg.height || '0'),
              volume: parseFloat(pkg.volume || '0') || ((parseFloat(pkg.length || '0') * parseFloat(pkg.width || '0') * parseFloat(pkg.height || '0')) / 1000000)
            })) || [],
            shipper: {
              name: invoice.shipperName || "SAMPLE SHIPPER",
              address: `${invoice.shipperCity || 'DOHA'}, ${invoice.shipperCountry || 'QATAR'}`,
              mobile: invoice.shipperMobile || "+974 1234 5678"
            },
            consignee: {
              name: invoice.consigneeName || "SAMPLE CONSIGNEE", 
              address: `${invoice.consigneeAddress || 'NO 47/2'}, ${invoice.consigneeDistrict || 'COLOMBO'}, SRI LANKA`,
              mobile: invoice.consigneeMobile || "+94 77 123 4567",
              idNumber: invoice.consigneeId || "123456789V"
            },
            totalWeight: parseFloat(invoice.weight || '0'),
            pricing: {
              gross: parseFloat(invoice.rate || '0') + parseFloat(invoice.documentsFee || '0'),
              discount: 0,
              net: parseFloat(invoice.total || '0')
            }
          };
          
          setInvoiceData(processedInvoice);
          
          // Check payment status
          const payments = localStorage.getItem('payments');
          if (payments) {
            const paymentData = JSON.parse(payments);
            const payment = paymentData.find((p: any) => p.invoiceNumber === processedInvoice.invoiceNumber);
            setIsPaid(!!payment);
          }
        } else {
          console.log('Invoice not found, using fallback data');
          // Fallback data
          setInvoiceData({
            id: id,
            invoiceNumber: `SL${Date.now()}`,
            date: new Date().toLocaleDateString('en-GB'),
            serviceType: 'SEA FREIGHT',
            shipper: {
              name: "SAMPLE SHIPPER",
              address: "DOHA, QATAR",
              mobile: "+974 1234 5678"
            },
            consignee: {
              name: "SAMPLE CONSIGNEE",
              address: "COLOMBO, SRI LANKA", 
              mobile: "+94 77 123 4567",
              idNumber: "123456789V"
            },
            packages: [
              { id: 1, name: "SAMPLE PACKAGE", length: 50, width: 40, height: 30, volume: 0.06 }
            ],
            totalWeight: 25,
            pricing: {
              gross: 500,
              discount: 50,
              net: 450
            }
          });
        }
      } else {
        console.log('No stored invoices found');
        setInvoiceData(null);
      }
    }
    setLoading(false);
  }, [id]);

  const getCompanyName = (shipperCountry: string) => {
    switch(shipperCountry?.toLowerCase()) {
      case 'qatar':
      case 'doha':
        return 'SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL';
      case 'saudi arabia':
      case 'riyadh':
        return 'SOQOTRA LOGISTICS SERVICES KSA';
      default:
        return 'SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL';
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printRef.current) {
      const printContent = printRef.current.innerHTML;
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Invoice</title>
            <style>
              body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif; 
                font-size: 12px;
                line-height: 1.4;
              }
              .print-container { 
                max-width: 800px; 
                margin: 0 auto; 
                background: white;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
              }
              th, td { 
                border: 1px solid #000; 
                padding: 8px; 
                text-align: left; 
              }
              .font-bold { font-weight: bold; }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
              .border-t { border-top: 1px solid #000; }
              .border-r { border-right: 1px solid #000; }
              .border-b { border-bottom: 1px solid #000; }
              .underline { text-decoration: underline; }
              .flex { display: flex; }
              .w-1\\/2 { width: 50%; }
              .w-1\\/4 { width: 25%; }
              .w-2\\/4 { width: 50%; }
              .p-2 { padding: 8px; }
              .mt-1 { margin-top: 4px; }
              .mb-1 { margin-bottom: 4px; }
              .text-lg { font-size: 16px; }
              .text-base { font-size: 14px; }
              .text-sm { font-size: 12px; }
              .text-xs { font-size: 10px; }
              img { max-width: 100%; height: auto; }
              @media print {
                body { margin: 0; padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              ${printContent}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate(`/sri-lanka/invoice/edit/${id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Toolbar */}
      <div className="max-w-4xl mx-auto mb-6 no-print">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-sm font-medium ml-2">Invoice #{invoiceData?.invoiceNumber || 'Loading...'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <button
                onClick={() => setMode("invoice")}
                className={`px-3 py-1.5 text-sm ${mode === "invoice" ? "bg-gray-100" : "hover:bg-gray-50"}`}
              >
                Invoice
              </button>
              {invoiceData?.serviceType === 'AIR FREIGHT' && (
                <>
                  <button
                    onClick={() => setMode("hawb")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "hawb" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    HAWB
                  </button>
                  <button
                    onClick={() => setMode("air-manifest")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "air-manifest" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Air Manifest
                  </button>
                </>
              )}
              {invoiceData?.serviceType === 'SEA FREIGHT' && (
                <>
                  <button
                    onClick={() => setMode("hbl")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "hbl" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    HBL
                  </button>
                  <button
                    onClick={() => setMode("sea-manifest")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "sea-manifest" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                  >
                    Sea Manifest
                  </button>
                </>
              )}
            </div>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Document
            </Button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg" ref={printRef}>
        {invoiceData && (
          <>
            {mode === 'invoice' && (
              <div className="border border-black">
                {/* Header */}
                <div className="flex p-2 border-b border-gray-300">
                  <div className="w-1/4 flex items-center justify-center">
                    <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Soqotra Logo" className="h-24 w-32 object-contain" />
                  </div>
              
              <div className="w-1/4 flex items-center justify-center">
                <QRCodeSVG 
                  value={`INVOICE:${invoiceData.invoiceNumber}\nDATE:${invoiceData.date}\nAMOUNT:${invoiceData.pricing?.net || 0} QAR`} 
                  size={100} 
                  level="M"
                />
              </div>
              
              <div className="w-2/4 text-right">
                <h2 className="text-base font-bold">{getCompanyName(invoiceData.shipper?.address || '')}</h2>
                <p className="text-xs">Office No. 3, 1st Floor, Zone 55, Building No.53, Street No.76,</p>
                <p className="text-xs">Azizia Commercial Street, P.O.Box: 55861, Azizia - Qatar</p>
                <p className="text-xs">Tele:+974 - 44832508</p>
                <p className="text-xs">email: accounts@soqotralogistics.com</p>
                <p className="text-xs">Print Date: {new Date().toLocaleDateString('en-GB')}</p>
                <p className="text-xs">Print by: Mohammed Rizwan</p>
                <div className="mt-1">
                  <span className="font-bold text-lg">INVOICE: </span>
                  <span className="font-bold text-lg">{invoiceData.invoiceNumber}</span>
                </div>
                <div>
                  <span className="font-bold">DATE: </span>
                  <span className="font-bold">{invoiceData.date}</span>
                </div>
              </div>
            </div>

            {/* Shipper/Consignee */}
            <div className="flex border-t border-black">
              <div className="w-1/2 border-r border-black p-2">
                <div className="font-bold underline">SHIPPER:</div>
                <div>{invoiceData.shipper?.name || "SAMPLE SHIPPER"}</div>
                <div>-</div>
                <div>-</div>
                <div>THUMAMA, DOHA</div>
                <div className="mt-1 font-semibold">Mobile: {invoiceData.shipper?.mobile || "+974 1234 5678"}</div>
              </div>
              
              <div className="w-1/2 p-2">
                <div className="font-bold underline">CONSIGNEE:</div>
                <div>{invoiceData.consignee?.name || "SAMPLE CONSIGNEE"}</div>
                <div>NO 47/2</div>
                <div>KOTADENIYA</div>
                <div>DANOWITA, SRI LANKA</div>
                <div>PASSPORT NO : {invoiceData.consignee?.idNumber || "OL7449595"}</div>
                <div className="mt-1 font-semibold">Mobile: {invoiceData.consignee?.mobile || "+94 77 123 4567"}</div>
              </div>
            </div>

            {/* Destination */}
            <div className="border-t border-black p-2 flex">
              <div className="font-bold">Destination Warehouse: Colombo</div>
              <div className="mx-4 font-bold">(WAREHOUSE COLLECT)</div>
              <div className="ml-auto font-bold">SEACARGO</div>
            </div>

            {/* Cargo Table */}
            <table className="w-full border-t border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-center w-16">S.L</th>
                  <th className="border border-black p-2 text-center">CARGO DESCRIPTION</th>
                  <th className="border border-black p-2 text-center w-16">L</th>
                  <th className="border border-black p-2 text-center w-16">W</th>
                  <th className="border border-black p-2 text-center w-16">H</th>
                  <th className="border border-black p-2 text-center w-20">CBF</th>
                  <th className="border border-black p-2 text-center w-20">CBM</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.packages?.map((pkg: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center">{index + 1}</td>
                    <td className="border border-black p-2">{pkg.name || `PACKAGE ${index + 1}`}</td>
                    <td className="border border-black p-2 text-center">{pkg.length || 50}</td>
                    <td className="border border-black p-2 text-center">{pkg.width || 40}</td>
                    <td className="border border-black p-2 text-center">{pkg.height || 30}</td>
                    <td className="border border-black p-2 text-center">{((pkg.volume || 0.06) * 35.315).toFixed(2)}</td>
                    <td className="border border-black p-2 text-center">{(pkg.volume || 0.06).toFixed(3)}</td>
                  </tr>
                ))}
                {/* Empty rows for consistent layout */}
                {Array.from({ length: Math.max(0, 10 - (invoiceData.packages?.length || 0)) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="border border-black p-2 text-center"></td>
                    <td className="border border-black p-2"></td>
                    <td className="border border-black p-2 text-center"></td>
                    <td className="border border-black p-2 text-center"></td>
                    <td className="border border-black p-2 text-center"></td>
                    <td className="border border-black p-2 text-center"></td>
                    <td className="border border-black p-2 text-center"></td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td className="border border-black p-2 text-center" colSpan={5}>
                    TOTAL WEIGHT: {invoiceData.totalWeight || 25} KG
                  </td>
                  <td className="border border-black p-2 text-center">
                    {((invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0.06) * 35.315).toFixed(2)}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {(invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0.06).toFixed(3)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div className="flex border-t border-black">
              <div className="w-1/2 border-r border-black p-2">
                <div className="font-bold mb-2">CONDITIONS:</div>
                <div className="text-xs space-y-1">
                  <div>1. Any disputes must be reported within 24 hours of delivery.</div>
                  <div>2. Payment terms: Net 30 days from invoice date.</div>
                  <div>3. Late payment charges apply after due date.</div>
                  <div>4. Company not liable for damages beyond service charges.</div>
                  <div>5. All packages subject to customs inspection.</div>
                </div>
                <div className="mt-4 text-center">
                  <div className="font-bold">CUSTOMER SIGNATURE</div>
                  <div className="border-t border-black mt-8 pt-2">DATE & SIGNATURE</div>
                </div>
              </div>
              
              <div className="w-1/2 p-2">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="border border-black p-2 font-bold">GROSS:</td>
                      <td className="border border-black p-2 text-right">{(invoiceData.pricing?.gross || 0).toFixed(2)} QAR</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold">DISCOUNT:</td>
                      <td className="border border-black p-2 text-right">{(invoiceData.pricing?.discount || 0).toFixed(2)} QAR</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold">NET:</td>
                      <td className="border border-black p-2 text-right font-bold">{(invoiceData.pricing?.net || 0).toFixed(2)} QAR</td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2 font-bold">PAYMENT STATUS:</td>
                      <td className={`border border-black p-2 text-right font-bold ${isPaid ? 'text-green-600' : 'text-red-600'}`}>
                        {isPaid ? 'PAID' : 'UNPAID'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-4 text-center">
                  <div className="font-bold">AUTHORIZED SIGNATURE</div>
                  <div className="border-t border-black mt-8 pt-2">SOQOTRA LOGISTICS</div>
                </div>
              </div>
            </div>
            </div>
            )}
            
            {mode === 'hawb' && invoiceData?.serviceType === 'AIR FREIGHT' && (
              <SriLankaHAWB invoiceData={invoiceData} onPrint={handlePrint} />
            )}
            
            {mode === 'hbl' && invoiceData?.serviceType === 'SEA FREIGHT' && (
              <div className="p-8 text-center text-gray-500">
                <h2 className="text-2xl font-bold mb-4">House Bill of Lading (HBL)</h2>
                <p>HBL Document - Coming Soon</p>
              </div>
            )}
            
            {mode === 'air-manifest' && invoiceData?.serviceType === 'AIR FREIGHT' && (
              <SriLankaAirManifest shipments={[invoiceData]} flightInfo={invoiceData} />
            )}
            
            {mode === 'sea-manifest' && invoiceData?.serviceType === 'SEA FREIGHT' && (
              <div className="p-8 text-center text-gray-500">
                <h2 className="text-2xl font-bold mb-4">Sea Freight Manifest</h2>
                <p>Sea Manifest Document - Coming Soon</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SriLankaInvoicePrint;