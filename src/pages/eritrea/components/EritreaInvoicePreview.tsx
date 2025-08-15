import React from "react";
import { Button } from "@/components/ui/button";
import { Printer, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import soqotraLogo from "@/assets/soqotra-logo.png";

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
        
        <div id="eritrea-invoice-print" className="bg-white p-3 text-black relative" style={{ fontSize: '10pt', fontFamily: 'Arial, sans-serif', lineHeight: '1.2' }}>
          {/* Main Header Layout */}
          <div className="flex items-start justify-between mb-4">
            {/* Left side - Logo and QR */}
            <div className="flex flex-col items-center">
              <div className="mb-2">
                <img 
                  src={soqotraLogo} 
                  alt="SOQOTRA" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="border border-gray-300 p-1 bg-white text-center">
                <QRCodeSVG 
                  value={generateQRData()} 
                  size={60} 
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={false}
                />
              </div>
            </div>

            {/* Center - Company Info */}
            <div className="flex-1 text-center mx-6">
              <h2 className="text-xs font-bold text-black mb-1">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION</h2>
              <h2 className="text-xs font-bold text-black mb-1">AND TRADING WLL</h2>
              <p className="text-xs text-black">Office No. 3, 1st Floor, Zone 55, Building No. 53,</p>
              <p className="text-xs text-black">Street No. 76, Saed Al Basher, Azizia Commercial</p>
              <p className="text-xs text-black mb-1">Street - Azizia, Doha, Qatar.</p>
              <p className="text-xs text-black font-bold">Tel : 44412770 - 44412773</p>
              <p className="text-xs text-black font-bold">Email: accounts@soqotralogistics.com</p>
            </div>

            {/* Right side - Invoice Details */}
            <div>
              <table className="border-2 border-black text-xs" style={{ width: '260px' }}>
                <tbody>
                  <tr>
                    <td className="border border-black p-2 bg-gray-100 font-bold text-center" colSpan={2}>INVOICE</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">INVOICE</td>
                    <td className="border border-black p-2">{formData.invoiceNumber || "010000"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">DATE</td>
                    <td className="border border-black p-2">{formData.invoiceDate || new Date().toISOString().split('T')[0]}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">JOB NO.</td>
                    <td className="border border-black p-2">{formData.jobNumber || ""}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 font-bold">SALES REP</td>
                    <td className="border border-black p-2">{formData.salesRep || "MR_YOUSUF"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipper and Consignee */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <table className="w-full border-2 border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs" style={{ width: '60px' }}>SR NO.</td>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs">SHIPPER</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs">1</td>
                    <td className="border border-black p-1 text-xs">{formData.shipperName || "SOFIA ADEM MOHAMMED"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs">2</td>
                    <td className="border border-black p-1 text-xs"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs" colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs" colSpan={2}>{formData.shipperAddress || "LEGTAFIYA"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold text-xs">MOBILE</td>
                    <td className="border border-black p-1 text-xs">{formData.shipperMobile || "33895442"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold text-xs">QID/PP NO</td>
                    <td className="border border-black p-1 text-xs">{formData.shipperIdNumber || "27708000172"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <table className="w-full border-2 border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs" style={{ width: '60px' }}>SR NO</td>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs">CONSIGNEE</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs">1</td>
                    <td className="border border-black p-1 text-xs">{formData.consigneeName || "ROYET ADEM MOHAMMED"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs">2</td>
                    <td className="border border-black p-1 text-xs"></td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold bg-gray-100 text-xs" colSpan={2}>ADDRESS</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 text-xs" colSpan={2}>{formData.consigneeAddress || "UNIVERSITY"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold text-xs">TEL NO:</td>
                    <td className="border border-black p-1 text-xs">{formData.consigneeMobile || "+291 7231926"}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-1 font-bold text-xs">ID/PP NO</td>
                    <td className="border border-black p-1 text-xs">{formData.consigneeIdNumber || "N12548752"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="border border-gray-300 mb-3">
            <h3 className="font-bold text-sm p-2 bg-gray-100">SHIPPING DETAILS</h3>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-1 font-bold bg-gray-100 text-xs">WAREHOUSE</td>
                  <td className="border border-gray-300 p-1 font-bold bg-gray-100 text-xs">SECTOR</td>
                  <td className="border border-gray-300 p-1 font-bold bg-gray-100 text-xs">PAYMENT STATUS</td>
                  <td className="border border-gray-300 p-1 font-bold bg-gray-100 text-xs">PAYMENT MODE</td>
                  <td className="border border-gray-300 p-1 font-bold bg-gray-100 text-xs">COUNTRY/ORIGIN</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-1 text-xs">{formData.port || "ASMARA"}</td>
                  <td className="border border-gray-300 p-1 text-xs">{formData.sector || "SHUWAIKH"}</td>
                  <td className="border border-gray-300 p-1 font-bold text-green-600 text-xs">PAID</td>
                  <td className="border border-gray-300 p-1 text-xs">CASH</td>
                  <td className="border border-gray-300 p-1 text-xs">QATAR</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Cargo Details */}
          <div className="border border-gray-300 mb-3">
            <h3 className="font-bold text-sm p-2 bg-gray-100 text-blue-900">CARGO DETAILS</h3>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-1 text-left text-xs">SR NO</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">PACKAGE TYPE</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">QTY</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">WEIGHT (KG)</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">DIMENSION</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">VOLUME (M³)</th>
                  <th className="border border-gray-300 p-1 text-left text-xs">DESCRIPTION</th>
                </tr>
              </thead>
              <tbody>
                {packageDetails.length > 0 ? (
                  packageDetails.map((pkg, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-1 text-xs">{index + 1}</td>
                      <td className="border border-gray-300 p-1 text-xs">{pkg.name || "BARREL"}</td>
                      <td className="border border-gray-300 p-1 text-xs">{pkg.quantity || 1}</td>
                      <td className="border border-gray-300 p-1 text-xs">{pkg.weight || "44"}</td>
                      <td className="border border-gray-300 p-1 text-xs">
                        {pkg.length && pkg.width && pkg.height 
                          ? `${(pkg.length / 2.54).toFixed(1)}" × ${(pkg.width / 2.54).toFixed(1)}" × ${(pkg.height / 2.54).toFixed(1)}"`
                          : "-"
                        }
                      </td>
                      <td className="border border-gray-300 p-1 text-xs">{pkg.cubicMetre || "0.01875"}</td>
                      <td className="border border-gray-300 p-1 text-xs">PERSONAL EFFECTS</td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr>
                      <td className="border border-gray-300 p-1 text-xs">1</td>
                      <td className="border border-gray-300 p-1 text-xs">BARREL</td>
                      <td className="border border-gray-300 p-1 text-xs">1</td>
                      <td className="border border-gray-300 p-1 text-xs">44</td>
                      <td className="border border-gray-300 p-1 text-xs">-</td>
                      <td className="border border-gray-300 p-1 text-xs">0.01875</td>
                      <td className="border border-gray-300 p-1 text-xs">PERSONAL EFFECTS</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-1 text-xs">2</td>
                      <td className="border border-gray-300 p-1 text-xs">CARTON BOX</td>
                      <td className="border border-gray-300 p-1 text-xs">1</td>
                      <td className="border border-gray-300 p-1 text-xs">15</td>
                      <td className="border border-gray-300 p-1 text-xs">-</td>
                      <td className="border border-gray-300 p-1 text-xs">0.008</td>
                      <td className="border border-gray-300 p-1 text-xs">PERSONAL EFFECTS</td>
                    </tr>
                  </>
                )}
                <tr className="bg-gray-50 font-bold">
                  <td className="border border-gray-300 p-1 text-center text-xs" colSpan={2}>TOTAL:</td>
                  <td className="border border-gray-300 p-1 text-xs">{packageDetails.length || 2}</td>
                  <td className="border border-gray-300 p-1 text-xs">{formData.totalWeight || "29.34"} KG</td>
                  <td className="border border-gray-300 p-1 text-xs"></td>
                  <td className="border border-gray-300 p-1 text-xs">{formData.totalVolume || "0.672"} M³</td>
                  <td className="border border-gray-300 p-1 text-xs"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Terms and Pricing */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <h3 className="font-bold text-sm mb-2 text-blue-900">TERMS & CONDITIONS:</h3>
              <div className="space-y-1" style={{ fontSize: '8px', lineHeight: '1.3' }}>
                <p>(1) WE HEREBY DECLARE THAT THE CONTENTS OF THIS CONSIGNMENT ARE FULLY AND ACCURATELY DESCRIBED, AND THE PARCEL OR PACKAGE DOESN'T CONTAIN ANY ILLEGAL ITEMS, CASH, JEWELRY, OR DANGEROUS GOODS.</p>
                <p>(2) PERISHABLE & BREAKABLE ITEMS ARE SHIPPED AT MY OWN RISK. SOQOTRA IS NOT LIABLE FOR ANY LOSS FROM BREAKABLE OR UNDECLARED ITEMS.</p>
                <p>(3) SHIPPER/CONSIGNEE RESPONSIBLE FOR DESTINATION CHARGES.</p>
                <p>(4) I UNDERSTAND THE PRESENT TIME IS JUST AN INDICATOR, IT MAY CHANGE.</p>
                <p>(5) STORAGE CHARGES ARE APPLICABLE AFTER 30 DAYS.</p>
                <p>(6) I UNDERTAKE TO COMPLY WITH THE ABOVE-MENTIONED TERMS AND CONDITIONS.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <div className="space-y-1 text-xs">
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
                <div className="flex justify-between font-bold text-sm">
                  <span>TOTAL DUE</span>
                  <span>{parseFloat(costDetails.net || costDetails.freight || "59.00").toFixed(2)} QAR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mt-4 flex justify-between items-end">
            <div className="text-left">
              <div className="border-t border-gray-400 pt-1 w-40">
                <p className="text-xs font-medium">CUSTOMER SIGNATURE</p>
              </div>
            </div>
            <div className="text-right">
              <div className="border-t border-gray-400 pt-1 w-40">
                <p className="text-xs font-medium">SHIPPER'S SIGNATURE</p>
              </div>
            </div>
          </div>

          {/* Delivery Agent Section */}
          <div className="mt-3">
            <div className="border border-gray-300 p-2 bg-blue-50 rounded">
              <h4 className="font-bold text-xs text-blue-900 mb-1">AGENT DETAILS:</h4>
              <p className="font-bold text-sm">DHL EXPRESS: MUSAWWA BRANCH, Mr. Idries Omar Idries, Mobile No. +291 7159848</p>
              <p className="text-xs">Massawa Branch, <span className="font-bold">ERITREA</span></p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 text-center text-xs text-gray-500">
            <p>This is a computer generated invoice and does not require signature.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EritreaInvoicePreview;