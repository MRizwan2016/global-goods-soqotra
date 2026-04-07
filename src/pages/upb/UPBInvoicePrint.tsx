import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const UPBInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef<HTMLDivElement>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (id) {
      const storedInvoices = localStorage.getItem('saudiArabiaInvoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const invoice = invoices.find((inv: any) => inv.id === id);
        if (invoice) {
          setInvoiceData(invoice);
          
          // Check payment status
          const payments = localStorage.getItem('payments');
          if (payments) {
            const paymentData = JSON.parse(payments);
            const payment = paymentData.find((p: any) => p.invoiceNumber === invoice.invoiceNumber);
            setIsPaid(!!payment);
          }
        } else {
          // Fallback data
          setInvoiceData({
            id: id,
            invoiceNumber: `SA${Date.now()}`,
            date: new Date().toLocaleDateString('en-GB'),
            shipper: {
              name: "SAMPLE SHIPPER",
              address: "DOHA, QATAR",
              mobile: "+974 1234 5678"
            },
            consignee: {
              name: "SAMPLE CONSIGNEE",
              address: "RIYADH, SAUDI ARABIA",
              mobile: "+966 50 123 4567",
              idNumber: "123456789"
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
      }
    }
    setLoading(false);
  }, [id]);

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
      navigate(`/saudi-arabia/invoice/edit/${id}`);
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
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg" ref={printRef}>
        {invoiceData && (
          <div style={{ border: '3px solid #000', padding: '0', fontFamily: 'Arial, sans-serif' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', padding: '10px', borderBottom: '2px solid #000' }}>
              {/* Logo */}
              <div style={{ width: '100px', marginRight: '20px' }}>
                <img 
                  src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" 
                  alt="Soqotra Logo" 
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              
              {/* Title Section */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>
                  SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '5px' }}>
                  INVOICE PREVIEW
                </div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  Office: +974-44412770 | Mobile: +974-31064988
                </div>
              </div>
              
              {/* Page & QR Section */}
              <div style={{ width: '150px', textAlign: 'center' }}>
                <div style={{ border: '1px solid #000', padding: '5px', marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px' }}>PAGE</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>1</div>
                </div>
                <QRCodeSVG 
                  value={`INVOICE:${invoiceData.invoiceNumber}\nDATE:${invoiceData.date}\nAMOUNT:${invoiceData.pricing?.net || 0} SAR`} 
                  size={60} 
                  level="M"
                />
                <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '10px' }}>
                  SAUDI ARABIA
                </div>
              </div>
            </div>
            
            {/* Invoice Details Section */}
            <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
              <div style={{ flex: 1, padding: '10px' }}>
                <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>INVOICE</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{invoiceData.invoiceNumber}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>DATE</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>{invoiceData.date}</td>
                  </tr>
                  <tr>
                    <td style={{ border: '1px solid #000', padding: '5px', fontWeight: 'bold' }}>SALES REP</td>
                    <td style={{ border: '1px solid #000', padding: '5px' }}>MR. YOUSUF</td>
                  </tr>
                </table>
              </div>
            </div>

            {/* Shipper/Consignee */}
            <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000', padding: '10px' }}>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '5px' }}>SHIPPER:</div>
                <div>{invoiceData.shipper?.name || "SAMPLE SHIPPER"}</div>
                <div>{invoiceData.shipper?.address || "DOHA, QATAR"}</div>
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Mobile: {invoiceData.shipper?.mobile || "+974 1234 5678"}</div>
              </div>
              
              <div style={{ flex: 1, padding: '10px' }}>
                <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '5px' }}>CONSIGNEE:</div>
                <div>{invoiceData.consignee?.name || "SAMPLE CONSIGNEE"}</div>
                <div>{invoiceData.consignee?.address || "RIYADH, SAUDI ARABIA"}</div>
                <div>ID NO : {invoiceData.consignee?.idNumber || "123456789"}</div>
                <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Mobile: {invoiceData.consignee?.mobile || "+966 50 123 4567"}</div>
              </div>
            </div>

            {/* Destination */}
            <div style={{ borderBottom: '2px solid #000', padding: '10px', display: 'flex' }}>
              <div style={{ fontWeight: 'bold' }}>Destination Warehouse: Riyadh</div>
              <div style={{ marginLeft: '20px', fontWeight: 'bold' }}>(WAREHOUSE COLLECT)</div>
              <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>LANDCARGO</div>
            </div>

            {/* Cargo Table */}
            <table style={{ width: '100%', fontSize: '12px', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '60px' }}>S.L</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>CARGO DESCRIPTION</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '60px' }}>L</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '60px' }}>W</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '60px' }}>H</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '80px' }}>CBF</th>
                  <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '80px' }}>CBM</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.packages?.map((pkg: any, index: number) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}>{pkg.name || `PACKAGE ${index + 1}`}</td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{pkg.length || 50}</td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{pkg.width || 40}</td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{pkg.height || 30}</td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{((pkg.volume || 0.06) * 35.315).toFixed(2)}</td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{(pkg.volume || 0.06).toFixed(3)}</td>
                  </tr>
                ))}
                {/* Empty rows for consistent layout */}
                {Array.from({ length: Math.max(0, 10 - (invoiceData.packages?.length || 0)) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                    <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}></td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 'bold' }}>
                  <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }} colSpan={5}>
                    TOTAL WEIGHT: {invoiceData.totalWeight || 25} KG
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
                    {((invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0.06) * 35.315).toFixed(2)}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
                    {(invoiceData.packages?.reduce((sum: number, pkg: any) => sum + (pkg.volume || 0), 0) || 0.06).toFixed(3)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Footer */}
            <div style={{ display: 'flex', borderTop: '2px solid #000' }}>
              <div style={{ flex: 1, borderRight: '1px solid #000', padding: '10px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>CONDITIONS:</div>
                <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
                  <div>1. Any disputes must be reported within 24 hours of delivery.</div>
                  <div>2. Payment terms: Net 30 days from invoice date.</div>
                  <div>3. Late payment charges apply after due date.</div>
                  <div>4. Company not liable for damages beyond service charges.</div>
                  <div>5. All packages subject to customs inspection.</div>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>CUSTOMER SIGNATURE</div>
                  <div style={{ borderTop: '1px solid #000', marginTop: '30px', paddingTop: '5px' }}>DATE & SIGNATURE</div>
                </div>
              </div>
              
              <div style={{ flex: 1, padding: '10px' }}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>GROSS:</td>
                      <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>{(invoiceData.pricing?.gross || 0).toFixed(2)} SAR</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>DISCOUNT:</td>
                      <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>{(invoiceData.pricing?.discount || 0).toFixed(2)} SAR</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>NET:</td>
                      <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right', fontWeight: 'bold' }}>{(invoiceData.pricing?.net || 0).toFixed(2)} SAR</td>
                    </tr>
                    <tr>
                      <td style={{ border: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>PAYMENT STATUS:</td>
                      <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right', fontWeight: 'bold', color: isPaid ? '#16a34a' : '#dc2626' }}>
                        {isPaid ? 'PAID' : 'UNPAID'}
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold' }}>AUTHORIZED SIGNATURE</div>
                  <div style={{ borderTop: '1px solid #000', marginTop: '30px', paddingTop: '5px' }}>SOQOTRA LOGISTICS</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UPBInvoicePrint;