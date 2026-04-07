import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, Download, Share2, FileText, Ship, Package, Receipt, MessageCircle, Mail } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import SriLankaHAWB from './documents/SriLankaHAWB';
import SriLankaAirManifest from './documents/SriLankaAirManifest';
import SLPrintStyles from './components/print/SLPrintStyles';
import SLReceiptDocument from './components/print/SLReceiptDocument';
import SriLankaSeaManifestDocument from './documents/SriLankaSeaManifestDocument';
import { toast } from 'sonner';
import { SEA_FREIGHT_RATES } from './utils/sriLankaPricing';
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';

const SriLankaInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const [mode, setMode] = useState<'invoice' | 'hawb' | 'hbl' | 'air-manifest' | 'sea-manifest' | 'receipt'>('invoice');

  useEffect(() => {
    if (id) {
      console.log('Loading invoice with ID:', id);
      
      RegionalInvoiceService.getById(id).then(result => {
        if (result) {
          const inv = result.invoice;
          // Build a compatible invoiceData object for printing
          const invoice: any = {
            id: inv.id,
            invoiceNumber: inv.invoice_number,
            date: inv.invoice_date,
            cargoType: inv.cargo_type,
            jobNumber: inv.job_number,
            bookNumber: inv.book_number,
            pageNumber: inv.page_number,
            salesRepresentative: inv.sales_representative,
            driverName: inv.driver_name,
            whatsappNumber: inv.whatsapp_number,
            shipperPrefix: inv.shipper_prefix,
            shipperName: inv.shipper_name,
            shipperCountry: inv.shipper_country,
            shipperCity: inv.shipper_city,
            shipperAddress: inv.shipper_address,
            shipperMobile: inv.shipper_mobile,
            consigneePrefix: inv.consignee_prefix,
            consigneeName: inv.consignee_name,
            consigneeCountry: inv.consignee_country,
            consigneeDistrict: inv.consignee_district,
            consigneeProvince: inv.consignee_province,
            consigneeAddress: inv.consignee_address,
            consigneeMobile: inv.consignee_mobile,
            consigneeId: inv.consignee_id_number,
            serviceType: inv.service_type,
            destination: inv.destination,
            terminal: inv.terminal,
            warehouse: inv.warehouse,
            weight: String(inv.total_weight || ''),
            volume: String(inv.total_volume || ''),
            description: inv.description,
            rate: String(inv.rate || ''),
            documentsFee: String(inv.documents_fee || '0'),
            total: String(inv.net || ''),
            discount: String(inv.discount || '0'),
            packingCharges: String(inv.packing_charges || '0'),
            transportationFee: String(inv.transportation_fee || '0'),
            paymentMethod: inv.payment_method,
            paymentStatus: inv.payment_status,
            paymentDate: inv.payment_date,
            receiptNumber: inv.receipt_number,
            remarks: inv.remarks,
            packageItems: result.packages.map(p => ({
              id: p.id,
              description: p.package_name || '',
              name: p.package_name || '',
              length: String(p.length || ''),
              width: String(p.width || ''),
              height: String(p.height || ''),
              weight: String(p.weight || ''),
              volume: p.volume || String(p.cubic_metre || ''),
              quantity: p.quantity || 1,
              boxNumber: String(p.box_number || ''),
              price: p.price || 0,
              total: (p.price || 0) * (p.quantity || 1),
            })),
            pricing: {
              gross: inv.gross || 0,
              discount: inv.discount || 0,
              net: inv.net || 0,
            }
          };
          setInvoiceData(invoice);
        } else {
          // Fallback: check localStorage printInvoiceData
          const printData = localStorage.getItem('printInvoiceData');
          if (printData) {
            const parsed = JSON.parse(printData);
            if (parsed.id === id) {
              setInvoiceData(parsed);
              localStorage.removeItem('printInvoiceData');
            }
          }
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
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
      const isLandscape = mode === 'air-manifest' || mode === 'sea-manifest';
      const isA5 = mode === 'receipt';
      const pdf = new jsPDF({
        orientation: isLandscape ? 'landscape' : 'portrait',
        unit: 'mm',
        format: isA5 ? 'a5' : 'a4'
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
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

      const label = mode === 'receipt' ? 'Receipt' : mode === 'hbl' ? 'HBL' : mode === 'hawb' ? 'HAWB' : mode.includes('manifest') ? 'Manifest' : 'Invoice';
      pdf.save(`${label}-${invoiceData?.invoiceNumber || 'document'}.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  const handleEmailShare = () => {
    const d = invoiceData;
    const label = mode === 'receipt' ? 'PAYMENT RECEIPT' : mode === 'hbl' ? 'HOUSE BILL OF LADING' : mode === 'hawb' ? 'HAWB' : mode.includes('manifest') ? 'CARGO MANIFEST' : 'INVOICE';
    const subject = `${label} #${d?.invoiceNumber || 'N/A'} - SOQOTRA LOGISTICS`;
    const body = [
      label,
      `Invoice #: ${d?.invoiceNumber || 'N/A'}`,
      d?.shipper?.name ? `Shipper: ${d.shipper.name}` : '',
      d?.consignee?.name ? `Consignee: ${d.consignee.name}` : '',
      d?.pricing?.net ? `Amount: QAR ${d.pricing.net.toFixed(2)}` : '',
      '',
      'SOQOTRA LOGISTICS - Sri Lanka Operations',
    ].filter(Boolean).join('\n');
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
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
      <SLPrintStyles mode={mode} />
      {/* Toolbar */}
      <div className="max-w-4xl mx-auto mb-6 no-print">
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <span className="text-sm font-medium ml-2">Invoice #{invoiceData?.invoiceNumber || 'Loading...'}</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
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
              <button
                onClick={() => setMode("receipt")}
                className={`px-3 py-1.5 text-sm border-l ${mode === "receipt" ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"}`}
              >
                <span className="flex items-center gap-1"><Receipt className="h-3 w-3" /> Receipt</span>
              </button>
            </div>
            <Button onClick={handleDownloadPDF} variant="outline" size="sm" className="flex items-center gap-1.5">
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button onClick={handleEmailShare} variant="outline" size="sm" className="flex items-center gap-1.5">
              <Mail className="h-4 w-4" /> Email
            </Button>
            <Button onClick={handleWhatsAppShare} variant="outline" size="sm" className="flex items-center gap-1.5 text-green-600 border-green-300 hover:bg-green-50">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button onClick={handlePrint} size="sm" className="flex items-center gap-1.5">
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Document Content */}
      <div className="flex justify-center">
        <div 
          className="bg-white shadow-lg" 
          ref={printRef}
          style={mode === 'receipt' ? { width: '148mm', minHeight: '210mm' } : mode === 'air-manifest' || mode === 'sea-manifest' ? { width: '297mm', minHeight: '210mm' } : { maxWidth: '210mm', width: '100%' }}
        >
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
                          <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-14 w-auto object-contain" />
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
                    <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-12 w-auto object-contain" />
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
              <SriLankaSeaManifestDocument shipments={[invoiceData]} />
            )}
            
            {mode === 'receipt' && (
              <SLReceiptDocument invoiceData={invoiceData} />
            )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export default SriLankaInvoicePrint;