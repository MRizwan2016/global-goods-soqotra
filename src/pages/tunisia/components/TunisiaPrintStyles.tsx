import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          
          body {
            background: white !important;
            font-size: 10pt !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          #tunisia-payment-receipt-print {
            box-shadow: none !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 10mm !important;
            background: white !important;
            color: black !important;
            border: none !important;
            border-radius: 0 !important;
          }
          
          #tunisia-payment-receipt-print * {
            color: black !important;
            background: white !important;
          }
          
          .tunisia-payment-receipt {
            padding: 10mm !important;
            background: white !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;