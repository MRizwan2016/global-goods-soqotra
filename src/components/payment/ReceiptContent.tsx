
import React from "react";
import CompanyInfo from "./receipt-sections/CompanyInfo";
import PaymentDetails from "./receipt-sections/PaymentDetails";
import QrCodeSection from "./receipt-sections/QrCodeSection";
import SignatureSection from "./receipt-sections/SignatureSection";

interface ReceiptContentProps {
  receiptData: {
    receiptNumber: string;
    invoiceNumber: string;
    date: string;
    customer: string;
    amount: number;
    paymentMethod: string;
    currency: string;
    remarks?: string;
  };
  currencySymbol: string;
}

const ReceiptContent: React.FC<ReceiptContentProps> = ({ receiptData, currencySymbol }) => {
  // Generate proper QR data with receipt details
  const qrData = JSON.stringify({
    receiptNumber: receiptData.receiptNumber,
    invoiceNumber: receiptData.invoiceNumber,
    amount: receiptData.amount,
    currency: receiptData.currency,
    date: receiptData.date,
    customer: receiptData.customer,
    verified: true
  });

  console.log("Generating QR code with data:", qrData);

  return (
    <div className="p-6">
      <CompanyInfo logo="/lovable-uploads/09288c32-edf3-48e9-9839-a23ae45397ae.png" />
      
      <PaymentDetails
        receiptNumber={receiptData.receiptNumber}
        invoiceNumber={receiptData.invoiceNumber}
        date={receiptData.date}
        customer={receiptData.customer}
        amount={receiptData.amount}
        paymentMethod={receiptData.paymentMethod}
        currencySymbol={currencySymbol}
        remarks={receiptData.remarks}
      />

      <QrCodeSection qrData={qrData} />
      
      <SignatureSection />
    </div>
  );
};

export default ReceiptContent;
