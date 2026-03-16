import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import SriLankaHAWB from './documents/SriLankaHAWB';
import SriLankaAirManifest from './documents/SriLankaAirManifest';
import { toast } from 'sonner';
import { SEA_FREIGHT_RATES } from './utils/sriLankaPricing';

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
      
      // Try localStorage first
      const storedInvoices = localStorage.getItem('sriLankaInvoices');
      let invoice: any = null;
      
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        invoice = invoices.find((inv: any) => inv.id === id);
      }
      
      // Fallback: check localStorage printInvoiceData
      if (!invoice) {
        const printData = localStorage.getItem('printInvoiceData');
        if (printData) {
          const parsed = JSON.parse(printData);
          if (parsed.id === id) {
            invoice = parsed;
            localStorage.removeItem('printInvoiceData');
          }
        }
      }
      
      console.log('Found invoice:', invoice);
      
      if (invoice) {
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
              name: `${invoice.shipperPrefix || ''} ${invoice.shipperName || ''}`.trim() || "SAMPLE SHIPPER",
              address: invoice.shipperAddress || '',
              city: invoice.shipperCity === 'CUSTOM' ? (invoice.shipperCustomCity || '') : (invoice.shipperCity || ''),
              country: invoice.shipperCountry || 'QATAR',
              mobile: invoice.shipperMobile || ""
            },
            consignee: {
              name: `${invoice.consigneePrefix || ''} ${invoice.consigneeName || ''}`.trim() || "SAMPLE CONSIGNEE",
              address: invoice.consigneeAddress || '',
              district: invoice.consigneeDistrict || '',
              province: invoice.consigneeProvince || '',
              country: invoice.consigneeCountry || 'SRI LANKA',
              mobile: invoice.consigneeMobile || "",
              idNumber: invoice.consigneeId || ""
            },
            warehouse: invoice.warehouse || 'Colombo Warehouse',
            totalWeight: parseFloat(invoice.weight || '0'),
            pricing: (() => {
              // Recalculate total from raw data to avoid stale stored values
              const volume = parseFloat(invoice.volume || '0') || 0;
              const rate = parseFloat(invoice.rate || '0') || 0;
              const docFee = parseFloat(invoice.documentsFee || '0') || 0;
              const discount = parseFloat(invoice.discount || '0') || 0;
              const packing = parseFloat(invoice.packingCharges || '0') || 0;
              const transport = parseFloat(invoice.transportationFee || '0') || 0;
              const freightCharge = invoice.serviceType === 'SEA FREIGHT' ? volume * rate : rate;
              const net = freightCharge + docFee - discount + packing + transport;
              const gross = net + discount;
              return { gross, discount, net };
            })()
          };
          
          setInvoiceData(processedInvoice);
          
          const payments = localStorage.getItem('payments');
          if (payments) {
            const paymentData = JSON.parse(payments);
            const payment = paymentData.find((p: any) => p.invoiceNumber === processedInvoice.invoiceNumber);
            setIsPaid(!!payment);
          }
          
          // Check if invoice itself is marked as paid
          if (invoice.paid || invoice.paidAmount > 0 || invoice.totalPaid > 0) {
            setIsPaid(true);
          }
      } else {
          setInvoiceData(null);
      }
    }
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    toast.info('Generating PDF...');
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Invoice-${invoiceData?.invoiceNumber || 'document'}.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  const handleWhatsAppShare = async () => {
    if (!printRef.current) return;
    toast.info('Preparing PDF for WhatsApp...');
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = 210;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
      
      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `Invoice-${invoiceData?.invoiceNumber || 'document'}.pdf`, { type: 'application/pdf' });
      
      // Try native share if available (mobile)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: `Invoice ${invoiceData?.invoiceNumber}`,
          text: `Invoice ${invoiceData?.invoiceNumber} - ${invoiceData?.consignee?.name}`,
          files: [pdfFile],
        });
        toast.success('Shared successfully');
      } else {
        // Fallback: open WhatsApp web with message
        const message = encodeURIComponent(
          `Invoice: ${invoiceData?.invoiceNumber}\nConsignee: ${invoiceData?.consignee?.name}\nAmount: QAR ${invoiceData?.pricing?.net?.toFixed(2)}\nDate: ${invoiceData?.date}`
        );
        const whatsappNumber = invoiceData?.whatsappNumber || invoiceData?.consignee?.mobile || '';
        const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
        const url = cleanNumber 
          ? `https://wa.me/${cleanNumber}?text=${message}`
          : `https://wa.me/?text=${message}`;
        window.open(url, '_blank');
        toast.success('Opening WhatsApp...');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share. Try downloading the PDF first.');
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

  if (!invoiceData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive font-medium">Invoice not found. Please save the invoice first.</p>
        <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>
    );
  }

  // Get warehouse display name
  const warehouseDisplay = (invoiceData.warehouse || 'Colombo Warehouse').replace(' Warehouse', '').replace(' UPB', '').toUpperCase();

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
                className={`px-3 py-1.5 text-sm ${mode === "invoice" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
              >
                Invoice
              </button>
              {invoiceData?.serviceType === 'AIR FREIGHT' && (
                <>
                  <button
                    onClick={() => setMode("hawb")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "hawb" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    HAWB
                  </button>
                  <button
                    onClick={() => setMode("air-manifest")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "air-manifest" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    Air Manifest
                  </button>
                </>
              )}
              {invoiceData?.serviceType === 'SEA FREIGHT' && (
                <>
                  <button
                    onClick={() => setMode("hbl")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "hbl" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    HBL
                  </button>
                  <button
                    onClick={() => setMode("sea-manifest")}
                    className={`px-3 py-1.5 text-sm border-l ${mode === "sea-manifest" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
                  >
                    Sea Manifest
                  </button>
                </>
              )}
            </div>
            <Button onClick={handleWhatsAppShare} variant="outline" className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50">
              <Share2 className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print
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
                {/* Compact Header */}
                <div className="border-b border-black">
                  <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr>
                        <td className="p-2 w-24 align-middle border-r border-black">
                          <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Soqotra Logo" className="h-14 w-auto object-contain" />
                        </td>
                        <td className="p-2 align-middle text-xs leading-tight text-center">
                          <div className="font-bold text-sm">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</div>
                          <div>NO. 3, 1ST FLOOR, BUILDING NO. 53, ZONE 55, 76 SAED AL BASHER</div>
                          <div>AZIZIA COMMERCIAL STREET, DOHA - QATAR</div>
                          <div>TEL: 44421987 - EMAIL: OPS@SOQOTRA.QA</div>
                        </td>
                        <td className="p-2 w-20 align-middle border-l border-black text-center">
                          <QRCodeSVG 
                            value={(() => {
                              const baseUrl = 'https://global-goods-soqotra.lovable.app/receipt';
                              const status = isPaid ? 'PAID' : 'UNPAID';
                              // Generate SOQ- receipt number only for paid/part-paid invoices
                              const receiptNo = isPaid ? `SOQ-${String(Math.abs(invoiceData.invoiceNumber?.replace(/\D/g, '') || Date.now()) % 1000000).padStart(6, '0')}` : '';
                              return `${baseUrl}?receipt=${encodeURIComponent(receiptNo)}&inv=${encodeURIComponent(invoiceData.invoiceNumber || '')}&date=${encodeURIComponent(invoiceData.date || '')}&customer=${encodeURIComponent(invoiceData.consignee?.name || '')}&amount=${invoiceData.pricing?.net || 0}&currency=QAR&status=${status}`;
                            })()} 
                            size={56} 
                            level="M"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="border-t border-black flex">
                    <div className="flex-1 border-r border-black p-1.5">
                      <div className="border-2 border-black px-3 py-1 inline-block font-bold text-sm">
                        {(invoiceData.warehouse || 'Colombo Warehouse').toUpperCase()}
                      </div>
                    </div>
                    <div className="p-1.5 text-right">
                      <div className="text-sm"><span className="font-bold">INVOICE: </span><span className="font-bold text-lg">{invoiceData.invoiceNumber}</span></div>
                      <div className="text-sm"><span className="font-bold">DATE: </span>{invoiceData.date}</div>
                    </div>
                  </div>
                </div>

                <div className="text-center border-b border-black py-1">
                  <span className="font-bold text-lg tracking-wider">INVOICE</span>
                </div>

                {/* Shipper/Consignee - using actual entered addresses */}
                <div className="flex border-b border-black">
                  <div className="w-1/2 border-r border-black p-2 text-sm">
                    <div className="font-bold underline mb-1">SHIPPER:</div>
                    <div>{invoiceData.shipper?.name}</div>
                    {invoiceData.shipper?.address && <div>{invoiceData.shipper.address}</div>}
                    <div>{invoiceData.shipper?.city ? `${invoiceData.shipper.city}, ` : ''}{invoiceData.shipper?.country || 'QATAR'}</div>
                    <div className="font-semibold">MOBILE: {invoiceData.shipper?.mobile}</div>
                  </div>
                  
                  <div className="w-1/2 p-2 text-sm">
                    <div className="font-bold underline mb-1">CONSIGNEE:</div>
                    <div>{invoiceData.consignee?.name}</div>
                    {invoiceData.consignee?.address && <div>{invoiceData.consignee.address}</div>}
                    <div>{invoiceData.consignee?.district ? `${invoiceData.consignee.district}, ` : ''}{invoiceData.consignee?.country || 'SRI LANKA'}</div>
                    {invoiceData.consignee?.idNumber && <div>PASSPORT NO: {invoiceData.consignee.idNumber}</div>}
                    <div className="font-semibold">MOBILE: {invoiceData.consignee?.mobile}</div>
                  </div>
                </div>

                {/* Destination */}
                <div className="border-b border-black p-2 flex text-sm">
                  <div className="font-bold">DESTINATION WAREHOUSE: {warehouseDisplay}</div>
                  <div className="mx-4 font-bold">(WAREHOUSE COLLECT)</div>
                  <div className="ml-auto font-bold">{invoiceData.serviceType === 'AIR FREIGHT' ? 'AIRCARGO' : 'SEACARGO'}</div>
                </div>

                {/* Cargo Table */}
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border border-black p-1.5 text-center w-12">S.L</th>
                      <th className="border border-black p-1.5 text-center">CARGO DESCRIPTION</th>
                      <th className="border border-black p-1.5 text-center w-14">L</th>
                      <th className="border border-black p-1.5 text-center w-14">W</th>
                      <th className="border border-black p-1.5 text-center w-14">H</th>
                      <th className="border border-black p-1.5 text-center w-16">CBF</th>
                      <th className="border border-black p-1.5 text-center w-16">CBM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.packages?.map((pkg: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-black p-1.5 text-center">{index + 1}</td>
                        <td className="border border-black p-1.5">{pkg.name || `PACKAGE ${index + 1}`}</td>
                        <td className="border border-black p-1.5 text-center">{pkg.length || ''}</td>
                        <td className="border border-black p-1.5 text-center">{pkg.width || ''}</td>
                        <td className="border border-black p-1.5 text-center">{pkg.height || ''}</td>
                        <td className="border border-black p-1.5 text-center">{((pkg.volume || 0) * 35.315).toFixed(2)}</td>
                        <td className="border border-black p-1.5 text-center">{(pkg.volume || 0).toFixed(3)}</td>
                      </tr>
                    ))}
                    {Array.from({ length: Math.max(0, 8 - (invoiceData.packages?.length || 0)) }).map((_, index) => (
                      <tr key={`empty-${index}`}>
                        <td className="border border-black p-1.5 text-center"></td>
                        <td className="border border-black p-1.5"></td>
                        <td className="border border-black p-1.5 text-center"></td>
                        <td className="border border-black p-1.5 text-center"></td>
                        <td className="border border-black p-1.5 text-center"></td>
                        <td className="border border-black p-1.5 text-center"></td>
                        <td className="border border-black p-1.5 text-center"></td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="border border-black p-1.5 text-center" colSpan={5}>
                        TOTAL WEIGHT: {invoiceData.totalWeight || 0} KG
                      </td>
                      <td className="border border-black p-1.5 text-center">
                        {((invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0) * 35.315).toFixed(2)}
                      </td>
                      <td className="border border-black p-1.5 text-center">
                        {(invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0).toFixed(3)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Footer */}
                <div className="flex border-t border-black">
                  <div className="w-1/2 border-r border-black p-2">
                    <div className="text-[7px] leading-tight space-y-1">
                      <div className="font-bold text-[8px]">CARGO TRACKING - PLEASE VISIT: HTTPS://WWW.TRICOGLOBAL.COM/TRACK</div>
                      <div className="font-bold text-[8px]">GLOBAL WHATSUP NUMBER: +94765002222 - SEND A MESSAGE TO OBTAIN AN APPOINTMENT FOR THE CUSTOMS CLEARANCE.</div>
                      <div className="font-bold mt-1 text-[8px]">SHIPPER DECLARATION:-</div>
                      <div>1/WE HEREBY DECLARE THAT THE CONTENTS OF THIS CONSIGNMENT ARE FULLY AND ACCURATELY DESCRIBED, AND THE PARCEL DOESN'T CONTAIN ILLEGAL ITEMS, CASH, JEWELRY OR DANGEROUS GOODS.</div>
                      <div>PERISHABLE & BREAKABLE ITEMS SHIPPED AT MY OWN RISK. SOQOTRA LOGISTICS ISN'T LIABLE FOR ANY LOSE FROM BREAKABLE OR UNDECLARED ITEMS.</div>
                      <div>SHIPPER / CONSIGNEE RESPONSIBLE FOR DESTINATION CHARGES. I UNDERSTAND THAT THE DELIVERY TIME IS JUST AN INDICATOR IT MAY CHANGE.</div>
                      <div>STORAGE CHARGES APPLICABLE AFTER 10 DAYS. I UNDERSTAND TO COMPLY WITH THE ABOVE-MENTIONED TERMS & CONDITIONS.</div>
                    </div>
                    <div className="mt-6 text-center">
                      <div className="font-bold text-sm">CUSTOMER SIGNATURE</div>
                      <div className="border-t border-black mt-8 pt-2 text-xs">DATE & SIGNATURE</div>
                    </div>
                  </div>
                  
                  <div className="w-1/2 p-2">
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td className="border border-black p-1.5 font-bold">GROSS:</td>
                          <td className="border border-black p-1.5 text-right">{(invoiceData.pricing?.gross || 0).toFixed(2)} QAR</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 font-bold">DISCOUNT:</td>
                          <td className="border border-black p-1.5 text-right">{(invoiceData.pricing?.discount || 0).toFixed(2)} QAR</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 font-bold">NET:</td>
                          <td className="border border-black p-1.5 text-right font-bold">{(invoiceData.pricing?.net || 0).toFixed(2)} QAR</td>
                        </tr>
                        <tr>
                          <td className="border border-black p-1.5 font-bold">PAYMENT STATUS:</td>
                          <td className={`border border-black p-1.5 text-right font-bold ${isPaid || invoiceData.paymentStatus === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                            {isPaid || invoiceData.paymentStatus === 'PAID' ? 'PAID' : 'UNPAID'}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <div className="mt-6 text-center">
                      <div className="font-bold text-sm">AUTHORIZED SIGNATURE</div>
                      <div className="border-t border-black mt-8 pt-2 text-xs">SOQOTRA LOGISTICS</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {mode === 'hawb' && invoiceData?.serviceType === 'AIR FREIGHT' && (
              <SriLankaHAWB invoiceData={invoiceData} onPrint={handlePrint} />
            )}
            
            {mode === 'hbl' && invoiceData?.serviceType === 'SEA FREIGHT' && (
              <div className="border border-black p-6">
                {/* HBL Header */}
                <div className="border-b-2 border-black pb-3 mb-4">
                  <div className="flex items-center justify-between">
                    <img src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" alt="Soqotra Logo" className="h-12 w-auto object-contain" />
                    <div className="text-center flex-1">
                      <div className="text-xs font-semibold">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</div>
                      <h1 className="text-xl font-bold mt-1">HOUSE BILL OF LADING (HBL)</h1>
                      <div className="text-xs">NOT NEGOTIABLE UNLESS CONSIGNED TO ORDER</div>
                    </div>
                    <QRCodeSVG value={`HBL:${invoiceData.invoiceNumber}-HBL`} size={48} level="M" />
                  </div>
                </div>

                <div className="text-right mb-3 text-sm">
                  <div className="font-bold">BL NUMBER: {invoiceData.invoiceNumber}-HBL</div>
                  <div>DATE: {invoiceData.date}</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1 border-b border-gray-400 pb-1">SHIPPER</h3>
                    <div className="text-sm">
                      <div>{invoiceData.shipper?.name}</div>
                      {invoiceData.shipper?.address && <div>{invoiceData.shipper.address}</div>}
                      <div>{invoiceData.shipper?.city ? `${invoiceData.shipper.city}, ` : ''}{invoiceData.shipper?.country}</div>
                      <div>TEL: {invoiceData.shipper?.mobile}</div>
                    </div>
                  </div>
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1 border-b border-gray-400 pb-1">CONSIGNEE</h3>
                    <div className="text-sm">
                      <div>{invoiceData.consignee?.name}</div>
                      {invoiceData.consignee?.address && <div>{invoiceData.consignee.address}</div>}
                      <div>{invoiceData.consignee?.district ? `${invoiceData.consignee.district}, ` : ''}{invoiceData.consignee?.country}</div>
                      {invoiceData.consignee?.idNumber && <div>PASSPORT NO: {invoiceData.consignee.idNumber}</div>}
                      <div>TEL: {invoiceData.consignee?.mobile}</div>
                    </div>
                  </div>
                </div>

                <div className="border border-black p-2 mb-3">
                  <h3 className="font-bold text-sm mb-1">NOTIFY PARTY</h3>
                  <div className="text-sm">SAME AS CONSIGNEE</div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1">PORT OF LOADING</h3>
                    <div className="text-sm">HAMAD PORT, DOHA, QATAR</div>
                  </div>
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1">PORT OF DISCHARGE</h3>
                    <div className="text-sm">{warehouseDisplay}, SRI LANKA</div>
                  </div>
                </div>

                <table className="w-full border-collapse mb-3 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-black p-1.5">MARKS & NUMBERS</th>
                      <th className="border border-black p-1.5">DESCRIPTION OF GOODS</th>
                      <th className="border border-black p-1.5 w-20">NO. OF PKGS</th>
                      <th className="border border-black p-1.5 w-20">WEIGHT (KG)</th>
                      <th className="border border-black p-1.5 w-20">VOLUME (CBM)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-1.5 align-top">AS ADDRESSED</td>
                      <td className="border border-black p-1.5 align-top">
                        {invoiceData.packages?.map((pkg: any, i: number) => (
                          <div key={i}>{pkg.name}</div>
                        ))}
                        <div className="mt-1 font-semibold">SAID TO CONTAIN USED PERSONAL EFFECTS</div>
                      </td>
                      <td className="border border-black p-1.5 text-center align-top">{invoiceData.packages?.length || 0}</td>
                      <td className="border border-black p-1.5 text-center align-top">{invoiceData.totalWeight || 0}</td>
                      <td className="border border-black p-1.5 text-center align-top">
                        {(invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0).toFixed(3)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1">FREIGHT DETAILS</h3>
                    <div className="text-sm">FREIGHT {invoiceData.paymentStatus === 'PAID' ? 'PREPAID' : 'COLLECT'}</div>
                  </div>
                  <div className="border border-black p-2">
                    <h3 className="font-bold text-sm mb-1">DECLARATION</h3>
                    <div className="text-sm">SHIPPER'S LOAD, COUNT & SEAL</div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <div className="font-bold text-sm">FOR THE CARRIER</div>
                    <div className="h-12"></div>
                    <div className="border-t border-black pt-1 text-sm">AUTHORIZED SIGNATURE</div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">DATE OF ISSUE</div>
                    <div className="text-sm mt-1">{invoiceData.date}</div>
                    <div className="font-bold text-sm mt-3">PLACE OF ISSUE</div>
                    <div className="text-sm">DOHA, QATAR</div>
                  </div>
                </div>
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