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
        
        <div id="eritrea-invoice-print" className="bg-white p-6 text-black relative" style={{ fontSize: '11pt', fontFamily: 'Arial, sans-serif' }}>
          {/* Logo - Absolute positioned in top-left corner */}
          <div className="absolute top-2 left-2 z-10">
            <img 
              src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
              alt="Soqotra Logo" 
              className="w-48 h-auto object-contain"
              style={{ 
                imageRendering: 'crisp-edges'
              }}
            />
          </div>

          {/* Header with Company Info */}
          <div className="mb-8 pt-16">
            {/* Company Info and Invoice Details */}
            <div className="flex justify-between items-start">
              {/* Company Info - Left side */}
              <div className="flex-1">
                <h1 className="text-lg font-bold text-black leading-tight">
                  SOQOTRA
                </h1>
                <div className="mt-8">
                  <p className="text-sm text-black">MR. IDRIES OMAR IDRIES, MOBILE NO. +291 7159848</p>
                </div>
              </div>
              
              {/* Invoice Info - Right side */}
            <div className="text-right">
                <table className="border border-gray-300 text-sm" style={{ width: '350px' }}>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2 bg-gray-100 font-bold text-center" colSpan={2}>INVOICE</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-bold">INVOICE</td>
                      <td className="border border-gray-300 p-2">{formData.invoiceNumber || "010000"}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-bold">DATE</td>
                      <td className="border border-gray-300 p-2">{formData.invoiceDate || new Date().toISOString().split('T')[0]}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-bold">JOB NO.</td>
                      <td className="border border-gray-300 p-2">{formData.jobNumber || "010000"}</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 font-bold">SALES REP</td>
                      <td className="border border-gray-300 p-2">{formData.salesRep || "MR_YOUSUF"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* QR Code - Top right corner */}
          <div className="absolute top-4 right-4 z-10">
            <div className="border border-gray-300 p-2 bg-white rounded">
              <p className="text-xs font-bold text-center mb-1">PAGE</p>
              <p className="text-lg font-bold text-center">1</p>
              <p className="text-xs text-center mt-2">QR CODE</p>
              <QRCodeSVG 
                value={generateQRData()} 
                size={80} 
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
                includeMargin={true}
              />
              <p className="text-xs font-bold text-center mt-1">ERITREA</p>
            </div>
          </div>

          {/* Shipper and Consignee */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100">SR NO.</td>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100">SHIPPER</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">{formData.shipperName || "MR MR. HUSSAIN"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2</td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100" colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2" colSpan={2}>{formData.shipperAddress || "AL REYYAN"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold">MOBILE / TEL NO</td>
                    <td className="border border-gray-300 p-2">{formData.shipperMobile || "31016616"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold">QID / PP NO</td>
                    <td className="border border-gray-300 p-2">{formData.shipperIdNumber || "27214410871"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100">SR NO</td>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100">CONSIGNEE</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">1</td>
                    <td className="border border-gray-300 p-2">{formData.consigneeName || "MR HUSSAIN"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2</td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold bg-gray-100" colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2" colSpan={2}>{formData.consigneeAddress || "ASMARA"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold">TEL NO:</td>
                    <td className="border border-gray-300 p-2">{formData.consigneeMobile || "2256485"}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold">ID NO OR PP NO</td>
                    <td className="border border-gray-300 p-2">{formData.consigneeIdNumber || "N12548752"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border border-gray-300 mb-6">
            <h3 className="font-bold text-lg p-3 bg-gray-100">SHIPPING DETAILS</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2 font-bold bg-gray-100">WAREHOUSE</td>
                  <td className="border border-gray-300 p-2 font-bold bg-gray-100">SECTOR</td>
                  <td className="border border-gray-300 p-2 font-bold bg-gray-100">PAYMENT STATUS</td>
                  <td className="border border-gray-300 p-2 font-bold bg-gray-100">PAYMENT MODE</td>
                  <td className="border border-gray-300 p-2 font-bold bg-gray-100">COUNTRY/ORIGIN</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">{formData.port || "ASMARA"}</td>
                  <td className="border border-gray-300 p-2">{formData.sector || "SHUWAIKH"}</td>
                  <td className="border border-gray-300 p-2 font-bold text-green-600">PAID</td>
                  <td className="border border-gray-300 p-2">CASH</td>
                  <td className="border border-gray-300 p-2">QATAR</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cargo Details */}
          <div className="border border-gray-300 mb-6">
            <h3 className="font-bold text-lg p-3 bg-gray-100 text-blue-900">CARGO DETAILS</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">SR NO</th>
                  <th className="border border-gray-300 p-2 text-left">PACKAGE TYPE</th>
                  <th className="border border-gray-300 p-2 text-left">QUANTITY</th>
                  <th className="border border-gray-300 p-2 text-left">WEIGHT (KG)</th>
                  <th className="border border-gray-300 p-2 text-left">DIMENSION</th>
                  <th className="border border-gray-300 p-2 text-left">VOLUME (M³)</th>
                  <th className="border border-gray-300 p-2 text-left">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {packageDetails.length > 0 ? (
                  packageDetails.map((pkg, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{pkg.name || "BARREL"}</td>
                      <td className="border border-gray-300 p-2">{pkg.quantity || 1}</td>
                      <td className="border border-gray-300 p-2">{pkg.weight || "44"}</td>
                      <td className="border border-gray-300 p-2">
                        {pkg.length && pkg.width && pkg.height 
                          ? `${(pkg.length / 2.54).toFixed(1)}" × ${(pkg.width / 2.54).toFixed(1)}" × ${(pkg.height / 2.54).toFixed(1)}"`
                          : "-"
                        }
                      </td>
                      <td className="border border-gray-300 p-2">{pkg.cubicMetre || "0.01875"}</td>
                      <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">BARREL</td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">44</td>
                      <td className="border border-gray-300 p-2">-</td>
                      <td className="border border-gray-300 p-2">0.01875</td>
                      <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">2</td>
                      <td className="border border-gray-300 p-2">CARTON BOX</td>
                      <td className="border border-gray-300 p-2">1</td>
                      <td className="border border-gray-300 p-2">15</td>
                      <td className="border border-gray-300 p-2">-</td>
                      <td className="border border-gray-300 p-2">0.008</td>
                      <td className="border border-gray-300 p-2">PERSONAL EFFECTS AND HOUSEHOLD GOODS</td>
                    </tr>
                  </>
                )}
                <tr className="bg-gray-50 font-bold">
                  <td className="border border-gray-300 p-2 text-center" colSpan={2}>TOTAL:</td>
                  <td className="border border-gray-300 p-2">{packageDetails.length || 2}</td>
                  <td className="border border-gray-300 p-2">{formData.totalWeight || "29.34"} KG</td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2">{formData.totalVolume || "0.672"} M³</td>
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

          {/* Delivery Agent Section */}
          <div className="mt-6">
            <div className="border border-gray-300 p-3 bg-blue-50 rounded">
              <h4 className="font-bold text-sm text-blue-900 mb-2">DESTINATION DELIVERY AGENT</h4>
              <p className="font-bold text-lg">DHL EXPRESS</p>
              <p className="text-sm">Massawa Branch, Eritrea</p>
              <p className="text-xs text-gray-600">Contact: Mr. Idries Omar Idries</p>
              <p className="text-xs text-gray-600">Mobile: +291 7159848</p>
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