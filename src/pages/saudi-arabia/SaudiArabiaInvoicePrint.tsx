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
    if (id) {
      const storedInvoices = localStorage.getItem('saudiArabiaInvoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        setAllInvoices(invoices);
        const invoice = invoices.find((inv: any) => inv.id === id);
        if (invoice) {
          setInvoiceData(invoice);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate('/saudi-arabia');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!invoiceData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive font-medium">Invoice not found.</p>
        <Button variant="outline" onClick={handleBack}><ArrowLeft className="h-4 w-4 mr-2" />Go Back</Button>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-muted/40 sa-print-container">
      <SAPrintStyles mode={mode} />

      {/* Toolbar - hidden during print */}
      <div className="sa-print-toolbar sticky top-0 z-50 bg-background border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              Invoice #{invoiceData.invoiceNumber}
            </span>
          </div>

          {/* Mode Buttons */}
          <div className="flex items-center gap-1">
            {modes.map(m => (
              <Button
                key={m.key}
                variant={mode === m.key ? "default" : "outline"}
                size="sm"
                onClick={() => setMode(m.key)}
                className="gap-1.5"
              >
                {m.icon}
                <span className="hidden md:inline">{m.label}</span>
                <span className="text-[10px] opacity-70">({m.size})</span>
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={async () => {
              if (!printRef.current) return;
              try {
                toast.loading("Generating PDF...", { id: "pdf" });
                const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
                const imgData = canvas.toDataURL('image/jpeg', 1.0);
                const isLandscape = mode === "manifest";
                const isA5 = mode === "receipt";
                const pdf = new jsPDF({
                  orientation: isLandscape ? 'landscape' : 'portrait',
                  unit: 'mm',
                  format: isA5 ? 'a5' : 'a4'
                });
                const pdfW = pdf.internal.pageSize.getWidth();
                const pdfH = (canvas.height * pdfW) / canvas.width;
                pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
                const label = mode === "receipt" ? "Receipt" : mode === "hbl" ? "HBL" : mode === "manifest" ? "Manifest" : "Invoice";
                pdf.save(`${label}-${invoiceData.invoiceNumber}.pdf`);
                toast.success("PDF downloaded", { id: "pdf" });
              } catch {
                toast.error("Failed to generate PDF", { id: "pdf" });
              }
            }} className="gap-1.5">
              <Download className="h-4 w-4" /> PDF
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              const d = invoiceData;
              const label = mode === "receipt" ? "PAYMENT RECEIPT" : mode === "hbl" ? "HOUSE BILL OF LADING" : mode === "manifest" ? "CARGO MANIFEST" : "INVOICE";
              const message = [
                `📄 *${label}*`,
                `━━━━━━━━━━━━━━━`,
                `Invoice #: ${d.invoiceNumber || 'N/A'}`,
                d.shipperName ? `Shipper: ${d.shipperName}` : '',
                d.consigneeName ? `Consignee: ${d.consigneeName}` : '',
                d.totalAmount ? `Amount: SAR ${Number(d.totalAmount).toFixed(2)}` : '',
                `━━━━━━━━━━━━━━━`,
                `SOQOTRA LOGISTICS - Saudi Arabia`,
              ].filter(Boolean).join('\n');
              window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
            }} className="gap-1.5 text-green-600 border-green-300 hover:bg-green-50">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button size="sm" onClick={handlePrint} className="gap-1.5">
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Print Content */}
      <div className="flex justify-center p-6 print:p-0">
        <div
          ref={printRef}
          id="sa-print-content"
          className="bg-white shadow-lg print:shadow-none mx-auto"
          style={getContainerStyle()}
        >
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
