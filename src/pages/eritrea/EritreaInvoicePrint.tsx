import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

const EritreaInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoice, setInvoice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load invoice from localStorage
  useEffect(() => {
    const loadInvoice = () => {
      try {
        const storedInvoices = JSON.parse(localStorage.getItem('eritreaInvoices') || '[]');
        const foundInvoice = storedInvoices.find((inv: any) => inv.id === id);
        
        if (foundInvoice) {
          // Check payment status from payments localStorage
          const payments = localStorage.getItem('payments');
          let paymentStatus = foundInvoice.paymentStatus || "UNPAID";
          
          if (payments) {
            try {
              const parsedPayments = JSON.parse(payments);
              const invoicePayments = parsedPayments.filter((p: any) => 
                p.invoiceNumber === foundInvoice.invoiceNumber || 
                p.invoiceNumber === foundInvoice.formData?.invoiceNumber
              );
              
              if (invoicePayments.length > 0) {
                paymentStatus = "PAID";
                foundInvoice.paymentStatus = "PAID";
                foundInvoice.formData = { ...foundInvoice.formData, paymentStatus: "PAID" };
              }
            } catch (e) {
              console.error("Error parsing payments:", e);
            }
          }
          
          setInvoice(foundInvoice);
          console.log("📄 PRINT - Invoice loaded with payment status:", foundInvoice, "Payment Status:", paymentStatus);
        } else {
          toast.error("Invoice not found");
          navigate("/eritrea");
        }
      } catch (error) {
        console.error("Error loading invoice:", error);
        toast.error("Failed to load invoice");
        navigate("/eritrea");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadInvoice();
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  // Get company name - Always use Qatar company name for Eritrea project
  const getCompanyName = () => {
    return "SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL";
  };

  // Fallback invoice data for when loading from location state
  const invoiceData = location.state?.invoiceData || {
    formData: {
      invoiceNumber: "ER13135619",
      invoiceDate: new Date().toISOString().split('T')[0],
      warehouse: "KURUNEGALA",
      sector: "COLOMBO",
      weight: "29.34",
      volume: "0.672",
      packages: "1"
    },
    packageDetails: [
      {
        name: "HOUSEHOLD ITEMS",
        weight: "29.34",
        cubicMetre: "0.672"
      }
    ],
    shippingDetails: {
      shipper1: "INSAF M M M",
      shipper2: "AZHAR A S M",
      town: "THUMAMA, DOHA",
      mobile: "+94771234567",
      consignee1: "INSAF M M M",
      consignee2: "AZHAR A S M",
      consigneeAddress: "NO 38 MUSLIM",
      consigneeTown: "DANOWITA, SRI LANKA",
      consigneeMobile: "+94755123456",
      consigneePassportNic: "29876543210"
    },
    costDetails: {
      freight: "59.00",
      discount: "0.00",
      net: "59.00"
    }
  };

  const handlePrint = () => {
    const printStyles = `
      <style>
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          @page { 
            size: A4; 
            margin: 0.4in; 
          }
          body { 
            margin: 0; 
            padding: 0; 
            font-size: 12px !important;
            line-height: 1.3;
          }
          .print-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .invoice-container {
            padding: 15px !important;
          }
          .no-print { display: none !important; }
          table { page-break-inside: avoid; font-size: 10px; }
          .grid { display: block !important; }
          .grid > div { margin-bottom: 8px !important; }
          h1, h2, h3 { margin: 5px 0 !important; }
          .section { margin-bottom: 15px !important; }
          img { max-width: 120px !important; height: auto !important; }
        }
      </style>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Eritrea Invoice ${invoiceData.formData.invoiceNumber}</title>
          ${printStyles}
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; background: white; }
            .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
            .company-info h1 { color: #1e3a8a; font-size: 18px; margin: 0 0 10px 0; }
            .company-info p { margin: 2px 0; font-size: 11px; color: #666; }
            .invoice-badge { border: 2px solid #ccc; padding: 15px; text-align: center; }
            .invoice-badge h2 { margin: 0; font-size: 24px; }
            .invoice-badge p { margin: 5px 0; }
            .section { border: 1px solid #ccc; margin-bottom: 20px; }
            .section-header { background: #f5f5f5; padding: 10px; font-weight: bold; color: #1e3a8a; }
            .section-content { padding: 15px; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
            .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
            .pricing-box { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background: #f5f5f5; font-weight: bold; }
            .total-row { background: #f5f5f5; font-weight: bold; }
            .logo-placeholder { width: 60px; height: 60px; background: linear-gradient(45deg, #22c55e, #ef4444); 
                               border-radius: 4px; display: flex; align-items: center; justify-content: center; 
                               color: white; font-weight: bold; margin-right: 20px; }
          </style>
        </head>
        <body>
          ${printRef.current?.innerHTML}
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
      toast.success("Invoice sent to printer");
    }
  };

  const handleBack = () => {
    if (id) {
      navigate(`/eritrea/invoice/edit/${id}`);
    } else {
      navigate("/eritrea");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading invoice...</p>
        </div>
      </div>
    );
  }

  // Use loaded invoice data or fallback to location state
  const displayData = invoice || invoiceData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="no-print bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-xl font-semibold">
            Invoice #{invoiceData.formData.invoiceNumber} - Print View
          </h1>
        </div>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print Invoice
        </Button>
      </div>

      {/* Print Content */}
      <div className="p-8 flex justify-center">
        <div 
          ref={printRef} 
          className="print-content w-full max-w-4xl bg-white shadow-lg print:shadow-none"
          style={{ minHeight: '297mm' }}
        >
          <div style={{ border: '3px solid #000', padding: '0', fontFamily: 'Arial, sans-serif' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', padding: '10px', borderBottom: '2px solid #000' }}>
              {/* QR Code - Top Left */}
              <div style={{ width: '120px', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QRCodeSVG 
                  value={`INVOICE:${displayData.invoiceNumber || displayData.formData?.invoiceNumber || "010009"}|DATE:${displayData.invoiceDate || displayData.formData?.invoiceDate}|TOTAL:850.00 QAR|STATUS:${displayData.paymentStatus || "UNPAID"}|VERIFIED:TRUE`}
                  size={100}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={true}
                />
              </div>

              {/* Logo */}
              <div style={{ width: '150px', marginRight: '20px' }}>
                <img 
                  src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
                  alt="Soqotra Logo" 
                  style={{ width: '100%', height: 'auto', fontSize: '25px' }}
                />
              </div>
              
              {/* Title Section */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', margin: '0' }}>
                  SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL
                </div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  P.O. OFFICE NO. 3, 1ST FLOOR, BUILDING NO. 53, ZONE NO. 55
                </div>
                <div style={{ fontSize: '12px', marginTop: '2px' }}>
                  AZIZIA COMMERCIAL STREET, DOHA - QATAR
                </div>
                <div style={{ fontSize: '12px', marginTop: '2px' }}>
                  TEL: 4441 9187, EMAIL: ops@soqotralogistics.com
                </div>
              </div>
              
              {/* Page Section */}
              <div style={{ width: '150px', textAlign: 'center' }}>
                <div style={{ border: '1px solid #000', padding: '5px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px' }}>PAGE</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>1</div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                  ERITREA
                </div>
              </div>
            </div>

            {/* Agent Details Section - Conditional based on warehouse */}
            <div style={{ borderBottom: '2px solid #000', padding: '10px', backgroundColor: '#f9f9f9' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '5px' }}>AGENT DETAILS:</div>
              {(displayData.formData?.warehouse || displayData.warehouse || "").toLowerCase().includes('musawwa') ? (
                <div style={{ fontSize: '11px' }}>
                  DHL EXPRESS; MUSAWWA BRANCH, Mr. Idries Omar Idries, Mobile No. +291 7159848
                </div>
              ) : (
                <div style={{ fontSize: '11px' }}>
                  DHL EXPRESS, ASMARA BRANCH, Mr. Amanuel Akole, Mobile No. +291 1126595, Tel: +291 120210, Fax: +291 1122882, Email: amanuellakole@dhlexpress.com, aakole@gmail.com
                </div>
              )}
            </div>

            {/* Invoice Info Section */}
            <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
              <div style={{ flex: 1, padding: '10px' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>INVOICE</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.invoiceNumber || displayData.invoiceNumber || "010000"}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>DATE</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.invoiceDate || displayData.invoiceDate || new Date().toISOString().split('T')[0]}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>JOB NO.</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.jobNumber || displayData.jobNumber || displayData.associatedJobNumber || displayData.formData?.invoiceNumber || "010000"}</td>
                  </tr>
                   <tr>
                     <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>SALES REP</td>
                     <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.salesRep || displayData.salesRep || "Mr. Idries Omar Idries"}</td>
                   </tr>
                </table>
              </div>
            </div>

            {/* Shipper and Consignee Section */}
            <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>SR NO.</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>SHIPPER</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>1</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.shipperPrefix || displayData.shipperPrefix || ""} {displayData.formData?.shipperName || displayData.shipperName || displayData.shippingDetails?.shipper1 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>2</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }} colSpan={2}>
                      {displayData.formData?.shipperCity || displayData.shipperCity || displayData.shippingDetails?.town || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>MOBILE / TEL NO</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.shipperMobile || displayData.shipperMobile || displayData.shippingDetails?.mobile || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>QID / PP NO</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.shipperIdNumber || displayData.shipperIdNumber || ""}
                    </td>
                  </tr>
                </table>
              </div>
              
              <div style={{ flex: 1 }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>SR NO</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>CONSIGNEE</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>1</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.consigneePrefix || displayData.consigneePrefix || ""} {displayData.formData?.consigneeName || displayData.consigneeName || displayData.shippingDetails?.consignee1 || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>2</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}></td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }} colSpan={2}>
                      {displayData.formData?.consigneeCity || displayData.consigneeCity || displayData.shippingDetails?.consigneeTown || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>TEL NO:</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.consigneeMobile || displayData.consigneeMobile || displayData.shippingDetails?.consigneeMobile || ""}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>ID NO OR PP NO</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>
                      {displayData.formData?.consigneeIdNumber || displayData.consigneeIdNumber || displayData.shippingDetails?.consigneePassportNic || ""}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            {/* Shipping Details */}
            <div style={{ borderBottom: '2px solid #000' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #000' }}>
                SHIPPING DETAILS
              </div>
              <div style={{ display: 'flex' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>WAREHOUSE</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>SECTOR</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>PAYMENT STATUS</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>PAYMENT MODE</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>COUNTRY/ORIGIN</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.warehouse || displayData.warehouse || "ASMARA"}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.sector || displayData.sector || "ERITREA"}</td>
                    <td style={{ border: '1px solid #000', padding: '5px', color: displayData.paymentStatus === 'PAID' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                      {displayData.paymentStatus || displayData.formData?.paymentStatus || "UNPAID"}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{displayData.formData?.paymentMode || displayData.paymentMode || "CASH"}</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>QATAR</td>
                  </tr>
                </table>
              </div>
            </div>

            {/* Cargo Details */}
            <div style={{ borderBottom: '2px solid #000' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #000' }}>
                CARGO DETAILS
              </div>
              <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>SR NO</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>PACKAGE TYPE</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>QUANTITY</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>WEIGHT</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>DIMENSION</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>VOLUME</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>DESCRIPTION</td>
                  </tr>
                </thead>
                <tbody>
                  {displayData.packageItems?.length > 0 ? (
                    displayData.packageItems.map((item: any, index: number) => (
                      <tr key={index}>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{index + 1}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.name}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.quantity}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.weight}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.length}X{item.width}X{item.height}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.cubicMetre}</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>{item.description || 'PERSONAL EFFECTS'}</td>
                      </tr>
                    ))
                  ) : (
                    // Fallback data if no packageItems found
                    <>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>1</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>CARTON BOX</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>1</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>25</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>20X20X20</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>0.134</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>PERSONAL EFFECTS</td>
                      </tr>
                      <tr>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>2</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>TRAVELLING BAG</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>1</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>30</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>22X14X12</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>0.062</td>
                        <td style={{ border: '1px solid #000', padding: '5px' }}>PERSONAL EFFECTS</td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }} colSpan={2}>TOTAL</td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      {displayData.totalPackages || displayData.packageItems?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 2}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      {displayData.totalWeight || displayData.packageItems?.reduce((sum: number, item: any) => sum + (item.weight * item.quantity), 0) || 55}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}></td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                      {displayData.totalVolume || displayData.packageItems?.reduce((sum: number, item: any) => sum + (item.cubicMetre * item.quantity), 0) || 0.196}
                    </td>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold', backgroundColor: '#f0f0f0' }}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terms and Pricing */}
            <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000', padding: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                  TERMS & CONDITIONS:-
                </div>
                <div style={{ fontSize: '10px', lineHeight: '1.3' }}>
                  <p style={{ margin: '2px 0' }}>(1) I/We hereby declare that the contents of this consignment are</p>
                  <p style={{ margin: '2px 0' }}>fully accurately described, and the parcel or package doesn't</p>
                  <p style={{ margin: '2px 0' }}>contain any illegal items, cash, jewelry, or dangerous goods.</p>
                  <p style={{ margin: '2px 0' }}>(2) Perishable & breakable items are shipped at my own risk;</p>
                  <p style={{ margin: '2px 0' }}>SOQOTRA is not liable for any loss from breakable or undeclared items.</p>
                  <p style={{ margin: '2px 0' }}>(3) Shipper/Consignee responsible for destination charges.</p>
                  <p style={{ margin: '2px 0' }}>(4) I understand that delivery time is just an indicator, it may change.</p>
                  <p style={{ margin: '2px 0' }}>(5) Storage charges are applicable after 30 days.</p>
                  <p style={{ margin: '2px 0' }}>(6) I undertake to comply with the above-mentioned terms and conditions</p>
                </div>
              </div>
              
              <div style={{ padding: '10px' }}>
               <table style={{ fontSize: '12px', borderCollapse: 'collapse' }}>
                   <tr>
                     <td style={{ padding: '5px', textAlign: 'right' }}>FREIGHT</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>{(displayData.formData?.freight || displayData.freight || 650).toFixed(2)}</td>
                   </tr>
                   <tr>
                     <td style={{ padding: '5px', textAlign: 'right' }}>DOCUMENTS FEE</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>{(displayData.formData?.documentsFee || displayData.documentsFee || 200).toFixed(2)}</td>
                   </tr>
                   <tr>
                     <td style={{ padding: '5px', textAlign: 'right' }}>DISCOUNT</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>{displayData.formData?.discount > 0 ? `-${displayData.formData.discount.toFixed(2)}` : displayData.discount > 0 ? `-${displayData.discount.toFixed(2)}` : '-'}</td>
                   </tr>
                   <tr>
                     <td style={{ padding: '5px', textAlign: 'right' }}>PACKING FEE</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>{displayData.formData?.packing > 0 ? displayData.formData.packing.toFixed(2) : displayData.packing > 0 ? displayData.packing.toFixed(2) : '-'}</td>
                   </tr>
                   <tr>
                     <td style={{ padding: '5px', textAlign: 'right' }}>TRANSPORTATION</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right' }}>{displayData.formData?.localTransport > 0 ? displayData.formData.localTransport.toFixed(2) : displayData.localTransport > 0 ? displayData.localTransport.toFixed(2) : '-'}</td>
                   </tr>
                   <tr style={{ borderTop: '1px solid #000' }}>
                     <td style={{ padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>TOTAL</td>
                     <td style={{ padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>QAR</td>
                     <td style={{ padding: '5px', textAlign: 'right', fontWeight: 'bold' }}>{(displayData.formData?.net || displayData.net || 850).toFixed(2)}</td>
                   </tr>
                 </table>
                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '10px', color: displayData.paymentStatus === 'PAID' ? '#16a34a' : '#dc2626' }}>
                  {displayData.paymentStatus === 'PAID' ? 'PAID' : 'PAID / UNPAID'}
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div style={{ display: 'flex', minHeight: '80px' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000', padding: '20px', textAlign: 'center' }}>
                <div style={{ borderTop: '1px solid #000', marginTop: '40px', paddingTop: '5px', fontWeight: 'bold' }}>
                  CUSTOMER SIGNATURE
                </div>
              </div>
              <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                <div style={{ borderTop: '1px solid #000', marginTop: '40px', paddingTop: '5px', fontWeight: 'bold' }}>
                  AUTHORIZED SIGNATURE
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', fontSize: '10px', fontStyle: 'italic', padding: '10px', borderTop: '1px solid #000' }}>
              THANK YOU FOR OUR BUSINESS. FOR ANY INQUIRIES PLEASE CONTACT US AT: 44412770-44412773
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EritreaInvoicePrint;