
import React, { useEffect, useState } from "react";
import ReceiptView from "@/components/payment/ReceiptView";

interface PaymentReceiptHandlerProps {
  // No props needed as we'll use custom events
}

const PaymentReceiptHandler: React.FC<PaymentReceiptHandlerProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [receiptData, setReceiptData] = useState({
    receiptNumber: "",
    invoiceNumber: "",
    date: "",
    customer: "",
    amount: 0,
    paymentMethod: "cash",
    currency: "QAR",
    remarks: ""
  });

  // Listen for custom event to open receipt
  useEffect(() => {
    const handleOpenReceipt = (event: any) => {
      const { receiptData } = event.detail;
      console.log("Opening receipt with data:", receiptData);
      setReceiptData(receiptData);
      setIsOpen(true);
    };
    
    window.addEventListener('open-receipt', handleOpenReceipt);
    
    return () => {
      window.removeEventListener('open-receipt', handleOpenReceipt);
    };
  }, []);

  return (
    <ReceiptView 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      receiptData={receiptData}
    />
  );
};

export default PaymentReceiptHandler;
