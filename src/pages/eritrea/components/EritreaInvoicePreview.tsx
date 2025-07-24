import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface EritreaInvoicePreviewProps {
  formData: any;
  packageDetails: any[];
  shippingDetails: any;
  costDetails: any;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

const EritreaInvoicePreview: React.FC<EritreaInvoicePreviewProps> = ({
  formData,
  packageDetails,
  shippingDetails,
  costDetails,
  isOpen,
  onClose,
  onPrint
}) => {
  // Generate QR code data for the invoice
  const generateQRData = () => {
    const invoiceData = {
      invoiceNumber: formData.invoiceNumber || "010000",
      date: formData.invoiceDate || new Date().toISOString().split('T')[0],
      total: parseFloat(costDetails.net || costDetails.freight || "59.00").toFixed(2),
      shipper: shippingDetails.shipper1 || "INSAF M M M",
      consignee: shippingDetails.consignee1 || "INSAF M M M",
      paymentStatus: formData.paymentStatus || "UNPAID",
      company: "SOQOTRA LOGISTICS",
      verified: true
    };
    
    // Create a shorter, more reliable QR data format
    const qrString = `INVOICE:${invoiceData.invoiceNumber}|DATE:${invoiceData.date}|TOTAL:${invoiceData.total} QAR|STATUS:${invoiceData.paymentStatus}|VERIFIED:TRUE`;
    
    console.log("Generated QR data:", qrString);
    return qrString;
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Invoice Preview</span>
            <div className="flex gap-2">
              <Button onClick={onPrint} size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button onClick={onClose} size="sm" variant="outline">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div id="eritrea-invoice-print" className="bg-white p-6 text-black" style={{ fontSize: '11pt', fontFamily: 'Arial, sans-serif' }}>
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            {/* Logo - Left side, large and prominent */}
            <div className="flex-shrink-0">
              <img 
                src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
                alt="Soqotra Logo" 
                className="w-[280px] h-auto object-contain"
                style={{ 
                  imageRendering: 'crisp-edges'
                }}
              />
            </div>
            
            {/* Company Info - Center */}
            <div className="flex-1 px-6">
              <h1 className="text-lg font-bold text-blue-900 leading-tight text-center">
                {formData.shipperCountry === "SAUDI ARABIA" 
                  ? "SOQOTRA SOLUTIONS WLL" 
                  : "SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL"}
              </h1>
              <div className="text-sm text-gray-600 mt-3 leading-relaxed text-center">
                <p>OFFICE NO. 3, 1ST FLOOR, ZONE 55, BUILDING NO.53, STREET NO.76,</p>
                <p>AZIZIA COMMERCIAL STREET, P.O.BOX: 55861, AZIZIA - DOHA - QATAR</p>
                <p>TEL: +974 - 44832508 | EMAIL: ACCOUNTS@SOQOTRALOGISTICS.COM</p>
              </div>
            </div>
            
            {/* Invoice Info - Right side */}
            <div className="text-right">
              <div className="border-2 border-gray-300 p-4 rounded">
                <h2 className="text-2xl font-bold">INVOICE</h2>
                <p className="text-lg font-semibold">#{formData.invoiceNumber || "010000"}</p>
                <p className="text-sm">DATE: {formData.invoiceDate || new Date().toISOString().split('T')[0]}</p>
                <p className="text-sm">PRINT DATE: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Shipper and Consignee */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="border border-gray-300 p-4">
              <h3 className="font-bold text-lg mb-3 text-blue-900">SHIPPER</h3>
              <p className="font-semibold">{shippingDetails.shipper1 || "INSAF M M M"}</p>
              <p>{shippingDetails.shipper2 || "AZHAR A S M"}</p>
              <p className="mt-2 font-medium text-red-600">{shippingDetails.town || "THUMAMA, DOHA"}</p>
              <p className="mt-2"><span className="font-medium">MOBILE:</span> {shippingDetails.mobile || "+94771234567"}</p>
            </div>
            
            <div className="border border-gray-300 p-4">
              <h3 className="font-bold text-lg mb-3 text-blue-900">CONSIGNEE</h3>
              <p className="font-semibold">{shippingDetails.consignee1 || "INSAF M M M"}</p>
              <p>{shippingDetails.consignee2 || "AZHAR A S M"}</p>
              <p className="mt-2">{shippingDetails.consigneeAddress || "NO 38 MUSLIM"}</p>
              <p>{shippingDetails.consigneeTown || "DANOWITA, SRI LANKA"}</p>
              <p className="mt-2"><span className="font-medium">MOBILE:</span> {shippingDetails.consigneeMobile || "+94755123456"}</p>
              <p><span className="font-medium">ID/PASSPORT:</span> {shippingDetails.consigneePassportNic || "29876543210"}</p>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border border-gray-300 mb-6">
            <h3 className="font-bold text-lg p-3 bg-gray-100 text-blue-900">SHIPPING DETAILS</h3>
            <div className="grid grid-cols-4 gap-4 p-4">
              <div>
                <p><span className="font-medium">WAREHOUSE:</span></p>
                <p>ERITREA</p>
              </div>
              <div>
                <p><span className="font-medium">SECTOR:</span></p>
                <p>KASSALA</p>
              </div>
              <div>
                <p><span className="font-medium">PAYMENT STATUS:</span></p>
                <p className={`font-bold text-lg ${formData.paymentStatus === 'PAID' ? 'text-green-600' : 'text-red-600'}`}>
                  {formData.paymentStatus === 'PAID' ? 'PAID' : 'UNPAID'}
                </p>
              </div>
              <div>
                <p><span className="font-medium">PAYMENT METHOD:</span></p>
                <p>CASH</p>
              </div>
              <div>
                <p><span className="font-medium">PAYMENT DATE:</span></p>
                <p>NOT SPECIFIED</p>
              </div>
              <div>
                <p><span className="font-medium">RECEIPT NUMBER:</span></p>
                <p>NOT SPECIFIED</p>
              </div>
            </div>
          </div>

          {/* Cargo Details */}
          <div className="border border-gray-300 mb-6">
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
                {packageDetails.length > 0 ? (
                  packageDetails.map((pkg, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{pkg.name || "HOUSEHOLD ITEMS"}</td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">{pkg.weight || "29.34"}</td>
                      <td className="border border-gray-300 p-2">{pkg.cubicMetre || "0.672"}</td>
                      <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">HOUSEHOLD ITEMS</td>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">29.34</td>
                    <td className="border border-gray-300 p-2">0.672</td>
                    <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                  </tr>
                )}
                <tr className="bg-gray-50 font-bold">
                  <td className="border border-gray-300 p-2 text-center">TOTAL:</td>
                  <td className="border border-gray-300 p-2">{packageDetails.length || 1}</td>
                  <td className="border border-gray-300 p-2">{formData.weight || "29.34"} KG</td>
                  <td className="border border-gray-300 p-2">{formData.volume || "0.672"} M³</td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms and Pricing */}
          <div className="grid grid-cols-2 gap-8">
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
                  <span>{parseFloat(costDetails.freight || "59.00").toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between">
                  <span>DISCOUNT</span>
                  <span>({parseFloat(costDetails.discount || "0.00").toFixed(2)}) QAR</span>
                </div>
                <hr className="border-gray-300" />
                <div className="flex justify-between font-bold">
                  <span>TOTAL</span>
                  <span>{parseFloat(costDetails.net || costDetails.freight || "59.00").toFixed(2)} QAR</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>TOTAL DUE</span>
                  <span>{parseFloat(costDetails.net || costDetails.freight || "59.00").toFixed(2)} QAR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-8 flex justify-between items-end">
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
          <div className="mt-6 flex justify-end">
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
      </DialogContent>
    </Dialog>
  );
};

export default EritreaInvoicePreview;