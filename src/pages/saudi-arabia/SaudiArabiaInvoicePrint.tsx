import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, FileText, Ship, Package, Receipt, MessageCircle, Download, Mail } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner';
import SAPrintStyles from './components/print/SAPrintStyles';
import SAInvoiceDocument from './components/print/SAInvoiceDocument';
import SAHBLDocument from './components/print/SAHBLDocument';
import SACargoManifestDocument from './components/print/SACargoManifestDocument';
import SAReceiptDocument from './components/print/SAReceiptDocument';
import { RegionalInvoiceService } from '@/services/RegionalInvoiceService';

type PrintMode = "invoice" | "hbl" | "manifest" | "receipt";

const SaudiArabiaInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [allInvoices, setAllInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<PrintMode>("invoice");

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    const load = async () => {
      try {
        const result = await RegionalInvoiceService.getById(id);
        if (result) {
          const { invoice: inv, packages: pkgs } = result;
          const mapped = {
            id: inv.id,
            invoiceNumber: inv.invoice_number,
            invoiceDate: inv.invoice_date,
            jobNumber: inv.job_number,
            bookNumber: inv.book_number,
            pageNumber: inv.page_number,
            shipperName: inv.shipper_name,
            shipperPrefix: inv.shipper_prefix,
            shipperAddress: inv.shipper_address,
            shipperCity: inv.shipper_city,
            shipperMobile: inv.shipper_mobile,
            shipperEmail: inv.shipper_email,
            shipperIdNumber: inv.shipper_id_number,
            consigneeName: inv.consignee_name,
            consigneePrefix: inv.consignee_prefix,
            consigneeAddress: inv.consignee_address,
            consigneeCity: inv.consignee_city,
            consigneeDistrict: inv.consignee_district,
            consigneeProvince: inv.consignee_province,
            consigneeMobile: inv.consignee_mobile,
            consigneeLandline: inv.consignee_landline,
            consigneeEmail: inv.consignee_email,
            consigneeIdNumber: inv.consignee_id_number,
            consigneeDeliveryAddress: inv.consignee_delivery_address,
            salesRep: inv.sales_representative,
            driverName: inv.driver_name,
            whatsappNumber: inv.whatsapp_number,
            destination: inv.destination,
            warehouse: inv.warehouse,
            sector: inv.sector,
            port: inv.port,
            district: inv.district,
            doorToDoor: inv.door_to_door,
            serviceType: inv.service_type,
            cargoType: inv.cargo_type,
            totalPackages: inv.total_packages,
            totalWeight: inv.total_weight,
            totalVolume: inv.total_volume,
            description: inv.description,
            rate: inv.rate,
            freight: inv.freight,
            documentsFee: inv.documents_fee,
            localTransport: inv.local_transport,
            destinationTransport: inv.destination_transport,
            packing: inv.packing_charges,
            storage: inv.storage,
            destinationClearing: inv.destination_clearing,
            destinationDoorDelivery: inv.destination_door_delivery,
            transportationFee: inv.transportation_fee,
            other: inv.other,
            gross: inv.gross,
            discount: inv.discount,
            net: inv.net,
            paymentMethod: inv.payment_method,
            paymentStatus: inv.payment_status,
            paymentDate: inv.payment_date,
            receiptNumber: inv.receipt_number,
            status: inv.status,
            remarks: inv.remarks,
            packages: pkgs.map(p => ({
              id: p.id,
              name: p.package_name || 'CARTON BOX',
              length: p.length || 0,
              width: p.width || 0,
              height: p.height || 0,
              weight: p.weight || 0,
              quantity: p.quantity || 1,
              cubicMetre: p.cubic_metre || 0,
              cubicFeet: p.cubic_feet || 0,
              volume: p.volume || '0',
              boxNumber: p.box_number,
              price: p.price || 0,
            })),
          };
          setInvoiceData(mapped);
        }
        // Load all SA invoices for manifest
        const allRows = await RegionalInvoiceService.getByCountry('Saudi Arabia');
        setAllInvoices(allRows.map(r => ({
          id: r.id,
          invoiceNumber: r.invoice_number,
          shipperName: r.shipper_name,
          consigneeName: r.consignee_name,
          net: r.net,
          totalWeight: r.total_weight,
          totalVolume: r.total_volume,
          totalPackages: r.total_packages,
        })));
      } catch (e) {
        console.error('Error loading invoice for print:', e);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handlePrint = () => { window.print(); };
  const handleBack = () => {
    if (location.state?.from) navigate(location.state.from);
    else navigate('/saudi-arabia');
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-pulse text-lg">Loading...</div></div>;
  if (!invoiceData) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p className="text-destructive font-medium">Invoice not found.</p>
      <Button variant="outline" onClick={handleBack}><ArrowLeft className="h-4 w-4 mr-2" />Go Back</Button>
    </div>
  );

  const modes: { key: PrintMode; label: string; icon: React.ReactNode; size: string }[] = [
    { key: "invoice", label: "Invoice", icon: <FileText className="h-4 w-4" />, size: "A4" },
    { key: "hbl", label: "HBL", icon: <Ship className="h-4 w-4" />, size: "A4" },
    { key: "manifest", label: "Cargo Manifest", icon: <Package className="h-4 w-4" />, size: "A4 Landscape" },
    { key: "receipt", label: "Receipt", icon: <Receipt className="h-4 w-4" />, size: "A5" },
  ];

  const getContainerStyle = (): React.CSSProperties => {
    if (mode === "manifest") return { width: "297mm", minHeight: "210mm" };
    if (mode === "receipt") return { width: "148mm", minHeight: "210mm" };
    return { width: "210mm", minHeight: "297mm" };
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    try {
      toast.loading("Generating PDF...", { id: "pdf" });
      const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const isLandscape = mode === "manifest";
      const isA5 = mode === "receipt";
      const pdf = new jsPDF({ orientation: isLandscape ? 'landscape' : 'portrait', unit: 'mm', format: isA5 ? 'a5' : 'a4' });
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
      const label = mode === "receipt" ? "Receipt" : mode === "hbl" ? "HBL" : mode === "manifest" ? "Manifest" : "Invoice";
      pdf.save(`${label}-${invoiceData.invoiceNumber}.pdf`);
      toast.success("PDF downloaded", { id: "pdf" });
    } catch { toast.error("Failed to generate PDF", { id: "pdf" }); }
  };

  const handleWhatsApp = () => {
    const d = invoiceData;
    const label = mode === "receipt" ? "PAYMENT RECEIPT" : mode === "hbl" ? "HOUSE BILL OF LADING" : mode === "manifest" ? "CARGO MANIFEST" : "INVOICE";
    const pkgLines = (d.packages || []).map((p: any, i: number) =>
      `  ${i+1}. ${p.name} (${p.length}x${p.width}x${p.height}) Wt:${p.weight}kg Vol:${(parseFloat(p.cubicMetre || p.volume) || 0).toFixed(3)} CBM`
    ).join('\n');
    const message = [
      `📄 *${label} - SOQOTRA SOLUTIONS WLL*`,
      `━━━━━━━━━━━━━━━`,
      `Invoice #: ${d.invoiceNumber || 'N/A'}`,
      d.bookNumber ? `Book #: ${d.bookNumber}` : '',
      d.pageNumber ? `Page #: ${d.pageNumber}` : '',
      `Date: ${d.invoiceDate || 'N/A'}`,
      `━━━━━━━━━━━━━━━`,
      d.shipperName ? `*Shipper:* ${d.shipperName}` : '',
      d.shipperMobile ? `Mobile: ${d.shipperMobile}` : '',
      d.consigneeName ? `*Consignee:* ${d.consigneeName}` : '',
      d.consigneeMobile ? `Mobile: ${d.consigneeMobile}` : '',
      d.consigneeAddress ? `Address: ${d.consigneeAddress}` : '',
      `━━━━━━━━━━━━━━━`,
      `*CARGO DETAILS:*`,
      pkgLines || '  No packages',
      `━━━━━━━━━━━━━━━`,
      `Total Weight: ${d.totalWeight || 0} KG`,
      `Total Volume: ${d.totalVolume || 0} CBM`,
      `Total Packages: ${d.totalPackages || 0}`,
      `━━━━━━━━━━━━━━━`,
      `Freight: SAR ${(d.freight || 0).toFixed(2)}`,
      `Discount: SAR ${(d.discount || 0).toFixed(2)}`,
      `*Total: SAR ${(d.net || 0).toFixed(2)}*`,
      `Payment: ${d.paymentStatus || 'UNPAID'}`,
      `━━━━━━━━━━━━━━━`,
      `SOQOTRA SOLUTIONS WLL - Saudi Arabia`,
    ].filter(Boolean).join('\n');
    const target = d.whatsappNumber || d.shipperMobile || '';
    const phone = target.replace(/[^0-9+]/g, '');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    const d = invoiceData;
    const label = mode === "receipt" ? "PAYMENT RECEIPT" : mode === "hbl" ? "HOUSE BILL OF LADING" : mode === "manifest" ? "CARGO MANIFEST" : "INVOICE";
    const subject = `${label} #${d.invoiceNumber || 'N/A'} - SOQOTRA SOLUTIONS WLL`;
    const body = [
      label,
      `Invoice #: ${d.invoiceNumber || 'N/A'}`,
      d.shipperName ? `Shipper: ${d.shipperName}` : '',
      d.consigneeName ? `Consignee: ${d.consigneeName}` : '',
      d.net ? `Amount: SAR ${Number(d.net).toFixed(2)}` : '',
      '', 'SOQOTRA SOLUTIONS WLL - Saudi Arabia',
    ].filter(Boolean).join('\n');
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_self');
  };

  return (
    <div className="min-h-screen bg-muted/40 sa-print-container">
      <SAPrintStyles mode={mode} />
      <div className="sa-print-toolbar sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleBack}><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button>
            <span className="text-sm font-medium text-muted-foreground">Invoice #{invoiceData.invoiceNumber}</span>
          </div>
          <div className="flex items-center gap-1">
            {modes.map(m => (
              <Button key={m.key} variant={mode === m.key ? "default" : "outline"} size="sm" onClick={() => setMode(m.key)} className="gap-1.5">
                {m.icon}<span className="hidden md:inline">{m.label}</span><span className="text-[10px] opacity-70">({m.size})</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleDownloadPDF} className="gap-1.5"><Download className="h-4 w-4" /> PDF</Button>
            <Button size="sm" variant="outline" onClick={handleEmail} className="gap-1.5"><Mail className="h-4 w-4" /> Email</Button>
            <Button size="sm" variant="outline" onClick={handleWhatsApp} className="gap-1.5 text-green-600 border-green-300 hover:bg-green-50"><MessageCircle className="h-4 w-4" /> WhatsApp</Button>
            <Button size="sm" onClick={handlePrint} className="gap-1.5"><Printer className="h-4 w-4" /> Print</Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-6 print:p-0">
        <div ref={printRef} id="sa-print-content" className="bg-white shadow-lg print:shadow-none mx-auto" style={getContainerStyle()}>
          {mode === "invoice" && <SAInvoiceDocument invoiceData={invoiceData} />}
          {mode === "hbl" && <SAHBLDocument invoiceData={invoiceData} />}
          {mode === "manifest" && <SACargoManifestDocument invoiceData={invoiceData} allInvoices={allInvoices} />}
          {mode === "receipt" && <SAReceiptDocument invoiceData={invoiceData} />}
        </div>
      </div>
    </div>
  );
};

export default SaudiArabiaInvoicePrint;
