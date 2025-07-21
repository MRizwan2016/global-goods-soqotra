import React, { useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Printer } from "lucide-react";
import { toast } from "sonner";

const EritreaInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  
  // Get invoice data from location state or mock data
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
          body { margin: 0; padding: 0; }
          .print-content {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 20px !important;
            font-size: 12px !important;
          }
          .no-print { display: none !important; }
          table { page-break-inside: avoid; }
          .grid { display: block !important; }
          .grid > div { margin-bottom: 10px !important; }
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
    navigate("/eritrea");
  };

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
            <div className="header">
              <div className="company-info flex items-start">
                <div className="logo-placeholder">LOGO</div>
                <div>
                  <h1>SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</h1>
                  <p>OFFICE NO. 3, 1ST FLOOR, ZONE 55, BUILDING NO.53, STREET NO.76,</p>
                  <p>AZIZIA COMMERCIAL STREET, P.O.BOX: 55861, AZIZIA - ERITREA</p>
                  <p>TEL: +291 - 44832508 | EMAIL: ACCOUNTS@SOQOTRALOGISTICS.COM</p>
                </div>
              </div>
              <div className="invoice-badge">
                <h2>INVOICE</h2>
                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>#{invoiceData.formData.invoiceNumber}</p>
                <p>DATE: {invoiceData.formData.invoiceDate}</p>
                <p>PRINT DATE: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Shipper and Consignee */}
            <div className="grid-2" style={{ marginBottom: '30px' }}>
              <div className="section">
                <div className="section-header">SHIPPER</div>
                <div className="section-content">
                  <p style={{ fontWeight: 'bold' }}>{invoiceData.shippingDetails.shipper1}</p>
                  <p>{invoiceData.shippingDetails.shipper2}</p>
                  <p style={{ color: '#dc2626', fontWeight: '500', marginTop: '10px' }}>
                    {invoiceData.shippingDetails.town}
                  </p>
                  <p style={{ marginTop: '10px' }}>
                    <strong>MOBILE:</strong> {invoiceData.shippingDetails.mobile}
                  </p>
                </div>
              </div>
              
              <div className="section">
                <div className="section-header">CONSIGNEE</div>
                <div className="section-content">
                  <p style={{ fontWeight: 'bold' }}>{invoiceData.shippingDetails.consignee1}</p>
                  <p>{invoiceData.shippingDetails.consignee2}</p>
                  <p style={{ marginTop: '10px' }}>{invoiceData.shippingDetails.consigneeAddress}</p>
                  <p>{invoiceData.shippingDetails.consigneeTown}</p>
                  <p style={{ marginTop: '10px' }}>
                    <strong>MOBILE:</strong> {invoiceData.shippingDetails.consigneeMobile}
                  </p>
                  <p><strong>ID/PASSPORT:</strong> {invoiceData.shippingDetails.consigneePassportNic}</p>
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
                    {invoiceData.formData.warehouse}
                  </div>
                  <div>
                    <strong>SECTOR:</strong><br />
                    {invoiceData.formData.sector}
                  </div>
                  <div>
                    <strong>PAYMENT STATUS:</strong><br />
                    <span style={{ color: '#16a34a', fontWeight: 'bold' }}>
                      {parseFloat(invoiceData.costDetails.net) > 0 ? "PAID" : "PENDING"}
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
                <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
                  <p>IN CASE OF DISPUTE OVER ANY CHARGES ON THIS INVOICE, PLEASE EMAIL:</p>
                  <p>ACCOUNTS@SOQOTRALOGISTICS.COM TO US WITHIN SEVEN DAYS FROM THE DATE OF INVOICE.</p>
                  <p>OTHERWISE CHARGES WOULD BE DEEMED AS CORRECT AND NO FURTHER DISPUTE WILL BE ENTERTAINED.</p>
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