import React from "react";

const TunisiaPrintStyles = () => {
  return (
    <style>
      {`
        @media print {
          @page {
            size: A5;
            margin: 10mm;
          }
          
          /* Hide everything first */
          * {
            visibility: hidden !important;
          }
          
          body, html {
            background: white !important;
            font-size: 9pt !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Only show the specific Tunisia payment receipt */
          #tunisia-payment-receipt-print,
          #tunisia-payment-receipt-print * {
            visibility: visible !important;
            display: block !important;
          }
          
          #tunisia-payment-receipt-print {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: white !important;
            color: black !important;
            padding: 8mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            page-break-inside: avoid !important;
          }
          
          /* Ensure all text in the receipt is black */
          #tunisia-payment-receipt-print h1,
          #tunisia-payment-receipt-print h2,
          #tunisia-payment-receipt-print h3,
          #tunisia-payment-receipt-print p,
          #tunisia-payment-receipt-print div,
          #tunisia-payment-receipt-print span {
            color: black !important;
            background: transparent !important;
          }
          
          /* Grid and flex styles for print */
          #tunisia-payment-receipt-print .grid {
            display: grid !important;
          }
          
          #tunisia-payment-receipt-print .grid-cols-2 {
            grid-template-columns: 1fr 1fr !important;
          }
          
          #tunisia-payment-receipt-print .flex {
            display: flex !important;
          }
          
          #tunisia-payment-receipt-print .justify-between {
            justify-content: space-between !important;
          }
        }
      `}
    </style>
  );
};

export default TunisiaPrintStyles;