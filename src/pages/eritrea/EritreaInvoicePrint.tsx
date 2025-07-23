import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
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
          setInvoice(foundInvoice);
          console.log("📄 PRINT - Invoice loaded:", foundInvoice);
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

  // Get company name based on shipper country
  const getCompanyName = () => {
    const country = invoice?.shipperCountry || displayData?.shipperCountry || "QATAR";
    if (country === "SAUDI ARABIA") {
      return "SOQOTRA SOLUTIONS WLL";
    }
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
          <div className="invoice-container p-8">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <img 
                  src="/lovable-uploads/5d6de24f-5662-4b63-ad5a-e94dfa2aada7.png" 
                  alt="Soqotra Logo" 
                  style={{ width: '120px', height: 'auto', objectFit: 'contain', display: 'block' }}
                />
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e3a8a', margin: '0 0 8px 0', lineHeight: '1.2' }}>
                    {getCompanyName()}
                  </h1>
                  <div style={{ fontSize: '11px', color: '#666', lineHeight: '1.3' }}>
                    <p style={{ margin: '0' }}>OFFICE NO. 3, 1ST FLOOR, ZONE 55, BUILDING NO.53, STREET NO.76,</p>
                    <p style={{ margin: '0' }}>AZIZIA COMMERCIAL STREET, P.O.BOX: 55861, AZIZIA - ERITREA</p>
                    <p style={{ margin: '0' }}>TEL: +291 - 44832508 | EMAIL: ACCOUNTS@SOQOTRALOGISTICS.COM</p>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '200px' }}>
                <div style={{ border: '2px solid #ccc', padding: '16px', borderRadius: '8px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>INVOICE</h2>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '4px 0' }}>#{displayData.invoiceNumber || displayData.formData?.invoiceNumber}</p>
                  <p style={{ fontSize: '14px', margin: '4px 0' }}>DATE: {displayData.invoiceDate || displayData.formData?.invoiceDate}</p>
                  <p style={{ fontSize: '14px', margin: '4px 0' }}>PRINT DATE: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Shipper and Consignee */}
            <div className="grid-2" style={{ marginBottom: '30px' }}>
              <div className="section">
                <div className="section-header">SHIPPER</div>
                <div className="section-content">
                  <p style={{ fontWeight: 'bold' }}>
                    {displayData.shipperPrefix} {displayData.shipperName || displayData.shippingDetails?.shipper1}
                  </p>
                  <p>{displayData.shipperAddress || displayData.shippingDetails?.shipper2}</p>
                  <p style={{ color: '#dc2626', fontWeight: '500', marginTop: '10px' }}>
                    {displayData.shipperCity}, {displayData.shipperCountry || displayData.shippingDetails?.town}
                  </p>
                  <p style={{ marginTop: '10px' }}>
                    <strong>MOBILE:</strong> {displayData.shipperMobile || displayData.shippingDetails?.mobile}
                  </p>
                  <p><strong>EMAIL:</strong> {displayData.shipperEmail}</p>
                  <p><strong>ID:</strong> {displayData.shipperIdNumber}</p>
                </div>
              </div>
              
              <div className="section">
                <div className="section-header">CONSIGNEE</div>
                <div className="section-content">
                  <p style={{ fontWeight: 'bold' }}>
                    {displayData.consigneePrefix} {displayData.consigneeName || displayData.shippingDetails?.consignee1}
                  </p>
                  <p>{displayData.consigneeAddress || displayData.shippingDetails?.consignee2}</p>
                  <p style={{ marginTop: '10px' }}>
                    {displayData.consigneeCity}, {displayData.consigneeCountry || displayData.shippingDetails?.consigneeTown}
                  </p>
                  <p style={{ marginTop: '10px' }}>
                    <strong>MOBILE:</strong> {displayData.consigneeMobile || displayData.shippingDetails?.consigneeMobile}
                  </p>
                  <p><strong>EMAIL:</strong> {displayData.consigneeEmail}</p>
                  <p><strong>ID/PASSPORT:</strong> {displayData.consigneeIdNumber || displayData.shippingDetails?.consigneePassportNic}</p>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="section">
              <div className="section-header">SHIPPING DETAILS</div>
              <div className="section-content">
                <div className="grid-4">
                  <div>
                    <strong>WAREHOUSE:</strong><br />
                    ERITREA
                  </div>
                  <div>
                    <strong>SECTOR:</strong><br />
                    KASSALA
                  </div>
                  <div>
                    <strong>PAYMENT STATUS:</strong><br />
                    <span style={{ color: displayData.paymentStatus === 'PAID' ? '#16a34a' : '#dc2626', fontWeight: 'bold' }}>
                      {displayData.paymentStatus || "UNPAID"}
                    </span>
                  </div>
                  <div>
                    <strong>PAYMENT METHOD:</strong><br />
                    CASH
                  </div>
                  <div>
                    <strong>PAYMENT DATE:</strong><br />
                    NOT SPECIFIED
                  </div>
                  <div>
                    <strong>RECEIPT NUMBER:</strong><br />
                    NOT SPECIFIED
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo Details */}
            <div className="section">
              <div className="section-header">CARGO DETAILS</div>
              <div className="section-content">
                <table>
                  <thead>
                    <tr>
                      <th>NO.</th>
                      <th>PACKAGE TYPE</th>
                      <th>QTY</th>
                      <th>WEIGHT (KG)</th>
                      <th>VOLUME (M³)</th>
                      <th>DESCRIPTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.packageDetails.length > 0 ? (
                      invoiceData.packageDetails.map((pkg: any, index: number) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{pkg.name || "HOUSEHOLD ITEMS"}</td>
                          <td>1</td>
                          <td>{pkg.weight || "29.34"}</td>
                          <td>{pkg.cubicMetre || "0.672"}</td>
                          <td>PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>1</td>
                        <td>HOUSEHOLD ITEMS</td>
                        <td>1</td>
                        <td>29.34</td>
                        <td>0.672</td>
                        <td>PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                      </tr>
                    )}
                    <tr className="total-row">
                      <td style={{ textAlign: 'center' }}>TOTAL:</td>
                      <td>{invoiceData.packageDetails.length || 1}</td>
                      <td>{invoiceData.formData.weight} KG</td>
                      <td>{invoiceData.formData.volume} M³</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terms and Pricing */}
            <div className="grid-2">
              <div>
                <h3 style={{ color: '#1e3a8a', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>
                  TERMS & CONDITIONS:
                </h3>
                <div style={{ fontSize: '9px', lineHeight: '1.4' }}>
                  <p style={{ margin: '2px 0' }}>(1) WE HEREBY DECLARE THAT THE CONTENTS OF THIS CONSIGNMENT ARE FULLY AND ACCURATELY DESCRIBED, AND THE PARCEL OR PACKAGE DOESN'T CONTAIN ANY ILLEGAL ITEMS, CASH, JEWELRY, OR DANGEROUS GOODS.</p>
                  <p style={{ margin: '2px 0' }}>(2) PERISHABLE & BREAKABLE ITEMS ARE SHIPPED AT MY OWN RISK. SOQOTRA IS NOT LIABLE FOR ANY LOSS FROM BREAKABLE OR UNDECLARED ITEMS.</p>
                  <p style={{ margin: '2px 0' }}>(3) SHIPPER/CONSIGNEE RESPONSIBLE FOR DESTINATION CHARGES.</p>
                  <p style={{ margin: '2px 0' }}>(4) I UNDERSTAND THE PRESENT TIME IS JUST AN INDICATOR, IT MAY CHANGE.</p>
                  <p style={{ margin: '2px 0' }}>(5) STORAGE CHARGES ARE APPLICABLE AFTER 30 DAYS.</p>
                  <p style={{ margin: '2px 0' }}>(6) I UNDERTAKE TO COMPLY WITH THE ABOVE-MENTIONED TERMS AND CONDITIONS.</p>
                </div>
              </div>
              
              <div className="pricing-box">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>FREIGHT</span>
                  <span>{parseFloat(invoiceData.costDetails.freight).toFixed(2)} QAR</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>DISCOUNT</span>
                  <span>({parseFloat(invoiceData.costDetails.discount || "0.00").toFixed(2)}) QAR</span>
                </div>
                <hr style={{ margin: '10px 0', borderColor: '#ccc' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '8px' }}>
                  <span>TOTAL</span>
                  <span>{parseFloat(invoiceData.costDetails.net).toFixed(2)} QAR</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px' }}>
                  <span>TOTAL DUE</span>
                  <span>{parseFloat(invoiceData.costDetails.net).toFixed(2)} QAR</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '10px', color: '#666' }}>
              <p>This is a computer generated invoice and does not require signature.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EritreaInvoicePrint;