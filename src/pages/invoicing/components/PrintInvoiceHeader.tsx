
import { QRCodeSVG } from "qrcode.react";

interface InvoiceHeaderProps {
  invoiceNumber: string;
  date: string;
  net: number | string;
}

const PrintInvoiceHeader = ({ invoiceNumber, date, net }: InvoiceHeaderProps) => {
  return (
    <div className="flex p-2 border-b border-gray-300">
      {/* Logo section */}
      <div className="w-1/4 flex items-center justify-center">
        <img src="/lovable-uploads/SOQO_NEW_LOGO.jpeg" alt="Soqotra Logo" className="h-28 w-36 object-contain" />
      </div>
      
      {/* QR Code section */}
      <div className="w-1/4 flex items-center justify-center">
        <QRCodeSVG 
          value={`INVOICE:${invoiceNumber}\nDATE:${date}\nAMOUNT:${net} QAR`} 
          size={100} 
          level="M"
        />
      </div>
      
      {/* Company info section */}
      <div className="w-2/4 text-right">
        <h2 className="text-base font-bold">SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL</h2>
        <p className="text-xs">Office No. 3, 1st Floor, Zone 55, Building No.53, Street No.76,</p>
        <p className="text-xs">Azizia Commercial Street, P.O.Box: 55861, Azizia - Qatar</p>
        <p className="text-xs">Tele:+974 - 44832508</p>
        <p className="text-xs">email: accounts@soqotralogistics.com</p>
        <p className="text-xs">Print Date: {new Date().toLocaleDateString('en-GB')}</p>
        <p className="text-xs">Print by: Mohammed Rizwan</p>
        <div className="mt-1">
          <span className="font-bold text-lg">INVOICE: </span>
          <span className="font-bold text-lg">{invoiceNumber}</span>
        </div>
        <div>
          <span className="font-bold">DATE: </span>
          <span className="font-bold">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default PrintInvoiceHeader;
