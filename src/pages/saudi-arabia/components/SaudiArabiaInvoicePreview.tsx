import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface SaudiArabiaInvoicePreviewProps {
  formData: any;
  packageDetails: any[];
  shippingDetails: any;
  costDetails: any;
  isOpen: boolean;
  onClose: () => void;
  onPrint: () => void;
}

const SaudiArabiaInvoicePreview: React.FC<SaudiArabiaInvoicePreviewProps> = ({
  formData,
  packageDetails,
  shippingDetails,
  costDetails,
  isOpen,
  onClose,
  onPrint
}) => {
  const generateQRData = () => {
    return [
      `INVOICE:${formData.invoiceNumber || "SA12345"}`,
      `DATE:${formData.invoiceDate || new Date().toISOString().split('T')[0]}`,
      `TOTAL:${formData.net || "0.00"} SAR`,
      `SHIPPER:${formData.shipperName || "N/A"}`,
      `CONSIGNEE:${formData.consigneeName || "N/A"}`,
      `STATUS:${formData.paymentStatus || "UNPAID"}`,
      `VERIFIED:TRUE`
    ].join('|');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Saudi Arabia Invoice Preview</span>
            <div className="flex gap-2">
              <Button onClick={onPrint} size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button onClick={onClose} size="sm" variant="outline">
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div 
          id="saudi-arabia-invoice-print" 
          className="bg-white p-6 text-black relative" 
          style={{ fontSize: '11pt', fontFamily: 'Arial, sans-serif' }}
        >
          {/* Header Section */}
          <div className="border-4 border-black">
            {/* Company Header */}
            <div className="relative p-4 border-b-2 border-black">
              {/* Logo - Top left */}
              <div className="absolute top-2 left-2">
                <img 
                  src="/lovable-uploads/81c06014-f31f-4df1-9773-d03c1d480c1f.png" 
                  alt="Soqotra Logo" 
                  className="w-40 h-auto"
                />
              </div>
              
              {/* Company info - centered */}
              <div className="text-center pt-6">
                <h1 className="text-lg font-bold mb-2">SOQOTRA SOLUTIONS WLL</h1>
                <div className="text-sm">
                  <p>Building No. 15, Region: Eastern Province, District: Al-Badiyah District,</p>
                  <p>Mobile No. 00966 547381189</p>
                  <p>Email : accounts-ksa@soqotralogistics.com</p>
                </div>
              </div>
            </div>

            {/* Invoice Details & QR Code */}
            <div className="flex border-b-2 border-black">
              <div className="flex-1 p-4 border-r border-black flex justify-center items-center">
                <QRCodeSVG
                  value={generateQRData()}
                  size={120}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="M"
                  includeMargin={true}
                />
              </div>
              <div className="flex-1 p-4">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">INVOICE</td>
                      <td className="border border-black px-2 py-1">{formData.invoiceNumber || "10052"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">DATE</td>
                      <td className="border border-black px-2 py-1">{formData.invoiceDate || "24/7/2025"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">SALES REP</td>
                      <td className="border border-black px-2 py-1">MR. LAHIRU</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipper & Consignee Section */}
            <div className="flex border-b-2 border-black">
              <div className="flex-1 border-r border-black">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">SR NO.</td>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">SHIPPER</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1">1</td>
                      <td className="border border-black px-2 py-1">
                        {formData.shipperPrefix} {formData.shipperName || "MR. SULAIMAN ZIL UL HAQ"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1">2</td>
                      <td className="border border-black px-2 py-1"></td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100" colSpan={2}>ADDRESS</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1" colSpan={2}>
                        {formData.shipperAddress || "UMM SALAAL ALI, QATAR"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">MOBILE / TEL NO</td>
                      <td className="border border-black px-2 py-1">
                        {formData.shipperMobile || "31016516"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">QID / PP NO</td>
                      <td className="border border-black px-2 py-1">
                        {formData.shipperIdNumber || "27214410871"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex-1">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">SR NO</td>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100">CONSIGNEE</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1">1</td>
                      <td className="border border-black px-2 py-1">
                        {formData.consigneePrefix} {formData.consigneeName || "MR. SULAIMAN ZIA UL HAQ"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1">2</td>
                      <td className="border border-black px-2 py-1"></td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold bg-gray-100" colSpan={2}>ADDRESS</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1" colSpan={2}>
                        {formData.consigneeAddress || "ZAMEER STREET, AL KHOBAR"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">TEL NO:</td>
                      <td className="border border-black px-2 py-1">
                        {formData.consigneeMobile || "114567890"}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">ID NO OR PP NO</td>
                      <td className="border border-black px-2 py-1">
                        {formData.consigneeIdNumber || "N25648562"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="border-b-2 border-black">
              <div className="bg-gray-100 p-2 font-bold text-center border-b border-black">
                SHIPPING DETAILS
              </div>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-black px-2 py-1 font-bold bg-gray-100">WAREHOUSE</td>
                    <td className="border border-black px-2 py-1 font-bold bg-gray-100">SECTOR</td>
                    <td className="border border-black px-2 py-1 font-bold bg-gray-100">PAYMENT STATUS</td>
                    <td className="border border-black px-2 py-1 font-bold bg-gray-100">PAYMENT MODE</td>
                    <td className="border border-black px-2 py-1 font-bold bg-gray-100">COUNTRY/ORIGIN</td>
                  </tr>
                  <tr>
                    <td className="border border-black px-2 py-1">DAMMAM</td>
                    <td className="border border-black px-2 py-1">SAUDI ARABIA</td>
                    <td className="border border-black px-2 py-1">{formData.paymentStatus || "PAID/UNPAID"}</td>
                    <td className="border border-black px-2 py-1">CASH/ONLINE</td>
                    <td className="border border-black px-2 py-1">QATAR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cargo Details */}
            <div className="border-b-2 border-black">
              <div className="bg-gray-100 p-2 font-bold text-center border-b border-black">
                CARGO DETAILS
              </div>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="border border-black px-2 py-1 bg-gray-100">SR NO</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">PACKAGE TYPE</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">QUANTITY</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">WEIGHT</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">DIMENSION</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">VOLUME</th>
                    <th className="border border-black px-2 py-1 bg-gray-100">DESCRIPTION</th>
                  </tr>
                </thead>
                <tbody>
                  {packageDetails && packageDetails.length > 0 ? (
                    packageDetails.map((pkg, index) => (
                      <tr key={index}>
                        <td className="border border-black px-2 py-1 text-center">{index + 1}</td>
                        <td className="border border-black px-2 py-1">{pkg.name || "CARTON BOX"}</td>
                        <td className="border border-black px-2 py-1 text-center">{pkg.quantity || "1"}</td>
                        <td className="border border-black px-2 py-1 text-center">{pkg.weight || "30"}</td>
                        <td className="border border-black px-2 py-1 text-center">
                          {pkg.length || "20"}X{pkg.width || "20"}X{pkg.height || "20"}
                        </td>
                        <td className="border border-black px-2 py-1 text-center">{pkg.cubicMetre?.toFixed(3) || "0.134"}</td>
                        <td className="border border-black px-2 py-1">PERSONAL EFFECTS</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="border border-black px-2 py-1 text-center">1</td>
                      <td className="border border-black px-2 py-1">CARTON BOX</td>
                      <td className="border border-black px-2 py-1 text-center">1</td>
                      <td className="border border-black px-2 py-1 text-center">30</td>
                      <td className="border border-black px-2 py-1 text-center">20X20X20</td>
                      <td className="border border-black px-2 py-1 text-center">0.134</td>
                      <td className="border border-black px-2 py-1">PERSONAL EFFECTS</td>
                    </tr>
                  )}
                  <tr>
                    <td className="border border-black px-2 py-1 font-bold text-center" colSpan={2}>TOTAL</td>
                    <td className="border border-black px-2 py-1 font-bold text-center">
                      {formData.totalPackages || "2"}
                    </td>
                    <td className="border border-black px-2 py-1 font-bold text-center">
                      {formData.totalWeight || "60"}
                    </td>
                    <td className="border border-black px-2 py-1 font-bold text-center"></td>
                    <td className="border border-black px-2 py-1 font-bold text-center">
                      {formData.totalVolume?.toFixed(3) || "0.196"}
                    </td>
                    <td className="border border-black px-2 py-1 font-bold text-center"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Terms & Conditions and Pricing */}
            <div className="flex">
              <div className="flex-1 border-r border-black">
                <div className="bg-gray-100 p-2 font-bold border-b border-black">
                  TERMS & CONDITIONS:-
                </div>
                <div className="p-2 text-xs">
                  <p>(1) I/We hereby declare that the contents of this consignment are</p>
                  <p className="ml-4">fully, accurately described, and that the package doesn't</p>
                  <p className="ml-4">contain any illegal items, cash, jewelry, or dangerous goods.</p>
                  <p>(2) Perishable & breakable items are shipped at my own risk;</p>
                  <p className="ml-4">SOQOTRA is not liable for any loss from breakable or undeclared items.</p>
                  <p>(3) Shipper/Consignee responsible for destination charges.</p>
                  <p>(4) I understand that delivery time is just an indicator; it may change.</p>
                  <p>(5) Storage charges are applicable after 30 days.</p>
                  <p>(6) I undertake to comply with the above-mentioned terms and conditions</p>
                </div>
              </div>
              
              <div className="flex-1">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">FREIGHT</td>
                      <td className="border border-black px-2 py-1">SAR</td>
                      <td className="border border-black px-2 py-1 text-right">{formData.freight?.toFixed(2) || "750.00"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">DOCUMENTS FEE</td>
                      <td className="border border-black px-2 py-1">SAR</td>
                      <td className="border border-black px-2 py-1 text-right">{formData.documentsFee?.toFixed(2) || "50.00"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">DISCOUNT</td>
                      <td className="border border-black px-2 py-1">SAR</td>
                      <td className="border border-black px-2 py-1 text-right">{formData.discount?.toFixed(2) || "-"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">PACKING FEE</td>
                      <td className="border border-black px-2 py-1">SAR</td>
                      <td className="border border-black px-2 py-1 text-right">{formData.packing?.toFixed(2) || "-"}</td>
                    </tr>
                    <tr>
                      <td className="border border-black px-2 py-1 font-bold">TRANSPORTATION</td>
                      <td className="border border-black px-2 py-1">SAR</td>
                      <td className="border border-black px-2 py-1 text-right">{formData.destinationTransport?.toFixed(2) || "-"}</td>
                    </tr>
                    <tr className="bg-gray-100">
                      <td className="border border-black px-2 py-1 font-bold">TOTAL</td>
                      <td className="border border-black px-2 py-1 font-bold">SAR</td>
                      <td className="border border-black px-2 py-1 text-right font-bold">{formData.net?.toFixed(2) || "800.00"}</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-4 text-center">
                  <div className="text-lg font-bold text-red-600">
                    {formData.paymentStatus === "PAID" ? "PAID" : "PAID / UNPAID"}
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex border-t border-black">
              <div className="flex-1 p-8 text-center border-r border-black">
                <div className="border-t border-black mt-12 pt-2">
                  <div className="font-bold">CUSTOMER SIGNATURE</div>
                </div>
              </div>
              <div className="flex-1 p-8 text-center">
                <div className="border-t border-black mt-12 pt-2">
                  <div className="font-bold">AUTHORIZED SIGNATURE</div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 p-2 text-center text-xs font-bold">
              THANK YOU FOR OUR BUSINESS. FOR ANY INQUIRIES PLEASE CONTACT US AT: 44412770-44412773
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaudiArabiaInvoicePreview;