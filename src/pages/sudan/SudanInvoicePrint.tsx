import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PrintStyles from "../invoicing/components/print/PrintStyles";
import { QRCodeSVG } from "qrcode.react";

const SudanInvoicePrint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const storedInvoices = localStorage.getItem('sudanInvoices');
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const foundInvoice = invoices.find(inv => inv.id === id);
        if (foundInvoice) {
          setInvoice(foundInvoice);
        } else {
          setError("Invoice not found");
        }
      } else {
        setError("No invoices found");
      }
    }
    setLoading(false);
  }, [id]);

  const totalVolume = invoice?.packageDetails?.reduce((sum, pkg) => sum + parseFloat(pkg.cubicMetre || 0), 0).toFixed(3) || "0.000";
  const totalWeight = invoice?.packageDetails?.reduce((sum, pkg) => sum + parseFloat(pkg.weight || 0), 0).toFixed(2) || "0.00";

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(`/sudan/invoice/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Invoice not found</div>
      </div>
    );
  }

  const generateQRData = () => {
    const qrString = `INVOICE:${invoice.formData?.invoiceNumber || "000000"}|DATE:${invoice.formData?.invoiceDate || new Date().toISOString().split('T')[0]}|TOTAL:${invoice.costDetails?.net || "0.00"} QAR|STATUS:${invoice.formData?.paymentStatus || "UNPAID"}|VERIFIED:TRUE`;
    return qrString;
  };

  return (
    <div className="min-h-screen bg-white">
      <PrintStyles />
      
      {/* Print Controls - Hidden in print */}
      <div className="no-print bg-gray-100 p-4 flex justify-between items-center">
        <button 
          onClick={handleBack}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-xl font-semibold">Sudan Invoice - {invoice.formData?.invoiceNumber}</h1>
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          🖨️ Print
        </button>
      </div>

      {/* Invoice Content */}
      <div id="print-invoice-content" className="print-container bg-white p-6 text-black max-w-4xl mx-auto">
        <div className="break-inside-avoid" style={{ fontSize: '11pt', fontFamily: 'Arial, sans-serif' }}>
          
          {/* Header with Logo in Top-Left Corner */}
          <div className="mb-8">
            {/* Logo - Top left corner, very large */}
            <div className="flex justify-start mb-6">
              <img 
                src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
                alt="Soqotra Logo" 
                className="w-[550px] h-auto object-contain"
                style={{ 
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
            
            {/* Company Info and Invoice Details */}
            <div className="flex justify-between items-start">
              {/* Company Info - Left side */}
              <div className="flex-1">
                <h1 className="text-lg font-bold text-blue-900 leading-tight">
                  SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL
                </h1>
                <div className="text-sm text-gray-600 mt-3 leading-relaxed">
                  <p>OFFICE NO. 3, 1ST FLOOR, ZONE 55, BUILDING NO.53, STREET NO.76,</p>
                  <p>AZIZIA COMMERCIAL STREET, P.O.BOX: 55861, AZIZIA - DOHA - QATAR</p>
                  <p>TEL: +974 - 44832508 | EMAIL: ACCOUNTS@SOQOTRALOGISTICS.COM</p>
                </div>
              </div>
              
              {/* Invoice Info - Right side */}
              <div className="text-right">
                <div className="border-2 border-gray-300 p-4 rounded">
                  <h2 className="text-2xl font-bold">INVOICE</h2>
                  <p className="text-lg font-semibold">#{invoice.formData?.invoiceNumber || "000000"}</p>
                  <p className="text-sm">DATE: {invoice.formData?.invoiceDate || new Date().toISOString().split('T')[0]}</p>
                  <p className="text-sm">PRINT DATE: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipper and Consignee */}
          <div className="grid grid-cols-2 gap-8 mb-8 break-inside-avoid">
            <div className="border border-gray-300 p-4">
              <h3 className="font-bold text-lg mb-3 text-blue-900">SHIPPER</h3>
              <p className="font-semibold">{invoice.shippingDetails?.shipper1 || "N/A"}</p>
              <p>{invoice.shippingDetails?.shipper2 || ""}</p>
              <p className="mt-2 font-medium text-red-600">{invoice.shippingDetails?.town || "DOHA, QATAR"}</p>
              <p className="mt-2"><span className="font-medium">MOBILE:</span> {invoice.shippingDetails?.mobile || "N/A"}</p>
            </div>
            
            <div className="border border-gray-300 p-4">
              <h3 className="font-bold text-lg mb-3 text-blue-900">CONSIGNEE</h3>
              <p className="font-semibold">{invoice.shippingDetails?.consignee1 || "N/A"}</p>
              <p>{invoice.shippingDetails?.consignee2 || ""}</p>
              <p className="mt-2">{invoice.shippingDetails?.consigneeAddress || ""}</p>
              <p>{invoice.shippingDetails?.consigneeTown || "SUDAN"}</p>
              <p className="mt-2"><span className="font-medium">MOBILE:</span> {invoice.shippingDetails?.consigneeMobile || "N/A"}</p>
              <p><span className="font-medium">ID/PASSPORT:</span> {invoice.shippingDetails?.consigneePassportNic || "N/A"}</p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border border-gray-300 mb-6 break-inside-avoid">
            <h3 className="font-bold text-lg p-3 bg-gray-100 text-blue-900">SHIPPING DETAILS</h3>
            <div className="grid grid-cols-4 gap-4 p-4">
              <div>
                <p><span className="font-medium">WAREHOUSE:</span></p>
                <p>SUDAN</p>
              </div>
              <div>
                <p><span className="font-medium">SECTOR:</span></p>
                <p>KASSALA</p>
              </div>
              <div>
                <p><span className="font-medium">PAYMENT STATUS:</span></p>
                <p className={`font-bold text-lg ${invoice.formData?.paymentStatus === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                  {invoice.formData?.paymentStatus || 'UNPAID'}
                </p>
              </div>
              <div>
                <p><span className="font-medium">PAYMENT METHOD:</span></p>
                <p>CASH</p>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="border border-gray-300 mb-6 break-inside-avoid">
            <h3 className="font-bold text-lg p-3 bg-gray-100 text-blue-900">CARGO DETAILS</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">NO.</th>
                  <th className="border border-gray-300 p-2 text-left">PACKAGE TYPE</th>
                  <th className="border border-gray-300 p-2 text-left">QTY</th>
                  <th className="border border-gray-300 p-2 text-left">WEIGHT (KG)</th>
                  <th className="border border-gray-300 p-2 text-left">VOLUME (M³)</th>
                  <th className="border border-gray-300 p-2 text-left">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {invoice.packageDetails && invoice.packageDetails.length > 0 ? (
                  invoice.packageDetails.map((pkg, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{pkg.name || "PACKAGE"}</td>
                      <td className="border border-gray-300 p-2">{pkg.quantity || "1"}</td>
                      <td className="border border-gray-300 p-2">{pkg.weight || "0"}</td>
                      <td className="border border-gray-300 p-2">{pkg.cubicMetre || "0.000"}</td>
                      <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">PACKAGE</td>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">0</td>
                    <td className="border border-gray-300 p-2">0.000</td>
                    <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                  </tr>
                )}
                <tr className="bg-gray-50 font-bold">
                  <td className="border border-gray-300 p-2 text-center" colSpan={2}>TOTAL:</td>
                  <td className="border border-gray-300 p-2">{invoice.packageDetails?.length || 1}</td>
                  <td className="border border-gray-300 p-2">{totalWeight} KG</td>
                  <td className="border border-gray-300 p-2">{totalVolume} M³</td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms and Pricing */}
          <div className="grid grid-cols-2 gap-8 break-inside-avoid">
            <div>
              <h3 className="font-bold text-lg mb-3 text-blue-900">TERMS & CONDITIONS:</h3>
              <div className="space-y-1" style={{ fontSize: '9px', lineHeight: '1.4' }}>
                <p>(1) WE HEREBY DECLARE THAT THE CONTENTS OF THIS CONSIGNMENT ARE FULLY AND ACCURATELY DESCRIBED, AND THE PARCEL OR PACKAGE DOESN'T CONTAIN ANY ILLEGAL ITEMS, CASH, JEWELRY, OR DANGEROUS GOODS.</p>
                <p>(2) PERISHABLE & BREAKABLE ITEMS ARE SHIPPED AT MY OWN RISK. SOQOTRA IS NOT LIABLE FOR ANY LOSS FROM BREAKABLE OR UNDECLARED ITEMS.</p>
                <p>(3) SHIPPER/CONSIGNEE RESPONSIBLE FOR DESTINATION CHARGES.</p>
                <p>(4) I UNDERSTAND THE PRESENT TIME IS JUST AN INDICATOR, IT MAY CHANGE.</p>
                <p>(5) STORAGE CHARGES ARE APPLICABLE AFTER 30 DAYS.</p>
                <p>(6) I UNDERTAKE TO COMPLY WITH THE ABOVE-MENTIONED TERMS AND CONDITIONS.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>FREIGHT</span>
                  <span>{parseFloat(invoice.costDetails?.freight || "0").toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between">
                  <span>DISCOUNT</span>
                  <span>({parseFloat(invoice.costDetails?.discount || "0").toFixed(2)}) QAR</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold">
                  <span>TOTAL</span>
                  <span>{parseFloat(invoice.costDetails?.net || "0").toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>TOTAL DUE</span>
                  <span>{parseFloat(invoice.costDetails?.net || "0").toFixed(2)} QAR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8 flex justify-between items-end break-inside-avoid">
            <div className="text-left">
              <div className="border-t border-gray-400 pt-2 w-48">
                <p className="text-xs font-medium">PAYMENT/CUSTOMER/SHIPPER SIGNATURE</p>
              </div>
            </div>
            <div className="text-right">
              <div className="border-t border-gray-400 pt-2 w-48">
                <p className="text-xs font-medium">SHIPPER'S SIGNATURE</p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="mt-6 flex justify-end break-inside-avoid">
            <div className="text-center">
              <QRCodeSVG 
                value={generateQRData()} 
                size={120} 
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
              />
              <p className="text-xs text-gray-500 mt-2">Scan to verify invoice</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>This is a computer generated invoice and does not require signature.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudanInvoicePrint;